---
schema: 1
id: write-known-issue-brief
kind: prompt
title: Write a known-issue brief for support
description: Writes the note engineering gives support about a live bug - symptoms, who is affected, workaround, what to tell customers, what not to promise and when to escalate.
category: writing
version: 1.0.0
status: incubating
stage: [operate]
role: [software-engineer, tech-lead, sre]
requires: [none]
inputs: [ticket, notes]
output: [message, docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [known-issue, support-handoff, workaround, escalation, customer-communication]
pairs_with:
  prompts: [write-known-issues-page, write-incident-update, write-troubleshooting-guide]
args:
  - name: issue
    description: The bug as engineering understands it - cause if known, affected versions, platforms or plans, workaround, fix status and any timeline.
    type: text
    required: true
  - name: ticket_examples
    description: A few customer reports about it, so the brief uses the words customers actually use.
    type: text
output_contract:
  format: markdown
  sections: [Brief, Suggested reply, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Support agents meet a bug through customer symptoms, not through stack traces, so a note written in engineering terms ("race in the token refresh path") does not help them match tickets. They need to recognise the issue from what customers say, know quickly whether a given customer is affected, have a workaround they can walk through, and know exactly what they may and may not promise. The worst outcomes are an agent promising a fix date engineering never gave, telling a customer it is their fault, or escalating every similar-looking ticket because the boundaries of the issue were never stated.
</context>

<task>
Write a known-issue brief for the support team.

<issue>
{{issue}}
</issue>
{{#ticket_examples}}
<ticket_examples>
{{ticket_examples}}
</ticket_examples>
{{/ticket_examples}}

1. Give the issue a short, symptom-based name support can search for.
2. Describe the symptoms in customer language{{#ticket_examples}}, reusing phrases from the ticket examples{{/ticket_examples}}, and how to tell this issue apart from look-alikes.
3. Say who is affected and who is not (versions, platforms, plans, regions, settings) and how an agent can check.
4. Give the workaround as numbered steps an agent can read to a customer, with any side effects. If there is none, say so.
5. State fix status and what may be said about timing. If engineering gave no date, the brief says not to give one.
6. Define escalation: which tickets to attach to the tracking issue, what information to collect, and which cases need an engineer (data loss, security, a customer outside the stated scope).
7. Write a short suggested reply agents can adapt.
</task>

<constraints>
- No internal hostnames, people's names, code paths or blame in the brief or the reply.
- Never invent a fix date, a cause or a workaround the input does not contain.
- If the issue might involve data loss or exposure of personal data, say so at the top and route those tickets to escalation.
- Keep the brief scannable: under about 350 words plus the reply.
</constraints>

<output_format>
## Brief
Name, Symptoms, Affected / not affected, How to check, Workaround, Fix status and what to say, Escalate when, Info to collect.

## Suggested reply
A short, warm, factual reply with placeholders such as [customer name].

## Open questions
Facts support will need that the input does not give, or "None".
</output_format>
