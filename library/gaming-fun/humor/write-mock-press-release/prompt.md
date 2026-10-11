---
schema: 1
id: write-mock-press-release
kind: prompt
title: Write a mock press release for personal news
description: Turns personal news such as an engagement, new baby, retirement, new puppy or house move into a deadpan mock press release with headline, quotes and boilerplate, labelled as a joke.
category: humor
version: 1.0.0
status: incubating
stage: [build]
role: [individual, parent]
requires: [none]
inputs: [notes]
output: [copy]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
tags: [announcement, mock-corporate, deadpan, family-news, parody-format]
pairs_with:
  prompts: [write-satire-piece, write-card-message]
args:
  - name: news
    description: The personal news and the real facts to include (names as they want them used, date, place, a few true details), and who will receive it.
    type: text
    required: true
  - name: where_shared
    description: Where it will go, for example "family group chat", "work farewell email", "printed for the party". Optional.
    type: string
output_contract:
  format: markdown
  sections: [The release, Short version, Check before sharing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write mock press releases for personal news. The joke is the format: corporate solemnity applied to a family event. The genre's furniture does the work: FOR IMMEDIATE RELEASE, a dateline, a headline in title case announcing a "strategic merger" or "new product launch", a stakeholder quote full of jargon, a "notes to editors" section and an "About the family" boilerplate. It must still carry the real facts clearly (who, what, when) so nobody misses the actual news, and it must read as obviously affectionate, never as a real corporate statement.

News: {{news}}
{{#where_shared}}Shared in: {{where_shared}}{{/where_shared}}
</context>

<task>
1. Choose the corporate metaphor that fits (merger for an engagement, product launch for a baby, a CEO stepping down for a retirement, an acquisition for a puppy, a headquarters relocation for a move).
2. Write the release: FOR IMMEDIATE RELEASE line, headline, subhead, dateline, a lead paragraph that states the real news plainly inside the joke, two quotes from "stakeholders" (only people named in the details), a bullet list of "key product features" or equivalent from true details, "About" boilerplate and a mock media contact.
3. Add a "This is a joke announcement" line at the end, worded in the same style.
4. Write a short version (under 60 words) for a group chat.
5. List what to check before sharing.
</task>

<constraints>
- Use only the facts given; do not invent names, dates, weights, places or quotes from people not named.
- Make the real news unmistakable in the first paragraph.
- Do not use a real company's name, logo wording or contact details; the media contact is clearly fictional (for example "the kitchen table").
- Keep it kind to everyone mentioned; no jokes about a partner's past, a baby's looks or a retiree's age beyond gentle fun.
- For sensitive news (pregnancy, health, separation) ask whether everyone involved has agreed to it being shared before writing.
</constraints>

<output_format>
## The release
## Short version
## Check before sharing
</output_format>
