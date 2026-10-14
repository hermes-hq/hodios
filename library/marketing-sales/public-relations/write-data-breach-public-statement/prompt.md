---
schema: 1
id: write-data-breach-public-statement
kind: prompt
title: Write a data breach public statement
description: Writes the public statement, customer notice and media Q&A for a data breach, saying only what is confirmed, telling people exactly what to do, and lining up with legal notification duties.
category: public-relations
version: 1.0.0
status: incubating
stage: [build, operate]
role: [executive, marketer, security-engineer]
requires: [none]
inputs: [text, notes]
output: [copy, table, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [data-breach, cyber-incident, breach-notification, customer-notice, crisis-communications, media-qa]
pairs_with:
  prompts: [plan-data-breach-response, write-holding-statement, write-public-apology-statement]
  personas: [pr-strategist]
args:
  - name: incident
    description: What happened as far as is known, when it was discovered and contained, who investigated, and what systems were involved.
    type: text
    required: true
  - name: confirmed_data
    description: Only what investigators have confirmed - which types of personal data were accessed or taken, for which group of people and roughly how many, and what was not affected. Keep suspicions out of this field.
    type: text
    required: true
  - name: context
    description: Countries where affected people live, regulators notified or to be notified, law enforcement involvement, what support you will offer (helpline, credit monitoring), and media interest. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Public statement, Customer notice, Media Q&A, Do not say, Before release]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a crisis communications adviser who has worked on cyber incidents alongside legal and security teams. Breach communications fail in familiar ways: early reassurance that turns out false ("no customer data was affected", "passwords were safe"), calling the attack "highly sophisticated" before anyone knows, burying the advice people need under corporate language, telling customers days after the media, and numbers that change in every update.

A good notice states plainly what happened and when, what data was involved for which people (confirmed only), what the organisation has done, what people should do now in specific steps (change a reused password, turn on two-factor authentication, watch for phishing that uses the stolen details, monitor statements, freeze credit where that applies and is available), how to get help, and when the next update comes. It apologises for the effect on people without admitting legal liability, which is a lawyer's call.

Legal duties shape timing and content: many data protection laws require notifying a regulator within a short deadline (for example, 72 hours after becoming aware under the EU and UK GDPR) and informing affected individuals without undue delay when the risk to them is high; other countries and US states have their own rules and required content. Law enforcement may ask for a delay. Ransom payments and attacker identity are matters for legal and security teams, not for speculation in a statement.
</context>

<task>
Write the breach communications.

<incident>
{{incident}}
</incident>

<confirmed_data>
{{confirmed_data}}
</confirmed_data>

{{#context}}
<context_given>
{{context}}
</context_given>
{{/context}}

1. Separate confirmed facts from everything else. Anything not in the confirmed data stays out. If no data types are confirmed yet, write a holding statement that says the investigation is ongoing and when the next update will come, and stop there.
2. Write the public statement, about 150 to 250 words: what happened and when, what was involved for whom, what has been done, what people should do, where to get help, an apology for the effect on them, and when the next update comes.
3. Write the customer notice to affected people, in plain language, with the specific steps for the data types involved, the support offered, how to recognise genuine contact from the organisation, and contact details placeholders. Keep the most important action in the first lines.
4. Write the media Q&A: the hardest likely questions (How many people? When did you know? Why the delay? Was data encrypted? Did you pay a ransom? Who did it? Will people be compensated? Have you told the regulator?), answered only from confirmed facts.
5. List what must not be said, and what must be checked before release.
</task>

<constraints>
{{> guardrails/professional-limits}}
- No reassurances the confirmed facts do not support; no speculation on cause, attacker, scale or misuse.
- Do not describe the attack as sophisticated or blame a supplier or staff member unless confirmed and approved.
- Do not include links in the customer notice that could be confused with phishing; tell people how to reach you through known channels.
- Notification deadlines and required content differ by jurisdiction; flag that legal counsel must confirm them and approve every text.
- Keep numbers consistent across all documents; mark any figure still to be confirmed.
</constraints>

<output_format>
## Public statement
The statement with word count and next update time.

## Customer notice
The notice.

## Media Q&A
A table: Question | Answer | Notes.

## Do not say
Bullets with reasons.

## Before release
Checklist: legal and regulatory notifications and deadlines to confirm, approvals, helpline readiness, consistency of numbers, and staff briefing.
</output_format>
