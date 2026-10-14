---
schema: 1
id: explain-difference-between-technologies
kind: prompt
title: Explain the difference between two technologies
description: Explains the real difference between two often-confused technologies or concepts, such as REST and GraphQL or processes and threads, with side-by-side code, misconceptions and when each fits.
category: learning
version: 1.0.0
status: incubating
stage: [learn]
role: [software-engineer, student]
stack: []
requires: [none]
inputs: [topic]
output: [explanation, table, code]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [concept-comparison, misconceptions, mental-models, side-by-side]
pairs_with:
  prompts: [explain-concept-with-code, compare-design-options, decode-developer-jargon]
args:
  - name: pair
    description: The two things to tell apart, such as "authentication vs authorization", "Docker image vs container", "SQL vs NoSQL", "concurrency vs parallelism", "git merge vs rebase".
    type: string
    required: true
  - name: background
    description: What you already know and where the confusion comes from.
    type: text
  - name: language
    description: The language or stack for code examples.
    type: string
output_contract:
  format: markdown
  sections: [The difference in one sentence, Side by side, Same task both ways, Misconceptions, When each fits, Check yourself]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most "X vs Y" confusion has one of three causes: the two are not alternatives at all (they work at different layers or are often used together, like Docker and Kubernetes, or authentication and authorisation), the difference is one mechanism hidden under similar syntax (`==` versus `===`, merge versus rebase), or one is a specific instance of the other (REST is an architectural style, HTTP a protocol). A good explanation finds which case it is, states the difference as one mechanism, shows the same task done both ways so the difference is visible, and corrects the popular myths (such as "SQL databases cannot scale" or "GraphQL is always faster"). Blog-post comparisons tend to list twenty bullet points; learners need the one distinction that explains the rest.
</context>

<task>
Explain the difference between: {{pair}}
{{#background}}
The learner's background and confusion: {{background}}
{{/background}}

1. Decide which kind of pair this is: true alternatives for the same job, different layers often used together, one a kind of the other, or two names for overlapping ideas. Say so plainly first.
2. State the core difference in one sentence as a mechanism, not a list of features.
3. Build a side-by-side table of the dimensions that follow from that mechanism (what it is, where it runs or acts, what it guarantees, what it costs), limited to the five to eight that matter.
4. Show the same small, realistic task done both ways{{#language}} in {{language}}{{/language}}, with short code or commands and the output, so the difference is visible. If they are not alternatives, show them working together instead.
5. Correct three to five common misconceptions, each with why it is wrong or only true in some cases.
6. Say when each fits with concrete situations, and when the choice does not matter.
7. Give two quick questions the learner can answer to check they have it, with answers hidden at the end.
</task>

<constraints>
- Do not declare a winner. Where trade-offs depend on scale or team, say so.
- Avoid unsupported performance claims; if one is commonly made, say under what conditions it holds.
- Keep the code minimal and runnable, and do not use APIs you are not sure exist.
{{> output/uncertainty}}
</constraints>

<output_format>
## The difference in one sentence
What kind of pair it is, then the mechanism.
## Side by side
A table.
## Same task both ways
Code blocks with output.
## Misconceptions
Bullets.
## When each fits
Bullets per side, plus when it does not matter.
## Check yourself
Two questions, then answers under a final "Answers" line.
</output_format>
