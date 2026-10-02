---
schema: 1
id: run-swot-analysis
kind: prompt
title: Run a SWOT analysis
description: Runs a SWOT analysis grounded in the evidence you supply and turns it into strategic implications and priorities, not just four lists. Use before a strategy review or a big bet.
category: business-strategy
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [founder, executive, consultant, business-analyst]
inputs: [notes, document, text]
output: [table, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [swot, tows-matrix, competitive-analysis, strategic-priorities]
pairs_with:
  prompts: [analyze-business-model, estimate-market-size]
  personas: [management-consultant]
args:
  - name: business
    description: The business or unit being analysed, what it sells, to whom, and the evidence you have (metrics, customer feedback, competitor moves, market data). Rough notes are fine.
    type: text
    required: true
  - name: context
    description: The decision or question the SWOT should inform (for example "whether to expand to Germany next year"), plus time horizon and any constraints.
    type: text
output_contract:
  format: markdown
  sections: [Question, SWOT, Strategic options, Implications, Evidence gaps]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a strategy analyst. Most SWOTs fail in three ways: they are lists of adjectives with no evidence, they mix up internal and external factors, and they stop at four boxes without saying what to do. Your SWOT is the opposite: every item rests on evidence, each factor is in the right box, and the output ends in a small number of strategic implications someone can act on.
</context>

<task>
Analyse this business:

<business>
{{business}}
</business>

<decision_context>
{{context}}
</decision_context>

1. State the question the SWOT serves in one line. If the decision context is empty, infer the most useful question from the material and say that you inferred it.
2. Sort every factor with this test: strengths and weaknesses are internal and within the business's control (capabilities, assets, costs, team, product, brand); opportunities and threats are external and outside its control (customers, competitors, technology, regulation, economy). "A growing market" is an opportunity, never a strength.
3. Make each strength and weakness relative to the competitors or alternatives customers actually compare against. A capability every competitor also has is not a strength.
4. Attach the evidence to each item and label it: `given` (from the material), `inferred` (your reasoning from the material) or `assumption` (needs checking). Do not pad a box with assumptions: keep an `assumption` item only if it would be high impact, and also list it under Evidence gaps.
5. Rate each item's impact on the question as high, medium or low. Keep the 3 to 5 highest-impact items per box.
6. Cross the boxes (TOWS): strengths that capture opportunities (SO), strengths that blunt threats (ST), weaknesses to fix to capture opportunities (WO), and weakness-threat combinations to defend or exit (WT). Propose one or two concrete options per quadrant.
7. Choose the 2 or 3 implications that matter most for the question, each with what to do, the first step and the signal that would show it is working.
</task>

<constraints>
- Use only facts from the material. Do not invent market sizes, competitor details, metrics or quotes; mark anything you add from general knowledge as `assumption`.
- If the material is too thin to support a real SWOT (for example only a business name), ask for the five or six facts that matter most and stop, rather than producing a generic one.
- Be specific: "Repeat purchase rate of 48% vs ~30% for the two main rivals" beats "loyal customers".
- No item may appear in two boxes. Resolve ambiguity by asking "can the business change this directly?".
{{> output/uncertainty}}
</constraints>

<output_format>
## Question
One line.

## SWOT
One table per box (Strengths, Weaknesses, Opportunities, Threats) with columns: Factor | Evidence | Label (given, inferred, assumption) | Impact.

## Strategic options
A table with rows SO, ST, WO, WT and columns: Option | Factors it combines.

## Implications
Numbered, at most 3. Each: what to do, why (citing the factors), first step, leading signal.

## Evidence gaps
Bullets: the assumptions that would most change the conclusion and how to check each one cheaply.
</output_format>
