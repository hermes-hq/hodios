---
schema: 1
id: plan-sel-lesson
kind: prompt
title: Plan a social-emotional learning lesson
description: Plans an age-appropriate social-emotional learning lesson on a skill such as managing frustration, friendship or empathy, with a hook, activity, discussion and check-in routine.
category: teaching
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher]
requires: [none]
advice_risk: [mental-health]
inputs: [topic, notes]
output: [plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [social-emotional-learning, sel, wellbeing, self-regulation, classroom-community, pshe]
pairs_with:
  prompts: [design-classroom-management-plan, plan-student-behavior-support, plan-first-week-of-school]
  personas: [early-years-educator]
args:
  - name: skill
    description: The social-emotional skill, e.g. "calming down when frustrated", "joining in a game", "seeing a problem from someone else's side", "repairing after a conflict".
    type: string
    required: true
  - name: grade_level
    description: Grade, year or age, e.g. "Kindergarten", "Grade 3", "Year 8".
    type: string
    required: true
  - name: minutes
    description: Lesson length in minutes.
    type: number
    default: 30
  - name: class_context
    description: Optional context, e.g. "lots of playground fallouts after lunch", "several new arrivals", "school uses the Zones of Regulation". No student names.
    type: text
output_contract:
  format: markdown
  sections: [Before you teach, Objective, Hook, Teach and model, Practise, Discussion, Check-in routine, Carry it into the week]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Social-emotional skills are taught well the same way other skills are: name the skill, show what it looks and sounds like, practise it in safe low-stakes situations, and practise again in real moments across the week. The common failures are lessons that are all talk and no practice, activities that pressure children to share painful personal experiences in front of peers, and a single lesson with no follow-through. Using stories, puppets, characters and "what could they do?" scenarios lets children practise without exposing themselves. The teacher is the user here; the lesson is general classroom teaching, not counselling for any individual child.
</context>

<task>
Plan a {{minutes}}-minute lesson for **{{grade_level}}** that teaches **{{skill}}**.
{{#class_context}}
<class_context>
{{class_context}}
</class_context>
{{/class_context}}

1. **Before you teach:** one or two lines on why this skill matters at this age, anything about the class context to be careful with, and a plan for disclosures (see constraints).
2. **Objective:** one observable objective and a child-friendly "I can…" statement.
3. **Hook** (3 to 5 minutes): a story, picture, puppet moment or short scenario that shows a character struggling with the skill. Write it out.
4. **Teach and model:** break the skill into 2 to 4 concrete steps with a memorable name or visual (for example "Stop, breathe, name it, choose"), and a teacher think-aloud showing the steps in a realistic situation for this age.
5. **Practise:** a structured activity using third-person scenarios (role play with scripts, puppets, scenario cards, sorting helpful and unhelpful choices). Write 4 to 6 scenarios that match the age and, where given, the class context. Include how the teacher sets up and debriefs role play so no one is embarrassed.
6. **Discussion:** 4 or 5 questions that move from the character to general strategies, never requiring personal disclosure.
7. **Check-in routine:** a short, repeatable daily routine linked to the skill (a feelings scale, a "how's your engine running" check, a choice of calm-down tools), with opt-in and private ways to respond so no child must show their feelings publicly.
8. **Carry it into the week:** 3 or 4 ways to prompt and reinforce the skill in real moments, a line for families, and what to look for that shows children are using it.
9. Make timings add up to {{minutes}} minutes.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- The user is a teacher, so keep any limits note to one short line in "Before you teach". The safety steps above apply to the students: if a child discloses harm, abuse, self-harm or thoughts of suicide, the teacher listens calmly, does not promise secrecy or question in depth, records the child's words, and reports to the school's designated safeguarding or child-protection lead the same day, or contacts emergency services first if the child is in immediate danger.
- Never ask children to share personal trauma, family conflict or private feelings in front of the class. Use characters and hypothetical situations.
- Do not diagnose, label children, or suggest that a child has a mental-health condition. If the class context suggests a child needs individual support, recommend talking to the school's counsellor, psychologist or wellbeing lead.
- Respect cultural and family differences in how emotions are expressed; present strategies as options, not one right way to feel.
- Match language, length of talk and activity type to {{grade_level}}: short and concrete for young children, more discussion and real-life transfer for adolescents.
- If the school uses a named programme, fit the lesson's language to it and do not reproduce its proprietary materials.
</constraints>

<output_format>
## Before you teach
Why this skill matters, cautions, disclosure plan.
## Objective
Objective and "I can…".
## Hook
Time, then the script or story.
## Teach and model
Time, the steps, and the think-aloud.
## Practise
Time, setup, scenario cards, debrief.
## Discussion
Time and questions.
## Check-in routine
The routine, with private ways to respond.
## Carry it into the week
Prompts, a family line, look-fors.
</output_format>
