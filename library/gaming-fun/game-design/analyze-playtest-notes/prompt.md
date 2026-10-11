---
schema: 1
id: analyze-playtest-notes
kind: prompt
title: Analyze playtest notes
description: Turns raw playtest notes into ranked design problems with evidence, the needs behind player suggestions, and the one smallest change to test next.
category: game-design
version: 1.0.0
status: incubating
stage: [review]
role: [game-developer, designer]
requires: [none]
inputs: [notes, text]
output: [report, table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [playtesting, feedback-synthesis, iteration, prototype]
pairs_with:
  prompts: [plan-playtest-session, design-game-mechanic]
args:
  - name: notes
    description: Your playtest notes, observer sheets, tester comments and any numbers (play time, scores, who won). Remove testers' full names.
    type: text
    required: true
  - name: design_goal
    description: What the game is meant to feel like and what this playtest was testing.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What the evidence says, Ranked problems, Suggestions decoded, Next change to test, What not to change yet]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help designers make sense of playtest notes. Players are excellent at noticing that something is wrong and poor at saying how to fix it: "add more cards" may mean "I had no good choice on my turn". Behaviour outweighs opinion, repeated patterns outweigh a single loud comment, and one session is an anecdote. A good iteration changes one thing at a time, so the next test can tell whether it worked.

Design goal and test focus: {{design_goal}}
</context>

<task>
Notes:

<notes>
{{notes}}
</notes>

1. Separate what testers did (observed behaviour, numbers) from what they said, and note how many sessions and testers the notes cover.
2. Group observations into problems. For each, give the evidence (quotes or behaviours, how many testers or sessions), its severity for the design goal (breaks the game, hurts the target feeling, polish), and your confidence (pattern, possible, anecdote).
3. Find the likely root cause for each problem using design terms: unclear feedback, no meaningful choice, dominant strategy, downtime, runaway leader, too much to track, mismatch with the intended feeling.
4. Decode player suggestions: for each suggestion, the underlying need, and whether the suggested fix or a different one serves the design goal better.
5. Recommend the single next change to test (or two if they do not interact), the smallest version of it, and the signal that would show it worked.
6. List problems to leave alone for now and why (low confidence, likely to change after the main fix, polish).
</task>

<constraints>
- Use only what is in the notes. Do not invent tester reactions, numbers or quotes; mark gaps as questions.
- Do not treat one tester's preference as a pattern, and say when the sample is too small to judge balance.
- Keep the designer's goal in charge: a suggestion that pulls the game toward a different genre is noted, not adopted.
- Refer to testers by role or number, never by name.
</constraints>

<output_format>
## What the evidence says
Sessions, testers, and a short summary separating behaviour from opinion.
## Ranked problems
Table: Problem | Evidence | Severity | Confidence | Likely root cause.
## Suggestions decoded
Table: Tester suggestion | Underlying need | Better fix if any.
## Next change to test
The change, the smallest version, the signal of success.
## What not to change yet
Bullets with reasons.
</output_format>
