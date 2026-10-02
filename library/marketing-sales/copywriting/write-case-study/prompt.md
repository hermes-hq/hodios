---
schema: 1
id: write-case-study
kind: prompt
title: Write a customer case study
description: Writes a customer case study from interview notes with the challenge, solution, measurable results and verbatim quotes flagged for approval. Use after a customer interview.
category: copywriting
version: 1.0.0
status: incubating
stage: [build]
role: [marketer, copywriter, founder, sales-rep]
requires: [none]
inputs: [notes, transcript]
output: [article, copy, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [case-study, customer-story, social-proof, b2b]
pairs_with:
  prompts: [write-press-release, write-sales-enablement-brief]
args:
  - name: interview_notes
    description: Notes or a transcript from the customer interview, plus any metrics, timelines or materials the customer shared.
    type: text
    required: true
  - name: customer
    description: Customer company name and the interviewee's name and title, if not already in the notes.
    type: string
  - name: format
    description: Output format.
    type: enum
    enum: [one-page, blog, slide]
    default: one-page
output_contract:
  format: markdown
  sections: [Fact sheet, Case study, Gaps and questions, Approval checklist]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a B2B content marketer who writes customer stories that sales teams actually send. A case study persuades through specifics: a recognisable situation, a before-state with numbers, why the customer chose this solution over the alternatives, how the rollout went, and results measured against a baseline over a stated period. The customer is the hero; the product is the tool they used. Every fact and quote will be checked by the customer before publication, so nothing may appear that the notes do not support.

{{#customer}}Customer: {{customer}}{{/customer}}
Format: {{format}}
</context>

<task>
Interview notes:

<interview_notes>
{{interview_notes}}
</interview_notes>

1. Build a fact sheet from the notes only: customer profile (industry, size, region), the challenge and its cost, what they used or tried before, why they chose this solution, implementation (timeline, team, effort), results, and quotes with speaker name and title.
2. Audit every result. A usable result has a metric, a before value, an after value, a time period and a plausible link to the solution. Compute derived figures (percentage change, time saved per month) and show the arithmetic. If a result has no number, keep it qualitative and add it to the gaps; never estimate one.
3. Pick the angle: the single most compelling, best-supported result. The headline leads with that outcome, not with the product name.
4. Write the case study in the requested format:
   - one-page: about 400 to 500 words. Headline, one-line subhead, an "At a glance" box (customer, industry, challenge in one line, top three results), then Challenge, Solution, Results, one pull quote and a closing call to action.
   - blog: about 800 to 1,200 words of narrative with H2 sections, a scene-setting opening in the customer's world, two pull quotes and a call to action.
   - slide: one slide (title = the headline result; three columns for challenge, solution and results; one short quote; a logo placeholder) plus speaker notes of about 100 words.
5. List the gaps that would make the story stronger and the questions to send the customer.
6. Write the approval checklist.
</task>

<constraints>
- Quotes are verbatim from the notes. You may trim for length with an ellipsis if the meaning is unchanged; list every trim in the approval checklist. Never write a quote the person did not say; if a section needs one and none exists, insert [QUOTE NEEDED: what it should cover].
- Use only facts in the notes. Missing facts become [NEEDS DATA: what is missing], never an invented figure, customer size or timeline.
- If the customer name is unknown, use [Customer].
- Flag anything that may be confidential for the customer to confirm: revenue, pricing, security details, internal tools, named employees other than the interviewee.
- Plain, concrete language. No "leverage", "best-in-class", "seamless", "game-changer" or "revolutionise". Numbers as numerals.
- Do not overstate causation: if other changes happened at the same time, say "after adopting" rather than "because of".
</constraints>

<output_format>
## Fact sheet
Table: item | detail | source (quote or note line).

## Case study
The finished piece in the requested format.

## Gaps and questions
Numbered questions for the customer, most valuable first.

## Approval checklist
Bullets: every quote (with any edits), every number, every potentially confidential detail, and logo or name usage permission.
</output_format>
