---
schema: 1
id: compare-business-ideas
kind: prompt
title: Compare business ideas
description: Compares two to five business ideas you already have on evidence, economics, founder fit and risk, then picks one to test first and says what would change the choice.
category: entrepreneurship
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [founder, individual]
requires: [none]
inputs: [text, notes]
output: [table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [idea-selection, decision-matrix, founder-fit, demand-evidence, opportunity-cost]
pairs_with:
  prompts: [generate-business-ideas, validate-business-idea, assess-founder-fit, model-unit-economics]
  workflows: [idea-validation-track]
args:
  - name: ideas
    description: Two to five business ideas, each in a few lines - what you would sell, to whom, how it makes money, and any evidence you already have (conversations, sales, waitlists, search data).
    type: text
    required: true
  - name: founder_situation
    description: Your skills, contacts, money you can put in, hours a week, how long you can go without income from it, and what you want from it (side income, a lifestyle business, a fundable startup).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Ideas as understood, Comparison table, Pick, What would change the pick, First test]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help founders choose between ideas they already have. People usually pick the idea that excites them most or the one with the biggest imagined market. Experienced founders weigh different things: evidence that someone already pays to solve the problem, how quickly a first sale can happen, whether the founder can reach the buyers through people they know, the cash and time needed before the first test, and whether the goal (side income, lifestyle, venture-scale) fits the idea's economics. A weighted score is only useful if the weights reflect the founder's goal and the scores are tied to evidence, not enthusiasm.

<ideas>
{{ideas}}
</ideas>

<founder_situation>
{{founder_situation}}
</founder_situation>
</context>

<task>
1. Restate each idea in one line: customer, problem, offer, how it earns. Flag any idea too vague to compare and say what is missing.
2. Choose 6-8 criteria and weights from the founder's stated goal. Always include: evidence of demand, speed to first paid sale, reach (can the founder get in front of buyers), money and time to test, margin potential, founder fit, and downside risk (what is lost if it fails). Explain each weight in a few words.
3. Score each idea 1-5 per criterion. For every score, give the reason in a few words and mark whether it rests on evidence the founder gave or on your assumption.
4. Pick one idea to test first. Explain why it wins and how close the runner-up is. If the scores are within a narrow margin, say the choice is a judgement call and name the deciding question.
5. List what would change the pick: the specific facts that, if learned, would move another idea ahead.
6. Design the first test for the chosen idea: what to do in the next two weeks, what it costs, and the result that counts as a pass (a commitment such as a deposit, pre-order or paid pilot, not compliments).
</task>

<constraints>
- Do not invent market sizes, competitor names, prices or statistics. Where a score depends on a number you do not have, say what to look up.
- Treat opinions from friends and polls as weak evidence, and past payment or deposits as strong evidence.
- Do not recommend running all ideas at once unless the founder has the hours for it; say what parallel testing costs in focus.
- If none of the ideas fits the founder's money, time or goal, say so plainly and suggest how one could be reshaped.
</constraints>

<output_format>
## Ideas as understood
One line per idea, plus gaps.
## Comparison table
Table: Criterion (weight) | Idea A | Idea B | ... with score and short reason; mark assumptions with [A]. Weighted totals in the last row.
## Pick
The winner, the runner-up and the margin, in a short paragraph.
## What would change the pick
Bullets.
## First test
Action, cost, timeline and pass threshold.
</output_format>
