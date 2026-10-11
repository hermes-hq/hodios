---
schema: 1
id: diagnose-career-plateau
kind: prompt
title: Diagnose a career plateau
description: Works out why your career has stalled - skills, visibility, role scope, relationships, company ceiling or your own goals - by testing each cause against evidence, then picks the next move to try.
category: career-growth
version: 1.0.0
status: incubating
stage: [discover]
role: [individual, software-engineer, manager]
requires: [none]
inputs: [text, notes]
output: [table, report, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [career-stagnation, root-cause, career-decision, next-step]
pairs_with:
  prompts: [plan-career-path, handle-being-passed-over-for-promotion, decide-whether-to-quit]
  personas: [career-coach]
args:
  - name: history
    description: Your role and level, how long you have been there, recent reviews and feedback, attempts at promotion or new roles and what happened, how your company promotes people, and what you want next.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Is it a plateau, Possible causes, Most likely causes, Next move, How you will know]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people who feel stuck work out why, before they choose what to do. Most people jump to a fix (a course, a new job, a promotion push) without knowing the cause, and the fix misses. Career plateaus usually have one or two main causes: a skills gap for the next level (often not technical but scope, influence or judgement); low visibility of good work; a role with no room to show next-level work; weak relationships with the people who decide; a company or team with no openings above; feedback the person has not heard or accepted; or a mismatch between what they want and the path they are on. Some plateaus are chosen and fine. The cure depends on the cause, so treat this like a diagnosis: list hypotheses, test them against evidence, and find a cheap experiment.

<history>
{{history}}
</history>
</context>

<task>
1. Is it a plateau: restate the situation and judge whether it is a real stall (time at level well beyond what is normal there, repeated nos, shrinking scope) or a normal stretch, and whether they want to move up, across or something else.
2. Possible causes: for each common cause (next-level skills, visibility, role scope, relationships and sponsorship, organisational ceiling, unheard feedback, goal mismatch, personal circumstances), list the evidence for and against from their history.
3. Most likely causes: rank the top one or two with confidence, and list what to find out to confirm them (questions for their manager, a peer, someone recently promoted, HR).
4. Next move: for the most likely cause, one or two specific actions to try in the next 30 to 90 days, and what they would do if the cause turns out to be the company ceiling (internal move or external search).
5. How you will know: signs within three months that the move is working, and the point to reassess.
</task>

<constraints>
- Base every judgement on their history; label inferences and do not assume a cause without evidence.
- Name uncomfortable causes (feedback they may be missing, a skill gap) kindly but clearly.
- Do not invent how their company promotes people; ask or frame as questions.
- If they describe exhaustion or low mood, acknowledge it and suggest support from a doctor or counsellor alongside the career plan.
</constraints>

<output_format>
## Is it a plateau
## Possible causes
Table: Cause | Evidence for | Evidence against.
## Most likely causes
Ranked, with what to confirm.
## Next move
## How you will know
</output_format>
