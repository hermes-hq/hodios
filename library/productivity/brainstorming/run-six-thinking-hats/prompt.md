---
schema: 1
id: run-six-thinking-hats
kind: prompt
title: Run six thinking hats
description: Explores a problem through the six thinking hats in a disciplined order - facts, feelings, risks, benefits, alternatives and process - and ends with a balanced view and next steps.
category: brainstorming
version: 1.0.0
status: incubating
stage: [discover, plan]
inputs: [text, topic]
output: [report, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
tags: [six-thinking-hats, parallel-thinking, structured-discussion, team-workshop]
pairs_with:
  personas: [thinking-partner]
  prompts: [brainstorm-ideas, steelman-opposing-view]
args:
  - name: problem
    description: The problem, decision or proposal, with the context, people involved and any deadline.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Blue hat - framing, White hat - facts, Red hat - feelings, Black hat - risks, Yellow hat - benefits, Green hat - alternatives, Blue hat - synthesis, Next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The six thinking hats method makes a group (or one person) look at a problem in one mode at a time instead of arguing across modes. Its value comes from discipline: facts stay separate from feelings, and criticism does not crowd out benefits and new options. A plain "pros and cons" collapses all of this into two lists and usually lets the loudest mode win.

<problem>
{{problem}}
</problem>
</context>

<task>
1. Blue hat (framing): state the question being decided in one sentence, what a good outcome looks like, and the assumptions you are making about missing context. If the problem is too thin to work on, ask up to three questions and stop.
2. White hat (facts): what is known from the text, what is unknown, and what information would most change the decision. Write unknowns as questions; do not fill them with guesses.
3. Red hat (feelings): the gut reactions and emotions likely to be in play for each person or group involved, stated without justification, as the method intends. Mark these as likely reactions, not facts.
4. Black hat (risks): what could go wrong, why, and how likely and how serious it is. Include the risk of doing nothing.
5. Yellow hat (benefits): what could go right and why, with the conditions needed for the best case.
6. Green hat (alternatives): at least four options, including ones that change the framing, combine options, or test before committing.
7. Blue hat (synthesis): weigh what the hats showed, give a balanced view and a recommendation if one is warranted, and say what would change it.
8. Next steps: three to six concrete actions with an owner (a role, not an invented name) and a timing.
</task>

<constraints>
- Keep each hat in its own mode. No rebuttals inside Black or Yellow, and no reasons inside Red.
- Treat Black and Yellow with equal effort: similar depth and similar numbers of points.
- Do not invent facts, numbers or quotes. Everything in White comes from the problem text or is written as an open question.
- Be specific to this situation; drop any point that would fit every problem.
- If the problem is a simple factual question rather than a decision or problem with trade-offs, answer it briefly and say the method is not needed.
</constraints>

<output_format>
## Blue hat - framing
Three lines: The question, A good outcome, Assumptions.
## White hat - facts
Three short lists: Known, Unknown, Would change the decision.
## Red hat - feelings
Bullets, one per person or group.
## Black hat - risks
Table: Risk | Why | Likelihood (H/M/L) | Impact (H/M/L).
## Yellow hat - benefits
Bullets, each with the condition it depends on.
## Green hat - alternatives
Numbered options, one or two sentences each.
## Blue hat - synthesis
One short paragraph, then "Would change this view:" with one or two bullets.
## Next steps
Table: Action | Owner | By when.
</output_format>
