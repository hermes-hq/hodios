---
schema: 1
id: plan-newcomer-venture-start
kind: prompt
title: Plan a business start as a newcomer
description: Plans starting a business in a new country - right-to-work and registration questions to verify, bank and credit hurdles, local ways of doing business, support services and a small first step.
category: entrepreneurship
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [founder, individual]
requires: [none]
inputs: [text, notes]
output: [plan, checklist, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [newcomers, immigrant-entrepreneurs, right-to-work, business-registration, credit-history, local-business-culture]
pairs_with:
  prompts: [open-bank-account-as-newcomer, build-credit-history-from-zero, validate-business-idea, find-first-customers]
  workflows: [newcomer-first-month-track]
args:
  - name: country
    description: The country (and city or region) where you now live and want to trade.
    type: string
    required: true
  - name: idea
    description: The business you want to start, your experience with it in your home country, money you can put in, and languages you speak.
    type: text
    required: true
  - name: visa_status
    description: Your residence or visa type as written on your documents, and when it expires. Leave empty if you prefer not to say; the plan will list it as the first thing to check.
    type: string
output_contract:
  format: markdown
  sections: [First question - may you do this, Official steps to verify, Money and banking, How business works here, Smallest first step, Support to contact, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone who has recently moved to a new country plan starting a small business there. Newcomers often bring real skill and a network of people from their own community, and face hurdles locals do not see: the residence permit may not allow self-employment or may tie them to an employer; banks may refuse a business account without local history; credit and lease applications need a track record they do not have; qualifications may need recognition; and unwritten local norms about quoting, contracts, punctuality, payment terms and paperwork differ from home. Rules vary hugely by country and by permit type, so the most useful output is the right questions and where to verify them, not answers you cannot know.

Country: {{country}}
{{#visa_status}}Residence or visa status: {{visa_status}}{{/visa_status}}
</context>

<task>
<idea>
{{idea}}
</idea>

1. First question - may you do this: explain that whether they may be self-employed or run a company depends on their permit, and list exactly what to check on their documents and with the official immigration authority or an accredited immigration adviser before trading, including what happens to their status if the business fails or earns little. If no status was given, make this the first item.
2. Official steps to verify: the usual families of steps (choosing a business form, registering with tax and company authorities, a tax number, sector licences or qualification recognition, insurance, data protection, hiring rules), each phrased as "check whether" with the type of official source to use.
3. Money and banking: getting a personal account first, then a business account; what to do if refused (other banks, digital banks that accept newcomers, documents that help); starting without credit (own savings, small community or microfinance lenders, supplier terms built slowly); keeping business and personal money apart; records from day one.
4. How business works here: what to observe or ask locals about - how prices are quoted and negotiated, written quotes and contracts, payment terms and late payment norms, punctuality and formality, reviews and word of mouth, which customers expect invoices. Suggest learning by talking to two or three local owners in the same trade.
5. Smallest first step: a version of the idea they can test cheaply and legally once their status allows it - a market stall, a few paid jobs, a pop-up, selling to their own community first - and how to reach local customers beyond it.
6. Support to contact: types of support that often exist - local business support or enterprise agencies, chambers of commerce, newcomer or refugee entrepreneurship programmes, settlement agencies, libraries, community associations, mentors from their own community. Do not name specific organisations unless the user did.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never state immigration, tax or registration rules for the country, and never say their permit allows or forbids self-employment. List checks and official sources; recommend an accredited immigration adviser or lawyer for status questions.
- Do not suggest trading before they have confirmed they are allowed to, or working informally to avoid rules.
- Plain, simple English; short sentences; explain any local term the first time.
- Respect their experience; do not assume they are new to business.
- If the idea or country is missing, ask for it before planning.
</constraints>

<output_format>
## First question - may you do this
Three to six bullets.

## Official steps to verify
Checklist: Step | Where to check.

## Money and banking
Bullets.

## How business works here
Table: Topic | What to find out | Who to ask.

## Smallest first step
Short plan with the first four weeks.

## Support to contact
Bullets by type of support.

## Questions
What to bring to the immigration adviser, accountant and business support service.
</output_format>
