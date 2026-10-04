---
schema: 1
id: design-family-learning-course
kind: prompt
title: Design a family learning course
description: Designs a short family learning course where parents or carers and children learn together, with joint and separate parts each session, a weekly take-home activity and an informal celebration.
category: course-design
version: 1.0.0
status: incubating
stage: [design, plan]
role: [teacher]
requires: [none]
inputs: [text, preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [family-learning, parental-engagement, intergenerational-learning, adult-learners, take-home-activities, community-learning]
pairs_with:
  prompts: [plan-parent-workshop, design-adult-evening-class]
args:
  - name: subject
    description: What the family learns, e.g. "early maths through play", "reading for pleasure", "staying safe online", "cooking on a budget with maths".
    type: string
    required: true
  - name: child_age
    description: Age range or school year of the children, e.g. "4-5 (Reception)", "7-9".
    type: string
    required: true
  - name: sessions
    description: Number of weekly sessions.
    type: number
    default: 6
  - name: setting
    description: Optional. Venue (school, library, community centre), session length, who the families are (languages, confidence with the subject, work patterns), staff available and whether adults can gain a qualification.
    type: text
output_contract:
  format: markdown
  sections: [Course aims, Session structure, Session-by-session plan, Take-home activities, Recruiting and keeping families, Celebration and next steps]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Family learning courses help parents and carers support their children's learning and often restart the adult's own learning too. Many adults who come had a poor experience of school, may not be confident with the subject, and may speak another language at home. Courses lose them when the adult session feels like being back in a classroom, when parents are shown how they are "doing it wrong", when take-home tasks need materials or money, or when the joint time is the child performing for the adult. They work when adults have their own time to learn and ask questions, joint time is playful and shared, the take-home activity uses everyday things, and progress is celebrated.

Subject: {{subject}}.
Children's age or school year: {{child_age}}.
Number of sessions: {{sessions}}.
</context>

<task>
{{#setting}}
<setting>
{{setting}}
</setting>
{{/setting}}

1. **Course aims:** for adults (what they will understand about how children learn {{subject}} now, what they will feel confident to do at home, any own-skill gain), and for children.
2. **Session structure:** a repeatable session with an adults-only part (with childcare or a parallel children's activity), a joint part where adult and child do a task together, and a short close where families choose this week's take-home activity. Default to 90-120 minutes unless the setting says otherwise.
3. **Session-by-session plan:** for each of the {{sessions}} sessions: theme, the adult session content (including how the school or setting teaches this, explained without jargon), the joint activity, and what children practise.
4. **Take-home activities:** one per week, using free or household items, short (10-15 minutes), adaptable for different languages and literacy levels, with a simple way to share how it went (a photo, a sticker card, a chat at the next session).
5. **Recruiting and keeping families:** personal invitations, timing around work and school runs, food, welcoming dads, grandparents and other carers, interpreters or bilingual helpers, and what to do when a family misses a week.
6. **Celebration and next steps:** an informal final celebration (children show what they made, certificates for adults), signposting adults to further learning, and a short feedback activity for adults and children.
</task>

<constraints>
- Strengths-based tone: never imply parents are failing; build on what families already do at home and in their own languages.
- Pitch children's activities at {{child_age}} and adults' activities at an adult level.
- No take-home activity that needs a device, internet, printer or bought materials unless the setting confirms families have them; offer a non-digital option.
- Note safeguarding basics for the setting (adults stay responsible for their own child in joint time; staff ratios in any separate children's activity per local policy, marked [check]).
- Do not invent funding rules or qualification details.
- If {{subject}} or {{child_age}} is missing, ask and stop.
</constraints>

<output_format>
## Course aims
Two short lists: Adults, Children.
## Session structure
Table: Minutes | Part | Adults | Children.
## Session-by-session plan
Table: Session | Theme | Adult session | Joint activity | Children practise.
## Take-home activities
Numbered, one per session.
## Recruiting and keeping families
Bullets.
## Celebration and next steps
Bullets.
</output_format>
