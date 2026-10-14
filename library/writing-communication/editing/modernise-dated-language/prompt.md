---
schema: 1
id: modernise-dated-language
kind: prompt
title: Modernise dated language
description: Updates old-fashioned phrasing such as "herewith", "the undersigned" and "please be advised", and outdated terms, in letters, templates and policies still in use, keeping meaning and formality.
category: editing
version: 1.0.0
status: incubating
stage: [maintain]
role: [operations-manager, manager, writer, individual]
requires: [none]
inputs: [text, document]
output: [rewrite, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [dated-language, templates, legalese, business-letters, outdated-terms]
pairs_with:
  prompts: [simplify-to-plain-language, inclusive-language-rules, reframe-negative-wording]
  personas: [editor]
args:
  - name: text
    description: The letter, template, policy or notice to modernise.
    type: text
    required: true
  - name: register
    description: How formal the result should stay, for example "formal, still suitable for a bank" or "friendly professional".
    type: string
    default: formal but modern
output_contract:
  format: markdown
  sections: [Edited text, Changes, Legal wording to check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Organisations keep using letters and templates written decades ago. Their language signals "old institution" and slows readers down: "please find enclosed herewith", "we are in receipt of your letter", "the undersigned", "kindly be advised", "pursuant to", "hereinafter", "at your earliest convenience", "Dear Sir/Madam", "Yours faithfully" mixed with "Yours sincerely", and dated terms (gendered job titles such as "chairman" and "foreman", "handicapped", "mankind", "fax", "telex"). Modernising is not the same as simplifying for a lower reading level: a formal letter from a bank can stay formal, just in today's formal English. Some old-sounding words are terms of art in contracts and regulations ("indemnify", "hereby" in a declaration), and changing them can change legal effect; those need a professional's check, not an editor's swap.
</context>

<task>
Modernise the language of this text. Register to keep: {{register}}.

<text>
{{text}}
</text>

1. If the text is empty, ask for it and stop.
2. Find dated phrasing: archaic connectives (herewith, hereinafter, aforementioned, whereby), stiff formulas (we are in receipt of, please be advised, kindly), outdated salutations and closings, dated or gendered terms, and old technology references.
3. Replace each with its modern equivalent at the requested register. Keep sentences formal if the register is formal; do not add contractions or chatty phrases unless asked.
4. Update salutations and closings to a consistent modern convention for the text's type (for example "Dear [Name]" with "Kind regards" or "Yours sincerely").
5. Do not change words that may be legal terms of art or required wording (declarations, statutory notices, contract clauses); list them for checking instead.
6. Return the full edited text.
</task>

<constraints>
- Keep every fact, date, amount, right, obligation and instruction exactly.
- Do not shorten or restructure beyond what modernising requires.
- Do not change names of laws, regulations or official forms.
- Keep the language variety (UK or US) of the original.
</constraints>

<output_format>
## Edited text
The full modernised text.
## Changes
A table: Dated wording | Modern wording | Reason.
## Legal wording to check
Bullets: phrases left unchanged because they may have legal effect, with a note to have them checked by whoever owns the legal wording. "None" if none.
</output_format>
