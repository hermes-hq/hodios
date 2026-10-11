---
schema: 1
id: write-licence-for-creative-work
kind: prompt
title: Write a licence for your creative work
description: Drafts a plain-language licence for a photo, illustration, music track or text you are licensing to a client - scope, media, territory, term, exclusivity, fee and credit - with notes for legal review.
category: intellectual-property
version: 1.0.0
status: incubating
stage: [build]
role: [artist, writer, content-creator, graphic-designer]
subject: [law]
requires: [none]
inputs: [text]
output: [docs, checklist, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [usage-licence, licence-terms, exclusivity, creator-rights, licensing-fee]
pairs_with:
  prompts: [review-creative-rights-contract, request-copyright-permission, price-artwork]
args:
  - name: work_and_deal
    description: The work(s), who the licensee is, what they want to do with it (ads, packaging, book cover, website, film sync), where, for how long, whether they want exclusivity, the fee agreed or proposed, and anything they asked for that worries you.
    type: text
    required: true
  - name: country
    description: Where you and the licensee are based. Licence formalities and implied terms vary.
    type: string
    default: not stated
output_contract:
  format: markdown
  sections: [Deal summary, Licence draft, Points to decide, Notes for legal review]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a creator license their work instead of giving it away. The core idea professional licensors work from: you keep the copyright and grant only the specific uses paid for. Each dimension of the grant is a lever on price and risk: media (web, print, packaging, broadcast, paid ads), territory, term, exclusivity (none, within a product category, or full), number of copies or impressions, whether the licensee may modify, crop or combine the work, sublicensing (agencies and printers often need a narrow right), credit, and what happens at the end of the term. Clients often ask for "all rights, worldwide, in perpetuity" by default; that is a buyout and should be priced as one or narrowed. A licence that does not say a use is included should be read as not granting it, but only if the text is clear, so drafting precision matters.

Country: {{country}}
</context>

<task>
<deal>
{{work_and_deal}}
</deal>

{{> guardrails/professional-limits}}

1. Deal summary: the work, licensee, intended use and fee, and any mismatch between what was asked for and what was paid (for example a perpetual buyout for a one-campaign fee). Ask about missing essentials.
2. Draft a plain-language licence with numbered clauses: parties; the work (identified precisely); grant (non-exclusive or exclusive, media, territory, term, quantity); what is not granted (everything else, including AI training use if the creator wants that excluded); modifications; sublicensing; credit; fee and payment; delivery; ownership stays with the creator; warranties limited to what the creator can honestly give (it is their original work, to their knowledge it does not infringe); end of term; signatures. Use [X] for unknowns.
3. Points to decide: each choice the creator still has to make, with the trade-off (for example exclusivity versus a higher fee, a broad indemnity they should resist).
4. Notes for legal review: clauses whose effect depends on local law (formal requirements for exclusive licences, implied terms, moral rights waivers, liability limits), and when to get the draft checked before signing.
</task>

<constraints>
- Present the licence as a draft for review, not a final legal document.
- Do not include an unlimited indemnity or warranty from the creator; flag if the client requests one.
- Do not invent fees, market rates or statutory rules; mark local-law points to verify.
- Plain English, short clauses, no archaic legalese.
{{> output/uncertainty}}
</constraints>

<output_format>
## Deal summary
Bullets and open questions.

## Licence draft
Numbered clauses with a schedule table: media | territory | term | exclusivity | quantity | fee.

## Points to decide
Table: point | options | trade-off.

## Notes for legal review
Bullets.
</output_format>
