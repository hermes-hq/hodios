---
schema: 1
id: build-proof-bank
kind: prompt
title: Build a proof bank
description: Collects a business's proof - results, statistics, reviews, awards, client logos, guarantees, credentials - into sourced claims ranked by strength, with permission status and where to use each.
category: copywriting
version: 1.0.0
status: incubating
stage: [plan, build]
role: [marketer, copywriter, founder, sales-rep]
requires: [none]
inputs: [text, document]
output: [table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [social-proof, claim-substantiation, testimonials, credibility, sales-enablement]
pairs_with:
  prompts: [request-customer-testimonials, write-case-study, build-voice-of-customer-bank, write-landing-page-copy]
  personas: [copywriter]
  rules: [marketing-claims-rules]
args:
  - name: material
    description: Everything you have that might prove your claims - review exports, testimonial emails, results data, case studies, awards, certifications, press mentions, client list, years trading, guarantees. Paste it raw.
    type: text
    required: true
  - name: business
    description: What you sell and to whom, and the main claims your marketing makes or wants to make.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Proof bank, Claims coverage, Where to use, Gaps and next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a conversion copywriter preparing the evidence before writing. Copy is only as persuasive as its proof, and most businesses have more proof than they use: it sits scattered in review sites, emails, spreadsheets and sales decks. A proof bank puts every usable piece in one place with its source, date, exact wording and permission status, so writers stop inventing vague claims and sales stops using an outdated number.

Proof differs in strength. Specific, attributed, recent and verifiable proof (a named customer's measured result, an independent award, an audited figure) beats unattributed praise and self-reported totals. Some proof cannot be used freely: testimonials need consent, logos need a client's agreement, old statistics go stale, and in many countries reviews must not be cherry-picked or edited to change their meaning. Results claims should be typical, not the single best case, unless labelled.
</context>

<task>
<business>
{{business}}
</business>

<material>
{{material}}
</material>

1. If the material is empty or only general statements ("customers love us"), list the types of proof to collect for this kind of business and stop.
2. Extract each piece of proof as one entry: claim in one line, exact wording or figure, type (result, statistic, testimonial, review rating, award, credential, client, guarantee, media mention, longevity), source, date, attribution, and permission status (confirmed, unknown, not allowed).
3. Rate strength (strong, medium, weak) using specificity, attribution, recency and independence, with a one-line reason.
4. Map proof against the business's main claims: which claims are well supported, thinly supported or unsupported.
5. Suggest where each strong piece works best (hero, pricing, objection, checkout, sales email, ad) and which objection it answers.
6. List gaps and next steps: missing permissions, stale figures to refresh, and specific proof to request from named customer types.
</task>

<constraints>
- Quote proof exactly; do not tidy testimonials in ways that change meaning, and do not merge two customers' words.
- Never invent or estimate figures; a figure without a source is marked "unverified".
- Mark testimonials and logos as "permission unknown" unless the material says consent was given.
- Flag statistics older than about two years and claims that look like best-case results presented as typical.
</constraints>

<output_format>
## Proof bank
Table: ID | Claim | Exact wording or figure | Type | Source and date | Attribution | Permission | Strength (reason).

## Claims coverage
Table: Marketing claim | Supporting proof IDs | Coverage (strong / thin / none).

## Where to use
Bullets: proof ID, placement, objection it answers.

## Gaps and next steps
Numbered list of actions, most valuable first.
</output_format>
