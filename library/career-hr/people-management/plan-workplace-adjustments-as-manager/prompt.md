---
schema: 1
id: plan-workplace-adjustments-as-manager
kind: prompt
title: Respond to an adjustment request as a manager
description: Helps a manager respond to an employee's request for workplace adjustments with a supportive conversation, options to weigh, careful records and review points.
category: people-management
version: 1.0.0
status: incubating
stage: [plan]
role: [manager]
advice_risk: [legal]
requires: [none]
inputs: [text, message]
output: [plan, table, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [reasonable-adjustments, accommodation-request, disability-at-work, inclusive-management, confidentiality]
pairs_with:
  prompts: [request-workplace-accommodation, plan-one-on-one, plan-return-from-leave]
  personas: [hr-business-partner]
args:
  - name: request
    description: What the employee asked for and how (email, in a one-to-one, through HR), in their words if possible, plus anything they shared about why. Remove details they would not want repeated.
    type: text
    required: true
  - name: role
    description: The employee's role, its core duties, and how the team works (location, hours, equipment, customer contact).
    type: string
    required: true
  - name: country
    description: The country (and state or region) where the employee works, because duties around adjustments and accommodation differ by jurisdiction.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [First reply, The conversation, Options, Records and confidentiality, Decision and review, Who to involve]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help line managers respond well to an employee's request for workplace adjustments (reasonable adjustments in the UK, reasonable accommodation in the US, Canada and elsewhere) for a disability, health condition or similar need. Managers often get it wrong in ways that hurt the employee and expose the employer: sitting on the request, asking for a diagnosis they do not need, deciding alone that something "isn't possible", discussing the employee's health with the team, or agreeing something and never checking it works. Good practice is a prompt, private and supportive conversation focused on what the work requires and what gets in the way, looking at options together, involving HR or occupational health where the organisation has them, keeping careful and confidential records, and agreeing a review date. The legal duties, any funding schemes and the process to follow depend on the country and the employer's own policy.

<request>
{{request}}
</request>
Role: {{role}}
Country: {{country}}
</context>

<task>
1. First reply: a short, warm message acknowledging the request, thanking the employee for raising it, proposing a private conversation soon, saying who else may need to be involved (HR, occupational health) and that information will be kept confidential.
2. The conversation: a plan for the meeting. Open questions about which parts of the work are harder and when, what has helped before, what they are asking for and what else might work; what not to ask (diagnosis details or medical history the decision does not need); how to respond if they become upset; and how to close with agreed next steps.
3. Options: for each adjustment requested, and two or three alternatives, assess what it addresses, the effect on the role's core duties and the team, likely cost or effort, and practical feasibility. Mention, as something to check, any public support or funding scheme that commonly exists for adjustments in {{country}}.
4. Records and confidentiality: what to record (request date, conversation, options considered, decision and reasons, review date), where it should be kept, who may see it, and how to explain changes to the team without disclosing health information.
5. Decision and review: how to communicate the decision in writing; if something is not possible, how to explain the reason and offer alternatives; a trial period and review date; and what to do if the need changes.
6. Who to involve: HR, occupational health, the employee's own doctor through the employee, and when to take HR or legal advice (for example a refusal, a dispute, a request linked to absence or performance concerns, or a complaint).
</task>

<constraints>
{{> guardrails/professional-limits}}
- Name the main legal framework that usually governs adjustments in {{country}} and the official body to check with, labelled as something to verify. Do not tell the manager whether the employer is legally required to agree, and do not predict the outcome of a dispute.
- Never advise asking for more medical information than the decision needs, and never suggest disclosing health information to colleagues.
- Do not treat cost alone as a reason to refuse; set out what would need to be weighed and who in the organisation decides.
- If the request text contains sensitive detail, keep it out of the drafted messages and say that you did.
- Keep the tone supportive and practical. The employee is asking for help to do their job well.
- Before answering, check that every drafted message is free of health details and that every legal point is marked as something to verify.
</constraints>

<output_format>
Markdown with these headings:
## First reply
The message in a quote block.
## The conversation
## Options
Table: Option | What it addresses | Effect on role and team | Cost or effort | Feasibility.
## Records and confidentiality
## Decision and review
Including a short decision letter template with [placeholders].
## Who to involve
</output_format>
