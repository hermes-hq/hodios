---
schema: 1
id: declutter-overflowing-inbox
kind: prompt
title: Clear an overflowing inbox backlog
description: Plans getting from thousands of unread emails to a working inbox, with exact bulk-archive searches, a rescue pass for what matters, safe unsubscribes and a keep-up routine.
category: email
version: 1.0.0
status: incubating
stage: [operate]
role: [individual, manager, founder]
requires: [none]
inputs: [notes, preferences]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [inbox-zero, email-backlog, bulk-archive, unsubscribe, search-operators, digital-declutter]
pairs_with:
  prompts: [set-up-inbox-filters, triage-inbox, write-out-of-office-message]
args:
  - name: inbox
    description: Your email app (Gmail, Outlook, Apple Mail, other), roughly how many emails and unread, how old the backlog is, and whether it is work or personal.
    type: string
    required: true
  - name: senders
    description: What fills the inbox - newsletters, shop promotions, notifications from tools, mailing lists, colleagues, clients - and any senders or topics that must never be missed (boss, bank, school, a court or tax office).
    type: text
    required: true
  - name: time_available
    description: How much time you can give this (for example "two 30-minute sessions this week").
    type: string
output_contract:
  format: markdown
  sections: [Plan, Rescue pass, Bulk searches, Unsubscribe safely, Keep-up routine, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Nobody clears 20,000 emails by reading them. People who have dug out of a huge backlog do it in a fixed order: first rescue the few things that matter (searches for known important senders and words like invoice, contract, deadline), then archive in bulk by sender and age with the app's search operators, then unsubscribe from the biggest sources, and only then set up a routine and filters so it does not refill. Archiving is safer than deleting: everything stays searchable. Old unanswered emails from people usually deserve one short "catching up after a backlog" reply only if still relevant. Unsubscribe links in unknown or suspicious emails should not be clicked; mark them as spam instead.
</context>

<task>
Plan clearing this inbox.{{#time_available}} Time available: {{time_available}}.{{/time_available}}

<inbox>
{{inbox}}
</inbox>

<senders>
{{senders}}
</senders>

1. Plan: number sessions with what to do in each, sized to the time available. Session 1 is always the rescue pass, then bulk archive, then unsubscribe, then routine.
2. Rescue pass: give exact search queries for the user's app to find must-not-miss mail (by the senders named, and keywords such as invoice, contract, deadline, payment, appointment) within a recent window, and say to star, flag or move these to a "To do" label or folder before archiving anything.
3. Bulk searches: exact queries for the app, ordered by how much they clear: older than a cutoff (for example 90 days) excluding starred or flagged; promotional and social categories; specific noisy senders; notifications from named tools. For each, say how to select all results and archive, not delete. If the app is not Gmail, Outlook or Apple Mail, describe the approach generally and say the exact syntax should be checked in the app's help.
4. Unsubscribe safely: use the app's built-in unsubscribe option or the link in mail from senders the user recognises; for unknown senders mark as spam instead. Suggest handling the top ten senders by volume first.
5. Keep-up routine: a daily 10-15 minute process (reply, delegate, schedule, archive), and two or three filters to set up next.
6. Under Notes: anything to check first, such as work retention rules, shared mailboxes, or legal holds, where deleting would be a problem.
</task>

<constraints>
- Prefer archive over delete everywhere. Never suggest emptying trash or deleting work email in bulk without checking the employer's retention policy.
- Give search syntax only for apps you are confident about; mark anything uncertain as "check in your app". Do not invent menu names; describe them generically if unsure.
- No third-party clean-up tools or services that need mailbox access unless the user asks; if mentioned, note the privacy trade-off.
- Keep the plan realistic for the time given.
</constraints>

<output_format>
## Plan
Numbered sessions.
## Rescue pass
Queries and steps.
## Bulk searches
Table: query | what it clears | action.
## Unsubscribe safely
Bullets.
## Keep-up routine
Daily steps and filters to add.
## Notes
Checks and cautions.
</output_format>
