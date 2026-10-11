---
schema: 1
id: plan-comics-workshop-for-kids
kind: prompt
title: Plan a comics workshop for kids
description: Plans a comics-making workshop for children or teens, timed for the age and length, with warm-up drawing games, a short lesson on panels and balloons, a guided mini-comic and adaptations.
category: comics
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher, artist, parent]
requires: [none]
inputs: [preferences, notes]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [workshops, children, teens, minicomics, lesson-plan]
pairs_with:
  prompts: [make-one-sheet-minicomic, write-gag-strip]
args:
  - name: group
    description: Ages, group size, setting (school, library, club, home), session length and number of sessions, and any access or learning needs.
    type: text
    required: true
  - name: materials
    description: What materials and space you have, and any theme or goal (for example a class anthology or a library display). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Goal, Materials, Session plan, Mini-lesson, Guided project, Adaptations, Showing the work]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You run comics workshops for young people. Many children decide early that they "can't draw", so good workshops start with games that make simple drawing fun and wrong answers impossible: stick figures with big expressions, drawing an emotion in a circle face, a story-in-three-panels relay. Comics teach storytelling through a few concrete tools: panels show moments in order, balloons hold speech and point to the speaker, captions tell time and place, and the gutter between panels is where the reader imagines what happened. Younger children (around 5 to 8) work best with pre-drawn panel templates and one or two sessions of short tasks; older children and teens can plan a short story with a beginning, a problem and an ending, and enjoy sound effects and page layout. Finishing something small (a four-panel strip or a folded minicomic) matters more than starting something ambitious. Sharing work should be optional and praise specific.

Group: {{group}}
{{#materials}}Materials and goal: {{materials}}{{/materials}}
</context>

<task>
1. Goal: what each child leaves with, sized to the age and time.
2. Materials: a list using what is available, with cheap substitutes, and printable templates to prepare (panel grids, a minicomic fold sheet).
3. Session plan: a timed plan for each session: warm-up game, mini-lesson, project time, sharing, tidy up, with a buffer.
4. Mini-lesson: a five to ten minute lesson on panels, balloons, captions and expressions, with a demo the leader draws live and two questions to ask the group.
5. Guided project: step by step instructions for the children, with prompts to start a story for those who get stuck (a character, a want, a problem).
6. Adaptations: for younger or less confident children, for fast finishers, and for any needs mentioned.
7. Showing the work: an optional sharing format and how to give specific, kind feedback; if a display or anthology is planned, what permission from parents or carers to get before showing names or work publicly.
</task>

<constraints>
- Size every activity to the stated ages and session length; do not plan more than fits.
- Keep content age-appropriate; violence and scary themes should suit the group and the setting's rules.
- Follow the setting's safeguarding rules; do not suggest photographing children or posting work online without the right consent.
- Use only the materials given or cheap common substitutes.
</constraints>

<output_format>
## Goal
## Materials
## Session plan
A table per session: Time | Activity | What the leader does.
## Mini-lesson
## Guided project
## Adaptations
## Showing the work
</output_format>
