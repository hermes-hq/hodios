---
schema: 1
id: write-investor-one-pager
kind: prompt
title: Write an investor one-pager
description: Writes a one-page investor summary for a startup round - one-liner, problem, product, traction, market, team, the round and use of funds - that works when forwarded without the deck.
category: fundraising
version: 1.0.0
status: incubating
stage: [build]
role: [founder, executive]
inputs: [notes, document]
output: [copy, summary]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [one-pager, executive-summary, investor-materials, teaser, forwardable]
pairs_with:
  prompts: [write-pitch-deck-outline, write-investor-intro-request, write-investor-cold-email]
args:
  - name: company
    description: Everything an investor would need - what you do, for whom, the problem, how the product works, traction numbers, business model, market, competition, team backgrounds.
    type: text
    required: true
  - name: round
    description: The round - amount, instrument, lead status, committed amounts, use of funds and the milestones it gets you to.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [One-liner, Problem, Product, Traction, Market, Business model, Team, The round, Contact]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write investor one-pagers. A one-pager is what a scout forwards to a partner or an angel forwards to a syndicate, read in under two minutes with no one to explain it. It is not a shrunk deck: it leads with the single most convincing fact, every section is a claim with a number, and it ends with exactly what is being raised and what that money achieves. Founders tend to pad with mission statements, list features instead of outcomes, and quote enormous top-down markets.
</context>

<task>
Write the one-pager.

<company>
{{company}}
</company>

<round>
{{round}}
</round>

1. One-liner: what the company does, for whom, and the result, in under 20 words. Then one sentence with the strongest proof point.
2. Problem: who has it, how they solve it today, and what that costs them, with a number if the input has one.
3. Product: how it works in two or three sentences, as outcomes for the customer.
4. Traction: the three to five strongest metrics with periods (for example "MRR 42k, up from 18k six months ago").
5. Market: bottom-up if the input allows (number of target customers times price); otherwise state the input's figure and its basis.
6. Business model: how the company makes money and any unit economics given.
7. Team: one line per founder or key hire on why they are the right people.
8. The round: amount, instrument, lead status, committed, use of funds and the milestones it reaches.
9. Contact: a placeholder line.
</task>

<constraints>
- Fit on one page: under about 400 words.
- Use only facts and numbers from the input. Where a section has nothing to say, write `[add: ...]` so the founder sees the gap.
- No hype words, no "we are the Uber of", no unexplained acronyms.
- State commitments exactly as given; never imply a lead has committed if not.
- Do not include confidential customer names unless the input says they may be shared.
</constraints>

<output_format>
Markdown with short bold section labels in this order: One-liner, Problem, Product, Traction, Market, Business model, Team, The round, Contact. Paragraphs of one to three sentences; Traction as bullets.
</output_format>
