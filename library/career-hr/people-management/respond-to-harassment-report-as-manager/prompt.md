---
schema: 1
id: respond-to-harassment-report-as-manager
kind: prompt
title: Respond to a harassment report as a line manager
description: Guides a line manager's first steps when someone reports harassment or bullying to them - what to say, what to record, how to escalate, protecting the person, and what not to do.
category: people-management
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, engineering-manager, operations-manager, founder]
advice_risk: [legal]
requires: [none]
inputs: [notes]
output: [checklist, script, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [harassment-report, bullying, first-response, escalation, anti-retaliation]
pairs_with:
  prompts: [respond-to-complaint-about-coworker, triage-employee-concern, conduct-workplace-investigation]
  personas: [hr-business-partner]
args:
  - name: report
    description: What the person told you in outline (who, what kind of behaviour, when, any witnesses or evidence), whether the alleged harasser is a colleague, a manager, a client or yourself, what the person wants, and what you have already said or done. Use initials.
    type: text
    required: true
  - name: country
    description: The country (and state or region) where it happened, because employer duties and reporting routes differ.
    type: string
    required: true
  - name: has_hr
    description: Whether your organisation has an HR team or a harassment policy and reporting route.
    type: enum
    enum: [hr-and-policy, policy-no-hr, neither, not-sure]
    default: not-sure
output_contract:
  format: markdown
  sections: [Immediate safety, What to say now, What to record, Escalating, Protecting the person, What not to do]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help line managers handle the moment someone reports harassment or bullying to them. In most organisations, once a manager is told, the employer is considered to know, so the manager's response matters both for the person and for the organisation's duties. The manager's job is not to investigate or decide what happened; it is to listen, take it seriously, make sure the person is safe, record what was said, pass it promptly to the right route (HR or the policy's named contact), and protect the person from retaliation. Common mistakes: promising to keep it secret, asking leading or doubting questions, confronting the accused, trying to resolve it informally because "they're both good people", moving the person who complained rather than the accused, telling the team, or doing nothing because the person asked them not to act. When the person asks for confidentiality, the manager must be honest that some action may be required, especially where there is risk to others. Duties, timelines and outside reporting routes differ by country and organisation.

<report>
{{report}}
</report>
Country: {{country}}
Organisation has: {{has_hr}}
</context>

<task>
1. Immediate safety: check whether anyone is at risk now (ongoing contact, threats, physical harm) and the immediate steps, including emergency services where there is danger, and interim measures to discuss with HR (changing shifts or reporting lines, working from home), making sure the person reporting is not disadvantaged by them.
2. What to say now: lines that thank them, show it is taken seriously, explain honestly what happens next and the limits of confidentiality, and ask what they need. Questions to ask that are open and non-leading.
3. What to record: a checklist for a factual note made the same day (date, who, what was said in their words, what they want, what you said), and where to keep it securely.
4. Escalating: who to tell and how quickly given {{has_hr}}; if the accused is the manager's own manager or HR, the alternative route; if there is no HR, options such as a senior leader, an external adviser or the relevant public body for {{country}}, to be confirmed.
5. Protecting the person: preventing retaliation, keeping them updated, support routes (assistance programme, union or representative if applicable), and checking in.
6. What not to do: a list of mistakes with why each harms the person or the process.
</task>

<constraints>
{{> guardrails/professional-limits}}
- The manager does not investigate, judge credibility or confront the accused; that belongs to the formal process.
- Never promise absolute confidentiality, and never advise the manager to ignore the report because the person asked.
- Do not state what the law in {{country}} requires; list what HR or an employment lawyer must confirm.
- If the manager is the person accused, say they must not handle it and give the alternative route.
</constraints>

<output_format>
## Immediate safety
## What to say now
## What to record
## Escalating
## Protecting the person
## What not to do
</output_format>
