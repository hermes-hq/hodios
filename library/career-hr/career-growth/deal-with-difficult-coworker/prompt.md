---
schema: 1
id: deal-with-difficult-coworker
kind: prompt
title: Deal with a difficult coworker
description: Diagnoses a difficult coworker pattern - rude, unreliable, territorial, negative or competitive - and plans what to change on your side, a direct conversation, what to record and when to escalate.
category: career-growth
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, software-engineer]
requires: [none]
inputs: [text, notes]
output: [plan, script, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [workplace-conflict, coworker, difficult-conversation, escalation]
pairs_with:
  prompts: [handle-workplace-bullying, address-peer-not-pulling-weight, handle-credit-taking-colleague, repair-damaged-work-relationship]
  personas: [career-coach]
args:
  - name: situation
    description: What the coworker does, with two or three specific recent examples, how it affects your work, how long it has gone on, what you have tried, and your relationship (peer, different team, more senior).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What is going on, What you control, The conversation, Keep a record, When and how to escalate]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people deal with coworkers who make work harder. Most difficult behaviour falls into a few patterns: unreliable (misses deadlines, drops handoffs), territorial (guards information or decisions), rude or dismissive (interrupts, curt messages, public put-downs), chronically negative, or competitive (undercuts, takes over). Each needs a different response. The common mistakes are complaining to others before talking to the person, raising it vaguely ("you're difficult"), or waiting until anger takes over. A better path: check your own reading of the situation, change what you control (clearer agreements, written follow-ups, working norms), have one direct, specific conversation about behaviour and impact, keep a factual record, and escalate to a manager if it continues and affects the work. Bullying, harassment or discrimination is a different matter with formal routes.

<situation>
{{situation}}
</situation>
</context>

<task>
1. What is going on: name the pattern or patterns, using their examples, and offer one or two possible explanations from the coworker's side (pressure, unclear roles, different working style) as hypotheses, not excuses. If the behaviour sounds like bullying, harassment or discrimination, say so and point to that route.
2. What you control: specific changes on their side that reduce the problem regardless of the coworker (written agreements on deadlines and owners, confirming decisions in writing, clarifying roles with the manager, setting meeting norms, limiting exposure), tailored to the pattern.
3. The conversation: when and where (private, not in the heat of the moment), and a short script: open, name one or two specific behaviours with examples, describe the impact on the work, ask for their view, propose a specific change, and agree a follow-up. Add replies for denial, defensiveness and counter-complaints.
4. Keep a record: what to note (date, what happened, impact, witnesses, what was said) in neutral language, and why it matters if things escalate.
5. When and how to escalate: the signs that it is time to involve the manager (repeated after the conversation, affecting deliverables or wellbeing), how to frame it as a work problem with evidence and a request, and when HR or formal routes are appropriate.
</task>

<constraints>
- Work from their account but note where the other side is unknown; do not label the coworker's character.
- Keep scripts about behaviour and impact, never personality.
- Never suggest retaliation, gossip, sabotage or public confrontation.
- For bullying, harassment, threats or discrimination, tell them it is not a normal personality clash, to keep records and use HR, union or official advice, and to put their safety and wellbeing first.
</constraints>

<output_format>
## What is going on
Pattern, then possible explanations.
## What you control
## The conversation
Script, then replies table: They say | You say.
## Keep a record
Template line.
## When and how to escalate
</output_format>
