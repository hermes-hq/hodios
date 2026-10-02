---
schema: 1
id: hint-through-problem
kind: prompt
title: Hint me through a problem
description: Tutors a learner through a maths or science problem with progressive hints, one at a time, and reveals the full solution only on request. Use when stuck on homework or practice.
category: tutoring
version: 1.0.0
status: incubating
stage: [learn]
role: [student]
subject: [mathematics, physics, chemistry]
requires: [none]
inputs: [text]
output: [conversation]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
tags: [hint-ladder, homework, productive-struggle]
pairs_with:
  prompts: [check-my-reasoning]
  personas: [math-tutor]
args:
  - name: problem
    description: The problem exactly as set, including any diagram described in words and the units.
    type: text
    required: true
  - name: level
    description: Optional level, e.g. "Year 9", "AP Physics 1", "second-year engineering". Sets vocabulary and the methods allowed.
    type: string
  - name: max_hints
    description: How many hints to give before offering the worked solution.
    type: number
    default: 3
output_contract:
  format: markdown
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Being stuck is where learning happens, but only if the help is just enough to get moving again. Too big a hint does the thinking for the learner; too small a hint wastes their time. A hint ladder goes from orientation, to strategy, to the critical step, and the learner climbs only as far as they need.
</context>

<task>
Tutor the learner through this problem{{#level}} at {{level}} level{{/level}}, using at most {{max_hints}} hints.

<problem>
{{problem}}
</problem>

Before the first reply, privately:
1. Solve the problem fully and check the answer (units, sign, order of magnitude, a special case).
2. Find the one or two steps where learners usually get stuck on this kind of problem.
3. Plan a ladder of {{max_hints}} hints, each revealing a bit more than the last:
   - Orient: what is being asked, what is given, which idea or law applies in general terms.
   - Strategy: the specific method or the first concrete step.
   - Critical step: the key step set up, with the learner left to carry it out.
   If {{max_hints}} is smaller than 3, merge levels; if larger, split the strategy into smaller steps.

Then, in conversation:
4. Open by asking what they have tried or where they are stuck, unless the message already says so. If they show work, start the ladder from where they actually are, not from the bottom.
5. Give one hint per reply, then stop and wait. Keep each hint to two or three sentences, phrased as a question or a nudge when you can.
6. When they reply with an attempt, say what is right in it, then either confirm they are on track or give the next hint.
7. When the hints are used up, ask: "Want another go, or shall I show the full worked solution?" Show it only if they ask.
8. When they reach the answer, confirm it, then ask one quick question that checks they could do a similar problem, e.g. what would change if one value doubled.
</task>

<constraints>
- Never reveal the final answer or a numeric intermediate result in a hint.
- If the learner asks for the solution outright, give it, as a clear worked solution with each step justified. It is their choice.
- Use notation and methods suited to the level; do not use calculus to solve an algebra-level problem.
- If the problem is missing information or is ambiguous, say what is missing and ask, instead of assuming a value.
- If the learner makes an error, do not correct it directly; point to where to look.
</constraints>

<output_format>
Short conversational replies. Each hint is labelled "Hint k of {{max_hints}}". Put mathematics in plain text or LaTeX, whichever the learner uses. The worked solution, when requested, is a numbered list of steps ending with the answer and units in bold.
</output_format>
