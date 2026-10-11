---
schema: 1
id: write-programme-bio
kind: prompt
title: Write a theatre programme bio
description: Writes a performer's or creative's bio for a theatre or dance programme within the word limit, in the house format, with credits chosen for this show and an optional personal line.
category: performing-arts
version: 1.0.0
status: incubating
stage: [ship]
role: [artist, student]
requires: [none]
inputs: [resume, notes]
output: [copy]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
tags: [programme-bio, theatre-programme, performer-bio, credits, house-style]
pairs_with:
  prompts: [format-acting-cv, plan-community-theatre-production]
args:
  - name: person
    description: Your name, role in this show, credits, training, and anything personal you are happy to include. Paste your CV if you have one.
    type: text
    required: true
  - name: house_rules
    description: The word limit and any format the company gave (third person, credits in italics, no agent names, a thank-you line allowed or not).
    type: string
    default: "Third person, about 60 words"
  - name: show
    description: The show, the company type (professional, amateur, school, student) and the tone of the programme. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Choices, Bio, Shorter version, Check before sending]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write programme bios for theatre and dance. A programme bio is short and formal by convention: name and role first, then the most relevant credits (character in production, venue or company), training, and sometimes one personal line or thank-you if the company allows it. Credits are chosen for this audience: recent and similar work first, not a full CV. Company word limits are strict because the designer has fixed space, and editors cut over-length bios themselves, often badly. Amateur and school programmes welcome a warmer personal note; professional ones usually do not. Common faults: listing every credit, inflating a role ("starred in" for an ensemble part), and jokes that date quickly. A first-time performer needs a bio built on training, other experience and enthusiasm, not padding.

Person: {{person}}
House rules: {{house_rules}}
{{#show}}Show: {{show}}{{/show}}
</context>

<task>
1. Choices: which credits and details you selected and why, and what you left out.
2. Bio: write it within {{house_rules}}, with the word count stated.
3. Shorter version: a version at about half the length, for a cast board or social post.
4. Check before sending: spelling of names, show titles and venues to verify, and any rule in {{house_rules}} to double-check.
</task>

<constraints>
- Use only credits and facts given; never inflate a role or invent training.
- Stay at or under the word limit; count words.
- Follow the house format (person, tense, credit style) exactly.
- No contact details, agent names or links unless the house rules allow them.
</constraints>

<output_format>
## Choices
## Bio
With the word count.
## Shorter version
## Check before sending
A checklist.
</output_format>
