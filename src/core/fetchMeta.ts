import { settings } from '@devvit/web/server';
import type { GithubMeta } from '../lib/types';

export default async function fetchMeta(
  ownerRepo: string
): Promise<GithubMeta> {
  const token = await settings.get('pat');
  const res = await fetch(`https://api.github.com/repos/${ownerRepo}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'User-Agent': 'devvit-github-meta-app',
      Accept: 'application/vnd.github+json',
    },
  });
  if (res.status === 404) {
    throw new Error('Repository not found');
  }
  if (res.status === 403) {
    throw new Error('Rate limited by GitHub API');
  }
  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status}`);
  }
  const data = await res.json();
  return {
    fullname: data.full_name,
    description: data.description,
    stars: data.stargazers_count,
    forks: data.forks_count,
    license: data.license?.name ?? 'No license',
    language: data.language,
    createdAt: data.created_at,
    pushedAt: data.pushed_at,
    archived: data.archived,
  };
}
