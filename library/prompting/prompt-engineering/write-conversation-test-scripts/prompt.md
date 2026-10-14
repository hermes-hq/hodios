---
schema: 1
id: write-conversation-test-scripts
kind: prompt
title: Write multi-turn test conversations for a chatbot
description: Writes multi-turn test scripts for a chatbot or custom assistant covering follow-ups, corrections, topic switches, long-chat drift and pushback after a refusal, with a pass check for each turn.
category: prompt-engineering
version: 1.0.0
status: incubating
stage: [verify]
role: [product-manager, qa-engineer, ml-engineer, support-agent]
requires: [none]
inputs: [text]
output: [script, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [chatbot-testing, multi-turn, conversation-design, regression-tests, test-scripts]
pairs_with:
  prompts: [build-prompt-test-set, write-system-prompt, red-team-prompt]
args:
  - name: assistant
    description: What the chatbot or custom assistant does and for whom, or paste its system prompt.
    type: text
    required: true
  - name: concerns
    description: Optional - behaviours you are worried about or have seen go wrong.
    type: text
output_contract:
  format: markdown
  sections: [Coverage map, Test scripts, Scoring sheet]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most chatbot tests are single questions, but most real failures happen across turns. The bot loses what "it" or "the second one" refers to; ignores a correction ("no, I meant Tuesday") and keeps the old value; forgets a detail the user gave at the start; mixes up two topics after a switch; drifts from its format, tone or rules after ten turns; gives in when a user rephrases a request it rightly declined; or contradicts an earlier answer. Good multi-turn scripts are short (three to eight turns), have one probe turn each, say what the bot must remember, and define a pass check for the turns that matter so two testers would agree on the result. They are run in fresh sessions and saved so they can be rerun after every prompt change.

<assistant>
{{assistant}}
</assistant>
{{#concerns}}
Concerns: {{concerns}}
{{/concerns}}
</context>

<task>
1. Pick the behaviours to cover for this assistant from: reference resolution, corrections, carry-over of earlier details, topic switch and return, clarifying question then answer, long-chat drift of rules and format, a refusal followed by rephrasing or pressure, contradictions with earlier answers, a user changing their mind, and an upset user mid-conversation. Add the user's concerns. Map each to a script.
2. Write eight to twelve scripts. Each has an id, the behaviour tested, the user turns written as a real user would type them (short, sometimes vague, with typos where natural), the probe turn marked, and the expected behaviour at the probe and at any other turn that matters.
3. Make pass checks concrete and observable ("uses Tuesday 14:00 from turn 3, not Monday", "still declines and offers the handoff"), not "responds well".
4. Write the scoring sheet and run instructions: fresh session per script, record the full transcript, rerun failing scripts twice to separate flakiness from real failures.
</task>

<constraints>
- Base scripts on the assistant's real purpose; do not test features it does not have.
- Do not invent business facts in expected answers; refer to "the documented hours" or placeholders.
- Keep each script at eight user turns or fewer, except one long-drift script of up to fifteen.
</constraints>

<output_format>
## Coverage map
Table: Behaviour | Script ids | Why it matters here.
## Test scripts
Per script: id and behaviour, then a table: Turn | User says | Expected behaviour | Probe?
## Scoring sheet
Table: Script id | Pass check | Pass, fail or flaky | Notes. Then run instructions as bullets.
</output_format>
