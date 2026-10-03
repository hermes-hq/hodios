---
schema: 1
id: write-csat-survey
kind: prompt
title: Write a customer satisfaction survey
description: Writes a short customer satisfaction survey for one touchpoint - the right question types, wording, timing and channel - plus a routine for following up low scores and acting on themes.
category: customer-support
version: 1.0.0
status: incubating
stage: [build, review]
role: [support-agent, operations-manager, founder, manager]
inputs: [notes, text]
output: [copy, checklist, plan]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [csat, customer-feedback, survey-design, survey-timing, customer-effort-score, close-the-loop]
pairs_with:
  prompts: [analyze-support-tickets, build-service-recovery-playbook, write-survey-questionnaire]
args:
  - name: business
    description: The business, its customers, and what you want to learn or improve.
    type: text
    required: true
  - name: touchpoint
    description: The single moment you are surveying, for example "after a support ticket is closed", "after a restaurant visit", "30 days after onboarding".
    type: string
    required: true
  - name: channel
    description: How the survey is delivered.
    type: enum
    enum: [email, sms, in-app, on-site, after-call]
    default: email
output_contract:
  format: markdown
  sections: [What this survey measures, Survey, Invitation message, Timing and sampling, Acting on low scores, Reading the results]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design customer feedback programmes for small businesses and support teams. Short surveys sent right after the moment that matters get honest answers; long ones get abandoned or answered only by the angriest and happiest customers. Pick the measure that fits the question: CSAT (satisfaction with this interaction), CES (how easy it was to get something done) or NPS (likelihood to recommend, a relationship measure, not a transaction one). One rating plus one open "why" usually teaches more than ten ratings. The value is in what happens next: every low score gets a fast human follow-up, and recurring themes change how the business works.
</context>

<task>
Write a survey for this touchpoint.

<business>
{{business}}
</business>

Touchpoint: {{touchpoint}}
Channel: {{channel}}

1. Choose the headline measure (CSAT, CES or NPS) for this touchpoint and say why in two sentences; recommend against using NPS for a single transaction unless the user asks for it.
2. Write the survey: the headline rating question with its scale and labelled ends, one open "what is the main reason for your score?" question, and at most two optional questions (a driver checklist, permission to contact). Total completion under 60 seconds. Use neutral wording: no leading ("How great was…") and no double-barrelled questions.
3. Adapt to the channel: SMS is one question with a reply number and a link for the rest; after-call is one spoken or keypad question; email and in-app can embed the first question so one tap answers it; on-site uses a QR code or tablet with no login.
4. Write the invitation message: why, how long it takes, and the first question embedded where the channel allows.
5. Timing and sampling: when to send after the touchpoint, how often one customer can be asked, and what to exclude (for example cases closed as spam, or customers mid-complaint who are already in recovery).
6. Acting on low scores: what counts as a low score on this scale, who follows up, within what time, a short follow-up message, and how to log the cause.
7. Reading the results: how to calculate the score, the minimum responses before trusting a trend, tagging open answers into themes, and a monthly review that picks one fix.
</task>

<constraints>
- At most four questions in total. If the user wants more, explain the drop-off cost and suggest a separate research survey.
- Do not quote benchmark scores or response rates as fact.
- Ask for permission before contacting a respondent; respect opt-outs and the channel's consent rules (flag these to check).
- Plain words a customer reads in five seconds.
</constraints>

<output_format>
## What this survey measures
## Survey
Numbered questions with scales and answer options exactly as shown to the customer.
## Invitation message
For the chosen channel, ready to paste.
## Timing and sampling
## Acting on low scores
Steps and a follow-up message under 80 words.
## Reading the results
</output_format>
