---
schema: 1
id: set-criteria-before-options
kind: prompt
title: Set your criteria before seeing the options
description: Fixes must-haves, weighted criteria and a good-enough threshold before you start viewing houses, jobs, candidates or products, so the first attractive option cannot sway you.
category: decision-making
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, manager, job-seeker, recruiter]
requires: [none]
inputs: [text, preferences]
output: [checklist, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [pre-commitment, must-haves, anchoring, satisficing, search-criteria]
pairs_with:
  prompts: [compare-options-matrix, check-decision-for-biases, decide-where-to-live]
args:
  - name: search
    description: What you are about to search for or evaluate (for example "a flat to rent", "a new job", "a developer to hire", "a family car").
    type: text
    required: true
  - name: wants
    description: What matters to you, your budget and limits, and what went wrong last time, if anything.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Must-haves, Weighted criteria, Good enough, Traps to watch for, Scorecard]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people decide what they want before they start looking. Once options are in front of us, judgment bends: the first appealing option becomes an anchor; vivid features (a sunny kitchen, a charismatic interviewer, a striking design) crowd out duller but more important ones (commute, track record, running costs); a deliberately worse "decoy" makes a nearby option look better; and people quietly drop a must-have to justify an option they already like. Searches also run too long when there is no definition of good enough, especially with endless listings. Writing criteria in advance fixes much of this: a short list of true must-haves that rule options out, weighted criteria for the rest, a written threshold for "good enough to say yes", and a scorecard filled in for every option immediately after seeing it, before comparing. Criteria can still change, but only deliberately and in writing, not in the moment.

Search:
<search>
{{search}}
</search>

What matters:
<wants>
{{wants}}
</wants>
</context>

<task>
1. Must-haves: turn the person's wants into three to five true deal-breakers, each testable (a number or a yes/no). Challenge any that are really preferences.
2. Weighted criteria: list four to seven other criteria with weights summing to 100, each with what a strong and a weak option looks like. Include any important criterion they did not mention but people in this search usually regret ignoring, marked "added".
3. Good enough: write the threshold (for example "any option that passes all must-haves and scores 70 or more") and a search limit (a number of options or a date) after which they choose the best seen so far.
4. Traps to watch for: the three or four biases most likely in this specific search, each with a concrete counter-move.
5. Scorecard: a blank scorecard they can fill in for each option straight after seeing it, plus the rule for changing criteria (write down the change and the reason before scoring again).
</task>

<constraints>
- Keep it short enough to use on a phone during a viewing or straight after an interview.
- Use the person's priorities for weights; mark proposed weights as starting points.
- Must-haves must be genuinely non-negotiable; too many must-haves empties the search.
- For hiring, keep criteria job-related and lawful; do not include criteria that act as proxies for protected characteristics.
</constraints>

<output_format>
## Must-haves
Numbered, each testable.

## Weighted criteria
Table: Criterion | Weight | Strong looks like | Weak looks like.

## Good enough
Threshold and search limit.

## Traps to watch for
Bullets: trap, counter-move.

## Scorecard
A blank table to copy per option, and the rule for changing criteria.
</output_format>
