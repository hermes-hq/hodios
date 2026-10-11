---
schema: 1
id: plan-brand-merger
kind: prompt
title: Plan the brands after a merger
description: Plans what happens to two brands after a merger or acquisition - comparing their equity, choosing a combined, retained, endorsed or new brand, and phasing the transition for customers and staff.
category: branding
version: 1.0.0
status: incubating
stage: [plan]
role: [executive, marketer, founder, consultant]
advice_risk: [legal]
requires: [none]
inputs: [text, document]
output: [plan, table, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [mergers-and-acquisitions, brand-transition, brand-equity, brand-migration, change-communication]
pairs_with:
  prompts: [design-brand-architecture, plan-rebrand, run-brand-audit, vet-brand-name]
  personas: [brand-strategist]
args:
  - name: companies
    description: The two (or more) organisations - what each sells, to whom, markets, size, brand strength, reputation, and what customers and staff feel about each.
    type: text
    required: true
  - name: deal
    description: The deal - who acquires whom or a merger of equals, the strategic reason, timing, whether it has closed or been announced, and what leadership has already said.
    type: text
    required: true
  - name: constraints
    description: Budget, regulatory or contractual limits, legal entity plans, deadlines. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Scope and limits, Situation, Equity comparison, Options, Recommendation, Transition plan, Communications, Workstreams, Risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
After a merger or acquisition, brand decisions are often made on ego ("we bought them, so their name goes") or politics ("a merger of equals needs a new name"), not on where the value sits. The acquired brand may carry the customer relationships the buyer paid for; a new name may throw away two sets of recognition at once. The usual options are: keep the acquirer's brand, keep the acquired brand, combine names, create a new brand, or keep both with an endorsement ("X, part of Y") as a bridge. Customers worry about service, prices and contacts more than logos; staff of the acquired company often feel the brand change as a loss of identity. Many practical tasks sit behind the brand decision: legal entity names, contracts and invoices, domains and email, trademarks, regulatory notices, signage. Communication before a deal closes may be restricted by law or by the deal terms.
</context>

<task>
Plan the brands after this deal.

<companies>
{{companies}}
</companies>

<deal>
{{deal}}
</deal>
{{#constraints}}

<limits>
{{constraints}}
</limits>
{{/constraints}}

1. **Scope and limits.** One or two sentences: a brand strategy plan, not legal, regulatory or financial advice.
2. **Situation.** The strategic logic of the deal and what the combined organisation must signal to customers, staff and investors.
3. **Equity comparison.** Compare the brands on awareness, reputation, customer loyalty and relationships, fit with the future strategy, geographic and segment strength, staff identity and trademark position, marking estimates and what evidence would confirm them (customer research, search volume, revenue by brand).
4. **Options.** Evaluate retain-acquirer, retain-acquired, combined name, new brand, and endorsed transition, each with benefits, risks, cost level and time.
5. **Recommendation.** The option and the end state, the reason, and the condition that would change the decision.
6. **Transition plan.** Phases from announcement to end state (for example day one, first 100 days, 12 to 24 months), what changes in each, and the endorsement period if used.
7. **Communications.** Messages and timing for customers (what changes and what does not, contacts, contracts), staff of each company, partners and suppliers, and the public; points that must wait until the deal closes or approvals are given, to be confirmed with counsel.
8. **Workstreams.** Checklist of practical tasks: legal entity and trading names, contracts and invoices, domains, email and redirects, search and app store listings, trademarks (filings, assignments), signage, vehicles, uniforms, packaging and stock, regulatory notices, and an owner for each.
9. **Risks.** Customer loss, staff attrition, search traffic loss from domain changes, regulatory or contractual obstacles, and mitigation for each.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state what disclosure, competition or trademark law requires; list items to confirm with legal counsel.
- Do not invent research results, revenue or awareness numbers; mark estimates and say how to measure.
- Treat the staff experience of the acquired company as part of the plan, not an afterthought.
{{> output/uncertainty}}
</constraints>

<output_format>
Markdown with the contract's sections in order. Equity comparison and options as tables. Transition plan as a phased table (Phase, Timing, Changes, Audiences). Workstreams as a checklist with owners.
</output_format>
