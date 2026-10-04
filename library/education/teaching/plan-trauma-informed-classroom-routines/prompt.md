---
schema: 1
id: plan-trauma-informed-classroom-routines
kind: prompt
title: Plan trauma-informed classroom routines
description: Plans predictable, safe-feeling classroom routines for pupils affected by trauma, with transitions, a regulation space, language to use, repair, and when to involve the safeguarding lead.
category: teaching
version: 1.1.0
status: incubating
stage: [plan]
role: [teacher]
requires: [none]
inputs: [text, preferences]
output: [plan, table, checklist]
risk: read-only
advice_risk: [mental-health]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [trauma-informed, safeguarding, classroom-routines, co-regulation, transitions, relational-practice]
pairs_with:
  prompts: [design-classroom-management-plan, plan-student-behavior-support, plan-sel-lesson]
args:
  - name: age_group
    description: Age or year group, e.g. "Year 2 (ages 6-7)" or "ages 14-16".
    type: string
    required: true
  - name: setting
    description: The kind of setting, e.g. mainstream-classroom, nurture group, alternative provision, specialist school, secondary subject classroom with several classes a day.
    type: string
    default: mainstream-classroom
  - name: concerns
    description: Optional. What the teacher is seeing, described without names or identifying details, e.g. "two pupils freeze or run at transitions; loud noises trigger outbursts; Mondays are hard".
    type: text
output_contract:
  format: markdown
  sections: [Principles in this room, Daily rhythm, Transitions, Regulation space, Language to use and avoid, When a pupil is dysregulated, Repair and reconnection, Safeguarding, Looking after the adults]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.1.0, note: "Declares mental-health advice risk and adds the professional-limits and crisis-safety guardrails, applied to pupils through the safeguarding lead."}
---
<context>
Trauma-informed practice in a classroom is not therapy. It is a set of everyday routines that help any child feel safe enough to learn, and help children whose experiences have taught them that adults and change are dangerous. The core ideas are predictability, felt safety, relationships with consistent adults, regulating before reasoning, offering choice, and responding to behaviour as communication without shame, while still keeping clear boundaries. Teachers do not need to know a child's history to use them, and they must never try to find it out. Any concern about harm goes to the safeguarding lead.

Learners: {{age_group}}. Setting: {{setting}}.
</context>

<task>
{{#concerns}}
<concerns>
{{concerns}}
</concerns>
Tailor the plan to these concerns. If they include names or identifying details, do not repeat them.
{{/concerns}}

Plan routines for this class:

1. **Principles in this room:** four to six plain commitments the adults make (for example "we tell you before things change"), written so they could go on the wall in age-appropriate words.
2. **Daily rhythm:** arrival and greeting (a predictable welcome and a quick, non-intrusive check-in), a visual timetable, how the day or lesson starts and ends, and how changes such as supply teachers, fire drills and trips are announced in advance.
3. **Transitions:** routines for the transitions that most often go wrong for this age and setting (into class, between activities, tidy-up, breaks, end of day), with warnings, visual or sound signals, jobs, and a plan for pupils who find a specific transition hard.
4. **Regulation space:** a calm area inside the room, how it is introduced to the whole class, what is in it, how pupils ask to use it, how long, how they return, and how to keep it a support rather than a punishment or an escape from work. For secondary or multi-room settings, give an alternative such as a regulation pass.
5. **Language to use and avoid:** a table of situations (a pupil refuses, shouts, shuts down, runs, says something hurtful) with phrases that connect and set limits calmly, and phrases to avoid (shaming, public sanctions, sarcasm, "calm down").
6. **When a pupil is dysregulated:** staged responses from early signs to crisis: noticing, co-regulating (lower voice, fewer words, offering space or a choice), keeping others safe, when to get help, and what to avoid (arguing, touching without consent unless policy and safety require it, crowding). Note that physical intervention follows school policy and training only.
7. **Repair and reconnection:** how the adult and pupil restore the relationship after an incident, a short restorative conversation script for this age, and how logical consequences still apply without shame.
8. **Safeguarding:** state plainly that any disclosure, sign of abuse or neglect, self-harm, or worry about a child's safety goes to the designated safeguarding lead the same day following school procedure. The adult listens, does not investigate or ask leading questions, does not promise secrecy, writes down the child's own words, the time and what they saw, and passes it on. In immediate danger, follow emergency procedures first.
9. **Looking after the adults:** how staff debrief after hard incidents, share consistent approaches, and seek support, since staff consistency is the routine.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- The user is a teacher; the safety steps above apply to the pupils they describe. A pupil's talk of suicide or self-harm, being harmed, or harming someone goes to the designated safeguarding lead the same day, and to emergency services first if anyone is in immediate danger. If the concerns describe such a case, lead with that step before any routines.
- Do not diagnose pupils, label them as "traumatised", or suggest the teacher identify which pupils have trauma histories. The routines are for the whole class.
- Never suggest asking pupils about their past or home life to explain behaviour.
- Keep boundaries and high expectations: warmth and structure together, not lowered standards.
- Fit routines to the age group and setting; secondary teachers seeing many classes need lighter, portable versions.
- Refer to the school's own behaviour, safeguarding and physical-intervention policies, which take precedence. Specialist input (educational psychologist, school counsellor, mental health team) is suggested when concerns persist.
- Before finishing, check the safeguarding section is explicit and the language table is free of shaming phrases.
</constraints>

<output_format>
## Principles in this room
Numbered, wall-ready.
## Daily rhythm
Bullets in time order.
## Transitions
Table: Transition | Routine | Support for pupils who find it hard.
## Regulation space
Bullets.
## Language to use and avoid
Table: Situation | Say | Avoid.
## When a pupil is dysregulated
Staged list from early signs to crisis.
## Repair and reconnection
Bullets and a short script.
## Safeguarding
Bullets.
## Looking after the adults
Bullets.
</output_format>
