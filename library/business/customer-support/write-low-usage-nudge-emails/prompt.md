---
schema: 1
id: write-low-usage-nudge-emails
kind: prompt
title: Write emails for customers who stopped using key features
description: Writes in-life emails that re-engage paying customers whose use of key features dropped, triggered by usage signals, each offering one helpful action and a way to reach a person.
category: customer-support
version: 1.0.0
status: incubating
stage: [operate]
role: [support-agent, manager, marketer, founder]
subject: [saas]
requires: [none]
inputs: [dataset, text]
output: [copy, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [re-engagement, product-adoption, churn-prevention, lifecycle-emails, usage-triggers]
pairs_with:
  prompts: [design-customer-health-score, write-customer-success-plan, design-cs-coverage-model]
args:
  - name: product_and_signals
    description: "What the product does, the key features that deliver value, and the usage signals you can trigger on (for example no reports created in 21 days, a team that stopped inviting users, seats unused). Include what customers usually get stuck on."
    type: text
    required: true
  - name: audience
    description: "Who receives these (admins, end users, small businesses, enterprise teams), the plan they are on, and what help you offer (help articles, webinars, a CSM, support chat). Optional."
    type: text
  - name: voice
    description: "Your brand voice in a few words, or a sample email. Optional."
    type: text
output_contract:
  format: markdown
  sections: [Triggers, Emails, Sending rules, Hand to a person, Measuring it]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write adoption emails for customer success and support teams. These go to paying customers who have not left but whose use has dropped, which is the cheapest moment to prevent churn. They fail when they read like marketing ("We miss you! Check out our new features"), when they guilt the customer ("You haven't logged in for 30 days"), when they fire on a signal that does not mean disengagement (a seasonal business, a holiday), or when they offer everything at once. A good nudge is triggered by a specific drop in a feature tied to value, guesses the likely reason, offers one concrete helpful step (a two-minute guide, a template, a short call), comes from a real person or team, and makes replying easy. Repeated nudges with no response should reach a person, not just send more email.
</context>

<task>
Write the nudge emails.

<product_and_signals>
{{product_and_signals}}
</product_and_signals>
{{#audience}}
<audience>
{{audience}}
</audience>
{{/audience}}
{{#voice}}
<voice>
{{voice}}
</voice>
{{/voice}}

1. Define three to five triggers from the signals given: the exact condition (feature, threshold, period), why it suggests disengagement, false alarms to exclude (new accounts, seasonal pauses, accounts with an open support ticket), and the likely reason behind each.
2. For each trigger write one email: a subject line that names the useful thing, not the absence; a short body that names the situation without blame, offers one helpful action linked to the likely blocker, and invites a reply; and a sender that is a real role or team. Keep each under about 120 words.
3. Write one follow-up for the most important trigger, sent only if there is no change, with a different angle.
4. Set sending rules: no more than one nudge per account in a set period, stop on any response or recovery, exclude accounts in renewal talks or with open complaints, and respect marketing and contact preferences.
5. Say when to hand to a person: the account size or signal that triggers a CSM or support call instead of email.
6. Define measurement: recovery of the feature use within a set number of days, reply rate, and a holdout group to see whether the emails make a difference.
</task>

<constraints>
- Do not invent features, metrics or results; use [X] where a link or name is needed.
- No guilt, fake urgency or discounts used as bait.
- These are service messages to existing customers; do not add promotional content that would change their legal status, and mark [CHECK consent rules for your country] where relevant.
- Do not mention tracking in a creepy way (for example quoting exact click counts back to the customer).
</constraints>

<output_format>
## Triggers
Table: Trigger | Condition | Exclude | Likely reason.
## Emails
For each: Trigger, Subject, Body, Sender.
## Sending rules
## Hand to a person
## Measuring it
</output_format>
