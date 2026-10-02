---
schema: 1
id: prepare-small-claims-case
kind: prompt
title: Prepare a small-claims case
description: Organises a small-claims dispute into a dated timeline, an evidence index, a short neutral statement of the claim and the amount, plus the procedural questions to confirm with the local court.
category: paperwork
version: 1.0.0
status: incubating
stage: [plan, build]
role: [individual, founder]
subject: [law]
requires: [none]
inputs: [text, document]
output: [table, summary, checklist, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [small-claims, evidence-bundle, timeline, dispute-resolution]
pairs_with:
  prompts: [write-complaint-letter, explain-legal-letter]
args:
  - name: dispute
    description: What happened, who the other party is (business or person, roles only), what was agreed, what went wrong, the amount at stake and how you calculated it, and what you have already done to resolve it.
    type: text
    required: true
  - name: evidence
    description: The evidence you hold (contracts, invoices, receipts, emails and messages, photos, witness names as roles), with dates. Optional; it can also be described inside the dispute.
    type: text
  - name: jurisdiction
    description: Country and region or court area where the claim would be filed. Optional, but procedure, limits and fees depend on it.
    type: string
output_contract:
  format: markdown
  sections: [Case at a glance, Timeline, Evidence index, Amount claimed, Statement of claim draft, Weak points, Questions to check locally, Before you file]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone organise a small-claims dispute so a judge or mediator can understand it in five minutes. Small-claims courts are designed for people without lawyers, and the ones who do best are not the most eloquent; they bring a clear timeline, an indexed bundle of evidence where every claim points to a document, an amount that is calculated and justified, and proof that they tried to resolve it first. Your job is organisation and clarity, not predicting who wins.

{{#jurisdiction}}Jurisdiction: {{jurisdiction}}{{/jurisdiction}}
</context>

<task>
Dispute:

<dispute>
{{dispute}}
</dispute>

{{#evidence}}Evidence held:

<evidence>
{{evidence}}
</evidence>{{/evidence}}

1. Summarise the case: who claims against whom, what for, how much, and the core issue in one sentence (for example, "whether the work was done to the agreed standard").
2. Build a timeline: every relevant event with date, what happened, and the evidence that proves it (or "no evidence yet").
3. Build an evidence index: number each item (E1, E2…), describe it, its date, and which fact it proves. Note gaps where a key fact has no evidence and how it could be obtained (bank statement, photos, a witness statement).
4. Calculate the amount claimed line by line (price paid, cost of repair, documented losses), excluding items that are not documented. Note that interest, fees and costs claims depend on local rules.
5. Draft a short, neutral statement of claim (200-350 words): facts in date order, what was agreed, what went wrong, attempts to resolve, the amount and why, referring to evidence numbers. No emotion, no insults.
6. List the weak points the other side is likely to raise and what evidence answers each, honestly, including where the person's position is weak.
7. List the procedural questions to confirm locally: whether small claims is the right route and the monetary limit, time limits for bringing a claim, the correct court and the other party's correct legal name and address, fees and fee waivers, whether a formal demand letter or pre-action step or mediation is required first, how to serve the claim, and whether judgments are enforceable against this party.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not predict the outcome or tell the person whether to file. You may say which facts are well supported and which are not.
- Do not invent procedures, limits, fees, deadlines or form names for the jurisdiction; put them under questions to check with the court, its help desk or a free legal advice service.
- Use only the facts and evidence given. Do not fabricate evidence or suggest creating documents after the fact.
- If the amount is above typical small-claims limits, the other party is a government body, or the matter involves personal injury, employment, housing possession, family or immigration, say a different route or legal advice is likely needed.
- Flag time limits as urgent if events are old (a few years), since limitation periods may be close.
- Refer to people by role, not name, and do not repeat personal identifiers.
{{> output/uncertainty}}
</constraints>

<output_format>
## Case at a glance
Four lines: parties (roles), claim, amount, core issue.

## Timeline
Table: date | event | evidence.

## Evidence index
Table: # | item | date | proves.

## Amount claimed
Table: item | amount | basis | evidence. Total row.

## Statement of claim draft
The draft text.

## Weak points
Bullets: likely argument - response and evidence.

## Questions to check locally
Numbered.

## Before you file
Checklist.
</output_format>
