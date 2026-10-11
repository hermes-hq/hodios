---
schema: 1
id: design-probation-review-process
kind: prompt
title: Design a probation review process
description: Designs a company-wide probation process with checkpoints, criteria, manager templates, extension and non-confirmation routes and records, flagging what depends on local employment law.
category: hr-operations
version: 1.0.0
status: incubating
stage: [design]
role: [operations-manager, founder, manager]
requires: [none]
inputs: [text, document]
output: [plan, checklist, docs, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [probation-period, probation-review, new-starters, review-templates, confirmation-of-employment]
pairs_with:
  prompts: [plan-new-hire-onboarding, write-performance-improvement-plan, write-offer-letter]
  personas: [hr-business-partner]
args:
  - name: organisation
    description: Country or state of employment, headcount, the kinds of roles hired, what contracts say about probation today, and what goes wrong (for example "managers forget the deadline", "people are confirmed by default").
    type: text
    required: true
  - name: probation_terms
    description: Current or intended probation length, notice during probation, and whether extension is allowed. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Assumptions and legal points, Process overview, Checkpoints, Criteria, Templates, Extension and non-confirmation, Records and reminders, Questions for an employment lawyer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Probation exists so both sides can check the fit early, but in most organisations it fails quietly: managers miss the end date and the person is confirmed by default, concerns are raised for the first time in the final week, criteria are vague, and nothing is written down. Good processes set role-specific expectations in week one, hold structured check-ins (often around 30 days, the midpoint and two to three weeks before the end), give clear early warning with support when something is off, and record the outcome. Probation rules are legal territory that varies widely: some countries cap the length, restrict extensions, require the period to be in the contract, or give protections from day one (for example against discrimination or for pregnancy) whatever the probation status. So the process must say which points depend on the location.

<organisation>
{{organisation}}
</organisation>
{{#probation_terms}}
<probation_terms>
{{probation_terms}}
</probation_terms>
{{/probation_terms}}
</context>

<task>
1. Assumptions and legal points: name the location you are assuming (ask if missing and mark [LOCATION]), and list the probation points that commonly depend on local law (maximum length, extension, notice, contract wording, protections that apply from day one) as items to confirm.
2. Process overview: the end-to-end flow from offer letter to confirmation in five to eight steps, with owners.
3. Checkpoints: timing of each review relative to start date, what is discussed, who attends, and the output.
4. Criteria: how to set three to five role-specific expectations in the first week, plus common behaviours, written so they can be evidenced.
5. Templates: a short check-in form, a final review form with a recommendation (confirm, extend, do not confirm), and a confirmation letter outline.
6. Extension and non-confirmation: when extension is appropriate, how to communicate early concerns with support and a clear timeline, the steps before not confirming, and when HR and legal must be involved. No surprises in the final week.
7. Records and reminders: what to keep, where, for how long (to confirm), and automatic reminders so dates are never missed.
8. Questions for an employment lawyer.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never state statutory probation lengths, notice periods or protections as fact; mark them to confirm.
- Do not design a process that uses probation to dismiss for reasons connected to pregnancy, disability, raising a concern or other protected grounds; say that such protections usually apply during probation.
- Keep templates short enough that busy managers will use them.
{{> output/uncertainty}}
</constraints>

<output_format>
## Assumptions and legal points
## Process overview
Numbered steps with owners.
## Checkpoints
Table: When | Purpose | Who | Output.
## Criteria
## Templates
## Extension and non-confirmation
## Records and reminders
## Questions for an employment lawyer
Numbered.
</output_format>
