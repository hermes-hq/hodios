---
schema: 1
id: plan-after-school-club
kind: prompt
title: Plan a term of an after-school club
description: Plans a term of an after-school club such as coding, robotics, chess, art or debate, with session plans, a skill progression, mixed-ability options and an end-of-term showcase.
category: course-design
version: 1.0.0
status: incubating
stage: [plan, design]
role: [teacher, parent]
requires: [none]
inputs: [topic, preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
tags: [after-school, extracurricular, club-leader, showcase, mixed-ability, enrichment]
pairs_with:
  prompts: [plan-day-camp-program, design-classroom-activity, create-review-game]
args:
  - name: club_type
    description: What the club does, with any equipment you have, e.g. "robotics club with 6 LEGO robotics kits and 8 laptops", "chess club".
    type: string
    required: true
  - name: ages
    description: Ages or grades of the members and roughly how many, e.g. "ages 9-11, about 15 children".
    type: string
    required: true
  - name: sessions
    description: Number of weekly sessions in the term.
    type: number
    default: 10
output_contract:
  format: markdown
  sections: [Club overview, Skill progression, Session template, Session plans, Showcase, Logistics and safety, Assumptions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
After-school clubs are voluntary, so children vote with their feet. Clubs that last feel different from lessons: members are doing the thing within five minutes, they make or play something every session, they see themselves getting better, and they work toward something they can show. Leaders face mixed ages and abilities, irregular attendance, tired children at the end of the school day and limited equipment, so each session must stand on its own while still building a progression across the term.
</context>

<task>
Plan {{sessions}} sessions of a **{{club_type}}** club for **{{ages}}**.

1. If the session length, equipment or number of children is unknown, assume 60 minutes, basic equipment for the activity and about 15 children, and list these assumptions; ask nothing unless the club type itself is unclear.
2. **Club overview:** what members will be able to do by the end of term, in child-friendly words, and the club's rhythm.
3. **Skill progression:** 3 to 4 stages across the term (for example "first moves → tactics → full games → tournament") with what a member can do at each stage.
4. **Session template:** a repeating structure that suits tired children: an arrival activity that anyone can join late (5 to 10 minutes), a short demo or challenge introduction (no more than about 10 minutes of talk), the main hands-on activity, a share or show moment, and tidy-up.
5. **Session plans:** for each of the {{sessions}} sessions, the goal, the main activity, the equipment, a "level up" challenge for confident members and an easier entry for newcomers or younger members. Make every session work for a child who missed the previous one.
6. **Showcase:** an end-of-term event (exhibition, tournament, demo, debate with an audience) with what each member contributes, how families are invited, and how to make sure every child has something to show.
7. **Logistics and safety:** equipment per session, setup time, supervision and adult-to-child ratios to check against the school's or organisation's policy, collection and sign-out, consent for photos at the showcase, and any activity-specific safety (tools, hot glue, online accounts and data for coding clubs).
</task>

<constraints>
- Match activities to the stated ages: reading load, fine motor skills and attention span.
- Keep demos short and the hands-on time long; every session produces something visible (a build, a game played, a speech given, a piece made).
- Do not assume extra budget or equipment beyond what was stated; suggest optional low-cost extras separately.
- Do not state safeguarding ratios or legal requirements as fact; mark them as items to check with the school or local rules.
- Any online tool for children must be age-appropriate and approved by the school; do not require children to create personal accounts without parental and school consent.
</constraints>

<output_format>
## Club overview
Short paragraph and "By the end of term, you'll be able to…" bullets.
## Skill progression
Table: Stage | Sessions | Members can….
## Session template
Timed list.
## Session plans
Table: # | Goal | Main activity | Equipment | Level up | Easier entry.
## Showcase
Bullets.
## Logistics and safety
Checklist.
## Assumptions
Bullets.
</output_format>
