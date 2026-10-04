---
schema: 1
id: handle-cleaning-quality-complaint
kind: prompt
title: Handle a cleaning quality complaint
description: Handles a home or office client who says a clean was not done properly - specifics and photos, a re-clean offer, blame-free staff feedback and a checklist fix so it does not happen again.
category: customer-support
version: 1.0.0
status: incubating
stage: [operate]
role: [founder, operations-manager, manager]
requires: [none]
inputs: [message, notes]
output: [message, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [cleaning-business, re-clean, quality-guarantee, staff-feedback, job-checklist]
pairs_with:
  prompts: [build-commercial-cleaning-rota, write-job-completion-report, write-support-reply]
args:
  - name: complaint
    description: What the client said, word for word if you can, with any photos described and when they noticed.
    type: text
    required: true
  - name: job_details
    description: Optional. The booking - scope or checklist agreed, hours booked and actually worked, who cleaned, access notes, products used, and any notes the cleaner left.
    type: text
  - name: client_type
    description: Domestic (a home, regular or one-off clean) or commercial (an office, shop or site under a contract or specification).
    type: enum
    enum: [domestic, commercial]
    default: domestic
output_contract:
  format: markdown
  sections: [What happened, Questions for the client, Remedy, Reply, Staff conversation, Checklist fix]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a cleaning company owner or supervisor handle a client who says a clean was not done properly. Client type: {{client_type}}. Most cleaning complaints come from four causes: a task was missed, a task was done to a lower standard than the client expects, the time booked could not cover the scope, or the client expected something that was never in scope (inside the oven, windows outside, moving furniture). Good firms respond within hours, fix the specific areas fast, and treat the cleaner as part of the solution rather than the culprit, because blame makes good cleaners leave and hides the real cause.

For commercial clients, the contract specification, the site log and any audit scores matter as much as the complaint itself, and repeated misses can trigger service credits or a contract review.
</context>

<task>
<complaint>
{{complaint}}
</complaint>

{{#job_details}}
<job_details>
{{job_details}}
</job_details>
{{/job_details}}

1. Turn the complaint into specific items: room or area, task, what the client saw. Vague complaints ("the place was still dirty") need questions before a remedy.
2. For each item, judge the likely cause: missed, below standard, not enough time for the scope, out of scope, or damage (anything broken, scratched or stained by the clean is a separate claim, recorded and escalated).
3. Write the questions for the client: which rooms, photos, when they noticed, whether anyone used the space after the clean, and what a good result looks like to them.
4. Choose the remedy. Default unless the business has its own guarantee: a free re-clean of the specific areas within 24-48 hours when reported within 24 hours of the clean, offered at a time that suits the client; a partial credit if a re-clean is impossible or the issue repeats; a scope conversation (with a price) for anything out of scope. Commercial: log it against the specification and say what the site log will show.
5. Write the reply: thank them, name the items, the remedy and the time, and one line on what changes next time.
6. Plan the staff conversation: private, fact-based, using the photos; start with "what got in the way?" (time, access, products, equipment, unclear checklist), agree one change, and record it. Raise performance concerns only if a pattern shows across jobs.
7. Fix the checklist: add or reword the items that failed so they are observable (for example "skirting boards wiped in every room" instead of "dust"), and say whether the booked time needs to change.
</task>

<constraints>
- Use only the facts given. Do not assume the cleaner was careless; if the hours worked or the scope are unknown, ask.
- Do not offer refunds or credits beyond a stated policy; mark any assumed remedy "for approval".
- Do not name or blame the cleaner in the client reply.
- Keep the reply under about 120 words.
- If the client mentions damage, theft or a key or alarm problem, say it needs a separate, prompt investigation and check of the firm's insurance; do not admit liability in the reply.
</constraints>

<output_format>
## What happened
Table: item | area | likely cause | evidence.

## Questions for the client
Numbered, only what is still unknown.

## Remedy
The remedy, when, and who approves anything beyond policy.

## Reply
Ready to send.

## Staff conversation
Four or five bullets: opening line, questions, the agreed change, how it is recorded.

## Checklist fix
Before and after lines for each changed checklist item, plus any change to booked time.
</output_format>
