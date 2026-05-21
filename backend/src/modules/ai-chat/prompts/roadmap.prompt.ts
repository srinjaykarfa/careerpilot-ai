export function buildRoadmapPrompt(input: unknown): string {
  return `Build a roadmap based on this input: ${JSON.stringify(input)}`;
}
