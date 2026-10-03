---
schema: 1
id: write-short-social-posts
kind: prompt
title: Write a batch of short social posts
description: Writes a batch of standalone short posts for X, Threads or Bluesky from ideas or a long piece, each with a hook, a varied format and a character count. Use to fill a week or two of posts.
category: social-media
version: 1.0.1
status: incubating
stage: [build]
role: [content-creator, marketer, founder]
stack: [x-twitter]
inputs: [document, notes]
output: [post]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [microblogging, threads-app, bluesky, hooks, content-batching]
pairs_with:
  prompts: [turn-article-into-thread, repurpose-video-into-posts, plan-sustainable-posting-schedule]
  personas: [social-media-manager]
args:
  - name: source
    description: The material to work from, such as an article, transcript, newsletter, notes or a list of ideas. Add your audience and voice if they are not obvious.
    type: text
    required: true
  - name: platform
    description: The platform, such as x, threads or bluesky. Leave empty to write posts that fit all three.
    type: string
  - name: count
    description: How many posts to write.
    type: number
    default: 10
output_contract:
  format: markdown
  sections: [Posts, Unused angles]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Reads cleanly when no platform is given."}
---
<context>
You write short-form text posts for microblogging platforms. These feeds move fast: a post wins or loses on its first line, and each post must stand alone, because most readers never see the account's other posts. The best batches mix formats so the feed does not feel repetitive: a sharp observation, a counter-intuitive take, a short list, a mini-story, a how-to in three lines, a question that invites real answers, a specific number or result, a before-and-after, a quote from the source, and a one-liner. Character limits differ: X allows 280 characters for standard accounts, Threads 500, and Bluesky 300. Posts with links often get less reach on some platforms, so the link can go in a reply. Each platform has its own culture: X rewards punchy takes and replies, Threads a warmer, conversational tone, and Bluesky a community-minded, less promotional voice.
</context>

<task>
Write {{count}} posts.{{#platform}} Platform: {{platform}}.{{/platform}} If no platform is given, keep every post under 280 characters so it fits X, Threads and Bluesky.

<source>
{{source}}
</source>

1. Pull the distinct ideas from the source: claims, numbers, stories, lessons, quotable lines, and questions it raises. Rank them by how interesting they are to the audience on their own.
2. Write {{count}} posts, one idea each, rotating formats so no two adjacent posts use the same one. Each post:
   - opens with a hook that works if it is the only line read;
   - delivers one complete thought, so it stands alone without the source;
   - sounds like a person, matching the voice in the source or the stated voice;
   - fits the platform's limit with room to spare.
3. Use hashtags only where the platform's users actually use them (sparingly on Threads and Bluesky, one or two at most on X), and no emojis unless the source's voice uses them.
4. Mark which posts should carry a link to the source and suggest putting it in a reply.
5. List the strong ideas you did not use, as seeds for later.
</task>

<constraints>
- Every claim, number and quote must come from the source; never invent statistics, results or testimonials.
- No engagement bait ("like if you agree", "RT for part 2") and no rage-bait framing that misrepresents the source.
- No thread markers ("1/") unless the user asked for a thread; these are standalone posts.
- If the source is too thin for {{count}} distinct posts, write as many good ones as it supports and say so instead of repeating ideas.
- If the platform is not x, threads or bluesky, say so and write to the closest equivalent limit.
</constraints>

<output_format>
## Posts
Numbered posts, each followed by a line with the format name, the character count, and "link in reply" if it applies.

## Unused angles
Bullets.
</output_format>
