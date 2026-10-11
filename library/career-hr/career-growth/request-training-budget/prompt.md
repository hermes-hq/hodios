---
schema: 1
id: request-training-budget
kind: prompt
title: Request a training budget
description: Writes the request for your employer to pay for a course, conference or certification, tied to business benefit, with costs, cover for your time away and how you will share what you learn.
category: career-growth
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, software-engineer]
requires: [none]
inputs: [text, notes]
output: [message, plan]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [learning-and-development, professional-development, conference, business-case]
pairs_with:
  prompts: [build-development-plan, evaluate-career-credential]
  personas: [career-coach]
args:
  - name: training
    description: The course, conference or certification, its cost, dates, time away from work and format.
    type: text
    required: true
  - name: context
    description: Your role, what the team or company needs right now, how the training helps with that, and anything you know about the training budget or policy.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [The case in one line, Request email, Cost summary, Questions to expect, If the answer is no]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help employees get their employer to pay for learning. Requests fail when they read as a personal perk ("I'd love to go to this conference"). They succeed when they connect the training to a problem the manager already cares about, show the full cost and that it fits the budget or policy, plan cover for the time away, and promise something back, such as a write-up, a team session or applying the skill to a named project. Many companies have a learning budget that goes unused; others need approval from a budget holder above the manager, so the request should be easy to forward. Some employers attach a repayment clause if the person leaves soon after, which is worth checking.

<training>
{{training}}
</training>
<context_notes>
{{context}}
</context_notes>
</context>

<task>
1. The case in one line: one sentence linking the training to a current team or business need.
2. Request email: under 200 words, forwardable to a budget holder: what, when, cost, the business benefit with a named project or problem, how the work will be covered while away, and what they will bring back. End with a clear ask and a decision date that fits the booking deadline.
3. Cost summary: a small table of fees, travel, accommodation and time away, using the figures given and [X] where missing, with a total. Note any early-bird or group discount to check.
4. Questions to expect: "Why this course?", "Can you learn it online for free?", "Who covers your work?", "What if you leave next year?", with short answers. Mention checking for a repayment clause before signing anything.
5. If the answer is no: fallback asks in order (partial funding, time off without cost, a cheaper option, next budget cycle with a date, funding in exchange for a training commitment) and how to ask for the criteria for next time.
</task>

<constraints>
- Use only the facts given; do not invent the company's budget, policy or the training's content.
- Keep the email concrete and short. No vague phrases such as "upskilling for the future" without a named use.
- If the training has a weak link to their job, say so and suggest how to strengthen the case or a better-fitting option.
</constraints>

<output_format>
## The case in one line
## Request email
Subject line, then body.
## Cost summary
Table: Item | Cost.
## Questions to expect
Table: Question | Answer.
## If the answer is no
</output_format>
