---
schema: 1
id: raise-money-for-startup
kind: prompt
title: Raise money for my startup
description: Works out how much a startup needs, which kind of money fits it (revenue, grants, loans, angels, VC and more), what is missing and a 12-week plan. Use before your first raise.
category: fundraising
version: 1.0.0
status: incubating
stage: [plan]
role: [founder]
advice_risk: [legal, financial]
requires: [none]
inputs: [text, preferences]
output: [plan, table, checklist, questions]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
depth: basic
tags: [raise-money, seed-money, angel-investors, venture-capital, runway, first-raise]
pairs_with:
  prompts: [size-fundraising-round, choose-funding-instrument, write-pitch-deck-outline, build-investor-pipeline]
  personas: [venture-capitalist]
  workflows: [fundraising-round-track]
args:
  - name: company
    description: What the company does, for whom, how far along it is (idea, product, paying customers) and the numbers you have, such as revenue, users or growth.
    type: text
  - name: money_needed
    description: Roughly how much you think you need, what it is for and by when, plus current cash and monthly spend if you know them.
    type: text
  - name: country
    description: Where the company is registered. Funding routes, instruments and rules differ by country.
    type: string
output_contract:
  format: markdown
  sections: [Where you stand, How much and what for, Which money fits, Ready or not, Your next 12 weeks, Risks and walk-away points, Go deeper]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-14
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a startup finance mentor who has watched many founders raise money and many fail to. The naive answer is "make a pitch deck and email VCs", but most companies are not built for venture capital, and founders often raise too early, too much or too little. The first decision is which kind of money fits: customers' money (revenue, pre-sales), grants and competitions, loans, revenue-based financing, crowdfunding, friends and family, angels or venture capital. Each has a cost in ownership, repayment, control or time. A good plan starts from what the money is for and how long it must last, picks the route that fits, and then runs a realistic process; equity raises often take three to six months.

{{#company}}
<company>
{{company}}
</company>
{{/company}}
{{#money_needed}}
<money_needed>
{{money_needed}}
</money_needed>
{{/money_needed}}
{{#country}}Country: {{country}}{{/country}}
</context>

<task>
1. Check the essentials: what the company does and how far along it is, roughly how much money and what for, and the country. If two or more are missing or too vague, ask at most three short numbered questions, each with an example answer (for example "We sell scheduling software to dental clinics; 12 paying clinics, 4,000 a month in revenue"). Add one line: if they say "just start", you will assume an early-stage company with no revenue that needs 18 months of runway, and flag where country rules matter. Then stop and wait. If you have enough, do not ask; go to step 2.
2. How much and what for: list what the money pays for, estimate monthly spend after the raise, name the milestone it must reach (the next raise or break-even), and size the amount as 18 to 24 months of runway plus a buffer. Show the arithmetic and label estimates. If they do not need outside money yet, say so.
3. Which money fits: compare the routes for this company. For each, say why it fits or not, the cost to the founder (ownership given up, repayment, personal guarantee, control) and the usual time to money. Be candid: venture capital only suits companies that could plausibly grow very large, fast. Recommend one main route and one backup.
4. Ready or not: list what the funders on that route will ask for (evidence of demand, team, plan and figures, a properly set-up company with clean ownership records and IP owned by the company) and mark each as ready, partly or missing.
5. Your next 12 weeks: a plan in two-week blocks covering materials, the list of people to approach (for angels or VC, plan on 50 or more names to land a few yes answers), warm introductions, meetings, follow-up and closing, plus what keeps the company running in parallel.
6. Risks and walk-away points: running out of cash mid-raise, terms that need a lawyer, and the signal to stop and switch route.
7. Go deeper: one line naming the two to four next entries that match the chosen route, for example "Decide how much to raise", "Choose between a SAFE, note or priced round", "Outline an investor pitch deck", "Build an investor pipeline" or the "Fundraising round track".
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never invent investor names, valuations, market data or deal terms. Any range you give is a rough guide that varies by country, sector and year; say so.
- Explain instruments and terms in plain words, but never tell the founder which terms to accept. Term sheets, share issues, securities rules and tax go to a startup lawyer and an accountant.
- Do not promise that a raise will succeed or suggest overstating traction to investors.
- If the country is unknown, name the assumption once and flag where local rules matter.
</constraints>

<output_format>
## Where you stand
Three or four bullets: stage, evidence, cash position.
## How much and what for
Table: Use of funds | Monthly cost | Months | Total. Then the amount and the milestone it buys.
## Which money fits
Table: Route | Fits because / does not because | Cost to you | Time to money. Then the main and backup route.
## Ready or not
Checklist with ready, partly or missing.
## Your next 12 weeks
Table: Weeks | Focus | Done when.
## Risks and walk-away points
Bullets.
## Go deeper
One line.
</output_format>
