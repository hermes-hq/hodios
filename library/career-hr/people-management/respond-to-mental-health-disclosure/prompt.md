---
schema: 1
id: respond-to-mental-health-disclosure
kind: prompt
title: Respond when a report discloses a mental health condition
description: Plans how a manager responds when a report discloses a mental health condition - the first words, confidentiality, practical support and adjustments, and what to do next with HR.
category: people-management
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, engineering-manager, operations-manager, founder]
advice_risk: [mental-health, legal]
requires: [none]
inputs: [notes]
output: [script, plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [mental-health-at-work, disclosure, confidentiality, workplace-adjustments, manager-support]
pairs_with:
  prompts: [plan-workplace-adjustments-as-manager, handle-employee-burnout, plan-return-from-leave]
  personas: [hr-business-partner]
args:
  - name: disclosure
    description: What the person told you, roughly in their words, how and where (in a one-on-one, by message), what they asked for if anything, and how you responded so far. Use initials.
    type: text
    required: true
  - name: country
    description: The country (and state or region) where the person works, because disability and privacy protections differ. Optional but recommended.
    type: string
output_contract:
  format: markdown
  sections: [In the moment, Confidentiality, Practical support, Next conversation, Who to involve, What not to do]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help managers respond well when a report tells them about a mental health condition such as depression, anxiety, bipolar disorder or PTSD. Disclosing at work is a risk for the person, and the manager's first response decides whether they keep talking. Helpful responses thank them, show it does not change how they are valued, ask what helps rather than assuming, and agree who else needs to know. Common harms: asking for a diagnosis or details they did not offer, making it about the manager's own experience, sharing it with the team or "just mentioning it" to a peer, assuming the person cannot handle responsibility and quietly removing work, or doing nothing and never following up. In many countries a long-term mental health condition can count as a disability, creating duties to consider adjustments and to protect the information; the details differ by country and must be checked with HR. Managers support; they do not treat.

<disclosure>
{{disclosure}}
</disclosure>
{{#country}}Country: {{country}}{{/country}}
</context>

<task>
1. In the moment: what to say if the conversation is still happening or in a reply message now - thanks, reassurance, a question about what would help, and a check on immediate safety only if anything suggests risk.
2. Confidentiality: who needs to know and why, how to agree that with the person, what to record and where, and what to say to colleagues if work is reassigned (without the reason).
3. Practical support: a table of possible adjustments (hours, breaks, workload, deadlines, remote work, meeting formats, time for appointments, a quiet space, written instructions) and support routes (assistance programme, occupational health, their doctor), as options to discuss, not decisions.
4. Next conversation: when to meet again, questions to ask about what helps and what makes it harder, warning signs they would like you to notice, and how they would like you to check in.
5. Who to involve: HR for adjustments and records, occupational health if available, and what HR should confirm about legal duties{{#country}} in {{country}}{{/country}}.
6. What not to do: a short list of common mistakes with a better alternative for each.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Never ask for a diagnosis, medication or medical details the person has not offered.
- Do not change their role, workload or responsibilities without their agreement.
- Do not state what the law requires; list what HR must confirm.
- Do not share the condition with anyone without the person's agreement, except where safety requires it.
</constraints>

<output_format>
## In the moment
## Confidentiality
## Practical support
Table: Option | What it helps with | Needs agreement from.
## Next conversation
## Who to involve
## What not to do
</output_format>
