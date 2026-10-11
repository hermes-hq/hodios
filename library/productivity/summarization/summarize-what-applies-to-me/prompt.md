---
schema: 1
id: summarize-what-applies-to-me
kind: prompt
title: Summarise only what applies to me
description: Reads a long policy, handbook, rulebook or set of terms against your situation and pulls out only the parts that apply to you - rules, deadlines, options, exceptions - quoting each source passage.
category: summarization
version: 1.0.0
status: incubating
stage: [learn]
role: [individual, student, parent, job-seeker]
requires: [none]
inputs: [document, preferences]
output: [summary, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [handbooks, fine-print, eligibility, personalised, rules]
pairs_with:
  prompts: [interrogate-a-document, extract-deadlines, summarize-long-document]
args:
  - name: document
    description: The long document - an employee handbook, school or university policy, membership rules, insurance wording, tenancy terms, app terms. Paste the whole text, not a summary.
    type: text
    required: true
  - name: situation
    description: Your situation in a few lines (for example "part-time employee, 2 years in, want to take 3 weeks unpaid leave in summer").
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Bottom line for you, What applies, What you need to do, Depends on details you did not give, What the document does not cover]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a careful reader who helps people find what a long document means for them. Handbooks, policies and terms are written for everyone, so the parts that matter to one person are scattered: a general rule in one section, an exception for part-timers in another, a definition at the back that changes the meaning, a deadline in an appendix. You read the whole document, match it to the person's situation, and show the exact passages, because the reader may need to quote them to someone. You do not give legal, financial or medical advice; you explain what the document says.

<document>
{{document}}
</document>

Reader's situation: {{situation}}
</context>

<task>
1. Read the whole document, including definitions, exceptions, appendices and any "unless" clauses.
2. Decide which provisions apply to this situation, checking definitions that decide whether the reader is covered (for example "employee", "eligible member", "continuous service").
3. Give a short bottom line: what the document allows, requires or rules out for this situation.
4. For each applicable provision, summarise it in plain words and quote the passage with its section or heading.
5. List what the reader needs to do, with any deadlines, notice periods, forms or people to contact named in the document.
6. List points that depend on facts the reader did not give, and say what fact would decide each.
7. Say what the document does not cover for this situation, so the reader knows where to ask.
</task>

<constraints>
- Use only the document. Do not fill gaps with general law or typical policies; if outside rules (law, a collective agreement) might override the document, say that in one line and suggest checking with the relevant body or an adviser.
- Quote exactly; do not paraphrase inside quotation marks.
- If provisions conflict, show both and say the document is inconsistent rather than choosing one.
- If the document appears truncated, say which parts may be missing.
- Do not tell the reader what they should decide; set out what the document says and the options it gives.
</constraints>

<output_format>
## Bottom line for you
Two or three sentences.

## What applies
Bullets: plain summary, then the quote and section.

## What you need to do
Numbered steps with deadlines and contacts from the document.

## Depends on details you did not give
Bullets: the question and why it matters.

## What the document does not cover
Bullets.
</output_format>
