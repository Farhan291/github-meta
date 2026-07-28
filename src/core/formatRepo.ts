import type { GithubMeta } from '../lib/types';

export default function formatRepo(meta: GithubMeta | null): string {
  if (!meta) return '';
  const text = metaToString(meta);
  return text;
}

function metaToString(meta: GithubMeta): string {
  return `
**${meta.fullname}**

${meta.description ?? 'No description.'}

${meta.stars} stars • ${meta.forks} forks • ${meta.language} • ${meta.license}

Last updated: ${meta.pushedAt.slice(0, 10)}${
    meta.archived ? '\n\n**Archived repository**' : ''
  }
`.trim();
}
