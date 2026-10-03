---
schema: 1
id: write-partnership-proposal
kind: prompt
title: Write a partnership proposal
description: Writes a partnership or co-marketing proposal to another business with mutual value, one specific first collaboration, responsibilities and success measures, plus a short outreach message.
category: entrepreneurship
version: 1.0.0
status: incubating
stage: [build]
role: [founder, marketer, manager]
inputs: [text]
output: [docs, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [co-marketing, partnership, joint-promotion, business-development, cross-promotion]
pairs_with:
  prompts: [find-first-customers, write-elevator-pitch, write-event-sponsorship-proposal]
  personas: [small-business-advisor]
args:
  - name: your_business
    description: Your business - what you sell, to whom, your audience or customer numbers you can share honestly (mailing list, followers, footfall), and what you are good at.
    type: text
    required: true
  - name: partner
    description: The business you want to partner with - what they sell, their customers, anything you know about their goals or recent activity, and any existing relationship or contact.
    type: text
    required: true
  - name: idea
    description: Your partnership idea if you have one (for example a joint workshop, a bundle, a referral swap). Leave empty to get options.
    type: text
output_contract:
  format: markdown
  sections: [Overlap check, Options, Proposal, Outreach message, Open points]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write partnership proposals between small businesses that share customers but do not compete: a bike shop and a cafe, a yoga studio and a physio, a software tool and a consultancy. Most partnership pitches fail because they are about the sender ("we'd love more exposure"), propose something vague ("let's collaborate"), or ask for a big commitment from a stranger. Proposals that get a yes lead with what the partner gains, propose one small, specific, low-risk first collaboration with a date, split the work clearly, and say how both sides will know it worked.
</context>

<task>
Write a partnership proposal.

<your_business>
{{your_business}}
</your_business>

<partner>
{{partner}}
</partner>
{{#idea}}
<idea>
{{idea}}
</idea>
{{/idea}}

1. Overlap check: who the shared customer is, what each business has that the other lacks (audience, product, space, expertise, credibility), and any reason the partner might hesitate (competition for the same spend, brand mismatch, effort). If there is no real overlap, say so and stop after suggesting what kind of partner would fit better.
2. Options: if no idea was given, or the given idea is weak, propose three collaboration formats ranked by value to the partner and by effort - for example a joint event, a bundle or exclusive offer, a referral arrangement, content swap, shared mailing, or a co-branded product. For a given idea, test it against the same criteria and improve it.
3. Proposal: for the chosen collaboration, write a one-page proposal with these parts:
   - Opening that shows you know their business, in one or two sentences.
   - What is in it for them, with concrete benefits.
   - The first collaboration: what, when, where, for whom, and how customers will hear about it.
   - Who does what, in a table, with the work split fairly.
   - Costs and money: who pays for what and how any revenue or referral fees are shared; mark proposed figures for discussion.
   - Success measures agreed in advance (for example sign-ups, redemptions with a unique code, sales, new followers) and how each side will track them.
   - Timeline to the first collaboration, and a review point after it to decide whether to continue.
   - A clear, easy next step (a 20-minute call or a coffee, with two suggested times as placeholders).
4. Outreach message: a short email or DM (under 120 words) that opens the conversation and links to or attaches the proposal.
5. Open points: what should be agreed in writing before money or customer data changes hands.
</task>

<constraints>
- Lead with the partner's benefit; the word "exposure" alone is never a benefit.
- Use only numbers the user gave about their audience or results. Never invent figures about either business; use `[placeholder]` where a number would help.
- Keep the first collaboration small enough to run within about six weeks with no long-term commitment.
- Any sharing of customer lists or personal data must follow data-protection rules and customer consent; say so in Open points rather than proposing a raw list swap.
- If the partnership involves revenue sharing, exclusivity or joint products, recommend a short written agreement and, for larger sums, a lawyer's review.
- Plain, warm, direct language. No buzzwords such as "synergy" or "leverage".
</constraints>

<output_format>
## Overlap check
## Options
Table: Option | Value to them | Value to you | Effort | Risk. Then the recommendation.
## Proposal
The ready-to-send document with the sections above, including the responsibilities table.
## Outreach message
Subject line (for email), then the message.
## Open points
</output_format>
