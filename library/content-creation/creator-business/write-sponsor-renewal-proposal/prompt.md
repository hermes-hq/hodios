---
schema: 1
id: write-sponsor-renewal-proposal
kind: prompt
title: Write a sponsor renewal proposal
description: Writes a creator's proposal to turn a finished sponsorship into a longer deal - honest results against the brand's goals, what was learned, multi-month package options, and the email.
category: creator-business
version: 1.0.0
status: incubating
stage: [ship, plan]
role: [content-creator, writer]
inputs: [dataset, notes, message]
output: [report, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [sponsor-renewal, campaign-results, long-term-partnership, sponsorship-packages, retention]
pairs_with:
  prompts: [build-creator-rate-card, pitch-brand-sponsorship, write-media-kit]
  workflows: [brand-deal-track]
  personas: [creator-business-manager]
args:
  - name: campaign
    description: The sponsorship that ran - brand, deliverables, dates, fee, what the brand said its goal was (awareness, sign-ups, sales), and anything the contact said about it.
    type: text
    required: true
  - name: results
    description: The actual numbers - views, watch time, clicks, code or link uses, sign-ups the brand reported, audience comments and questions - with where each figure came from.
    type: text
    required: true
  - name: proposal_idea
    description: Optional. What you would like next (for example a quarterly series, a 6-month ambassadorship, a higher fee) and anything you will not do.
    type: text
output_contract:
  format: markdown
  sections: [Results summary, What we learned, Proposed partnership, Options, Email]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Renewing a sponsor is usually easier and more valuable than finding a new one: the brand already knows the creator, and repeat mentions often work better than a one-off because the audience hears the product several times. Brand managers renew when they can show their own boss a result against the goal they had, so a renewal proposal leads with results in the brand's terms (sign-ups or code uses for performance goals, views and audience reaction for awareness), is honest when results were mixed, and explains what would make the next round work better. Longer deals should be priced as a package with clear deliverables per month, and any extra rights or exclusivity a longer deal implies should be priced, not given away. Sending the proposal within a couple of weeks of the campaign, while results are fresh, matters.
</context>

<task>
<campaign>
{{campaign}}
</campaign>

<results>
{{results}}
</results>

{{#proposal_idea}}
<proposal_idea>
{{proposal_idea}}
</proposal_idea>
{{/proposal_idea}}

1. **Results summary:** three to five lines tying each figure to the brand's stated goal, with the source of each figure. If results were below what either side hoped, say so plainly and note why that might be (placement, timing, offer, audience fit).
2. **What we learned:** audience questions, objections and comments that tell the brand something useful, and what format or placement worked best.
3. **Proposed partnership:** the structure (number of integrations over how many months, formats, timing), what changes from round one to improve results, and how results will be reported each month.
4. **Options:** two or three packages (for example a lighter and a fuller option), each with deliverables, length, any rights or exclusivity included, and price as the creator's own figures or [X] where they have not set one. Show that longer commitments trade a lower per-unit price for guaranteed volume, not free extras.
5. **Email:** a short email to the brand contact with the summary, the options and a clear next step.
</task>

<constraints>
- Use only the figures given; never inflate, round up favourably or invent benchmarks or industry averages.
- Do not hide weak results; a credible renewal admits them and proposes a fix.
- Do not set prices you were not given; use [X] and suggest working them out from the rate card.
- Sponsored content stays clearly disclosed in every package.
- Do not promise outcomes (sales, sign-ups) for the next round.
</constraints>

<output_format>
## Results summary
Table: goal | result | source.

## What we learned
## Proposed partnership
## Options
Table: option | deliverables | length | rights and exclusivity | price.

## Email
Subject line, then the body.
</output_format>
