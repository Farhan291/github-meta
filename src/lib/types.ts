export type Reporef = {
  provider: 'github' | 'codeberg';
  ownerRepo: string;
};

export type GithubMeta = {
  fullname: string;
  description: string | null;
  stars: number;
  forks: number;
  license: string;
  language: string;
  createdAt: string;
  pushedAt: string;
  archived: boolean;
};
