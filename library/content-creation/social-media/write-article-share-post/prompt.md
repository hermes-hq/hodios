---
schema: 1
id: write-article-share-post
kind: prompt
title: Write a post sharing an article with your take
description: Writes a post sharing an article, report or talk with your own take, the one point worth knowing and a real question, so it adds value beyond the link and represents the source fairly.
category: social-media
version: 1.0.0
status: incubating
stage: [build]
role: [individual, marketer, content-creator, researcher]
inputs: [text, url, notes]
output: [post]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [link-sharing, commentary, thought-leadership, fair-summary]
pairs_with:
  prompts: [write-linkedin-post, turn-article-into-thread, write-thoughtful-linkedin-comments]
args:
  - name: source
    description: The article, report or talk text (or the key passages), its title and author or publisher. A link alone is not enough; paste the text or the parts you read.
    type: text
    required: true
  - name: take
    description: What you think about it, from your experience, and whether you agree, disagree or want to add something.
    type: text
    required: true
  - name: platform
    description: Where you will post it.
    type: enum
    enum: [linkedin, x, bluesky, threads, facebook, mastodon]
    default: linkedin
output_contract:
  format: markdown
  sections: [Post, Alternative angle, Accuracy check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Sharing a link with "Great read!" gets little attention, and platforms often show link posts less than native posts. Shares that build a reputation do three things: pull out the one finding or argument worth knowing, so the post is useful even if nobody clicks; add the sharer's own experience or disagreement; and ask a question the sharer actually wants answered. They also represent the source fairly: misquoting a headline, overstating a study, or presenting a preprint or opinion piece as settled fact are common and damaging. Because the assistant cannot open links reliably, it must work from the text the user pasted.

<source>
{{source}}
</source>
<take>
{{take}}
</take>
Platform: {{platform}}
</context>

<task>
1. If the source is only a link or a headline, ask the user to paste the text or key passages and stop.
2. Identify the source type (news, study, preprint, report, opinion, talk), the one point worth knowing, and any limits the source itself states (sample size, region, caveats).
3. Write the post for the platform:
   - open with the specific point or the user's reaction to it, not "Interesting article";
   - one or two lines summarising the point accurately, with a short quote only if it is in the pasted text;
   - the user's take, from their experience;
   - a genuine question to readers;
   - credit the author or publisher and leave a [LINK] placeholder where the platform suits it (for example in the post or the first comment).
4. Write an alternative angle (for example a respectful disagreement or a practical application).
5. Accuracy check: list each claim the post makes about the source and where it appears in the pasted text, and flag anything that goes beyond it.
</task>

<constraints>
- Do not claim anything the pasted text does not support; label opinion pieces and preprints as such.
- Quote only exact words from the pasted text, and briefly.
- Fit the platform length: LinkedIn under about 180 words; X, Bluesky and Threads within one post's limit or a two-post thread; others short.
- No engagement bait and at most two hashtags.
</constraints>

<output_format>
## Post
Ready to paste, with [LINK] placeholder.
## Alternative angle
A second version.
## Accuracy check
Bullets: claim and where it appears in the source.
</output_format>
