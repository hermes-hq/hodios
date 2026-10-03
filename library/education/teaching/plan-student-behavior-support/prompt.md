---
schema: 1
id: plan-student-behavior-support
kind: prompt
title: Plan individual behaviour support for a student
description: Drafts an individual behaviour support plan from ABC observations, with a hypothesised function, prevention, a replacement skill, responses and data to collect, for review with specialists.
category: teaching
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher]
requires: [none]
advice_risk: [mental-health]
inputs: [notes, text]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [behaviour-support, functional-behaviour-assessment, abc-data, replacement-behaviour, pbis, inclusion]
pairs_with:
  prompts: [design-classroom-management-plan, write-iep-goals]
  personas: [special-education-advisor, instructional-coach]
args:
  - name: observations
    description: ABC notes (antecedent, behaviour, consequence) from several incidents, with times, settings and what adults did. Use initials only.
    type: text
    required: true
  - name: student_age
    description: Age or grade, and setting, e.g. "7, Grade 2 mainstream class" or "14, Year 9, rotates between six teachers".
    type: string
    required: true
  - name: supports_in_place
    description: Optional supports already tried or in place (seating, visual schedule, check-ins, an existing plan) and how they went.
    type: text
output_contract:
  format: markdown
  sections: [Important first, Behaviour defined, Patterns in the data, Hypothesis, Prevention, Replacement skill, Responses, Data to collect, Review with the team]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Behaviour serves a purpose for the student. Most persistent classroom behaviour gets something (attention from adults or peers, an object or activity, sensory input) or avoids something (a task, a demand, a social situation, discomfort). Plans that only add consequences often strengthen the behaviour, for example sending a student out of a task they want to avoid. Effective individual plans are built on a hypothesis about the function drawn from patterns in observations, then change the triggers (prevention), teach a replacement behaviour that gets the student the same thing in an acceptable way, respond so the problem behaviour stops paying off, and collect data to check the hypothesis. A teacher's draft is a starting point for the school's behaviour specialists, special educators or psychologist and the family, not a substitute for a formal functional behaviour assessment where one is needed.
</context>

<task>
Draft a behaviour support plan for a student aged {{student_age}}.

<observations>
{{observations}}
</observations>
{{#supports_in_place}}
<supports_in_place>
{{supports_in_place}}
</supports_in_place>
{{/supports_in_place}}

1. **Important first:** before planning, check the observations for anything that needs immediate action rather than a plan: self-harm or talk of it, harm to others that puts anyone at risk, signs of abuse or neglect, or a disclosure. If any is present, write the safety steps here (who to tell today, what to record, what to do if anyone is in immediate danger), then write only the "Review with the team" section and stop: say the behaviour plan waits until the safeguarding lead has acted, and do not treat the concern as a behaviour to manage.
2. **Behaviour defined:** describe each target behaviour so two observers would agree when it happens (what it looks and sounds like), and its estimated frequency or duration from the notes.
3. **Patterns in the data:** when, where, during what, with whom, and what usually happens straight after. Note the times and settings where the behaviour does not happen; they are clues.
4. **Hypothesis:** a summary statement, "When [antecedent], [student] does [behaviour] in order to [get or avoid what], and this is maintained because [consequence]." Give a confidence level and the evidence for and against, plus one alternative function to rule out.
5. **Prevention:** 3 to 5 changes to antecedents (task design, choice, pre-teaching, visual supports, seating, transitions, relationship-building check-ins) matched to the hypothesis.
6. **Replacement skill:** one acceptable behaviour that serves the same function and is easier than the problem behaviour (for example asking for a break with a card), how it will be taught and practised, and how it will be reinforced every time at first.
7. **Responses:** what adults do when the replacement skill is used, at early warning signs, and when the behaviour happens, so the behaviour no longer gets the student what it used to, with calm, consistent scripts. Include how to help the student calm and how to repair afterwards.
8. **Data to collect:** a simple tally, interval or ABC form, who records it, for how long, and what change in the data would confirm or reject the hypothesis.
9. **Review with the team:** questions for the family, specialists to involve (for example a special educator, behaviour specialist, school psychologist or counsellor) and a review date.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- The user is a teacher; the safety steps above apply to the student. A student's talk of suicide or self-harm, harming someone, or being harmed goes to the school's designated safeguarding or child-protection lead the same day, and to emergency services if anyone is in immediate danger.
- Never diagnose or suggest a diagnosis (ADHD, autism, trauma, anxiety). Describe what was observed; the team decides whether an assessment is needed.
- Never recommend restraint, seclusion, physical punishment, shaming, public behaviour charts that single the student out, or withholding food, water, toilet access or play as consequences. Physical intervention is only ever under school policy by trained staff to prevent immediate harm.
- Base every claim on the observations. With fewer than about five incidents, say the hypothesis is tentative and lead with data collection.
- Use respectful, person-first language and the student's initials only.
- Fit the plan to the setting: a secondary student with several teachers needs a plan every teacher can follow in under a minute.
</constraints>

<output_format>
## Important first
Safety items and actions, or "No immediate safety concerns found in the notes." If there are safety items, this section and "Review with the team" are the whole response.
## Behaviour defined
Bullets per behaviour.
## Patterns in the data
Table: Antecedent / setting | Behaviour | What happened next | Count.
## Hypothesis
The summary statement, confidence, evidence for and against, alternative to rule out.
## Prevention
Bullets.
## Replacement skill
Skill, how it is taught, how it is reinforced.
## Responses
Table: Situation | What adults do | What adults say.
## Data to collect
Method, who, how long, decision rule.
## Review with the team
Questions, people to involve, review date.
</output_format>
