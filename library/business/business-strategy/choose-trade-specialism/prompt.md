---
schema: 1
id: choose-trade-specialism
kind: prompt
title: Choose a trade specialism
description: Helps a tradesperson decide whether to specialise (heat pumps, rewires, kitchens, roofs) or stay general on demand, margin, skills and certification, competition and a test before committing.
category: business-strategy
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [founder, individual]
subject: [construction]
requires: [none]
inputs: [text, notes]
output: [report, table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [trades, niche, specialisation, certification, job-mix, margin-per-day]
pairs_with:
  prompts: [evaluate-new-service-line, price-services, test-capacity-before-growth]
  personas: [small-business-advisor]
args:
  - name: trade
    description: Your trade, for example plumber, electrician, joiner, builder, roofer, decorator.
    type: string
    required: true
  - name: current_work
    description: Your current job mix - types of job, rough share of revenue and time each, typical price and margin, where leads come from, team size, and what you enjoy or dread.
    type: text
    required: true
  - name: interests
    description: Specialisms you are considering, and any qualifications, tools or contacts you already have. Optional; the prompt suggests options from your job mix if empty.
    type: text
output_contract:
  format: markdown
  sections: [Short answer, Your job mix, Options compared, "Skills, certification and cost", Test before committing, Assumptions and questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a tradesperson decide whether to become known for one kind of work or keep doing a bit of everything. Specialists usually win on price and referrals because customers and contractors trust them for one job, they get faster with repetition and they can say no to awkward small jobs. Generalists have steadier demand and less risk if a market turns (for example when grant schemes, regulation or energy prices change). The common mistakes: picking a specialism because it is in the news rather than because local demand and margin are there; underestimating the time and cost of certification, tools and insurance; and dropping the general work before the new work is proven. You compare options on margin per day, not price per job.
</context>

<task>
Trade: {{trade}}

<current_work>
{{current_work}}
</current_work>

{{#interests}}
<interests>
{{interests}}
</interests>
{{/interests}}

1. Your job mix: turn the current work into a table of job types with share of revenue, share of time and margin per working day (price minus materials and direct costs, divided by days). Mark the best and worst earners and where the leads come from.
2. Options: compare staying general, the specialisms named (or two or three that fit the job mix if none are named), and a "specialist-led general" option (lead with one specialism, keep selected general work). Score each on local demand evidence, margin per day, repeat and referral potential, seasonality, competition, fit with skills and enjoyment, and exposure to policy or grant changes.
3. Skills, certification and cost: for each specialism, the kinds of training, certification or registration, tools, vehicle and insurance changes typically needed, with time to qualify. State them as items to confirm with the relevant trade or certification body in the user's country; never state scheme names, fees or rules as fact.
4. Test before committing: a three-to-six-month test that does not drop existing income - for example take a short course, partner with an established specialist, quote a set number of specialist jobs, build a portfolio page - with measures (enquiries, win rate, margin per day) and a go or stop rule.
5. Check the arithmetic before answering.
</task>

<constraints>
- Use only the figures given; label any estimate.
- Never claim specific local demand, prices, grant schemes or certification rules as current fact; say where to check (trade bodies, local authority, suppliers, merchants, existing customers).
- Safety-critical and regulated work (gas, electrical, structural, working at height) must be done only with the right qualification; say so where relevant.
- If the trade or current work is missing, ask for it and stop.
{{> output/uncertainty}}
</constraints>

<output_format>
## Short answer
Two or three sentences: the option to test first and why.
## Your job mix
Table: Job type | Revenue share | Time share | Margin per day | Lead source.
## Options compared
Table: Option | Demand evidence | Margin per day | Repeat and referrals | Seasonality | Competition | Fit | Policy exposure.
## Skills, certification and cost
Table: Specialism | What is typically needed | Time | Cost (placeholder if unknown) | Where to confirm.
## Test before committing
Numbered steps, measures and the go or stop rule.
## Assumptions and questions
Bullets.
</output_format>
