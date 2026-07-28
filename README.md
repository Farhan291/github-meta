# GitHub Meta

GitHub Meta is a Devvit app that automatically replies with metadata for GitHub repositories mentioned in Reddit posts and comments.

Once installed, the app watches all new submissions and comments in your subreddit. If it detects a GitHub repository URL, it fetches the repository's public metadata from the GitHub API and replies with a concise summary.

## Included Meta-data

To keep replies concise and useful, GitHub Meta currently includes:

- Respository name
- description
- stars
- fork counts
- primary language
- license
- last updated
- archived status

Github meta is open source. [You can find the source code on GitHub here](https://github.com/Farhan291/github-meta.git)

## Privacy

GitHub Meta only reads public GitHub repository metadata. It does not collect or store Reddit user data.
