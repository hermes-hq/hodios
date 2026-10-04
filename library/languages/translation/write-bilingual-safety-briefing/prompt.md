---
schema: 1
id: write-bilingual-safety-briefing
kind: prompt
title: Write a bilingual safety briefing
description: Turns a safety briefing or toolbox talk into a side-by-side bilingual version for a mixed-language crew, with short sentences, consistent hazard terms, pictogram suggestions and comprehension checks.
category: translation
version: 1.0.0
status: incubating
stage: [build]
role: [manager, operations-manager]
subject: [construction, agriculture, supply-chain]
requires: [none]
inputs: [text, document]
output: [docs, table, quiz]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
tags: [toolbox-talk, workplace-safety, multilingual-crews, pictograms]
pairs_with:
  prompts: [translate-technical-manual-section, adapt-public-notice-for-many-languages, back-translate-to-verify]
args:
  - name: briefing_text
    description: The briefing or toolbox talk as you would give it - the task, hazards, controls, PPE, emergency procedures, who to tell. Rough notes are fine.
    type: text
    required: true
  - name: languages
    description: The two languages for the side-by-side version, briefing language first, for example "English and Romanian" or "Spanish and Haitian Creole".
    type: string
    required: true
  - name: crew_notes
    description: Optional. Anything about the crew - reading levels, new starters, agency workers, whether it will be read aloud, printed, or shown on a phone.
    type: text
output_contract:
  format: markdown
  sections: [Key terms, Bilingual briefing, Pictograms, Comprehension check, Before you use it]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a supervisor on a building site, farm, warehouse or factory floor brief a crew that does not share one language. Safety messages fail across languages in predictable ways: long sentences with several conditions, two words used for the same hazard, idioms and site slang ("keep your wits about you"), passive voice that hides who must act, and briefings that end with "any questions?", which almost nobody answers. A good bilingual briefing uses short imperative sentences, the same hazard and equipment terms every time, side-by-side layout so the supervisor and the crew can follow the same line, pictograms for the main hazards and PPE, and open comprehension checks.

Languages: {{languages}}
{{#crew_notes}}Crew notes: {{crew_notes}}{{/crew_notes}}
</context>

<task>
<briefing_text>
{{briefing_text}}
</briefing_text>

1. Pick the key terms (hazards, equipment, PPE, places, emergency words like "stop", "evacuate", "assembly point") and fix one term for each in both languages.
2. Rewrite the briefing in the first language as short, numbered, imperative lines: one action or fact per line, who does it, and the reason in a few words where it helps people remember. Keep every hazard, control, figure and procedure from the original.
3. Translate each line into the second language, using the fixed terms, in plain everyday words a worker with basic reading would understand.
4. Suggest standard safety signs or pictograms for each hazard and PPE item (by their meaning, for example "mandatory hearing protection", "warning: forklift trucks"), noting the common shape and colour conventions (blue circle for mandatory, yellow triangle for warning, red circle for prohibition, green for safe condition).
5. Write four to six comprehension check questions in both languages that need an answer or a demonstration, not yes or no ("Show me where the assembly point is", "What do you do if the alarm sounds?"), with the expected answers.
</task>

<constraints>
- Never drop, soften or add hazards, controls or procedures. If the original is missing something essential (emergency contact, assembly point, first aider), list it under Before you use it with a [X] placeholder rather than inventing it.
- Do not state legal duties for a particular country; say the briefing supports, and does not replace, the site's risk assessment and the employer's legal duties.
- Say that the translation should be checked by a fluent speaker (ideally a trusted crew member or a professional) before use, and that a crew member interpreting during the briefing does not replace understanding checks.
- If you are not confident in the second language, say so and mark lines that most need checking.
- Keep the whole briefing short enough to deliver in about ten minutes.
</constraints>

<output_format>
## Key terms
Table: Language 1 | Language 2.
## Bilingual briefing
Table: # | Language 1 | Language 2.
## Pictograms
Table: Hazard or PPE | Sign meaning | Shape and colour.
## Comprehension check
Table: Question (Language 1) | Question (Language 2) | Expected answer.
## Before you use it
Bullets: gaps, checks and how to deliver it.
</output_format>
