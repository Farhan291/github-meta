import { settings } from '@devvit/web/server';
import type { GithubMeta, Reporef } from '../lib/types';

export default async function fetchMeta(ref: Reporef): Promise<GithubMeta> {
  const ownerRepo = ref.ownerRepo;

  const url =
    ref.provider === 'github'
      ? `https://api.github.com/repos/${ownerRepo}`
      : `https://codeberg.org/api/v1/repos/${ownerRepo}`;

  const headers: Record<string, string> = {};

  if (ref.provider === 'github') {
    const token = await settings.get('pat');
    headers.Authorization = `Bearer ${token}`;
    headers['User-Agent'] = 'devvit-github-meta-app';
    headers.Accept = 'application/vnd.github+json';
  }

  const res = await fetch(url, { headers });

  if (res.status === 404) {
    throw new Error('Repository not found');
  }
  if (res.status === 403) {
    throw new Error('Rate limited by API');
  }
  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }
  const data = await res.json();
  return {
    fullname: data.full_name,
    description: data.description,
    stars: ref.provider === 'github' ? data.stargazers_count : data.stars_count,
    forks: data.forks_count,
    license: data.license?.name ?? 'No license',
    language: data.language,
    createdAt: data.created_at,
    pushedAt: ref.provider === 'github' ? data.pushed_at : data.updated_at,
    archived: data.archived,
  };
}
