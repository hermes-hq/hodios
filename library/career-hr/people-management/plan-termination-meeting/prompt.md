---
schema: 1
id: plan-termination-meeting
kind: prompt
title: Plan a dismissal meeting for performance or conduct
description: Prepares a manager to dismiss an employee for performance or conduct after a fair process, with a readiness check, script, logistics, handling reactions, handover and what not to say.
category: people-management
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, engineering-manager, operations-manager, founder]
advice_risk: [legal]
requires: [none]
inputs: [notes, document]
output: [checklist, script, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [dismissal, termination-for-cause, hard-conversations, offboarding, process-check]
pairs_with:
  prompts: [write-termination-letter, write-performance-improvement-plan, plan-employee-offboarding]
  personas: [hr-business-partner]
args:
  - name: situation
    description: The person's role and tenure (initials only), the reason (performance or conduct), the process so far (conversations, warnings, improvement plan, hearing, dates), what HR or legal have approved, and the notice and pay terms if known.
    type: text
    required: true
  - name: country
    description: The country (and state or region) of employment, because dismissal rules differ widely.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Readiness check, Logistics, Script, Reactions, What not to say, After the meeting]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help managers prepare to dismiss someone for performance or conduct, which is different from a redundancy. The meeting should come at the end of a fair process: the person knew the expectations, was told clearly about the problem, had support and a reasonable chance to improve (for performance), or was heard through a proper disciplinary process (for conduct), and the decision has been reviewed. If any of that is missing, the right advice is often to pause. In the meeting itself, managers commonly fail by talking around the decision for ten minutes, re-arguing the evidence, apologising in ways that imply the decision is wrong, saying "this is hard for me", promising references they will not give, or improvising on pay and notice. A good meeting is short, gets to the decision in the first minute, gives the reason briefly, explains what happens next with the documents, treats the person with dignity (no public walk-out unless there is a security reason), and has HR present or available. Rules on notice, process, appeal and final pay differ a lot by country.

<situation>
{{situation}}
</situation>
Country: {{country}}
</context>

<task>
1. Readiness check: a table of what should be in place (documented expectations, prior conversations or warnings, support offered, the person's response heard, decision reviewed by HR or legal for {{country}}, letter and pay terms ready, protected characteristics, leave or recent complaints reviewed). Mark each as done, missing or unknown from the input, and say plainly if the meeting should wait.
2. Logistics: timing, a private room or video call, who attends, length (10 to 15 minutes), access and equipment handled with dignity, belongings, how they leave, and getting home safely if upset.
3. Script: opening that states the decision in the first minute, the reason in one or two sentences referring to the process already followed, what happens next (last day, notice or pay in lieu, final pay, benefits, return of property, any appeal right), the documents, and a respectful close.
4. Reactions: responses to shock, anger, pleading, arguing the evidence, threats of legal action, and requests for a reference or to resign instead. Say which questions to pass to HR.
5. What not to say: phrases to avoid with better alternatives.
6. After the meeting: handover and client cover, what to tell the team (brief, factual, no reasons), and records.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state what the law in {{country}} requires; list what HR or an employment lawyer must confirm.
- Use only facts given; never invent dates, pay or notice terms. Mark them [X].
- Do not re-argue the evidence in the meeting or improvise new reasons.
- If the readiness check shows a serious gap (no prior warning, a recent complaint, pregnancy, disability, leave), recommend pausing and getting advice.
- If the person may be in distress or at risk, stop, stay with them, involve HR and offer support routes.
</constraints>

<output_format>
## Readiness check
Table: Item | Status | Owner.
## Logistics
## Script
## Reactions
Table: If they… | You say….
## What not to say
## After the meeting
</output_format>
