import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { AiChatModule } from './modules/ai-chat/ai-chat.module';
import { OnboardingModule } from './modules/onboarding/onboarding.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { ResumesModule } from './modules/resumes/resumes.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UsersModule,
    AiChatModule,
    OnboardingModule,
    ResumesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
