---
schema: 1
id: prepare-inheritance-tax-questions
kind: prompt
title: Prepare inheritance tax questions
description: Prepares the questions to raise with an adviser about inheritance or estate tax, lifetime gifts and thresholds, with an asset summary template and a gifts log, for planners or heirs.
category: taxes
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text, preferences]
output: [questions, table, checklist]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [inheritance-tax, estate-tax, lifetime-gifts, executor]
pairs_with:
  prompts: [plan-windfall, manage-parent-finances, plan-tax-move-abroad]
args:
  - name: country
    description: Country (and state if relevant) of the person whose estate it is, plus the countries where heirs live or assets are held, if different.
    type: string
    required: true
  - name: situation
    description: Whether you are planning your own estate or dealing with someone's death, the family relationships involved, rough assets (home, savings, pensions, business, property abroad), any large gifts made in recent years, and any existing will or trust.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Where you are, How this tax usually works, Questions for your adviser, Asset summary, Gifts log, Deadlines to confirm, Who to see]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone walk into a meeting with an estate or tax adviser prepared. Countries tax wealth passing at death in different ways: some tax the estate before it is distributed, some tax each heir on what they receive with rates that depend on the relationship, and some have no such tax but treat the transfer through capital gains or income rules. Most look back at gifts made in the years before death, give generous treatment to spouses or partners, and have thresholds, reliefs for homes, businesses or farms, and strict filing deadlines. Cross-border families can face more than one country's rules.

The person may be planning ahead, or may be grieving and suddenly responsible as an executor. Read the situation and match the tone.

Country: {{country}}
</context>

<task>
Situation:

<situation>
{{situation}}
</situation>

1. Say in one or two sentences which position the user is in (planning their own estate, an heir, an executor or administrator) and adjust everything that follows to it. If a death is recent, open with one plain, kind sentence and say that most deadlines allow time to get help.
2. Explain how the tax usually works in {{country}}: whether it is an estate tax, an inheritance tax on heirs, or neither; who pays; how thresholds, the spouse or partner exemption, and relationship-based rates work; and the treatment of lifetime gifts. Mark every amount and period "verify".
3. Write specific questions for the adviser that follow from the facts given, such as residence or domicile, assets in other countries, recent gifts, the family home, pensions and life insurance (often outside the estate depending on how they are set up), business or farm assets, trusts, and the tax basis heirs inherit.
4. Provide an asset summary template pre-filled with what the user mentioned, with blanks for the rest.
5. Provide a gifts log template for gifts made in the lookback period.
6. List deadlines to confirm: notifying the tax authority, filing the return, paying, and any interest that runs from a fixed date.
7. Say which professional fits (estate lawyer or notary, tax adviser, probate specialist) and what to bring.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not estimate the tax due or recommend gifting, trust or structuring strategies. Frame planning ideas as questions to raise with an adviser.
- Never state a threshold, rate or deadline as certain unless you are confident it is current for {{country}}; otherwise mark it "verify" and name the official source.
- If more than one country is involved, say plainly that cross-border estates need an adviser who handles both countries, and list the facts that adviser will need.
- If you do not know the country's system, say "I don't know" and keep to the questions any adviser will ask.
- Keep the language plain and gentle, without euphemism that hides what must be done.
{{> output/uncertainty}}
</constraints>

<output_format>
## Where you are
One or two sentences.

## How this tax usually works
Five to eight bullets, with confidence and verify marks.

## Questions for your adviser
Numbered, grouped by topic.

## Asset summary
Table: asset | how it is owned (sole, joint, nominated beneficiary, trust) | country | approximate value | valuation date | debt against it | notes.

## Gifts log
Table: date | recipient | relationship | what was given | value | notes.

## Deadlines to confirm
Table: step | usual timing | confirm with.

## Who to see
Two or three sentences with what to bring.
</output_format>
