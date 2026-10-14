---
schema: 1
id: anonymize-text-before-ai
kind: prompt
title: Anonymise text before pasting it into an AI tool
description: Replaces names, clients, codenames and confidential figures in text with consistent stand-ins before you paste it into an assistant, with a restore key and a check for clues left behind.
category: prompt-engineering
version: 1.0.0
status: incubating
stage: [build]
role: [individual, consultant, manager, legal-professional]
requires: [none]
inputs: [text, document]
output: [rewrite, table, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [pseudonymisation, confidential-data, data-minimisation, safe-ai-use, restore-key]
pairs_with:
  prompts: [build-ai-output-review-checklist, write-office-copilot-prompts]
args:
  - name: text
    description: The text to anonymise, such as an email thread, report extract or meeting notes.
    type: text
    required: true
  - name: keep
    description: Optional - what the later AI task needs to keep (for example job titles, industry, rough company size, the order of events) and what it is for.
    type: text
output_contract:
  format: markdown
  sections: [Before you paste, Anonymised text, Restore key, Clues left behind, Restoring the answer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
People paste client emails, contracts and reports into AI tools that their organisation has not approved for that data. Removing names is not enough. Text is re-identified through indirect clues: a unique job title ("our only female CFO"), a small town, a dated event, an unusual figure, an email signature, a file name, a project codename. Good pseudonymisation is consistent (the same client is always [CLIENT_A]), keeps what the task needs (roles, sequence, proportions), scales or rounds figures when exact values are confidential, and comes with a key that stays with the user so the AI's answer can be mapped back. This prompt is meant to run in a tool the user is allowed to use with the original text, such as an approved workplace assistant or a local model, before the anonymised version goes anywhere else.

<text>
{{text}}
</text>
{{#keep}}
Keep for the task: {{keep}}
{{/keep}}
</context>

<task>
1. Start with a short reminder: only run this where the original text may be processed, and check the organisation's rules for the destination tool.
2. Find direct identifiers: people, companies, clients, products and codenames, emails, phone numbers, addresses, account, case and invoice numbers, URLs, signatures.
3. Find indirect identifiers: unique roles, small places, specific dates, distinctive events, exact confidential figures, and combinations that point to one person or deal.
4. Replace them consistently: [PERSON_1], [CLIENT_A], [PRODUCT_X], [CITY_1]; dates as relative ("day 1", "two weeks later") unless the exact date matters; confidential figures either rounded or multiplied by one stated factor so ratios stay true. Keep everything listed under "keep" when it is safe to.
5. Output the anonymised text with nothing else changed.
6. Build the restore key, and list any clues you chose to leave, with the risk.
7. Explain how to restore the answer: replace placeholders back, watch for placeholders the AI changed (plurals, possessives, "Client A" without brackets), and undo any scaling factor.
</task>

<constraints>
- Never put real values in the anonymised text, and tell the user to keep the restore key out of the destination tool.
- When unsure whether something identifies, replace it and say so.
- Do not claim the result is fully anonymous or compliant with any law; pseudonymised data can still be personal data.
- If the text contains special-category data (health, criminal records) or secrets such as passwords or keys, flag them and recommend removing them entirely rather than pseudonymising.
</constraints>

<output_format>
## Before you paste
Two or three bullets.
## Anonymised text
Fenced block.
## Restore key
Table: Placeholder | Original | Note (scaling factor, rounding).
## Clues left behind
Bullets with risk, or "None found".
## Restoring the answer
Numbered steps.
</output_format>
