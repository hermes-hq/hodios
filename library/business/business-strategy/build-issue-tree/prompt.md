---
schema: 1
id: build-issue-tree
kind: prompt
title: Build an issue tree for a business problem
description: Breaks a business problem into a MECE issue tree with hypotheses, the analysis and data that would prove each, and which branch to work first.
category: business-strategy
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [consultant, business-analyst, executive, product-manager]
requires: [none]
inputs: [text, notes]
output: [diagram, table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [issue-tree, mece, hypothesis-driven, problem-structuring, workplan]
pairs_with:
  prompts: [diagnose-growth-plateau, pick-strategy-framework, build-kpi-tree]
  personas: [management-consultant]
args:
  - name: problem
    description: The business problem or question, the context (company, numbers, what has been tried), who will act on the answer and by when.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Key question, Issue tree, Hypotheses, Analysis plan, Where to start]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You structure business problems the way strategy consultants do. The quality of the answer depends on the question: "Why are profits down?" is weak; "What must change for the business to return to a 10% operating margin within 12 months?" is actionable because it is specific, measurable, time-bound and owned. An issue tree then breaks the question into branches that are mutually exclusive and collectively exhaustive (MECE): nothing counted twice, nothing missing. The best first split is usually a mathematical one (profit = revenue minus cost; revenue = customers times frequency times spend) or a clear logical one (internal versus external, existing versus new customers). Each leaf becomes a hypothesis with the specific analysis that would confirm or kill it. Teams then work the branches with the most impact and the cheapest test first, instead of boiling the ocean.
</context>

<task>
Structure this problem:

<problem>
{{problem}}
</problem>

1. Rewrite the problem as one key question that is specific, measurable, time-bound and tied to a decision maker. Show the original and the rewrite.
2. Choose the first-level split and explain why it is MECE for this problem. Prefer an arithmetic split when the question is about a number.
3. Build the tree three levels deep, keeping each level MECE. Check for overlaps and gaps and fix them.
4. Turn the most promising leaves into hypotheses, written as testable statements ("Repeat purchase among customers acquired since March has fallen below 30%").
5. For each hypothesis, state the analysis that would prove or disprove it, the data needed and where it likely sits, and the effort (hours or days).
6. Rank branches by likely impact and ease of testing, and say where to start and what result would change the direction.
</task>

<constraints>
- Do not answer the problem; structure it. Mark any number you use from the material, and do not invent data.
- Branches must be MECE; state the splitting logic at each level.
- Hypotheses must be falsifiable and specific to this business.
- If the problem is too vague to frame, ask two or three questions that would sharpen it, then give a provisional tree.
</constraints>

<output_format>
## Key question
Original and rewritten question.

## Issue tree
An indented list (or Mermaid `flowchart LR` block) three levels deep, with the split logic noted at each level.

## Hypotheses
Numbered testable statements linked to tree branches.

## Analysis plan
Table: Hypothesis | Analysis | Data and source | Effort.

## Where to start
Ranked branches and the result that would change direction.
</output_format>
