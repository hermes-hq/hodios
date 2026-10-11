---
schema: 1
id: reactivate-past-clients
kind: prompt
title: Reactivate past freelance clients
description: Plans a one-off campaign to reconnect with dormant past clients - who to contact first, a genuine reason for each, short check-in messages with a light offer, and how to handle replies.
category: freelancing
version: 1.0.0
status: incubating
stage: [build]
role: [consultant, designer, writer, software-engineer]
requires: [none]
inputs: [text, dataset]
output: [plan, message, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [past-clients, client-reactivation, repeat-business, check-in-message, client-acquisition]
pairs_with:
  prompts: [build-freelance-pipeline-routine, ask-clients-for-referrals, announce-freelance-availability, pitch-retainer-to-client]
  personas: [freelance-business-advisor]
args:
  - name: past_clients
    description: A list of past clients (company or a short label, not personal details), what you did for each and when, how it went, and anything you know has changed since (new product, funding, new hire, rebrand).
    type: text
    required: true
  - name: offer
    description: What you can offer now (new service, availability from a date, a small fixed-price project) and how much work you want. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Priority list, Messages, Reply handling, Tracking]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help freelancers win work back from past clients, the way experienced independents fill a quiet month. What they know: past clients who were happy are the cheapest and warmest source of new work, and most drift away simply because nobody reminded them; a message needs a genuine reason (something changed for them, a relevant idea, a result from the work you did together, a new service that fits them) or it reads as a sales blast; the contact may have changed jobs, which is both a reason to message the old company and a lead at the new one; the ask should be light ("worth a quick catch-up?") with one concrete idea; messages should be sent personally, a few a day, not as a mass email; and clients where the work ended badly are usually better left alone unless something has clearly been repaired.

<past_clients>
{{past_clients}}
</past_clients>
{{#offer}}
<offer>
{{offer}}
</offer>
{{/offer}}
</context>

<task>
1. Priority list: rank the clients by likelihood and value (good outcome, recent, fits the offer, a known change), and mark any to skip with the reason.
2. Messages: for each of the top five to eight clients, a personal message under 90 words with a genuine reason based on what the user said, one specific idea or offer, and a light ask. Mark any detail to verify (for example a contact who may have moved on).
3. Reply handling: short replies for "yes, let's talk", "not now, maybe later" (with a follow-up date), "we have someone else", and a referral to a colleague.
4. Tracking: a simple table to track who was contacted, when, the response and the next step, and a reminder to repeat lightly every six months.
</task>

<constraints>
- Use only facts the user gave; do not invent news about clients, results or mutual contacts. Mark assumptions to verify.
- No mass-email phrasing, guilt, or discount offers unless the user asks.
- Use company names or labels only; no personal data beyond what is needed.
{{> output/uncertainty}}
</constraints>

<output_format>
## Priority list
Table: Client | Last work | Outcome | Reason to reach out | Priority.
## Messages
One per client, ready to send.
## Reply handling
## Tracking
Table template.
</output_format>
