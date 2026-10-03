---
schema: 1
id: set-up-routines-for-child-with-adhd
kind: prompt
title: Set up routines for a child with ADHD
description: Sets up home routines for a child with ADHD or ADHD-like struggles, with visual schedules, short steps, timers, quick rewards and calm transitions for the times of day that go wrong.
category: parenting
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
subject: [psychology]
requires: [none]
inputs: [text]
output: [plan, table, checklist, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [adhd, executive-function, visual-schedule, routines, token-economy, transitions]
pairs_with:
  prompts: [plan-behavior-approach, streamline-school-mornings, prepare-for-iep-meeting]
  personas: [parenting-coach]
args:
  - name: child_age
    description: The child's age, and whether ADHD is diagnosed, suspected or being assessed.
    type: string
    required: true
  - name: problem_times
    description: 'The times of day or tasks that go wrong and what happens, for example "mornings: can''t get dressed without ten reminders; homework: up every two minutes; bedtime: meltdowns when screens go off". Include what you have tried.'
    type: text
    required: true
output_contract:
  format: markdown
  sections: [How we will approach it, Routines for your problem times, Visual schedule to print, Timers and transitions, Rewards that work, When it goes wrong, Making it stick, Talk to the clinician or school if]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design home routines for children with ADHD, using the principles behind parent behaviour-management training, which guidelines recommend as a first-line support for young children with ADHD. The core difficulty is executive function: holding steps in mind, judging time, starting boring tasks and shifting attention. Children with ADHD usually know what to do; they struggle to do it at the right moment. So help works at the "point of performance": the cue, the step list and the reward are right there where the task happens, not in a lecture beforehand. Effective routines break tasks into short visible steps, make time visible, give feedback and rewards quickly and often, prepare for transitions, and replace repeated verbal reminders with a calm prompt to the chart.

Child's age: {{child_age}}

<problem_times>
{{problem_times}}
</problem_times>
</context>

<task>
1. How we will approach it: three or four lines on the principles you are applying to this child, in plain words, and an encouraging note that progress is measured as "fewer reminders, shorter meltdowns", not perfection.
2. Routines for your problem times: for each problem time named, a step-by-step routine as a table: each step short and concrete ("shoes on" rather than "get ready"), a visual cue (picture, card, checklist item, where it lives), a time per step, and exactly what the parent says, which should be a short prompt that points to the chart ("What's next on your list?"). Build in movement breaks for homework (for example, short work bursts with a timer, then a brief movement break, lengths adjusted to age).
3. Visual schedule to print: the text for a schedule for each routine, in pictures-plus-words form for young children and a checklist for older children, plus where to put it.
4. Timers and transitions: visual timers, countdown warnings ("five more minutes, then screens off"), first-then language, a transition ritual for the hardest switch (for example, screens off), and how to use the child's interests.
5. Rewards that work: a simple token or points system with immediate small rewards and a weekly bigger one, what earns points (completing steps, starting quickly), praise that names the behaviour, and the aim of roughly four or five positive comments for every correction. Rewards start generous and fade gradually.
6. When it goes wrong: calm, brief responses to refusals and meltdowns, planned ignoring of minor behaviours, short logical consequences, and how to reset afterwards.
7. Making it stick: start with one routine for two weeks, keep all caregivers consistent, review with the child what is working, adjust, then add the next routine. For teenagers: collaborate on the system and use the tools they already use (phone reminders, alarms, shared calendars).
8. Talk to the clinician or school if: routines are not helping after several weeks, problems are severe at school, the child seems anxious or low, sleep is poor, or there are side effects or questions about medicine timing (for the prescriber).
</task>

<constraints>
- Do not diagnose ADHD or any other condition; the plan works whether ADHD is diagnosed, suspected or not, and if it is not assessed and problems are significant, suggest talking to the family doctor or paediatrician.
- Do not advise on medicines, doses or timing; questions about medication go to the prescriber.
- No physical punishment, shaming, food as punishment, or taking away exercise and outdoor play as a consequence.
- Fit everything to the age: pictures and play for young children, collaboration and autonomy for teenagers.
- Use the problem times given; if they are vague, ask what happens step by step at the worst moment.
- Warm, practical and short; parents of children with ADHD are often exhausted and criticised. Acknowledge that once, briefly.
</constraints>

<output_format>
## How we will approach it
## Routines for your problem times
A table per problem time: Step | Visual cue | Time | What you say.
## Visual schedule to print
## Timers and transitions
## Rewards that work
Table: Earns points | Points | Reward.
## When it goes wrong
## Making it stick
## Talk to the clinician or school if
</output_format>
