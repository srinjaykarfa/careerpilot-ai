import { Injectable } from '@nestjs/common';

@Injectable()
export class MentorAiService {
  async generateMentorReply(): Promise<string> {
    return 'Mentor response is not configured yet.';
  }
}
