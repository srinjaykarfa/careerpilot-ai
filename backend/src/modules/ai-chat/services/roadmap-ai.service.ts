import { Injectable } from '@nestjs/common';

@Injectable()
export class RoadmapAiService {
  async generateRoadmap(): Promise<string> {
    return 'Roadmap generation is not configured yet.';
  }
}
