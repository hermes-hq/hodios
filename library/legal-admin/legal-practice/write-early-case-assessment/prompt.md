---
schema: 1
id: write-early-case-assessment
kind: prompt
title: Write an early case assessment
description: Writes an early case assessment of a new dispute, with claims and defences, evidence strengths, damages range, costs to trial, a simple decision tree and the strategy options for the attorney.
category: legal-practice
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [legal-professional]
subject: [law]
requires: [none]
inputs: [notes, document, text]
output: [report, table, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [early-case-assessment, litigation-strategy, case-evaluation, decision-tree, settlement-value]
pairs_with:
  prompts: [draft-legal-research-memo, build-damages-schedule, prepare-mediation-statement]
args:
  - name: matter_facts
    description: The dispute as known so far, the client's goals, the key documents and witnesses, and what the other side says.
    type: text
    required: true
  - name: numbers
    description: Amounts claimed, any figures for losses, the fee basis, and cost estimates you already have. Leave figures out rather than guess.
    type: text
  - name: jurisdiction
    description: The court or forum and jurisdiction, and whether costs usually follow the event there.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Summary, Issues and evidence, Value and cost, Decision tree, Options, Next steps and unknowns]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An early case assessment gives the client a basis for a decision before the money is spent. Its value comes from being explicit: which issues decide the case, what evidence exists on each, what is unknown, what the realistic range of outcomes is, what it will cost to find out, and when the cheap exits (early settlement, mediation, a strike-out or dismissal motion, a pre-action offer) are available. Clients and lawyers both tend to anchor on the best outcome and ignore costs, delay, enforcement risk and the chance of an adverse costs order. A simple decision tree, with probabilities clearly labelled as the lawyer's own judgement, turns that into a number the client can compare with a settlement offer.

Jurisdiction and forum: {{jurisdiction}}

Facts:
<matter_facts>
{{matter_facts}}
</matter_facts>
{{#numbers}}
<numbers>
{{numbers}}
</numbers>
{{/numbers}}
</context>

<task>
1. Summary: the dispute, the client's goals, and the two or three issues that decide it, in one paragraph.
2. Issues and evidence: for each claim and defence, the elements, the evidence for and against each, what is unknown, and how it could be found out cheaply.
3. Value and cost: a damages range (low, likely, high) built only from the figures given, with assumptions shown; the costs and time to each stage (pleadings, disclosure, experts, trial) as [ESTIMATE] placeholders unless supplied; costs-shifting risk; and whether a judgment could be collected.
4. Decision tree: the main branches (for example liability found or not, damages high or low) with probability placeholders the attorney fills in, and the formula for expected net value after costs, worked through only with numbers supplied.
5. Options: settle now, mediate, a dispositive motion, limited discovery then reassess, litigate to trial, each with pros, cons and a trigger for reconsidering.
6. Next steps and unknowns: the investigation to do in the next 30 days, and the facts that would most change the assessment.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never invent probabilities, damages or costs. Use placeholders and explain how to estimate them; work the arithmetic only with numbers the user supplied.
- Present the probability of success as the attorney's judgement to fill in, not a prediction from you.
- Give the weaknesses as much space as the strengths.
- Mark legal standards and costs rules to confirm under the jurisdiction. This is an internal document for attorney review.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
## Issues and evidence
Table: Issue | Elements | Evidence for | Evidence against | Unknown and how to find out.
## Value and cost
## Decision tree
An indented tree with branch labels, probability placeholders and the expected value formula.
## Options
Table: Option | Pros | Cons | Reconsider when.
## Next steps and unknowns
Numbered.
</output_format>
