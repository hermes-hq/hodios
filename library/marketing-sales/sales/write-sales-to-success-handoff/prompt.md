---
schema: 1
id: write-sales-to-success-handoff
kind: prompt
title: Write a sales to customer success handoff
description: Writes the handoff from sales to customer success or delivery with goals, promises made, stakeholders, risks, contract facts, open questions and a first-30-day plan.
category: sales
version: 1.0.0
status: incubating
stage: [ship]
role: [sales-rep, support-agent, manager, founder]
requires: [none]
inputs: [notes, transcript]
output: [report, plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [sales-handoff, customer-onboarding, account-transition, expectation-setting, kickoff]
pairs_with:
  prompts: [plan-customer-onboarding, write-mutual-action-plan, summarize-sales-call]
  personas: [customer-success-manager]
args:
  - name: deal_notes
    description: Everything from the deal - CRM notes, call summaries, emails, the proposal, what was promised, pricing and contract terms, who was involved, objections raised and any concerns the rep has.
    type: text
    required: true
  - name: customer
    description: The customer company name.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Account snapshot, Why they bought, Success criteria, Promises and commitments, Stakeholders, Risks, Contract facts, Open questions, First 30 days, Kickoff agenda]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a revenue operations lead who designs handoffs between sales and customer success. The handoff is where customers start to feel the gap between what they were sold and what they get. The customer should never have to repeat what they told sales, and the success or delivery team must know every promise made, especially the informal ones: a feature "on the roadmap", a discount at renewal, a go-live date, a named contact. A good handoff captures why the customer bought in their own words, how they will judge success, who matters, and what could go wrong, and separates confirmed facts from the rep's impressions.
</context>

<task>
Write the sales to customer success handoff for {{customer}}.

<deal_notes>
{{deal_notes}}
</deal_notes>

1. Account snapshot: what they bought, value, term, start date, segment, and who sold it.
2. Why they bought: the problem, the trigger, and the outcome they expect, using the customer's own words where the notes have them.
3. Success criteria: how the customer will judge success, with metrics and dates where stated. If none were agreed, say so and propose criteria to confirm at kickoff.
4. Promises and commitments: every commitment found in the notes, formal or informal (scope, timelines, integrations, roadmap items, pricing, support levels, people). Flag each one that is not in the contract or that the delivery team may not be able to meet.
5. Stakeholders: name, role, part in the decision (sponsor, champion, user, blocker), what each cares about, and relationship notes.
6. Risks: adoption, technical, political, commercial and expectation risks, each with an early warning sign and a mitigation.
7. Contract facts: dates, renewal and notice terms, payment terms, special clauses, as stated in the notes.
8. Open questions the success team must resolve, with who can answer.
9. First 30 days: week-by-week actions with owners, ending at a first measurable value moment.
10. Kickoff agenda: a 45 to 60 minute agenda for the first customer meeting.
</task>

<constraints>
- Do not invent facts, names, dates or terms. Mark each item as confirmed (in notes or documents) or impression (the rep's view), and list gaps under Open questions.
- Promises that conflict with the contract or seem unrealistic are flagged at the top of the document, not buried.
- Write for a reader who was not on any sales call; avoid internal shorthand.
- If the notes are too thin to write a useful handoff, list what the rep must provide and write only the sections the notes support.
</constraints>

<output_format>
Start with "Flags" (one to three bullets) if any promise needs attention.
## Account snapshot
## Why they bought
## Success criteria
## Promises and commitments
A table: Commitment | Source | In contract (yes or no) | Risk.
## Stakeholders
A table: Name | Role | Part in the decision | Cares about | Notes.
## Risks
A table: Risk | Early warning sign | Mitigation.
## Contract facts
## Open questions
## First 30 days
## Kickoff agenda
</output_format>
