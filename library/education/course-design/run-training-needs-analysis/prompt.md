---
schema: 1
id: run-training-needs-analysis
kind: prompt
title: Run a training needs analysis
description: Runs a training needs analysis that separates skill gaps from process, resource and motivation problems, prioritises needs and recommends training only where it will help.
category: course-design
version: 1.0.0
status: incubating
stage: [discover]
role: [manager, consultant, operations-manager]
requires: [none]
inputs: [text, notes, dataset]
output: [report, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [learning-and-development, needs-analysis, performance-consulting, root-cause, corporate-training]
pairs_with:
  prompts: [evaluate-training-effectiveness, design-elearning-module, design-workshop]
  personas: [instructional-designer]
args:
  - name: performance_problem
    description: What is going wrong, in observable terms, e.g. "new support agents take 12 minutes per ticket vs a 7-minute target" or "managers are not holding monthly one-to-ones".
    type: text
    required: true
  - name: audience
    description: Who the problem involves, e.g. "40 tier-1 support agents, 3 sites, 0-6 months tenure".
    type: string
    required: true
  - name: evidence
    description: Optional data or observations, e.g. metrics, survey results, error logs, interview notes, what has been tried.
    type: text
output_contract:
  format: markdown
  sections: [Problem statement, Gap, Cause analysis, What training can and cannot fix, Prioritised needs, Recommendations, Data still needed]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
"We need training" is usually a solution looking for a problem. Many performance gaps come from the environment rather than the person: unclear expectations, missing feedback, poor tools or processes, too little time, or incentives that reward something else. Training fixes only gaps in knowledge and skill, and it fails when people already know how but cannot or will not do it under real conditions. A classic test: if their lives depended on it, could they do it? If yes, it is not a skill problem. A good needs analysis defines the performance gap in measurable terms, sorts causes into environment and individual factors (information, resources, incentives; knowledge and skill, capacity, motivation), and recommends the cheapest effective fix for each.
</context>

<task>
Analyse this performance problem.

<performance_problem>
{{performance_problem}}
</performance_problem>
Audience: {{audience}}
{{#evidence}}
<evidence>
{{evidence}}
</evidence>
{{/evidence}}

1. **Problem statement:** restate the problem as observable behaviour and results, and name the business impact. If the problem is stated as a solution ("they need a course on X") or as an attitude ("they don't care"), rewrite it as behaviour.
2. **Gap:** the current performance vs the desired performance with numbers where the evidence gives them, and whether the gap is everyone, a subgroup (new starters, one site, one shift) or a few individuals.
3. **Cause analysis:** for each plausible cause, sort it into one of six factors (expectations and information, tools and resources, incentives and consequences, knowledge and skill, capacity, motivation), state the evidence for and against it, and rate it likely, possible or unlikely. Include the questions that would confirm it.
4. **What training can and cannot fix:** which causes training would address, which need a non-training fix (job aid, process change, clearer targets, feedback, tool fix, staffing, incentives), and which need both.
5. **Prioritised needs:** rank the needs by impact on the gap and effort to fix.
6. **Recommendations:** for the top needs, the specific intervention, who owns it, how quickly it can help, and how success will be measured. If training is recommended, state its performance objective (what learners will do on the job), the audience segment, and the format that fits (on-the-job practice, job aid plus short session, coaching, e-learning).
7. **Data still needed:** the 3 to 5 pieces of evidence that would most change the conclusions, and a quick way to get each (for example observing three people doing the task, five short interviews, pulling a report).
</task>

<constraints>
- Do not assume training is the answer. If the evidence points elsewhere, say so plainly, even if the request was for a course.
- Base every cause on the evidence given or mark it as a hypothesis to test. Do not invent metrics or survey results.
- Describe people's behaviour and conditions, not their character; avoid blaming individuals for system problems.
- If the problem is too vague to analyse (no behaviour, no audience, no measure), ask up to three questions and stop.
- Keep recommendations proportionate to the size of the gap and the audience.
</constraints>

<output_format>
## Problem statement
One or two sentences, plus business impact.
## Gap
Current vs desired, and who it affects.
## Cause analysis
Table: Cause | Factor | Evidence for | Evidence against | Rating | Question to confirm.
## What training can and cannot fix
Three short lists: training · non-training · both.
## Prioritised needs
Numbered, with impact and effort.
## Recommendations
Table: Need | Intervention | Owner | Time to effect | Success measure. Then training objectives if any.
## Data still needed
Bullets with how to get each.
</output_format>
