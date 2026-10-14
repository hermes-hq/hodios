---
schema: 1
id: run-career-conversation
kind: prompt
title: Run a career conversation with a report
description: Plans a career conversation with a direct report about their ambitions, strengths and the next experiences to build, ending in two or three concrete development moves you can actually offer.
category: people-management
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, engineering-manager, operations-manager, founder]
requires: [none]
inputs: [notes]
output: [plan, questions, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [growth-conversations, development-plan, stretch-assignments, retention, coaching-questions]
pairs_with:
  prompts: [plan-one-on-one, coach-with-grow-model, write-promotion-nomination]
  personas: [leadership-coach]
args:
  - name: report
    description: The person's role and level (initials only), tenure, strengths you see, what they have said about their ambitions so far, and anything you know about what energises or drains them.
    type: text
    required: true
  - name: opportunities
    description: What you could realistically offer in the next 6 to 12 months, for example projects, scope, training budget, mentors, internal moves or a promotion path, and any limits. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Before the conversation, Opening, Questions to ask, Your view of their strengths, Development moves, Close and follow-up, Watch-outs]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You coach managers to hold career conversations that go beyond "where do you see yourself in five years?". Career conversations work best separated from performance reviews and pay, because people speak honestly only when they are not being rated. Many people do not have a fixed goal; asking about past experiences (what they enjoyed, when they were at their best, what they want less of) surfaces direction better than asking for a title. Most growth comes from experiences on the job (a stretch assignment, new scope, exposure to other parts of the business), then from people (mentors, sponsors, feedback), and least from courses alone. A good manager is honest about what is possible in this team and company, supports ambitions that may lead elsewhere, and writes down two or three concrete moves with dates. Promising promotions or roles the manager cannot guarantee damages trust more than saying "I do not know yet".

<report>
{{report}}
</report>
{{#opportunities}}
<opportunities>
{{opportunities}}
</opportunities>
{{/opportunities}}
</context>

<task>
1. Before the conversation: how to frame the invitation so it is clearly separate from performance and pay, a short pre-reading question to send (for example "think about the work you enjoyed most this year"), timing and length (45 to 60 minutes).
2. Opening: two or three sentences that set the purpose and make it safe to talk about ambitions, including ones outside this team.
3. Questions to ask: eight to ten open questions in three groups (looking back, what matters now, looking ahead), with follow-ups that dig into specifics.
4. Your view of their strengths: how to share two or three strengths with examples from the input, and one growth area, without turning it into a review.
5. Development moves: from what they say and the opportunities given, a table of two or three possible moves, each with the experience, the skill it builds, what the manager will do, what the person will do, and when. Mark anything not yet confirmed as an option to explore, not a promise.
6. Close and follow-up: how to summarise, agree what gets written down, and when to revisit (for example every quarter in a one-on-one).
7. Watch-outs: what to do if they want something you cannot offer (a role elsewhere, a promotion not available), if they have no idea what they want, or if pay comes up.
</task>

<constraints>
- Use only facts given; do not invent opportunities, budgets or promotion timelines. Mark unknowns [X].
- Never promise a promotion, raise or role the manager has not confirmed they can deliver.
- Support ambitions that lead outside the team; do not treat them as disloyalty.
- Keep the conversation about work and growth; do not probe family plans, age or health.
</constraints>

<output_format>
## Before the conversation
## Opening
## Questions to ask
## Your view of their strengths
## Development moves
Table: Move | Builds | Manager does | Report does | When | Status.
## Close and follow-up
## Watch-outs
</output_format>
