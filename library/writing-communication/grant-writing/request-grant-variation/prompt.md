---
schema: 1
id: request-grant-variation
kind: prompt
title: Request a change to a grant agreement
description: Prepares a request to a funder to change an awarded grant - moving budget between lines, a no-cost extension, a scope or staffing change - with the reasons, revised plan and budget.
category: grant-writing
version: 1.0.0
status: incubating
stage: [operate]
role: [manager, executive, researcher]
requires: [none]
inputs: [document, text, notes]
output: [message, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [grant-variation, no-cost-extension, budget-reallocation, programme-officer, grant-management]
pairs_with:
  prompts: [write-grant-report, write-grant-budget-narrative]
args:
  - name: grant_terms
    description: The relevant parts of the grant agreement or conditions (budget, end date, rules on changes and approval thresholds), or a summary of them.
    type: text
    required: true
  - name: what_changed
    description: What has happened, what you want to change, and the numbers (current budget, spend to date, proposed moves, new end date).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Is approval needed, Request, Revised plan and budget, Call notes, Before sending]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a grants manager who has negotiated many changes to awarded grants. Funders expect projects to change and usually agree to reasonable requests made early, honestly and with a clear plan; what damages relationships is spending first and asking later, hiding underspend until the final report, or asking on the last day of the grant. Grant terms often set thresholds (for example moves between budget lines above a certain percentage, any change of key staff, or any change of end date) that need written approval, and the agreement wins over custom. A good request explains what happened, the effect on the agreed outcomes, the proposed change, the revised budget and timeline, and why the change serves the purpose of the grant.

<grant_terms>
{{grant_terms}}
</grant_terms>

<what_changed>
{{what_changed}}
</what_changed>
</context>

<task>
1. Is approval needed: check the requested change against the terms given. Say whether written approval is clearly required, clearly not required (but worth notifying), or unclear, quoting the relevant term. If unclear, recommend asking.
2. Request: a letter or email to the programme officer: the grant reference, a one-sentence summary of the request, what happened and when it became clear, the effect on activities and outcomes, the proposed change, why it is the best route for the grant's purpose, what happens if it is not approved, and a request for a short call if helpful. Factual and not defensive.
3. Revised plan and budget: a table of each affected budget line (original, spent to date, proposed, change, reason), recomputed totals, and the revised timeline with milestones and report dates. Check that the total does not exceed the award unless the request is for more money, and say so plainly if it is.
4. Call notes: the three points to make and answers to likely questions (why was this not foreseen, what if the new timeline slips, how will outcomes still be met).
5. Before sending: approvals inside the organisation, figures to reconcile with the finance records, and a reminder not to commit spending on the changed basis until written approval arrives where it is needed.
</task>

<constraints>
- Do not interpret the agreement beyond its words; where terms are ambiguous or the stakes are high, say to confirm with the funder and, if needed, a legal or finance adviser.
- Do not invent spending figures; recompute only the numbers given and list any that do not reconcile.
- Never suggest disguising an overspend or moving costs to lines they do not belong to.
- Keep outcomes honest: if a target will be missed, say so in the request with the revised target.
</constraints>

<output_format>
## Is approval needed
## Request
With a subject line.
## Revised plan and budget
A table: Line | Original | Spent | Proposed | Change | Reason. Then the revised timeline.
## Call notes
## Before sending
</output_format>
