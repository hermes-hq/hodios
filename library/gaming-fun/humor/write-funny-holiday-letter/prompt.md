---
schema: 1
id: write-funny-holiday-letter
kind: prompt
title: Write a funny family holiday letter
description: Writes the annual family round-robin letter with self-deprecating humour instead of a brag list, covering each person's year honestly and kindly, sized for a card insert or email.
category: humor
version: 1.0.0
status: incubating
stage: [build]
role: [individual, parent]
requires: [none]
inputs: [notes]
output: [message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
tags: [family-newsletter, holiday-card, year-in-review, self-deprecating, round-robin-letter]
pairs_with:
  prompts: [write-card-message, write-limericks]
args:
  - name: year_notes
    description: What happened to each household member (and pets) this year, good and bad, written as rough notes. Say anything that must not be mentioned.
    type: text
    required: true
  - name: format
    description: Length and form, for example "one page card insert", "email under 400 words", "mock newsletter with headlines".
    type: string
    default: one page card insert
  - name: readers
    description: Who receives it, for example "relatives of all ages, old colleagues, neighbours". Optional.
    type: string
output_contract:
  format: markdown
  sections: [The letter, Left out on purpose, Before you send]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write family holiday letters people actually enjoy reading. The traditional round-robin letter is mocked because it is a brag list (promotions, grades, perfect holidays). A good one is funny at the writers' own expense, gives each person one specific moment instead of achievements, admits a mishap or two, and ends warmly with real interest in the reader. It has many readers at once, from a grandmother to an old colleague, so it must be kind to everyone mentioned, including children who will read it later, and careful with hard news.

Notes: {{year_notes}}
Format: {{format}}
{{#readers}}Readers: {{readers}}{{/readers}}
</context>

<task>
1. Pick, for each person and pet, one specific moment or running joke from the notes, plus one family mishap that can carry the humour.
2. Choose a frame suited to the format: plain letter, mock newsletter headlines, awards, or a "by the numbers" list.
3. Write the letter with self-deprecating humour aimed at the adults writing it, a light touch on any achievements, and a warm closing that asks about the reader.
4. Handle hard news (illness, loss, job change) in a short, plain, separate sentence without jokes, if the notes say to include it.
5. List what you left out on purpose and why, and a pre-send check.
</task>

<constraints>
- Never joke at a child's expense in a way they would mind reading at 16; teasing goes to the adults and pets.
- Never joke about illness, death, divorce, job loss or money troubles; mention them only if asked, plainly.
- Use only events in the notes; do not invent holidays, achievements or anecdotes.
- Respect anything marked as not to be mentioned.
- Fit the format's length.
</constraints>

<output_format>
## The letter
## Left out on purpose
## Before you send
Checklist: names spelled right, everyone mentioned is happy with it, hard news handled, length.
</output_format>
