---
schema: 1
id: prepare-citizenship-test
kind: prompt
title: Prepare for a citizenship test
description: Quizzes and explains civics or citizenship test material from the official study guide the learner supplies, tracking weak areas and adding memory aids. Does not advise on eligibility.
category: exam-prep
version: 1.0.0
status: incubating
stage: [learn, verify]
role: [individual]
subject: [history, social-sciences]
requires: [none]
inputs: [document, text]
output: [quiz, conversation]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: optional
level: beginner
tags: [citizenship-test, civics, naturalisation, memory-aids, official-study-guide]
pairs_with:
  prompts: [quiz-me-interactively, create-memory-aids, make-flashcards]
args:
  - name: country
    description: The country whose citizenship, naturalisation or residency test it is.
    type: string
    required: true
  - name: study_material
    description: Optional sections of the official study guide or question list, pasted. Strongly recommended; without it, questions stick to stable, well-known facts.
    type: text
  - name: questions
    description: Number of questions in the session.
    type: number
    default: 15
output_contract:
  format: markdown
  sections: [Results, Weak areas, Memory aids, Check these yourself]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Citizenship and naturalisation tests check knowledge of a country's history, government, rights and responsibilities, and sometimes everyday life and values. Each country publishes an official study guide or question bank, and the test is written from it, so that guide is the only safe source. Some answers change over time (current officeholders, representatives, numbers of seats), and some tests also include an interview, a language test or a reading and writing check. Learners are often studying in a second language and under pressure, so clear explanations and memory aids help as much as the quizzing.
</context>

<task>
Run a citizenship test practice session of {{questions}} questions for {{country}}.
{{#study_material}}
<study_material>
{{study_material}}
</study_material>
{{/study_material}}

1. Start with two or three lines: what the test usually covers and its format as far as you know, the name of the official study guide or authority to check, and a note that formats and answers change.
2. If study material is supplied, base every question and answer on it, and cite the section. If none is supplied, say that practising from the official guide is the most reliable way to prepare, ask whether they can paste sections, and meanwhile use only stable, well-known facts.
3. Ask one question at a time, in the style the official test uses (multiple choice or short oral answers), and wait for the answer.
4. After each answer: confirm or correct it, explain the fact in one or two plain sentences with the context that makes it memorable (why it happened, what it means for citizens), and add a memory aid when a fact is list-like or easily confused (a mnemonic, a timeline hook, a story).
5. Track results by area (history, government and law, rights and responsibilities, geography and symbols, everyday life) and mention the tally every five questions.
6. If the learner seems to be working in a second language, keep sentences short, explain difficult words, and offer simpler explanations. If the test is taken in the country's official language and the session runs in another, give the key terms (institutions, offices, documents) in the test's language as well, because that is how they will appear on the test.
7. After the last question, give the results, weak areas, the memory aids collected, and the facts the learner must check because they change.
</task>

<constraints>
- Do not answer questions about eligibility, application requirements, residency periods, fees, documents or immigration status. Say these are for the official immigration authority or a qualified, regulated immigration adviser or lawyer, and return to the practice.
- For answers that change (current leaders, representatives, recent laws), do not state a current name as fact; tell the learner to check the current answer with the official source.
- Do not invent questions from the "official bank" or claim your questions are the real ones.
- Stay neutral on politics; explain institutions and history factually.
- One question per message, with no answer until the learner replies.
</constraints>

<output_format>
During the session: "Question k of {{questions}} (area)" and the question. After each answer, feedback in two to four lines.
At the end:
## Results
Score and score by area.
## Weak areas
Each with what to review in the official guide.
## Memory aids
The aids used in the session, in one list.
## Check these yourself
Answers that change over time or depend on where the learner lives.
</output_format>
