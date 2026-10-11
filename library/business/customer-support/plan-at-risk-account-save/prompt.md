---
schema: 1
id: plan-at-risk-account-save
kind: prompt
title: Plan a save for an at-risk account
description: Plans a save for one at-risk B2B account - why it is at risk, who matters, the value gaps, a dated rescue plan, the opening conversation and the walk-away point.
category: customer-support
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [support-agent, manager, sales-rep, founder]
subject: [saas]
requires: [none]
inputs: [notes, text]
output: [plan, script, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [churn-prevention, account-rescue, renewals, stakeholder-mapping, account-management]
pairs_with:
  prompts: [design-customer-health-score, prepare-business-review, write-customer-success-plan]
  personas: [customer-success-manager]
args:
  - name: account_situation
    description: "What you know about the account: what they bought and why, contract value and renewal date, usage trend, open issues and escalations, what they have said (quotes help), and any competitor mentioned."
    type: text
    required: true
  - name: relationship_map
    description: "People involved on their side and yours: names or roles, influence, attitude, and who has changed recently. Optional."
    type: text
  - name: what_you_can_offer
    description: "What is within your power: training, services, a roadmap commitment you can actually make, pricing flexibility and its limits, executive involvement. Optional."
    type: text
output_contract:
  format: markdown
  sections: [Risk diagnosis, Stakeholders, Value gaps, Save plan, Opening conversation, Walk-away point]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help customer success managers rescue accounts. Accounts rarely leave for the reason they give first: "too expensive" usually means "not worth what we pay", which is a value problem, not a price problem; a lost champion means nobody inside is defending the renewal; unresolved product issues become the story the economic buyer hears. Saves fail when the team leads with a discount (which teaches the customer to threaten), talks only to the friendly user instead of the person who signs, or promises roadmap items it cannot deliver. A credible save starts by listening, restates the customer's original goal, shows a short dated plan with owners on both sides, and starts early enough before renewal to show progress. Some accounts should not be saved at any cost, and knowing the walk-away point protects margin and team time.
</context>

<task>
Plan the save for this account.

<account_situation>
{{account_situation}}
</account_situation>
{{#relationship_map}}
<relationship_map>
{{relationship_map}}
</relationship_map>
{{/relationship_map}}
{{#what_you_can_offer}}
<what_you_can_offer>
{{what_you_can_offer}}
</what_you_can_offer>
{{/what_you_can_offer}}

1. Diagnose the risk: the stated reason, the likely underlying causes (value not realised, lost champion, product gaps, poor support experience, budget cuts, a competitor, a business change on their side), the evidence for each, and how much time is left before renewal or notice. Say what you would need to find out.
2. Map stakeholders: who signs, who influences, who uses; their attitude and what each cares about; and gaps (no executive contact, champion gone). Name who on your side should talk to whom.
3. Identify the value gaps: what they bought it to achieve versus what they have achieved, with the specific blockers.
4. Write the save plan: 3-6 actions over a set number of weeks, each with an owner on each side, a date and a visible result (for example a reporting workflow live for the finance team by week 3). Use only offers listed as available; put pricing last and conditional.
5. Write the opening conversation: who requests it and with whom, the purpose stated honestly, open questions to hear their view first, how to acknowledge failures on your side, and how to propose the plan.
6. Set the walk-away point: the conditions under which you accept the loss, how to make it a clean exit with goodwill, and the warning signs that the save is not working.
</task>

<constraints>
- Do not promise roadmap items, discounts or services not listed as available; mark them [ONLY IF APPROVED].
- Do not invent facts about the customer's business or people.
- Do not recommend going around the customer's contacts in a way that would damage trust (for example contacting their CEO without telling the sponsor).
- Be honest if the evidence suggests the account cannot be saved.
</constraints>

<output_format>
## Risk diagnosis
Table: Cause | Evidence | Confidence. Then time left and what to find out.
## Stakeholders
Table: Person or role | Role in decision | Attitude | Cares about | Our contact.
## Value gaps
## Save plan
Table: Week | Action | Their owner | Our owner | Visible result.
## Opening conversation
## Walk-away point
</output_format>
