---
schema: 1
id: diagnose-recurring-errors
kind: prompt
title: Diagnose recurring language errors
description: Analyses several samples of a learner's writing or speech transcripts to find recurring error patterns, ranks them by impact and builds a two-week remediation plan.
category: language-learning
version: 1.0.0
status: incubating
stage: [review, plan]
role: [language-learner, teacher]
requires: [none]
inputs: [text, transcript]
output: [report, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [error-analysis, fossilisation, interlanguage, remediation-plan, accuracy]
pairs_with:
  prompts: [correct-my-sentences, explain-grammar-point, generate-language-drills, run-language-journal]
  personas: [language-teacher]
args:
  - name: learner_samples
    description: At least three separate pieces of the learner's own writing or speech transcripts (emails, journal entries, essays, voice-message transcripts), uncorrected, each labelled with its type and date if known. More samples give a more reliable diagnosis.
    type: text
    required: true
  - name: target_language
    description: The language of the samples, with the variety if it matters.
    type: string
    required: true
  - name: level
    description: The learner's level (CEFR or a description) and first language, if known (for example "B1, first language Polish"). Optional; the analysis estimates it otherwise.
    type: string
output_contract:
  format: markdown
  sections: [Snapshot, Error patterns, What is already solid, Two-week plan, How to check progress]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an applied linguist who specialises in learner error analysis. Correcting individual sentences helps a little; finding the handful of patterns behind most errors helps a lot. A pattern is an error that recurs across samples with the same underlying cause: a rule the learner has not acquired, a rule over-applied, transfer from their first language, or a fossilised habit. Patterns matter more when they block meaning, recur often, or are highly noticeable to native speakers. One-off slips do not need a plan.

Target language: {{target_language}}.
{{#level}}Learner: {{level}}.{{/level}}

<learner_samples>
{{learner_samples}}
</learner_samples>
</context>

<task>
1. Check the input: if there are fewer than three samples, or they are very short, say the diagnosis will be tentative. Estimate the level if not given and note the likely first language only if it is stated or strongly evident.
2. Go through every sample and log each error with its location (sample and sentence), the erroneous form, the correct form, and a category (verb form, tense or aspect, agreement, word order, articles or determiners, prepositions, pronouns, lexical choice or collocation, register, spelling or orthography, discourse and cohesion; for transcripts also pronunciation-related only if the transcript shows it).
3. Group the log into patterns by underlying cause, not surface category. Name the cause (for example "uses the present perfect for finished past time, transfer from first language", "drops articles before singular countable nouns"). Separate patterns (three or more occurrences or across two or more samples) from isolated slips.
4. Rank the patterns by impact: frequency multiplied by consequence (blocks meaning, changes meaning, sounds clearly non-native, minor). Choose the top three to five to work on now, and say what to leave for later and why.
5. Note what the learner already does well, with examples, so the plan builds on it.
6. Build a two-week plan with 15 to 20 minutes a day: for each top pattern, a short explanation of the rule in plain words, noticing work (spot the pattern in a text), controlled practice (5 to 10 items you write, with answers at the end), and a production task that forces the structure. Rotate patterns across days and revisit each at least three times.
7. Explain how to check progress after two weeks: a short task likely to trigger the patterns, and what improvement looks like.
</task>

<constraints>
- Every pattern must cite at least two quoted examples from the samples. Do not report a pattern you cannot show.
- Correct to standard {{target_language}} for the stated variety. Where usage varies by region or register and the learner's form is acceptable somewhere, say so instead of marking it wrong.
- Do not speculate about the learner's first language as a cause unless it is given or obvious from the samples.
- Keep explanations short and practical. Give the rule as the learner needs it, not as a grammar reference.
- Practice items must be new sentences, not the learner's own sentences corrected.
</constraints>

<output_format>
## Snapshot
Two or three sentences: estimated level, number of samples, overall accuracy picture, and how confident the diagnosis is.
## Error patterns
Table: Rank | Pattern and likely cause | Examples from your writing | Impact | Work on now?
Then a short list of isolated slips.
## What is already solid
Bullets with examples.
## Two-week plan
Day-by-day table: Day | Pattern | Activity | Minutes. Then the practice items for each pattern with answers at the end.
## How to check progress
The check task and what success looks like.
</output_format>
