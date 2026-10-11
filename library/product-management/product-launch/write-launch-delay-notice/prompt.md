---
schema: 1
id: write-launch-delay-notice
kind: prompt
title: Write a launch delay notice
description: Writes the notices when a promised launch date slips - for waitlist, pre-order or beta customers, partners and staff - with the honest reason, the new date or when it is set, and what changes.
category: product-launch
version: 1.0.0
status: incubating
stage: [ship]
role: [product-manager, founder, marketer]
requires: [none]
inputs: [text, notes]
output: [message, post]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: intermediate
tags: [launch-delay, customer-communication, pre-orders, waitlist, expectation-setting]
pairs_with:
  prompts: [run-launch-go-no-go-review, write-launch-faq, write-launch-announcement]
args:
  - name: situation
    description: What was promised, to whom and where (email, site, press, contracts), the old date, the real reason for the slip, the new date or when it will be confirmed, and what is changing for people who paid or signed up.
    type: text
    required: true
  - name: audiences
    description: Which audiences need a version - for example waitlist, pre-order buyers, beta users, enterprise customers with contract dates, partners, press, staff. Optional; defaults to customers and staff.
    type: text
  - name: offer
    description: Anything offered to affected customers (refund, extension, credit, early access), with its terms. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Before you send, Customer notice, Other audience versions, Staff and support note, Public post]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a product lead who has had to move a public launch date. People forgive a delay much more readily than a surprise, a vague reason, or a second slip. Delay notices go badly when they arrive after the old date has passed, when the reason is corporate fog ("to deliver the best experience"), when the new date is a guess that slips again, when people who paid have to ask about refunds, and when support hears about it from customers. A good notice goes out before the old date, says in one sentence what is not ready, gives a new date only if the team is confident in it (otherwise a date by which the new date will be announced), tells paying customers their options plainly, and thanks people without grovelling. Rules on pre-orders and refunds vary by country and platform, so terms must come from the input.
{{#offer}}

Offer to affected customers:

<offer>
{{offer}}
</offer>
{{/offer}}
</context>

<task>
Situation:

<situation>
{{situation}}
</situation>

{{#audiences}}
Audiences: {{audiences}}
{{/audiences}}

1. Before writing, list checks for the sender: is the new date confirmed by the people who build it, are pre-order or contract obligations reviewed (refund rights, platform rules, contractual delivery dates, which differ by country and store), and is the notice going out before the old date.
2. Write the customer notice: subject line, the news in the first sentence, the honest reason in one or two sentences, the new date or the date by which it will be announced, what they need to do (usually nothing), their options if they paid, and a way to ask questions.
3. Write shorter versions for each other audience listed (if none are listed, name the audiences the situation implies, such as partners or press, and write versions only for those), adjusted for what they care about (partners: their own plans; enterprise: contract dates and an account contact; press: a factual statement).
4. Write an internal note for staff and support: what to say, what not to say, how to handle refund and cancellation requests, and where to escalate.
5. Write a short public post for the site or social channels if the date was announced publicly.
</task>

<constraints>
- Never invent a reason, a new date, refund terms or legal rights. Use [TBD] for anything missing and add it to the checks.
- No spin: do not describe a delay as an improvement or blame a vague third party; name the actual cause at a level the reader can understand.
- If the input has no confident new date, do not give one; give a date by which the next update will come.
- Make the options for paying customers easy to find, not buried below the fold.
</constraints>

<output_format>
## Before you send
Checklist.

## Customer notice
Subject line, then the message.

## Other audience versions
One subsection per audience.

## Staff and support note
Bullets, including what not to say.

## Public post
Under 80 words.
</output_format>
