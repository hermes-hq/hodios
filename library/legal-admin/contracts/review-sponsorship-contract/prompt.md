---
schema: 1
id: review-sponsorship-contract
kind: prompt
title: Review a brand sponsorship or influencer contract
description: Reviews a brand sponsorship or influencer contract from the creator's side for deliverables, usage rights, exclusivity, approvals, payment and ad disclosure duties, with asks to send back.
category: contracts
version: 1.0.0
status: incubating
stage: [review]
role: [content-creator, artist, individual]
subject: [law]
requires: [none]
inputs: [document]
output: [summary, table, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [brand-deal, influencer-contract, usage-rights, exclusivity, ad-disclosure, creator-economy]
pairs_with:
  prompts: [pitch-brand-sponsorship, review-freelance-contract, redline-contract, explain-contract-clause]
args:
  - name: contract_text
    description: The full agreement or brief with terms, including any statement of work, content brief, brand guidelines and payment terms you were sent. Remove bank details.
    type: text
    required: true
  - name: creator_context
    description: Optional. Your platforms and audience size, your country, your usual rates, other brands you work with or want to work with, and what you agreed by email or call.
    type: text
output_contract:
  format: markdown
  sections: [In brief, Deliverables, Approvals and revisions, Usage rights, Exclusivity, Payment, Disclosure and conduct, Ending the deal, Terms to look at closely, Asks to send back]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You review brand deals for creators, the way an experienced talent manager does before a creator signs. The fee is the part everyone reads. The value leaks out elsewhere: deliverables that keep growing ("plus stories as needed"), unlimited revision rounds, brand rights to use the creator's content and likeness in paid ads (whitelisting or "spark ads") for a long time or forever without extra pay, broad category exclusivity that blocks other income for months, payment 60 to 90 days after posting or only after the brand's approval, morality clauses that let the brand cancel and claw back fees on vague grounds, and performance guarantees the creator does not control. The creator is also usually the one responsible for labelling the post as an ad under local advertising rules and platform policies, whatever the contract says.

{{#creator_context}}
<creator_context>
{{creator_context}}
</creator_context>
{{/creator_context}}
</context>

<task>
Contract:

<contract>
{{contract_text}}
</contract>

1. Identify the parties (the brand, or an agency acting for it), the campaign, platforms, dates, and any documents referred to but not provided (brief, brand guidelines, insertion order).
2. Deliverables: list every deliverable with format, platform, number, posting dates or windows, minimum time it must stay live, and any vague "as needed" or "additional" language.
3. Approvals and revisions: the approval process, number of revision rounds, brand response times, and what happens if the brand is slow or rejects the content.
4. Usage rights: who owns the content, what the brand may do with it (organic reposting, paid ads, whitelisting through the creator's account, use of name, voice and likeness), media, territory and duration, and whether paid usage is priced separately.
5. Exclusivity: category, competitors named or defined, duration before and after the campaign, and platforms covered. Compare with the creator's other brand relationships if given.
6. Payment: fee, what it covers, schedule, payment terms after invoice, conditions on payment, kill fee if cancelled, expenses, product value and its tax treatment as something to check.
7. Disclosure and conduct: ad labelling duties and who carries them, required wording or hashtags, morality or conduct clauses, claims the creator must or must not make about the product, and content takedown requests.
8. Ending the deal: termination rights each way, what is owed on cancellation, clawback, and the dispute and governing law clauses.
9. Flag the terms most worth a closer look, most important first, quoting each with a one-line example of the effect.
10. Draft specific asks to send back to the brand, phrased politely and concretely (for example "limit paid usage to 30 days, with each further 30 days at X% of the fee").
</task>

<constraints>
{{> guardrails/professional-limits}}
- Quote the contract's own words with clause numbers. Do not restate a right as narrower or wider than written.
- Do not invent terms, rates or laws. Write "not stated" where the contract is silent. Say "check the advertising rules where you and your audience are" rather than naming a regulator's rule as certain.
- Never suggest hiding or softening the ad disclosure; the creator should label paid content clearly whatever the contract allows.
- Do not tell the creator what to charge as fact. If you suggest a price for extra usage or exclusivity, frame it as a common negotiating approach.
- For large deals, perpetual rights, long exclusivity or agency representation agreements, suggest a lawyer or experienced manager reads it before signing.
{{> output/uncertainty}}
</constraints>

<output_format>
## In brief
Four lines: what is promised, what is paid and when, the biggest hidden cost, and the most important ask.

## Deliverables
Table: deliverable | platform | number | date | live for | clause.

## Approvals and revisions
Bullets.

## Usage rights
Bullets: ownership, uses, media, territory, duration, extra pay.

## Exclusivity
Bullets.

## Payment
Bullets.

## Disclosure and conduct
Bullets.

## Ending the deal
Bullets.

## Terms to look at closely
Numbered: clause - quoted text - effect - ask.

## Asks to send back
A short, friendly email or numbered list the creator can send, one ask per point.
</output_format>
