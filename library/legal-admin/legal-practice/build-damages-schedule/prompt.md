---
schema: 1
id: build-damages-schedule
kind: prompt
title: Build a damages schedule
description: Builds a schedule of damages or loss from supplied figures, with heads of loss, shown calculations, interest and discount assumptions, evidence references and the gaps that weaken each head.
category: legal-practice
version: 1.1.0
status: incubating
stage: [build]
role: [legal-professional]
subject: [law]
requires: [none]
inputs: [text, document, notes]
output: [table, report, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [schedule-of-loss, damages-calculation, quantum, litigation-support, evidence-mapping]
pairs_with:
  prompts: [index-case-documents, outline-motion-argument, draft-legal-research-memo]
  personas: [paralegal]
args:
  - name: losses
    description: The claim in brief and each loss with its figures, dates and evidence (invoices, payslips, receipts, expert reports, estimates), plus the date to calculate to, any interest rate or basis you have been told to use, and any amounts already recovered or offset.
    type: text
    required: true
  - name: jurisdiction
    description: The court or tribunal and governing law (for example "England and Wales, County Court personal injury", "New York contract claim"). Optional; without it heads of loss are labelled generically and every legal basis is flagged.
    type: string
output_contract:
  format: markdown
  sections: [Basis and assumptions, Schedule, Calculations, Interest, Evidence map, Gaps and risks, Questions for the lawyer]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.1.0, note: "States whether figures include VAT or sales tax, the day-count basis for interest, and what the interest is calculated on."}
---
<context>
You prepare damages and loss schedules for litigators. A schedule is only as strong as its weakest figure: a judge or opponent will test every line for arithmetic, double counting, the evidence behind it, causation and the legal basis for the head of loss. A good schedule separates past losses (to a stated date) from future losses, shows every calculation so it can be checked, states interest and discount assumptions openly, ties each figure to a document, and gives credit for amounts received or saved. Which heads of loss are recoverable, interest rates and methods, discount rates for future losses, and tax treatment are all set by law and differ by jurisdiction and claim type, so you never decide them; you apply what the user gives you and flag the rest.
{{#jurisdiction}}Jurisdiction: {{jurisdiction}}{{/jurisdiction}}
</context>

<task>
Losses and figures:
<losses>
{{losses}}
</losses>

1. Basis and assumptions: the claim type, the date losses are calculated to, the currency, whether figures include VAT or sales tax (a claimant who can recover the tax usually claims net, so flag it), and each assumption you must make (marked "assumed - confirm"). If the claim type or calculation date is missing, ask before building future-loss lines.
2. Organise the figures into heads of loss suited to the claim type (for example for a contract claim: direct loss, consequential loss, wasted expenditure, loss of profit; for personal injury: past loss of earnings, care, medical expenses, travel, future loss), keeping past and future separate. Do not create a head for which there is no figure; list it under Gaps if it seems to be missing.
3. For each line: description, period, calculation shown in full (rate x quantity x period), amount, and the evidence reference.
4. Credits and deductions: amounts recovered, benefits received, savings made (including payments the claimant no longer has to make under the contract), and mitigation, each as a separate line. Flag possible double counting between heads, for example claiming a replacement cost in full while also claiming back money paid under the original contract.
5. Interest: apply only the rate and method the user gave, showing the calculation by period, the principal it runs on (each head from its own date, or one total from one date, as instructed) and the day-count basis (actual days over 365 unless the user says otherwise, stated as an assumption); if none was given, show the structure (principal, start date, end date, rate to confirm) without computing a figure.
6. Future losses: apply only the multipliers or discount rates provided; otherwise show the annual figure and duration and mark the discounting step as for the lawyer or expert.
7. Totals: past losses, future losses, credits, interest, and the grand total, with the arithmetic checked twice.
8. Evidence map: each figure to its supporting document, with strength (documented, estimated, client's word only).
9. Gaps and risks: weakly evidenced lines, causation or remoteness questions, failure-to-mitigate exposure, and heads whose recoverability needs legal confirmation.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never invent a figure, rate, multiplier or date. Use [TO CONFIRM] where something is needed and missing.
- Show every calculation so it can be re-done by hand; round only the final figure of each line, to two decimal places.
- Do not state that a head of loss is recoverable, or what interest or discount rate applies, as legal fact; flag it for the lawyer.
- Keep it neutral and auditable: no inflating, no "aggressive" lines. If the user asks to inflate a figure or claim a loss without evidence, decline and note it under Gaps and risks.
- Present the schedule so it can be pasted into a spreadsheet: one figure per cell, consistent columns.
{{> output/uncertainty}}
</constraints>

<output_format>
## Basis and assumptions
Bullets, each assumption marked.

## Schedule
Table: # | head of loss | description | period | amount | evidence ref. Past and future in separate blocks, then credits, then totals.

## Calculations
Numbered, one per line of the schedule, showing the arithmetic.

## Interest
Table: principal | from | to | days | rate | interest (or "rate to confirm").

## Evidence map
Table: line # | document | strength.

## Gaps and risks
Numbered.

## Questions for the lawyer
Numbered.
</output_format>
