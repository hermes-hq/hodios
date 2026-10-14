---
schema: 1
id: design-agent-review-loop
kind: prompt
title: Design an agent implement-and-review loop
description: Designs a loop where one coding agent implements and another reviews, with review criteria, an iteration cap, the feedback format, oscillation checks and when a human steps in.
category: meta
version: 1.0.0
status: incubating
stage: [design]
role: [tech-lead, software-engineer, ml-engineer]
requires: [none]
inputs: [text]
output: [plan, prompt, config]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [coding-agents, multi-agent, agent-review, iteration-limits]
pairs_with:
  prompts: [define-specialist-subagent, write-subagent-brief, write-ai-reviewer-instructions, verify-agent-completion-claims]
args:
  - name: use_case
    description: What the loop will build (bug fixes, small features, migrations), the repository's checks, how it is run (interactive, CI, scripted), and any budget limits.
    type: text
    required: true
  - name: problems
    description: What goes wrong today with a single agent, or with a loop you already tried.
    type: text
output_contract:
  format: markdown
  sections: [Loop design, Reviewer prompt, Feedback format, Stop rules, Cost and risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A second agent reviewing the first catches real problems only under a few conditions. The reviewer needs fresh context (not the implementer's reasoning, which it will tend to agree with), a different brief focused on finding faults, the requirement and the diff, and the authority to run checks. Its criteria must be concrete and ranked, or it fills every round with style nits that the implementer dutifully "fixes" while the real issue survives. Without an iteration cap, loops run until the budget is gone; without an oscillation check, the implementer flips between two versions to satisfy alternating comments. Only blocking findings should go back automatically; the rest belong in a note for the human. The human steps in when the reviewer and implementer disagree twice on the same point, when a finding touches security or data, or when the cap is reached.
</context>

<task>
Design the loop for this use case.
<use_case>
{{use_case}}
</use_case>
{{#problems}}
<problems>
{{problems}}
</problems>
{{/problems}}

1. Loop design: the roles, what each receives as input (requirement, diff, check results, previous findings), what each may do (the reviewer reads and runs checks, does not edit), and the sequence with deterministic checks (tests, lint, type-check) before any review round.
2. Review criteria ranked: requirement met, correctness and edge cases, tests real and not weakened, scope, security-sensitive changes, then maintainability. Define blocking versus non-blocking.
3. Write the reviewer prompt: under about 30 lines, with the criteria, the rule to cite file and line and evidence for each finding, and the return format.
4. Feedback format: what goes back to the implementer (blocking findings only, each with evidence and the expected outcome, not a dictated fix).
5. Stop rules: iteration cap (two or three rounds is typical), oscillation detection (a finding reappears or a change reverts an earlier one), disagreement escalation, and conditions that always need a human.
6. Cost and risks: rough cost per round relative to one implementation, failure modes of the loop itself (reviewer and implementer sharing a blind spot, rubber-stamping), and how to measure whether the loop beats a single agent with human review.
</task>

<constraints>
- The loop never merges or deploys by itself; the final step is a human review.
- Do not claim a specific accuracy gain; propose how to measure it.
- If the agent tool's syntax for subagents or scripting is uncertain, mark it "check against the tool's documentation".
</constraints>

<output_format>
## Loop design
Numbered sequence with inputs and permissions per role.
## Reviewer prompt
Fenced block.
## Feedback format
Fenced template.
## Stop rules
Bullets.
## Cost and risks
Bullets and the measurement plan.
</output_format>
