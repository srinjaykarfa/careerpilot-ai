import { Injectable, Logger } from '@nestjs/common';
import Groq from 'groq-sdk';

@Injectable()
export class GroqService {
  private readonly logger = new Logger(GroqService.name);

  private getClient(): Groq {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      throw new Error('GROQ_API_KEY is missing');
    }

    return new Groq({ apiKey });
  }

  async generateText(prompt: string): Promise<string> {
    const client = this.getClient();
    const model = process.env.GROQ_MODEL ?? 'llama-3.1-8b-instant';

    try {
      const completion = await client.chat.completions.create({
        model,
        temperature: 0.3,
        messages: [{ role: 'user', content: prompt }],
      });

      return completion.choices?.[0]?.message?.content?.trim() ?? '';
    } catch (error) {
      this.logger.error('Groq request failed', error as Error);
      throw error;
    }
  }
}
