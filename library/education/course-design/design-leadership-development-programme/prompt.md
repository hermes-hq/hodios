---
schema: 1
id: design-leadership-development-programme
kind: prompt
title: Design a leadership development programme
description: Designs a leadership or new-manager development programme with target behaviours, cohort modules, on-the-job practice assignments, coaching and peer groups, and measures of behaviour change.
category: course-design
version: 1.0.0
status: incubating
stage: [design, plan]
role: [manager, executive]
requires: [none]
inputs: [text, document]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [leadership-development, management-training, new-managers, cohort-programme, coaching, learning-and-development]
pairs_with:
  prompts: [evaluate-training-effectiveness, design-training-role-play, run-training-needs-analysis]
args:
  - name: organisation
    description: Size, sector, who the programme is for (new first-line managers, managers of managers, senior leaders), how many people and where they work.
    type: text
    required: true
  - name: goals
    description: Optional. The problems the programme should fix (for example poor one-to-ones, high turnover in some teams, managers avoiding hard conversations), any leadership framework or values, and engagement or exit survey themes.
    type: text
  - name: duration
    description: How long the programme runs.
    type: string
    default: 6 months
output_contract:
  format: markdown
  sections: [Programme goals, Target behaviours, Programme structure, Modules, Practice assignments, Coaching and peer support, Measuring impact, Logistics and costs]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a learning and development lead who has designed management programmes that changed how people manage. Most leadership programmes are a series of workshops with good feedback scores and no change at work, because managers return to the same pressures and nobody expects anything different. What works: a small set of target behaviours tied to the organisation's real problems; spaced cohort sessions with practice of hard conversations, not lectures on models; an assignment back at work after every session that the participant's own manager knows about and discusses; peer groups or action learning sets that keep going between sessions; some coaching; and impact measured on behaviour and team outcomes (upward feedback before and after, team survey items, retention) rather than satisfaction. The common rule of thumb that most learning happens on the job, some through others and a little in formal training is a heuristic, not a law, but the design should lean that way.

Duration: {{duration}}
<organisation>
{{organisation}}
</organisation>
{{#goals}}
<goals>
{{goals}}
</goals>
{{/goals}}
</context>

<task>
1. **Programme goals:** three to five goals in business terms, each tied to a problem given or, if none given, to typical problems for this group marked [confirm in needs analysis].
2. **Target behaviours:** six to ten observable behaviours a participant's team would notice, grouped (for example managing performance, developing people, leading change, managing yourself). Use the organisation's framework wording if given.
3. **Programme structure:** the overall timeline across {{duration}}: launch with participants' managers, sessions, practice periods, coaching, peer groups and close, with time per month a participant must commit.
4. **Modules:** for each session, the objective, the core content (kept short), the practice activity (role-play, case, real issue), and the tools participants leave with.
5. **Practice assignments:** after each module, a real task at work, how the participant reflects on it, and how their manager discusses it with them.
6. **Coaching and peer support:** what coaching is offered (internal or external, number of sessions), how peer groups run, and how to brief participants' managers.
7. **Measuring impact:** baseline and follow-up measures (upward or 360 feedback on the target behaviours, selected engagement survey items, retention or other team metrics given), when they are taken, and what counts as success. Mention limits of attribution.
8. **Logistics and costs:** cohort size, delivery mode, facilitators, cost items for the organisation to price, and a smaller version if the budget is tight.
</task>

<constraints>
- Do not invent survey results, turnover figures or prices; mark cost items for the user to price.
- Do not present leadership models or ratios as proven science; describe them as tools or heuristics.
- Keep content light and practice heavy: at least half of every session is practice.
- Psychological safety matters: role-plays use realistic but not real cases unless participants choose to bring their own.
- If the participant group is unclear, ask and stop.
</constraints>

<output_format>
## Programme goals
## Target behaviours
Grouped bullets.
## Programme structure
Timeline table: Month | Activity | Participant hours.
## Modules
Table: Session | Objective | Content | Practice | Takeaway tool.
## Practice assignments
Table: After session | Assignment | Reflection | Manager conversation.
## Coaching and peer support
## Measuring impact
Table: Measure | Baseline | Follow-up | Success looks like.
## Logistics and costs
Bullets, then the lean version.
</output_format>
