---
schema: 1
id: check-post-before-sharing
kind: prompt
title: Check a post before you share it
description: Runs a quick SIFT check on a social media post or forwarded message before you reshare it, and gives a share, share with a caveat, or do not share verdict in plain words.
category: fact-checking
version: 1.0.0
status: incubating
stage: [verify]
role: [individual, parent, student, content-creator]
requires: [web]
inputs: [text, url, image]
output: [report]
risk: network
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [sift-method, lateral-reading, media-literacy, viral-posts, whatsapp-forwards]
pairs_with:
  prompts: [fact-check-claims, respond-to-misinformation, verify-screenshot-of-post]
  personas: [fact-checker]
args:
  - name: post
    description: The post or forwarded message, pasted as text, as a link, or described if it is an image or video, including who posted it.
    type: text
    required: true
  - name: where_sharing
    description: Optional. Where you want to share it, for example a family group chat, your public profile or a work channel.
    type: string
output_contract:
  format: markdown
  sections: [Verdict, Who is behind it, What others report, The original context, If you still want to share]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Professional fact-checkers do not read a suspicious post closely and judge it on its looks; they leave it and read laterally, checking what other sources say about the account and the claim. The SIFT method condenses this into four moves: Stop (notice a strong emotional reaction and do not share yet), Investigate the source (who is this account or outlet, really?), Find better coverage (do trustworthy outlets or fact-checkers report the same thing?), and Trace claims, quotes and media to the original context (the full video, the original study, the date the photo was taken). Most viral misinformation is not invented from nothing: it is real material that is old, from another place, cropped, mistranslated or stripped of context. The real cost of resharing is that people trust what friends send, and corrections rarely travel as far as the original.
</context>

<task>
Check this post before I share it{{#where_sharing}} in {{where_sharing}}{{/where_sharing}}.
<post>
{{post}}
</post>

1. Stop: name the main claim in one sentence and note any emotional hooks (outrage, fear, "share before it is deleted", urgency).
2. Investigate the source: who posted it, how old the account is, what else it posts, and whether it is a known outlet, satire site, parody or anonymous account.
3. Find better coverage: search for the claim in reliable news outlets and fact-checking organisations. Note whether they confirm, debunk or do not mention it.
4. Trace to the original: find the original image, video, quote, document or study, its date and place, and compare it with the version in the post.
5. Give the verdict and, if sharing is reasonable, a short caption that adds the needed context.
</task>

<constraints>
- Keep it short and plain; this is a quick check, not an investigation.
- Cite only pages you opened in this session, with links. Never invent a fact-check, article or original source.
- If you have no web access, say so, give no verdict, and list the three or four searches the user can do in two minutes, with what to look for.
- "Not found anywhere reliable" for dramatic news is itself a warning sign; say so, but do not call the post false without evidence.
- Do not mock the person who sent it; if they ask, suggest a kind way to reply.
</constraints>

<output_format>
## Verdict
In bold: Share, Share with a caveat, Wait, or Do not share. Then one or two sentences.
## Who is behind it
## What others report
Bullets with links.
## The original context
## If you still want to share
A suggested caption with context, or a kind reply to whoever sent it.
</output_format>
