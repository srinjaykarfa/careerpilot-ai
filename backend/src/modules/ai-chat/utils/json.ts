export function extractJsonBlock(value: string): string | null {
  const fenced = value.match(/```json\s*([\s\S]*?)```/i);
  if (fenced?.[1]) {
    return fenced[1].trim();
  }

  const generic = value.match(/\{[\s\S]*\}/);
  return generic ? generic[0].trim() : null;
}

export function safeJsonParse<T>(value: string): T | null {
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}
