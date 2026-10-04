---
schema: 1
id: evaluate-sponsorship-requests
kind: prompt
title: Evaluate sponsorship requests
description: Scores the sponsorship and donation requests a local business receives on audience fit, visibility, cost and goodwill, sets an annual giving budget and policy, and writes kind yes and no replies.
category: marketing-strategy
version: 1.0.0
status: incubating
stage: [plan, review]
role: [founder, marketer, operations-manager]
requires: [none]
inputs: [text, message]
output: [table, plan, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [sponsorship, donations, community-giving, scorecard, giving-policy]
pairs_with:
  prompts: [plan-cause-marketing-campaign, plan-local-advertising, plan-cross-promotion-with-neighbours]
  personas: [main-street-growth-advisor]
args:
  - name: requests
    description: The requests you have received - who asked, what for (school fair, sports team kit, charity raffle, programme ad), what they want (cash, vouchers, products, time), and what they offer in return. Paste the messages if you like.
    type: text
    required: true
  - name: annual_budget
    description: What you can give in a year in cash and in kind, in your currency. Optional; a range is proposed from your numbers otherwise.
    type: string
  - name: business
    description: What you sell, who your customers are, your area and the causes you care about. Optional but improves the fit scoring.
    type: text
output_contract:
  format: markdown
  sections: [Scorecard, Recommendations, Giving budget and policy, Replies]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help local shops, trades, restaurants and small firms handle the steady stream of sponsorship and donation requests: school fairs, sports teams, charity raffles, community events and programme adverts. Saying yes to everyone drains cash and stock with little to show for it; saying no to everyone costs goodwill in a community the business depends on. The answer is a small annual budget, a simple scorecard, and a giving policy the owner can point to, so decisions are quick, fair and consistent. Value comes from three different things that should be scored separately: reaching the right customers, being seen in a meaningful way, and genuine goodwill for causes the business and its customers care about.
</context>

<task>
<requests>
{{requests}}
</requests>

{{#annual_budget}}Annual budget: {{annual_budget}}{{/annual_budget}}

{{#business}}<business>
{{business}}
</business>{{/business}}

1. If the requests do not say what is being asked for, list what to ask the organiser and score what you can.
2. Score each request from 1 to 5 on: audience fit (are attendees or members likely customers, local, right age or life stage), visibility (real exposure: named in front of people, logo on kit worn every week, versus a name in a programme nobody keeps), cost (cash plus product at cost price plus staff time; 5 = cheapest), goodwill and values fit, and measurability (can you track a code or voucher). Show the total.
3. Recommend yes, yes with changes (for example vouchers instead of cash, a smaller amount, a stand at the event instead of an advert), or no, with a one-line reason.
4. Giving budget and policy: propose an annual budget (or use the given one) split between a few planned commitments and a small pot for ad hoc requests; criteria; how and by when to apply; one decision per month or quarter; what you ask in return (a mention, a stand, a photo you may share); and rotating support so the same groups do not always win.
5. Write replies: a warm yes with the agreed terms and what you need from them, a yes with changes, and a kind no that thanks them, gives the reason in policy terms, and offers something small or a future window where honest.
</task>

<constraints>
- Use only details given; no invented audience sizes or event facts. Mark gaps as [X].
- In-kind gifts are counted at cost, not retail price, and staff time is counted.
- Do not advise on tax deductibility, gift aid or charity registration rules; say to check with an accountant and confirm the organisation's status where it matters.
- Replies never shame the requester or compare them with other causes.
- Flag requests that could create reputational risk (alcohol at a youth event, political campaigns) for the owner's judgement.
</constraints>

<output_format>
## Scorecard
Table: Request | Ask | Real cost | Audience fit | Visibility | Cost score | Goodwill | Measurable | Total.

## Recommendations
Per request: decision and the one-line reason.

## Giving budget and policy
Budget split, then policy bullets ready to post on the website or counter.

## Replies
Three reply templates filled for the actual requests where possible.
</output_format>
