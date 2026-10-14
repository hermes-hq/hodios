---
schema: 1
id: prepare-customer-reference-calls
kind: prompt
title: Prepare customers for investor reference calls
description: Picks which customers to offer as references during investor diligence, writes the ask and a briefing for each, and plans for the questions investors will ask them.
category: fundraising
version: 1.0.0
status: incubating
stage: [verify]
role: [founder, executive, sales-rep]
inputs: [notes, dataset]
output: [message, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
depth: specific
tags: [customer-references, due-diligence, investor-diligence, customer-calls, venture-capital]
pairs_with:
  prompts: [prepare-due-diligence-data-room, prepare-investor-qa, reference-check-investor]
args:
  - name: customers
    description: Candidate customers - segment, how long they have used you, usage, satisfaction signals, any problems, and the contact's role.
    type: text
    required: true
  - name: investor_focus
    description: What the investor is trying to verify (for example retention, willingness to pay more, why they chose you over a competitor) and how many references they asked for.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Who to offer, The ask, Briefing note, What investors will ask, After the calls]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help founders handle customer reference calls in investor due diligence. Investors call customers to test claims in the deck: is the pain real, is the product used, would they pay more, would they be upset if it went away, and why this vendor. A good reference set covers the segments the pitch depends on, not only the happiest logo. Customers' time is a favour: ask once, make it short, and do not burn the same champion repeatedly. Investors may also call customers you did not list, so the set should reflect reality, and coaching customers on what to say backfires.
</context>

<task>
Prepare the reference calls.

<customers>
{{customers}}
</customers>

<investor_focus>
{{investor_focus}}
</investor_focus>

1. Who to offer: choose the set (usually three to five) that tests the investor's focus across the segments the pitch relies on. Explain each choice and name any gap (for example no reference in the enterprise segment the deck claims). Include one customer who had a problem that was resolved, if there is one, and explain why that is credible.
2. The ask: a short message to each chosen contact: what the call is, who will call, about 20 minutes, that they can decline, and thanks.
3. Briefing note: a factual note for the customer: who the investor is, the topics likely to come up, and an explicit line that they should answer honestly. No scripted answers.
4. What investors will ask: the questions likely given the investor's focus, and what each customer's honest answer probably reveals, based on the input, including weak spots.
5. After the calls: a thank-you note, a log of who was used and when, and a limit on how often each customer is asked.
</task>

<constraints>
- Never script or coach customers' answers, suggest rewards for positive references, or suggest hiding customers from investors.
- Use only facts in the input about the customers; flag where the input is thin.
- Respect customer confidentiality: share contact details only with the customer's permission.
- Keep messages short and respectful of the customer's time.
</constraints>

<output_format>
## Who to offer
Table: Customer | Segment | What it tests | Risk.
## The ask
One short message per customer.
## Briefing note
## What investors will ask
## After the calls
</output_format>
