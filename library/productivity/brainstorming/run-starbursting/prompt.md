---
schema: 1
id: run-starbursting
kind: prompt
title: Run a starbursting session
description: Runs starbursting on an idea or plan, generating who, what, where, when, why and how questions before any answers, then sorts them into the few that must be answered first.
category: brainstorming
version: 1.0.0
status: incubating
stage: [discover, review]
role: [founder, product-manager, individual, student]
requires: [none]
inputs: [topic, text]
output: [questions, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [starbursting, question-storming, five-w-one-h, idea-scrutiny, blind-spots]
pairs_with:
  prompts: [write-how-might-we-questions, run-pre-mortem, validate-business-idea]
args:
  - name: idea
    description: The idea, plan or proposal to question, with whatever detail you have - who it is for, what it involves, when it would happen. For example "a monthly repair cafe in our community hall".
    type: text
    required: true
  - name: purpose
    description: Optional - what the questions are for, such as "deciding whether to pitch it to the council" or "planning the first event".
    type: text
output_contract:
  format: markdown
  sections: [The idea in one line, Question star, Already answered, Critical questions, How to answer them]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Starbursting is a question-first technique: instead of generating solutions, you put the idea at the centre of a six-pointed star (who, what, where, when, why, how) and generate only questions. It works because people jump to answers too early and so never notice the questions nobody has asked. The value is in quantity and coverage first, then in sorting: most questions are trivial or already answered, and a handful decide whether the idea lives. A useful question is specific enough that someone could go and find the answer ("who would run the sign-in desk each month?"), not rhetorical ("is this a good idea?").

<idea>
{{idea}}
</idea>
{{#purpose}}
Purpose of the session:
<purpose>
{{purpose}}
</purpose>
{{/purpose}}
</context>

<task>
1. Restate the idea in one neutral line. If it is too vague to question usefully (a single word, or no idea of who it is for), ask up to two clarifying questions and stop.
2. Generate questions on each point of the star, 6 to 10 per point: Who (for, against, does the work, pays, decides), What (exactly is offered, is out of scope, success looks like, could go wrong), Where (it happens, people hear about it, it is stored or run), When (it starts, recurs, is too late, the busy and quiet periods are), Why (people would care, now, us, would someone choose an alternative), How (it is funded, delivered, measured, stopped if it fails). Add second-level questions where a first answer would obviously raise another one.
3. Write questions only. Do not answer any of them yet, and do not slip opinions in as leading questions.
4. Mark questions the user's description already answers and give the answer in their words.
5. Pick the 5 to 8 critical questions: the ones where a bad answer would kill or reshape the idea, or that block other decisions{{#purpose}}, weighted towards the stated purpose{{/purpose}}. Say why each is critical.
6. For each critical question, suggest the cheapest way to answer it (ask a named type of person, check a document, run a small test, look at a comparable case) and roughly how long that takes.
</task>

<constraints>
- Do not answer the open questions with invented facts, figures, rules or prices. Where a question concerns law, permits, insurance or money, say who or what source would know.
- Keep each question to one line and specific to this idea, not a generic checklist question.
- Phrase questions neutrally; avoid questions that smuggle in a verdict.
- Use only what the user said when marking questions as answered; label any assumption.
</constraints>

<output_format>
## The idea in one line
One sentence.

## Question star
Six sub-headings (Who, What, Where, When, Why, How), each a numbered list of questions.

## Already answered
Question number and the answer from the user's description.

## Critical questions
Table: # | Question | Why it is critical.

## How to answer them
Table: # | Cheapest way to answer | Rough time.
</output_format>
