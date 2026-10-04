---
schema: 1
id: plan-parent-workshop
kind: prompt
title: Plan a parent workshop
description: Plans a school workshop for parents and carers, such as how phonics or maths is taught or exam-season support, with a run of show, hands-on activities, handouts and follow-up.
category: teaching
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher]
requires: [none]
inputs: [text, preferences]
output: [plan, message, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
tags: [parent-engagement, family-workshop, home-learning, interpreters, run-of-show]
pairs_with:
  prompts: [write-parent-email, write-classroom-newsletter, prepare-parent-teacher-conference]
args:
  - name: topic
    description: What the workshop is about, e.g. "how we teach phonics in Reception", "the methods we use for written multiplication", "supporting your teenager through exams", "staying safe online".
    type: string
    required: true
  - name: audience
    description: Optional. Who is likely to come and what they need, e.g. "parents of 5-year-olds; many speak Urdu or Polish; lots work shifts; some unsure about their own maths".
    type: text
  - name: minutes
    description: Length of the session.
    type: number
    default: 45
output_contract:
  format: markdown
  sections: [Purpose, Getting people there, Run of show, Hands-on activities, Handout, After the workshop]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Parent workshops help when families leave able to do one or two specific things at home, and feel welcome rather than judged. They fail when they are a slide talk full of jargon, scheduled when working parents cannot come, or reach only the families already most involved. The best ones let parents try what their children do, show a short real example, and send people home with a handout in a language they read.

Topic: {{topic}}. Length: {{minutes}} minutes.
</context>

<task>
{{#audience}}
<audience>
{{audience}}
</audience>
Plan around these families' languages, schedules and needs.
{{/audience}}

1. **Purpose:** the two or three things parents should be able to do at home afterwards, written as "After this session, you can...".
2. **Getting people there:** timing options (for example a morning drop-off slot and an evening or online repeat), childcare or a children's activity, an invitation in plain words (and the languages needed) that says what parents will get, and how to reach families who do not usually come (personal invitations by staff who know them, the child inviting them).
3. **Run of show:** a timed plan for {{minutes}} minutes: welcome and why it matters, a short explanation without jargon, a demonstration (a short video or live example with a child's work, with permission), hands-on activities, questions, and a close with one thing to try this week. Keep talking to no more than about a third of the time.
4. **Hands-on activities:** two or three activities where parents try what children do (for example blending sounds with the actions, solving a calculation with the method the school uses), with materials, instructions, and what the facilitator says. Include an activity parents can repeat at home with everyday objects.
5. **Handout:** the one-page take-home sheet, written in plain words: what we teach and why, three things to try at home, phrases to use with the child, what to do if the child is stuck or upset, and who to contact. Say which languages it needs, and that translations should be done or checked by a fluent speaker; arrange interpreters for the session itself where needed.
6. **After the workshop:** how to share the content with families who could not come (a recorded version, the handout home in bags, a short message), a quick feedback question, and a check-in idea a few weeks later.
</task>

<constraints>
- Plain language throughout: explain or drop every acronym and teaching term.
- Never assume parents have time, money, devices, or confidence in the subject; at-home ideas use everyday things and fit into ten minutes.
- Be welcoming to every family form, language and level of schooling, and avoid any suggestion that parents are doing it wrong.
- Content must match how the school actually teaches the topic. Where you do not know the school's specific scheme or method, use a placeholder such as [our phonics programme] and keep explanations general and accurate.
- Children's work or photos shown need permission under school policy.
- If the topic is unclear, ask before planning.
- Before finishing, check the run of show adds up to {{minutes}} minutes and that the handout fits on one page.
</constraints>

<output_format>
## Purpose
Two or three "After this session, you can..." lines.
## Getting people there
Bullets, then the invitation text.
## Run of show
Table: Time | Section | What happens | Who leads | Materials.
## Hands-on activities
Numbered activities with materials and facilitator notes.
## Handout
The one-page handout, ready to adapt.
## After the workshop
Bullets.
</output_format>
