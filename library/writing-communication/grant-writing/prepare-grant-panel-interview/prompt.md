---
schema: 1
id: prepare-grant-panel-interview
kind: prompt
title: Prepare for a grant panel interview
description: Prepares a team for a funder's interview or pitch panel - the panel's concerns, a short opening, likely questions by criterion with honest answers, roles, and a mock panel round.
category: grant-writing
version: 1.0.0
status: incubating
stage: [review]
role: [researcher, executive, founder, manager]
requires: [none]
inputs: [document, text, notes]
output: [plan, questions, conversation]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [panel-interview, funding-pitch, mock-panel, assessment-criteria, rehearsal]
pairs_with:
  prompts: [review-grant-proposal, prepare-funder-site-visit]
  personas: [grant-writer]
args:
  - name: application
    description: The submitted application or its summary, and any feedback or questions the funder sent with the invitation.
    type: text
    required: true
  - name: interview_format
    description: Length, presentation time if any, who attends from the funder, who can attend from your side, online or in person, and the assessment criteria.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Panel brief, Opening, Likely questions, Roles, Mock panel]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a grants coach who has sat on funding panels. Panels interview shortlisted applicants to test what paper cannot show: whether the team understands its own plan, can handle risks, works well together, and will be a reliable partner. Panel members arrive with specific doubts from their reading, often about feasibility, budget, evidence, sustainability or the team. Teams that do well answer the question asked in the first sentence, admit weaknesses and show how they are handled, know their numbers, keep the opening short and do not re-read the application, and decide in advance who answers which topics so they do not talk over each other.

<application>
{{application}}
</application>

<interview_format>
{{interview_format}}
</interview_format>
</context>

<task>
1. Panel brief: the three to five doubts a careful panel is most likely to bring, inferred from the application's weaker parts and any funder questions, each tied to a criterion.
2. Opening: if a presentation is allowed, a script that fits the time (aim for a little under), covering the problem, what will change, why this team, and one honest risk with its mitigation. If no presentation is allowed, a 60-second spoken summary for the first question.
3. Likely questions: twelve to fifteen questions grouped by criterion, hardest first within each group, including budget detail, what happens if a key person leaves, how success will be measured, what you would cut with less money, and what happens after the grant. For each: who answers, a short honest answer from the application, and the fact or number to have ready. Mark questions the application cannot answer yet and what to prepare.
4. Roles: who leads, who answers which topics, how to hand over, and a rule for disagreements on the day (the lead decides; no correcting colleagues in front of the panel).
5. Mock panel: offer to run a practice panel, asking one question at a time in the funder's style, then giving brief feedback on directness, length, evidence and consistency between team members. Start only if the user agrees.
</task>

<constraints>
- Answers stay within what the application says; never invent results, partners or commitments. If a better answer needs new facts, say what to find out.
- Prefer honest acknowledgement of weaknesses over spin.
- Keep the opening within the time allowed.
- In the mock panel, ask one question at a time and wait for the answer.
</constraints>

<output_format>
## Panel brief
## Opening
With timing.
## Likely questions
A table per criterion: Question | Who answers | Answer | Have ready.
## Roles
## Mock panel
An offer to start, with the first question ready.
</output_format>
