---
schema: 1
id: prune-commitments
kind: prompt
title: Prune your ongoing commitments
description: Lists every ongoing role and promise, from committees to side projects and favours, weighs each against values and hours, and drafts graceful exits or scaled-down versions for the ones to drop.
category: task-management
version: 1.0.0
status: incubating
stage: [review, plan]
role: [individual, manager, parent]
requires: [none]
inputs: [text, preferences]
output: [table, message, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [commitments, overcommitment, saying-no, volunteering, time-budget]
pairs_with:
  prompts: [audit-time-use, plan-personal-quarter, juggle-competing-deadlines]
args:
  - name: commitments
    description: Every ongoing commitment you can think of (volunteer roles, committees, clubs, side projects, regular favours, groups you run, courses), with roughly how many hours a month each takes and how you feel about it.
    type: text
    required: true
  - name: priorities
    description: What matters most to you right now and how many hours a month you want to spend on commitments outside work and family. Optional.
    type: text
output_contract:
  format: markdown
  sections: [The total, Each commitment weighed, Keep, shrink or leave, Exit and scale-down messages, Saying yes in future]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people cut back on ongoing commitments the way a good mentor would over coffee. Overload usually comes not from tasks but from standing commitments added one at a time, each reasonable alone: the committee seat, the club treasurer role, the monthly favour, the side project that stalled. People keep them out of guilt, identity or fear of letting others down, and rarely add up the hours. The useful moves are to total the hours, weigh each against what matters now, and consider a middle path (step down at the end of a term, hand over to a named successor, do a smaller part) before quitting outright. A graceful exit gives notice, offers a handover, and does not over-explain.

<commitments>
{{commitments}}
</commitments>
{{#priorities}}
<priorities>
{{priorities}}
</priorities>
{{/priorities}}
</context>

<task>
1. The total: add up the hours a month, compare with what they want to spend (if given), and state the gap.
2. Each commitment weighed: for each one, the hours, how it fits their priorities, energy (gives or drains, from what they said), and what it would cost others if they stepped back.
3. Keep, shrink or leave: a decision for each with the shrink option spelled out (a smaller role, fewer meetings, end of term), closing the gap from step 1. Where it is close, offer the choice and a question to decide it.
4. Exit and scale-down messages: short messages for each shrink or leave decision, with notice, an end date, a handover offer, and no long justification.
5. Saying yes in future: a simple test for new requests (for example, would I say yes if it were next week; what would I drop to make room) and a one-line way to say "let me check and come back to you".
</task>

<constraints>
- Do not decide for them on commitments that are close calls; give the trade-off and a question.
- Do not invent hours, people or terms; use what they gave and mark estimates.
- Messages are warm, brief and honest; no invented excuses.
- Commitments with legal or formal duties (a trustee, a company director, a guardian) need proper handover; note that they should check the formal steps to step down.
</constraints>

<output_format>
## The total
## Each commitment weighed
Table: Commitment | Hours a month | Fit with priorities | Energy | Impact on others
## Keep, shrink or leave
## Exit and scale-down messages
## Saying yes in future
</output_format>
