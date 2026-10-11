---
schema: 1
id: triage-employee-concern
kind: prompt
title: Triage an employee concern
description: Triages a concern raised with HR, classifying it, rating urgency and risk, choosing the route (grievance, investigation, whistleblowing, safeguarding) and drafting the case log and first reply.
category: hr-operations
version: 1.0.0
status: incubating
stage: [operate]
role: [operations-manager, manager, founder]
requires: [none]
inputs: [notes, message, text]
output: [report, message, checklist, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [hr-casework, case-intake, grievance-route, case-log, interim-measures]
pairs_with:
  prompts: [conduct-workplace-investigation, write-workplace-grievance, plan-employee-offboarding]
  personas: [hr-business-partner]
args:
  - name: concern
    description: What was raised, by whom (role, not name), how (email, conversation, anonymous report), when, and who it is about, in as much detail as you have. Remove names and use roles or initials.
    type: text
    required: true
  - name: context
    description: Country or state, company size, relevant policies (grievance, whistleblowing, anti-harassment), and any history with the same people. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Immediate safety check, Classification, Urgency and risk, Recommended route, Interim measures, Case log entry, First reply to the person, Questions for an employment lawyer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help HR handle the first 48 hours of a concern, which is where most cases are won or lost. Experts first check for immediate danger, then classify: a day-to-day disagreement, a formal grievance, a conduct allegation against someone (harassment, discrimination, bullying, fraud), a protected disclosure about wrongdoing (whistleblowing, which often carries legal protection against retaliation), a safeguarding concern, a health or wellbeing issue, or a data or security incident. The classification decides the route, the policy, who may know, and the deadlines. Common errors: promising complete confidentiality (you can promise discretion, not secrecy, once a duty to act exists), letting the accused person's manager run the case, interviewing before deciding scope, losing the original wording, slow acknowledgement, and treating a whistleblowing report as a personal complaint. Interim measures (changing reporting lines, working from home, paid suspension) must be neutral and not punish the person who raised the concern.

<concern>
{{concern}}
</concern>
{{#context}}
<context_details>
{{context}}
</context_details>
{{/context}}
</context>

<task>
1. Immediate safety check: if anything suggests someone is in danger, a crime, a child or vulnerable adult at risk, or a person at risk of self-harm, say so first and state the immediate step (emergency services, safeguarding lead, police) before anything else.
2. Classification: name the most likely category or categories and why. If it could be a protected disclosure or harassment, say so explicitly because the route and protections change.
3. Urgency and risk: rate urgency (today, this week, routine) and list the risks: to people, of retaliation, of evidence being lost, legal, reputational.
4. Recommended route: which policy applies, whether informal resolution is appropriate (never for serious misconduct allegations or when the person does not want it), whether a formal investigation is needed, who should own the case (someone independent of the people involved) and when to involve an employment lawyer. If the location is unknown, ask for it and mark law-dependent points.
5. Interim measures: options that protect people and evidence without prejudging the outcome, with the trade-off of each.
6. Case log entry: a factual record with date received, channel, the concern in neutral words and quotes where available, classification, decisions taken and by whom, and next actions with dates. Facts only, no opinions about credibility.
7. First reply to the person: acknowledge, thank, explain what happens next and when, what confidentiality you can and cannot offer, support available, and protection from retaliation.
8. Questions for an employment lawyer.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Do not judge who is telling the truth or decide the outcome; that is for a proper process.
- Never promise absolute confidentiality.
- Do not recommend actions against the person who raised the concern, or anything that could look like retaliation.
- Keep names out; use roles.
{{> output/uncertainty}}
</constraints>

<output_format>
## Immediate safety check
One or two lines: "No immediate danger indicated" or the immediate step.
## Classification
## Urgency and risk
## Recommended route
## Interim measures
Table: Option | Protects | Risk or trade-off.
## Case log entry
## First reply to the person
## Questions for an employment lawyer
Numbered.
</output_format>
