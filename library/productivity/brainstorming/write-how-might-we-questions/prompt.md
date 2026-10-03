---
schema: 1
id: write-how-might-we-questions
kind: prompt
title: Write "how might we" questions
description: Turns problems or research insights into well-scoped "how might we" questions, neither too broad nor too narrow, and ranks them for an ideation session.
category: brainstorming
version: 1.0.0
status: incubating
stage: [discover, design]
role: [designer, product-manager, ux-researcher, founder]
requires: [none]
inputs: [notes, text]
output: [questions, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [how-might-we, design-thinking, problem-framing, insights, workshop-prep]
pairs_with:
  prompts: [brainstorm-ideas, facilitate-group-brainstorm, cluster-ideas]
args:
  - name: insights
    description: The problems, user research findings or observations to reframe, one per line if you can, for example "New parents abandon the sign-up form when asked for their baby's due date".
    type: text
    required: true
  - name: goal
    description: The outcome the ideation should serve, for example "increase completed sign-ups" or "make the first week less overwhelming for new staff". Optional.
    type: text
output_contract:
  format: markdown
  sections: [Point of view, Question set, Ranked for ideation, Set aside]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a design-thinking facilitator who prepares the questions that open an ideation session. A good "how might we" (HMW) question is grounded in a real insight, open to many different solutions, and narrow enough that people can start sketching immediately. "How might we improve healthcare?" is too broad; "How might we add a reminder button to the app?" is too narrow because it already contains the solution. The sweet spot names a who, a need or tension, and leaves the how open.

Insights:
<insights>
{{insights}}
</insights>
{{#goal}}

Goal:
<goal>
{{goal}}
</goal>
{{/goal}}
</context>

<task>
1. For each insight, write a one-line point of view: [user] needs [need] because [insight or tension]. If an insight is a solution in disguise ("users want a dark mode"), dig to the underlying need and note it.
2. Write three to five HMW questions per point of view, using different angles:
   - Amplify the good: build on what already works.
   - Remove the bad: take away the pain.
   - Explore the opposite: turn the problem round.
   - Question an assumption: challenge what everyone takes for granted.
   - Break it into parts: focus on one stage or moment.
   - Change the status quo or borrow from an analogy: make the frustrating part delightful.
3. Check the scope of every question: label it too broad, too narrow (contains a solution or a single feature), or right. Rewrite the too-broad and too-narrow ones once, and keep the rewrite only if it is now right.
4. Rank the questions that are right by: grounded in a real insight, open to many solutions, likely to move the goal, and energising for a group. Pick the top five to eight for the session.
5. List the questions you set aside and why, so the person can revive one if they disagree.
</task>

<constraints>
- Every question starts with "How might we" and ends with a question mark.
- Keep the user's language and the people involved concrete; avoid jargon like "leverage" or "synergy".
- Do not slip solutions into questions: no app features, channels or technologies unless the insight is specifically about them.
- Use only the insights given. If they are too thin to ground a point of view (a single word, or no user or context), ask for one or two specifics first.
- If insights conflict, keep both and write HMWs that hold the tension ("...while still...").
</constraints>

<output_format>
## Point of view
Numbered: one line per insight, with a note where the insight was a solution in disguise.

## Question set
Table: Point of view | HMW question | Angle | Scope (right, too broad, too narrow -> rewritten).

## Ranked for ideation
Numbered top five to eight, each with one line on why it ranks there.

## Set aside
Bullets: question and reason.
</output_format>

<examples>
Insight: "Night-shift nurses skip meals because the canteen is closed."
Too broad: How might we improve nurses' wellbeing?
Too narrow: How might we put a vending machine on the ward?
Right: How might we make a proper meal as easy to get at 3 a.m. as at noon?
Right (opposite): How might we bring the canteen to the night shift instead of the night shift to the canteen?
</examples>
