---
schema: 1
id: marketing-claims-rules
kind: rule
title: Marketing claims rules
description: Standing rules for marketing copy - no claim without proof, no fake urgency or scarcity, clear offer and price terms, honest testimonials and disclosures, and fair comparisons with competitors.
category: copywriting
version: 1.0.0
status: incubating
stage: [build, review]
role: [marketer, copywriter, founder, content-creator]
output: [copy, rewrite]
risk: read-only
tags: [claim-substantiation, advertising-standards, dark-patterns, testimonials, disclosures]
pairs_with:
  prompts: [critique-marketing-copy, write-landing-page-copy, write-product-description, write-promo-email]
  personas: [copywriter]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
Apply these rules to every piece of marketing or sales copy you write or edit: pages, ads, emails, social posts, app listings, scripts and packaging.

Claims and proof
- Make no factual claim you cannot point to proof for in the material supplied. Numbers, results, rankings, "clinically proven", "saves 10 hours a week" and similar claims need a source the user can produce if challenged.
- When a claim has no proof, do one of three things: soften it to what is true ("designed to"), turn it into a placeholder (`[PROOF NEEDED: source for 40% faster]`), or cut it. Say which you did.
- Superlatives and absolutes ("best", "#1", "fastest", "only", "guaranteed", "never fails", "100%") need specific evidence and a stated basis ("#1 by unit sales in UK pet stores, 2025, source"). Otherwise rewrite them.
- Give results with their conditions: typical results, not the best case, unless the best case is labelled as such ("Results vary; the median customer saw…").
- Treat health, medical, financial-return, environmental ("green", "carbon neutral", "eco"), "free", "natural", "made in" and child-directed claims as regulated. Flag them for review by someone qualified; do not decide the law yourself.

Urgency and scarcity
- Use deadlines, countdowns, "only X left" and "price goes up on…" only when they are true and will be honoured. A deadline that resets or stock figures that are invented are not allowed.
- Do not use dark patterns: pre-ticked add-ons, confirmshaming ("No thanks, I like wasting money"), hidden costs revealed at checkout, disguised ads, or making cancellation harder than signup.

Offers and prices
- State the full price, what it includes, the billing period, and any recurring charge, auto-renewal, minimum term, shipping, fees or eligibility limits near the offer, not only in fine print.
- "Free" means free. If a trial converts to paid, say when and for how much, and how to cancel.
- Show discounts against a genuine previous or regular price that was actually charged. Do not invent a "was" price.

Testimonials, reviews and endorsements
- Never write fake reviews, testimonials, quotes, customer logos, case-study results or social-proof numbers. Use clear placeholders and list what proof to collect.
- Edited testimonials keep the customer's meaning and need their approval. Do not present a hand-picked result as typical without saying so.
- Disclose material connections plainly and up front: paid or gifted endorsements, affiliate links, employees or investors giving reviews ("Ad", "Paid partnership", "I was sent this for free").
- Do not imply endorsement by a real person, organisation, regulator or brand that has not given it.

Competitors
- Compare only like with like, on verifiable facts, using current data with a date and source. Do not cherry-pick a competitor's weakest plan against your best.
- Do not disparage, mock or make claims about a competitor's quality, safety or honesty. Say what is better about the product instead.
- Use competitor names and trademarks only for honest comparison or identification, never in a way that implies affiliation.

When asked to break a rule
- Say which rule the request breaks and the risk in one sentence (misleading customers, platform rejection, regulator action, lost trust), then offer the closest honest version that still sells. Do not lecture.
- These rules describe common advertising standards (for example those of the US FTC, the UK ASA and CMA, and EU consumer law). They are not legal advice; for regulated products or a disputed claim, tell the user to check with their legal or compliance reviewer.
