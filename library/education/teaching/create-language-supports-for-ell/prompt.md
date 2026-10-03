---
schema: 1
id: create-language-supports-for-ell
kind: prompt
title: Create language supports for multilingual learners
description: Creates sentence frames, word banks, visuals and task adjustments for multilingual learners at different English proficiency levels for one specific classroom task.
category: teaching
version: 1.0.0
status: incubating
stage: [design]
role: [teacher]
subject: [english]
requires: [none]
inputs: [text, topic]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [english-learners, multilingual-learners, language-scaffolds, sentence-frames, academic-language, translanguaging, inclusion]
pairs_with:
  prompts: [differentiate-lesson, adapt-text-reading-level, plan-vocabulary-instruction]
args:
  - name: task
    description: The exact task students will do, e.g. "write a paragraph comparing the life cycles of a frog and a butterfly" or "in pairs, explain which bridge design held the most weight and why".
    type: text
    required: true
  - name: grade_level
    description: Grade, year or age, plus subject, e.g. "Grade 4 science", "Year 8 history".
    type: string
    required: true
  - name: proficiency_levels
    description: Optional proficiency levels to plan for, using the school's framework, e.g. "WIDA 1, 3 and 5", "EAL stage A to C", "two newcomers, the rest intermediate". Defaults to beginning, intermediate and advanced.
    type: text
  - name: home_languages
    description: Optional home languages in the class, e.g. "Spanish, Arabic, Ukrainian".
    type: string
output_contract:
  format: markdown
  sections: [Language demands, Supports by level, Sentence frames, Word bank, Visuals and realia, Home-language bridges, Checking content and language]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Multilingual learners can do grade-level thinking long before they can express it in grade-level English. Good supports lower the language barrier, not the cognitive demand: a newcomer comparing life cycles still compares, using a frame, a labelled diagram and a word bank, instead of copying a simpler worksheet. Planning starts from the language the task actually demands (the function such as compare, explain, argue; the grammar it needs such as comparatives or "because" clauses; and the vocabulary, both subject terms and general academic words), then adds supports that are graduated by proficiency level and designed to be removed over time. Home languages are a resource for thinking and drafting, not something to ban.
</context>

<task>
Create language supports for this task in **{{grade_level}}**:

<task_text>
{{task}}
</task_text>

{{#proficiency_levels}}
Proficiency levels to plan for: {{proficiency_levels}}
{{/proficiency_levels}}
If no proficiency levels are listed, plan for beginning, intermediate and advanced, and say so.
{{#home_languages}}
Home languages in the class: {{home_languages}}.
{{/home_languages}}

1. **Language demands:** the language function(s), the key grammar structures, subject-specific vocabulary (tier 3) and general academic vocabulary (tier 2) the task requires, and whether it involves listening, speaking, reading or writing.
2. **Supports by level:** for each proficiency level, what the student does (same task and thinking, with adjusted language output), the supports provided, and the expected product. Beginning students might label, sort, use a frame with a word bank, or speak before writing; advanced students might use a frame only for the trickiest structure.
3. **Sentence frames:** 2 to 4 frames per level that carry the task's language function, graduated from heavily supported to open. Each frame must be usable for this task, not generic.
4. **Word bank:** 8 to 15 words with a student-friendly definition, an example sentence from the task's context, and a note on which need a picture.
5. **Visuals and realia:** what to show or hand out (labelled diagram, graphic organiser, gestures, objects), described clearly enough to make.
6. **Home-language bridges:** ways to use home languages (think and plan in any language, bilingual partner talk, a bilingual glossary). List cognates only for the home languages given and only when you are confident; mark any you are unsure of for checking with a speaker. Warn about false friends if relevant.
7. **Checking content and language:** how the teacher assesses the content understanding separately from English accuracy, with one look-for at each level.
</task>

<constraints>
- Keep the cognitive challenge of the original task for every level. Do not replace it with an easier task.
- Do not translate whole texts or instructions into home languages unless you are confident of accuracy; recommend a fluent adult or a checked resource for anything important.
- Frames and word banks use language correct for {{grade_level}} and the subject.
- If the task is too vague to analyse (no clear output or topic), ask for the exact task before writing supports.
- Avoid deficit language; describe what students can do at each level.
</constraints>

<output_format>
## Language demands
Function, grammar, vocabulary (tier 2 and tier 3), skills.
## Supports by level
Table: Level | What the student does | Supports | Expected product.
## Sentence frames
Grouped by level.
## Word bank
Table: Word | Student-friendly meaning | Example from this task | Picture needed.
## Visuals and realia
Bullets.
## Home-language bridges
Bullets, with cognates marked as confident or to check.
## Checking content and language
Content look-fors and language look-fors per level.
</output_format>
