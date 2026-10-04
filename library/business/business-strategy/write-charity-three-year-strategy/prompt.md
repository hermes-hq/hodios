---
schema: 1
id: write-charity-three-year-strategy
kind: prompt
title: Write a charity three-year strategy
description: Writes a three-year strategy for a small charity or community group - need, mission check, priorities, what to stop, resources and measures - in a short form trustees can approve.
category: business-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [executive, manager]
subject: [nonprofit]
requires: [none]
inputs: [text, notes, document]
output: [plan, docs]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [trustees, strategic-plan, mission, impact-measures, community-group, stop-list]
pairs_with:
  prompts: [build-theory-of-change, write-case-for-support, write-impact-report]
  personas: [nonprofit-advisor]
args:
  - name: organisation
    description: Your organisation - mission, what you do and for whom, income and its sources, staff and volunteers, what is going well and badly, and what trustees are worried about.
    type: text
    required: true
  - name: evidence
    description: Evidence of need and results - local data, waiting lists, user feedback, outcomes, funder reports, consultation findings. Optional; gaps will be marked.
    type: text
  - name: length
    description: How long the strategy document should be.
    type: enum
    enum: [two-page, six-page]
    default: two-page
output_contract:
  format: markdown
  sections: [Where we are, The need, Mission check, Our priorities, What we will stop or reduce, Resources, How we will know, Risks, For trustees to decide]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help the leader of a small charity, community group or social enterprise write a three-year strategy that trustees can approve and staff can use. Small-charity strategies often fail by listing everything the organisation already does as "priorities", by following funding instead of need, by having no "stop" list so new work is piled on old, and by setting measures that count activity (sessions run) rather than change for people. A good strategy is short, starts from evidence of need, makes three or four real choices, says what will stop, matches priorities to money and people, and says how progress will be reported to the board. Length: {{length}}.
</context>

<task>
<organisation>
{{organisation}}
</organisation>

{{#evidence}}
<evidence>
{{evidence}}
</evidence>
{{/evidence}}

1. Where we are: a fair summary of the organisation's position - strengths, weaknesses, income dependence (share from the largest funder), reserves if given, and what has changed outside (demand, funding, policy, partners).
2. The need: what the evidence says about the people served and unmet need. Separate evidence from belief; mark gaps as "to evidence".
3. Mission check: whether current work still fits the charitable purpose and mission, and any drift. Flag anything that may fall outside the charity's objects for trustees to check against the governing document.
4. Our priorities: three or four priorities for three years, each with the outcome for beneficiaries, the main activities, and what year one, two and three look like.
5. What we will stop or reduce: at least one activity, with the reason and how to wind it down fairly for users, staff and funders.
6. Resources: income plan by source (with a diversification aim where dependence is high), staff and volunteer needs, premises, and the reserves position to keep. Use placeholders for unknown figures.
7. How we will know: three to six outcome measures plus a few activity measures, with baseline (or "to set in year one"), how data is collected, and when it is reported to trustees.
8. Risks: the main risks to the strategy and the mitigation.
9. For trustees to decide: the decisions the board must take to adopt this strategy.
</task>

<constraints>
- Never invent statistics, funders, outcomes or quotes. Use the user's evidence and mark gaps.
- Keep it in plain words a volunteer or service user could read; no jargon like "leveraging synergies".
- Charity law, reporting and reserves rules differ by country; mention checking the governing document and the regulator's guidance where relevant, without stating rules.
- If the mission or current activities are missing, ask for them and stop.
- For the two-page length, keep each section to a few lines or one short table.
{{> output/uncertainty}}
</constraints>

<output_format>
## Where we are
Short paragraph and up to five bullets.
## The need
Bullets, each marked evidenced or to evidence.
## Mission check
Two to four sentences.
## Our priorities
Table: Priority | Outcome for beneficiaries | Year 1 | Year 2 | Year 3.
## What we will stop or reduce
Bullets with the reason and wind-down approach.
## Resources
Table: Resource | Now | Year 3 aim | Note.
## How we will know
Table: Measure | Baseline | Year 3 target | Data source | Reported.
## Risks
Table: Risk | Mitigation.
## For trustees to decide
Numbered decisions.
</output_format>
