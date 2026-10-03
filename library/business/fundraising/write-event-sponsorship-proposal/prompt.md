---
schema: 1
id: write-event-sponsorship-proposal
kind: prompt
title: Write an event sponsorship proposal
description: Writes a corporate sponsorship proposal for an event or nonprofit - audience data, tiered packages with benefits and pricing, activation ideas and how results will be reported to the sponsor.
category: fundraising
version: 1.0.0
status: incubating
stage: [build]
role: [founder, marketer, manager]
inputs: [text, dataset]
output: [docs, table, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [sponsorship, sponsorship-tiers, corporate-partnerships, sponsor-activation, event-sponsorship]
pairs_with:
  prompts: [plan-fundraising-event, write-partnership-proposal, write-case-for-support]
  personas: [nonprofit-advisor]
args:
  - name: event_or_cause
    description: The event or organisation - what it is, date and place, purpose, history and results of past editions, and what sponsorship money pays for.
    type: text
    required: true
  - name: audience_data
    description: Who you reach and how many - attendees and their profile, mailing list, social followers and engagement, press coverage, past sponsor results. Only figures you can stand behind.
    type: text
  - name: target_sponsor
    description: A specific company or type of company you are approaching, and what you know about their goals, customers or community priorities. Leave empty for a general proposal.
    type: string
output_contract:
  format: markdown
  sections: [Fit summary, Proposal, Packages, Activation ideas, Reporting to the sponsor, Cover email, Before you send]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a sponsorship manager who sells event and charity sponsorships to companies. Sponsors do not buy logos; they buy access to an audience they care about, association with a cause or experience their customers or staff value, and evidence that it worked. Proposals that win are short, specific to the sponsor's goals, priced on value with clear tiers, offer activation (ways for the sponsor to do something, not just appear) and promise a results report. Proposals that lose are generic "Gold, Silver, Bronze" lists of logo placements with no audience data.
</context>

<task>
Write a sponsorship proposal{{#target_sponsor}} for {{target_sponsor}}{{/target_sponsor}}.

<event_or_cause>
{{event_or_cause}}
</event_or_cause>
{{#audience_data}}
<audience_data>
{{audience_data}}
</audience_data>
{{/audience_data}}

1. Fit summary: the sponsor goals this opportunity can serve (reach a customer segment, staff engagement, community reputation, product sampling, recruitment, content), why this audience matters to them, and any fit risks (brand clash, the cause's own policies on certain sectors, a competitor already sponsoring). If no target sponsor was given, list the types of sponsor that fit best.
2. Proposal (2 pages or less): an opening that names the sponsor's goal, the event or cause in three sentences, the audience with numbers from the data, what the sponsorship pays for, the packages, activation highlights, how results will be reported, and the next step with a deadline tied to print or production dates.
3. Packages: three to four tiers plus a few à la carte items (for example a stage, a run route water station, an auction, a volunteer day). For each: name, price, number available (exclusivity at the top), benefits grouped as visibility, access and hospitality, activation, and content or data, and the value logic behind the price (cost to deliver plus reach and exclusivity). Tie benefits to the audience; avoid padding with low-value placements. Mark prices as proposals for the organiser to confirm.
4. Activation ideas: three to five ways the sponsor can engage the audience that fit the event and their goals (sampling, a branded experience, staff team participation, a matched-giving moment, co-created content), with what each needs from both sides.
5. Reporting to the sponsor: what will be measured and delivered after the event (attendance, impressions with method, leads or sign-ups if consented, photos, a short impact summary), and when.
6. Cover email: under 150 words, specific to the sponsor, with one clear ask.
7. Before you send: facts to verify, figures marked as estimates, the contract points to agree in writing (deliverables, payment terms, logo approval, cancellation and refund, exclusivity, data sharing), and any tax or regulatory checks on sponsorship versus donation for the organisation.
</task>

<constraints>
- Use only the audience figures given. Never invent attendance, reach, demographics or past sponsor results; where a number would help, add `[DATA NEEDED: ...]`.
- Distinguish reach from engagement and do not inflate impressions; state how any estimate was made.
- No sharing of attendee personal data with the sponsor without consent; leads must come from people who opt in.
- Respect the organisation's ethics: flag sponsors whose products may conflict with the cause or its audience (for example alcohol at a youth event) and suggest checking the organisation's sponsorship or gift-acceptance policy.
- Sponsorship with significant benefits may be treated differently from donations for tax and accounting; tell the organisation to check with its accountant, without stating rules.
</constraints>

<output_format>
## Fit summary
## Proposal
The ready-to-send document.
## Packages
Table: Tier | Price | Available | Visibility | Access | Activation | Content and data. Then à la carte items.
## Activation ideas
## Reporting to the sponsor
## Cover email
## Before you send
</output_format>
