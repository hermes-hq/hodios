---
schema: 1
id: run-decision-journal
kind: prompt
title: Run a decision journal
description: Writes a decision journal entry at the moment of deciding - options, expectations, confidence and a review date - or reviews past entries against outcomes to find patterns in your judgement.
category: decision-making
version: 1.0.0
status: incubating
stage: [plan, review]
role: [individual, manager, founder, executive]
requires: [none]
inputs: [text, notes]
output: [report, table, questions]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
tags: [decision-journal, calibration, hindsight-bias, judgement, forecasting]
pairs_with:
  prompts: [run-pre-mortem, compare-options-matrix, make-life-decision]
  personas: [thinking-partner]
args:
  - name: decision
    description: Either a decision you are about to make (with what you know), or past journal entries with what actually happened, to review.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Journal entry, To confirm, Entry by entry, Calibration, Patterns, Adjustments]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Outcomes are a noisy teacher: good decisions sometimes turn out badly and bad ones sometimes work. A decision journal separates the quality of a decision from its outcome by recording, at the time, what you knew, what you expected and how confident you were. Reviewing entries later shows where your judgement is reliable, where you are over- or under-confident, and which situations trip you up, without hindsight rewriting the story.

<input>
{{decision}}
</input>
</context>

<task>
First decide which mode applies: a new entry (Mode A) or a review of past entries with outcomes (Mode B). If the input mixes both, review the past entries and offer to write the new entry next.

Mode A, new entry (a decision not yet made or just made):
A1. If key facts are missing (the options being considered, the deadline, what is at stake), ask up to four short questions and stop.
A2. Otherwise draft the entry from what the user wrote, asking them to fill the fields only they can answer:
   - Decision and date; the situation in two or three sentences.
   - Options considered, including doing nothing; the option chosen or leaning towards.
   - Key assumptions the choice rests on.
   - Expected outcome, stated so it can be checked later (what will be true by when), with a range where useful.
   - Confidence that the expected outcome happens, as a percentage.
   - What would change your mind, and the early signals to watch.
   - Physical and emotional state while deciding (tired, rushed, excited, under pressure), one line.
   - Review date: when the outcome will be knowable.
A3. Ask them to confirm or correct the confidence and the expected outcome; these must be theirs, not yours.

Mode B, review (past entries with outcomes):
B1. For each entry, compare expected and actual outcome, and classify it: good decision and good outcome, good decision and bad luck, bad decision and good luck, or bad decision and bad outcome. Judge the decision by the information available at the time, and say what in the entry supports the judgement.
B2. Across entries, check calibration: of decisions marked around 70 to 80 percent confident, how many came true? With fewer than about ten entries, say the sample is too small to conclude and treat it as a hint only.
B3. Find patterns: kinds of decision, states (rushed, tired), or assumptions that repeatedly went wrong or right.
B4. Propose two or three adjustments to how they decide, each tied to evidence.
</task>

<constraints>
- Never fill in the user's confidence, expectations or outcomes yourself. Draft with placeholders such as [your confidence %] where they have not said.
- Do not judge decisions by outcomes alone. Name hindsight bias when the user does it.
- Keep entries short enough to write in five minutes; nobody keeps a journal that takes thirty.
- Do not give financial, legal or medical advice about the decision itself; this prompt records and reviews judgement.
</constraints>

<output_format>
Start with one line: `**Mode:** new entry` or `**Mode:** review`.

Mode A (or the clarifying questions only, numbered, if step A1 applies):
## Journal entry
A fenced block the user can paste into their journal, one labelled line per field in the order of step A2, drafted fields filled in and the rest as placeholders such as [your confidence %].
## To confirm
One or two questions, always including the expected outcome and the confidence.

Mode B:
## Entry by entry
A table: Decision | Expected | Actual | Confidence | Verdict | Why (citing the entry).
## Calibration
Two or three sentences, including the sample-size caveat when there are fewer than about ten entries.
## Patterns
Bullets, each with the entries that show it.
## Adjustments
Numbered, two or three, each tied to a pattern.
</output_format>
