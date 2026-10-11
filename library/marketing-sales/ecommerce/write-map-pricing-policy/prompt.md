---
schema: 1
id: write-map-pricing-policy
kind: prompt
title: Write a minimum advertised price policy
description: Drafts a minimum advertised price (MAP) policy for a brand's resellers - scope, what counts as advertising, enforcement steps - after checking whether such a policy is lawful where you sell.
category: ecommerce
version: 1.0.0
status: incubating
stage: [plan, build]
role: [founder, executive, sales-rep, legal-professional]
subject: [ecommerce, retail]
requires: [none]
inputs: [text, notes]
output: [docs, checklist, message]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [map-policy, minimum-advertised-price, reseller-pricing, competition-law, brand-protection, wholesale]
pairs_with:
  prompts: [handle-listing-hijackers, respond-to-competitor-price-cuts, pitch-to-stockists]
args:
  - name: business
    description: The brand, the products, where you and your resellers are based and sell (countries and channels), how many resellers, and whether they buy direct or through distributors.
    type: text
    required: true
  - name: problem
    description: What is happening on price today (heavy discounting, marketplace undercutting, reseller complaints) and what you want the policy to achieve.
    type: text
    required: true
  - name: preferences
    description: Anything you already decided, such as products covered, allowed promotion periods, how you want to enforce. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Jurisdiction check, Policy draft, Enforcement procedure, Notice templates, Questions for your lawyer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a commercial adviser who has helped brands manage reseller pricing. A minimum advertised price policy sets the lowest price at which resellers may advertise a product; it does not set the price at which they may sell. Brands use it to stop a race to the bottom that drives good retailers away.

The legal position differs sharply by country, and getting it wrong is a serious competition law breach, not a contract detail:
- In the United States, a MAP policy is commonly structured as a unilateral policy under the Colgate doctrine: the brand announces it and may decide to stop supplying resellers who break it, but does not seek or accept agreement from resellers, negotiate exceptions one by one, or coordinate with resellers who complain about others. Federal law judges most vertical price agreements under the rule of reason rather than treating them as automatically illegal, but some states treat minimum resale price agreements more strictly, and conduct that turns a unilateral policy into an agreement loses the Colgate protection.
- In the European Union and the United Kingdom, competition authorities treat restrictions on resellers' advertised prices as a form of resale price maintenance in most cases, which is a hardcore restriction with large fines. Recommended retail prices that resellers are genuinely free to ignore are generally allowed; pressure to follow them is not.
- Elsewhere, rules vary; many countries follow one of these approaches.

So the first job is a jurisdiction check, and in some places the honest answer is "do not use a MAP policy; use recommended prices, selective distribution or better channel management instead", all of which also need legal review.
</context>

<task>
Prepare a MAP policy or the alternative.

<business>
{{business}}
</business>

<problem>
{{problem}}
</problem>

{{#preferences}}
<preferences>
{{preferences}}
</preferences>
{{/preferences}}

1. Identify every country where the brand or its resellers operate. For each, say whether a MAP policy is likely usable, high-risk, or likely unlawful under the general rules above, and that a competition lawyer must confirm.
2. If the main markets make MAP likely unlawful, do not draft one. Explain why, and outline lawful alternatives: recommended retail prices with no pressure, choosing and supporting resellers through selective distribution criteria, marketplace and brand protection measures, different products or bundles by channel. Then go to the lawyer questions.
3. Where MAP is usable, draft the policy: purpose, products covered, the MAP for each or how it is set, what counts as an advertised price (online listings, ads, emails) and what does not (the price in the cart or at checkout, in-store prices where applicable), permitted exceptions decided by the brand alone (end-of-line clearance, brand-wide promotions), the effective date, and the statement that resellers remain free to set their selling price.
4. Write the enforcement procedure as a fixed, published sequence the brand applies the same way to everyone, decided by the brand alone, without negotiation.
5. Write the notice templates: the policy announcement and the violation notice.
6. List the questions for the lawyer.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never draft a policy that requires resellers to agree to it, sign it as a contract term, or sell (not just advertise) at a minimum price; never suggest agreements with resellers on price.
- Do not draft MAP for markets where it is likely unlawful; offer alternatives instead.
- Do not tell the user the policy is legally safe; it must be reviewed by a competition lawyer in each market.
- Keep enforcement consistent and brand-decided; no ad hoc deals with individual resellers.
</constraints>

<output_format>
## Jurisdiction check
A table: Country | Likely status | Why | What the lawyer must confirm.

## Policy draft
The policy text, or "Not drafted" with the reason and the lawful alternatives.

## Enforcement procedure
The published steps, or "Not applicable".

## Notice templates
Announcement and violation notice, or alternative communications to resellers.

## Questions for your lawyer
Numbered questions.
</output_format>
