---
schema: 1
id: break-bad-habit
kind: prompt
title: Break a bad habit
description: Builds a plan to break a habit from its cues and rewards - friction, a substitute that meets the same need, environment changes, if-then plans for risky moments and a plan for slips.
category: habits
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, student]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [habit-loop, behaviour-change, friction, competing-response, relapse-prevention, cue-analysis]
pairs_with:
  prompts: [design-habit-plan, set-woop-goals, plan-30-day-challenge]
  personas: [life-coach, productivity-coach]
args:
  - name: habit
    description: The habit you want to stop or cut down, how often it happens, and why you want to change it, for example "scrolling my phone in bed for an hour most nights".
    type: text
    required: true
  - name: context
    description: When and where it usually happens, what you are feeling or doing just before, what you get out of it, and what you have tried before. Optional; a short tracking plan is suggested if missing.
    type: text
output_contract:
  format: markdown
  sections: [The habit loop, What it gives you, Friction, Substitute, Environment, If-then plans, Slips, Tracking and review, One-page plan]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people break habits using what behaviour-change research and practice suggest. A habit is a loop: a cue (a time, place, feeling, preceding action or person) triggers a routine that delivers a reward (relief, stimulation, comfort, connection, a break). Willpower against a strong cue rarely lasts. What works is to understand the loop, remove or avoid cues where possible, add friction to the routine, give the same need a better route through a substitute behaviour, change the environment so the easy path is the better one, plan in advance for the risky moments, and treat slips as data rather than failure, because the "I've blown it anyway" reaction after a slip does more damage than the slip.

The habit:
<habit>
{{habit}}
</habit>
{{#context}}
Context:
<context_from_user>
{{context}}
</context_from_user>
{{/context}}
</context>

<task>
1. Map the habit loop from what the person said: cues (time, place, emotional state, preceding action, people), the routine itself, and the reward. Where something is unknown, say so; if the cues are unclear, give a three-day tracking exercise (note time, place, feeling and what happened just before each time) and build a provisional plan from the most likely cues.
2. Name what the habit gives them: the need it meets. Be specific and non-judgemental ("winding down after a stressful day", "a break from a boring task").
3. Design friction: two to four concrete ways to make the routine slower, less visible or less automatic (distance, extra steps, removing triggers, settings, pre-commitment), matched to this habit.
4. Choose a substitute behaviour that meets the same need and is incompatible with the old routine where possible, available at the same cue, and easy. For body-focused habits (nail biting, hair pulling, skin picking), use a competing response that occupies the same hands or muscles for about a minute.
5. Change the environment: what to remove, move, add or prepare, and any people to tell or ask for help.
6. Write if-then plans for the two or three riskiest moments: "If [cue], then I will [substitute or action]."
7. Plan for slips: what to do right after a slip (note the cue, return to the plan at the next opportunity, no punishment), the difference between a slip and a full return to the old pattern, and what to change if slips cluster around one cue.
8. Set up simple tracking and a two-week review: what to count (urges resisted, occurrences, minutes), and the questions to ask at review.
9. Summarise on one page.
</task>

<constraints>
- Decide with the person whether the aim is to stop completely or cut down; if they have not said, suggest which fits and why, and design for that.
- Use their words and situation; do not invent details or motives. State assumptions.
- Be non-judgemental and practical. No shaming, no moralising.
- Substance use and other potentially dependent behaviours: if the habit involves alcohol, nicotine, cannabis, other drugs, medication misuse, or gambling, keep the plan general and recommend talking to a doctor or a specialist service, and give no tapering or dose schedules. Say clearly that stopping heavy daily drinking or some medicines abruptly can be dangerous and should be planned with a doctor.
- If the habit involves self-harm, disordered eating, or anything that suggests the person may be in danger, do not build a habit plan. Respond with care, encourage them to speak to a doctor or a mental-health professional, and point them to local emergency services or a crisis line if there is any immediate risk.
- If the habit is causing serious harm to health, work, money or relationships, or past attempts keep failing, suggest professional support alongside the plan.
</constraints>

<output_format>
## The habit loop
Table: Cue | Routine | Reward, with "unknown" where unknown; then the tracking exercise if needed.

## What it gives you
One or two sentences.

## Friction
Bullets.

## Substitute
The substitute behaviour, why it meets the same need, and how to make it easy.

## Environment
Bullets: remove, move, add, tell.

## If-then plans
Two or three lines.

## Slips
What to do, in three to five bullets.

## Tracking and review
What to count, and the review questions for day 14.

## One-page plan
Seven lines or fewer, ready to copy.
</output_format>
