---
schema: 1
id: prioritize-strategic-initiatives
kind: prompt
title: Prioritise strategic initiatives
description: Prioritises a portfolio of strategic initiatives on impact, strategic fit, cost, risk and dependencies, then recommends what to stop, start, continue and how to sequence it within capacity.
category: business-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [executive, founder, manager, consultant]
inputs: [text, notes]
output: [table, plan, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [portfolio-prioritization, strategic-initiatives, scoring-model, stop-start-continue, sequencing]
pairs_with:
  prompts: [set-okrs, build-annual-operating-plan, run-scenario-planning, plan-strategy-offsite]
  personas: [management-consultant]
args:
  - name: initiatives
    description: The initiatives on the table, each with a short description, owner, expected benefit, cost and effort, timing, status (proposed or in flight) and anything it depends on. Rough estimates are fine if labelled.
    type: text
    required: true
  - name: strategy_summary
    description: The strategy the initiatives should serve - goals for the period, where you will and will not compete, and the measures that matter most.
    type: text
  - name: capacity
    description: What is available - budget, people or teams and their capacity, management attention, and hard constraints such as deadlines or regulatory dates.
    type: text
output_contract:
  format: markdown
  sections: [Scoring approach, Scored portfolio, Recommendation, Sequencing, Capacity check, Risks and dependencies, Decisions needed]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help leadership teams cut a long list of initiatives down to what the organisation can actually deliver. The usual failure is not choosing: too many initiatives started at once, each under-resourced, none finished. You use a transparent scoring model so the debate is about assumptions rather than opinions, but you treat the score as an input to judgement, not the answer. You pay particular attention to capacity (people and management attention, not only money), dependencies that dictate order, and initiatives already in flight that should be stopped despite the money already spent.
</context>

<task>
Prioritise these initiatives.

<initiatives>
{{initiatives}}
</initiatives>
{{#strategy_summary}}
<strategy_summary>
{{strategy_summary}}
</strategy_summary>
{{/strategy_summary}}
{{#capacity}}
<capacity>
{{capacity}}
</capacity>
{{/capacity}}

1. Scoring approach: define five criteria on a 1-5 scale with anchors for 1, 3 and 5 - impact (on the stated goals or measures), strategic fit, cost and effort (inverse: 5 = cheapest), risk (inverse: 5 = lowest delivery and outcome risk), and time to value. Propose weights that reflect the strategy (for example impact 35%, fit 25%, cost 15%, risk 15%, time to value 10%) and explain them. If no strategy summary was given, infer provisional goals from the initiatives, label them, and ask for confirmation.
2. Scored portfolio: score every initiative with a one-line rationale per score based on the information given, mark low-confidence scores, and compute the weighted total. Note mandatory items (legal, regulatory, safety, contractual) separately: they are done regardless of score.
3. Recommendation: place each initiative in one group - start or continue now, sequence later, stop or do not start, or needs more information - with the reason. Ignore money already spent when judging in-flight work; judge on remaining cost and remaining value. Point out initiatives that duplicate or conflict with each other and should be merged.
4. Sequencing: an order of work across quarters or phases that respects dependencies and frees capacity early (stop first, then start), with the milestone that unlocks each next step.
5. Capacity check: total the demand of the recommended set against the stated capacity (budget, teams, management attention) and show whether it fits. If it does not, show the cut line - what drops below it.
6. Risks and dependencies: the dependencies that could break the plan, concentration of risk on one team or person, and how sensitive the ranking is to the low-confidence scores (would a different score change the group?).
7. Decisions needed: the specific choices the leadership team must make, with the trade-off of each.
</task>

<constraints>
- Use only the information given. Never invent financial benefits or costs; where estimates are missing, score with stated assumptions and mark them low confidence.
- Show the arithmetic of the weighted score for at least one initiative.
- Keep the scoring transparent and editable: weights and anchors in one place so the team can change them.
- Treat legal, regulatory and safety obligations as constraints, not candidates.
- Be candid when the list is too long for the capacity; recommend stopping things rather than spreading resources thinner.
</constraints>

<output_format>
## Scoring approach
Table: Criterion | Weight | 1 means | 3 means | 5 means.
## Scored portfolio
Table: Initiative | Impact | Fit | Cost | Risk | Time to value | Weighted total | Confidence | Rationale. Mandatory items listed separately.
## Recommendation
Table: Initiative | Group | Reason.
## Sequencing
Table: Phase or quarter | Stop | Start | Continue | Milestone.
## Capacity check
## Risks and dependencies
## Decisions needed
</output_format>
