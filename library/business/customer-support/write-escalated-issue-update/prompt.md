---
schema: 1
id: write-escalated-issue-update
kind: prompt
title: Write an update on an escalated issue
description: Writes the recurring update to a key customer on a long-running escalated problem - progress since last time, what changed, honest risks, what you need from them and the next checkpoint.
category: customer-support
version: 1.0.0
status: incubating
stage: [operate]
role: [support-agent, manager, operations-manager]
requires: [none]
subject: [saas]
inputs: [notes, message]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [escalation-update, key-accounts, status-update, expectation-setting, account-management]
pairs_with:
  prompts: [plan-customer-escalation-response, write-incident-update, summarize-support-conversation]
  personas: [customer-success-manager]
  rules: [support-commitment-rules]
args:
  - name: issue
    description: The problem in short, when it started, its impact on this customer, and what was said in the last update (paste it if you can).
    type: text
    required: true
  - name: progress
    description: Internal notes since the last update - what engineering or other teams found, what was fixed or tried, current ETA and how confident the team is, workarounds, and anything that slipped.
    type: text
    required: true
  - name: asks
    description: Anything you need from the customer (logs, a test, access, a meeting) and any remedy already approved (credits, extended terms). Optional.
    type: text
  - name: audience
    description: Who receives it and their role, for example "their ops lead and CTO, technical" or "office manager, non-technical".
    type: string
output_contract:
  format: markdown
  sections: [Subject line, Update, Internal notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write updates to an important customer whose problem has dragged on for days or weeks. By this stage the customer's trust depends less on the fix than on the updates: arriving when promised, saying something new each time, being honest when a date slips, and never sounding like the last one with the date changed. Good escalation updates lead with what changed since last time, separate what is confirmed from what is being investigated, give an ETA only with its confidence, admit misses plainly, make any request to the customer specific and small, and end with the exact time of the next update even if there is no news. They avoid internal blame ("engineering is slow"), jargon the reader does not use, and padding apologies.
</context>

<task>
<issue>
{{issue}}
</issue>

<progress>
{{progress}}
</progress>

{{#asks}}
<asks>
{{asks}}
</asks>
{{/asks}}

{{#audience}}Audience: {{audience}}{{/audience}}

1. Compare the progress notes with the last update and identify what is genuinely new: findings, fixes, ETA changes, slips, new workarounds.
2. Write a subject line with the issue name, update number or date, and status in a few words (for example "investigating", "fix in testing", "resolved, monitoring").
3. Write the update:
   - first two lines: current status and the most important change since last time;
   - what we know now (confirmed) and what we are still checking;
   - what we are doing next and the ETA with a plain confidence word (firm, likely, uncertain), or "no ETA yet" with the reason;
   - if a previous date was missed, say so in one sentence and why, without blaming a team;
   - the workaround, if any, in numbered steps;
   - what we need from them, if anything, with a date;
   - next update: a specific day and time and the channel.
4. Fit the audience: technical detail for technical readers, business impact and dates for non-technical ones. Keep it under about 250 words.
5. In Internal notes list facts that need confirming before sending, anything in the notes deliberately left out (and why), and any remedy that needs approval.
</task>

<constraints>
- Do not state a root cause, fix or date that the progress notes do not support.
- Do not promise credits or compensation unless listed as approved.
- No internal names, ticket numbers or system names unless the customer already uses them.
- One apology at most, tied to something specific.
</constraints>

<output_format>
## Subject line
One line.

## Update
Ready to send.

## Internal notes
Bullets.
</output_format>
