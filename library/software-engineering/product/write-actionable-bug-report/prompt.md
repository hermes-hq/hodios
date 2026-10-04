---
schema: 1
id: write-actionable-bug-report
kind: prompt
title: Write an actionable bug report
description: Turns a messy complaint, screenshot note or support chat into a bug report engineers can act on, with environment, numbered steps, expected versus actual, frequency, impact and open unknowns.
category: product
version: 1.0.0
status: incubating
stage: [verify, operate]
role: [support-agent, qa-engineer, product-manager, business-analyst]
stack: []
requires: [none]
inputs: [message, transcript, ticket, text]
output: [docs, questions]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [bug-report, reproduction-steps, severity, defect-tracking, support-escalation]
pairs_with:
  prompts: [reproduce-bug-report, write-acceptance-criteria]
args:
  - name: raw_report
    description: The complaint as received - a customer email, chat transcript, your own notes, a description of a screenshot or screen recording, error text.
    type: text
    required: true
  - name: product_context
    description: What you know about the product and environment - app or site, versions, platforms, user roles, recent releases, how many customers reported it.
    type: text
output_contract:
  format: markdown
  sections: [Bug report, Questions for the reporter, Notes for triage]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Engineers can fix a bug quickly when they can reproduce it and know how much it matters. Reports from support, testers and colleagues often arrive as stories ("it keeps crashing when I try to pay") that mix symptoms, guesses about causes and frustration. Reports fail when the title is vague, steps skip the state that triggers the bug (logged in as which role, with what data), expected and actual are merged, the environment is missing, impact is "urgent!!" instead of facts, and guesses are written as if they were observations. The person writing may not be technical; the report should be clear without jargon.
</context>

<task>
<raw_report>
{{raw_report}}
</raw_report>
{{#product_context}}
<product_context>
{{product_context}}
</product_context>
{{/product_context}}

1. Separate what was observed from what the reporter believes or guesses. Keep guesses only in Notes for triage.
2. Write a title of at most about 80 characters: where, what goes wrong, under which condition ("Checkout: Pay button does nothing when the cart has a gift card").
3. Environment: product area, app or browser and version, operating system and device, account type or role, region or language, date and time with time zone of the occurrence, and any ids that help find logs (order number, request id) - never passwords or full card numbers.
4. Preconditions and numbered steps: the starting state (logged in as, data present), then one action per step, as specific as the source allows. Mark steps you inferred with "(inferred)".
5. Expected result and actual result, separately, with exact error text in quotes.
6. Frequency (every time, sometimes with a rough rate, once) and whether it was reproduced by someone other than the reporter.
7. Impact: who is affected and how many if known, whether there is a workaround, data loss or money at stake, and a suggested severity using a common scale (blocker, critical, major, minor, trivial) with the reason; the team may override it.
8. Evidence: list attachments mentioned (screenshots, recordings, logs, HAR files) and what each shows.
9. List the questions to ask the reporter that would most help reproduction, at most five, in plain language.
</task>

<constraints>
- Do not invent steps, versions, error text or numbers of affected users; write [X] or "unknown" and ask.
- Do not guess the cause in the report body; put hypotheses in Notes for triage, labelled as such.
- Remove personal data from the report: names, emails, phone numbers, addresses, payment details. Keep an internal reference to the ticket instead.
- If the report describes several different problems, split them into separate reports.
- If it is a feature request or a question rather than a bug, say so and suggest where it belongs.
</constraints>

<output_format>
## Bug report
Title, then labelled fields: Environment, Preconditions, Steps to reproduce (numbered), Expected, Actual, Frequency, Impact and suggested severity, Evidence, Ticket reference.
## Questions for the reporter
Numbered, plain language.
## Notes for triage
Bullets: hypotheses, related known issues, anything that suggests a recent release caused it.
</output_format>
