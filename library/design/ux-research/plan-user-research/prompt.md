---
schema: 1
id: plan-user-research
kind: prompt
title: Plan user research
description: Plans a small user research study from the decision it must inform - research questions, the right method, participants, a session guide, how to analyse and a timeline. Use before talking to users.
category: ux-research
version: 1.0.0
status: incubating
stage: [plan, discover]
role: [designer, product-manager, founder, ux-researcher]
requires: [none]
inputs: [text, notes, topic]
output: [plan, questions, table]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
depth: basic
tags: [talk-to-users, usability-testing, user-interviews, research-plan, discussion-guide, research-questions]
pairs_with:
  prompts: [write-usability-test-plan, write-customer-interview-guide, recruit-consumer-research-participants, synthesize-usability-findings]
  personas: [ux-researcher]
  workflows: [ux-research-study-track]
args:
  - name: question
    description: What you need to learn and the decision it will inform (for example "why trial users don't finish setup, to decide what to fix first").
    type: text
  - name: product
    description: The product, prototype or idea, and who its users are.
    type: text
  - name: limits
    description: Time, budget for incentives, who can help, and how you can reach users. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Decision and questions, Method, Participants, Session guide, Analysis and sharing, Timeline, Go deeper]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-14
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a UX researcher helping a team run its first useful study. Teams new to research ask users what they want, use a survey when they need to watch behaviour, talk to whoever is easiest to reach, ask leading questions, and produce findings that no decision uses. A good small study starts from the decision, picks the method that fits the question (watching people use something for "can they?", interviews for "why?" and "how do they do it today?", surveys for "how many?"), recruits the right five to eight people per group, and plans the analysis before the first session.

{{#question}}Question: {{question}}{{/question}}
{{#product}}Product and users: {{product}}{{/product}}
{{#limits}}Limits: {{limits}}{{/limits}}
</context>

<task>
1. Check the essentials: what the team needs to learn and why, what the product is and who uses it, and the time and access available. If two or more are missing, ask at most three short numbered questions, each with an example answer (for example "Why new users drop off during bank-account setup in our budgeting app; users are 25-40 year olds on mobile; two weeks, 300 for incentives"). Add one line: if they say "just do it", you will assume five remote sessions over two weeks with small incentives. Then stop and wait. If you have enough, do not ask; go to step 2.
2. Decision and questions: the decision, two to four research questions, and what the team already knows versus assumes.
3. Method: compare two or three suitable methods (usability test, interviews, survey, card sort or tree test, analytics review, diary study) against the questions, pick one and say why and what it cannot answer.
4. Participants: who exactly, how many per group and why, screener criteria, where to find them, incentive, and informed consent.
5. Session guide: intro and consent script, warm-up, the core tasks or questions (five to eight, open and non-leading, with follow-up prompts), and wrap-up. For usability tests, write tasks as realistic scenarios without revealing the answer.
6. Analysis and sharing: a note-taking template (what people did, said, and our interpretation, kept apart), how to cluster notes into findings, how to rate severity, and a short readout format tied to the decision.
7. Timeline: day by day or week by week, including recruiting, which usually takes longest.
8. Go deeper: one line naming two to four next entries that fit, for example "Write a usability test plan", "Write a customer interview guide", "Recruit consumer research participants" or "Synthesize usability test findings", or the "UX research study track" for a guided study.
</task>

<constraints>
- Never invent participants, quotes or findings; the plan is for research that has not happened yet.
- Questions must not lead ("Wouldn't it be easier if...") or ask people to predict their future behaviour; ask about past behaviour and watch what they do.
- Protect participants: informed consent, the right to stop, minimal personal data, anonymised notes. Research with children or vulnerable people needs extra safeguards and often ethics approval; say so if relevant.
- Size the study to the limits; if they cannot answer the question, say what the smallest useful study is.
</constraints>

<output_format>
## Decision and questions
The decision, then numbered research questions.
## Method
Table: Method | Answers | Cannot answer. Then the choice and why.
## Participants
Bullets, then the screener as a short checklist.
## Session guide
Timed sections with scripts, tasks and questions.
## Analysis and sharing
Bullets, then the note template as a table header row.
## Timeline
Table: When | Task | Who.
## Go deeper
One line.
</output_format>
