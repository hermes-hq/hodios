---
schema: 1
id: triage-dlp-alert
kind: prompt
title: Triage a DLP alert
description: Triages a data loss prevention alert by checking whether the matched data is really sensitive, whether the transfer fits the role and what intent signals exist, then closes, coaches or escalates.
category: security-operations
version: 1.0.0
status: incubating
stage: [operate]
role: [security-engineer]
requires: [none]
inputs: [text, logs]
output: [report, message, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [dlp, data-classification, false-positives, user-coaching, escalation]
pairs_with:
  prompts: [investigate-insider-data-exfiltration, tune-noisy-detection, triage-soc-alert]
  personas: [soc-analyst]
args:
  - name: alert
    description: The DLP alert - policy name, matched data type and count, a redacted snippet, channel (email, upload, USB, print, chat), destination, file name, user and time.
    type: text
    required: true
  - name: user_context
    description: Optional - the user's role and team, whether they are leaving, prior DLP history, and normal business partners for their job.
    type: text
  - name: policy
    description: Optional - your data handling policy and what analysts may do (contact the user, release a quarantined email, escalate to HR).
    type: text
output_contract:
  format: markdown
  sections: [Alert restated, Is the data sensitive, Is the transfer legitimate, Intent signals, Verdict, Action and note, Tuning suggestion]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most DLP alerts are not theft. Pattern detectors match test card numbers, order or invoice numbers that pass a Luhn check, sample data in documentation, and the user's own personal data being sent to themselves for a mortgage application. A large share of true matches are legitimate business: finance sending payroll to the payroll provider, HR sharing records with the benefits broker. The analyst's job is three quick judgements: is the data really what the policy is meant to protect, does this destination and volume make sense for this person's job, and are there intent signals such as renaming or zipping files with a password, sending to a personal address shortly before leaving, splitting data into many small sends, or trying again through another channel after a block. Analysts should look at no more content than needed to decide, because DLP evidence often contains the very personal data it protects.
</context>

<task>
Triage this alert:

<alert>
{{alert}}
</alert>
{{#user_context}}

<user_context>
{{user_context}}
</user_context>
{{/user_context}}
{{#policy}}

<policy>
{{policy}}
</policy>
{{/policy}}

1. Restate the alert: what matched, how many items, which channel, from whom to where.
2. Is the data sensitive: judge whether the matches are real (format, validity, context words, test values) and what classification the content has. Say what to check if the snippet is not enough.
3. Is the transfer legitimate: does the destination fit the user's role and known partners, is the volume normal, is there a ticket or contract that explains it, is it a personal address of the same person.
4. Intent signals: list any present or absent, citing the alert data.
5. Verdict: false positive, legitimate business, policy mistake needing coaching, or possible exfiltration needing escalation, with confidence.
6. Action and note: the next action within the analyst's permissions from the policy, and a short case note. If coaching fits, draft a brief, non-accusatory message to the user explaining the approved way to share that data.
7. Tuning suggestion: if it was a false positive or routine business flow, the narrowest change to the policy (exception for a specific partner domain, a context-word requirement, a minimum count) with its risk.
</task>

<constraints>
- Do not accuse the user or speculate about motive beyond the evidence.
- Do not reproduce sensitive data from the alert in the output; refer to it by type and count.
- Escalation to HR or legal follows the policy; if no policy is given, recommend escalation to the security lead rather than contacting HR directly.
- Tuning suggestions must not exempt whole users or whole channels.
{{> output/uncertainty}}
</constraints>

<output_format>
## Alert restated
Two or three lines.

## Is the data sensitive
Short judgement with reasons.

## Is the transfer legitimate
Short judgement with reasons.

## Intent signals
Table: Signal | Present? | Evidence.

## Verdict
One line with confidence.

## Action and note
Next action, case note, and the coaching message in a quote block if used.

## Tuning suggestion
One or two bullets, or "None".
</output_format>
