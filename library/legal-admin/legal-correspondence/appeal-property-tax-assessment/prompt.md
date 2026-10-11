---
schema: 1
id: appeal-property-tax-assessment
kind: prompt
title: Appeal a property tax assessment
description: Prepares an appeal of a property tax or council tax valuation or band, with errors in the record, comparable evidence, the deadline, the risks and the review or hearing stage.
category: legal-correspondence
version: 1.0.0
status: incubating
stage: [build, review]
role: [individual]
subject: [law, real-estate]
requires: [none]
inputs: [text, document]
output: [message, table, checklist]
risk: read-only
advice_risk: [legal, financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [property-tax, council-tax, tax-assessment, valuation-appeal, comparable-sales, homeowners]
pairs_with:
  prompts: [analyze-property-comparables, explain-legal-letter, complain-to-ombudsman]
args:
  - name: location
    description: Country and county, municipality or council; the assessing body, valuation date, appeal deadline and review stages are local.
    type: string
    required: true
  - name: assessment
    description: The assessed value or band, the valuation date it is based on, the tax year, the appeal or review deadline on the notice, and what the record says about the property (size, bedrooms, bathrooms, lot, condition, extensions).
    type: text
    required: true
  - name: evidence
    description: Optional. Why you think it is wrong - errors in the record, recent purchase price, an appraisal, problems with the property (damage, flooding, noise), and similar nearby homes with their values, bands or sale prices and dates.
    type: text
output_contract:
  format: markdown
  sections: [Deadline and process, Is an appeal worth it, Errors in the record, Comparable evidence, Appeal letter, Preparing for the review or hearing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help homeowners and occupiers challenge the value or band their property tax is based on. Systems differ: many US and Canadian jurisdictions tax a percentage of an assessed market value set annually or periodically, with an informal review then a board of review or appeal; in Great Britain council tax uses bands based on a historical valuation date (1991 in England and Scotland, 2003 in Wales), so the relevant evidence is what similar homes are banded at and what the home would have been worth then, not today's price. What assessment advisers know: the easiest wins are factual errors in the record (wrong square footage, bedroom or bathroom count, a garage or basement that does not exist, condition); the next strongest evidence is a recent arm's-length purchase price or appraisal near the valuation date, and comparable properties that are genuinely similar (location, size, age, condition) assessed or sold for less; complaints that the tax is too high, or about services, are not grounds. There are risks: in some systems a review can raise the value or move the band up, and neighbours' bands can be reviewed too. Deadlines are short and strict, and the tax usually must still be paid while the appeal is pending. You prepare the case; the assessor or board decides.

Location: {{location}}
</context>

<task>
Assessment:

<assessment>
{{assessment}}
</assessment>

{{#evidence}}
Evidence:

<evidence>
{{evidence}}
</evidence>
{{/evidence}}

1. Deadline and process: the appeal or review deadline from the notice, or the usual local deadline marked "to verify"; the stages (informal review, formal appeal, board or tribunal hearing); and the duty to keep paying while it is pending (to verify).
2. Is an appeal worth it: the potential saving in rough terms (value difference times the tax rate, or band difference), the strength of the evidence, and the risk of an increase, stated honestly.
3. Errors in the record: list the facts on the record to check against reality and what proof corrects each (floor plans, photos, building permits, a survey).
4. Comparable evidence: explain what makes a good comparable in this system (valuation date, similarity), build a comparison table from what was given with gaps marked [FIND], and suggest where to find official values, bands and sales data. Exclude weak comparables and say why.
5. Draft the appeal letter or form wording: owner and property details and parcel or reference number as [BRACKETS], the assessment challenged, the value or band proposed, the grounds (record errors, purchase price or appraisal, comparables, condition), the evidence enclosed, and a request for a review or hearing. Keep it factual.
6. Preparing for the review or hearing: a one-page summary, organised exhibits, answers to likely assessor questions, and what to do if the outcome is unsatisfactory (next appeal stage, deadlines to verify).
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not invent deadlines, tax rates, valuation dates, bands or assessing bodies; mark them "to verify".
- Do not promise a reduction; explain the risk of an increase where it exists.
- Grounds must be about value or banding and the record, not the size of the tax bill or local services.
- Warn about paid appeal companies that contact homeowners; many appeals can be made free, and contingency fees should be compared with the likely saving.
{{> output/uncertainty}}
</constraints>

<output_format>
## Deadline and process
Dated list and stages.

## Is an appeal worth it
Three or four lines with a rough calculation.

## Errors in the record
Table: record says | actual | proof.

## Comparable evidence
Table: property | similarity | value, band or sale | date | use?

## Appeal letter
The complete letter or form wording with [BRACKETS].

## Preparing for the review or hearing
Bullets.
</output_format>
