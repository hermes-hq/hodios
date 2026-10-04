---
schema: 1
id: design-lead-form-ads
kind: prompt
title: Design lead form ads
description: Designs in-platform lead form ads that cut junk leads, with qualifying questions, higher-intent form settings, privacy text, the thank-you screen and a speed-to-lead follow-up script.
category: advertising
version: 1.0.0
status: incubating
stage: [design, build]
role: [marketer, sales-rep, founder]
requires: [none]
inputs: [text]
output: [copy, plan, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [lead-forms, lead-quality, qualifying-questions, speed-to-lead, instant-forms, follow-up-script]
pairs_with:
  prompts: [qualify-leads, reply-to-inbound-lead, plan-ad-conversion-tracking]
  personas: [local-ads-advisor, paid-media-specialist]
args:
  - name: offer
    description: What the form offers (quote, valuation, consultation, demo, guide, callback), the service or product behind it, area served, price range, and the platform (for example Meta instant forms, LinkedIn lead gen forms, Google lead forms).
    type: text
    required: true
  - name: ideal_lead
    description: Who you want and who you do not (job size, budget, location, timing, property type, company size), and the junk you get now (wrong numbers, people outside the area, students, people who forgot they filled it in).
    type: text
    required: true
  - name: follow_up_capacity
    description: Who follows up, how fast they can, and when (for example "me, between jobs, usually within 3 hours"; "2 SDRs, 9-18 weekdays"). Optional.
    type: string
output_contract:
  format: markdown
  sections: [Form strategy, Intro and offer, Questions, Privacy and consent, Thank-you screen, Follow-up script, What to measure]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user runs lead form ads, where the form opens inside the platform with the person's details pre-filled. These forms produce cheap leads and a lot of junk: people tap through without reading, forget they applied, or never intended to buy. Quality depends on deliberate friction (a question that only a real prospect can answer, a review screen before submit), on making the offer and the next step plain, and above all on speed: a lead called within minutes is far more likely to answer than one called the next day. Too much friction kills volume, so the job is to set the balance for the user's follow-up capacity.
</context>

<task>
<offer>
{{offer}}
</offer>

<ideal_lead>
{{ideal_lead}}
</ideal_lead>

{{#follow_up_capacity}}Follow-up capacity: {{follow_up_capacity}}{{/follow_up_capacity}}

1. If the offer, the area or the platform is unclear, or there is no description of a good lead, ask in one message and stop.
2. Form strategy: choose volume or higher-intent settings (for example a review or confirm step before submit, where the platform offers it), how many questions (two or three for a callback; up to five or six for a high-value quote), and whether to verify phone numbers. Base this on the job value and the follow-up capacity.
3. Intro and offer: a headline and two or three lines that state exactly what happens after submitting ("A local surveyor calls you within one working day to book a free 30-minute visit"), who it is for and who it is not for.
4. Questions: pre-filled contact fields (only those needed) and two to four qualifying questions as multiple choice where possible (budget band, timeline, postcode or area, job type, role). For each, the option that disqualifies or routes the lead, and how it is used. One short-answer question at most, to show intent.
5. Privacy and consent: the items the form must include (link to the privacy notice, what contact methods will be used, any marketing opt-in kept separate and unticked), and a note to confirm requirements for the country.
6. Thank-you screen: confirm what happens next and when, a button to call now or book a time directly, and what to prepare.
7. Follow-up script: first call within the time the capacity allows (target minutes, not hours), a voicemail and a text message, a second and third attempt schedule over two to five days, and the questions to confirm fit.
8. What to measure: cost per lead, contact rate, qualified rate, booked rate, cost per qualified lead and per sale, reviewed weekly.
</task>

<constraints>
- Do not ask for sensitive data (health details, financial account numbers, identity numbers) in the form unless essential and lawful; flag housing, credit and employment offers as restricted ad categories with limited targeting.
- Do not invent contact or conversion rates; describe direction and what to track.
- Make privacy wording a placeholder to be checked, not legal advice; suggest a privacy professional for unusual data use.
- Never write misleading offers ("free" when there is a catch) to raise volume.
</constraints>

<output_format>
## Form strategy
Bullets: setting, number of questions, why.

## Intro and offer
The text as it appears.

## Questions
A table: Field or question | Type | Options | Disqualifies or routes when.

## Privacy and consent
A checklist.

## Thank-you screen
The text and button.

## Follow-up script
Call opener, voicemail, text message, attempt schedule.

## What to measure
A small table: Metric | How to calculate | Review cadence.
</output_format>
