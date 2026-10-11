---
schema: 1
id: write-ticket-auto-acknowledgement
kind: prompt
title: Write a ticket auto-acknowledgement
description: Writes the automatic reply sent when a customer opens a ticket - honest response time, self-help by topic, the details to add, and urgent routes - so follow-up chasers drop.
category: customer-support
version: 1.0.0
status: incubating
stage: [build]
role: [support-agent, operations-manager, founder]
requires: [none]
inputs: [text, notes]
output: [message, copy]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: off
level: beginner
tags: [auto-reply, ticket-acknowledgement, response-time, self-service, deflection]
pairs_with:
  prompts: [plan-out-of-hours-support, write-help-center-article, build-support-macros]
  rules: [support-tone-rules]
args:
  - name: business
    description: What you sell, who your customers are, the brand voice, and your sign-off.
    type: text
    required: true
  - name: response_times
    description: Your realistic first-response times by channel, priority or plan, and your support hours with time zone.
    type: text
    required: true
  - name: top_topics
    description: The five or so most common contact reasons with a help article or self-service link for each (use placeholders if links are not ready), and what details each needs (order number, screenshots, device).
    type: text
    required: true
  - name: urgent_route
    description: How customers get urgent help (outage, safety, security, account locked) if different from a ticket. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Subject line, Auto-reply, Short version for chat or SMS, Notes for setup]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write the automatic reply customers receive the moment they open a support ticket. Most auto-replies waste the one message every customer reads: "We have received your request and will respond as soon as possible." That vague promise causes the follow-up "any update?" emails that clog queues, and those chasers often reset the ticket to the bottom. A good acknowledgement confirms the ticket reference, gives an honest response time in the customer's terms (business hours, weekends), solves the commonest problems right there with one link each, asks for the missing details that would otherwise cost a back-and-forth, says what to do if it is urgent, and tells customers that replying to the same thread keeps their place.
</context>

<task>
<business>
{{business}}
</business>

<response_times>
{{response_times}}
</response_times>

<top_topics>
{{top_topics}}
</top_topics>

{{#urgent_route}}
<urgent_route>
{{urgent_route}}
</urgent_route>
{{/urgent_route}}

1. Write a subject line with a ticket reference placeholder written as `[TICKET_ID]`, to be mapped to the helpdesk's own placeholder.
2. Write the auto-reply:
   - one line confirming the request is in and the reference;
   - the response time stated honestly, including hours, weekends and time zone;
   - "While you wait" with each top topic as one line and one link placeholder;
   - "To help us help you faster": the two to four details most often missing;
   - the urgent route, if any;
   - one line saying to reply to this email rather than open a new ticket;
   - sign-off in the brand voice.
3. Keep it under about 160 words and readable on a phone.
4. Write a short version (under about 40 words) for chat or SMS acknowledgements.
5. In Notes for setup, list the placeholders to map in the helpdesk, when to send a different version (out of hours, high volume, priority plans), and one line on reviewing it when response times change.
</task>

<constraints>
- Use only the response times given; never write "as soon as possible" or promise faster than the stated times.
- Use placeholders such as `[LINK: order tracking]` for links not given; do not invent URLs.
- No marketing, upsells or surveys in the acknowledgement.
- Do not say "do not reply" in an email customers are meant to reply to.
</constraints>

<output_format>
## Subject line
One line.

## Auto-reply
Ready to paste.

## Short version for chat or SMS
One or two lines.

## Notes for setup
Bullets.
</output_format>
