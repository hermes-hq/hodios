---
schema: 1
id: run-analysis-loop-with-me
kind: prompt
title: Run an analysis loop together, one query at a time
description: Works through a business question in a loop where the assistant proposes the next query or chart, the user runs it and pastes the result, and the assistant interprets it and picks the next step.
category: data-exploration
version: 1.0.0
status: incubating
stage: [discover, build]
role: [data-analyst, business-analyst, product-manager, individual]
requires: [none]
inputs: [schema, dataset, text]
output: [code, explanation, conversation]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [pair-analysis, hypothesis-tree, iterative-analysis, sql-queries, human-in-the-loop]
pairs_with:
  prompts: [answer-question-with-sql, explore-dataset, decompose-revenue-change, check-analysis-for-pitfalls]
  personas: [data-analyst]
args:
  - name: question
    description: The business question in your words, for example "Why did repeat purchases drop in March?"
    type: string
    required: true
  - name: data_description
    description: The tables or sheets you can query - names, columns with types, grain (what one row is), date range and known quirks.
    type: text
    required: true
  - name: tool
    description: Where you will run each step. sql gives a query; spreadsheet gives formulas or pivot steps; python gives pandas code; r gives dplyr code.
    type: enum
    enum: [sql, spreadsheet, python, r]
    default: sql
output_contract:
  format: markdown
  sections: [Where we are, Next step, What the result will tell us]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Analysis goes faster when a human runs the queries and a careful partner decides what to look at next. The partner's value is discipline: breaking the question into hypotheses, choosing the one query that best separates them, sanity-checking each result before interpreting it, and knowing when the evidence is enough. The failure modes are inventing what a result probably says, firing off ten queries at once, interpreting a result built on a bad join, and drifting away from the question. In this loop the human runs every step, and only results they paste count as evidence.
</context>

<task>
Work through this question with me: {{question}}

<data>
{{data_description}}
</data>
Tool: {{tool}}.

First turn:
1. Restate the question as a decision or a precise question, define the key metric (formula, grain, time window), and list two to four hypotheses that could explain or answer it, as a small tree.
2. Give the first step: one query or chart in {{tool}} that best separates the hypotheses or establishes the baseline. Usually start by confirming the headline number itself.
3. Say what each plausible result would mean for the hypotheses. Then stop and wait for me to paste the result.

Each later turn, after I paste a result:
4. Sanity-check it first: row counts, totals against known figures, nulls, duplicated rows from joins, date coverage, units. If something looks wrong, say so and give a corrected step before interpreting.
5. Interpret it in two to four sentences, separating what the result shows from what you infer, with a confidence level.
6. Update the hypothesis tree: ruled out, weakened, strengthened, or newly added.
7. Give the next single step and what each plausible result would mean. Then stop.

When the evidence answers the question, or a further step would not change the conclusion, say so and give a wrap-up: the answer, the evidence chain (each step and what it showed), confidence, caveats, and the follow-up that would raise confidence.
</task>

<constraints>
- Never state or guess a result I have not pasted. If I ask what a query would show, say you do not know until it is run.
- One step per turn, written to run as is against the tables described, with filters and date ranges explicit and comments on any tricky part.
- Keep every step tied to the question; note interesting side paths in one line and ask before following them.
- Do not claim causation from these queries alone; say what design would test it.
- If the table descriptions are too thin to write a correct query (no grain, no key columns), ask for them before the first step and stop.
</constraints>

<output_format>
## Where we are
The question and metric (first turn), or the sanity check, interpretation and updated hypothesis tree (later turns).
## Next step
The single query, formula steps or code block in {{tool}}.
## What the result will tell us
A short list: if the result looks like X, then Y. Then stop. On the final turn, replace these sections with a wrap-up.
</output_format>
