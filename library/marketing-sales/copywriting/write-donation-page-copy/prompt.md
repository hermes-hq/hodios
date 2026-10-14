---
schema: 1
id: write-donation-page-copy
kind: prompt
title: Write donation page copy
description: Writes a nonprofit's online donation page - the need, impact per gift amount, suggested amounts, monthly giving, trust signals and form microcopy - so more visitors complete a gift.
category: copywriting
version: 1.0.0
status: incubating
stage: [build]
role: [marketer, copywriter, founder]
subject: [nonprofit]
requires: [none]
inputs: [text]
output: [copy]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: intermediate
depth: specific
tags: [donation-page, online-giving, impact-statements, monthly-giving, conversion-copy, fundraising-copy]
pairs_with:
  prompts: [write-donor-appeal, write-thank-you-page-copy, audit-landing-page-conversion]
args:
  - name: organisation
    description: What the organisation does, for whom, where, and one real story or result you can use with permission.
    type: text
    required: true
  - name: costs
    description: Real costs you can turn into impact statements (for example 25 pays for a food parcel), your usual gift sizes, monthly versus one-off split if known, and any matched-giving or campaign deadline.
    type: text
    required: true
  - name: trust
    description: Optional. Registration status and number, ratings or accreditations, how much goes to programmes, tax relief or gift-aid-style schemes that genuinely apply, and the country.
    type: text
output_contract:
  format: markdown
  sections: [Headline and opening, Why give now, Amount options, Monthly giving prompt, Trust block, Form microcopy, Notes and checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write the page where a supporter actually gives. Most visitors arrive already wanting to give, from an email, a social post or a search, so the page's job is to confirm the decision and remove friction, not to retell the whole organisation's history. What lifts completion: a headline that names the outcome of a gift, not the organisation's name; one short story or fact; three or four suggested amounts each tied to a concrete, true impact ("40 keeps a helpline open for an hour"), with a sensible default; an easy switch to monthly with a reason it matters; trust signals placed near the form (registration, independent ratings, how money is used, secure payment); tax relief or gift-aid-style prompts where they genuinely apply; and short, reassuring form labels and error text. What hurts it: long copy above the form, navigation and links that lead away, vague impact ("make a difference"), guilt and pity framing, surprise fees, and asking for unnecessary details. Impact statements must be honest: if gifts go to general funds, say a gift "can pay for" rather than implying it is earmarked.
</context>

<task>
Organisation:

<organisation>
{{organisation}}
</organisation>

Costs and giving data:

<costs>
{{costs}}
</costs>

{{#trust}}
Trust details:

<trust>
{{trust}}
</trust>
{{/trust}}

1. Write the headline (under 10 words, outcome-focused) and a two to three sentence opening using the one story or fact supplied.
2. Write a short "why give now" block: the need, and the deadline or match if one exists. If there is none, do not invent urgency.
3. Write three or four suggested amounts for one-off and for monthly giving, each with a true impact line built only from the costs given, and recommend which to pre-select and why. Include an "other amount" line.
4. Write the monthly giving prompt: a short reason monthly helps this organisation (planning, lower costs), and a gentle upgrade line for one-off givers.
5. Write the trust block from the details given only: registration, where money goes, independent ratings, security and how to contact a person.
6. Write form microcopy: section labels, helper text for optional fields, a tax relief or gift-aid-style declaration line only if it applies in the stated country, the consent wording for future contact as a neutral opt-in, the button text, and two error messages.
7. Add notes and checks: claims to verify, earmarking wording, and what to A/B test first.
</task>

<constraints>
- Use only facts and costs supplied; never invent statistics, ratings, beneficiaries or matching funds. Put unknowns in [brackets].
- Impact statements must reflect real costs; say "can pay for" when gifts are unrestricted.
- Do not use guilt, shame or graphic suffering; keep the beneficiary's dignity.
- Contact consent must be a clear, unticked opt-in, not hidden in the donation.
- Do not claim tax deductibility unless the user confirms it applies.
</constraints>

<output_format>
## Headline and opening
The copy.

## Why give now
The copy.

## Amount options
Table: Amount | One-off or monthly | Impact line. Then the pre-select recommendation.

## Monthly giving prompt
The copy.

## Trust block
The copy.

## Form microcopy
Labelled lines.

## Notes and checks
Bullets.
</output_format>
