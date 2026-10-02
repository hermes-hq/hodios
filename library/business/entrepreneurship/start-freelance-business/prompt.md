---
schema: 1
id: start-freelance-business
kind: prompt
title: Start a freelance business
description: Sets up a freelance business - niche and offer, pricing model, portfolio, client acquisition, an admin and contract checklist, and a first-90-days plan. Use when going independent.
category: entrepreneurship
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, job-seeker, designer, writer]
inputs: [text, resume, notes]
output: [plan, checklist, message]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [freelancing, self-employment, niche, portfolio, client-acquisition, first-90-days]
pairs_with:
  prompts: [price-services, find-first-customers, write-elevator-pitch, plan-freelance-tax-set-aside]
  personas: [small-business-advisor]
args:
  - name: skills
    description: What you can do and for whom you have done it - roles, projects, results, tools, industries, and anything clients have praised. A pasted CV works.
    type: text
    required: true
  - name: market
    description: Where and whom you want to work for (country or remote, industries, company size), and any contacts or past clients who might hire you.
    type: text
  - name: runway
    description: How long you can live without freelance income, or your savings and monthly costs (for example "6 months", "8k savings, 1.9k a month costs").
    type: string
output_contract:
  format: markdown
  sections: [Positioning, Offer, Pricing model, Portfolio and proof, Client acquisition, Admin and contract checklist, First 90 days, Runway check, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people go independent and stay independent. New freelancers usually fail for three reasons: they position as a generalist who does "anything in X", they price by copying the lowest rates they see, and they do client work for weeks without a pipeline, so income stops when the first project ends. You set up a business that is specific, priced to sustain a life, and fed by a steady habit of finding work.
</context>

<task>
Set up this person's freelance business.

<skills>
{{skills}}
</skills>
{{#market}}
<market>
{{market}}
</market>
{{/market}}
{{#runway}}
Runway: {{runway}}
{{/runway}}

1. Positioning: propose two or three niche options that combine the person's strongest skills with a specific client type and problem (for example "conversion copy for B2B SaaS onboarding emails", not "copywriter"). For each, say why they are credible, how easy the clients are to reach, and willingness to pay. Recommend one and write a one-line positioning statement.
2. Offer: design two or three productised offers with a clear scope, deliverables, timeline and outcome (for example an audit, a fixed-scope project and a monthly retainer), including an entry offer that is easy to say yes to.
3. Pricing model: recommend day rate, project price, retainer or a mix, with the reasoning. Work out a minimum day rate: revenue needed = business costs (including the pension, insurance and equipment an employer used to cover) + pre-tax income target, where a take-home target is grossed up by the tax and social-contribution rate (a percentage the person must confirm locally) and a pre-tax target is not taxed twice; then divide by billable days (assume 50-60% of working days are billable in year one unless told otherwise). Show the sum.
4. Portfolio and proof: what to show with what they have now: case studies from past work (with permission and without confidential details), a spec or pro-bono project only if there is no proof, testimonials to request, and the minimum one-page site or profile.
5. Client acquisition: rank channels for this niche (past colleagues and employers, referrals, communities, partnerships with adjacent freelancers or agencies, content, marketplaces, direct outreach). Write a short warm message to past contacts and a cold outreach template that is specific and asks a small question. Set a weekly pipeline habit with numbers (for example 10 conversations started a week).
6. Admin and contract checklist: business registration, tax registration and bookkeeping, a separate bank account, invoicing and payment terms, deposits, a contract or terms covering scope, revisions, payment schedule, late fees, intellectual property transfer on payment, confidentiality, cancellation and liability, and insurance to consider. Phrase country-specific items as things to check.
7. First 90 days: a week-by-week plan for weeks 1-4 and a fortnightly plan for weeks 5-12, with weekly targets for outreach, conversations, proposals and signed work.
8. Runway check: months of runway against a realistic ramp (first paid work often takes 1-3 months to land and 30-60 days to be paid), and a trigger to change course or take part-time work.
</task>

<constraints>
- Use only the skills and experience given; do not inflate them. If a niche needs proof the person lacks, say how to get it.
- Do not invent market rates or statistics. If rates are needed, tell the person how to check them (peers, communities, published rate surveys, asking prospects about budgets) and mark any figure you use as an assumption.
- Tax, social contributions, business registration and contract law depend on the country. Give the checklist, not legal or tax advice, and recommend an accountant for registration and tax, and a lawyer or a reputable template for the contract.
- If runway is under three months, say so plainly and suggest a bridge (part-time contract, notice period overlap, first client before resigning).
</constraints>

<output_format>
## Positioning
Table: Niche option | Credibility | Reach | Willingness to pay. Then the recommendation and statement.
## Offer
One block per offer: Name, For, Scope, Deliverables, Timeline, Price basis.
## Pricing model
The sum shown step by step, then the recommended prices.
## Portfolio and proof
## Client acquisition
Ranked channels, the two message templates, the weekly habit.
## Admin and contract checklist
Checklist, with "check locally" marks.
## First 90 days
Table: Week | Focus | Targets.
## Runway check
## Questions
Facts to confirm that would change the plan.
</output_format>
