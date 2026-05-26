import { ResumeStatus } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsObject, IsOptional, IsString, IsUUID } from 'class-validator';

export class SaveResumeDto {
  @IsUUID()
  userId: string;

  @IsOptional()
  @IsUUID()
  resumeId?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsEnum(ResumeStatus)
  status?: ResumeStatus;

  @IsNotEmpty()
  @IsObject()
  content: Record<string, unknown>;
}
