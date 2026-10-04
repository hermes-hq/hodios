---
schema: 1
id: extract-deal-details-to-crm
kind: prompt
title: Extract deal details for a CRM
description: Extracts deal fields (contacts and roles, need, budget, timeline, competitors, next step) from an email thread into JSON for a CRM, marking each as stated, inferred or missing with its source.
category: sales
version: 1.0.0
status: incubating
stage: [operate]
role: [sales-rep, founder, operations-manager]
requires: [none]
inputs: [message, text]
output: [table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [crm-hygiene, deal-fields, email-thread, field-provenance, structured-extraction]
pairs_with:
  prompts: [summarize-sales-call, review-sales-pipeline, write-sales-follow-up]
args:
  - name: thread
    description: The email thread, chat or message history about the deal, pasted with sender names and dates. Newest or oldest first is fine; say which if dates are missing.
    type: text
    required: true
  - name: fields
    description: The CRM fields you want, comma-separated with any allowed values (for example "stage - discovery, proposal, negotiation; amount; close_date"). Default uses standard deal fields.
    type: string
    default: standard deal fields
  - name: today
    description: Today's date (for example 2026-10-04), used to date undated messages and to judge how old the thread is; relative dates are converted from the date of the message they appear in.
    type: string
    required: true
output_contract:
  format: json
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You turn a messy deal thread into clean CRM fields for a sales rep, small business owner or admin assistant. CRM data goes wrong when people type what they hope rather than what the buyer said, when a "maybe Q2" becomes a firm close date, and when nobody can later tell where a number came from. Each field therefore carries its status (stated by the buyer, inferred from context, or missing) and the line it came from, so a manager can trust it and the rep can see what still needs asking.

Fields requested: {{fields}}
Today: {{today}}
</context>

<task>
<thread>
{{thread}}
</thread>

1. If "standard deal fields" is requested, use: account_name, contacts (name, role, email if shown, role_in_decision: decision_maker, influencer, champion, user, blocker or unknown), need, budget (amount, currency, period), timeline (target date, driver), decision_process, competitors_or_alternatives, products_or_scope, amount_estimate, stage (discovery, qualification, proposal, negotiation, verbal_yes, won, lost), next_step (action, owner, date), risks. Otherwise use exactly the fields requested, with their allowed values.
2. For each field, set status: "stated" when someone in the thread said it directly, "inferred" when it follows from context (give the reasoning in a few words), "missing" when the thread does not cover it. Put the shortest supporting quote in source, with the sender and date.
3. Convert relative dates from the date of the message they appear in ("next Thursday" in a 2 October email means the Thursday after 2 October), falling back to today's date only for undated messages, and note each conversion; leave vague timing ("sometime next year") as text with status inferred.
4. Never upgrade a hope to a fact: "we might have budget in Q2" is budget missing or inferred with a note, not a figure.
5. List the questions that would fill the missing or inferred fields that matter most (budget, decision process, next step).
</task>

<constraints>
- Output one JSON object and nothing else.
- Values come only from the thread. Do not invent emails, names, amounts or dates.
- Where two messages conflict, use the latest and note the conflict in notes.
- Use null for missing values, never empty strings or guesses.
- Keep personal data to what the CRM fields need; do not copy signatures, phone numbers or unrelated personal details unless a field asks for them.
- If the thread is empty, return {"error": "no thread provided", "questions": ["Paste the email thread or messages about the deal."]}.
</constraints>

<output_format>
One JSON object and nothing else:
{"account_name": {"value": "Northside Dental", "status": "stated", "source": "Priya, 2 Oct: 'we're Northside Dental'"}, "contacts": [{"name": "Priya Shah", "role": "Operations manager", "email": null, "role_in_decision": "champion", "status": "inferred", "source": "..."}], "need": {"value": "...", "status": "stated", "source": "..."}, "budget": {"value": null, "status": "missing", "source": null}, "next_step": {"value": {"action": "...", "owner": "...", "date": "2026-10-09"}, "status": "stated", "source": "...", "note": "'next Friday' in Priya's 2 Oct message"}, "...": {}, "conflicts": [], "questions_to_ask": ["..."], "notes": null}
</output_format>
