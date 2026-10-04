---
schema: 1
id: plan-launch-content-runway
kind: prompt
title: Plan a launch content runway
description: Plans content around a launch of a course, book, product, event or shop across channels, from the runway before to launch week and post-launch proof, sized to the creator's real weekly hours.
category: content-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [content-creator, writer, founder, marketer]
requires: [none]
inputs: [text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [launch-plan, waitlist, pre-launch, launch-week, social-proof, cadence]
pairs_with:
  prompts: [plan-content-calendar, define-content-pillars, plan-content-repurposing-system]
  personas: [content-strategist]
args:
  - name: launch
    description: What you are launching, who it is for, the price or ask, and what success looks like (sales, sign-ups, attendance).
    type: text
    required: true
  - name: launch_date
    description: The launch date or week, for example "2 March" or "mid-May".
    type: string
    required: true
  - name: channels
    description: Your channels with rough audience sizes (email list, social accounts, podcast, shop window), and what you post now.
    type: text
    required: true
  - name: weekly_hours
    description: Hours per week you can realistically spend on launch content.
    type: number
    default: 4
output_contract:
  format: markdown
  sections: [Launch summary, Runway phases, Content schedule, Launch week, After launch, Capacity check, Risks and questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan the content around a launch for a creator, author or small business. Launches go wrong in predictable ways: the creator goes quiet while building and then shouts "it's live" to an audience that was never warmed up; launch week is all selling with no story or proof; and the plan assumes far more hours than the person has, so it collapses halfway. A good runway starts by building interest in the problem (not the product), invites people onto a list or waitlist so launch day has someone to tell, gives launch week a mix of reasons to buy, proof and answers to objections, and then keeps going with results and stories for a few weeks before returning to normal content. Email or direct messages to people who opted in usually do more of the selling than public posts.

Launch date: {{launch_date}}
Weekly hours available: {{weekly_hours}}
</context>

<task>
<launch>
{{launch}}
</launch>

<channels>
{{channels}}
</channels>

1. Launch summary: the audience, the one promise, the ask, the success number, and the weeks available until the date. If fewer than three weeks remain, compress the runway and say what is lost.
2. Runway phases with the purpose of each: problem and story (talk about the problem and why you made this), invitation (waitlist, early-bird, behind the scenes), proof (beta results, testimonials collected with permission, sample chapter or demo). Typical runway is four to eight weeks; adapt to the time left.
3. Content schedule: week by week, per channel, what each piece is for (interest, list growth, proof, objection, ask). Reuse one core piece per week across channels rather than creating everything new.
4. Launch week: a day-by-day plan, including the opening announcement, a story or demo, an objections and FAQ piece, social proof, a live or Q&A if it fits, and a clear close if there is a deadline (state the deadline honestly; no fake scarcity).
5. After launch: two to four weeks of results, customer stories, behind the scenes of what you learned, and a clear point to stop talking about it and return to the normal mix.
6. Capacity check: estimate hours per piece and per week, compare with {{weekly_hours}}, and cut or batch until it fits. List what to prepare before the runway starts.
</task>

<constraints>
- Keep the ratio of value and story to direct asks high in the runway (roughly three non-sales pieces per ask) and say where it intentionally changes in launch week.
- No fake scarcity, invented testimonials, made-up numbers or countdowns that reset. Testimonials need permission and must be real.
- Disclose any affiliate partners or paid promoters involved in the launch.
- Do not promise results; describe the plan as hypotheses to check after launch week.
- If launch details, the date or the channels are missing, ask for them and stop.
</constraints>

<output_format>
## Launch summary
Five lines: audience, promise, ask, success number, weeks to launch.

## Runway phases
Table: phase | weeks | purpose | key pieces.

## Content schedule
Table: week | channel | piece | purpose | reused from.

## Launch week
Table: day | channel | piece | purpose.

## After launch
Bullets by week, with the stop point.

## Capacity check
Table: piece type | hours each | count | total; then the weekly total against available hours and what was cut.

## Risks and questions
Bullets.
</output_format>
