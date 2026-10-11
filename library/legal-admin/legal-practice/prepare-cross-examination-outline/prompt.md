---
schema: 1
id: prepare-cross-examination-outline
kind: prompt
title: Prepare a cross-examination outline
description: Builds a trial or hearing cross-examination outline in short leading-question chapters, each tied to a source for impeachment, with the goals, the risks and the questions not to ask.
category: legal-practice
version: 1.0.0
status: incubating
stage: [plan, build]
role: [legal-professional, student]
subject: [law]
requires: [none]
inputs: [transcript, document, notes]
output: [outline, questions, table]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [cross-examination, leading-questions, impeachment, trial-advocacy, witness-examination]
pairs_with:
  prompts: [summarize-deposition-transcript, prepare-deposition-outline, draft-opening-statement]
args:
  - name: witness
    description: Who the witness is, their role in the story and what they said on direct (or are expected to say).
    type: text
    required: true
  - name: sources
    description: Prior statements, deposition excerpts with page and line, documents and exhibits you can use, labelled so they can be cited.
    type: text
    required: true
  - name: case_theory
    description: Your theory of the case in two or three sentences, and the points you need from this witness.
    type: text
    required: true
  - name: forum
    description: The court or tribunal and jurisdiction, and any limits on the scope of cross that apply. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Goals for this witness, Cross outline, Impeachment table, Risks and questions not to ask, Redirect to expect]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Good cross-examination is not a second direct. The examiner tells the story through short, leading questions of one fact each, to which the answer is known and provable, grouped into chapters that each make one point for closing. The classic failures are open questions that let the witness explain, a "one question too many" that asks the witness to agree with the conclusion, arguing with the witness, and impeaching on trivial inconsistencies that make the examiner look petty. Impeachment works when it is clean: commit the witness to today's answer, credit the earlier statement (when, where, under oath, accurate then), then confront with the exact words. Each chapter should be sourced, so that if the witness strays the examiner can prove the point.

Witness:
<witness>
{{witness}}
</witness>

Sources:
<sources>
{{sources}}
</sources>

Case theory:
<case_theory>
{{case_theory}}
</case_theory>
{{#forum}}Forum: {{forum}}{{/forum}}
</context>

<task>
1. Goals: the three to six points this witness must give you, each linked to the case theory, and whether the aim is to build (facts helpful to you) or to limit or discredit.
2. Order the chapters for impact: usually build points first while the witness is cooperative, credibility points later, and a strong final chapter.
3. Write each chapter as a list of short leading questions, one fact per question, each with the source that proves it in brackets.
4. Impeachment table: each real inconsistency worth using, the trial answer expected, the prior statement quoted with its cite, and the commit-credit-confront sequence.
5. Risks and questions not to ask: open questions to avoid, the ultimate point to save for closing, topics where the witness could hurt you, and documents that open the door to harmful material.
6. Redirect to expect: what opposing counsel will try to repair and how your chapters pre-empt it.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only facts in the sources. Every question must cite a source; mark any unsupported question [NO SOURCE] and suggest dropping it.
- No questions that misstate the evidence, assume facts not in evidence, or harass the witness.
- Leave scope, privilege and evidence rules for the attorney to check under the forum's rules; flag any question that may be objectionable.
- This is preparation for the examining attorney or advocacy student; mark it a draft.
{{> output/uncertainty}}
</constraints>

<output_format>
## Goals for this witness
Numbered.
## Cross outline
Chapters with a heading stating the point, then numbered leading questions with [source].
## Impeachment table
Table: Topic | Expected answer | Prior statement and cite | Use it?
## Risks and questions not to ask
Bullets.
## Redirect to expect
Bullets.
</output_format>
