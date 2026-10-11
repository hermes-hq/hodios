---
schema: 1
id: write-lesson-hooks
kind: prompt
title: Write lesson hooks
description: Writes several lesson openers for a topic (puzzle, provocation, story, demo, real problem) that lead straight into the objective, with what to ask and when to return to the hook.
category: teaching
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher]
requires: [none]
inputs: [topic]
output: [ideas]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [lesson-opener, engagement, curiosity, lesson-design]
pairs_with:
  prompts: [write-lesson-plan, write-retrieval-practice-starters]
args:
  - name: topic
    description: What the lesson teaches, e.g. "why the Roman Empire split", "equivalent fractions".
    type: string
    required: true
  - name: grade_level
    description: Grade, age or course, e.g. "Grade 4", "Year 10 chemistry".
    type: string
    required: true
  - name: objective
    description: Optional lesson objective the hook must lead into. Without it, one is assumed and stated.
    type: text
  - name: constraints
    description: Optional limits, e.g. "2 minutes max", "no tech in the room", "class finds role-play awkward".
    type: text
output_contract:
  format: markdown
  sections: [Objective, Hooks, Recommended pick]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A good hook creates a question students want answered, and that question is the lesson. Novice hooks entertain and then stop: a funny video, a loosely related story, a game that eats ten minutes and is never mentioned again. Hooks that work are short (2 to 5 minutes), point straight at the content, provoke a prediction or a disagreement students can be wrong about, and get revisited at the end so students see how their thinking changed. Curiosity comes from a gap between what students expect and what happens, so the best hooks surface a likely misconception or a surprising fact.
</context>

<task>
Write lesson hooks for **{{topic}}** for **{{grade_level}}**.
{{#objective}}
<objective>
{{objective}}
</objective>
{{/objective}}
{{#constraints}}
<constraints_from_teacher>
{{constraints}}
</constraints_from_teacher>
{{/constraints}}

1. State the objective the hooks lead into (use the one given, or assume a measurable one and say so).
2. Write five hooks, one of each type: a puzzle or problem, a provocation or contested statement, a short story or scenario, a demonstration or object, and a real-world problem students care about at this age.
3. For each hook give: the exact words or set-up (what the teacher says or shows), the question students answer (ideally a prediction, a choice or a vote), the time it takes, what students will probably say, including the likely wrong answer, and the bridge sentence that moves from the hook into the teaching.
4. For each, say when to return to it later in the lesson and what students should be able to say by then.
5. Recommend the strongest hook for this class and explain why in two or three sentences.
</task>

<constraints>
- Every hook must connect directly to the objective; cut any that is merely fun.
- Keep each hook under 5 minutes and within the teacher's constraints.
- Do not invent statistics, quotes or news events. If a hook needs a real figure, mark it [verify] or use a clearly hypothetical one.
- Keep content age-appropriate; no shock tactics on sensitive topics.
- Use only ordinary classroom materials unless the teacher listed others.
</constraints>

<output_format>
## Objective
One sentence, marked as assumed if it was not given.
## Hooks
Five subsections (puzzle, provocation, story, demo, real-world problem), each with: Set-up · Question to students · Time · Likely responses · Bridge into the lesson · Return to it when.
## Recommended pick
The hook to use and why.
</output_format>
