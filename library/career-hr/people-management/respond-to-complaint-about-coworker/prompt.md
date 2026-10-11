---
schema: 1
id: respond-to-complaint-about-coworker
kind: prompt
title: Respond when a report complains about a colleague
description: Plans a manager's response when a report complains about a colleague - listening well, separating facts from feelings, deciding whether to coach, mediate or escalate, and staying fair to both.
category: people-management
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, engineering-manager, operations-manager, founder]
advice_risk: [legal]
requires: [none]
inputs: [notes]
output: [plan, script, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [coworker-complaint, team-conflict, triage, fairness, escalation]
pairs_with:
  prompts: [respond-to-harassment-report-as-manager, mediate-disagreement, triage-employee-concern]
  personas: [workplace-mediator, hr-business-partner]
args:
  - name: complaint
    description: What the person told you (specific incidents, dates, who was present), what they want to happen, whether both people report to you, and anything you have seen yourself. Use initials.
    type: text
    required: true
  - name: country
    description: The country where the team works, in case the complaint touches discrimination, harassment or safety. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Triage, Listening to the complaint, Options, Talking to the other person, Records, Follow-up]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help line managers respond when someone on their team complains about a colleague. Most complaints are about everyday friction: workload not shared, tone in messages, missed handovers, credit-taking, clashing styles. Some are about conduct that the organisation must handle formally: harassment, discrimination, bullying, safety, fraud. The manager's first job is to tell the two apart, because formal matters must go to HR and should not be handled informally. Common mistakes are promising confidentiality that cannot be kept, taking sides after hearing one version, confronting the other person with "people have been saying", coaching the complainant to "just get along" when the issue is serious, or doing nothing. A good response listens fully, gets specifics, asks what outcome the person wants, explains what the manager can and cannot do, and then chooses between coaching the complainant to raise it directly, a facilitated conversation, the manager addressing the colleague's behaviour, or escalation.

<complaint>
{{complaint}}
</complaint>
{{#country}}Country: {{country}}{{/country}}
</context>

<task>
1. Triage: classify the complaint as everyday friction, performance or conduct for the manager to address, or a matter that must go to HR (harassment, discrimination, bullying, safety, whistleblowing). Explain the reasoning and any uncertainty.
2. Listening to the complaint: how to receive it, questions that get specific facts, what to say about confidentiality (what you can and cannot promise), and what outcome they want.
3. Options: the realistic routes for this complaint (coach them to raise it directly, a facilitated conversation, manager addresses the colleague, escalate to HR), with when each fits and the recommended one.
4. Talking to the other person: if the manager will speak to them, how to raise it with specific behaviour, hear their side without presuming guilt, and avoid revealing more than needed.
5. Records: what to note, when, and where, kept factual.
6. Follow-up: checking back with both people, watching for retaliation, and what to do if it continues.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not promise the complainant full confidentiality; explain the limits.
- Do not judge the colleague on one side's account; plan to hear both.
- Anything that may be harassment, discrimination, bullying, safety or wrongdoing goes to HR or the proper channel, not informal resolution. Do not state legal duties as fact.
- Use only the facts given; mark gaps [X].
</constraints>

<output_format>
## Triage
## Listening to the complaint
## Options
Table: Route | When it fits | Recommended?
## Talking to the other person
## Records
## Follow-up
</output_format>
