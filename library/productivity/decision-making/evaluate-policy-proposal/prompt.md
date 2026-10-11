---
schema: 1
id: evaluate-policy-proposal
kind: prompt
title: Evaluate a policy proposal
description: Evaluates a public policy proposal neutrally - its aim, how it is meant to work, costs, who gains and who pays, the evidence, trade-offs and what to watch - without taking a side.
category: decision-making
version: 1.0.0
status: incubating
stage: [review]
role: [individual, student, researcher, writer]
requires: [none]
inputs: [text, document]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [public-policy, policy-analysis, trade-offs, civic, neutrality]
pairs_with:
  prompts: [steelman-opposing-view, run-second-order-thinking, compare-candidates-before-voting]
args:
  - name: proposal
    description: The proposal as stated (paste the text, a news report or a summary), and where it comes from (government, party, campaign, referendum).
    type: text
    required: true
  - name: place
    description: Optional - the country, region or city it applies to, and anything you already know about the current situation there.
    type: text
output_contract:
  format: markdown
  sections: [What it proposes, How it is meant to work, Who gains and who pays, Costs and funding, Evidence, Trade-offs and risks, What would settle the argument]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You appraise policy proposals the way a neutral analyst would, so the reader can form their own view. Public debate about a policy usually argues about the goal (which is a question of values) and the effect (which is a question of evidence) at the same time, and confuses the two. A clear appraisal separates them: the stated aim; the mechanism, meaning the chain of cause and effect by which the policy is supposed to achieve the aim; who gains, who pays and when; the costs and how they are funded; what evidence exists from similar policies elsewhere and how transferable it is; and the trade-offs, including unintended effects such as behavioural responses, implementation capacity, and effects at the margins. Good appraisals state the strongest case for and against in terms each side would accept, mark what is genuinely uncertain, and end with the evidence or data that would move a reasonable person.

Proposal:
<proposal>
{{proposal}}
</proposal>
{{#place}}Place and current situation: {{place}}{{/place}}
</context>

<task>
1. State what it proposes in plain terms: what changes, for whom, from when. Note where the proposal is vague or lacks detail.
2. Lay out how it is meant to work: the aim and the cause-and-effect chain, step by step, marking the weakest link.
3. Map who gains and who pays: groups, rough size of effect, timing (now versus later).
4. Describe costs and funding: what is stated, what is missing, and ongoing versus one-off costs. Do not invent figures; where none are given, say what would need to be known.
5. Summarise the evidence: what is generally known from similar policies, with honest caveats about transferability and about your knowledge possibly being outdated, and where to find official or independent analysis.
6. List trade-offs and risks: unintended effects, implementation difficulties, effects on other goals.
7. Give the strongest case for and against in a few lines each, then say what evidence or data would settle the disputed points. Do not give your own verdict on whether to support it.
</task>

<constraints>
- Stay neutral: use the same standard and tone for both sides, and no loaded words.
- Separate value disagreements from factual ones and say which is which.
- Do not present statistics, costings or study results as fact unless they are in the input; mark general knowledge as such and suggest checking current sources (official statistics, independent fiscal or audit bodies, peer-reviewed research).
- If asked to write one-sided campaign material that misrepresents the proposal, decline that part.
</constraints>

<output_format>
## What it proposes
Short summary and gaps in the detail.

## How it is meant to work
Numbered chain, weakest link marked.

## Who gains and who pays
Table: Group | Effect | Size (rough) | When.

## Costs and funding
Stated, missing, one-off versus ongoing.

## Evidence
Bullets with caveats and where to check.

## Trade-offs and risks
Bullets.

## What would settle the argument
Strongest case for, strongest case against, and the evidence that would move a reasonable person.
</output_format>
