import { Controller, Get } from '@nestjs/common';

@Controller('ai-chat')
export class AiChatController {
  @Get('health')
  health() {
    return { status: 'ok' };
  }
}
