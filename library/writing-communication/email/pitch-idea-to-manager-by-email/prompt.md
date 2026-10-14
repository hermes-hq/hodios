---
schema: 1
id: pitch-idea-to-manager-by-email
kind: prompt
title: Pitch an idea to your manager by email
description: Pitches an improvement idea to your manager in a short email - the problem with evidence, the idea, rough cost, a small low-risk first step and a clear ask - before any formal proposal exists.
category: email
version: 1.0.0
status: incubating
stage: [discover]
role: [individual, software-engineer, operations-manager, support-agent]
requires: [none]
inputs: [text, notes]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [idea-pitch, improvement, managing-up, pilot, initiative]
pairs_with:
  prompts: [write-project-proposal, request-approval-by-email, increase-work-visibility]
args:
  - name: idea
    description: The idea in your own words - what you would change or build, and how it would work.
    type: text
    required: true
  - name: problem
    description: The problem it solves and any evidence - numbers, complaints, time lost, examples.
    type: text
    required: true
  - name: cost
    description: What it would take - your time, others' time, money, tools - as far as you know.
    type: string
  - name: manager_priorities
    description: What your manager or the team is focused on this quarter, if you know, for example "reducing support tickets" or "cutting costs".
    type: string
output_contract:
  format: markdown
  sections: [Pitch check, Email, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Good ideas from individual contributors often die in one of two ways: a long enthusiastic email that reads like extra work for the manager, or a vague "we should really fix X" in a meeting. Managers say yes to ideas that solve a problem they already care about, come with evidence rather than opinion, have a contained first step (a two-week pilot, one team, one process) with a clear way to judge success, and do not ask them to find the time or budget on their own. The sender's job is to lower the cost of saying yes: lead with the problem in the manager's terms, size the cost honestly, and ask for something small (permission to try, an hour a week, a meeting) rather than a full commitment. Naming the main risk or objection up front makes the pitch more credible, not less.
</context>

<task>
Write a short pitch email to the manager.{{#manager_priorities}} Manager's priorities: {{manager_priorities}}.{{/manager_priorities}}{{#cost}} Cost: {{cost}}.{{/cost}}

<idea>
{{idea}}
</idea>

<problem>
{{problem}}
</problem>

1. Pitch check: in two or three bullets, assess whether the problem evidence is strong enough, how the idea links to the manager's priorities (if given), and the most likely objection. If the evidence is thin, suggest the one number to gather before sending.
2. Design a small first step: the smallest version that would show whether the idea works, with a duration, who is involved and one success measure. Use the input; mark guesses as suggestions.
3. Write the email:
   - Subject: "Idea: [outcome] by [change]" (for example "Idea: cut refund tickets by adding order tracking emails").
   - First two lines: the problem in the manager's terms, and the idea in one sentence.
   - Evidence: one to three facts from the input.
   - The first step, its cost and the success measure.
   - The main risk or objection and how the first step handles it.
   - The ask: specific and small ("Could I spend 4 hours a week for the next three weeks on this?" or "Could we discuss it for 15 minutes in our one-to-one?").
4. Under Notes, suggest what to prepare if the manager says "tell me more" and who else might need to agree.
</task>

<constraints>
- Under about 180 words in the body.
- Use only facts given; never invent savings, numbers or support from others. Use `[need: …]`.
- Confident, not salesy: no hype words ("game-changer", "revolutionary"), no criticism of current owners of the process.
- Do not imply the user will work unpaid overtime to make it happen.
</constraints>

<output_format>
## Pitch check
Bullets.
## Email
Subject line, then the body.
## Notes
Bullets: follow-up material, stakeholders, placeholders.
</output_format>
