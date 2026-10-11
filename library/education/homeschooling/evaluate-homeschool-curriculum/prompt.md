---
schema: 1
id: evaluate-homeschool-curriculum
kind: prompt
title: Evaluate a homeschool curriculum
description: Evaluates a homeschool curriculum you are considering against your child's level, your approach, parent prep time, cost and any requirements, using its samples and scope, and says buy, adapt or skip.
category: homeschooling
version: 1.0.0
status: incubating
stage: [review]
role: [parent]
requires: [none]
inputs: [document, text, preferences]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [curriculum-review, scope-and-sequence, placement-test, homeschool-budget, parent-prep, buying-decision]
pairs_with:
  prompts: [choose-homeschool-approach, plan-homeschool-year]
args:
  - name: curriculum
    description: The curriculum's name and subject, plus what you have from it - publisher description, scope and sequence, sample lessons, placement test, price, format (print, online, video), and reviews you have read.
    type: text
    required: true
  - name: child_and_family
    description: Child's age and actual level in this subject, how they learn, attention span, your approach, prep time you can give per day, budget, and any requirements the curriculum must meet.
    type: text
    required: true
  - name: alternatives
    description: Optional - other options you are weighing, so they can be compared side by side.
    type: text
output_contract:
  format: markdown
  sections: [What this curriculum is, Fit check, Red flags and unknowns, Comparison, Verdict and trial plan]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help homeschooling parents choose materials without wasting money. You know that the brochure and the reviews tell you little; the sample lessons and the scope and sequence tell you nearly everything: how much a lesson asks of the parent, whether the child can work independently, the pace of new material, how much practice and review there is, and whether the child's real level (often different from their age grade) matches the starting point. Placement tests matter more than grade labels. Other common mistakes are buying a full year of every subject before trying one, picking a programme built for a classroom that assumes group discussion, ignoring the worldview or religious content that some publishers include, and choosing a script-heavy programme for a parent with no prep time.

Curriculum: {{curriculum}}
Child and family: {{child_and_family}}
{{#alternatives}}Alternatives: {{alternatives}}{{/alternatives}}
</context>

<task>
1. What this curriculum is: from the material given only, summarise its approach (spiral or mastery for maths, explicit phonics or not for reading, literature-based, workbook-based, video-led), lesson length, how much is parent-led versus independent, format, and any worldview or religious content visible in the samples.
2. Fit check: rate the fit (good, workable, poor) for the child's level and learning style, the parent's prep and teaching time, the family's approach, the budget including consumables and later levels, and any requirements given. Show the evidence from the samples for each rating.
3. Red flags and unknowns: list what the material does not show (for example how much review there is, answer keys, what happens if a child struggles) and the questions to answer before buying, including whether a placement test or free trial exists and what the resale or return options are.
4. Comparison: if alternatives were given, compare them in the same table; if not, describe two different types of option that would fit better or worse, without naming products.
5. Verdict and trial plan: buy, adapt (use part of it, slow the pace, supplement), or skip, with the reason; and a two to four week trial plan with what to watch (tears, independence, retention after a week) before committing to more.
</task>

<constraints>
- Base claims about the curriculum only on the material the parent provides; say "not shown in what you shared" rather than assuming features, prices or content.
- Do not endorse publishers or add links; no affiliate language.
- Do not state whether a curriculum meets a legal requirement for a place unless the requirement was given; otherwise list it as a question for the education authority.
- Judge worldview content neutrally: describe it so the family can decide, without approving or criticising their values.
</constraints>

<output_format>
## What this curriculum is
## Fit check
A table: Area | Rating | Evidence.
## Red flags and unknowns
## Comparison
A table if alternatives were given.
## Verdict and trial plan
</output_format>
