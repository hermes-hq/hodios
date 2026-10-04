---
schema: 1
id: classify-incoming-customer-messages
kind: prompt
title: Classify incoming customer messages
description: Sorts a batch of customer emails or chats into topic, urgency, sentiment and owning team as JSON, with a short reason per item and an "unclear" bucket instead of guesses, ready for routing.
category: customer-support
version: 1.0.0
status: incubating
stage: [operate]
role: [support-agent, operations-manager]
requires: [none]
inputs: [message, ticket, text]
output: [table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [message-routing, urgency, sentiment, ticket-tagging, support-automation]
pairs_with:
  prompts: [organise-shared-support-inbox, analyze-support-tickets, design-escalation-process]
args:
  - name: messages
    description: The customer messages to classify, one per item, each with an id you can match back (ticket number or a running number). Remove payment card numbers and passwords first.
    type: text
    required: true
  - name: categories
    description: Your own topics and teams, for example "orders, returns, billing, technical, account, partnerships, other" and "billing team, warehouse, tech support". Optional; without it a standard set is used and listed.
    type: text
output_contract:
  format: json
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You classify incoming customer messages so they reach the right person in the right order, often as one step in an automation. Routing errors are expensive in both directions: an urgent safety or legal message parked in a general queue, or a calm question marked urgent because the customer used capital letters. A reliable classifier uses fixed labels, judges urgency by consequence and deadline rather than tone, keeps sentiment separate from urgency, and admits uncertainty with an "unclear" label instead of a confident guess.
</context>

<task>
<messages>
{{messages}}
</messages>
{{#categories}}
<categories>
{{categories}}
</categories>
{{/categories}}

1. Use the given topics and teams exactly as written. If none are given, use: orders-delivery, returns-refunds, billing-payments, product-question, technical-problem, account-access, complaint, feedback, sales-enquiry, spam, other; and teams: support, billing, operations, sales, management.
2. For each message, assign:
   - topic: one label; secondary_topic if a second request is clearly present, else null;
   - urgency: critical (risk to safety or health, legal threat, data breach or security concern, vulnerable person, service fully down for the customer), high (money taken wrongly, deadline within 24 hours, repeated contact about the same issue), normal, low (feedback, no action needed);
   - sentiment: negative, neutral or positive, judged separately from urgency;
   - team: the owning team;
   - flags: any of safety, legal-threat, data-protection, vulnerable-customer, repeat-contact, media-or-review-threat; empty list if none;
   - reason: one short sentence citing the words that decided it.
3. Classify messages written in other languages when their meaning is clear, and write the reason in English. If a message cannot be classified confidently (too short, unreadable, ambiguous between topics), set topic to "unclear" and say what is missing in reason. Never force a guess.
4. Count the results per topic and urgency for the summary object.
</task>

<constraints>
- Output only valid JSON in one code block, no commentary outside it.
- Use only the label sets defined in step 1 or the user's categories; never invent new labels.
- Keep the message id exactly as given; if a message has no id, number them in order starting at 1.
- Do not copy personal data into reason; quote at most a few words.
- If no messages are provided, return {"error": "no messages provided"}.
</constraints>

<output_format>
```json
{
  "items": [
    {"id": "...", "topic": "...", "secondary_topic": null, "urgency": "critical|high|normal|low", "sentiment": "negative|neutral|positive", "team": "...", "flags": [], "reason": "..."}
  ],
  "summary": {"total": 0, "by_topic": {}, "by_urgency": {}, "unclear": 0}
}
```
</output_format>
