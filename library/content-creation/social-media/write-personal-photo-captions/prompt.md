---
schema: 1
id: write-personal-photo-captions
kind: prompt
title: Write captions for personal photos
description: Writes short captions for personal Instagram or Facebook photos such as trips, birthdays, nights out or everyday moments, in several tones, with no hashtag spam, sales lines or oversharing.
category: social-media
version: 1.0.0
status: incubating
stage: [build]
role: [individual, traveler]
stack: [instagram]
inputs: [text, image]
output: [post]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: "off"
level: beginner
depth: specific
tags: [personal-posting, short-captions, photo-dump, location-privacy]
pairs_with:
  prompts: [write-life-update-post, write-instagram-caption]
args:
  - name: photos
    description: What the photos show (or attach them), where and when, who is in them, and anything funny or meaningful about the moment.
    type: text
    required: true
  - name: vibe
    description: How you want to come across, for example funny, low-key, sentimental, dry, or "like I didn't try too hard".
    type: string
  - name: platform
    description: Where you will post.
    type: enum
    enum: [instagram, facebook, instagram-story, other]
    default: instagram
output_contract:
  format: markdown
  sections: [Captions, Before you post]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Personal captions are not marketing. The ones people like are short, sound like the person, and add something the photo does not show: an inside joke, a detail, a feeling, a quiet observation. Assistant-written captions often fail by sounding like brand copy ("Living my best life ✨ #wanderlust #blessed"), stacking hashtags, quoting overused lines, or explaining the photo. Personal posts also leak more than people intend: a live location while away from home, a child's school uniform, a house number, a boarding pass barcode, or friends tagged who did not want to be. A good caption set offers a few tones and a quick check before posting.

<photos>
{{photos}}
</photos>
{{#vibe}}
Vibe: {{vibe}}
{{/vibe}}
Platform: {{platform}}
</context>

<task>
1. Pick out the specific detail or feeling that makes the moment worth posting.
2. Write eight caption options, grouped by tone: two very short (one to four words or an emoji at most), two funny or dry, two warm or sentimental, two with a small detail or story (one or two sentences). Match the stated vibe more closely in at least four of them.
3. For a birthday or anniversary post to someone, add one option addressed to them.
4. Add one optional hashtag or location tag idea only if it helps friends find it (for example an event or wedding hashtag the user mentioned).
5. Before you post: a short checklist of privacy points relevant to these photos.
</task>

<constraints>
- No hashtag lists, no calls to action, no "link in bio", no brand-style slogans.
- Do not invent events, names, jokes about real people or details not in the input.
- Avoid overused caption clichés unless the user asked for them ironically.
- Keep every caption under about 200 characters.
</constraints>

<output_format>
## Captions
Grouped by tone, each on its own line.
## Before you post
Three to five checklist items specific to these photos.
</output_format>
