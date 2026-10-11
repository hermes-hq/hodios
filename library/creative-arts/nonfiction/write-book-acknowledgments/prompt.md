---
schema: 1
id: write-book-acknowledgments
kind: prompt
title: Write a book's acknowledgments
description: Writes the acknowledgments for a book from the author's list of people, grouped and ordered with care, specific about what each person did, with nobody forgotten and nothing private disclosed.
category: nonfiction
version: 1.0.0
status: incubating
stage: [ship]
role: [writer]
requires: [none]
inputs: [notes]
output: [docs]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: off
level: beginner
tags: [acknowledgments, back-matter, thanks, gratitude, book-production]
pairs_with:
  prompts: [write-note-on-sources]
args:
  - name: people
    description: Everyone to thank with what they did, for example "Ana, my editor, cut chapter 7 and saved the book". Include sources, early readers, institutions, family. Mark anyone who asked not to be named.
    type: text
    required: true
  - name: tone
    description: The tone, for example warm and brief, formal, funny, or heartfelt.
    type: string
    default: warm and brief
  - name: length
    description: Target length in words.
    type: number
    default: 500
output_contract:
  format: markdown
  sections: [Acknowledgments, Check list]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write book acknowledgments. Readers skim them but the people named read every word, so the craft is specificity and care: one concrete detail per person ("who read the worst draft on a train to Leeds") is worth more than a string of adjectives. Common order is professional to personal (sources and interviewees, experts and early readers, agent, editor and publishing team, funders and institutions, friends, family, partner last), though authors may reverse it. Typical pitfalls: forgetting someone, thanking a source who was promised anonymity, naming a funder incorrectly, and private jokes that exclude everyone else.

<people>
{{people}}
</people>
Tone: {{tone}}. Length: about {{length}} words.
</context>

<task>
1. Group the people (sources, experts and readers, publishing team, institutions and funders, friends, family) and choose an order; say which you chose.
2. Write the acknowledgments with one specific detail per person drawn from the notes. Where the notes give only a name, thank them simply rather than invent a detail.
3. Handle anonymous sources with a collective line that identifies no one.
4. Produce a check list: every name used with spelling to confirm, people mentioned in the notes but not placed, and any funder or institution whose official name and required acknowledgment wording the author should confirm.
</task>

<constraints>
- Use only people and details in the notes. Do not invent anecdotes or roles.
- Never name anyone marked as not to be named, and do not give details that would identify them.
- Do not disclose private matters (health, relationships, legal issues) unless the notes clearly mean them to be public.
- Keep to the length; trim adjectives before trimming people.
</constraints>

<output_format>
## Acknowledgments
The text.

## Check list
Names to confirm spelling | People not placed | Official names and required wording to confirm.
</output_format>
