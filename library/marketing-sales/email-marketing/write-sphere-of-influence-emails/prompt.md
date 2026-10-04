---
schema: 1
id: write-sphere-of-influence-emails
kind: prompt
title: Write sphere of influence emails
description: Plans a 12-month stay-in-touch email calendar for an agent, broker or independent professional's past clients, with useful content, client anniversaries and one soft referral ask per quarter.
category: email-marketing
version: 1.0.0
status: incubating
stage: [plan, build]
role: [sales-rep, consultant, founder]
subject: [real-estate]
requires: [none]
inputs: [text]
output: [plan, copy, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [past-clients, referrals, stay-in-touch, client-anniversary, content-calendar]
pairs_with:
  prompts: [write-just-listed-email, write-milestone-emails, set-email-frequency]
args:
  - name: profession
    description: What you do, for example "residential estate agent", "mortgage broker", "independent financial planner", "wedding photographer".
    type: string
    required: true
  - name: contacts_summary
    description: Who is on your list and roughly how many - past clients with dates, friends and family, professional partners - how they joined, and what you have sent them before.
    type: text
    required: true
  - name: local_area
    description: Town or area you serve, so local content ideas fit. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Segments, 12-month calendar, Sample emails, Referral asks, Tracking]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan stay-in-touch email for a professional whose next jobs come mostly from past clients and their friends: estate agents, mortgage brokers, independent advisers, photographers, accountants. Most of these programmes fail in one of two ways. Either the professional sends nothing for two years and is forgotten, or they send a monthly "Are you thinking of moving?" sales blast that people unsubscribe from. What works is one useful, short email a month, personal moments (the anniversary of a client's purchase or project), and a light referral ask a few times a year, so the professional is remembered without being a nuisance.

Profession: {{profession}}
{{#local_area}}Area served: {{local_area}}{{/local_area}}
</context>

<task>
<contacts_summary>
{{contacts_summary}}
</contacts_summary>

1. **Segments:** two to four groups (for example past clients, friends and family, professional partners, enquiries who never bought) with what each wants and how often to email them. Exclude anyone without permission to receive marketing.
2. **12-month calendar:** one broadcast email a month, each with a single job and a content type that fits the profession and season: a local market or seasonal update with sources the user will add, a useful checklist (home maintenance, year-end paperwork, a before-you-renew list), a local guide or event round-up, a personal note from the professional, a short client story with permission. Mark the months that carry the quarterly referral ask (four in the year).
3. **Triggered emails:** client anniversaries (one year after completion or project), with a short personal message and a useful extra (for an agent: a home-value check offer; for a photographer: prints or an album reminder).
4. **Sample emails:** write three in full - one content email, one anniversary email and one referral-ask email - each with two subject lines, a preheader and 80-150 words.
5. **Referral asks:** three soft wordings that ask for an introduction rather than a lead ("If someone you know is thinking about...") and a thank-you note for when a referral happens. If the user's profession restricts referral rewards, say to check before offering any.
6. **Tracking:** what to count each month (replies, clicks, referrals received, business from the list, unsubscribes) and when to change the plan.
</task>

<constraints>
- Do not invent market statistics, prices, interest rates or local news; mark where the user adds a sourced figure as [ADD SOURCED FIGURE].
- For regulated professions (mortgage, financial or legal advice), keep content general, avoid forecasts or personal recommendations, and note that promotions may need compliance sign-off.
- No pressure lines, no "I'm never too busy for your referrals" clichés, no fake personal touches the user cannot really do.
- If the contacts summary does not say how contacts joined, ask whether they agreed to receive emails, or mark the plan as conditional on consent.
</constraints>

<output_format>
## Segments
Table: Segment | Size if known | What they want | Frequency.

## 12-month calendar
Table: Month | Email topic | Job of the email | Referral ask (yes or no) | What to prepare.

## Sample emails
The three emails in full.

## Referral asks
Three wordings and the thank-you note.

## Tracking
Bullets with the review point.
</output_format>
