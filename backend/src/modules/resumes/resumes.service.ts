import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma, ResumeStatus } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { SaveResumeDto } from './dto/save-resume.dto';

@Injectable()
export class ResumesService {
  constructor(private readonly prisma: PrismaService) {}

  async save(dto: SaveResumeDto) {
    await this.assertUser(dto.userId);
    const status = dto.status ?? ResumeStatus.DRAFT;
    const content = dto.content as Prisma.InputJsonValue;
    const title = this.resolveTitle(dto.title, dto.content);

    if (dto.resumeId) {
      const existing = await this.prisma.resume.findUnique({
        where: { id: dto.resumeId },
      });

      if (!existing || existing.userId !== dto.userId) {
        throw new BadRequestException('Resume not found');
      }

      return this.prisma.resume.update({
        where: { id: dto.resumeId },
        data: {
          title,
          status,
          content,
        },
      });
    }

    return this.prisma.resume.create({
      data: {
        userId: dto.userId,
        title,
        status,
        content,
      },
    });
  }

  async getLatest(userId: string, status?: ResumeStatus) {
    await this.assertUser(userId);

    return this.prisma.resume.findFirst({
      where: {
        userId,
        status: status ?? undefined,
      },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async getById(id: string) {
    return this.prisma.resume.findUnique({
      where: { id },
    });
  }

  private async assertUser(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }
  }

  private resolveTitle(title: string | undefined, content: Record<string, unknown>) {
    if (title?.trim()) {
      return title.trim();
    }

    const personal = content?.personal as { fullName?: string } | undefined;
    const fullName = personal?.fullName?.trim();
    if (fullName) {
      return `${fullName} Resume`;
    }

    return 'Untitled Resume';
  }
}
