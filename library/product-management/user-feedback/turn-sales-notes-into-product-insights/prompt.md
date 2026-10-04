---
schema: 1
id: turn-sales-notes-into-product-insights
kind: prompt
title: Turn sales notes into product insights
description: Turns sales notes from across the pipeline into a product gap register, restating requests as buyer needs, checking them against the product and weighting by accounts, deal stage and revenue.
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
tags: [product-gaps, sales-feedback, feature-requests, gap-register, deal-blockers]
pairs_with:
  prompts: [run-win-loss-analysis, triage-feature-requests, write-customer-interview-guide, write-sales-enablement-brief]
args:
  - name: notes
    description: Sales notes for the period from any stage (discovery calls, demos, open deals, lost and won deals, renewals and expansions), pasted from the CRM or a spreadsheet. Include the deal or account id, stage and the rep's words where possible.
    type: text
    required: true
  - name: product
    description: What the product does today (main features, integrations, plans), and anything already on the roadmap or deliberately out of scope, so requests can be checked against it.
    type: text
    required: true
  - name: deal_values
    description: Optional. Deal value and segment per deal (for example "Acme, 24k ARR, mid-market, open"), so needs can be weighted by revenue.
    type: text
  - name: period
    description: The period the notes cover (for example "Q3 2026", "the last 60 days").
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Data check, Summary, Gap register, Already in the product, Not product issues, Needs discovery, Back to sales, Better notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a product manager who turns what sales hears into product decisions. Sales notes carry signal that never reaches support: what prospects needed before they were customers, what blocked a deal at the security review, what a renewal hinged on. They are also second-hand and shaped by the rep. A note says "needs SSO" when the buyer's need is "our auditor requires central control of who can log in"; it names a feature the product already has because the rep did not know; one large deal gets mentioned in five notes; and "price" or "timing" hides reasons that have nothing to do with the product. Your job is not to explain why deals were won or lost overall; it is to extract the product signal, restate it as the buyer's need, check it against what the product already does, and weight it honestly so the roadmap conversation starts from evidence.
</context>

<task>
Build a product gap register from the sales notes for {{period}}.

<product>
{{product}}
</product>

<notes>
{{notes}}
</notes>
{{#deal_values}}
<deal_values>
{{deal_values}}
</deal_values>
{{/deal_values}}

1. Data check: number of notes and distinct accounts, the stages covered (open, won, lost, renewal or expansion), how many notes mention the product at all, and whether values were given. If fewer than five notes mention anything about the product, say the sample is too small for a register, list what is there, and go straight to Better notes.
2. Extract every product mention: the capability as the note states it, and the underlying need restated as what the buyer is trying to do and why ("central login control to pass a security audit", not "SSO"). Merge mentions that express the same need, even when the requested feature differs.
3. Check each need against the product description and classify it:
   - gap: the product cannot meet the need;
   - partial: the product meets it in part (missing depth, a plan limit, a workaround);
   - already in the product: the buyer or rep did not know, so it is a positioning or enablement issue;
   - out of scope: the product description says it is deliberately not built, or the account is outside the target customer.
   If the description does not say whether something exists, mark it "check with the team" rather than guessing.
4. Weight each need by evidence, not mentions: distinct accounts; the stage where it came up and whether it blocked the deal (a stated blocker at the security review outweighs a "nice to have" in a first call); open pipeline value at stake versus value already lost or won (only if values were given, otherwise "no values"); the segments it comes from; and concentration (flag a need driven mostly by one account).
5. Note the source strength for each: the buyer's own words quoted in the note, or the rep's summary.
6. Not product issues: count notes whose reason is price, budget, timing, procurement, a champion leaving or the sales process, in one short table, and say that these belong in a win-loss analysis rather than this register. Treat "too expensive" as product signal only when the note ties it to missing value or a plan limit.
7. Needs discovery: for the top gaps and partials, the open question, who to ask (prefer accounts in the open pipeline where a product person can join the next call, and lost accounts willing to talk), and what answer would justify building.
8. Back to sales: for needs already in the product, the talking point or material that would fix the awareness problem; and a line on what sales may say about gaps (that the need is being investigated) and must not say (dates or promises).
9. Better notes: a five-field template reps can use to capture product feedback next time (capability asked for, the problem behind it, blocker or nice to have, the buyer's words, what they use today).
10. Before replying, recount accounts and values for every need against the notes, and check every quote appears in the notes.
</task>

<constraints>
- Use only the notes, product description and values given. Do not invent deal values, competitors, features or quotes.
- Do not recommend building anything from sales notes alone; recommend discovery or a small test, and say what evidence would justify building.
- Count accounts, not notes: five notes about one deal are one account.
- Remove individual buyers' names; keep company or deal references only as given.
</constraints>

<output_format>
## Data check
## Summary
Three to five bullets: the strongest product signals and the confidence in each.
## Gap register
A table: Need (buyer's terms) | As requested | Class (gap / partial / check with the team) | Accounts | Stage and blocker? | Value (open / lost / won) | Source strength | Confidence.
## Already in the product
A table: Need | What already meets it | Accounts | Fix for sales.
## Not product issues
A table: Reason | Notes | Accounts.
## Needs discovery
A table: Question | Ask whom | Answer that would justify building.
## Back to sales
## Better notes
The five-field template.
</output_format>
