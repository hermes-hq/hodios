---
schema: 1
id: extract-checklist-from-guidance
kind: prompt
title: Turn official guidance into a checklist
description: Turns official guidance or application instructions - visa, grant, school, permit, council scheme - into a step checklist with conditions, documents, deadlines and fees, quoting the source.
category: summarization
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent, student, founder]
requires: [none]
inputs: [document]
output: [checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [application-process, official-guidance, documents-needed, eligibility, step-by-step]
pairs_with:
  prompts: [extract-deadlines, summarize-what-applies-to-me, interrogate-a-document]
args:
  - name: guidance
    description: The guidance text as published - the whole page or PDF, including notes, footnotes and "before you apply" sections.
    type: text
    required: true
  - name: situation
    description: Your situation in a few lines, so conditional steps can be marked (for example "applying for my child, we moved here 8 months ago").
    type: text
    required: false
output_contract:
  format: markdown
  sections: [Check you can apply, Documents to gather, Steps in order, Deadlines and fees, Conditions that depend on your situation, Unclear in the guidance]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You turn official guidance into a checklist someone can actually work through. Guidance pages are written by the issuing body and organised around its rules, not the applicant's steps: eligibility is in one place, the document list in another, a crucial "documents must be less than 3 months old" or "translations must be certified" in a footnote, and the order matters (book the appointment before the slots go, get the certificate before you can apply). Applications fail on small things: a missing original, a photo to the wrong size, a form signed in the wrong place, a fee paid the wrong way, a deadline counted from the wrong date. You keep every condition with its step and quote the source so the user can check it.

<guidance>
{{guidance}}
</guidance>

{{#situation}}Applicant's situation: {{situation}}{{/situation}}
</context>

<task>
1. Read the whole guidance, including footnotes, notes and linked-section summaries in the text.
2. Pull out eligibility conditions as yes or no checks, quoting each.
3. List every document needed, with format requirements (original, copy, certified, translated, maximum age, photo size).
4. Put the steps in the order they must happen, including waiting times and steps that depend on an earlier one.
5. List every deadline and fee, with how deadlines are counted and accepted payment methods if stated.
6. Mark steps that depend on the applicant's situation; if a situation was given, say which apply.
7. List anything unclear, contradictory or missing in the guidance, with the question to ask the issuing body.
</task>

<constraints>
- Use only the guidance. Do not add requirements from other countries, schemes or years, or from general knowledge, as if they were in this text.
- Quote the source wording for each condition, deadline and fee.
- Do not tell the user they are eligible or will succeed; say what the guidance requires.
- If the guidance is undated or may be out of date, say to check the current version from the issuing body before applying.
</constraints>

<output_format>
## Check you can apply
Checkboxes, each with the quoted condition.

## Documents to gather
Checkboxes with format requirements.

## Steps in order
Numbered checkboxes with dependencies and waiting times.

## Deadlines and fees
Table: Item | Amount or date | How counted or paid | Source

## Conditions that depend on your situation
Bullets.

## Unclear in the guidance
Bullets with the question to ask.
</output_format>
