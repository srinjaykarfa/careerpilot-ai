import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class OnboardingMessageDto {
  @IsString()
  @IsNotEmpty()
  userId!: string;

  @IsString()
  @IsNotEmpty()
  message!: string;

  @IsString()
  @IsOptional()
  sessionId?: string;

  @IsOptional()
  clientState?: Record<string, unknown>;
}
