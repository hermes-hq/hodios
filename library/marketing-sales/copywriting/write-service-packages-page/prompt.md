---
schema: 1
id: write-service-packages-page
kind: prompt
title: Write a service packages page
description: Writes a freelancer's or small agency's services page as two to four named packages with outcome, inclusions, exclusions, timeline and starting price, plus a comparison table.
category: copywriting
version: 1.0.0
status: incubating
stage: [build]
role: [consultant, founder, designer, copywriter]
requires: [none]
inputs: [text]
output: [copy, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [service-packages, productised-services, pricing-page, scope-creep, freelance]
pairs_with:
  prompts: [package-service-tiers, design-pricing, write-landing-page-copy, write-sales-faq, write-sales-proposal, present-repair-options]
  personas: [copywriter]
args:
  - name: services
    description: What you offer, how you deliver it (steps, meetings, revisions, hand-over), typical timelines, what clients usually ask for, what you will not do, and proof (results, client types, reviews).
    type: text
    required: true
  - name: prices
    description: Your prices, day rate or ranges, deposits and payment terms. Optional; without them the page uses placeholders.
    type: text
  - name: ideal_client
    description: Who you most want to work with (for example "independent cafes opening their first site" or "B2B SaaS teams of 10-50"). Optional.
    type: string
output_contract:
  format: markdown
  sections: [Page intro, Packages, Comparison table, Not sure which, Questions to confirm]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write services pages for freelancers, consultants, studios and small agencies who sell their time as defined packages. A good packages page lets the right client pick a starting point without a call, filters out the wrong ones, and stops scope creep before it starts. Most fail in predictable ways: packages named Bronze, Silver and Gold that say nothing about outcomes, lists of activities instead of results, no exclusions so every project grows, and hidden prices that make serious buyers leave. Two to four packages is the useful range: one is a quote form, five is a menu nobody can choose from.

{{#ideal_client}}Ideal client: {{ideal_client}}{{/ideal_client}}
</context>

<task>
<services>
{{services}}
</services>

{{#prices}}<prices>
{{prices}}
</prices>{{/prices}}

1. If the services or how they are delivered are unclear, ask for the missing parts and stop.
2. Group the work into two to four packages by the client's situation or outcome, not by effort level. Typical shapes: a small fixed-scope entry offer (audit, sprint, starter), a core package most clients need, and a larger or ongoing option (retainer, full build). Make one clearly the recommended choice.
3. For each package write: a name that says the outcome, a who-it-is-for line, the outcome in one sentence, inclusions as countable deliverables (pages, sessions, rounds of revisions, hours of support), exclusions, timeline, what the client must provide, and the starting price ("from") with payment terms.
4. Use only supplied prices. If none are given, put [price] and say what to decide (fixed fee or range, deposit, what changes the price).
5. Write a short intro above the packages that names the client's problem and how the packages are organised, and a "Not sure which" section that routes people to the right package or a short call.
6. Build a comparison table across packages with the same rows, so differences are visible at a glance.
</task>

<constraints>
- Only claims backed by the input. No invented results, client names, testimonials or guarantees.
- Every package states what is not included; this protects the seller and builds trust.
- Keep the language plain and specific; no "bespoke solutions" or "synergy". Countable beats vague ("2 rounds of revisions", not "revisions as needed").
- Do not set prices for the user or state market rates. If the prices look inconsistent with the scope (the larger package costs less per deliverable), point it out as a question.
- If a package needs a licence, insurance or regulated status the input does not mention, flag it as a question.
</constraints>

<output_format>
## Page intro
Headline, two or three sentences, and the call to action.

## Packages
For each package: ### name, then Who it is for, Outcome, Includes (bullets), Not included (bullets), Timeline, You provide, Price. Mark the recommended package.

## Comparison table
Table with packages as columns and rows: best for, deliverables, revisions, timeline, support, price from.

## Not sure which
Three to five "If you... choose..." lines and the call to book a call.

## Questions to confirm
Bullets: placeholders, price checks and scope questions.
</output_format>
