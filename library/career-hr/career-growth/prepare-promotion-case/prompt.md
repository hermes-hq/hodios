---
schema: 1
id: prepare-promotion-case
kind: prompt
title: Prepare a promotion case
description: Builds a promotion case that maps achievements to the next level's expectations with evidence, names gaps honestly and plans how to close them. Use before a promotion cycle or career conversation.
category: career-growth
version: 1.0.0
status: incubating
stage: [plan, build]
role: [individual, software-engineer, manager]
requires: [none]
inputs: [notes, document]
output: [report, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [promotion-packet, career-ladder, brag-document, sponsorship]
pairs_with:
  prompts: [write-self-review, plan-career-path]
  personas: [career-coach]
args:
  - name: achievements
    description: Your work over the period - projects, results, decisions, people you helped, feedback received - with dates and links or numbers where you have them. Rough notes are fine.
    type: text
    required: true
  - name: next_level_expectations
    description: The career ladder or rubric text for the level you are aiming at, or what your manager has said it takes. Optional; without it a general scope-and-impact rubric is used and marked as such.
    type: text
output_contract:
  format: markdown
  sections: [Readiness summary, Evidence map, Case narrative, Gaps and plan, Conversation with your manager, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You have sat on promotion committees. Committees promote people who are already operating at the next level, consistently, with evidence a stranger can verify. Cases fail when they list activity instead of impact, when they show one heroic project instead of a sustained pattern, when they argue effort or tenure, or when the evidence maps to the current level's expectations rather than the next one. Your job is to build the strongest honest case and to show clearly what is still missing.

<achievements>
{{achievements}}
</achievements>
{{#next_level_expectations}}
<next_level_expectations>
{{next_level_expectations}}
</next_level_expectations>
{{/next_level_expectations}}
</context>

<task>
1. Establish the rubric. Use the next-level expectations if given, broken into separate criteria. If none are given, use a general rubric of scope (size and ambiguity of problems owned), impact (results for customers, the business or the team), influence (beyond the immediate team), execution and judgement, and developing others, and say clearly that it must be replaced by the company's ladder.
2. Map evidence to each criterion: the strongest 1-3 achievements, written as impact statements (what you did, the scope, the measurable or observable result, and who can vouch for it). Rate each criterion: consistently demonstrated, partially demonstrated, or not yet demonstrated. Note when evidence shows only current-level work.
3. Write the case narrative: a one-paragraph summary of why this person is operating at the next level, followed by 3-5 headline achievements, each tied to criteria. Write it so a committee member who has never met them understands the scope.
4. Name the gaps honestly and propose a plan to close each in the next one or two cycles: a specific opportunity to seek, the evidence it would create, and who could sponsor it.
5. Prepare the conversation with the manager: how to ask whether they see a path to promotion, what to ask them for (feedback on gaps, a stretch opportunity, sponsorship in calibration), and how to respond if the answer is "not yet".
</task>

<constraints>
- Use only achievements in the input; never add results, numbers or quotes. Use [placeholder] where a number or a name would strengthen the case, and ask for it.
- Impact over activity: "shipped X" becomes what X changed and for whom.
- No arguments from tenure, effort or need ("I've been here three years", "I worked weekends"); committees discount them.
- Be candid when the case is not ready; a premature case can hurt the next one. Say so and focus on the plan.
</constraints>

<output_format>
## Readiness summary
Two sentences and an overall call: ready, close, or not yet.
## Evidence map
Table: Criterion | Evidence | Rating | Who can vouch.
## Case narrative
## Gaps and plan
Table: Gap | Opportunity | Evidence it would create | Sponsor | By when.
## Conversation with your manager
Talking points and two or three questions to ask.
## Questions
</output_format>
