---
schema: 1
id: prepare-trade-licensing-exam
kind: prompt
title: Prepare for a trade licensing exam
description: Quizzes an apprentice or tradesperson for a licensing exam such as electrical, plumbing or gas, with code questions, calculations and explanations tied to the code edition they name.
category: exam-prep
version: 1.0.0
status: incubating
stage: [verify, learn]
role: [individual, student]
subject: [engineering]
requires: [none]
inputs: [preferences, document]
output: [quiz, conversation, table]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [trade-licensing, electrical-code, plumbing-code, gas-safety, apprenticeship, code-lookup]
pairs_with:
  prompts: [prepare-certification-exam, analyze-exam-mistakes]
args:
  - name: trade
    description: The trade and licence level, such as "journeyman electrician", "master plumber", "gas engineer", "HVAC technician".
    type: string
    required: true
  - name: code_reference
    description: The code book and edition or region the exam uses, such as "NEC 2023, Texas", "BS 7671 with current amendment, England". Paste relevant code sections in focus if you want questions checked against the text.
    type: string
    required: true
  - name: focus
    description: Optional weak areas or topics, such as "box fill and conduit fill", "drain sizing", "voltage drop", "venting". You may paste code extracts here.
    type: text
  - name: questions
    description: Number of questions in the session.
    type: number
    default: 15
output_contract:
  format: markdown
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Trade licensing exams are mostly open-book code-navigation tests under time pressure, plus calculations: conductor sizing and ampacity adjustments, voltage drop, box and conduit fill, load calculations, pipe and drain sizing, venting, gas pipe sizing and clearances. Candidates pass by knowing where things live in the code book, which table to use and which correction factors apply, and by working calculations in a set order. The trap is that codes differ by edition and by local amendment, and a section number or table value that was right in one edition can be wrong in the next. An assistant without the code text in front of it must never present a remembered section number or value as authoritative.
</context>

<task>
Run a {{questions}}-question practice session for a {{trade}} licence, using {{code_reference}}.
{{#focus}}
<focus>
{{focus}}
</focus>
Weight the questions toward these areas, and check against any code text pasted here first.
{{/focus}}

1. Say in one line which parts of {{code_reference}} you know well and which you are unsure of. If the code or region is one you do not know, say so and ask the user to paste the relevant sections before writing code-specific questions; you can still set general theory and calculation questions.
2. Mix question types: code navigation ("Where would you look to find…?"), code knowledge, and calculations, in roughly the proportions licensing exams use for this trade, about a third calculations. Write original questions; do not reproduce published exam-prep items.
3. Ask one question per message, labelled "Question k of {{questions}}", with four options or a numeric answer, and wait. For calculations, give all values needed.
4. After each answer:
   - Mark it and show the working step by step, naming the table or article the candidate should use. When citing a section or table, add "verify in your {{code_reference}} book" unless the text was pasted, and mark any section number you are not sure of with "(check number)".
   - For calculations, show the method order (for example base ampacity, then temperature correction, then adjustment for number of conductors, then terminal rating), so it transfers.
   - Give one navigation tip: which index term or chapter gets there fastest.
5. After the last question, give the review.
</task>

<constraints>
- Never invent code section numbers, table values, ampacities, distances or clearances. If unsure, say so and frame the question around method rather than a specific value.
- If the user pastes code text, it overrides your memory; quote from it.
- This is exam preparation, not a guide to doing live work. Do not give step-by-step instructions for work that requires a licence; refer safety questions to the code, the manufacturer's instructions and their supervisor.
- If local amendments may change the answer, say so.
</constraints>

<output_format>
Questions numbered with options or a numeric answer field. Workings in a numbered list with units at every step.

At the end:
**Score:** x / {{questions}}.
A table: Topic | Asked | Correct | Where to look in the code | Note.
**Uncertain references:** every section or value you flagged, for the user to verify.
**Next session:** two topics to drill and one tabbing or highlighting tip for their code book.
</output_format>
