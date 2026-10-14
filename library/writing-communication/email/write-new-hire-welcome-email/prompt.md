---
schema: 1
id: write-new-hire-welcome-email
kind: prompt
title: Write a new hire welcome email
description: Writes the email a manager sends a new hire before their first day, with when and where to arrive, what to bring, how day one and week one run, who to ask and what not to worry about.
category: email
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, engineering-manager, operations-manager, recruiter]
requires: [none]
inputs: [notes, text]
output: [message, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [new-hire, welcome-email, first-day, onboarding-logistics, pre-boarding]
pairs_with:
  prompts: [plan-new-hire-onboarding, announce-new-hire-to-team, write-meeting-invite]
args:
  - name: new_hire
    description: Their first name, role, start date, and whether they work on site, remote or hybrid.
    type: string
    required: true
  - name: logistics
    description: Arrival time and place or video link, who meets them, equipment and accounts, what to bring (ID, bank or tax forms as required by your organisation), dress, parking or transport, lunch.
    type: text
    required: true
  - name: first_week
    description: What the first day and week look like - meetings, training, a buddy, a first small task.
    type: text
output_contract:
  format: markdown
  sections: [Email, Missing details, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The days before a start date are when new hires are most anxious and most likely to have second thoughts; silence from the employer between offer and day one feeds both. A welcome email from the manager, sent about a week before, lowers anxiety by answering the practical questions people are embarrassed to ask: exactly where and when to go, who will meet them, what to bring, what to wear, whether lunch is sorted, how the laptop and accounts work, and what the first day and week will actually involve. It also sets the tone: the manager is expecting them, has a plan, and does not expect them to be productive immediately. Remote starters need extra detail on equipment delivery and the first login, because a broken first login on day one is a common, avoidable bad start. Formal items (contracts, tax and right-to-work documents) are usually HR's job; the email should point to them, not restate rules.
</context>

<task>
Write a pre-start welcome email for: {{new_hire}}.

<logistics>
{{logistics}}
</logistics>
{{#first_week}}
<first_week>
{{first_week}}
</first_week>
{{/first_week}}

1. Check the logistics against what a new starter needs on day one: arrival time and exact place or link, who meets them, how to get in (reception, badge, door code), equipment and first login, what to bring, dress, lunch, and who to contact on the morning if something goes wrong. List what is missing under Missing details instead of inventing it.
2. Write the email:
   - Subject: "Welcome, [name]: your first day on [date]".
   - Warm opening in one or two sentences from the manager.
   - **Day one:** time, place or link, who meets them, how to get in, what the day looks like.
   - **Bring and set up:** items to bring, equipment and login steps, with documents pointed to HR's instructions rather than listed from assumption.
   - **Your first week:** a few bullets from the input, including buddy and first task if given.
   - **Good to know:** dress, lunch, transport or parking, only from the input.
   - A line that they are not expected to know everything in week one, and how to reach the manager before they start (phone for the morning of day one).
3. Under Notes, suggest sending it about a week before, a short check-in two days before, and anything to arrange so the plan holds (desk, accounts, buddy told).
</task>

<constraints>
- Under about 280 words in the body.
- Never invent addresses, times, names, equipment, dress codes or policies. Missing items go under Missing details or as `[need: …]`.
- Do not state legal document requirements; refer to HR's instructions.
- Warm, plain, not corporate ("We're thrilled to have you on this journey" is out).
</constraints>

<output_format>
## Email
Subject line, then the body.
## Missing details
Bullets of details to fill in before sending. "None" if complete.
## Notes
Bullets: timing, preparations.
</output_format>
