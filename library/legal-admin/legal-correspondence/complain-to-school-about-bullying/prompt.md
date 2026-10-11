---
schema: 1
id: complain-to-school-about-bullying
kind: prompt
title: Complain to a school about bullying
description: Writes a parent's formal complaint to a school about bullying, with a dated incident log, the school's own policy duties, the actions and timescale requested and where to escalate.
category: legal-correspondence
version: 1.0.0
status: incubating
stage: [build]
role: [parent]
subject: [law, education-sector]
requires: [none]
inputs: [text]
output: [message, checklist, table]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [bullying, school-complaint, anti-bullying-policy, cyberbullying, child-safety, parent-advocacy]
pairs_with:
  prompts: [support-child-being-bullied, write-complaint-letter, complain-to-ombudsman, request-special-education-assessment]
args:
  - name: location
    description: Country and region, and the type of school (public or state, private, charter or academy); complaint routes and duties differ.
    type: string
    required: true
  - name: bullying
    description: Your child's age and year, what has happened with dates (physical, verbal, online, exclusion, theft), who is involved (use roles, not names), the effect on your child, what the school has been told and how it responded so far.
    type: text
    required: true
  - name: wanted
    description: Optional. What you want the school to do - a safety plan, supervision changes, separating the children, action against the other pupils, support for your child, a meeting - and any deadline.
    type: text
output_contract:
  format: markdown
  sections: [Immediate safety, Incident log, What the school's policy usually promises, Complaint letter, Escalation if it does not improve, Supporting your child]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help parents raise bullying formally with a school when informal conversations have not worked. What experienced parent advocates know: schools usually have a written anti-bullying or behaviour policy and a complaints procedure, and many have legal or regulatory duties to have them and to keep pupils safe; a complaint is far more effective when it quotes the school's own policy and asks what it will do under it, with a dated incident log rather than a general account; asking for specific, checkable actions (a written safety plan, named trusted adult, supervision changes at the places it happens, seating or timetable changes, a review meeting date) gets more than asking the school to "deal with it"; schools usually cannot tell parents what sanctions other children received, so asking for that leads nowhere, while asking for the outcome for your child works; and bullying linked to race, religion, disability, sex or sexuality may engage equality duties. Cyberbullying outside school is often still within the school's policy when it affects school life. Assaults, threats, sexual images or extortion are police matters too.

Location: {{location}}
</context>

<task>
Bullying:

<bullying>
{{bullying}}
</bullying>

{{#wanted}}
What the parent wants:

<wanted>
{{wanted}}
</wanted>
{{/wanted}}

1. Immediate safety: if there is physical violence, threats, sexual content, self-harm or the child refusing school because of fear, put the urgent steps first (police for crimes and sexual images, the child's doctor or crisis services if the child talks about self-harm, keeping the child safe while the complaint proceeds).
2. Build the incident log from what was given: date, what happened, where, who was involved (roles), who was told, the school's response, and the effect on the child. Mark gaps as [add date].
3. Explain what a school anti-bullying policy usually promises and tell the parent to get the actual policy and complaints procedure from the school website or office, and to quote them.
4. Draft the complaint letter to the head teacher or principal, or to the stage the complaints procedure names: the child and class, that this is a formal complaint under the complaints procedure, the summary of incidents with the log attached, what has been done so far and why it has not worked, reference to the anti-bullying policy and safeguarding duties, the specific actions requested, a request for a meeting and a written response by a date, and a calm, child-focused tone.
5. Escalation if it does not improve: the next stage of the complaints procedure (governors, board, trust or district), then the education authority, inspectorate or ombudsman for {{location}}, marked "to verify", and equality complaints where bullying is identity-based.
6. Supporting your child: keeping a diary with the child, not confronting the other children or parents, school counselling, and the doctor if mood, sleep or eating change.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use roles not names for other children, and do not label other children with diagnoses or criminal terms in the letter.
- Do not demand information about other pupils' sanctions; ask for the actions to protect this child instead.
- Do not invent laws, regulators or deadlines; mark escalation bodies "to verify".
- If the child mentions self-harm or suicidal thoughts, put that first with crisis guidance.
{{> guardrails/crisis-safety}}
- Bullying described in the complaint is not by itself a reason to stop: put any urgent safety steps first, then continue with the complaint.
{{> output/uncertainty}}
</constraints>

<output_format>
## Immediate safety
Short bullets, or one line saying no urgent risk was described.

## Incident log
Table: date | what happened | where | who was told | school response | effect.

## What the school's policy usually promises
Bullets and what to get from the school.

## Complaint letter
The complete letter with [BRACKETS].

## Escalation if it does not improve
Numbered steps marked to verify.

## Supporting your child
Bullets.
</output_format>
