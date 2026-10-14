---
schema: 1
id: scope-ux-research-project
kind: prompt
title: Scope a UX research project
description: Scopes one UX study with method, participant numbers, timeline, costs and team effort, offering a lean, a recommended and a fuller option so the team can choose.
category: ux-research
version: 1.0.0
status: incubating
stage: [plan]
role: [ux-researcher, designer, product-manager, consultant]
requires: [none]
inputs: [text, notes]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [research-scoping, research-budget, study-timeline, research-proposal, effort-estimate]
pairs_with:
  prompts: [size-ux-research-sample, write-usability-test-plan, plan-ux-research-roadmap]
  personas: [ux-researcher]
args:
  - name: question
    description: The decision the research should inform and what the team needs to learn, for example "should we rebuild onboarding or fix the current flow".
    type: text
    required: true
  - name: limits
    description: Deadline, budget, who can work on it and for how many hours, access to users, and tools already paid for.
    type: text
    required: true
  - name: audience
    description: Who the participants would be and how hard they are to reach. Optional.
    type: text
output_contract:
  format: markdown
  sections: [The decision and questions, Three options, Effort and cost breakdown, Timeline, Assumptions and risks, Recommendation]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most research estimates are wrong in the same direction. Teams count session hours and forget the work around them: recruiting usually takes one to three weeks and is the most common cause of delay, a one-hour interview costs three to five hours once preparation, note-taking, analysis and reporting are added, no-shows run around 10 to 20 percent, and stakeholder review of the plan and the readout takes calendar time. Scoping also fails when the study is sized to the budget rather than to the decision: a cheap study that cannot answer the question wastes money, and a large one for a reversible decision wastes time. Presenting a lean, a recommended and a fuller option, each tied to what it can and cannot answer, lets the decision-maker trade confidence for speed knowingly.
</context>

<task>
<question>
{{question}}
</question>

<limits>
{{limits}}
</limits>
{{#audience}}

<audience>
{{audience}}
</audience>
{{/audience}}

1. Restate the decision, how reversible it is, and 2 to 4 research questions. If the question is too vague to scope, say what is missing and scope only what is clear.
2. Build three options (lean, recommended, fuller). For each: method, participants and segments, what it can answer, what it cannot.
3. Break down effort per option by phase: planning, recruiting, sessions, analysis, reporting and sharing. Use hours per session multipliers and say which you assumed.
4. List costs per option: incentives, recruitment fees, tools, travel, translation. Give ranges or placeholders for the team to fill; never present a price as fact.
5. Lay out a week-by-week timeline for the recommended option, with recruiting lead time and review points.
6. State assumptions and risks (recruiting difficulty, no-shows, stakeholder availability) and the mitigation for each.
7. Recommend one option and say what would change the recommendation.
</task>

<constraints>
- Do not invent prices, rates or vendor names; use ranges labelled as assumptions or ask the team to fill them.
- Every option must say what it cannot answer.
- Do not pad the lean option into uselessness or inflate the fuller one; each must be a real choice.
- If the timeline cannot fit the deadline, say so plainly instead of compressing phases to zero.
</constraints>

<output_format>
## The decision and questions
## Three options
| | Lean | Recommended | Fuller |
|---|---|---|---|
| Method | | | |
| Participants | | | |
| Answers | | | |
| Cannot answer | | | |
## Effort and cost breakdown
| Phase | Lean (hours) | Recommended (hours) | Fuller (hours) |
Then a cost list per option.
## Timeline
## Assumptions and risks
## Recommendation
</output_format>
