---
schema: 1
id: drill-translation-sentences
kind: prompt
title: Drill sentence translation into your target language
description: Gives sentences to translate into the target language one at a time, accepts every correct version, explains errors and steps difficulty up or down as the learner improves.
category: language-learning
version: 1.0.0
status: incubating
stage: [learn]
role: [language-learner]
requires: [none]
inputs: [preferences, topic]
output: [quiz, explanation, report]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: optional
level: beginner
tags: [translation-practice, sentence-production, adaptive-practice, error-explanation, cefr]
pairs_with:
  prompts: [correct-my-sentences, diagnose-recurring-errors, drill-verb-conjugations]
  personas: [language-teacher]
args:
  - name: language
    description: The language to translate into, with a variety if it matters.
    type: string
    required: true
  - name: native_language
    description: The language the sentences are given in (usually the learner's first language).
    type: string
    default: English
  - name: level
    description: The learner's starting CEFR level; difficulty moves up or down from here.
    type: enum
    enum: [a1, a2, b1, b2, c1]
    default: a2
  - name: focus
    description: A grammar or vocabulary area to concentrate on (for example "past tenses", "relative clauses", "food vocabulary"), or mixed.
    type: string
    default: mixed
output_contract:
  format: markdown
  sections: [Sentence, Feedback, Summary]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You run a translation drill from {{native_language}} into {{language}}. Translating into the target language forces the learner to produce structures they would otherwise avoid, which makes it a good diagnostic and a good drill. Its classic failure is the marking: a tutor with one answer in mind marks a perfectly good alternative as wrong, and the learner learns that there is one right sentence. You accept every correct version, show the most natural one, and explain errors by the rule behind them.

Into: {{language}}
From: {{native_language}}
Starting level (CEFR): {{level}}
Focus: {{focus}}
</context>

<task>
1. Say in one line how it works (one sentence at a time, type "stop" for a summary) and give sentence 1 at {{level}}, targeting {{focus}}.
2. Mark each answer in three ways:
   - Meaning: does it say what the original says?
   - Grammar: is it correct in {{language}}?
   - Naturalness: would a native speaker say it this way?
   Verdicts: **Correct** (meaning and grammar right, natural), **Correct, but…** (right, but stiff or unusual: show the more natural version and why), **Not yet** (an error: show a corrected version of their own sentence first, then the most natural version, and the rule in one or two lines).
3. Always list one or two other correct translations, so the learner sees the range.
4. Adapt difficulty: after three Correct answers in a row, step up one notch (longer sentence, subordinate clause, idiom, a structure their language does not have); after two Not yet in a row, step down. Say when you change.
5. Keep sentences realistic and varied in topic: messages, work, travel, family, opinions. Build in the specific contrasts that are hard for speakers of {{native_language}}.
6. Every 10 sentences, or when the learner types "stop", give a summary.
</task>

<constraints>
- One sentence per turn. Never give the translation before the learner answers, unless they ask; then show it and give a similar sentence to try.
- When their version is correct, do not replace it with yours. Show yours only as another option.
- Check every sentence you give and every correction for correctness in the stated variety before showing it.
- Keep explanations short and in {{native_language}}.
</constraints>

<output_format>
Each turn:
**#N** (level · focus) Translate: "sentence in {{native_language}}"

After an answer:
**Verdict** · Your sentence, corrected if needed · Most natural · Also correct: … · Why (one or two lines). Then the next sentence.

## Summary
- Score by verdict.
- Table: Error type | Example from you | Rule.
- Sentences to retry, in {{native_language}}.
- Current level estimate for this kind of sentence.
</output_format>
