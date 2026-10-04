---
schema: 1
id: plan-pe-lesson
kind: prompt
title: Plan a PE lesson
description: Plans a physical education lesson with a skill focus, warm-up, progressive activities, adaptations for every ability and disability, safety checks and quick assessment.
category: teaching
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher]
requires: [none]
inputs: [text, preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [physical-education, warm-up, step-framework, inclusive-pe, skill-progression]
pairs_with:
  prompts: [write-lesson-plan, differentiate-lesson, plan-youth-sports-practice]
args:
  - name: sport_or_skill
    description: 'The sport, activity or skill, e.g. "netball: chest pass and footwork", "gymnastics: balances", "athletics: sprint start", "dance: motifs".'
    type: string
    required: true
  - name: age_group
    description: Age or year group, and any known needs, e.g. "Year 6; one pupil uses a wheelchair, two with asthma".
    type: string
    required: true
  - name: class_size
    description: Number of pupils.
    type: number
    default: 30
  - name: space
    description: Where the lesson is taught.
    type: enum
    enum: [hall, field, playground]
    default: hall
output_contract:
  format: markdown
  sections: [Objective and success criteria, Equipment and setup, Lesson plan, Adaptations, Safety, Assessment]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A good PE lesson has pupils moving for most of it, learns one skill well through small progressive steps, and lets every pupil succeed and be stretched. Common failures are long queues, games where weaker players are eliminated or never touch the ball, a single activity pitched at the middle, and warm-ups that do not prepare for the skill. The STEP framework (change Space, Task, Equipment or People) is a practical way to adapt each activity up or down without separating pupils.

Activity: {{sport_or_skill}}. Pupils: {{age_group}}, {{class_size}} in total. Space: `{{space}}`.
</context>

<task>
Plan one lesson of about an hour (state the length you assume, and how to trim it to 45 minutes).

1. **Objective and success criteria:** one skill objective, and three success criteria pupils can see and check ("I can..."), including one teaching point for technique and, if relevant, a tactical or social point.
2. **Equipment and setup:** a list scaled for {{class_size}} pupils so groups are no bigger than about four per piece of equipment, and a layout for the `{{space}}` described in words (zones, cones, stations).
3. **Lesson plan**, timed:
   - *Warm-up:* a pulse raiser, dynamic mobility for the joints this skill uses, and a skill-related game that everyone joins straight away.
   - *Skill development:* three progressive activities, each with the set-up, how it runs, the coaching points, and a STEP adaptation to make it easier and harder.
   - *Applying it:* a small-sided or conditioned game where the skill is the way to succeed, with rules that keep everyone involved (for example everyone must touch the ball before a score, no elimination).
   - *Cool-down and reflection:* gentle movement and stretches, then a question that has pupils explain a teaching point.
4. **Adaptations:** for less confident, most able, and the specific needs given in the age group, plus general options for wheelchair users, visual or hearing impairment, coordination difficulties and pupils who cannot do vigorous exercise that day, so they take part in a meaningful role rather than sitting out. Give non-participant roles (coach, referee, analyst) with real tasks.
5. **Safety:** a checklist before and during: space and equipment check, footwear and jewellery, medical needs (inhalers accessible, allergies), hydration and weather for outdoor spaces, a clear stop signal, safe distances for the activity, and spotting or landing rules where relevant.
6. **Assessment:** what the teacher looks for during the lesson against each success criterion, a quick way to record it, and a peer assessment moment.
</task>

<constraints>
- Maximise activity time: brief instructions (demonstrate, do not lecture), groups small enough that no one waits long, and transitions planned.
- No elimination games and no public picking of teams.
- Keep it age-appropriate in both skill and language.
- Follow the school's PE safety policy and national guidance for the activity; present safety items as checks, not as a replacement for them.
- If the sport or age group is missing, ask before planning.
- Before finishing, check that every activity has a harder and easier version and that the timings add up.
</constraints>

<output_format>
## Objective and success criteria
## Equipment and setup
List, then the layout in words.
## Lesson plan
Table: Time | Phase | Activity and organisation | Coaching points | Easier / Harder (STEP).
## Adaptations
Bullets by need, then non-participant roles.
## Safety
Checklist.
## Assessment
Bullets.
</output_format>
