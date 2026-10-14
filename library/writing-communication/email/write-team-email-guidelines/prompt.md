---
schema: 1
id: write-team-email-guidelines
kind: prompt
title: Write team email and chat guidelines
description: Writes a short team agreement for email and chat - which channel for what, expected response times, cc and reply-all rules, subject tags, how to flag urgency and after-hours norms.
category: email
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, engineering-manager, operations-manager, project-manager]
requires: [none]
inputs: [text, notes]
output: [docs, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [communication-norms, response-times, reply-all, after-hours, team-agreement]
pairs_with:
  prompts: [write-team-charter, write-meeting-ground-rules, triage-inbox]
args:
  - name: problems
    description: What is going wrong now, for example "urgent requests lost in email", "reply-all storms", "messages at 11pm", "people cc'd on everything", "nobody knows if a chat message needs an answer".
    type: text
    required: true
  - name: team
    description: Team size, roles, time zones, shift patterns, and the tools you use (email, which chat tool, ticketing, phone).
    type: string
    required: true
  - name: constraints
    description: Anything fixed, such as company policy, client service levels, on-call arrangements or regulatory record-keeping.
    type: text
output_contract:
  format: markdown
  sections: [Guidelines, Rollout message, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most team communication pain comes from unspoken, mismatched expectations: one person thinks a chat message needs an answer within minutes, another checks twice a day; one cc's everyone to be safe, another reads cc as "for action". A short written agreement fixes much of this, but only if it is specific (a response time in hours, not "promptly"), short enough to remember (one page), built from the team's actual problems, and agreed by the team rather than imposed. The pieces that matter most: which channel for which kind of message (email for external and decisions on record, chat for quick internal questions, phone or a defined urgent route for true emergencies), response-time expectations per channel, what To versus Cc means, reply-all rules, subject line tags such as ACTION, FYI or DECISION with a date, and after-hours norms that respect time zones and rest (send-later, no expectation of replies outside working hours, a real route for emergencies). Rules that conflict with client commitments or on-call duties have to be reconciled, not ignored. Some countries also have rules about contacting employees out of hours; those are for the organisation to check.
</context>

<task>
Write email and chat guidelines for this team.

Team: {{team}}

<problems>
{{problems}}
</problems>
{{#constraints}}
<constraints_given>
{{constraints}}
</constraints_given>
{{/constraints}}

1. Map each stated problem to the rule that addresses it. Do not add rules for problems the team does not have, beyond a minimal channel and response-time baseline.
2. Write the Guidelines as a one-page agreement with short sections:
   - **Which channel for what:** a small table: message type, channel, expected response time.
   - **Urgent means:** the one route for urgent matters and what counts as urgent.
   - **To, Cc and reply-all:** what each means for this team, and when to reply-all.
   - **Subject lines and first lines:** tags such as ACTION by [date], DECISION, FYI, and the ask in the first line.
   - **Working hours and time zones:** send-later, no expectation to reply outside hours, how on-call or client commitments fit.
   - **Keeping it findable:** where decisions are recorded so they do not live in a chat thread.
   Keep it to ten rules or fewer in total.
3. Write a Rollout message from the manager: why, the draft attached, an invitation to change it at the next team meeting, a trial period (for example four weeks) and a review date.
4. Under Notes, list rules that may conflict with the constraints given, anything to check with HR or company policy (for example out-of-hours contact rules in some countries), and how to model the behaviour as the manager.
</task>

<constraints>
- One page: under about 400 words for the Guidelines.
- Specific numbers for response times; no "promptly" or "as soon as possible".
- Never invent tools, policies or service levels the team does not have; use the ones given or placeholders.
- Do not state labour law; flag it as something to check.
- Tone: an agreement among colleagues, not a policy with sanctions.
</constraints>

<output_format>
## Guidelines
The one-page agreement with the sections above.
## Rollout message
The message to the team.
## Notes
Bullets: conflicts, checks, how to model it.
</output_format>
