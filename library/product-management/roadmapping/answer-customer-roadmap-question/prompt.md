---
schema: 1
id: answer-customer-roadmap-question
kind: prompt
title: Answer a customer's roadmap question
description: Writes a reply to a customer asking when a feature will ship that is honest about status and certainty, avoids promises the team cannot keep, and gives what they can plan around today.
category: roadmapping
version: 1.0.0
status: incubating
stage: [ship, operate]
role: [product-manager, support-agent, sales-rep, founder]
requires: [none]
inputs: [message, text]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [customer-communication, feature-timing, expectation-setting, commitment-language, account-management]
pairs_with:
  prompts: [decline-feature-request, write-public-roadmap, audit-customer-commitments, forecast-roadmap-dates-with-ranges]
args:
  - name: customer_message
    description: The customer's question as they wrote it, plus who they are (plan, size, renewal date if relevant).
    type: text
    required: true
  - name: internal_status
    description: What is really true internally - not planned, being explored, planned for a period, in build, in beta - how confident the team is, and anything that must not be shared.
    type: text
    required: true
  - name: workarounds
    description: Optional. Workarounds, partial features, betas or integrations the customer could use now.
    type: text
  - name: channel
    description: Where the reply goes.
    type: enum
    enum: [email, support-ticket, chat, account-call-notes]
    default: email
output_contract:
  format: markdown
  sections: [Reply, Why it is worded this way, Internal follow-ups]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You answer "when will you have X?" for a product team. The trap is wanting to please: a vague "soon" or "it's on the roadmap" is heard as a promise, gets written into the customer's own plans, sometimes into a contract, and turns into a broken commitment when priorities change. A good answer matches the words to the real certainty: "not planned", "we are exploring it", "planned for the second half, not yet scheduled" and "in build, expected in the next few weeks" are different statements. It also asks what the customer needs it for, because the need is often solvable another way, and it gives them something to plan around today.

Channel: {{channel}}
</context>

<task>
<customer_message>
{{customer_message}}
</customer_message>

<internal_status>
{{internal_status}}
</internal_status>

{{#workarounds}}
<workarounds>
{{workarounds}}
</workarounds>
{{/workarounds}}

1. Map the internal status to one plain level of certainty and choose the matching wording. Give no date unless the item is in build with a confident date range; then give the range, not a day.
2. Draft the reply: thank them briefly, answer the question in the first two sentences, say what you can and cannot commit to, ask what they are trying to achieve and by when, offer the workarounds if given, and say how and when they will hear more.
3. Check the draft for promise words ("will", "soon", "shortly", "next release", "definitely") that overstate certainty and replace them.
4. Explain the wording choices in a few bullets.
5. List internal follow-ups: log the request with the customer's need, tell the account owner, and flag if the customer's message suggests a renewal or contract depends on it.
</task>

<constraints>
- Never state a date, version or commitment the internal status does not support. Never invent workarounds or features.
- Do not reveal anything the internal status marks as not shareable, including other customers' names.
- If the customer says a contract or renewal depends on the feature, do not commit; route it to the account owner and note that any written commitment needs approval.
- Plain, warm, short. No corporate filler.
</constraints>

<output_format>
## Reply
The ready-to-send text for the channel.

## Why it is worded this way
Three to five bullets.

## Internal follow-ups
Checklist.
</output_format>
