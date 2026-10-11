---
schema: 1
id: write-award-citations
kind: prompt
title: Write citations for award winners
description: Writes short, specific citations for each winner of a workplace, school or community award, to read aloud or print, balanced in length and checked for names and sensitive details.
category: business-writing
version: 1.0.0
status: incubating
stage: [build]
role: [manager, operations-manager, teacher, executive]
requires: [none]
inputs: [notes, document]
output: [script, copy]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: off
level: beginner
tags: [award-citations, awards-night, recognition, ceremony-script, staff-awards]
pairs_with:
  prompts: [write-award-nomination, plan-awards-ceremony, write-recognition-message]
args:
  - name: award_details
    description: The awards, what each category recognises, the audience and whether citations are read aloud, printed in a programme, or both.
    type: text
    required: true
  - name: winners
    description: For each winner, the category, name and role or team, and the nomination text or the specific things they did, with results.
    type: text
    required: true
  - name: length_words
    description: Target words per citation; 60 to 120 is typical for reading aloud.
    type: number
    default: 90
output_contract:
  format: markdown
  sections: [Citations, Pronunciation and checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write award citations: the short paragraphs read out before a winner walks up, or printed under their name. A good citation tells the room what the person actually did, with one concrete moment or result, and why it mattered to colleagues, customers or the community. Generic praise ("tireless dedication", "goes above and beyond") makes every winner sound the same. Citations read aloud work best when the name comes at the end, after the story, so the room can anticipate; printed citations put the name first. Fairness matters: winners notice when one citation is twice as long or warmer than another. Names must be right and pronounceable for the presenter, and private matters (health, bereavement, family hardship) stay out unless the winner agreed.

Target words per citation: {{length_words}}

<award_details>
{{award_details}}
</award_details>

<winners>
{{winners}}
</winners>
</context>

<task>
1. For each winner, pick the one or two most concrete actions or results in the notes and the people they helped.
2. Write each citation at about the target length (within 15%):
   - Read aloud: open with the category and the situation, describe what they did, the effect, and end with "… the winner of [award] is [name], [role or team]."
   - Printed: name and role first, then the same substance.
   - If the format is both, write the read-aloud version and a one-line printed caption.
3. Vary sentence openings and verbs across citations so they do not sound templated, while keeping the same structure and warmth for every winner.
4. Pronunciation and checks: for each name, a placeholder for the presenter's phonetic note (do not guess pronunciation), a list of facts to confirm with the nominator, and any detail you left out because it looked private.
</task>

<constraints>
- Use only facts from the notes; no invented achievements, numbers or quotes.
- Avoid stock phrases: "tireless", "above and beyond", "unsung hero", "rockstar".
- Keep the tone respectful; light humour only if the award details invite it, and never at the winner's expense.
- If a winner's notes are too thin to write a specific citation, write what you can and ask for one concrete example.
</constraints>

<output_format>
## Citations
One heading per award, then the citation.
## Pronunciation and checks
Table: Winner | Pronunciation note | Facts to confirm | Left out.
</output_format>
