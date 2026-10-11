---
schema: 1
id: break-agent-fix-loop
kind: prompt
title: Break an agent's failing fix loop
description: Breaks a coding agent out of a loop of failed fixes by stopping edits, listing the hypotheses already tried, gathering real evidence and choosing a different approach or a reset.
category: meta
version: 1.0.0
status: incubating
stage: [operate]
role: [software-engineer]
requires: [none]
inputs: [transcript, logs, text]
output: [message, plan]
risk: read-only
invocation: user
effort: quick
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [coding-agents, debugging-loop, course-correction, root-cause]
pairs_with:
  prompts: [recover-from-bad-agent-session, review-agent-transcript, write-agent-handoff]
args:
  - name: loop
    description: The last several attempts from the session - what the agent changed each time and the error after each - or the transcript excerpt.
    type: text
    required: true
  - name: goal
    description: What the agent is trying to make work, and the check that defines success.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Loop pattern, Hypotheses so far, Evidence to gather, Corrective message, Fresh start option]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Agents loop for a few recognisable reasons. They anchor on a first hypothesis and keep patching around it. They fix the symptom in the error message rather than the cause, so each fix moves the error. Two fixes undo each other in turn. They misread the failing output (an earlier test failing, a stale build, a cached result) and chase the wrong thing. The environment is the problem (missing service, wrong version, stale generated code) but they keep editing code. Or they start weakening the test to make it pass. Each failed attempt also fills the context with noise, which makes the next attempt worse. More "try again" never helps. What helps is stopping edits, writing down what has been tried and ruled out, getting one piece of hard evidence (full error with stack, a minimal reproduction, a printed value, the real code path), and choosing a different hypothesis, or restarting a clean session with a short summary.
</context>

<task>
Help break this loop.
<loop>
{{loop}}
</loop>
<goal>
{{goal}}
</goal>

1. Name the loop pattern from the attempts: anchoring, symptom chasing, oscillating fixes, misread output, environment problem, test weakening, or another, with the evidence.
2. List the hypotheses the attempts implied and which are ruled out by the results.
3. Choose the evidence that would discriminate between the remaining hypotheses: a specific command, log, print, minimal reproduction or code to read. Prefer one or two cheap steps.
4. Write the corrective message to send to the agent: stop editing; revert to the last state where the check behaved as expected if edits have piled up (show a non-destructive way, such as saving a patch first); state the ruled-out hypotheses; ask for the evidence step and a written diagnosis before any further edit; forbid weakening or skipping the test.
5. Say when to abandon the session instead: context full of failed attempts, the agent repeating ruled-out fixes after the message, or the goal itself in doubt. Write the short summary to start the fresh session with.
</task>

<constraints>
- Do not propose another code fix as the main answer unless the evidence in the input already proves the cause.
- Keep the corrective message under about 15 lines so the agent follows it.
{{> output/uncertainty}}
</constraints>

<output_format>
## Loop pattern
One line, then the evidence.
## Hypotheses so far
Table: hypothesis, tried in attempt, ruled out (yes, no, unclear).
## Evidence to gather
Numbered steps.
## Corrective message
Fenced block ready to paste.
## Fresh start option
When to switch, and the summary in a fenced block.
</output_format>
