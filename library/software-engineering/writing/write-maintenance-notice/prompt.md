---
schema: 1
id: write-maintenance-notice
kind: prompt
title: Write a planned maintenance notice
description: Writes the advance notice for planned maintenance on a software service, with the window in UTC and local time, what will and will not work, what users should do and how they hear it is over.
category: writing
version: 1.0.0
status: incubating
stage: [operate]
role: [sre, devops-engineer, backend-engineer, support-agent]
requires: [none]
inputs: [notes]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [maintenance-window, status-page, downtime, customer-communication]
pairs_with:
  prompts: [plan-maintenance-window, write-incident-update, write-public-incident-report]
args:
  - name: maintenance
    description: What is being done (in plain terms), start and end time with time zone, which features or APIs are affected and how (read-only, unavailable, slower), regions, what users should do before or during, and the rollback plan if it overruns.
    type: text
    required: true
  - name: channel
    description: "status-page, email, or in-app banner."
    type: enum
    enum: [status-page, email, in-app]
    default: email
  - name: local_time_zones
    description: Time zones most of your users are in, for local-time conversions, for example "Europe/Berlin, America/New_York".
    type: string
output_contract:
  format: markdown
  sections: [Notice, Reminder and completion messages, Checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Planned maintenance notices are read by people deciding whether to move a job, warn their own customers or stay up late. They need the window in a time they can act on, the precise impact per feature (fully down, read-only, degraded, or unaffected), and whether integrations such as webhooks or API calls will fail or queue. Notices go wrong by giving times without a time zone, mixing up dates across midnight, saying "brief interruption" without a duration, and not saying what happens if the work overruns.
</context>

<task>
Write a {{channel}} maintenance notice.

<maintenance>
{{maintenance}}
</maintenance>

1. Put the window first: date, start and end in UTC{{#local_time_zones}}, plus local times for {{local_time_zones}}{{/local_time_zones}}, and the expected duration. Check the conversions, including when the window crosses midnight or a daylight-saving change.
2. List impact per feature or API as unavailable, read-only, degraded or unaffected. Say what happens to requests, webhooks, scheduled jobs and logins during the window, as far as the input states.
3. Say what users should do before and during (finish exports, pause integrations, nothing at all).
4. Say why in one plain sentence, without internal system names.
5. Say how they will know it has finished and where to follow updates.
6. Write a short reminder message for the day before and a completion message.
</task>

<constraints>
- Do not invent impact, duration or reasons. If the impact on something users will ask about (API, webhooks, logins) is not stated, add it to Checks instead of guessing.
- No "brief" or "minimal" without a number of minutes.
- Status page and in-app: under about 100 words; email: under about 250 words with a subject line.
</constraints>

<output_format>
## Notice
The {{channel}} text.

## Reminder and completion messages
Two short messages.

## Checks
Bullets: time conversions to double-check, impacts not stated, and anything that needs sign-off, or "None".
</output_format>
