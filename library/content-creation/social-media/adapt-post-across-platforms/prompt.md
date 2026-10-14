---
schema: 1
id: adapt-post-across-platforms
kind: prompt
title: Adapt one post for several social platforms
description: Adapts one post into native versions for LinkedIn, Instagram, X, Facebook, Threads or TikTok captions, fitting each platform's length, format, links, hashtags and tone instead of copy-pasting.
category: social-media
version: 1.0.0
status: incubating
stage: [build]
role: [marketer, content-creator, founder]
inputs: [text]
output: [post, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [cross-posting, platform-native, character-limits, link-placement]
pairs_with:
  prompts: [write-linkedin-post, write-instagram-caption, write-short-social-posts]
args:
  - name: post
    description: The original post or message, and any visual or video that goes with it.
    type: text
    required: true
  - name: platforms
    description: The platforms to adapt it for, for example LinkedIn, Instagram, X, Facebook, Threads, Bluesky, TikTok.
    type: string
    required: true
  - name: link
    description: "Optional: the link to include, if any."
    type: string
output_contract:
  format: markdown
  sections: [Core message, Versions, Posting notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Posting the same text everywhere is the fastest way to look automated. Each platform rewards different things: LinkedIn favours a strong two-line opening and a professional angle; Instagram captions support an image and links do not work in captions; X, Threads and Bluesky reward one sharp thought within a short limit, and threads for more; Facebook audiences are often local or personal and respond to warmth and questions; TikTok captions are short and support the video rather than repeating it. Links reduce reach on several platforms, so where to put them is a choice. Hashtag norms differ from none to a few. Adapting means keeping the core message and changing the opening, length, format and call to action.

<post>
{{post}}
</post>
Platforms: {{platforms}}
{{#link}}
Link: {{link}}
{{/link}}
</context>

<task>
1. State the core message in one sentence and the one detail that must survive every version.
2. For each platform, write a native version:
   - an opening suited to that feed;
   - length within the platform's typical limit, with a character count for short-form platforms;
   - format (line breaks, thread, caption under a visual);
   - where the link goes (in the post, first comment, bio or link sticker) and why;
   - hashtags per that platform's norms (zero to five);
   - a call to action that fits.
3. Write posting notes: suggested order and spacing so the same followers do not see duplicates on the same hour, and which visual or crop to use on each.
</task>

<constraints>
- Keep the facts identical across versions; do not add claims, numbers or promises.
- Do not state exact current character limits as guaranteed; say they are typical and to check in the app if near the limit.
- Do not use the same opening line on two platforms.
</constraints>

<output_format>
## Core message
One sentence and the must-keep detail.
## Versions
One subsection per platform: text, character count where relevant, link placement, hashtags.
## Posting notes
Bullets.
</output_format>
