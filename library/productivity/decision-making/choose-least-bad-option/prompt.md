---
schema: 1
id: choose-least-bad-option
kind: prompt
title: Choose the least bad option
description: Helps choose when every option is bad by comparing the harms of each, who bears them, how reversible they are and what can be softened afterwards, then plans the mitigation.
category: decision-making
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, manager, parent, founder]
requires: [none]
inputs: [text, notes]
output: [table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [harm-reduction, dilemmas, mitigation, reversibility, hard-choices]
pairs_with:
  prompts: [make-ethical-decision, check-worst-case-downside, widen-a-narrow-choice]
args:
  - name: situation
    description: The situation and the options you see, all of which feel bad (for example "cut a team member, cut everyone's hours, or risk running out of cash in four months").
    type: text
    required: true
  - name: constraints
    description: Optional - what cannot change (money, deadlines, promises, laws you know apply) and who is affected.
    type: text
output_contract:
  format: markdown
  sections: [Check for a missing option, Harm map, Comparing the harms, The least bad option, Softening the harm, How to live with it]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people choose when no option is good. In these situations people freeze, pick the option whose harm is least visible to them, or let the decision make itself by delay, which is often the worst option of all. A better way compares harms on a few dimensions: how severe, how many people, who bears them (and whether they had any say or are the most vulnerable), how long they last, and whether they can be reversed or softened later. A painful but recoverable harm spread fairly is usually better than a smaller-looking one that is permanent or that falls on someone who cannot absorb it. Delay must be counted as an option with its own harms. The choice also does not end at the decision: how the least bad option is carried out (warning, honesty, support, fairness in who bears it) often matters as much as which option is chosen. People also need permission to feel bad about a right choice; regret is not proof of a mistake.

Situation:
<situation>
{{situation}}
</situation>
{{#constraints}}Constraints:
<constraints_given>
{{constraints}}
</constraints_given>
{{/constraints}}
</context>

<task>
1. Check for a missing option: in a few lines, ask whether a combined, staged or partial option exists (for example a smaller version of two options, or buying time), and whether "wait and do nothing" is being counted. Add any credible one to the list.
2. Build a harm map: for each option, describe the harm, who bears it, severity, how many are affected, duration, reversibility, and whether those affected had a say.
3. Compare the harms: name which harms are permanent or fall on the most vulnerable, and which can be recovered from. Rank the options from least to most harmful, explaining the ranking in plain words.
4. Recommend the least bad option and say what would have to be true for a different option to be better.
5. Softening the harm: list concrete steps that reduce the damage of the chosen option (notice, honesty, money or support, sharing the burden, a review date to undo it if conditions change).
6. How to live with it: two or three lines on explaining the choice to those affected and on accepting that the choice can be right and still hurt.
</task>

<constraints>
- Do not pretend a good option exists when it does not, and do not invent options that the user's constraints rule out.
- Do not decide on the person's behalf when the harm falls mainly on them; lay out the trade-off and leave the call to them.
- If the options involve legal duties (employment, tenancy, care, safety), say which rules or professionals to check before acting; do not state the law as fact.
- If anyone is at risk of serious harm or danger, say that safety comes first and point to emergency or professional help.
</constraints>

<output_format>
## Check for a missing option
Short bullets.

## Harm map
Table: Option | Harm | Who bears it | Severity | Duration | Reversible? | Had a say?

## Comparing the harms
Ranked list with reasons.

## The least bad option
Recommendation and what would change it.

## Softening the harm
Numbered steps.

## How to live with it
Two or three lines.
</output_format>
