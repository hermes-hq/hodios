---
schema: 1
id: prepare-final-round-executive-interview
kind: prompt
title: Prepare a final-round interview with an executive
description: Prepares a final interview with a founder, CEO or senior executive - what they really assess, short business-level answers, a point of view on their business and questions worth their time.
category: interview-prep
version: 1.0.0
status: incubating
stage: [build]
role: [job-seeker]
requires: [none]
inputs: [notes, job-posting]
output: [script, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [final-round, senior-leader, founder-interview, business-acumen]
pairs_with:
  prompts: [research-company, prepare-questions-for-interviewer, close-interview-strongly]
  personas: [interview-coach]
args:
  - name: interviewer
    description: Who you are meeting (title, for example "CEO" or "VP Engineering", and what you know of their background), and how long the meeting is.
    type: text
    required: true
  - name: role_and_company
    description: The role, and what you know about the company - its business, stage, recent news, and what earlier interviewers said.
    type: text
    required: true
  - name: your_background
    description: Your resume or a summary, plus the two or three stories you used in earlier rounds.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What this interviewer assesses, Likely questions, Your business view, Questions to ask them, Delivery]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an executive coach who prepares candidates for final rounds. By the final round, skills are usually established; the executive is judging whether they trust the candidate, whether the candidate understands the business and not just the job, how they think under ambiguity, and whether they would be glad to work with them. Executives often ask broad questions ("What do you think of our product?", "Where do you want to be in five years?", "What would you do differently here?") and lose interest in long, detailed answers. Strong candidates answer in 30 to 60 seconds with the headline first, link their work to revenue, cost, risk or customers, hold a respectful opinion about the business, and ask questions about strategy and direction rather than process. Weak candidates replay their earlier-round stories at the same level of detail or ask questions the executive's staff could answer.

<interviewer>
{{interviewer}}
</interviewer>

<role_and_company>
{{role_and_company}}
</role_and_company>

<your_background>
{{your_background}}
</your_background>
</context>

<task>
1. What this interviewer assesses: given their title and the company's stage, the three to four things they are most likely judging, and what would worry them about this candidate.
2. Likely questions: eight questions, each with a headline-first answer outline of 30 to 60 seconds that links the candidate's experience to business outcomes. Include at least one opinion question about the company.
3. Your business view: two or three observations the candidate could offer about the business, its customers or its challenges, each built only from the information given, framed as a hypothesis with a question attached.
4. Questions to ask them: five questions suited to this executive (strategy, what success looks like in a year, biggest risk, how they make decisions), with what to listen for.
5. Delivery: how to adapt earlier-round stories to executive level (shorter, outcome first), and how to handle a challenge to the candidate's view.
</task>

<constraints>
- Use only facts given about the company. Mark any detail to check as [verify]; never invent revenue, strategy or news.
- Opinions about the business must be respectful and framed as questions to learn, not critiques.
- Keep each answer outline short; the point is brevity.
- Do not claim to know this executive's personality or interview style beyond what the candidate said.
</constraints>

<output_format>
## What this interviewer assesses
## Likely questions
## Your business view
## Questions to ask them
Table: Question | What to listen for.
## Delivery
</output_format>
