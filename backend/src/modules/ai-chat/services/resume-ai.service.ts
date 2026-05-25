import { Injectable } from '@nestjs/common';
import { buildAtsCheckPrompt } from '../prompts/ats-check.prompt';
import { extractJsonBlock, safeJsonParse } from '../utils/json';
import { GroqService } from './groq.service';

export type AtsCheckResult = {
  score: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  sectionScores: Array<{ section: string; score: number; notes: string }>;
  summary: string;
  recommendations: string[];
};

@Injectable()
export class ResumeAiService {
  constructor(private readonly groq: GroqService) {}

  async analyzeAts(resumeText: string, jobDescription: string): Promise<AtsCheckResult> {
    const prompt = buildAtsCheckPrompt({
      resumeText: resumeText.slice(0, 8000),
      jobDescription: jobDescription.slice(0, 4000),
    });

    const raw = await this.groq.generateText(prompt);
    const jsonBlock = extractJsonBlock(raw) ?? raw;
    const parsed = safeJsonParse<AtsCheckResult>(jsonBlock);

    if (parsed && typeof parsed.score === 'number') {
      return {
        score: Math.min(100, Math.max(0, Math.round(parsed.score))),
        matchedKeywords: Array.isArray(parsed.matchedKeywords) ? parsed.matchedKeywords : [],
        missingKeywords: Array.isArray(parsed.missingKeywords) ? parsed.missingKeywords : [],
        sectionScores: Array.isArray(parsed.sectionScores)
          ? parsed.sectionScores.map((item) => ({
              section: String(item.section ?? ''),
              score: Math.min(100, Math.max(0, Math.round(Number(item.score) || 0))),
              notes: String(item.notes ?? ''),
            }))
          : [],
        summary: parsed.summary ?? 'ATS analysis completed.',
        recommendations: Array.isArray(parsed.recommendations)
          ? parsed.recommendations.map((item) => String(item))
          : [],
      };
    }

    return this.fallbackAts(resumeText, jobDescription);
  }

  private fallbackAts(resumeText: string, jobDescription: string): AtsCheckResult {
    const resume = resumeText.toLowerCase();
    const description = jobDescription.toLowerCase();
    const tokens = description
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter((token) => token.length > 3);

    const stop = new Set([
      'with',
      'from',
      'this',
      'that',
      'your',
      'will',
      'have',
      'into',
      'must',
      'able',
      'work',
      'role',
      'team',
      'job',
      'years',
      'year',
    ]);

    const unique = Array.from(new Set(tokens.filter((token) => !stop.has(token)))).slice(0, 20);
    const matchedKeywords = unique.filter((token) => resume.includes(token));
    const missingKeywords = unique.filter((token) => !resume.includes(token));
    const score = Math.round((matchedKeywords.length / Math.max(1, unique.length)) * 100);

    return {
      score,
      matchedKeywords,
      missingKeywords,
      sectionScores: [
        { section: 'Summary', score, notes: 'Fallback analysis based on keyword overlap.' },
        { section: 'Experience', score, notes: 'Fallback analysis based on keyword overlap.' },
        { section: 'Skills', score, notes: 'Fallback analysis based on keyword overlap.' },
        { section: 'Education', score, notes: 'Fallback analysis based on keyword overlap.' },
        { section: 'Projects', score, notes: 'Fallback analysis based on keyword overlap.' },
        { section: 'Certifications', score, notes: 'Fallback analysis based on keyword overlap.' },
      ],
      summary: 'ATS analysis completed using keyword coverage fallback.',
      recommendations: [
        'Add missing keywords from the job description.',
        'Quantify impact with measurable outcomes.',
        'Strengthen summary with role-specific value.',
      ],
    };
  }
}
