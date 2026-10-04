---
schema: 1
id: turn-sales-notes-into-product-insights
kind: prompt
title: Turn sales notes into product insights
description: Turns sales call notes and lost-deal reasons into product insights, separating real product gaps from objections, counting frequency and deal value, and flagging what needs discovery.
category: user-feedback
version: 1.0.0
status: incubating
stage: [discover]
role: [product-manager, founder, sales-rep, business-analyst]
inputs: [notes, dataset]
output: [report, table, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [win-loss, lost-deals, sales-feedback, product-gaps, objections]
pairs_with:
  prompts: [triage-feature-requests, write-competitive-battlecard, write-customer-interview-guide, analyze-user-feedback]
args:
  - name: notes
    description: Sales call notes, lost-deal reasons and win notes for the period, pasted from the CRM or a spreadsheet. Include the deal name or id, stage, and the rep's words where possible.
    type: text
    required: true
  - name: deal_values
    description: Optional. Deal value and segment per deal (for example "Acme, 24k ARR, mid-market"), so themes can be weighted by revenue.
    type: text
  - name: period
    description: The period the notes cover (for example "Q3 2026", "the last 60 days").
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Data check, Summary, Insights, Gaps versus objections, Needs discovery, Back to sales, Caveats]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a product manager who reads sales notes for signal. Sales notes are valuable and biased. Reps hear real needs that never reach support, but they also record the easiest explanation for a loss ("price", "missing feature X"), write notes from memory, and give more weight to the loudest prospect. A feature named in a lost deal may be a real gap, a positioning problem (the product does it, the buyer did not know), a pricing or packaging issue, a fit problem (the wrong customer), or a polite excuse. The job is to sort these apart, weigh them by how often they appear and how much revenue is involved, and say honestly where the evidence is thin.
</context>

<task>
Turn the sales notes for {{period}} into product insights.

<notes>
{{notes}}
</notes>
{{#deal_values}}
<deal_values>
{{deal_values}}
</deal_values>
{{/deal_values}}

1. Data check: number of deals or calls, wins versus losses, how many notes have a specific reason versus a vague one, and whether deal values were provided. If there are fewer than five notes with any reason at all, say the sample is too small for themes, list what is there, and stop.
2. Theme the notes. For each theme, classify it as one of:
   - product gap: the product cannot do something the buyer needed, and the need is specific;
   - positioning or awareness: the product can do it, or something close, and the buyer did not know or understand;
   - pricing or packaging: price, plan limits or contract terms;
   - competitor strength: a named competitor won on a specific capability or relationship;
   - fit: the prospect was outside the target customer;
   - process: the sales process, trial, security review or procurement.
3. Count each theme: deals mentioning it, wins versus losses, and total deal value at stake (only if values were given; otherwise write "no values").
4. Quote evidence: one or two short quotes or paraphrases from the notes per theme, with the deal reference.
5. Gaps versus objections: for the top product-gap themes, say what evidence supports it being a real gap, and what would make it an objection instead.
6. Needs discovery: the open questions for the top themes, what you would ask buyers or lost prospects, and who to talk to.
7. Back to sales: positioning points or materials that could address the awareness and objection themes without product changes.
8. Before replying, recount every theme against the notes and check that every quote appears in the notes.
</task>

<constraints>
- Use only the notes and values given. Do not invent deal values, competitors or quotes.
- Do not recommend building a feature from sales notes alone; recommend discovery or an experiment instead, and say what evidence would justify building.
- Treat "price" as a reason to investigate value and packaging, not as a finding in itself.
- Remove names of individual buyers; keep company or deal references only as given.
</constraints>

<output_format>
## Data check
## Summary
Three to five bullets: the strongest signals and the confidence in each.
## Insights
A table: Theme | Type | Deals (won / lost) | Value at stake | Evidence | Confidence (high / medium / low).
## Gaps versus objections
## Needs discovery
A table: Question | Ask whom | Why it matters.
## Back to sales
## Caveats
Bullets on bias and what the notes cannot show.
</output_format>
