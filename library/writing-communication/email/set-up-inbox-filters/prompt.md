---
schema: 1
id: set-up-inbox-filters
kind: prompt
title: Set up inbox filters
description: Designs an email label or folder scheme plus exact filter rules for Gmail, Outlook or Apple Mail from a sample of incoming mail, with a daily processing routine. Use for an overloaded inbox.
category: email
version: 1.0.0
status: incubating
stage: [plan, build]
role: [individual, manager, founder, executive]
requires: [none]
inputs: [text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [email-filters, inbox-rules, labels, email-organization, inbox-zero, unsubscribe]
pairs_with:
  prompts: [triage-inbox, build-email-templates]
args:
  - name: email_client
    description: The email app the rules will live in. Other covers clients such as Thunderbird, Fastmail or Proton; the plan then uses generic conditions and actions.
    type: enum
    enum: [gmail, outlook, apple-mail, other]
    required: true
  - name: sample_senders_and_subjects
    description: A list of 30 or more recent emails as "sender address | subject", copied from your inbox or a search. More variety gives better rules. Remove anything confidential first.
    type: text
    required: true
  - name: priorities
    description: What must never be missed and what you rarely need, for example "my two biggest clients and my manager always visible; receipts only at month end; newsletters read on Fridays".
    type: text
output_contract:
  format: markdown
  sections: [Pattern summary, Label scheme, Filter rules, Unsubscribe or mute, Daily routine, Setup notes]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most overloaded inboxes are not a volume problem but a mixing problem: messages from people who need a reply sit between notifications, receipts, newsletters and CC-only threads, so everything gets the same attention. Filing systems with dozens of topic folders make it worse, because filing becomes a second job and search already finds old mail. What works is a small action-oriented scheme (five to eight labels at most), filters that pull machine-generated and low-priority mail out of the inbox automatically, a short list of senders that must always stay visible, unsubscribing instead of filtering where possible, and a fixed routine for processing what is left. Filters must never hide mail from people who need a reply, and auto-delete is almost never worth the risk.
</context>

<task>
Design an inbox filter setup for {{email_client}}.

<sample>
{{sample_senders_and_subjects}}
</sample>
{{#priorities}}
<priorities>
{{priorities}}
</priorities>
{{/priorities}}

1. If the sample has fewer than about 15 messages or gives no senders, ask for a larger sample in "sender | subject" form and stop.
2. Classify the sample into groups: people needing a reply, people FYI or CC, automated notifications (tools, calendars, systems), transactional (receipts, invoices, shipping), newsletters and marketing, mailing lists or group mail, and possible phishing or spam. Count each group.
3. Propose a label or folder scheme of at most eight, named by what you do with the mail (for example "Read later", "Receipts", "Notifications", "Waiting on"), not by topic. Explain each in one line.
4. Write the filter rules, most important first, one per row, using only domains and addresses that appear in the sample (or the priorities):
   - For Gmail: the exact search query using operators such as `from:`, `to:`, `list:`, `subject:`, `has:attachment`, `OR`, `-` and `{}`, followed by the actions (skip the inbox, apply label, mark as read, never send to spam, mark as important).
   - For Outlook: the rule as conditions and actions in Outlook's terms (from, subject includes, sent only to me, my name in Cc; move to folder, categorise, mark as read), noting that some conditions only run while the desktop app is open in classic Outlook.
   - For Apple Mail: the rule as conditions and actions, noting that Mac Mail rules run only while Mail is open on that Mac, and that iCloud mail rules on the web run on the server but support fewer conditions.
   - For other: generic condition and action pairs.
   Start with a "keep visible" rule for the priority senders (star, mark important, or VIP) so later rules can never bury them.
5. List senders to unsubscribe from or mute instead of filtering, drawn from the sample's newsletters and marketing.
6. Flag any sample items that look like phishing (lookalike domains, urgent payment or password requests) and recommend reporting them, never filtering them into a trusted label.
7. Write a daily routine: two or three set processing times, the order to work through labels, the two-minute rule for quick replies, and a weekly ten-minute review of the filters.
8. Setup notes: test each Gmail query in the search box before creating the filter, apply to existing mail only after checking the results, and which menus to look for (as general names; menu labels change between versions).
</task>

<constraints>
- Never suggest an auto-delete rule, or a rule that skips the inbox for mail from a person (as opposed to a system), unless the priorities ask for it, and then flag the risk.
- Never invent senders, domains or list ids that are not in the sample or priorities.
- At most eight labels and about twelve rules; merge rules that share an action using OR.
- Mark anything you are unsure of in the client's current interface as "check in your version".
- Plain instructions a non-technical person can follow.
</constraints>

<output_format>
## Pattern summary
A short table: group, count, examples from the sample.
## Label scheme
Bullets: label and what it means.
## Filter rules
Numbered rules, each with the exact query or conditions, then the actions.
## Unsubscribe or mute
Bullets of senders.
## Daily routine
Short numbered steps.
## Setup notes
Bullets, including any phishing flags.
</output_format>

<examples>
Gmail rule: `from:(noreply@github.com OR notifications@atlassian.net)` → Skip the inbox, apply label "Notifications", mark as read.
</examples>
