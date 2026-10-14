---
schema: 1
id: check-ranking-claim
kind: prompt
title: Check a "biggest", "first" or "only" claim
description: Checks a superlative claim such as biggest, first, only, record-breaking or number one by pinning down the measure, the comparison set and the period, then testing it against evidence.
category: fact-checking
version: 1.0.0
status: incubating
stage: [verify]
role: [writer, editor, marketer, individual]
requires: [web]
inputs: [text, url]
output: [report]
risk: network
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [superlatives, advertising-claims, records, comparison-set]
pairs_with:
  prompts: [fact-check-claims, trace-statistic-to-source, check-press-release-claims]
  personas: [fact-checker]
args:
  - name: claim
    description: The claim in its exact words, with who made it, for example "the world's largest solar farm" or "the first company to offer same-day delivery in the country".
    type: text
    required: true
  - name: context
    description: Optional. Where it appeared (advert, speech, press release, article) and when.
    type: string
output_contract:
  format: markdown
  sections: [Verdict, Defining the claim, Evidence, Contenders, Accurate wording]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Superlatives are easy to make true by quietly narrowing the terms. "Largest" can mean capacity, area, output, revenue or headcount, and the claimant usually picks the measure where they win. The comparison set gets narrowed by geography ("in Europe"), category ("independent", "family-owned", "in its class"), date ("since records began" when records started recently) or an unstated qualifier ("first to offer it at this price"). "First" claims fail when an earlier example existed but was obscure, and "only" claims fail when a competitor launched later. Records can be beaten, and figures can be self-reported. Advertising regulators in many countries expect objective superlatives to be substantiated and the basis stated; puffery ("the best coffee in town") is a matter of opinion and cannot be fact-checked.
</context>

<task>
Check this claim.
<claim>
{{claim}}
</claim>
{{#context}}Context: {{context}}{{/context}}

1. Decide whether the claim is checkable (an objective superlative) or puffery (an opinion). If puffery, say so and stop after explaining why.
2. Define the claim: the measure, the comparison set (place, category, qualifiers), the period and the data source the claimant relies on. Where the claim is ambiguous, list the readings and check the one a typical audience would take.
3. Find the evidence for the claimant's position and their own stated basis, if any.
4. Search for contenders that beat it on the same measure, on a more natural measure, or earlier in time, and check whether any figures are independently verified or self-reported.
5. Give a verdict and the accurate wording the evidence allows.
</task>

<constraints>
- Cite only sources you opened in this session, with links and dates. Never name a contender, figure or date from memory.
- If you have no web access, say so, give no verdict, and list how to verify it (registers, industry bodies, regulators, record keepers).
- "No earlier example found" supports a "first" claim only as far as you searched; say how far.
- Treat self-reported figures as claims, not facts.
- Do not decide whether the claim breaks advertising rules in a given country; you may say it would need substantiation.
</constraints>

<output_format>
## Verdict
One of: accurate, accurate only with qualifiers, misleading, false, unverifiable, or opinion (not checkable). Then two sentences.
## Defining the claim
Measure, comparison set, period and the claimant's basis.
## Evidence
Bullets with links.
## Contenders
Table: contender | measure | value or date | source | verified or self-reported.
## Accurate wording
The claim rewritten with the qualifiers it needs, or "drop the claim".
</output_format>
