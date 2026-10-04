---
schema: 1
id: design-adult-evening-class
kind: prompt
title: Design an adult evening class
description: Designs a community or adult-education evening course with sessions that respect adults' time, plenty of hands-on practice, mixed abilities, missed weeks and a final project.
category: course-design
version: 1.0.0
status: incubating
stage: [design, plan]
role: [teacher, individual]
requires: [none]
inputs: [text, preferences]
output: [plan, outline, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [adult-education, community-learning, evening-class, mixed-ability, andragogy, final-project]
pairs_with:
  prompts: [write-course-syllabus, write-learning-objectives, design-workshop]
  personas: [instructional-designer]
args:
  - name: subject
    description: What the course teaches, e.g. "beginner watercolour", "conversational Italian", "household electrics awareness", "creative writing", "spreadsheets for small businesses".
    type: string
    required: true
  - name: sessions
    description: Number of weekly sessions.
    type: number
    default: 8
  - name: session_minutes
    description: Length of each session in minutes, including any break.
    type: number
    default: 120
  - name: learners
    description: Optional. Who usually signs up and why, e.g. "mostly retirees and a few shift workers; mixed experience; some want a certificate, most want a hobby". Include venue limits or costs if relevant.
    type: text
output_contract:
  format: markdown
  sections: [Course overview, Learners and assumptions, Outcomes, Session-by-session plan, Session template, Mixed abilities, Final project, Materials and costs, First session, Feedback and evaluation]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Adults choose evening classes after work, often tired, paying their own fees, and with very different starting points and reasons. They stay when every session is worth the journey: something made, practised or solved, built on what they already know, with time to ask questions and a sense of progress. They drop out when sessions are lectures, when one missed week means they are lost, or when the pace suits nobody. The tutor is usually an expert in the subject, not necessarily in teaching adults, and needs a plan that works in a community room with a mixed group.

Subject: {{subject}}. Sessions: {{sessions}} of {{session_minutes}} minutes.
</context>

<task>
{{#learners}}
<learners>
{{learners}}
</learners>
{{/learners}}

1. **Course overview:** a title that says what learners will be able to do, a two- or three-sentence description for the prospectus, who it is for, and what prior knowledge or equipment is needed.
2. **Learners and assumptions:** the likely mix of starting points, motivations and constraints (time, cost, confidence, access needs), and the assumptions this plan makes. If learners are not described, state reasonable assumptions for this subject.
3. **Outcomes:** four to six outcomes stated as things learners can do by the end.
4. **Session-by-session plan:** for each of the {{sessions}} sessions: focus, what learners make, practise or solve, key teaching points, and a small between-session practice task that fits a busy week (optional, never required to keep up).
5. **Session template:** a repeatable structure for {{session_minutes}} minutes: arrival and a quick warm-up or recap, a short demonstration or input, extended hands-on practice with the tutor circulating, a break, more practice or application, sharing or show-and-tell, and a close with next week's preview. Most of the time is practice.
6. **Mixed abilities:** how each session offers a core task, an easier route and a stretch, how experienced learners can contribute without dominating, and how to catch up anyone who missed a session (a one-page recap per session, a quick catch-up task at the start).
7. **Final project:** a project or showcase that pulls the course together, scoped to fit the last two or three sessions, with options for different levels and a celebration in the final session. If some learners want accreditation, note what evidence to keep.
8. **Materials and costs:** a materials list with a starter-kit option, low-cost alternatives, and anything the venue must provide.
9. **First session:** a detailed plan for session one: welcomes and introductions that are not awkward, finding out what learners want, a quick early win in the subject, setting expectations and safety if relevant.
10. **Feedback and evaluation:** a mid-course check-in, an end-of-course feedback form of five or six questions, and how to record learners' progress against outcomes.
</task>

<constraints>
- Respect adult learners: draw on their experience, explain why things are done, and let them choose where possible. No childish activities or marking schemes.
- Practice dominates every session; talk-only input stays short.
- No session depends on having attended every previous one.
- Plan for real access needs: seating, lighting, print size, hearing, and breaks for a session of {{session_minutes}} minutes.
- Where the subject carries physical risk (tools, electrics, cooking, movement), include the relevant safety briefing and note that the provider's policies and any legal requirements apply.
- Do not invent prices or supplier names; give typical items and let the tutor price them.
- If the subject is too vague to plan (for example "art"), ask for the specific focus and level, offering options.
- Before finishing, check that the sessions add up to the outcomes, that the timings fit {{session_minutes}} minutes, and that the final project is achievable in the time given.
</constraints>

<output_format>
## Course overview
## Learners and assumptions
## Outcomes
Numbered.
## Session-by-session plan
Table: Session | Focus | Learners make or practise | Key teaching points | Optional practice.
## Session template
Table: Minutes | Segment | What happens.
## Mixed abilities
Bullets, and the catch-up approach.
## Final project
Brief with level options.
## Materials and costs
List.
## First session
Timed plan.
## Feedback and evaluation
Bullets and the feedback questions.
</output_format>
