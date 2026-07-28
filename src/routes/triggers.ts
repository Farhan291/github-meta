import { Hono } from 'hono';
import { reddit } from '@devvit/web/server';
import type {
  OnAppInstallRequest,
  TriggerResponse,
  OnCommentCreateRequest,
  OnPostSubmitRequest,
} from '@devvit/web/shared';
import extractGithubUrl from '../core/extractURL';
import fetchMeta from '../core/fetchMeta';
import formatRepo from '../core/formatRepo';

export const triggers = new Hono();

triggers.post('/on-app-install', async (c) => {
  const input = await c.req.json<OnAppInstallRequest>();
  console.log('App installed to subreddit: r/' + input.subreddit?.name);

  return c.json<TriggerResponse>(
    {
      status: 'success',
    },
    200
  );
});

triggers.post('/post-create', async (c) => {
  const input = await c.req.json<OnPostSubmitRequest>();
  const post = input.post;
  if (!post) {
    return c.json<TriggerResponse>({ status: 'success' }, 200);
  }
  const ownerRepo =
    extractGithubUrl(post.url) ?? extractGithubUrl(post.selftext);

  if (!ownerRepo) {
    return c.json<TriggerResponse>({ status: 'success' }, 200);
  }
  try {
    const meta = await fetchMeta(ownerRepo);
    const commentText = formatRepo(meta);

    await reddit.submitComment({
      id: post.id as `t3_${string}`,
      text: commentText,
      runAs: 'APP',
    });
    console.log(`Replied with GitHub meta for ${ownerRepo} on post ${post.id}`);
  } catch (err) {
    console.error(`Failed to fetch/post GitHub meta for ${ownerRepo}:`, err);
  }
  return c.json<TriggerResponse>({ status: 'success' }, 200);
});

const BOT_MARKER = 'Repository:';
triggers.post('/comment-create', async (c) => {
  const input = await c.req.json<OnCommentCreateRequest>();
  const comment = input.comment;
  if (!comment) {
    return c.json<TriggerResponse>({ status: 'ok' });
  }
  if (comment.body?.includes(BOT_MARKER)) {
    return c.json<TriggerResponse>({ status: 'success' }, 200);
  }
  const ownerRepo = extractGithubUrl(comment.body);
  if (!ownerRepo) {
    return c.json<TriggerResponse>({ status: 'ok' });
  }
  try {
    const meta = await fetchMeta(ownerRepo);
    const commentText = formatRepo(meta);

    await reddit.submitComment({
      id: comment.id as `t1_${string}`,
      text: commentText,
      runAs: 'APP',
    });
    console.log(
      `Replied with GitHub meta for ${ownerRepo} on comment ${comment.id}`
    );
  } catch (err) {
    console.error(`Failed to fetch/post GitHub meta for ${ownerRepo}:`, err);
  }
  return c.json<TriggerResponse>({ status: 'ok' });
});
