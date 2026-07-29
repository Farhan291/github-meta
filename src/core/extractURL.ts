import type { Reporef } from '../lib/types';
export default function extractGithubUrl(text?: string | null): Reporef | null {
  if (!text) return null;
  const match = text.match(/(github\.com|codeberg\.org)\/([\w-]+)\/([\w.-]+)/i);
  if (!match) return null;

  const providerHost = match[1];
  const owner = match[2];
  const rawRepo = match[3];

  if (!providerHost || !owner || !rawRepo) return null;

  const provider = providerHost === 'github.com' ? 'github' : 'codeberg';
  const repo = rawRepo.replace(/[.,!?)\]]+$/, '');

  return { provider, ownerRepo: `${owner}/${repo}` };
}
