---
schema: 1
id: reason-from-first-principles
kind: prompt
title: Reason from first principles
description: Breaks a problem down to first principles by separating verified facts from assumptions and conventions, then rebuilds two or three solutions from the facts up and tests the boldest.
category: decision-making
version: 1.0.0
status: incubating
stage: [discover, design]
role: [individual, founder, product-manager, engineering-manager]
requires: [none]
inputs: [text]
output: [report, table, ideas]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [first-principles, assumptions, problem-solving, rethinking, chestertons-fence]
pairs_with:
  prompts: [solve-contradiction-with-triz, run-second-order-thinking, find-logical-fallacies, run-pre-mortem]
  personas: [thinking-partner]
args:
  - name: problem
    description: The problem or goal and how it is usually approached, for example "Our team spends 30% of its week on status meetings and reports" or "Home batteries are too expensive for most households in our area".
    type: text
    required: true
  - name: current_assumptions
    description: What you or your field take for granted about it - the beliefs, rules of thumb and "that's how it's done" statements you suspect might not hold. Optional.
    type: text
output_contract:
  format: markdown
  sections: ["The goal, stripped down", What we believe, Sorted, The bedrock, Rebuilt solutions, Why the convention might exist, Cheapest test]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You reason from first principles. Most thinking works by analogy (doing what others do, with small changes), which is efficient but carries forward every hidden assumption in the existing way. First-principles reasoning strips a problem to what is actually known to be true (physical limits, measured costs, verified needs) and rebuilds from there. You also respect its limits: conventions often exist for reasons nobody wrote down, so before discarding one you ask why it is there.

Problem:
<problem>
{{problem}}
</problem>
{{#current_assumptions}}

Assumptions the user suspects:
<current_assumptions>
{{current_assumptions}}
</current_assumptions>
{{/current_assumptions}}
</context>

<task>
1. Strip the goal down to the underlying function or need, without the current form of the solution ("people need to know what each other are doing and what is blocked", not "we need better status meetings").
2. List what is currently believed about the problem: the user's assumptions plus the unstated ones built into the usual approach. Aim for eight to fifteen statements, each a single claim.
3. Sort each statement into: law or hard limit (physics, maths, regulation that truly applies), verified fact (with how it is known), measured data (with source or "user-provided"), assumption (believed, untested), or convention (done because it is usual). Use Socratic questions to probe the doubtful ones: How do we know? What would have to be true for this to be false? Is this true everywhere or only here?
4. State the bedrock: the short list of things that remain true after the sorting. Where cost or effort is involved, decompose it into its parts (materials, labour, time, coordination) and estimate each, marked as estimates.
5. Rebuild two or three solutions from the bedrock up, at least one of which ignores the current approach entirely. For each, explain which assumption it drops and why the bedrock allows it.
6. For each convention you propose dropping, ask why it might exist (Chesterton's fence): what problem it may have been solving, and whether that problem still applies.
7. Pick the boldest promising solution and design the cheapest test that would show whether its key assumption holds, with what result would confirm or kill it.
</task>

<constraints>
- Never present an assumption or estimate as a fact. Label every number as user-provided, estimate or general knowledge to verify.
- Do not dismiss conventions just because they are conventions; drop them only with a reason.
- If a "law" is really a regulation or policy, say whether it is fixed or could be changed, and recommend checking current rules with the relevant authority or a professional.
- Stay concrete and specific to the user's situation; avoid generic innovation talk.
- If the problem is too vague to list beliefs about, ask up to three questions first.
</constraints>

<output_format>
## The goal, stripped down
One or two sentences.

## What we believe
Numbered list of single claims.

## Sorted
Table: Claim | Type (law, fact, data, assumption, convention) | How we know or how to check.

## The bedrock
Bullets, with any cost or effort decomposition as a small table.

## Rebuilt solutions
One subsection per solution: what it is, assumption dropped, why the bedrock allows it.

## Why the convention might exist
Table: Convention | Possible reason | Does it still apply?

## Cheapest test
Solution, test, confirm or kill criteria.
</output_format>
