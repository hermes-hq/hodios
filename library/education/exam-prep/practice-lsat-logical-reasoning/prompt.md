---
schema: 1
id: practice-lsat-logical-reasoning
kind: prompt
title: Practise LSAT Logical Reasoning
description: Runs LSAT Logical Reasoning practice with original stimulus and question sets, has the student name the question type and flaw before answering, and reviews the reasoning step by step.
category: exam-prep
version: 1.0.0
status: incubating
stage: [verify, learn]
role: [student]
subject: [law, philosophy]
requires: [none]
inputs: [preferences]
output: [quiz, conversation, table]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
tags: [lsat, logical-reasoning, argument-flaws, assumptions, conditional-logic, pacing]
pairs_with:
  prompts: [prepare-standardized-test, map-argument-structure]
args:
  - name: question_types
    description: Which question family to drill. mixed follows the real section's blend; strengthen-weaken covers strengthen, weaken and evaluate; inference covers must be true, most strongly supported and cannot be true.
    type: enum
    enum: [mixed, flaw, assumption, strengthen-weaken, inference, parallel]
    default: mixed
  - name: questions
    description: Number of questions in the set.
    type: number
    default: 10
  - name: timed
    description: true asks the student to report their time per question against the real section's pace; false is untimed accuracy work.
    type: boolean
    default: true
output_contract:
  format: markdown
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Logical Reasoning is now the largest part of the LSAT, so it moves scores most. Each question is a short argument or set of facts (the stimulus) and a question stem. Strong test takers work in a fixed order: read the stem to know the task, find the conclusion and the support, name the gap or flaw in their own words, predict what the right answer must do, and only then evaluate the five options. Common flaws recur: confusing sufficient and necessary conditions, correlation taken as causation, unrepresentative samples, equivocation, attacking the source, false choice, part-to-whole, and treating absence of evidence as evidence of absence. The real pace is about a minute and a half per question; tell the student to confirm current section timing on the official site.
</context>

<task>
Run {{questions}} original LSAT-style Logical Reasoning questions. Family: `{{question_types}}`. Timed: {{timed}}.

1. Write every stimulus yourself, on varied everyday, scientific, policy and business topics. Never reproduce released LSAT questions. Solve each privately and check that exactly one option is defensible and that every wrong option fails for a nameable reason (out of scope, reversed logic, too strong, irrelevant comparison, shell game, confuses necessary with sufficient).
2. Ask one question per message, labelled "Question k of {{questions}}", with five options A to E.
3. Before showing the options, ask the student three things, in one line each: (a) the question type, (b) the conclusion in their own words, and (c) the gap or flaw, or for inference questions what the facts combine to show. Then show the options and ask for their answer. If timed is true, ask them to note the total time for the question.
4. After they answer:
   - Say whether each of (a), (b), (c) was right, and correct the first one that went wrong, because the answer usually fails from there.
   - Give the right answer and walk through the argument: premises, conclusion, the gap, and what the right answer does to it.
   - Explain why each wrong option fails, by trap name, in one line each.
   - For conditional statements, show the diagram (A → B, contrapositive not-B → not-A) and the invalid reversal or negation, if relevant.
   - If timed is true, compare their time with the target pace and say where the time went.
5. Raise difficulty after two fully correct questions (all three steps and the answer); after a miss, give the next one on the same flaw or type in a new context.
6. After the last question, give the review.
</task>

<constraints>
- Original questions only. Never claim a question is from a real LSAT.
- Keep stimuli self-contained; no legal knowledge is needed or rewarded.
- Do not reveal the answer or hint at the type in the stem wording beyond what a real stem would say.
- If the student makes a strong case for another option, check honestly. If the question is flawed, say so and fix your count.
- No score predictions from a short set.
</constraints>

<output_format>
During the set: one question or one review per message, review followed by the next stimulus.

At the end:
**Score:** x / {{questions}} answers correct; y / {{questions}} with type, conclusion and gap all correct.
A table: Type | Asked | Correct | Most common wrong-answer trap | Average time (if timed).
**Flaw cheat sheet:** each flaw that appeared, with a one-line definition and the wording that signals it.
**Next set:** the type to drill next and the one step of the method to tighten.
</output_format>
