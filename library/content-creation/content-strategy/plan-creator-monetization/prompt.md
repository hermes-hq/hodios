---
schema: 1
id: plan-creator-monetization
kind: prompt
title: Plan creator monetization
description: Compares monetisation options for a creator's audience and niche, from sponsorships to products, memberships and services, with rough maths and a staged plan. Use before choosing how to earn.
category: content-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [content-creator, writer, founder]
inputs: [text, preferences, dataset]
output: [plan, table, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [monetization, creator-economy, revenue-model, digital-products]
pairs_with:
  prompts: [write-media-kit, pitch-brand-sponsorship, mine-audience-questions]
  personas: [content-strategist]
args:
  - name: audience
    description: Audience size and engagement per platform (followers, typical views or opens, email list size), who they are, and what they already ask you for.
    type: text
    required: true
  - name: niche
    description: The niche or topic, for example "home espresso", "UX careers", "budget travel in Asia".
    type: string
    required: true
  - name: current_income
    description: What the content earns today, from which sources, what you want it to earn, and how many hours you can give it.
    type: text
output_contract:
  format: markdown
  sections: [Snapshot, Options compared, Recommendation, Staged plan, Cheap tests, What to track, Not now]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a creator business adviser. Monetisation depends less on follower counts than on three things: how engaged and reachable the audience is (an email list you own beats a feed you rent), how much the audience's problems are worth solving, and how well an offer fits the trust the creator has built. Each model has its own maths:
- **Sponsorships:** reach × a rate per thousand views or listens, priced by niche and engagement; needs consistent reach and suits audiences brands want.
- **Affiliates:** clicks × conversion rate × commission × order value; suits niches with real purchase decisions and products the creator uses.
- **Digital products** (guides, templates, courses): reachable audience × purchase rate × price; needs a clear problem the creator can solve repeatably.
- **Memberships and paid newsletters:** engaged audience × conversion to paid × monthly price, minus churn; needs ongoing value and time.
- **Services** (consulting, coaching, done-for-you): few buyers at a high price; often the fastest first income for a small audience with expertise, but it trades time for money.
Smaller audiences usually earn first from services, affiliates for tools they genuinely use, or a small product; sponsorships and memberships tend to need larger or highly specific audiences.
</context>

<task>
<audience>
{{audience}}
</audience>

Niche: {{niche}}

<current_income>
{{current_income}}
</current_income>

1. **Snapshot.** Summarise the reachable audience (owned versus rented channels), engagement, the problems the audience pays to solve in this niche, the creator's credibility, and the hours available. List the assumptions you are making.
2. **Options compared.** For each model, assess fit with this audience and niche, effort to set up, time to first income, risks to trust, and rough monthly revenue as low, base and high cases. Show the formula and every input. Inputs come from the user's numbers; where you must assume a rate (conversion, purchase rate, rate per thousand), state it as an assumption, use a cautious range, and say how to check it.
3. **Recommendation.** The one or two models to start with and why, and what would change the recommendation.
4. **Staged plan.** What to do in months 0 to 3, 3 to 6 and 6 to 12, including building owned reach (an email list) if it is weak.
5. **Cheap tests.** How to validate demand before building: pre-sales, a waitlist, a paid pilot, a survey to the email list, or a single affiliate test, each with a success threshold set in advance.
6. **What to track.** Revenue by source, revenue per engaged follower or subscriber, conversion rates, refund and churn rates, and hours spent per unit of income.
7. **Not now.** Options to skip for the moment, with the reason.
</task>

<constraints>
- Present all money figures as rough, assumption-driven estimates with the formula visible, never as predictions or promises. Do not cite specific market rates as facts.
- Prefer options that fit the trust the creator has built; flag offers that would strain it (unrelated sponsors, aggressive upsells, products the creator would not use).
- Mention once that selling products or services can bring tax, VAT or sales-tax, and consumer-law obligations that vary by country, and suggest checking with an accountant; do not give tax advice.
- Remind the creator that sponsorships and affiliate links must be disclosed to the audience.
- If audience numbers are missing or vague, ask for them or state a clearly labelled assumption.
</constraints>

<output_format>
Use the section headings from the output contract, in order. Put Options compared in a table with columns: model | fit | setup effort | time to first income | trust risk | monthly estimate (low / base / high) | formula and assumptions.
</output_format>
