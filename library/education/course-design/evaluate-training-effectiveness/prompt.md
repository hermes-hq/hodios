---
schema: 1
id: evaluate-training-effectiveness
kind: prompt
title: Plan a training evaluation
description: Builds an evaluation plan for a training programme across reaction, learning, behaviour and results, with survey items, assessments, success measures and a data timeline.
category: course-design
version: 1.0.0
status: incubating
stage: [plan, verify]
role: [manager, consultant, operations-manager]
requires: [none]
inputs: [text, spec]
output: [plan, table, questions]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [learning-and-development, training-evaluation, kirkpatrick, learning-transfer, measurement]
pairs_with:
  prompts: [run-training-needs-analysis, design-microlearning-series, design-workshop]
  personas: [instructional-designer]
args:
  - name: programme_description
    description: The training programme, e.g. audience, objectives, format, length, and when it runs.
    type: text
    required: true
  - name: business_goal
    description: Optional result the organisation wants, e.g. "reduce safety incidents by 20%", "cut onboarding time to productivity from 12 to 8 weeks".
    type: text
output_contract:
  format: markdown
  sections: [Evaluation logic, Success measures, Level 1 reaction survey, Level 2 learning assessment, Level 3 behaviour on the job, Level 4 results, Timeline and owners, Caveats]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most training is evaluated with a satisfaction survey on the last day, which says whether people liked it, not whether they learned, changed what they do, or moved a business result. A useful evaluation plan is designed backwards from the result the organisation cares about, through the on-the-job behaviours that should drive that result, to the knowledge and skills the training builds, and it is set up before the programme runs so baselines exist. The four classic levels (reaction, learning, behaviour, results) are a useful frame as long as each level measures something meaningful: reaction items about usefulness and intent to apply rather than enjoyment, learning measured by performing tasks rather than recalling slides, behaviour observed or reported weeks later, and results compared with a baseline or a comparison group.
</context>

<task>
Build an evaluation plan for this programme.

<programme_description>
{{programme_description}}
</programme_description>
{{#business_goal}}
<business_goal>
{{business_goal}}
</business_goal>
{{/business_goal}}

1. **Evaluation logic:** a chain from the business result, to 2 to 4 critical on-the-job behaviours, to the knowledge and skills the training builds, to the learning experience. If no business goal is given, propose one that fits the programme, mark it "proposed", and say who should confirm it.
2. **Success measures:** for each level, the indicator, the target, the baseline needed, the data source and the timing.
3. **Level 1 reaction survey:** 6 to 8 items focused on relevance, confidence and intent to apply, with answer scales that distinguish good from great (described anchors rather than a bare 1 to 5 agree scale), plus two open questions.
4. **Level 2 learning assessment:** how learners show they can do the skill (scenario questions, a demonstration, a work sample), with 3 example items or tasks, a pass standard, and a pre-test or confidence baseline where useful.
5. **Level 3 behaviour on the job:** what will be observed or reported, by whom (manager checklist, peer observation, system data, self-report with examples), at 30 and 90 days or similar, and the support needed for transfer (manager conversations, job aids, practice opportunities). Include barriers to watch for.
6. **Level 4 results:** the metric, how to separate the training's contribution from other factors (comparison group, staggered rollout, trend before and after, participant estimates of contribution), and how to report it honestly.
7. **Timeline and owners:** what is collected when, by whom, and when results are reported.
8. **Caveats:** limits of the design and the main threats to the conclusions.
</task>

<constraints>
- Keep the plan proportionate to the programme's size and cost; for small programmes, recommend the lightest design that still answers whether it worked.
- Do not claim the training caused a result unless the design can support it. Say what kind of claim each design allows.
- Use only information in the description; mark anything assumed.
- Survey and assessment items must be specific to this programme, not generic.
- If the programme description is too thin (no audience or objectives), ask for those and stop.
- Protect participants: aggregate individual data where possible and say who sees what.
</constraints>

<output_format>
## Evaluation logic
Result → behaviours → skills → learning, as a short chain.
## Success measures
Table: Level | Indicator | Target | Baseline | Source | When.
## Level 1 reaction survey
Numbered items with anchored scales; open questions.
## Level 2 learning assessment
Method, example items or tasks, pass standard.
## Level 3 behaviour on the job
What, who, when, transfer supports, barriers.
## Level 4 results
Metric, attribution approach, reporting.
## Timeline and owners
Table: When | What is collected | Owner.
## Caveats
Bullets.
</output_format>
