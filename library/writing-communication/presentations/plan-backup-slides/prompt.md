---
schema: 1
id: plan-backup-slides
kind: prompt
title: Plan backup slides for Q&A
description: Predicts the questions a deck will provoke and plans the backup slides that answer them, with titles, content, data needed and where each one links from in the main deck.
category: presentations
version: 1.0.0
status: incubating
stage: [plan, design]
role: [manager, consultant, researcher, product-manager]
requires: [none]
inputs: [document, notes]
output: [table, outline]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [appendix, backup-slides, q-and-a, anticipate-questions, executive-audience]
pairs_with:
  prompts: [drill-presentation-qa, shorten-presentation-for-time, critique-slide-deck]
  personas: [presentation-designer]
args:
  - name: deck
    description: The main deck as slide titles and key content, in order.
    type: text
    required: true
  - name: audience
    description: Who will be in the room and what each person tends to push on, for example "CFO asks about payback; legal asks about data".
    type: text
    required: true
  - name: max_backup_slides
    description: How many backup slides you can realistically prepare.
    type: number
    default: 8
output_contract:
  format: markdown
  sections: [Likely questions, Backup slides, Link map, Questions to answer without a slide]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help presenters prepare an appendix of backup slides. Experienced presenters keep the main deck short and hold the evidence in reserve: when a question comes, they jump to a prepared slide instead of improvising numbers. Good backup slides are each built around one likely question, have a title that answers it, show the source of the data, and are numbered or hyperlinked so the presenter can reach them in seconds. Not every question deserves a slide; values questions, opinions and "what if" questions are better answered in words. Questions cluster around the biggest number, the riskiest assumption, the cost, the method, alternatives not chosen, and what happens to the asker's own team.

<deck>
{{deck}}
</deck>

Audience: {{audience}}
Maximum backup slides: {{max_backup_slides}}
</context>

<task>
1. For each main slide, list the questions it is likely to provoke from this audience, naming who would ask where the audience description allows.
2. Rank the questions by likelihood multiplied by damage if answered badly.
3. For the top questions, up to {{max_backup_slides}}, plan one backup slide each: an assertion title that answers the question, the content or chart, the data or source the presenter must gather, and the main slide it links from.
4. For questions that are better answered in words, give a two-sentence answer outline and say why no slide is needed.
5. Suggest how to make backup slides reachable fast, such as a numbered appendix index or hyperlinks from the main slide.
</task>

<constraints>
- Do not invent numbers or results for backup slides; specify what data is needed and mark it [to gather].
- Each backup slide answers one question only.
- Keep within {{max_backup_slides}} slides; say which questions were left without a slide.
</constraints>

<output_format>
## Likely questions
Table: Main slide | Question | Likely asker | Rank.

## Backup slides
For each: **B1 title (assertion)**, content, data to gather, links from slide #.

## Link map
List of main slide numbers with the backup slides reachable from each.

## Questions to answer without a slide
Question, answer outline, reason.
</output_format>
