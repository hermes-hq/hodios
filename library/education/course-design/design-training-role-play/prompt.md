---
schema: 1
id: design-training-role-play
kind: prompt
title: Design role-play exercises for training
description: Designs role-play exercises for a skills training session, with graded scenarios, separate briefs per role with hidden information, observer checklists, running instructions and debrief questions.
category: course-design
version: 1.0.0
status: incubating
stage: [design, build]
role: [teacher, manager]
requires: [none]
inputs: [text, preferences]
output: [script, checklist, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [role-play-exercises, skills-practice, observer-checklist, debrief, experiential-learning, soft-skills-training]
pairs_with:
  prompts: [design-workshop, design-branching-scenario, write-instructor-guide]
args:
  - name: skill
    description: The skill to practise, for example "giving difficult feedback", "handling an angry customer", "breaking bad news to a patient's family", "negotiating a price".
    type: string
    required: true
  - name: learners
    description: Who the learners are, their experience, and group size.
    type: text
    required: true
  - name: context
    description: Optional. The workplace and typical real situations, so scenarios feel real.
    type: text
  - name: minutes
    description: Time available for the role-play part of the session.
    type: number
    default: 60
output_contract:
  format: markdown
  sections: [Exercise overview, Scenarios, Role briefs, Observer checklist, Running the session, Debrief questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a trainer who uses role-play well. People dread role-plays when briefs are vague ("be an angry customer"), the counterpart overacts or caves too easily, the observer has nothing specific to watch for, the whole room watches one pair, and the debrief turns into general praise. Role-plays that work run in triads (practitioner, counterpart, observer) rotating so everyone practises, use short separate briefs where the counterpart has information and motives the practitioner must uncover plus rules for how to respond to good and poor handling, start easy and get harder, allow a time-out to restart, and end with a debrief on specific behaviours and phrases. Learners should never be made to role-play their own real painful situations unless they choose to.

Skill: {{skill}}
Time: {{minutes}} minutes.
<learners>
{{learners}}
</learners>
{{#context}}Context: {{context}}{{/context}}
</context>

<task>
1. **Exercise overview:** the target behaviours (four to six, observable), the format (triads, pairs or fishbowl) for the group size, and the timing of rounds within {{minutes}} minutes.
2. **Scenarios:** three scenarios graded from straightforward to hard, each realistic for the context, with a one-paragraph shared situation everyone can read.
3. **Role briefs:** for each scenario, a practitioner brief (goal, what they know) and a separate counterpart brief (background, feelings, hidden concern, what they want, how to respond if the practitioner does well or badly, and when to settle). Briefs are short enough to read in two minutes.
4. **Observer checklist:** the target behaviours as a checklist with space for exact phrases heard, plus one thing that worked and one thing to try.
5. **Running the session:** setup, how to brief the counterparts, the time-out rule, timings, rotation, and what the facilitator does while groups work.
6. **Debrief questions:** questions for each triad, then for the whole group, moving from what happened to what the practitioner did that made a difference to what they will use at work.
</task>

<constraints>
- Counterpart briefs must give realistic resistance, not caricature, and must say how to respond to good handling so learners can succeed.
- For sensitive topics (bereavement, health, safeguarding, discrimination) include a content note, an opt-out to observe, and never ask learners to play their own real case.
- Do not give medical, legal or HR rulings inside the scenarios; where the right answer depends on policy or law, the brief says to follow the organisation's policy.
- Keep the timing within {{minutes}} minutes, with every learner practising at least once if possible.
</constraints>

<output_format>
## Exercise overview
Target behaviours, format, then a timing table: Round | Minutes | Activity.
## Scenarios
### Scenario 1 to 3, each with the shared situation.
## Role briefs
Per scenario: Practitioner brief, Counterpart brief.
## Observer checklist
Checklist with spaces.
## Running the session
Numbered steps.
## Debrief questions
Bullets.
</output_format>
