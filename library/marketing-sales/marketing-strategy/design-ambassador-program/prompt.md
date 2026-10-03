---
schema: 1
id: design-ambassador-program
kind: prompt
title: Design a brand ambassador programme
description: Designs a brand ambassador or community advocate programme with goals, selection criteria, tiers and rewards, activities, disclosure guidelines, operations and measurement.
category: marketing-strategy
version: 1.0.0
status: incubating
stage: [plan, design]
role: [marketer, founder, content-creator]
requires: [none]
inputs: [text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [ambassador-program, brand-advocates, community-marketing, word-of-mouth, endorsement-disclosure]
pairs_with:
  prompts: [plan-influencer-campaign, design-referral-program, plan-online-community-launch]
args:
  - name: brand
    description: The brand, what it sells, its values and tone, existing fans or community (customers who post, user groups, students, members), budget range, and who would run the programme.
    type: text
    required: true
  - name: audience
    description: Who the ambassadors should reach, for example university students, home bakers, indie game developers, runners in a city.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Programme goals, Ambassador profile, Recruitment and selection, Tiers and rewards, Activities, Guidelines, Operations, Measurement, Budget, Risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a community marketing lead who has built ambassador programmes for consumer and B2B brands. Ambassadors are not influencers with a smaller fee: they are real users who already like the brand and are trusted by a specific community. Programmes work when the brand picks a few genuine fans, gives them status, access and useful things to do, keeps the asks light and clear, and treats them as partners. They fail when the brand recruits for follower counts, pays for scripted posts, or lets people promote without disclosing the relationship, which breaches advertising rules such as the FTC Endorsement Guides in the US and the CAP Code in the UK.
</context>

<task>
Design an ambassador programme for this brand to reach {{audience}}.

<brand>
{{brand}}
</brand>

1. Programme goals: two or three goals tied to business outcomes (for example new customers in a segment, content for owned channels, product feedback, event attendance), each with a measure.
2. Ambassador profile: who makes a great ambassador (product use, credibility in {{audience}}, values fit, communication style) and red flags. Make follower count a minor factor.
3. Recruitment and selection: where to find candidates (existing customers, reviewers, community members, nominations), the application questions, a simple scoring rubric, and the starting cohort size.
4. Tiers and rewards: two or three tiers with entry criteria, what ambassadors get at each (early access, product, exclusive events, recognition, commission or stipend if any), and how they move up. Prefer status and access, with cash used deliberately and disclosed.
5. Activities: a menu of things ambassadors can do, with effort level and expected value, and a light monthly minimum.
6. Guidelines: disclosure rules (clear labels such as "#ad" or "brand ambassador" at the start of posts, platform paid-partnership tools), honest claims only, the brand's no-go topics, and what happens if guidelines are broken. Include a one-page guideline summary for ambassadors.
7. Operations: onboarding kit, communication channel, monthly rhythm, how content is shared and reused (with permission), contracts and offboarding.
8. Measurement: per-ambassador codes or links, content produced, community activity, feedback gathered, and cost per outcome, reviewed quarterly.
9. Budget: a rough breakdown with assumptions labelled.
10. Risks: ambassador misconduct, burnout, inauthentic posts, legal exposure, and mitigations.
</task>

<constraints>
- Every paid or gifted relationship is disclosed; never design programmes that hide the relationship or require positive reviews.
- If {{audience}} includes minors, say that working with under-18s needs parental consent and extra safeguards, and recommend legal review.
- Do not invent budgets or results; label estimates.
- Remind the user to have ambassador agreements reviewed by a lawyer in their market.
- If the brand description is too thin to tailor (no product, no audience fit), ask for it and stop.
</constraints>

<output_format>
## Programme goals
## Ambassador profile
## Recruitment and selection
Including the scoring rubric as a table.
## Tiers and rewards
A table: Tier | Entry criteria | Rewards | Expectations.
## Activities
A table: Activity | Effort | Value.
## Guidelines
Rules, then the one-page summary for ambassadors.
## Operations
## Measurement
## Budget
## Risks
</output_format>
