---
schema: 1
id: request-time-off-by-email
kind: prompt
title: Request time off by email
description: Writes a leave request to your manager with exact dates, working days, cover plan and handover status, so the answer can be a one-word yes or a specific adjustment.
category: email
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, software-engineer, project-manager, consultant]
requires: [none]
inputs: [text, notes]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: small
reasoning: off
level: beginner
depth: specific
tags: [annual-leave, time-off, leave-request, workplace]
pairs_with:
  prompts: [write-handover-document, write-out-of-office-message, write-unplanned-absence-email]
args:
  - name: dates
    description: First and last day off, and the day you are back, for example "Mon 8 Dec to Fri 19 Dec, back Mon 5 Jan". Include half days.
    type: string
    required: true
  - name: work_context
    description: What is on your plate around those dates, deadlines or events that fall inside them, who could cover, and how much leave you have left if you know.
    type: text
  - name: leave_type
    description: The kind of leave, for example "annual leave", "unpaid leave", "study leave" or "moving day". Private reasons do not need to be stated in the email.
    type: string
    default: annual leave
  - name: notice
    description: How far ahead you are asking. Short means inside your team's usual notice period; normal means with plenty of notice.
    type: enum
    enum: [normal, short]
    default: normal
output_contract:
  format: markdown
  sections: [Email, Before sending]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Managers approve leave fast when they can see three things at a glance: the exact dates, whether anything important lands in that window, and who covers. Requests stall when the dates are vague ("the week after next"), when the manager has to discover the clash with a release or a client visit themselves, or when the request is framed as an apology. Most workplaces also have a formal step (an HR system, a calendar, a leave form); the email gets the conversation done and the system records it, so the email should say the formal request will follow or has been submitted. Annual leave is an entitlement in many countries, so the tone is a polite heads-up and request, not a plea. The reason for personal leave rarely needs explaining.
</context>

<task>
Write a time-off request email for {{leave_type}}.

Dates: {{dates}}
Notice: {{notice}}
{{#work_context}}
<work_context>
{{work_context}}
</work_context>
{{/work_context}}

1. If the dates are not clear enough to count working days, ask for them and stop.
2. Count the working days requested, assuming a Monday to Friday week unless told otherwise. Note public holidays only if the user gives the country, and mark them as "check" rather than asserting them.
3. Check the work context for clashes: deadlines, launches, client meetings, on-call shifts or a colleague already off. If there is a clash, name it in the email with how it is handled, rather than leaving the manager to find it.
4. Write the email:
   - Subject: "Leave request: [dates] ([n] days)".
   - First line: the request with exact dates and the return date.
   - One to three short lines on cover: what will be finished before, what is handed to whom (only names given), and what can wait.
   - If notice is short, one line acknowledging it and why the cover still works; no grovelling.
   - Say the formal request is in the leave system, or will be once agreed.
   - Close with an easy reply path: "Let me know if that works or if you would like me to move any days."
5. Under Before sending, list anything the user should confirm first (cover person agreed, balance, team calendar) and placeholders to fill.
</task>

<constraints>
- Under about 120 words in the body.
- Use only facts given. Never invent a colleague's name, a balance or a deadline; use `[need: …]`.
- Do not volunteer private reasons (health, family, interviews) unless the user wants them stated.
- No apologising for taking leave, no "if it's not too much trouble".
- Do not state what the law or the company policy allows; if the user asks, suggest checking the contract or HR policy.
</constraints>

<output_format>
## Email
Subject line, then the body.
## Before sending
Bullets: who to line up as cover, clashes to resolve, placeholders, and the leave system step. "Ready to send" if nothing.
</output_format>
