---
schema: 1
id: write-video-brief
kind: prompt
title: Write a video production brief
description: Writes a brief for a videographer or agency with goal, audience, key message, deliverables by format and length, budget, rights, timeline and approval rounds, plus open questions.
category: video
version: 1.0.0
status: incubating
stage: [plan]
role: [marketer, founder, manager]
requires: [none]
inputs: [notes, text]
output: [plan, table, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [video-brief, commissioning, deliverables, aspect-ratios, usage-rights, approvals]
pairs_with:
  prompts: [plan-video-shoot, write-design-brief, give-rough-cut-notes]
args:
  - name: project
    description: What the video is for, who should watch it, what they should think or do afterwards, where it will be shown, brand rules, people or places to feature, and anything already decided.
    type: text
    required: true
  - name: budget
    description: Budget or range, or "ask for a quote".
    type: string
  - name: deadline
    description: When the final files are needed, and any fixed dates such as an event or a launch.
    type: string
output_contract:
  format: markdown
  sections: [Brief, Deliverables, Open questions, Questions for the supplier]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write briefs that organisations send to videographers, production companies and agencies. Commissioned video goes wrong in predictable ways: the brief lists shots but not the one message or the audience, so the supplier guesses; formats are missing, so a 16:9 film arrives when the main use is vertical social; captions, subtitles and cutdowns were never asked for; usage rights, music licensing and ownership of raw footage were never agreed; nobody said who approves or how many revision rounds are included; and the budget was hidden, so quotes cannot be compared. A good brief is short enough to be read and specific enough that two suppliers would quote for the same thing.
</context>

<task>
<project>
{{project}}
</project>

Budget: {{budget}}
Deadline: {{deadline}}

1. Write the brief: background in two or three sentences; objective and how success will be judged; audience; the single key message and two or three supporting points; tone and references (only references the input names, described in words); mandatories (logo, brand rules, legal lines, accessibility such as captions); people and locations with access constraints; budget; timeline with milestones (treatment, shoot, first cut, final); approvals (who signs off, how many revision rounds); usage and rights (where it runs, for how long, music licensing, raw footage); and the contact person.
2. Deliverables table: each file with purpose, length, aspect ratio (16:9, 9:16, 1:1, 4:5), platform, captions or subtitles, and whether it is a cutdown of the main film.
3. Spot gaps: list anything a supplier will need that the input does not answer.
4. Write questions to ask suppliers when comparing quotes (what is included, crew, days, revision rounds, music, rights, file formats, archive of footage, cancellation and weather days).
</task>

<constraints>
- Do not invent budgets, dates, brand rules, names or locations. Put `[TBC: ...]` where something is missing and list it under Open questions.
- Keep the brief to about one page plus the deliverables table.
- Write rights and payment items as points to agree in the contract, not as legal terms.
- If the objective or audience is missing, ask for it first; a brief without them is not worth sending.
</constraints>

<output_format>
## Brief
Short headed sections in the order from step 1.

## Deliverables
Table: # | deliverable | purpose | length | aspect ratio | platform | captions | cutdown of.

## Open questions
Every `[TBC]` item, as a checklist for the commissioner.

## Questions for the supplier
Numbered questions for comparing quotes.
</output_format>
