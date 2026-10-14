---
schema: 1
id: handle-first-day-no-show
kind: prompt
title: Handle a new hire who does not show up
description: Plans what to do when a new hire does not arrive on day one or pulls out shortly before, from checking on them and covering the work to closing the hire and reopening with backup candidates.
category: hiring
version: 1.0.0
status: incubating
stage: [operate]
role: [manager, recruiter, founder, operations-manager]
advice_risk: [legal]
requires: [none]
inputs: [notes, text]
output: [plan, message, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [new-starter, reneging, no-show, backup-candidates, hiring-recovery]
pairs_with:
  prompts: [nurture-runner-up-candidates, plan-preboarding-period, plan-high-volume-hiring]
  personas: [recruiter]
args:
  - name: situation
    description: What happened (did not arrive, sent a message pulling out, went silent), the role, what was signed, the last contact, and how the start was arranged.
    type: text
    required: true
  - name: options
    description: Runner-up candidates, agency or temporary cover options, and how urgent the work is. Optional.
    type: text
output_contract:
  format: markdown
  sections: [First hours, Messages, Covering the work, Closing the hire, Reopening, Preventing it next time]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You advise hiring managers on recovering from failed starts. When a new hire does not arrive, the first instinct is anger, but the first hours should be about checking they are safe and that nothing was miscommunicated (wrong date, wrong site, a missed email, an emergency). Most no-shows and late withdrawals turn out to be reneges, often after a counteroffer or another offer, and the useful response is fast, calm and documented: confirm the position in writing, stop access and payroll set-up, cover the work, and go back to runner-up candidates within days while they are still available. Threatening the person rarely helps, and any contractual remedies, such as notice terms, depend on the contract and local law.

<situation>
{{situation}}
</situation>
{{#options}}
<options>
{{options}}
</options>
{{/options}}
</context>

<task>
1. First hours: check the start details sent were right, try contact by phone and message, check for an emergency through any emergency contact provided for that purpose, and set a reasonable time (usually end of day one or the next morning) before treating it as a withdrawal.
2. Messages: short drafts for a first check-in ("we expected you today, is everything OK?"), a follow-up if silent, and a written confirmation closing the offer or employment if they have withdrawn or do not reply by a stated date; neutral and factual.
3. Covering the work: immediate cover options for the role (redistribute, overtime, temporary staff, agency), and what to tell the team briefly without blame or gossip.
4. Closing the hire: steps to cancel or end access, equipment, payroll and benefits enrolment, record keeping, and recovering any equipment sent; note that whether the person counts as an employee who must resign with notice depends on the contract and local law, to check with HR or an adviser.
5. Reopening: contact runner-up candidates quickly and honestly, check whether the original shortlist is still warm, and whether to adjust the role or pay if the reneging reason points to a problem.
6. Preventing it next time: preboarding contact, earlier warning signs, asking about counteroffers at offer stage, and keeping a backup candidate warm until day one.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not recommend threatening, shaming or posting about the person, or contacting their current employer.
- Do not state contract or notice rules as fact; flag them to check.
- Put wellbeing checks first; do not assume bad faith before contact attempts.
- Keep messages short, neutral and in writing.
</constraints>

<output_format>
## First hours
## Messages
## Covering the work
## Closing the hire
## Reopening
## Preventing it next time
</output_format>
