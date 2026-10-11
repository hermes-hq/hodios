---
schema: 1
id: break-down-sports-technique
kind: prompt
title: Break down a sports technique for coaching
description: Breaks a sports technique such as a tennis serve, a jump shot or a front crawl stroke into phases, a few coaching cues, common faults with their real causes and fixes, and a drill progression.
category: sports
version: 1.0.0
status: incubating
stage: [learn, plan]
role: [individual, teacher, parent]
requires: [none]
inputs: [topic, text]
output: [explanation, plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [technique, coaching-cues, skill-acquisition, fault-correction, drill-progression, volunteer-coach]
pairs_with:
  prompts: [plan-youth-sports-practice, learn-new-sport-as-adult]
  personas: [youth-sports-coach]
args:
  - name: technique
    description: The skill to break down, with the sport, for example "overhand serve in volleyball", "a cricket forward defence" or "flip turn in swimming".
    type: string
    required: true
  - name: learners
    description: Who you are coaching - age, level, group size and anything specific such as "most of them drop the elbow".
    type: text
    required: true
  - name: equipment
    description: Space and equipment available. Optional.
    type: text
output_contract:
  format: markdown
  sections: [The technique in phases, Coaching cues, Common faults and fixes, Drill progression, What to watch for]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help volunteer coaches, PE teachers and parents teach a sports technique. Novice coaches pile on instructions; good coaches pick two or three short cues, focus learners on the outcome or an external target ("send the ball to the back wall") more than on body parts, and correct the cause of a fault rather than its symptom (a ball that sprays left is often a contact-point or footwork problem, not an arm problem). Learners improve fastest with many repetitions in a game-like setting and one correction at a time. Technique norms differ between coaching traditions, so describe the widely taught version and note where coaches legitimately differ.

Technique: {{technique}}

Learners:
{{learners}}
{{#equipment}}

Space and equipment: {{equipment}}
{{/equipment}}
</context>

<task>
1. Break the technique into three to five phases (for example preparation, loading, action, contact or release, follow-through), with what good looks like in each.
2. Give two or three coaching cues suited to these learners' age and level, phrased as short external-focus prompts where possible, plus one cue for advanced learners.
3. List the four to six most common faults for this level. For each: what you see, the usual underlying cause, the fix, and one cue or drill that addresses the cause.
4. Write a drill progression of four to six steps from simplest (closed, slow, no pressure) to game-like (opponent, decision, time pressure), with what learners must show before moving on and how to make each step easier or harder.
5. Add what to watch for: the one thing to look at first from which angle, and how to give feedback in one sentence.
6. Note any safety points that apply to this technique and age group, such as load, landing or contact rules.
</task>

<constraints>
- Do not overload learners: no more than three cues in use at once.
- Fix causes, not symptoms; where a fault has several possible causes, say how to tell them apart.
- Keep advice appropriate for the age given; do not prescribe heavy loading, high-volume throwing or contact techniques beyond what youth guidelines allow, and say to check local guidance.
- Say where coaching schools differ instead of presenting one style as the only correct one.
- If the technique is unclear or not a real sports skill, ask what is meant.
</constraints>

<output_format>
## The technique in phases
Table: Phase | What good looks like.
## Coaching cues
## Common faults and fixes
Table: Fault | Usual cause | Fix | Cue or drill.
## Drill progression
Numbered, with move-on criteria.
## What to watch for
</output_format>
