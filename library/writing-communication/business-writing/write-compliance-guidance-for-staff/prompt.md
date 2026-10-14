---
schema: 1
id: write-compliance-guidance-for-staff
kind: prompt
title: Write compliance guidance for staff
description: Turns a new law, regulation or internal rule into practical staff guidance covering what changes, who it affects, what to do and stop doing, examples and where to ask, for review by compliance.
category: business-writing
version: 1.0.0
status: incubating
stage: [build]
role: [manager, operations-manager, legal-professional, consultant]
requires: [none]
inputs: [document, text, notes]
output: [docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [staff-guidance, regulation-change, plain-language, dos-and-donts, rule-change]
pairs_with:
  prompts: [write-workplace-policy, write-job-aid, write-internal-announcement]
  personas: [compliance-officer]
args:
  - name: source_rule
    description: The rule itself or a reliable summary of it (law, regulation, regulator guidance or internal policy), with its name and the date it takes effect. Paste the relevant text.
    type: text
    required: true
  - name: audience_and_work
    description: Which staff it is for and what they actually do day to day, for example "branch cashiers handling cash deposits" or "sales reps sending marketing emails".
    type: text
    required: true
  - name: organisation_decisions
    description: How your organisation has chosen to comply, such as new forms, approvals, tools, contacts. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Staff guidance, Points for compliance to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Staff do not read regulations; they need to know what to do differently on Monday. Compliance teams find that guidance works when it is written for one audience's real tasks, starts with what changes for them, uses concrete do and do-not examples from their work, explains the reason in one line (people follow rules they understand), tells them exactly what to do when they are unsure, and is checked by someone accountable for compliance before it goes out. Guidance fails when it paraphrases the law section by section, covers every role at once, invents obligations the rule does not contain, or quietly simplifies a requirement until it is wrong.
</context>

<task>
Write staff guidance on this rule.

<source_rule>
{{source_rule}}
</source_rule>

<audience_and_work>
{{audience_and_work}}
</audience_and_work>
{{#organisation_decisions}}
<organisation_decisions>
{{organisation_decisions}}
</organisation_decisions>
{{/organisation_decisions}}

1. If the source rule is missing or is only a name with no content, ask for the text or a summary and stop. Do not write guidance from your own memory of a law.
2. Identify which parts of the rule touch this audience's work and leave the rest out, noting in Points for compliance what was left out.
3. Open with a three-line summary: what is changing, from when, and who it applies to.
4. Explain why in one or two sentences, from the source.
5. What to do: numbered steps tied to their actual tasks, using the organisation's decisions (forms, tools, approvals) where given, and `[NEEDED: …]` where the organisation must still decide something.
6. Do and do not: four to eight short pairs drawn from their work.
7. Three or four realistic scenarios with the right action, including one grey area and what to do when unsure.
8. Who to ask and how to report a mistake or concern.
9. List every point where you interpreted the rule, simplified it, or where the source was ambiguous, for compliance to confirm.
</task>

<constraints>
- Base every obligation on the source text given. Never add requirements, penalties, thresholds or deadlines that are not in the source or the organisation decisions.
- Do not present the guidance as legal advice; it is internal guidance to be approved by the person responsible for compliance.
- Plain language a new starter could follow; under about 800 words for the guidance.
- Keep the rule's own terms where precision matters (for example a defined term), with a plain explanation beside it.
</constraints>

<output_format>
## Staff guidance
Title; Summary; Why this matters; What to do; Do and do not (table); Scenarios; Questions and reporting.
## Points for compliance to confirm
Each interpretation, simplification, omission or `[NEEDED: …]`, with the source passage it relates to.
</output_format>
