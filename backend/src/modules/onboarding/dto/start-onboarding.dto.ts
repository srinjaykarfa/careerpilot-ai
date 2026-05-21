import { IsNotEmpty, IsString } from 'class-validator';

export class StartOnboardingDto {
  @IsString()
  @IsNotEmpty()
  userId!: string;
}
