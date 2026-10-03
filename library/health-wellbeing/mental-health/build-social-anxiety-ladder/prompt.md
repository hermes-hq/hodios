---
schema: 1
id: build-social-anxiety-ladder
kind: prompt
title: Build a social anxiety exposure ladder
description: Builds a graded exposure ladder for feared social situations, with ranked steps, coping skills, safety behaviours to drop and a progress log, as self-help alongside any care.
category: mental-health
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
subject: [psychology]
requires: [none]
inputs: [text]
output: [plan, table]
risk: read-only
advice_risk: [mental-health]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [social-anxiety, exposure, fear-ladder, safety-behaviours, confidence-building]
pairs_with:
  prompts: [manage-event-anxiety, reframe-negative-thoughts, build-self-confidence, prepare-for-therapy]
  personas: [supportive-listener]
args:
  - name: situations
    description: The social situations you avoid or dread and what you fear will happen, for example "speaking up in team meetings, I'll go red and people will think I'm stupid", "phoning to book appointments", "small talk at parties".
    type: text
    required: true
  - name: current_strategies
    description: What you do now to get through or avoid these situations, for example "rehearse every sentence", "stay on my phone", "leave early", "only go if my partner comes". Optional.
    type: text
output_contract:
  format: markdown
  sections: [Before you start, What keeps the fear going, Your ladder, How to do each step, Coping skills, Progress log, When to get more help]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people build a graded exposure ladder for social anxiety, using the principles of cognitive behavioural therapy for social anxiety: avoidance and safety behaviours (rehearsing, avoiding eye contact, holding a drink to hide shaking, staying silent) keep fear going because the person never learns that the feared outcome is unlikely or survivable; repeated, planned exposure that is hard but manageable, without safety behaviours, lets anxiety fall and builds confidence; attention turned outward to the conversation works better than monitoring yourself. Exposure is self-help here, used alongside any care the person already has.

<situations>
{{situations}}
</situations>
{{#current_strategies}}
<current_strategies>
{{current_strategies}}
</current_strategies>
{{/current_strategies}}
</context>

<task>
1. Before you start: say in two lines what this can and cannot do. If the person describes avoidance so severe that they rarely leave home, panic attacks, low mood, or use of alcohol or drugs to cope, say a doctor or therapist can help and that exposure works best with their support, then still give the plan.
2. What keeps the fear going: using their own situations, name the feared outcome (a prediction, such as "they'll think I'm boring"), the avoidance, and the safety behaviours from their current strategies (if they gave none, list typical ones for these situations, marked as examples to check). Explain in plain words why each one keeps the fear alive.
3. Build a ladder of 8 to 12 steps from their situations. Break each situation into smaller versions by varying who is there, how long, how much attention is on them, and whether a safety behaviour is used. Rate each step 0 to 100 for expected anxiety (SUDS), marked as an estimate they should adjust. Start around 30 to 40, not at 0, and end with their hardest situation.
4. How to do each step: stay until anxiety drops noticeably or for the planned time, rather than leaving at the peak; repeat a step several times over a week before moving up; drop one safety behaviour at a time; before each step write the prediction and how sure they are, and afterwards what actually happened. Move up when a step feels around 30 or less; if a step is too big, add an in-between step instead of giving up.
5. Coping skills to use during exposure: slow breathing to take the edge off (not to escape), turning attention outward to the other person and the task, and a short coping statement in their words. Explain that the goal is to stay and learn, not to feel no anxiety.
6. Progress log template and a weekly review question.
7. When to get more help: a therapist trained in CBT for social anxiety if progress stalls after several weeks, if fear stops them working or studying, or if low mood appears.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Never suggest medicines, alcohol or other substances to get through a step.
- Steps must be things the person can actually set up this week; no steps that put them in danger or embarrass other people.
- Use their situations and words; do not invent fears they did not mention, except as clearly marked examples.
- If the situations are too vague to build steps (for example "everything social"), ask for two or three concrete situations and give a starter ladder from common ones, clearly labelled.
- Do not label them with a diagnosis.
</constraints>

<output_format>
## Before you start
## What keeps the fear going
Table: Situation | Feared outcome | Avoidance or safety behaviour | Why it keeps the fear going.
## Your ladder
Table: Step | What I will do | Safety behaviour to drop | Expected anxiety 0-100. Lowest first.
## How to do each step
Numbered rules, five to seven lines.
## Coping skills
## Progress log
Table: Date | Step | Prediction (and % sure) | Anxiety before / peak / after | What actually happened | What I learned.
## When to get more help
</output_format>
