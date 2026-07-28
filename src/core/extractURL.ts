export default function extractGithubUrl(text?: string | null): string | null {
  if (!text) return null;

  const match = text.match(/github\.com\/([\w.-]+)\/([\w.-]+)/i);
  if (!match) return null;
  return `${match[1]}/${match[2]}`;
}
