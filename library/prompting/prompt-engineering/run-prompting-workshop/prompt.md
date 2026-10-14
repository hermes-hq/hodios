---
schema: 1
id: run-prompting-workshop
kind: prompt
title: Run a prompting workshop for your team
description: Plans a 60 to 90 minute hands-on team workshop on using AI assistants, built on the team's own tasks, with timed exercises, before-and-after prompts, verification habits and data rules.
category: prompt-engineering
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, teacher, operations-manager, engineering-manager]
requires: [none]
inputs: [text, preferences]
output: [plan, prompt, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
depth: specific
tags: [team-training, workshop-plan, ai-adoption, hands-on-exercises, data-rules]
pairs_with:
  personas: [ai-literacy-coach]
  prompts: [learn-prompting-basics, build-team-prompt-library, build-ai-output-review-checklist]
args:
  - name: team
    description: Who attends (roles, rough number, experience with AI) and which assistant or tools they are allowed to use.
    type: text
    required: true
  - name: tasks
    description: Optional - three to six real, recurring tasks from their work that AI could help with.
    type: text
  - name: length
    description: Optional - 60 or 90 minutes, in person or remote.
    type: string
output_contract:
  format: markdown
  sections: [Session plan, Exercises, Before-and-after examples, Data rules handout, Follow-up]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Prompting workshops built on slides of generic tips rarely change what people do on Monday. What works: people practise on their own recurring tasks, in the tool they are allowed to use, in pairs, with a quick before-and-after so they see the difference that context, a clear goal, an example and an output format make. Checking outputs (facts, figures, names) and knowing what must not be pasted in are as important as writing prompts, and both need to follow the organisation's actual policy, not the facilitator's guesses. Mixed groups need a stretch task for confident users and a simple path for nervous ones. The session should end with something reusable: a few good prompts saved to a shared place and one task each person will try that week.

<team>
{{team}}
</team>
{{#tasks}}
<tasks>
{{tasks}}
</tasks>
{{/tasks}}
{{#length}}
Length and format: {{length}}
{{/length}}
</context>

<task>
1. If no tasks are given, pick three likely recurring tasks for these roles and mark them as assumptions to confirm with the team beforehand.
2. Write a timed session plan (default 75 minutes): a short opening on what assistants do well and badly; a live before-and-after demo on one team task; pair exercises; a checking exercise; data rules; saving prompts; commitments. Include facilitator notes and timings for 60 and 90 minute versions.
3. Write three to four exercises: the task, the starting weak prompt, what to add (context, goal, example, format, constraints), a stretch variation, and what to look for in the result.
4. Write one before-and-after prompt pair per task, with a short note on what changed and why it helps.
5. Write a one-page data rules handout with placeholders for the organisation's policy: what may be pasted, what must not (with examples by type), which tools are approved, and when to check with someone.
6. Write the follow-up: where to save prompts, a two-week check-in question, and two simple signs of whether it worked.
</task>

<constraints>
- Do not invent the organisation's AI or data policy; use placeholders such as [APPROVED_TOOLS] and [POLICY_LINK] and tell the facilitator to confirm them.
- Exercises must use the team's own kind of work, with made-up or sanitised material rather than real confidential data.
- Do not claim specific features of a named product; describe actions generically.
- Include at least one exercise on checking or correcting an AI output, not only writing prompts.
</constraints>

<output_format>
## Session plan
Table: Time | Segment | What happens | Facilitator notes. Then the 60 and 90 minute adjustments.
## Exercises
Numbered, each with task, starting prompt, what to add, stretch, what to look for.
## Before-and-after examples
Per task: Before (fenced), After (fenced), What changed.
## Data rules handout
Short sections with placeholders.
## Follow-up
Bullets.
</output_format>
