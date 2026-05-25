export type AtsCheckPromptInput = {
  resumeText: string;
  jobDescription: string;
};

export function buildAtsCheckPrompt(input: AtsCheckPromptInput): string {
  return `You are an ATS scoring engine for resumes.
You will receive a RESUME and a JOB DESCRIPTION.

Tasks:
1) Score ATS match from 0-100 (integer).
2) Return matchedKeywords: up to 12 keywords/phrases found in both resume and job description.
3) Return missingKeywords: up to 12 important keywords/phrases from the job description that are missing in the resume.
4) Return sectionScores: score each section 0-100 with short notes. Sections: Summary, Experience, Skills, Education, Projects, Certifications.
5) Return summary: 1-2 sentences explaining the score.
6) Return recommendations: up to 6 short actionable bullets.

Return ONLY JSON in this exact shape:
{
  "score": 0,
  "matchedKeywords": ["..."],
  "missingKeywords": ["..."],
  "sectionScores": [
    {"section": "Summary", "score": 0, "notes": "..."},
    {"section": "Experience", "score": 0, "notes": "..."},
    {"section": "Skills", "score": 0, "notes": "..."},
    {"section": "Education", "score": 0, "notes": "..."},
    {"section": "Projects", "score": 0, "notes": "..."},
    {"section": "Certifications", "score": 0, "notes": "..."}
  ],
  "summary": "...",
  "recommendations": ["..."]
}

RESUME:
${input.resumeText}

JOB DESCRIPTION:
${input.jobDescription}
`;
}