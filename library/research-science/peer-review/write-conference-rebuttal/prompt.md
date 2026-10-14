---
schema: 1
id: write-conference-rebuttal
kind: prompt
title: Write a conference author rebuttal
description: Writes a conference author rebuttal within its length limit, prioritising points that can move scores, correcting misreadings with evidence and committing only to feasible changes.
category: peer-review
version: 1.0.0
status: incubating
stage: [review]
role: [researcher, student]
requires: [none]
inputs: [text, document]
output: [message, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [author-rebuttal, conference-review, openreview, author-response]
pairs_with:
  prompts: [respond-to-reviewers, respond-to-author-rebuttal]
args:
  - name: reviews
    description: All reviews with their scores and confidence, pasted in full, numbered by reviewer.
    type: text
    required: true
  - name: our_evidence
    description: New results you have actually run since submission, clarifications, and where things already are in the paper (section, table, appendix).
    type: text
    required: true
  - name: format_rules
    description: The venue's rebuttal rules, such as the character or word limit, whether it is one global response or per reviewer, and whether new results or a revised PDF are allowed.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Triage, Strategy, Rebuttal text, Length check, Not included]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A conference rebuttal is not a journal response letter (for a revise-and-resubmit, write a point-by-point response instead). It is short, often one shot, usually not backed by a revised paper the reviewers can check (some venues allow a revised PDF), and its real readers are the area chair and the reviewers with borderline scores. Rebuttals move outcomes when they correct factual misreadings with a pointer to the paper, supply a small decisive result, or make a firm, feasible commitment for the camera-ready version. They fail when they answer every minor point at equal length, argue with a confident negative reviewer instead of addressing the area chair, promise large new experiments, or sound aggrieved. Many venues forbid links, new PDFs or results beyond a limit, and break their rules at the authors' peril.
</context>

<task>
Write our rebuttal.
<reviews>
{{reviews}}
</reviews>
<our_evidence>
{{our_evidence}}
</our_evidence>
<format_rules>
{{format_rules}}
</format_rules>

1. Split the reviews into individual concerns, labelled by reviewer (R1-a, R1-b, R2-a…), and merge concerns raised by several reviewers into shared points.
2. Triage each concern: misreading we can correct, valid point we can address with existing evidence, valid point needing a new result we have, valid point we can only acknowledge, or out of scope. Mark the concerns driving low or borderline scores.
3. Choose a strategy: which three to five points get most of the space, and what the area chair most needs to hear.
4. Write the rebuttal in the required format: shared points first if global, a direct first sentence for each answer, a pointer to the section, table or appendix, and new results stated with their setup.
5. Add concise commitments for the final version only where they are feasible before the camera-ready deadline.
6. Count the length against the limit and cut minor points first if over.
</task>

<constraints>
- Use only results and facts in our evidence. Never invent numbers, experiments or page references; leave "[TABLE/SECTION]" placeholders where we did not say.
- Obey the format rules: no links if links are banned, no results beyond what is allowed.
- Correct misreadings politely by quoting or pointing to the paper, never by implying the reviewer did not read it.
- Commit only to changes we could finish before the camera-ready deadline; say so when a request cannot be met and why.
- Keep tone calm and specific; one thank-you at the start is enough.
</constraints>

<output_format>
## Triage
A table: ID | concern (under 12 words) | type | drives score? | planned answer.
## Strategy
Three to five bullets.
## Rebuttal text
Ready to paste, in the required structure.
## Length check
Count against the limit.
## Not included
Concerns left out or answered briefly, and why.
</output_format>
