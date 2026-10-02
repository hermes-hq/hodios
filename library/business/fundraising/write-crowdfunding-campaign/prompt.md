---
schema: 1
id: write-crowdfunding-campaign
kind: prompt
title: Write a crowdfunding campaign
description: Writes a rewards crowdfunding page - headline, story, video script, reward tiers, stretch goals, risks section and update plan, with the budget maths checked. For creators and makers.
category: fundraising
version: 1.0.0
status: incubating
stage: [build, plan]
role: [founder, content-creator, artist, individual]
inputs: [text, notes]
output: [copy, script, table, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [crowdfunding, kickstarter, indiegogo, reward-tiers, stretch-goals, campaign-page]
pairs_with:
  prompts: [write-elevator-pitch, plan-online-store, write-donor-appeal]
args:
  - name: project
    description: What you are making, why, who it is for, progress so far (prototype, samples, previous projects), the team, the production plan and timeline, and costs per unit if known.
    type: text
    required: true
  - name: funding_goal
    description: The amount you need to raise and what it pays for (for example "18,000 - tooling 7k, first run of 500 units 6k, packaging 1k, shipping and fees 4k").
    type: string
    required: true
  - name: rewards
    description: Reward ideas you already have, their cost to produce and ship, and any existing audience (email list, followers). Leave empty to have tiers proposed.
    type: text
output_contract:
  format: markdown
  sections: [Goal check, Headline and short pitch, Story, Video script, Reward tiers, Stretch goals, Risks and challenges, Launch and update plan, Gaps]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help creators and makers run reward-based crowdfunding campaigns. Campaigns are usually decided before launch: by the audience built in advance, a goal that covers real costs, and reward tiers priced so that every pledge makes money after production, shipping, platform and payment fees. Most failed or broken campaigns underestimated fulfilment costs, set the goal too high for their audience, or promised delivery dates without slack. Backers forgive delays when updates are honest; they do not forgive silence.
</context>

<task>
Write the campaign.

<project>
{{project}}
</project>

Funding goal: {{funding_goal}}
{{#rewards}}
<rewards>
{{rewards}}
</rewards>
{{/rewards}}

1. Goal check: verify the goal covers production, fulfilment and shipping, platform and payment-processing fees (as a percentage the user should confirm for their platform), reward costs, taxes where relevant, and a contingency of about 10-15%. Show the sum. Estimate how many backers the goal needs at the average pledge, and compare with the audience described. If the goal looks too high or too low, say so and suggest a revised goal.
2. Headline and short pitch: a project title, a one-line subtitle that says what it is and who it is for, and a two-sentence summary for the top of the page.
3. Story: the page copy in sections: what it is (with the key benefit up front), why you made it, how it works or what makes it different, proof of progress (prototype, samples, previous delivery), who you are, and where the money goes (a simple breakdown).
4. Video script: 2-3 minutes, with a hook in the first 10 seconds, the problem or desire, the product in use, the maker's story, proof, rewards and the ask. Give shot notes alongside the lines.
5. Reward tiers: 5-8 tiers including an early-bird tier with a limited quantity, the core product tier, a bundle or multi-pack, and one or two higher tiers. For each: price, what backers get, cost to fulfil including shipping, margin after fees, quantity limit, and estimated delivery month. Flag any tier that loses money.
6. Stretch goals: two or three that improve the product for all backers without adding fulfilment risk, each with the amount and the cost logic.
7. Risks and challenges: an honest section naming the real risks (manufacturing, supplier delays, certification, shipping, customs) and how each is managed, with buffer built into the delivery date.
8. Launch and update plan: pre-launch steps (email list, pre-launch page, press and community outreach), the first 48 hours, a mid-campaign plan, and an update schedule through fulfilment with what each update covers.
</task>

<constraints>
- Use only the facts given. Never invent backers, press coverage, testimonials, certifications or production quotes; mark missing facts as [NEEDED: …] and list them under Gaps.
- Arithmetic must be exact. Platform and payment fee percentages, shipping rates and taxes are assumptions for the user to confirm.
- Delivery dates include slack; do not promise a date the production plan cannot support.
- Do not imply a pledge is a purchase with guaranteed delivery if the platform's terms say otherwise; tell the user to read their platform's rules on rewards, refunds and fulfilment obligations.
</constraints>

<output_format>
## Goal check
The cost sum, backers needed, verdict.
## Headline and short pitch
## Story
## Video script
Table: Time | Shot | Line.
## Reward tiers
Table: Tier | Price | Includes | Cost to fulfil | Margin after fees | Limit | Delivery.
## Stretch goals
## Risks and challenges
## Launch and update plan
## Gaps
</output_format>
