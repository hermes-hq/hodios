---
schema: 1
id: push-back-on-deadline-by-email
kind: prompt
title: Push back on a deadline by email
description: Replies to an unrealistic deadline with your real estimate and a choice of trade-offs on scope, quality, cost or other work, so the requester decides instead of you silently failing.
category: email
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, software-engineer, project-manager, consultant]
requires: [none]
inputs: [text, message]
output: [message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [deadline, trade-offs, scope-cut, expectation-setting]
pairs_with:
  prompts: [ask-manager-to-prioritise-work, request-deadline-extension, explain-estimate-to-stakeholders]
args:
  - name: request
    description: The request and the deadline as you received it. Paste the message if you have it.
    type: text
    required: true
  - name: estimate
    description: Your honest estimate of the work, what it is based on, and what makes it uncertain.
    type: text
    required: true
  - name: other_commitments
    description: What else you are committed to in the same period, with dates, if relevant.
    type: text
  - name: requester
    description: Who set the deadline and your relationship, for example "my manager", "a client paying fixed fee", "the sales director, not my boss".
    type: string
output_contract:
  format: markdown
  sections: [Read of the deadline, Email, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Saying yes to a deadline you cannot meet is the most expensive answer: the requester plans around it, and the miss arrives late, when nothing can be adjusted. Saying a flat no reads as unhelpful. What works is to separate the deadline from the work: restate the goal behind the date, give your real estimate with its basis, and offer two or three concrete options (cut scope, accept a lower polish, add people or budget, move other work, or move the date) so the requester chooses the trade-off. Often the date itself is soft and something smaller is what is truly needed by then. Pushing back is easier to accept when it arrives early, in writing, in a neutral tone, and when it asks a question the requester can answer in one line. If the requester is not the person who sets your priorities, the trade-off involving your other work belongs to your manager, not to them.
</context>

<task>
Write a pushback email on this deadline.{{#requester}} Requester: {{requester}}.{{/requester}}

<request>
{{request}}
</request>

<estimate>
{{estimate}}
</estimate>
{{#other_commitments}}
<other_commitments>
{{other_commitments}}
</other_commitments>
{{/other_commitments}}

1. If the request or the estimate is too vague to compare, ask up to three questions and stop.
2. Read of the deadline: what the date is probably for (a launch, a meeting, a client promise), whether it seems fixed or soft, and the gap between the deadline and the estimate. If the estimate fits the deadline, say so and suggest a simple confirmation instead.
3. Build two or three options, each realistic from the input:
   - Smaller scope by the original date (name what is in and what is out).
   - Full scope by a later date (from the estimate, with a small buffer).
   - Original date and full scope only if something gives: other work moved, extra help, or reduced quality. Name the cost honestly.
4. Write the email:
   - Subject: "[Work]: options for the [date] deadline".
   - Open by confirming the goal and that you want to hit it.
   - The estimate in one or two lines with its basis.
   - Options as a short numbered list with a recommendation.
   - The question: "Which works best? If I don't hear by [date], I'll go with option [n]."
   - If the requester does not control the user's priorities, say option 3 needs the user's manager to agree, and suggest copying them.
5. Under Notes, list what to verify before sending (the estimate, whether anything was already promised to a customer) and placeholders.
</task>

<constraints>
- Under about 200 words in the body.
- Use only the user's estimate; never shrink it to make the email easier. If the estimate looks optimistic, say so in the Read.
- No apology for having limits, no blame on the requester for the date.
- Do not agree on the user's behalf to overtime or weekend work.
- Never invent dates, scope items or people; use `[need: …]`.
</constraints>

<output_format>
## Read of the deadline
Three or four bullets: purpose, fixed or soft, the gap.
## Email
Subject line, then the body.
## Notes
Bullets: checks before sending, who to copy, placeholders.
</output_format>
