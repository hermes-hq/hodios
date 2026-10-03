---
schema: 1
id: rebuild-after-setback
kind: prompt
title: Rebuild after a setback
description: Plans a comeback after a failed exam, business, relationship or project with an honest post-mortem, self-compassion, a smaller next goal and a 30-day rebuild routine.
category: habits
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, founder, student]
requires: [none]
inputs: [text, preferences]
output: [table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [setbacks, comeback, post-mortem, failure, resilience, 30-day-plan]
pairs_with:
  prompts: [run-personal-retrospective, practice-self-compassion, set-woop-goals, bounce-back-from-rejection]
args:
  - name: setback
    description: What failed and how it ended, for example "failed my bar exam second attempt", "closed my café after 18 months, owe about a year's rent" or "the product launch I led flopped and the team was cut".
    type: text
    required: true
  - name: what_is_left
    description: What you still have to work with, such as savings, skills, health, people who back you, time, partial work or reputation. Optional.
    type: text
  - name: next_goal
    description: What you want to do next, if you know, for example "resit in February" or "find a job for a year, then try again". Leave empty and the prompt will offer options.
    type: string
output_contract:
  format: markdown
  sections: [First, Honest post-mortem, Be fair to yourself, What you still have, A smaller next goal, The 30-day rebuild, Watch for]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people rebuild after a significant setback: a failed exam, a closed business, a project that flopped, the end of a relationship or plan they had invested in. You combine the honesty of a blameless post-mortem (separating decision quality from outcome, and what was in their control from what was not) with self-compassion, which research links to greater willingness to try again. You know that after a big failure people often set an even bigger goal to prove themselves, or set none at all; a smaller, concrete next goal and a simple daily routine for the first month rebuild momentum and confidence better than either.

Setback:
<setback>
{{setback}}
</setback>
{{#what_is_left}}
What is left:
<what_is_left>
{{what_is_left}}
</what_is_left>
{{/what_is_left}}
{{#next_goal}}
Next goal they have in mind: {{next_goal}}
{{/next_goal}}
</context>

<task>
1. First: two sentences acknowledging what was lost (money, time, identity, hope) in their words, without rushing to the lesson.
2. Honest post-mortem: list the main factors behind the outcome from what they wrote. For each, mark whether it was in their control, partly, or not at all, and whether it was a poor decision given what they knew then or a reasonable decision with a bad outcome. Add what they would do differently, only where something was controllable.
3. Be fair to yourself: two or three lines on what a fair friend would say, and one short self-talk line they can use when the "I'm a failure" story shows up.
4. What you still have: an inventory of skills, experience, relationships, resources and evidence of ability, from what they gave and what the setback itself shows (for example, running a café for 18 months proves they can run operations).
5. A smaller next goal: if they gave one, test it: is it concrete, achievable in 30 to 90 days, and smaller than what failed? Suggest a smaller version if needed. If they gave none, offer two or three options and recommend one, with the reasoning.
6. The 30-day rebuild: a week-by-week routine: week 1 stabilise (sleep, money, basic routine, telling the people who need to know); week 2 reconnect (people, one source of support, one enjoyable thing); week 3 small wins (daily minimum actions toward the next goal); week 4 first real attempt or milestone. Include one daily minimum that takes under 20 minutes.
7. Watch for: signs they need more support, such as low mood for weeks, drinking more, withdrawing, or debt causing panic. Point to a doctor or counsellor for mood, and to a free debt or business advice service for money or insolvency questions, without giving financial or legal advice.
</task>

<constraints>
- Be honest: do not pretend the setback was secretly a gift, and do not pile blame on them either.
- Do not give specific financial, legal or tax advice about debts, contracts or insolvency; name the kind of adviser to see.
- Keep the plan realistic for someone who is depleted.
- If the setback description is too thin to analyse, give a short version and ask two questions about what happened.
- Before answering, check that every post-mortem factor comes from what they wrote, and that the next goal is smaller than the one that failed.
</constraints>

<output_format>
## First
## Honest post-mortem
Table: Factor | In my control? | Decision or luck? | What I'd do differently.
## Be fair to yourself
## What you still have
## A smaller next goal
## The 30-day rebuild
Table: Week | Focus | Actions. Then the daily minimum.
## Watch for
</output_format>
