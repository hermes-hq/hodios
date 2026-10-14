---
schema: 1
id: design-marketing-funnel
kind: prompt
title: Design a marketing funnel for a business
description: Designs a marketing funnel from first contact to repeat purchase for one offer, with the entry points, the asset and next step at each stage, follow-up for people not ready, and stage metrics.
category: marketing-strategy
version: 1.0.0
status: incubating
stage: [plan, design]
role: [founder, marketer, consultant]
requires: [none]
inputs: [text, notes]
output: [plan, table, diagram]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [marketing-funnel, customer-path, conversion-path, follow-up, lead-nurture]
pairs_with:
  prompts: [map-content-to-buyer-journey, analyze-conversion-funnel, create-lead-magnet, build-reverse-funnel-model]
  personas: [main-street-growth-advisor, growth-marketer]
args:
  - name: offer
    description: The product or service the funnel leads to, its price, who buys it, and how long people usually think before buying.
    type: text
    required: true
  - name: today
    description: How people find you and buy today, which channels you use, what happens to people who enquire or visit but do not buy, and any conversion numbers you know.
    type: text
    required: true
  - name: capacity
    description: Time per week and budget for marketing, and tools you have (email, website builder, booking or shop). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Funnel at a glance, Stages, Entry points, Follow-up for people not ready, After the sale, Metrics by stage, What to build first]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a marketing consultant who builds simple, working funnels for small and mid-sized businesses. Most businesses have a funnel by accident: some posts or ads, a website, and then nothing for the many people who are interested but not ready. Funnels built from online templates tend to be too long, too pushy, or built for a product that sells on impulse when the real purchase takes weeks of thought. A good funnel matches the buying decision: a cheap, low-risk purchase needs a short path; a considered purchase needs a useful next step at each stage, a way to stay in touch with people who are not ready, and a clear moment to ask for the sale. The stage after the sale (onboarding, reviews, referrals, repeat purchase) is where most small businesses leave money behind.
</context>

<task>
<offer>
{{offer}}
</offer>

<today>
{{today}}
</today>

{{#capacity}}
<capacity>
{{capacity}}
</capacity>
{{/capacity}}

1. If the offer, buyer or price is unclear, ask up to three questions and stop.
2. Decide the funnel length from the price, risk and thinking time, and say why.
3. Stages: for each stage (attention, interest, decision, purchase, after the sale), the buyer's question at that moment, the asset that answers it, and the single next step you ask them to take.
4. Entry points: the two or three channels that bring the right people in, matched to the user's capacity, and where each sends people.
5. Follow-up for people not ready: how to capture contact with consent (a useful lead offer, booking a call, saving a quote), the follow-up sequence in outline, and when to stop.
6. After the sale: onboarding or thank-you, review request timing, referral ask, and repeat or upgrade path.
7. Metrics by stage: one number per stage and the conversion between stages, with how to track it with the tools available; mark unknown rates.
8. What to build first: the order of work, starting with the biggest leak in today's path.
</task>

<constraints>
- Fit the funnel to the stated time and budget; do not propose assets the user cannot produce.
- No manipulative tactics (fake scarcity, hidden prices, pre-ticked consent).
- Do not invent conversion rates; mark assumptions.
{{> output/uncertainty}}
</constraints>

<output_format>
## Funnel at a glance
A one-line chain of stages with the next step at each.

## Stages
A table: Stage | Buyer's question | Asset | Next step.

## Entry points

## Follow-up for people not ready

## After the sale

## Metrics by stage
A table: Stage | Metric | How to track | Current or assumed.

## What to build first
</output_format>
