---
schema: 1
id: set-up-thesis-writing-assistant
kind: prompt
title: Set up an assistant for thesis writing
description: Sets up an assistant for a thesis or dissertation that follows your university's AI rules, gives feedback instead of writing chapters, and tracks chapters, sources and supervisor comments.
category: assistant-setup
version: 1.0.0
status: incubating
stage: [plan, build]
role: [student, researcher]
requires: [none]
inputs: [text, preferences, document]
output: [prompt, checklist, docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
depth: specific
tags: [thesis, academic-integrity, chapter-tracking, supervisor-feedback, ai-disclosure]
pairs_with:
  prompts: [build-project-instructions, set-up-writing-coach-assistant, plan-thesis-structure]
  personas: [thesis-advisor]
  rules: [academic-integrity-rules]
args:
  - name: thesis
    description: Degree and field, working title or question, chapters planned and their status, and the submission date.
    type: text
    required: true
  - name: ai_policy
    description: Your university's or department's rules on AI use, pasted or summarised, including any disclosure requirement. If you do not have them, say so.
    type: text
    required: true
  - name: weak_spots
    description: "Optional: what your supervisor keeps flagging, or where you get stuck (argument, structure, literature, writing in a second language)."
    type: text
output_contract:
  format: markdown
  sections: [Allowed and not allowed, Project instructions, Chapter tracker, Supervisor comment log, Disclosure note, Tests]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A thesis takes months, and an assistant can help a lot: questioning the argument, spotting gaps in a literature review, checking that a chapter answers the research question, explaining a statistical method, tightening prose the student wrote. It can also end a degree: universities treat submitted AI-generated text, invented references and undisclosed use as misconduct, and their rules differ (some allow language editing, some require a disclosure statement, some forbid AI in certain chapters). The setup has to start from the student's actual rules, keep the student as author, and track the long project so each session builds on the last. Supervisors' comments are the most useful input and are often lost between chats.

<thesis>
{{thesis}}
</thesis>
<ai_policy>
{{ai_policy}}
</ai_policy>
{{#weak_spots}}
<weak_spots>
{{weak_spots}}
</weak_spots>
{{/weak_spots}}
</context>

<task>
1. Read the AI policy. If the user does not have it, say the setup will use strict defaults (feedback, questions and explanation only; no generated text for submission) and tell them where to look: the module handbook, graduate school guidance or their supervisor.
2. Write "allowed and not allowed": a two-column summary of what the assistant may do (for example question the argument, explain methods, comment on structure, point out unclear sentences) and may not do (write paragraphs for submission, produce references, paraphrase sources to avoid citation), quoting the policy where it decides a point.
3. Write project instructions, ready to paste, that:
   - give feedback, questions and examples, never full paragraphs meant for the thesis;
   - never invent or "complete" references; ask the student for the source and flag any claim that needs one;
   - judge each chapter against the research question and the chapter's job;
   - give at most three priority issues per round, argument and structure before wording;
   - keep the student's voice; for second-language writers, explain patterns instead of rewriting;
   - read the chapter tracker and comment log before answering;
   - refuse politely if asked to write submission text, and offer the allowed alternative.
4. Write a chapter tracker template: chapter, its job, status, word count, open issues, next step.
5. Write a supervisor comment log: date, comment, chapter, planned response, done.
6. Write a short disclosure note template describing how AI was used, for the student to adapt if the policy requires one.
7. Give four tests, including "write my conclusion for me" and "add five references to this paragraph".
</task>

<constraints>
- Do not state what the university allows beyond the text the user gave; mark gaps [CHECK WITH SUPERVISOR].
- Do not produce thesis content in this setup (no sample paragraphs on the user's topic).
- Keep instructions under about 2,000 characters.
</constraints>

<output_format>
## Allowed and not allowed
A two-column table.
## Project instructions
One fenced block, ready to paste.
## Chapter tracker
A table template.
## Supervisor comment log
A table template.
## Disclosure note
A short fenced template.
## Tests
Four bullets: prompt and pass condition.
</output_format>
