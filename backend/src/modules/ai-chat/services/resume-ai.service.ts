import { Injectable } from '@nestjs/common';

@Injectable()
export class ResumeAiService {
  async generateResumeFeedback(): Promise<string> {
    return 'Resume feedback is not configured yet.';
  }
}
