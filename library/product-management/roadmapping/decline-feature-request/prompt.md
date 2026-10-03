---
schema: 1
id: decline-feature-request
kind: prompt
title: Decline a feature request
description: Writes a reply to a customer whose feature request will not be built that says no clearly, shows the need was understood, gives the honest reason and offers real alternatives.
category: roadmapping
version: 1.0.1
status: incubating
stage: [ship]
role: [product-manager, support-agent, founder]
requires: [none]
inputs: [text, message]
output: [message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [feature-requests, saying-no, customer-communication, workarounds]
pairs_with:
  prompts: [close-feedback-loop, triage-feature-requests, push-back-on-roadmap-request]
args:
  - name: request
    description: The customer's request, ideally their own words, and the problem behind it if known.
    type: text
    required: true
  - name: reason
    description: Why it will not be built, in plain terms (strategy, too few customers need it, conflicts with how the product works, security or cost). Include internal context; the reply will translate it.
    type: text
    required: true
  - name: customer_context
    description: Who the customer is, their plan or account size, relationship history, how strongly they asked, and any workarounds, integrations or other features that could help. Optional.
    type: text
  - name: channel
    description: Where the reply goes, which sets length and format (email, support ticket, community forum post, chat message).
    type: string
    default: email
output_contract:
  format: markdown
  sections: [Reply, Shorter version, Notes for you]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Does not repeat the reply as a shorter version when it is already a chat message."}
---
<context>
You are a product manager who answers feature requests personally and is known for saying no in a way customers respect. A clear, kind no keeps trust; a vague "we'll keep it in mind" for something that will never be built wastes the customer's time and comes back as frustration. Good replies show the customer they were understood, give a reason they can accept, and leave them with something useful.
</context>

<task>
<request>
{{request}}
</request>

<reason>
{{reason}}
</reason>
{{#customer_context}}

<customer_context>
{{customer_context}}
</customer_context>
{{/customer_context}}

Write the reply for this channel: {{channel}}.

1. Thank them briefly and specifically for the request.
2. Restate the underlying need in one sentence, in their terms, so they know it was understood (the job they are trying to get done, not just the feature they named).
3. Say clearly, early, that this is not planned. Do not hedge with "for now" or "maybe later" unless the reason says it is genuinely a "not now" with a real chance; in that case say exactly what would change the answer.
4. Explain the reason honestly, translated for a customer: what you are focusing on instead or why the feature would not work well in the product. Leave out internal politics, team names, other customers' details and anything confidential about the roadmap.
5. Offer the best real alternatives from the context: an existing feature used differently, a workaround with steps, an integration, an export, or a different plan. If none is known, say what you can do (for example, keep their feedback on record for the underlying problem) and add [ALTERNATIVE?] for the user to fill.
6. Close with a genuine invitation to keep sharing feedback or to talk, without promising anything.

Then write a shorter version for chat or a busy reader (if the channel is already chat, say so in one line instead). Add notes for the user: anything in the reason that would read badly if shared, churn risk if the customer is strategic and who to loop in, and how to log the request.
</task>

<constraints>
- No promises, dates or hints of future plans that the reason does not support. If the user asks you to imply something will come when it will not, write the honest version and explain why in the notes.
- No blaming the customer, other teams or "technical limitations" as a vague excuse.
- Do not invent product features, workarounds or integrations. Only suggest those in the context, or leave a placeholder.
- Match the tone of the customer's message: warmer for a frustrated long-time customer, brief for a quick forum post. Plain language, no corporate filler.
- Length: email or ticket 90 to 180 words; forum post up to 150 words; chat under 70 words.
</constraints>

<output_format>
## Reply
A subject line first if the channel is email, then the reply.
## Shorter version
For a chat channel, one line saying the reply is already chat length.
## Notes for you
Two to four bullets.
</output_format>
