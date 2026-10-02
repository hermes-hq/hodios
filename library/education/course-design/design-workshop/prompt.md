---
schema: 1
id: design-workshop
kind: prompt
title: Design a hands-on workshop
description: Designs a half-day or full-day workshop with outcomes, a timed agenda, practice activities, materials and a facilitator guide. For trainers and team leads running hands-on sessions.
category: course-design
version: 1.0.0
status: incubating
stage: [design, build]
role: [teacher, manager, consultant]
requires: [none]
inputs: [topic, preferences, notes]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [workshop-design, facilitation, corporate-training, active-learning, agenda]
pairs_with:
  prompts: [design-classroom-activity, write-learning-objectives, design-elearning-module]
  workflows: [course-design-track]
args:
  - name: topic
    description: What the workshop teaches or produces, e.g. "giving effective code review feedback", "writing OKRs", "intro to Excel pivot tables".
    type: string
    required: true
  - name: audience
    description: Who attends, how many, what they already know, why they are there and anything about the setting (e.g. "20 new team leads, mandatory, mixed experience, skeptical of training").
    type: text
    required: true
  - name: duration
    description: Total time including breaks, e.g. "3.5 hours", "full day 9:00-17:00".
    type: string
    required: true
  - name: format
    description: in-person for one room; remote for a video-call workshop with breakout rooms.
    type: enum
    enum: [in-person, remote]
    default: in-person
output_contract:
  format: markdown
  sections: [Outcomes, Agenda, Activities, Materials, Facilitator guide, Before and after]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Workshops fail as slide marathons with an exercise bolted on at the end. Adults learn a skill by doing it with feedback, so a good workshop spends most of its time on practice that mirrors the real task, keeps input short, and closes with participants committing to how they will use it. Attention drops after 10 to 20 minutes of listening and faster on video calls, which need shorter blocks and more frequent breaks.
</context>

<task>
Design a {{format}} workshop on {{topic}} lasting {{duration}}.

<audience>
{{audience}}
</audience>

1. **Outcomes:** 2 to 4 things participants will be able to do by the end, each with an observable verb, realistic for {{duration}}. Fewer outcomes done well beats coverage.
2. **Agenda:** a timed agenda that adds up exactly to {{duration}}. Structure each block around connecting to what people already know, short concept input (10 to 15 minutes at most at a time), concrete practice, and a debrief or conclusion. At least half of the time is participants doing, not listening. Include breaks: in person, at least every 90 minutes; remote, a short break about every hour and no single block over 60 minutes.
3. **Activities:** for each practice activity: purpose (which outcome), setup, instructions as the facilitator will say them, grouping, timing, what good output looks like, and debrief questions. Use realistic cases from the audience's world. Vary the formats (pairs, small groups, solo, whole room).
4. **Materials:** everything to prepare: slides kept to a minimum, handouts, case materials, templates, and equipment. For remote: the collaborative tools needed by type (shared whiteboard, documents, polls), breakout room setup and links.
5. **Facilitator guide:** per block, key messages, timings with checkpoints, likely questions and pushback with responses (especially for a skeptical or mandatory audience), what to watch for in groups, and what to cut if running late (mark the cuttable segments in the agenda).
6. **Before and after:** optional pre-work (15 minutes or less), the opening that sets expectations, a closing where each participant writes a specific commitment, and follow-up (a reminder or resource within a week). Add a short evaluation: a reaction question and a check of whether they can now do the outcome.
7. **Accessibility:** materials readable and shareable in advance, captions for remote sessions, activities that do not depend on one sense or on standing, cameras optional, and quiet participants given a way to contribute in writing.
</task>

<constraints>
- The agenda's times must add up to the duration given. If the topic cannot be taught to the outcomes in the time, say what to cut or split into two sessions.
- Do not rely on any named commercial tool; describe the function and let the organiser pick.
- Fit the audience's level and context; if the audience description is vague (no size or prior knowledge), state the assumption.
- Keep the guide usable by someone other than the designer.
</constraints>

<output_format>
Use the section headings from the output contract. Agenda as a table: Time | Block | Activity | Format | Outcome | Cuttable?. Activities as subsections. Materials as a checklist.
</output_format>
