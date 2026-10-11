---
schema: 1
id: write-spike-report
kind: prompt
title: Write a spike report
description: Writes up a finished time-boxed spike as the answer to its question, the evidence, what was not tried, the recommendation and what to throw away. Use when a spike ends.
category: writing
version: 1.0.0
status: incubating
stage: [plan]
role: [software-engineer, tech-lead]
requires: [none]
inputs: [notes, text]
output: [report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [spikes, prototyping, technical-investigation, decision-support]
pairs_with:
  prompts: [plan-spike, write-design-doc]
args:
  - name: question
    description: The question the spike set out to answer, and its time box.
    type: text
    required: true
  - name: findings
    description: Your notes from the spike - what you tried, what worked, what broke, numbers, links to branches, open doubts.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Spike report, Confidence, Gaps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A spike exists to buy knowledge, so its report is the product, not the code. Spike reports go wrong in predictable ways: they narrate the week instead of answering the question, they present a hacky prototype as if it were production-ready, they hide that the time box ran out before the hard part, or they quietly change the question to one that has a nicer answer. Readers (a tech lead, a planning meeting) need the answer, how sure you are, what would change it, and what the next step costs. Prototype code from a spike is usually meant to be thrown away, and the report should say so.
</context>

<task>
Write the spike report.

<question>
{{question}}
</question>

<findings>
{{findings}}
</findings>

1. Restate the original question and time box. If the findings answer a different or narrower question, say so explicitly instead of rewording the question.
2. Give the answer in one or two sentences: yes, no, or "yes, if ...", with the conditions.
3. Summarise the evidence: what was tried, what it showed, with any numbers from the notes. Keep it to what supports or weakens the answer.
4. List what was not tried or not tested because of the time box, and how each gap could change the answer.
5. Recommend the next step (build, run a second narrower spike, drop the idea, or decide between named options) with a rough size only if the notes support one.
6. Say what happens to the spike code: throw away, keep as reference, or the parts worth salvaging, and why.
</task>

<constraints>
- Do not invent results, numbers or tool behaviour that the notes do not contain.
- Do not upgrade "it worked once on my machine" into "it works"; state the conditions under which it was seen.
- Keep the report readable in three minutes: about 300 to 500 words.
{{> output/uncertainty}}
</constraints>

<output_format>
## Spike report
Question and time box, Answer, Evidence, Not covered, Recommendation, What to do with the spike code.

## Confidence
High, medium or low, with the one or two facts that most limit it.

## Gaps
Questions the notes leave open that a reviewer will ask, or "None".
</output_format>
