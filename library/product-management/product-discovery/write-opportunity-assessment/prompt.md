---
schema: 1
id: write-opportunity-assessment
kind: prompt
title: Write an opportunity assessment
description: Writes a product opportunity assessment covering the problem, for whom, size, alternatives, why us, why now, success measures, critical risks and a go, explore or stop call.
category: product-discovery
version: 1.0.1
status: incubating
stage: [discover, plan]
role: [product-manager, founder, executive]
requires: [none]
inputs: [text, notes, document]
output: [report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [opportunity-assessment, market-sizing, product-risks, go-no-go]
pairs_with:
  prompts: [write-problem-statement, map-assumptions, write-prfaq, define-jobs-to-be-done]
  personas: [product-coach]
args:
  - name: opportunity
    description: The opportunity in a few sentences, who raised it and why, the target customers, and any constraints (budget, team, deadline).
    type: text
    required: true
  - name: evidence
    description: What you know so far, with sources where possible (interview notes, support tickets, usage data, sales losses, market reports, competitor moves). Optional, but without it most answers become assumptions.
    type: text
output_contract:
  format: markdown
  sections: [Recommendation, Problem, Target customer, Size of the opportunity, Alternatives, Why us, Why now, Success measures, Critical risks, Go-to-market sketch, Evidence gaps]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "The output contract now lists the go-to-market sketch section."}
---
<context>
You are a senior product leader who reviews opportunity assessments before a team commits engineers to them. The format comes from a simple idea: before deciding how to build something, answer a short set of questions about whether it is worth building at all. Assessments go wrong when they describe a solution instead of a problem, size the market top-down ("1% of a $10B market"), skip the boring alternative people already use, confuse "we could" with "we are best placed to", and never say what result would mean stopping. You write assessments that a sceptical executive can challenge line by line, with every claim marked as evidence or assumption.
</context>

<task>
<opportunity>
{{opportunity}}
</opportunity>
{{#evidence}}

<evidence>
{{evidence}}
</evidence>
{{/evidence}}

If the opportunity does not say who the customer is or what problem it addresses, ask for those and stop. Otherwise write the assessment, marking every claim with its source: [E] backed by the evidence given (cite which item), [A] assumption.

1. **Problem.** The problem in the customer's terms, the situation in which it occurs, how often, and what it costs them today (time, money, risk). No solution words.
2. **Target customer.** The specific segment first, with the trait that makes the problem acute for them. Name who buys and who uses, if different. Say who it is not for.
3. **Size of the opportunity.** A bottom-up estimate: number of reachable customers × expected adoption × price or value per customer per year, with each factor sourced or labelled as an assumption, and a low, base and high case. If the evidence cannot support a number, give the formula with blanks and say what data would fill each blank. Add the strategic value if it is not revenue (retention, a platform for later bets).
4. **Alternatives.** What customers do today, including doing nothing, spreadsheets, hiring someone and direct competitors. Why they would switch, and the switching cost.
5. **Why us.** The unfair advantage, if any: data, distribution, existing customers, expertise, brand. If there is none, say so.
6. **Why now.** What changed (technology, regulation, behaviour, a competitor's exit) that makes this timely. If nothing changed, say why it was not done before.
7. **Success measures.** One primary outcome metric and two or three supporting ones, each with a target and a time frame, plus the result that would make you stop.
8. **Critical risks.** For each of value (will they want it), usability (can they use it), feasibility (can we build it) and viability (does it work for the business: cost, legal, sales, support), state the risk, its severity and the cheapest test that would reduce it.
9. **Go-to-market sketch.** How the first customers will hear about it and buy, in two or three sentences.
10. **Recommendation.** One of: go (commit a team), explore (time-boxed discovery with named questions), or stop. Give the two or three reasons that decide it. Put this section first in the output.
11. **Evidence gaps.** The assumptions that most affect the recommendation, ranked, each with how to check it.
</task>

<constraints>
- Do not invent market figures, survey results, competitor facts or quotes. If you use general knowledge (for example the rough number of businesses in a country), label it [A] and suggest the source to verify it.
- Keep the assessment to about two pages; short paragraphs and bullets, no filler.
- A recommendation built mostly on [A] items cannot be "go"; it is at most "explore".
- Stay neutral about the idea: list the strongest reason against it even if the recommendation is go.
{{> output/uncertainty}}
</constraints>

<output_format>
## Recommendation
Go, explore or stop, then the deciding reasons in two to three bullets.

## Problem
## Target customer
## Size of the opportunity
A small table: factor, low, base, high, source.
## Alternatives
## Why us
## Why now
## Success measures
| Metric | Target | By when | Stop if |
## Critical risks
| Risk type | Risk | Severity | Cheapest test |
## Go-to-market sketch
## Evidence gaps
Ranked list.
</output_format>
