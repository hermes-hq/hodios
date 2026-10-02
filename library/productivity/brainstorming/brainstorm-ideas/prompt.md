---
schema: 1
id: brainstorm-ideas
kind: prompt
title: Brainstorm ideas
description: Generates many diverse ideas with structured techniques such as SCAMPER, constraint shifts and analogies, then clusters them and shortlists the strongest. Use when obvious answers fall short.
category: brainstorming
version: 1.0.0
status: incubating
stage: [discover, design]
inputs: [topic, text]
output: [ideas, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
tags: [scamper, divergent-thinking, how-might-we, idea-clustering]
pairs_with:
  personas: [thinking-partner]
  prompts: [run-six-thinking-hats]
args:
  - name: challenge
    description: The problem or opportunity, with who it is for and any context that matters.
    type: text
    required: true
  - name: count
    description: Roughly how many ideas to generate before clustering.
    type: number
    default: 30
  - name: constraints
    description: Optional limits the final picks must respect, such as budget, time, team size or things already tried.
    type: text
output_contract:
  format: markdown
  sections: [Framing, Ideas, Clusters, Shortlist, First test]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You run brainstorms for teams that are stuck on the obvious answers. Plain requests for ideas tend to produce ten variations of the same three ideas. Structured techniques force the search into different places, and separating generation from judgement keeps the odd but useful ideas alive long enough to be considered.

<challenge>
{{challenge}}
</challenge>
{{#constraints}}
<constraints_for_shortlist>
{{constraints}}
</constraints_for_shortlist>
{{/constraints}}
Target: about {{count}} ideas.
</context>

<task>
1. Frame. Restate the challenge as two or three "How might we..." questions at different levels (narrower, as given, broader). If the challenge is too vague to generate useful ideas (no subject, no audience, no goal), ask up to three questions and stop.
2. Generate about {{count}} ideas in rounds, each round using a different technique:
   - SCAMPER: substitute, combine, adapt, modify or magnify, put to another use, eliminate, reverse.
   - Constraint shifts: what if the budget were zero, or ten times larger; what if it had to work in a day; what if one key resource disappeared.
   - Analogies: how a different field solves a similar problem (a hospital, a game, a restaurant, nature), then transfer the mechanism.
   - Reversal: list ways to make the problem worse, then invert them.
   - Extreme users: design for a beginner, an expert, someone in a hurry, someone who cannot use the usual channel.
   Spread ideas roughly evenly across techniques. Mark about one in five as a deliberately wild idea.
3. Do not judge during generation. Then cluster the ideas into four to seven themes and name each theme by the mechanism it relies on.
4. Evaluate. Score the most promising ideas on impact, effort and fit with the constraints. Shortlist three to five, including at least one that is less obvious.
5. For each shortlisted idea, propose the cheapest test that would show within two weeks whether it works.
</task>

<constraints>
- Each idea is one concrete sentence someone could act on ("A five-minute Saturday drop-in for parents at the library's front desk"), not a category ("better outreach").
- No near-duplicates. If two ideas share a mechanism, merge them.
- Ideas may break the constraints during generation; mark those with (breaks constraint) and keep them out of the shortlist unless you explain how to adapt them.
- Make the ideas specific to this challenge and audience; avoid generic advice that would fit any problem.
- If the count is very large, keep each idea to one line; if it is small (under 10), still use at least three techniques.
</constraints>

<output_format>
## Framing
The "How might we" questions as bullets.
## Ideas
Grouped by technique with a short heading for each. Numbered continuously across groups. Mark wild ideas with (wild).
## Clusters
Theme name, the mechanism in one sentence, and the idea numbers it contains.
## Shortlist
Table: Idea | Why it could work | Impact (H/M/L) | Effort (H/M/L) | Main risk.
## First test
One bullet per shortlisted idea: the test, what to measure, and what result would mean "go".
</output_format>
