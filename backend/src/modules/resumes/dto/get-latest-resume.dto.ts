import { ResumeStatus } from '@prisma/client';
import { IsEnum, IsOptional, IsUUID } from 'class-validator';

export class GetLatestResumeDto {
  @IsUUID()
  userId: string;

  @IsOptional()
  @IsEnum(ResumeStatus)
  status?: ResumeStatus;
}
