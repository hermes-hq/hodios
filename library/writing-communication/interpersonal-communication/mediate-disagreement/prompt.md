---
schema: 1
id: mediate-disagreement
kind: prompt
title: Mediate a disagreement
description: Mediates a disagreement neutrally by restating each position fairly, finding the interests underneath, separating factual from value differences and proposing options both sides can accept.
category: interpersonal-communication
version: 1.0.0
status: experimental
stage: [plan]
role: [manager, project-manager, parent, individual]
requires: [none]
inputs: [text, transcript, message]
output: [report, ideas]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [conflict-resolution, interest-based-negotiation, neutrality, common-ground]
pairs_with:
  prompts: [prepare-difficult-conversation, give-feedback-sbi]
args:
  - name: positions
    description: Each side's position in their own words where possible (paste messages or summarise), labelled by person or team.
    type: text
    required: true
  - name: context
    description: Optional background, such as the relationship, constraints (deadline, budget, policy), what has been tried and who decides if they cannot agree.
    type: text
output_contract:
  format: markdown
  sections: [Positions restated, Underlying interests, Common ground, The real differences, Options, Questions for each side, Suggested next step]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most disagreements stall because each side argues for a position (what they want) instead of explaining their interests (why they want it), and because factual disputes, value differences and constraints get mixed together. Interest-based negotiation (Fisher and Ury's "Getting to Yes") separates the people from the problem, looks for options that serve both sides' interests, and agrees on fair criteria for choosing. A mediator earns trust by restating each side so well that its own holder says "yes, that's exactly it", and by not taking sides.
</context>

<task>
Mediate this disagreement:
<positions>
{{positions}}
</positions>
{{#context}}
Context:
<context_notes>
{{context}}
</context_notes>
{{/context}}

1. If fewer than two positions are described, ask for the other side's view in their own words and stop. If only one side's account is available, say that the restatement of the other side is a guess to be checked.
2. Check whether mediation is appropriate. If the input involves harassment, abuse, discrimination, threats, or a serious misconduct complaint, do not mediate it as a disagreement between equals: say it should go to HR, a manager with authority, or the relevant authority, and stop.
3. Restate each position neutrally and in its best form, using the person's own reasoning, so each side would accept it as fair.
4. For each side, infer the interests underneath: needs, worries, goals, constraints. Mark inferred interests as such.
5. List genuine common ground, including shared goals.
6. Classify the real differences: facts (resolvable with evidence; say what evidence), predictions (resolvable with a test or pilot), values or priorities (need a trade-off or a decision rule), constraints, or misunderstanding (they actually agree).
7. Propose three to five options that serve both sides' interests, including at least one creative option and one way to reduce the stakes (a trial, a review date, splitting the decision).
8. Suggest objective criteria to choose among options, and who should decide if they still cannot agree.
</task>

<constraints>
- Stay neutral. Do not declare a winner, and do not split the difference by reflex. If the evidence clearly favours one side on a factual question, say what the evidence shows and leave the decision to them.
- Use neutral wording throughout; describe behaviour, not character.
- Do not invent facts about either side; ask through the questions section.
- If one side has power over the other (manager and report, parent and child), name it and account for it in the options.
</constraints>

<output_format>
## Positions restated
One short paragraph per side.
## Underlying interests
Per side, bullets, inferred ones marked "(inferred)".
## Common ground
Bullets.
## The real differences
A table: Difference | Type (fact, prediction, value, constraint, misunderstanding) | How it could be resolved.
## Options
A table: Option | Serves A because… | Serves B because… | Trade-off.
## Questions for each side
Two or three per side that would move things forward.
## Suggested next step
One concrete next step, with the decision criteria and who decides if needed.
</output_format>
