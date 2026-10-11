---
schema: 1
id: write-pricing-page-copy
kind: prompt
title: Write pricing page copy
description: Writes the words of a pricing page - plan names, who each plan is for, feature labels in buyer language, limits, billing notes and a pricing FAQ - from your actual plans and terms.
category: copywriting
version: 1.0.0
status: incubating
stage: [build]
role: [marketer, copywriter, founder, product-manager]
requires: [none]
inputs: [text, spec]
output: [copy, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [pricing-page, plan-names, feature-labels, billing-terms, conversion]
pairs_with:
  prompts: [design-pricing-page, write-sales-faq, write-guarantee-wording, critique-marketing-copy, write-paywall-and-upgrade-copy]
  personas: [copywriter]
args:
  - name: plans
    description: Each plan with its current name, monthly and annual price, currency, limits (seats, usage, storage), included features and the plan you want most people to choose.
    type: text
    required: true
  - name: audience
    description: Who buys and how they differ (for example "solo freelancers, small agencies of 2-10, larger agencies needing approval workflows and invoicing").
    type: text
    required: true
  - name: billing_terms
    description: Trial length and whether a card is needed, annual discount, how cancellation and refunds work, whether prices include tax, overage charges, and the markets you sell in. Optional but needed for honest billing notes.
    type: text
  - name: customer_questions
    description: Real questions prospects ask about pricing, from sales calls, chat or support. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Plan positioning, Pricing page copy, Feature labels, Pricing FAQ, Facts to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write pricing page copy for subscription and service businesses. On a pricing page, buyers are not looking for persuasion; they are trying to answer "which plan is mine, what will I actually pay, and what is the catch". Copy mistakes there cost sales: plan names that say nothing (Basic, Pro, Ultimate) without a "who it is for" line, feature labels in internal jargon, limits hidden until checkout, a monthly-equivalent price that does not say it is billed annually, and taxes or overages that appear later. Each of these creates doubt, support tickets or refund requests.

Good pricing copy lets a buyer self-select in seconds: each plan has a one-line fit ("For freelancers working alone"), the key differences between plans are the first features listed, labels describe what the buyer can do, limits are stated with numbers, and billing notes are exact. The FAQ answers the questions that block the decision.
</context>

<task>
<plans>
{{plans}}
</plans>

<audience>
{{audience}}
</audience>

{{#billing_terms}}<billing_terms>
{{billing_terms}}
</billing_terms>{{/billing_terms}}

{{#customer_questions}}<customer_questions>
{{customer_questions}}
</customer_questions>{{/customer_questions}}

1. If prices or what each plan includes are missing, ask for them and stop. If billing terms are missing, write the page with [CONFIRM: ...] markers in the billing notes and FAQ.
2. Plan positioning: map each audience to a plan, name the deciding difference between neighbouring plans, and say which plan to highlight and why. If the current plan names hide who each plan is for, suggest clearer names, but keep the current names as an option.
3. Write the page copy: a short page headline and subhead, then for each plan the name, a one-line "for whom", the price line with billing period exactly stated, a call to action fitted to the plan (trial, buy, contact sales), and the three to six features that differ from the plan below ("Everything in Starter, plus ...").
4. Rewrite every feature label into buyer language with a short tooltip where needed, keeping limits as numbers.
5. Write billing notes for under the plans: trial terms, when the card is charged, annual billing, taxes, currency and cancellation, only as the inputs state them.
6. Write a pricing FAQ of five to eight questions drawn from the customer questions and common blockers (switching plans, what happens at a limit, cancellation, refunds, discounts for nonprofits or education if offered, invoices and payment methods).
7. List the facts to confirm.
</task>

<constraints>
- Never change a price, limit or term; never invent discounts, trials or guarantees. Mark unknowns as [CONFIRM: ...].
- When a monthly equivalent of an annual price is shown, say "billed annually" with the total next to it.
- Do not hide limits, overages or auto-renewal in tooltips only; state them on the page.
- No fake urgency (countdown discounts that reset) or decoy wording designed to mislead.
- Price display and tax rules differ by market (for example whether consumer prices must include tax); flag what to check for the markets listed rather than stating the rule.
</constraints>

<output_format>
## Plan positioning
A table: Plan | For whom | Deciding difference from the plan below | Highlight (yes or no). Then any suggested plan names.

## Pricing page copy
Headline, subhead, each plan block and the billing notes, ready to paste.

## Feature labels
A table: Current label | Buyer-language label | Tooltip.

## Pricing FAQ
Numbered questions in bold with answers under about 60 words each.

## Facts to confirm
Bullets. "None" if all is confirmed.
</output_format>
