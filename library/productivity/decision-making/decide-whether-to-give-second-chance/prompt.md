---
schema: 1
id: decide-whether-to-give-second-chance
kind: prompt
title: Decide whether to give someone a second chance
description: Decides whether to trust again someone who let you down - a friend, partner, relative, colleague or supplier - by the kind of breach, their repair so far and a fair test with clear conditions.
category: decision-making
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, manager]
requires: [none]
advice_risk: [mental-health]
inputs: [text, message]
output: [report, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [trust, forgiveness, second-chances, boundaries, repair]
pairs_with:
  prompts: [respond-to-an-apology, rebuild-trust-after-breaking-it, decide-whether-to-raise-an-issue]
args:
  - name: what_happened
    description: What the person did, whether it was a one-off or part of a pattern, and what it cost you.
    type: text
    required: true
  - name: since_then
    description: What they have said and done since (apology, explanation, changes, repeat behaviour), who they are to you, and what you feel.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [The breach, Signs of real repair, Risk if it happens again, Your options, Verdict, If you give a second chance]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone decide whether to trust again after being let down. Your limits:
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}

Forgiving and trusting again are different things: a person can forgive (let go of resentment) without restoring the same trust, and can give a limited second chance rather than all or nothing. Useful distinctions: a mistake (forgot, misjudged, under pressure) differs from a choice to deceive, exploit or hurt; a one-off differs from a pattern; and an apology differs from repair. Real repair usually includes taking full responsibility without excuses or blame-shifting, understanding the impact, a concrete change, and accepting that trust is rebuilt through behaviour over time rather than demanded. Warning signs include minimising, making the hurt person feel guilty for being upset, promises without changes, and repetition after previous apologies. The cost of being wrong also matters: re-trusting a friend who forgot a birthday risks little, while re-trusting someone who took money or was violent risks a lot. A second chance works best with explicit conditions and a review point, so neither side is left guessing.

What happened:
<what_happened>
{{what_happened}}
</what_happened>

Since then:
<since_then>
{{since_then}}
</since_then>
</context>

<task>
1. Describe the breach: mistake or choice, one-off or pattern, and its impact, using only what the person said.
2. Assess signs of real repair against the four elements (responsibility, understanding of impact, concrete change, patience), noting what is present, missing or unknown.
3. Weigh the risk if it happens again: what the person would lose, and whether that is recoverable.
4. Lay out the options: full trust restored, a limited second chance with conditions, forgiveness with distance (keeping the relationship but changing its terms), or ending or pausing the relationship.
5. Give a verdict tied to their answers and stated feelings, and say what new information would change it.
6. If giving a second chance: the conditions to state, how to say them, what to watch for, and a review date. If not: how to step back calmly.
</task>

<constraints>
- Do not tell the person what they "should" feel; reflect and offer options.
- Do not diagnose the other person or speculate about hidden motives.
- If the breach involves violence, threats, coercion, stalking or abuse, put safety first, do not frame it as a trust exercise, and point to support services and emergency help as needed.
- If the situation is at work (an employee or supplier), keep any process fair and point to HR or contract terms rather than personal judgement alone.
</constraints>

<output_format>
## The breach
Short paragraph.

## Signs of real repair
Table: Element | Present / missing / unknown | Evidence.

## Risk if it happens again
Two or three lines.

## Your options
Bullets with what each would look like.

## Verdict
The recommended option and what would change it.

## If you give a second chance
Conditions, how to say them, what to watch for, review date. Or how to step back.
</output_format>
