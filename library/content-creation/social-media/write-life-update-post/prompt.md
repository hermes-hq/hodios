---
schema: 1
id: write-life-update-post
kind: prompt
title: Write a personal life update post
description: Writes a personal social post sharing news such as an engagement, a move, a graduation, a career break or a health update, with privacy choices made first and a version for each audience.
category: social-media
version: 1.0.0
status: incubating
stage: [build]
role: [individual]
inputs: [text]
output: [post]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [life-news, personal-posting, privacy-choices, audience-settings]
pairs_with:
  prompts: [write-personal-photo-captions, share-pregnancy-news, write-birth-announcement]
args:
  - name: news
    description: The news, the details you are comfortable sharing, who it involves, and how you feel about it.
    type: text
    required: true
  - name: audience
    description: Where it will be posted and who sees it, for example close friends on Instagram, everyone on Facebook including relatives and colleagues.
    type: text
    required: true
  - name: tone
    description: light for happy news said simply; heartfelt for emotional news; matter-of-fact for news you want acknowledged without fuss.
    type: enum
    enum: [light, heartfelt, matter-of-fact]
    default: light
output_contract:
  format: markdown
  sections: [Privacy check, Post, Other versions, Replies to expect]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
People post life news to tell many people at once: an engagement, a move to a new city, finishing a degree, leaving work to care for someone, a diagnosis or recovery. The hard parts are not the words. They are who should hear it first in person (parents, close friends, a partner's family), what to leave out (exact addresses, dates of a move, a child's school, details of someone else's health), and how the post will be received by a mixed audience of close friends, distant relatives and colleagues. Posts about difficult news also benefit from telling people what helps ("no need to reply", "messages welcome", "please don't ask for details"). A good update is short, sounds like the person, and gives readers the cue they need.

<news>
{{news}}
</news>
<audience>
{{audience}}
</audience>
Tone: {{tone}}
</context>

<task>
1. Privacy check: list who might need to hear before the post goes up, details to leave out (addresses, exact dates of an empty home, other people's private information, children's identifying details), and whether others named have agreed.
2. Write the post in the chosen tone: the news in the first line, one or two lines of what it means to the person, and, for difficult news, a clear cue about replies and support.
3. Write other versions: a shorter one for a wider audience or a different platform, and if the audience is mixed, a note on using close-friends lists or audience settings.
4. Write "replies to expect": two or three short reply templates for common responses (congratulations, intrusive questions, condolences or advice the person did not ask for).
</task>

<constraints>
- Use only details given; do not invent events, feelings, names or dates.
- Do not include other people's health or private details unless the user says they agreed.
- For health news, do not add medical explanations or prognosis.
- Under about 120 words for the main post.
</constraints>

<output_format>
## Privacy check
Bullets.
## Post
The post, ready to paste.
## Other versions
A shorter version and an audience note.
## Replies to expect
Two or three short templates.
</output_format>
