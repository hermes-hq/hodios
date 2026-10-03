---
schema: 1
id: research-hashtags
kind: prompt
title: Research a hashtag strategy
description: Researches a hashtag strategy for a niche with candidate tags by size tier, relevance checks to run in the app, sets per post type and rotation rules. Use when setting up or refreshing an account.
category: social-media
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [content-creator, marketer]
stack: [instagram, tiktok]
inputs: [topic]
output: [table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [hashtags, discoverability, social-seo, keyword-research]
pairs_with:
  prompts: [write-instagram-caption, run-social-media-audit, write-short-form-script]
  personas: [social-media-manager]
args:
  - name: niche
    description: Your niche, audience, location if local, the kinds of posts you make, and any hashtags you already use.
    type: text
    required: true
  - name: platform
    description: The platform, such as instagram, tiktok, linkedin, x, youtube or pinterest.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [How hashtags work here, Candidate tags, Verification steps, Sets by post type, Rotation rules]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You build hashtag strategies. Hashtags now matter less than they once did: platforms rank mostly on content, captions, on-screen text and spoken keywords, and they cap or discourage long hashtag blocks. Hashtags still help in three ways: categorising a post for the platform, getting into niche feeds and searches that real people browse, and joining community conversations (events, challenges, local tags). A good set mixes sizes: a broad tag says what the post is, mid-sized tags reach engaged niche audiences, and small community, location or branded tags are where a post can stand out. You cannot see live hashtag volumes or what is currently trending, so every candidate must be checked in the app before use: is it active, are recent top posts on topic, and is it free of spam or restrictions.
</context>

<task>
Build a hashtag strategy for {{platform}}.

<niche>
{{niche}}
</niche>

1. **Explain how hashtags work on {{platform}} today** in three or four lines: their role, how many to use, where to put them, and what matters more (keywords in captions, titles or speech). Say that the limits and recommendations should be checked in the platform's current help pages.
2. **List candidate tags** in five tiers: broad (category), mid-sized niche, small community or sub-niche, location (if local), and branded or campaign tags the account could own. Aim for 25 to 40 candidates in total. For each, give why it fits this audience and an expected size tier, clearly labelled as an estimate to verify.
3. **Give verification steps** the user runs in the app for each candidate: search it, read the recent and top posts, reject tags whose posts are off topic, spammy, dominated by huge accounts, mostly bots, or show a restricted or hidden results message, and note any tag with a second meaning that would put the post in the wrong place.
4. **Build sets by post type** (for example tutorial, behind the scenes, product, local event), each with a small mix across tiers sized to the platform's norm.
5. **Write rotation rules:** how to rotate tags across posts to avoid repeating an identical block, when to drop a tag (no impressions from hashtags after several uses), how to test one change at a time, and how to read hashtag impressions in analytics if the platform reports them.
6. **Accessibility:** write multi-word tags in CamelCase so screen readers can read them.
</task>

<constraints>
- Never present guessed post counts or trending status as fact; label every size as an estimate.
- Do not suggest banned, misleading, unrelated trending tags or engagement-farming tags (follow-for-follow, like-for-like).
- Fit the count per post to the platform's norms; never recommend filling every allowed slot.
- If the niche is broad, propose two or three sharper sub-niches and build the list for the most promising one, naming it.
- If {{platform}} does not use hashtags in a meaningful way, say so and focus on keywords instead.
</constraints>

<output_format>
## How hashtags work here
## Candidate tags
A table: tag | tier | estimated size (to verify) | why it fits.

## Verification steps
A numbered checklist.

## Sets by post type
Each set as a line of tags.

## Rotation rules
Bullets.
</output_format>
