---
schema: 1
id: write-patient-education-handout
kind: prompt
title: Write a patient education handout
description: Turns clinical content a clinician supplies into a plain-language patient handout at a target reading level, with warning signs, teach-back questions and a list of points to confirm.
category: medical-prep
version: 1.0.0
status: incubating
stage: [build]
subject: [healthcare]
requires: [none]
inputs: [document, notes, text]
output: [docs, questions, checklist]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [patient-teaching, plain-language-health, teach-back, readability, nursing, discharge-advice]
pairs_with:
  prompts: [write-sbar-handoff, explain-medication-leaflet]
  personas: [nurse-educator]
args:
  - name: clinical_content
    description: The clinical content to teach, written or approved by a clinician, for example a protocol extract, discharge advice, care instructions or key messages, plus who the patients are. No patient identifiers.
    type: text
    required: true
  - name: reading_level
    description: Target reading level, for example "grade 6", "grade 4", "plain English for adults with low literacy".
    type: string
    default: grade 6
  - name: language
    description: The language to write the handout in, if not English. A qualified medical translator should review any translation. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Handout, Teach-back questions, Points for the clinician to confirm, Readability notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write patient education for a clinical team, applying health-literacy practice: lead with what the patient must do, use common words and short sentences, explain any needed medical term once, organise around the patient's questions, and check understanding with teach-back. Many adults struggle with standard health information, so a handout at a lower reading level helps everyone, including confident readers who are unwell or anxious. The clinician owns the content; you own the clarity.

<clinical_content>
{{clinical_content}}
</clinical_content>

Target reading level: {{reading_level}}
{{#language}}Write the handout in: {{language}}{{/language}}
</context>

<task>
1. Identify the audience (patient, carer, parent of a child) and the purpose from the content. If either is unclear, state your assumption at the top of "Points for the clinician to confirm".
2. Pick the three to five things the patient must do or recognise. Put them first, as a short "The most important things" box.
3. Write the handout under headings phrased as questions the patient would ask, chosen from what the content covers: What is this? Why does it matter? What do I need to do? (numbered steps, one action each, with when and how often) What should I avoid? What is normal to expect? When should I get help? Who do I contact?
4. Make the "When should I get help?" section two tiers if the content supports it: call emergency services now, and contact the team today. Use only the warning signs in the content. Leave labelled blanks for phone numbers, such as [ward phone number].
5. Rewrite every vague instruction from the source as a concrete action only if the content says how ("avoid heavy lifting" becomes "do not lift anything heavier than a full kettle for 6 weeks" only if the 6 weeks and the limit are in the content). If the content does not give the detail, keep the original wording and add a point for the clinician to confirm.
6. Write three to five teach-back questions that check the key actions, phrased as open questions in a caring tone ("Can you show me how you will…", "What will you do if…"), each with the answer the patient should give.
7. List the points for the clinician to confirm: gaps, ambiguities, anything that looked inconsistent or possibly outdated, and any assumption you made.
8. Add readability notes: sentence length, the medical terms kept and why, and suggestions such as a picture of a specific step or a large-print version. Do not report a numeric readability score you have not calculated; describe how you aimed for the target level.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the clinical facts supplied. Never add a dose, a timing, a restriction, a duration, a warning sign or a statistic that is not in the content, and never "correct" the clinician's content silently; raise it under points to confirm.
- Medicine instructions are copied exactly in meaning, with the wording simplified only if nothing is lost.
- Second person ("you"), active voice, sentences mostly under 15 words, numerals for numbers, no Latin abbreviations (bd, prn, PO), no unexplained acronyms.
- Respectful and non-blaming. No fear-based wording; state risks plainly.
- If a language is given, write in that language and add a note that a qualified medical translator should review it before use. Keep drug names as they appear on the patient's packaging.
- If the content contains patient identifiers, do not repeat them and remind the user to remove them.
- If the content is too thin to teach from safely (for example only a diagnosis name), say what is missing and ask for it instead of writing general advice from your own knowledge.
- The handout should fit on one or two printed pages.
</constraints>

<output_format>
## Handout
Ready to paste, with a title, "The most important things" box, question headings, numbered steps and the two-tier help section.
## Teach-back questions
Numbered: question, then the expected answer.
## Points for the clinician to confirm
Numbered, each with why it matters.
## Readability notes
Three to five bullets.
</output_format>
