---
schema: 1
id: write-news-social-posts
kind: prompt
title: Write news social posts
description: Adapts a published news story into platform posts that inform even if nobody clicks, with the key fact first, attribution, no curiosity gaps, care with crime and tragedy, and a correction format.
category: social-media
version: 1.0.0
status: incubating
stage: [build]
role: [writer, editor, student]
requires: [none]
inputs: [text, document]
output: [post]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [journalism, local-news, student-media, attribution, corrections]
pairs_with:
  prompts: [write-news-story, turn-article-into-thread]
args:
  - name: story
    description: The published story text or a full summary, with the headline, date, the outlet's sources and the link. Mark anything still unconfirmed.
    type: text
    required: true
  - name: platforms
    description: Where the posts will go (for example "Facebook page, Instagram, X, Bluesky, WhatsApp channel").
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Key facts, Posts, If the story changes, Checks before posting]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A local newsroom or student publication wants to share a story on social media. Most people read the post and never click, so a news post must inform on its own: the core fact up front, who says so, and what it means for the reader. Bait headlines ("You won't believe what the council just did") cost trust and spread confusion; vague crime posts invite speculation and identify the wrong people; and a post that is wrong lives on after the article is fixed. Treat the post as journalism with the same standards as the story.

Platforms: {{platforms}}
</context>

<task>
<story>
{{story}}
</story>

1. Extract the key facts: what happened, where, when, who is affected, the source of each claim (police, council, court record, our reporter), and what is still unknown. Separate confirmed facts from claims and allegations.
2. Write one post per platform. Each leads with the most important fact in the first line, attributes contested or official claims ("police said", "according to the council"), states what the reader can do or expect if relevant (road closed until 6pm, meeting on Thursday), and ends with the link and a reason to read more (what the full story adds), not a teaser that withholds the news.
3. Fit the platform: one or two sentences plus link for X or Bluesky; a slightly fuller summary for Facebook; for Instagram a headline card text (under 12 words) plus caption with "link in bio" or the platform's link feature; for WhatsApp or Telegram channels a two-line brief.
4. For crime, courts, accidents, deaths and suicide: use "alleged" and "charged with" accurately, do not name or show victims, minors or uncharged suspects unless the story does so with clear justification, avoid graphic detail, follow safe reporting on suicide (no method, no simple cause, include support information), and suggest switching comments to limited or monitored.
5. Write a correction or update template that names what changed, in a post that replaces or replies to the original, never a silent edit.
</task>

<constraints>
- Use only facts in the story. Never add details, numbers, names or quotes. If the story leaves a key fact unclear, write around it and flag it.
- No curiosity gaps, all-caps, clickbait emoji or "BREAKING" unless the event is happening now and confirmed.
- Keep the outlet's attribution and dates exact; say "on Monday" only if the post goes out that week, otherwise use the date.
- Do not editorialise in a news post; opinion pieces must be labelled as opinion.
- If the story text is missing, ask for it and stop.
</constraints>

<output_format>
## Key facts
Bullets: fact, source, confirmed or claimed. Then "Unknown:" bullets.

## Posts
One subsection per platform with the post ready to paste and a note on images (what to use, what to avoid).

## If the story changes
A correction template and an update template with [X] slots.

## Checks before posting
Short checklist: names and spellings, legal risks to raise with an editor (contempt, defamation, anonymity orders), comment settings.
</output_format>
