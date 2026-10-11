---
schema: 1
id: write-expert-panel-prompt
kind: prompt
title: Write an expert panel prompt
description: Writes a prompt that has an AI critique a plan from several distinct expert perspectives, with forced disagreement, evidence for each view, and a synthesis that keeps the unresolved conflicts.
category: prompt-engineering
version: 1.0.0
status: incubating
stage: [design, review]
role: [founder, product-manager, consultant, manager]
requires: [none]
inputs: [text, document]
output: [prompt, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [multi-perspective, plan-critique, devils-advocate, sycophancy, reusable-prompt]
pairs_with:
  prompts: [run-six-thinking-hats, write-judge-prompt, red-team-prompt]
  personas: [prompt-engineer]
args:
  - name: subject
    description: What will be put in front of the panel, for example "business plans for new shop locations" or "architecture proposals before review".
    type: text
    required: true
  - name: decision
    description: The decision the panel informs and what is at stake.
    type: text
    required: true
  - name: perspectives
    description: Optional - the viewpoints you want (finance, legal, operations, customer, security, a sceptical investor). Otherwise the prompt proposes them.
    type: text
output_contract:
  format: markdown
  sections: [Panel design, Prompt, How to use the output]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write prompts that simulate a review panel. Asking an assistant "what do you think of my plan?" tends to produce agreement with polite caveats; asking it to role-play "a panel of experts" often produces several voices saying the same thing in different tones, all reaching consensus by the end. A panel prompt is useful only when the perspectives have genuinely different goals and incentives (the person who pays, the person who operates it, the person who carries the risk, the end user, the sceptic), each one must find the strongest objection from its own angle with evidence from the plan, at least one must argue against the plan's core assumption, and the synthesis keeps disagreements visible instead of averaging them away. It is also honest about its limit: simulated experts reuse one model's knowledge and blind spots and are no substitute for asking real people with skin in the game.

Subject: {{subject}}

Decision: {{decision}}
{{#perspectives}}

Perspectives wanted: {{perspectives}}
{{/perspectives}}
</context>

<task>
1. Panel design: choose four or five perspectives with different goals, each with what they care about, what they would be blamed for, and the question they always ask. Avoid real named people. Assign one panellist to attack the central assumption. Say which real people the user should still consult.
2. Write the prompt. It tells the assistant to: read the plan in delimited tags; for each panellist, independently, give the top three concerns with the plan text that triggers each, what evidence would change their mind, and a verdict (support, support with conditions, oppose); then a round where panellists respond to the strongest concern of one other panellist; then a synthesis listing agreements, unresolved disagreements, the riskiest assumption, and the cheapest tests or questions that would settle each disagreement. The prompt forbids generic praise and consensus for its own sake.
3. How to use the output: treat concerns as questions to check, not facts; verify any figures or regulations a panellist cites; rerun after revising the plan; bring the unresolved disagreements to real stakeholders.
</task>

<constraints>
- Panellists are role descriptions, not impersonations of real, named individuals.
- Panellists must not invent facts about the market, laws or numbers; they flag what needs checking.
- For legal, medical, financial or safety plans, the prompt states that simulated perspectives do not replace a qualified professional.
- Keep the prompt under about 400 words and model-agnostic.
</constraints>

<output_format>
## Panel design
Table: Panellist | Goal | Blamed for | Signature question.
## Prompt
In a fenced code block with [PLAN] and [DECISION] placeholders.
## How to use the output
Short bullets.
</output_format>
