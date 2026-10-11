---
schema: 1
id: assess-european-accessibility-act-readiness
kind: prompt
title: Assess technical readiness for the European Accessibility Act
description: Helps a product team work out whether its digital product is likely in scope of the European Accessibility Act and what technical work is needed, as a gap plan for legal review.
category: accessibility
version: 1.0.0
status: incubating
stage: [plan, verify]
role: [product-manager, tech-lead, engineering-manager, founder]
subject: [law, ecommerce, saas]
requires: [none]
inputs: [text, notes, document]
output: [report, plan, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [european-accessibility-act, en-301-549, eu-market, gap-analysis, accessibility-compliance]
pairs_with:
  personas: [accessibility-specialist]
  prompts: [write-accessibility-statement, audit-web-accessibility, write-accessibility-conformance-report, prioritize-accessibility-findings]
args:
  - name: product
    description: What the product or service is (online shop, banking app, e-book platform, ticketing, SaaS), who the customers are (consumers or businesses), where in the EU it is offered, company size, and the platforms (web, iOS, Android, kiosk).
    type: text
    required: true
  - name: current_state
    description: What you know about current accessibility - audits, WCAG level tested, known problems, existing statement - if anything.
    type: text
output_contract:
  format: markdown
  sections: [Scope questions for legal review, Likely technical requirements, Gap assessment, Readiness plan, What to confirm locally]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The European Accessibility Act (Directive (EU) 2019/882) has applied since 28 June 2025 to a defined list of products and services placed on the EU market, including e-commerce services, consumer banking services, e-books and their software, electronic communications, parts of passenger transport services (websites, apps, e-tickets, real-time information), and products such as computers, smartphones, e-readers, ATMs and ticketing or check-in machines. It applies to companies outside the EU that sell into it. Microenterprises (fewer than 10 staff and an annual turnover or balance sheet of no more than EUR 2 million) are exempt for services. There are transition periods for some existing products and contracts, and exceptions for disproportionate burden or fundamental alteration, which must be documented. Each member state transposes the directive into its own law with its own enforcement authority and penalties, so details vary. Technically, EN 301 549 (whose current version incorporates WCAG 2.1 AA for web content and applies much of it to software and documents) is the practical benchmark: it is the harmonised standard under the Web Accessibility Directive, and a version formally referenced for the EAA is being prepared, so the version that applies must be checked, and service providers must publish information on how their service meets the accessibility requirements. Scope decisions, especially for B2B services and mixed offerings, are legal questions; the engineering team's job is to give legal accurate facts and a credible technical plan.
</context>

<task>
Assess technical readiness for the European Accessibility Act.

<product>
{{product}}
</product>
{{#current_state}}
<current_state>
{{current_state}}
</current_state>
{{/current_state}}

1. State in one or two lines that this is technical preparation for a legal decision, not legal advice, and that scope and obligations must be confirmed with a qualified adviser for the member states involved.
2. List the facts legal will need to decide scope, and say which the user has given and which are missing: the service or product category, consumer versus business customers, member states, company size against the microenterprise thresholds, launch dates of the product and contracts, and any planned exemption claim.
3. Describe the likely technical requirements if in scope: conformance to EN 301 549 (in practice WCAG 2.1 AA for web content, plus the software, documentation and support chapters that apply), accessible identification, security and payment methods where the service uses them, accessible support channels and documentation, and published accessibility information for services. Keep this general and mark anything that depends on national law.
4. Assess gaps against what the user knows: which platforms and flows have never been tested, which known issues are likely blockers, which documents (statement, accessibility information, support process) do not exist.
5. Build a readiness plan: baseline audit of key journeys on each platform, fixes ordered by user impact, design system fixes first, regression checks in CI, an accessibility statement or service information, a feedback and complaints route, training, and a re-audit cadence. Include rough sequencing, not dates you cannot know.
6. List what must be confirmed locally: the national transposing laws, the enforcement authority, transitional provisions, and the current version of EN 301 549 referenced.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not tell the user they are or are not legally covered, or that they comply; give the facts and questions for legal review.
- Do not invent fines, deadlines beyond those stated, or national rules; say when something varies by member state.
- Do not present an accessibility overlay as a route to compliance.
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Scope questions for legal review
Table: question | what we know | what is missing.

## Likely technical requirements
Bullets, each marked general or depends on national law.

## Gap assessment
Table: area | current state | gap | risk to users.

## Readiness plan
Numbered phases with outputs.

## What to confirm locally
Bullets.
</output_format>
