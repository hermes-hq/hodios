---
schema: 1
id: respond-to-gifting-request
kind: prompt
title: Respond to a product gifting request
description: Helps a creator decide on a brand's gifted-product offer - what is really expected, whether to accept, disclosure for gifts, tax points to check, a reply, and how to turn it into a paid deal.
category: creator-business
version: 1.0.0
status: incubating
stage: [review]
role: [content-creator]
inputs: [message, notes]
output: [report, message]
risk: read-only
advice_risk: [financial, legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [gifted-products, pr-packages, seeding, sponsorship-disclosure, unpaid-collaboration]
pairs_with:
  prompts: [write-sponsorship-policy-page, build-creator-rate-card, pitch-brand-sponsorship]
  workflows: [brand-deal-track]
  personas: [creator-business-manager]
args:
  - name: offer
    description: "The brand's message: product and its value, whether they ask for a post, story, review or tag, any deadline, and anything about rights or usage."
    type: text
    required: true
  - name: context
    description: "Your platforms, audience, whether the product fits your content, how many gifts you get, your rate card if any, and your country."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What they are really asking, Should you accept, Disclosure, Money and tax checks, Reply, Turning it into paid]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Brands send gifted products (seeding or PR packages) to get content without paying a fee. A true no-strings gift lets the creator decide whether to post; a gift with required deliverables, deadlines, approval or usage rights is unpaid work with a product as payment. Experienced creators read for those strings, decline gifts that do not fit their audience (posting off-niche products damages trust and engagement), and use gifts as an opening to talk about paid work. Disclosure rules in many countries apply to gifted products when the creator posts about them, not only to paid deals, and platforms have their own labels; the wording and threshold differ by country. Gifted products can also count as income or a taxable benefit in some countries, especially when given in exchange for content, which matters when gifts are frequent or valuable. Creators should never pay customs, shipping or 'fees' to receive a gift; that is a scam sign.
</context>

<task>
<offer>
{{offer}}
</offer>

<your_situation>
{{context}}
</your_situation>

1. **What they are really asking:** whether this is a no-strings gift or unpaid work, listing each expectation in the message and anything unclear.
2. **Should you accept:** fit with their content and audience, product safety or claims concerns, the real cost in time, and a recommendation (accept as gift, accept and ask for paid terms, or decline).
3. **Disclosure:** that disclosure may be required if they post about a gift, how to label it on their platforms, and that rules differ by country; mark exact wording as a check.
4. **Money and tax checks:** whether gifts may count as income in their country (a check to make with an accountant or tax authority guidance), keeping a record of value received, and a warning about paying any fees or customs to receive a gift.
5. **Reply:** a short reply matching the recommendation: thanks with no posting promise, a reply that converts deliverables into a paid offer, or a polite decline.
6. **Turning it into paid:** how to propose paid deliverables if the brand wants guaranteed content, using their rate card or placeholders.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state tax treatment or disclosure law as settled for their country; mark both as checks.
- Never advise posting without disclosure.
- Do not suggest promising positive reviews; reviews stay honest.
- Flag any request to pay fees, shipping or customs as a scam sign.
</constraints>

<output_format>
## What they are really asking
## Should you accept
## Disclosure
## Money and tax checks
Checkbox list.

## Reply
## Turning it into paid
</output_format>
