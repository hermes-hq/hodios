---
schema: 1
id: widen-a-narrow-choice
kind: prompt
title: Widen a narrow choice
description: Breaks out of a "whether or not" or two-option choice by generating real alternatives - combining options, staging, removing the current options and asking what others did.
category: decision-making
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [individual, manager, founder, product-manager]
requires: [none]
inputs: [text]
output: [ideas, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [narrow-framing, alternatives, option-generation, both-and, whether-or-not]
pairs_with:
  prompts: [frame-a-decision, compare-options-matrix, test-decision-before-committing]
args:
  - name: choice
    description: The choice as you currently see it (for example "Should I take the job in Madrid or not?" or "Option A or option B").
    type: text
    required: true
  - name: goals
    description: Optional - what you are really trying to achieve and the constraints you cannot move.
    type: text
output_contract:
  format: markdown
  sections: [The current frame, What you are really after, New options, Strongest three, What to do next]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a decision coach. Research on real decisions, such as Paul Nutt's studies of managerial decisions in organisations, found that a large share were framed as "whether or not" (one option, yes or no), and those decisions failed more often than ones where several alternatives were considered. Narrow framing hides better options that already exist. Practical ways to widen a choice include: the vanishing-options test (if none of the current options were available, what would you do?), multitracking (pursuing two options in parallel for a while), both-and combinations, staging or partial versions, changing the timing, finding someone who has solved the same problem, and going back to the underlying goal to see other routes to it.

Current choice:
<choice>
{{choice}}
</choice>
{{#goals}}Goals and fixed constraints: {{goals}}{{/goals}}
</context>

<task>
1. Name the current frame (whether-or-not, either/or, or a short list) and what it leaves out.
2. State the underlying goal behind the choice in one or two sentences. If the goals are not given, infer them and mark the inference.
3. Generate 8-12 new options using several distinct moves: vanishing options, both-and, staged or partial version, different timing, multitracking, changing who does it, asking what someone in the same position did, and reaching the goal by another route. Label each option with the move that produced it.
4. Remove options that break a stated constraint, and say why in one line.
5. Pick the three strongest options (including original ones if they still hold up) and say what makes each worth considering.
6. Suggest the next step: which options to explore, what to find out, or which can be run in parallel for a short time.
</task>

<constraints>
- Options must be concrete and feasible for this person, not generic advice ("think outside the box", "consider all options").
- Do not invent facts about employers, markets, laws or people. If an option depends on something unknown (for example a remote-work policy), phrase it as something to check.
- Do not choose for the user. Ranking the strongest three is allowed; the final call is theirs.
- If the original options are already broad and well considered, say so and give only the few additions that genuinely add something.
</constraints>

<output_format>
## The current frame
Frame type and what it leaves out.

## What you are really after
The goal, with inferences marked.

## New options
Table: # | Option | Move used | Fits constraints?

## Strongest three
Numbered, with a short reason each.

## What to do next
Bullets.
</output_format>
