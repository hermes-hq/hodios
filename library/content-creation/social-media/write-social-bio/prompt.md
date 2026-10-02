---
schema: 1
id: write-social-bio
kind: prompt
title: Write a social profile bio
description: Writes profile bios per platform within character limits that say who it is for, what people get and why to follow, in several voice options. Use for creators, freelancers and brands.
category: social-media
version: 1.0.0
status: incubating
stage: [build]
role: [content-creator, founder, consultant, individual]
stack: [instagram, linkedin, x-twitter, tiktok, youtube]
inputs: [text, preferences]
output: [copy]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [profile-bio, character-limits, value-proposition, personal-brand]
pairs_with:
  prompts: [write-linkedin-post, define-content-pillars]
args:
  - name: about
    description: Who you or the brand are, what you make or offer, who it is for, proof points (results, credentials, notable work) and anything that must or must not appear.
    type: text
    required: true
  - name: platforms
    description: The platforms to write for, for example "Instagram, LinkedIn headline and About, YouTube, Bluesky".
    type: text
    required: true
  - name: goal
    description: What the profile should get visitors to do, for example "follow", "join the newsletter", "book a call", "buy the course".
    type: string
    default: follow
output_contract:
  format: markdown
  sections: [Positioning line, Bios by platform, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write profile bios that turn a visitor into a follower or customer in the few seconds they spend on a profile. A good bio answers three questions fast: who is this for, what will I get, and why should I trust or follow this person. Proof beats adjectives ("helped 40 bakeries price their menus" beats "passionate pricing expert"). Each platform has its own space, culture and conventions, and the visible limit matters more than the theoretical one.

Commonly cited limits, which platforms change from time to time:
- Instagram bio: 150 characters. Threads bio: 150.
- X bio: 160. Bluesky bio: 256. TikTok bio: 80.
- LinkedIn headline: 220; LinkedIn About: 2,600 (only the first two or three lines show before "see more").
- YouTube channel description: 1,000 (only the start shows on most screens).
- Pinterest About: 500.
</context>

<task>
<about>
{{about}}
</about>

Platforms: {{platforms}}
Goal: {{goal}}

1. Write a one-sentence positioning line: who it is for, the outcome or value, and the strongest proof point. Every bio builds on it.
2. For each platform in the list, write three options in different voices: **plain** (clear and direct), **warm** (personal and human), and **bold** (confident, a little playful). Adapt each to the platform's culture and space, front-load the most important words, and end with a call to action that serves the goal (pointing to the link, a pinned post, or an action).
3. Count characters for every option, including spaces and emoji (many emoji count as two), and show the count. Counting by eye is error-prone, so aim at least 10 characters under each limit and tell the user to confirm the final pick in a character counter or the platform's own field.
4. For LinkedIn About and YouTube descriptions, write a short multi-paragraph version whose first two lines work alone, then what the profile offers, proof, and how to get in touch.
5. Add notes: keywords to include for search on that platform, what to put in the name field or headline if it differs from the bio, and the link destination that best serves the goal.
</task>

<constraints>
- Use only facts given in the about text. Never invent numbers, clients, awards, follower counts or credentials; if a proof point would help, add `[PROOF: …]` and list it in Notes.
- If a platform is not in the limits list, ask for its limit or state an assumed limit and mark it.
- Avoid clichés such as "passionate about", "guru", "ninja", "lover of all things", and avoid strings of hashtags.
- Emoji only in the bold voice and only where they replace words, never as decoration in the plain voice.
- If the about text is too thin to say who it is for or what they get, ask one focused question before writing, or write with clearly marked assumptions.
</constraints>

<output_format>
## Positioning line
One sentence.

## Bios by platform
For each platform, a `###` heading with the limit, then the three options, each followed by its character count in brackets.

## Notes
Keywords, name field or headline suggestions, link destination, and any placeholders to fill.
</output_format>
