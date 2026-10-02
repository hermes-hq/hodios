---
schema: 1
id: close-feedback-loop
kind: prompt
title: Close the feedback loop
description: Writes personal replies to users whose feature request shipped, partly shipped or was declined, segmented by request, with honest reasons, how to use it or alternatives, and next steps.
category: user-feedback
version: 1.0.0
status: incubating
stage: [ship, operate]
role: [product-manager, support-agent, founder]
requires: [none]
inputs: [text, dataset]
output: [message, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [customer-communication, feature-requests, declined-requests, customer-trust]
pairs_with:
  prompts: [triage-feature-requests, write-launch-announcement, decline-request-gracefully]
args:
  - name: requesters
    description: Who asked and what they asked for - name or placeholder, company, plan, the request in their words, and when - as a list or table.
    type: text
    required: true
  - name: outcome
    description: What happened - shipped (what exactly, how to access it, any limits), partly shipped, or declined (and the honest reason), plus any workaround or alternative.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Segments, Messages, Send checklist]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a product manager who writes back to the people who asked for things. Closing the loop builds trust and turns requesters into early adopters, but only if the message is personal, specific and honest. Generic "we've shipped exciting updates" blasts do not count. Declines delivered honestly, with a reason and a useful alternative, keep more goodwill than silence or vague "it's on our roadmap" replies.
</context>

<task>
Requesters:

<requesters>
{{requesters}}
</requesters>

Outcome:

<outcome>
{{outcome}}
</outcome>

1. Group the requesters into segments by what they asked for and how the outcome applies to them: fully covered by what shipped, partly covered (they asked for more than shipped), or declined. Further split by audience if it changes the message (for example admins versus end users, or paying customers versus free users).
2. For each segment, write one message template with personalisation fields in square brackets ([first_name], [their request in their words], [date they asked]):
   - **Shipped:** thank them for the request and say it influenced the work (only if true according to the input), say exactly what is now possible, how to get to it in one or two steps, any limits, and invite a reply with feedback.
   - **Partly shipped:** what is included, what is not yet and honestly whether it is planned (no dates unless given), and how to make the most of what exists now.
   - **Declined:** acknowledge the need behind the request, give the honest reason in a sentence, offer a workaround or alternative if one exists, and say what would make you reconsider if that is true.
3. Write a subject line for each message (or a first line, for in-app or chat).
4. Write a short send checklist: verify each recipient is still a customer and in the right segment, check the feature is live for their plan and region, personalise the request line, decide the sender (a named person, not a no-reply address), and log the reply on the request record.
</task>

<constraints>
- Plain, warm and specific. Under about 120 words per message body.
- No internal jargon, code names, ticket numbers or team names.
- Do not promise dates, future features or reconsideration unless the outcome says so.
- Do not overstate the requester's influence ("we built this just for you") unless the input supports it.
- If the outcome is unclear about access, plans or limits, write the message with a placeholder and list the question first.
</constraints>

<output_format>
## Segments
Table: segment | who (count) | what they asked | outcome for them.

## Messages
For each segment: the subject line, then the message body.

## Send checklist
A checklist.
</output_format>
