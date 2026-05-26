import { Body, Controller, Get, Param, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ResumeStatus } from '@prisma/client';
import { GetLatestResumeDto } from './dto/get-latest-resume.dto';
import { SaveResumeDto } from './dto/save-resume.dto';
import { ResumesService } from './resumes.service';

@Controller('resumes')
export class ResumesController {
  constructor(private readonly resumesService: ResumesService) {}

  @Post('save')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async save(@Body() dto: SaveResumeDto) {
    const resume = await this.resumesService.save(dto);
    return {
      id: resume.id,
      status: resume.status,
      updatedAt: resume.updatedAt,
    };
  }

  @Get('latest')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async latest(@Query() query: GetLatestResumeDto) {
    const resume = await this.resumesService.getLatest(
      query.userId,
      query.status as ResumeStatus | undefined,
    );
    return resume ?? null;
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.resumesService.getById(id);
  }
}
