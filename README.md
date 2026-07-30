# GitHub Meta

GitHub Meta is a Devvit app that automatically replies with metadata for GitHub and Codeberg repositories mentioned in Reddit posts and comments.

Once installed, the app watches all new submissions and comments in your subreddit. If it detects a repository URL, it fetches the repository's public metadata and replies with a concise summary.

## Included Metadata

To keep replies concise and useful, GitHub Meta currently includes:

- Repository name
- Description
- Stars
- Fork count
- Primary language
- License
- Last updated
- Archived status

## Supported Providers

- GitHub
- Codeberg

## Open Source

GitHub Meta is open source. [View the source code on GitHub](https://github.com/Farhan291/github-meta).

## Privacy

GitHub Meta only reads public repository metadata (from GitHub or Codeberg). It does not collect or store any Reddit user data.
