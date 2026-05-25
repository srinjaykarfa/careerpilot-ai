import {
  BadRequestException,
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';
import { ResumeAiService } from './services/resume-ai.service';
import { PrismaService } from '../../prisma/prisma.service';

type AtsCheckBody = {
  jobDescription: string;
  userId?: string;
};

@Controller('ai-chat')
export class AiChatController {
  constructor(
    private readonly resumeAi: ResumeAiService,
    private readonly prisma: PrismaService,
  ) {}

  @Get('health')
  health() {
    return { status: 'ok' };
  }

  @Post('ats-check')
  @UseInterceptors(
    FileInterceptor('resume', {
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter: (_req, file, cb) => {
        const allowed = [
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ];

        if (!allowed.includes(file.mimetype)) {
          cb(new BadRequestException('Only PDF or DOCX files are supported.'), false);
          return;
        }

        cb(null, true);
      },
    }),
  )
  async atsCheck(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: AtsCheckBody,
  ) {
    if (!file) {
      throw new BadRequestException('Resume file is required.');
    }

    if (!body?.jobDescription?.trim()) {
      throw new BadRequestException('Job description is required.');
    }

    const resumeText = await this.extractText(file);
    const result = await this.resumeAi.analyzeAts(resumeText, body.jobDescription);
    const history = await this.prisma.atsCheckHistory.create({
      data: {
        userId: body.userId ?? null,
        fileName: file.originalname,
        fileType: file.mimetype,
        score: result.score,
        summary: result.summary,
        matchedKeywords: result.matchedKeywords,
        missingKeywords: result.missingKeywords,
        sectionScores: result.sectionScores,
        recommendations: result.recommendations,
        jobDescription: body.jobDescription,
      },
    });

    return {
      ...result,
      historyId: history.id,
    };
  }

  @Get('ats-history')
  async atsHistory(@Query('userId') userId?: string) {
    return this.prisma.atsCheckHistory.findMany({
      where: userId ? { userId } : undefined,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        fileName: true,
        fileType: true,
        score: true,
        summary: true,
        createdAt: true,
      },
    });
  }

  @Get('ats-history/:id')
  async atsHistoryDetail(@Param('id') id: string) {
    return this.prisma.atsCheckHistory.findUnique({
      where: { id },
    });
  }

  private async extractText(file: Express.Multer.File): Promise<string> {
    if (file.mimetype === 'application/pdf') {
      const data = await pdfParse(file.buffer);
      return data.text ?? '';
    }

    if (
      file.mimetype === 'application/msword' ||
      file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      const result = await mammoth.extractRawText({ buffer: file.buffer });
      return result.value ?? '';
    }

    throw new BadRequestException('Unsupported file type.');
  }
}
