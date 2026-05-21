export function buildMentorPrompt(input: unknown): string {
  return `Respond as a mentor using this input: ${JSON.stringify(input)}`;
}
