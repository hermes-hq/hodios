---
schema: 1
id: object-to-contract-change-at-work
kind: prompt
title: Object to a change to my work contract
description: Writes an employee's written objection to an imposed change in pay, hours, duties, shifts or work location, asking for consultation and recording that any work continues under protest.
category: legal-correspondence
version: 1.0.0
status: incubating
stage: [build]
role: [individual]
subject: [law]
requires: [none]
inputs: [text, document]
output: [message, checklist, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [contract-variation, working-under-protest, pay-cut, change-of-hours, employment-rights, consultation]
pairs_with:
  prompts: [write-workplace-grievance, claim-unpaid-wages, appeal-dismissal]
args:
  - name: location
    description: Country and state or region where you work; whether an employer can change terms, and what silence means, depends on local law and your contract.
    type: string
    required: true
  - name: change
    description: What the employer is changing (pay, hours, shift pattern, duties, location, remote work, bonus, commission, benefits), when it takes effect, how it was announced, whether it affects only you or a group, and any reason given.
    type: text
    required: true
  - name: contract
    description: Optional. What your contract, offer letter or handbook says on the point (quote any flexibility or variation clause), how long you have worked under the current terms, whether you are in a union, and what you want - keep the old terms, compensation, a phased change, or an agreed exit.
    type: text
output_contract:
  format: markdown
  sections: [What the change may mean, Choices and risks, Objection letter, Questions to ask the employer, What to do next]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help employees respond when an employer imposes a change to their terms: a pay cut, fewer or different hours, new shifts, a new location, a commission or bonus change, or a different role. What employment advisers know: in many systems an employer cannot change contractual terms without agreement unless the contract contains a clear and reasonable flexibility clause, but if the employee carries on working under the new terms without objecting, they may be treated as having accepted them after a while; so the key protective step is a prompt written objection that says the employee does not agree and is working "under protest" while the issue is resolved. Other possible routes include a grievance, a claim for unpaid wages if pay is cut, collective consultation duties when many staff are affected, and in some places a right to resign and claim the employer broke the contract, which is high-risk and needs advice first. Employers sometimes respond by ending the contract and offering new terms ("fire and rehire"), which has its own rules in some countries. You draft; you do not decide the legal position.

Location: {{location}}
</context>

<task>
Change:

<change>
{{change}}
</change>

{{#contract}}
Contract and goals:

<contract>
{{contract}}
</contract>
{{/contract}}

1. What the change may mean: whether it looks like a change to contractual terms or something the employer can usually decide (for example rotas within an existing flexible clause), what to check in the contract, and that local law decides; mark conclusions "to verify".
2. Choices and risks: accept, accept with conditions (phasing, compensation, trial period), object and work under protest, raise a formal grievance, or seek an agreed exit; with the main risk of each. Say that resigning over it is a serious step that needs advice before acting.
3. Draft the objection letter or email: to the manager and HR, the employee's details as [BRACKETS], the change and date as understood, a clear statement that the employee does not agree to it, a request for the contractual basis the employer relies on, a request for consultation and a meeting, a statement that any work under the new terms is under protest and without accepting the change, a reservation of rights, and a cooperative tone.
4. Questions to ask the employer: the reason and business case, whether it is temporary, how many are affected, consultation plans, the effect on pay, pension and benefits, alternatives considered.
5. What to do next: keep payslips and rotas, diary dates, talk to a union or employee representative if any, consider a grievance if no response, the time limits for any claims (to verify), and free advice sources.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not tell the person the change is unlawful or lawful; set out what decides it and what to verify.
- Do not invent laws, consultation thresholds or time limits; mark them "to verify".
- Do not advise resigning or refusing to work; explain risks and recommend advice before any such step.
- Keep the letter professional and short enough to be read in full.
{{> output/uncertainty}}
</constraints>

<output_format>
## What the change may mean
Three to five bullets.

## Choices and risks
Table: option | what it means | main risk.

## Objection letter
The complete letter with [BRACKETS].

## Questions to ask the employer
Numbered list.

## What to do next
Bullets.
</output_format>
