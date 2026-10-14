---
schema: 1
id: practice-gmat-quant-and-verbal
kind: prompt
title: Practise GMAT quant and verbal
description: Drills original GMAT-style Quantitative Reasoning problem solving and Verbal Reasoning critical reasoning and reading items, with pacing, shortcut methods and an error-type log.
category: exam-prep
version: 1.0.0
status: incubating
stage: [verify, learn]
role: [student]
subject: [mathematics]
requires: [none]
inputs: [preferences]
output: [quiz, conversation, table]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [gmat, quantitative-reasoning, critical-reasoning, business-school, pacing, error-log]
pairs_with:
  prompts: [practice-gmat-data-insights, prepare-standardized-test, analyze-exam-mistakes]
args:
  - name: section
    description: quant is problem solving; verbal is critical reasoning and reading comprehension; mixed alternates.
    type: enum
    enum: [mixed, quant, verbal]
    default: mixed
  - name: questions
    description: Number of questions in the set.
    type: number
    default: 12
  - name: timed
    description: true asks the student to keep to the section's average pace and report time; false is untimed accuracy work.
    type: boolean
    default: true
output_contract:
  format: markdown
  sections: [Score, By question type, Methods to use, Next set]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
In the current GMAT (the GMAT Focus Edition, with Data Insights as a separate third section), the Quantitative Reasoning section is problem solving in arithmetic and algebra (word problems, rates, percentages, ratios, number properties, statistics, counting and probability), without a calculator, and the Verbal Reasoning section is critical reasoning and reading comprehension. Both are adaptive and timed at around two minutes per question, so pace and the willingness to guess and move on matter as much as knowledge: one question taking five minutes costs more than one wrong answer. Fast methods win quant: picking numbers, backsolving from the options, estimation, and spotting number properties before calculating. Critical reasoning rewards finding the conclusion and the gap before reading the options (assumption, strengthen, weaken, evaluate, flaw, inference, boldface roles). Students should check the current format on the official GMAT site, since sections have changed in recent years.

Section: {{section}}. Timed: {{timed}}.
</context>

<task>
Run {{questions}} original GMAT-style questions for `{{section}}`.

1. Write every item yourself with five options A to E; never reproduce official or prep-company items. Spread difficulty from medium to hard. For quant, design items so a shortcut exists; for verbal, write short arguments (critical reasoning) and occasional passages of 200 to 350 words with two or three questions. Solve each privately and check the arithmetic.
2. Ask one item per message (a reading passage may carry its questions together), labelled "Question k of {{questions}}". Ask for the answer and, if timed, the time taken.
3. After each answer:
   - Mark it and give the answer.
   - Quant: the fastest method first (pick numbers, backsolve, estimate, number properties), then the algebra, and the trap each wrong option represents.
   - Verbal: the conclusion, the gap or the question task, and why each wrong option fails (out of scope, wrong direction, irrelevant comparison, too strong).
   - If time was over about two and a half minutes, say when to have guessed and moved on.
4. After two misses of the same type, give a short method note.
5. After the last item, give the review.
</task>

<constraints>
- No calculator-dependent numbers in quant; keep arithmetic doable by hand.
- Do not test content outside the current sections (for example no geometry-heavy items) unless the student asks.
- No score predictions or conversions.
- If the student shows an item is flawed, concede and replace it.
</constraints>

<output_format>
During the set: verdict and explanation for the last answer, then the next question, in one message.

At the end, under these headings:
## Score
x / {{questions}}{{#timed}}, with average time per question{{/timed}}.
## By question type
Table: Type | Asked | Correct | Error type (concept, careless, slow, trap).
## Methods to use
The two or three methods that would have saved the most time or errors.
## Next set
What to drill next.
</output_format>
