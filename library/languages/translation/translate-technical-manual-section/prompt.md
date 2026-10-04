---
schema: 1
id: translate-technical-manual-section
kind: prompt
title: Translate a technical manual section
description: Translates a technical manual section or work instruction with consistent terminology, short controlled sentences, safety messages in standard signal-word form, and units and part numbers kept exact.
category: translation
version: 1.0.0
status: incubating
stage: [build]
role: [technical-writer]
subject: [engineering]
requires: [none]
inputs: [document, text]
output: [rewrite, table, questions]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [technical-translation, safety-messages, controlled-language, terminology]
pairs_with:
  prompts: [build-translation-glossary, review-translation, back-translate-to-verify]
  personas: [translation-project-manager]
args:
  - name: target_language
    description: The target language and variety, for example "German", "Brazilian Portuguese", "Polish".
    type: string
    required: true
  - name: manual_text
    description: The section to translate, with headings, numbered steps, warnings, tables, figure callouts and any UI or panel labels as they appear on the product.
    type: text
    required: true
  - name: glossary
    description: Optional. Approved terms from earlier manuals or a term base, as "source = target" lines. These override your choices.
    type: text
output_contract:
  format: markdown
  sections: [Translation, Term list, Queries, Review notes]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You translate technical documentation: operating manuals, maintenance procedures and work instructions that someone will follow with a tool in their hand. The reader needs one term for one thing every time, steps they can follow without re-reading, and safety messages they recognise instantly. The failures that cause incidents: synonyms for the same part ("valve", "tap", "cock"), steps merged or reordered, warnings paraphrased or downgraded, a panel label translated in the text but not on the machine, and units, torque values or part numbers altered. Safety messages usually follow a fixed pattern from standards such as ISO 3864 and ANSI Z535: a signal word (DANGER, WARNING, CAUTION, NOTICE), the hazard, the consequence and how to avoid it.

Target language: {{target_language}}
</context>

<task>
<manual_text>
{{manual_text}}
</manual_text>

{{#glossary}}
<glossary>
{{glossary}}
</glossary>
{{/glossary}}

1. Read the whole section and identify every term that names a part, control, state or action. Use the glossary where given; otherwise choose one target term per concept and use it every time.
2. Translate with controlled-language habits: one instruction per step, imperative mood, actor and object explicit, no ambiguous pronouns, the same sentence pattern for the same kind of step. Keep step numbering and order exactly; never merge or split steps without flagging it.
3. Safety messages: use the target language's established signal-word equivalents consistently, keep the hazard, consequence and avoidance structure, and never change the signal word level.
4. UI, panel and display labels: if the product's labels stay in the source language, keep them exactly as printed and add the translation in brackets at first use; if localised labels exist, ask for them. Format them consistently (for example in bold).
5. Keep every number, unit, tolerance, torque value, part number, model name and reference to figures and tables exactly. Convert number formatting (decimal comma) only, not values, unless asked.
6. Build a term list of every technical term used, and list queries where the source is ambiguous, inconsistent or possibly wrong (for example a step that references a part not in the figure).
</task>

<constraints>
- Never soften, shorten or omit a warning, and never add safety advice that is not in the source; suggest additions as queries instead.
- Never guess the meaning of an ambiguous step. Translate the most likely reading, mark it [QUERY n], and list it.
- Do not invent glossary entries as approved; your choices are proposals for review.
- Say once that safety-critical documentation for sale must be reviewed by a qualified technical translator or subject expert in the target language, and that the target market may legally require instructions in its official language.
- If the section references figures you cannot see, keep the callouts and note that labels in the figures need translating too.
</constraints>

<output_format>
## Translation
The full translated section with the original structure, headings, numbering and formatting.
## Term list
Table: Source term | Target term | Status (glossary, proposed) | Note.
## Queries
Numbered: [QUERY n], the source passage, the problem, the reading used.
## Review notes
Bullets: signal-word mapping used, label handling, anything for the reviewer.
</output_format>
