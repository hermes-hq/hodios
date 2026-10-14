---
schema: 1
id: write-transfer-request-letter
kind: prompt
title: Write a transfer request letter
description: Writes an employee's request to transfer to another location, team or shift with reasons, readiness, proposed timing and a handover offer, plus how to raise it with the manager first.
category: business-writing
version: 1.0.0
status: incubating
stage: [build]
role: [individual, job-seeker]
requires: [none]
inputs: [notes]
output: [message, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: off
level: beginner
depth: specific
tags: [transfer-request, relocation-request, internal-mobility, shift-change, employee-letters]
pairs_with:
  prompts: [apply-for-internal-role, write-formal-letter, design-internal-transfer-process]
args:
  - name: request
    description: Where you want to move (branch, city, team, department or shift), from when, and whether there is a known vacancy.
    type: text
    required: true
  - name: reasons
    description: Why - career growth, family, partner relocation, caring, commute, health - and how much of the reason you are comfortable sharing.
    type: text
    required: true
  - name: current_role
    description: Your job title, team, manager, length of service, and anything that shows you are ready (skills, results, flexibility).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Letter, Before you send]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help employees ask for a transfer. Requests succeed more often when the manager hears it in person first and the letter then records it; when the request shows how the move also works for the employer (skills the other site needs, continuity, keeping a trained person); when it is flexible on timing and offers a clear handover; and when personal reasons are stated briefly and with dignity, without oversharing. Requests fail when they read as complaints about the current team or manager, as ultimatums, or when they ask for something with no thought for cover. If the reason is a health condition, disability, caring duty or family need, many employers have a flexible working or adjustment policy that may give the request a formal route; the employee should check their handbook.

<request>
{{request}}
</request>

<reasons>
{{reasons}}
</reasons>

<current_role>
{{current_role}}
</current_role>
</context>

<task>
1. Write the letter or email to the manager (copied to HR if the user's company requires it):
   - Subject line naming the request.
   - Opening: the request in one sentence with the destination and preferred date.
   - Reason: one or two sentences at the level of detail the user chose.
   - Fit: why the move works for the organisation, from the user's skills and record.
   - Flexibility and handover: openness on timing, an offer to train a replacement or document work, and willingness to discuss.
   - Close: thanks and a request for a meeting.
2. Keep it under 250 words, polite and direct.
3. Before you send: suggest raising it with the manager in person first and a short line to open that conversation; mention checking the internal transfer or flexible working policy and any vacancy listing; and note what to do if the answer is no or not yet (ask what would make it possible and when to revisit).
</task>

<constraints>
- Use only the user's facts; do not invent achievements, vacancies or policy terms.
- No criticism of colleagues or the current manager, no threats to resign.
- Share health or family details only to the extent the user said they are comfortable.
</constraints>

<output_format>
## Letter
The letter with subject line.
## Before you send
Bullets including an opening line for the conversation.
</output_format>
