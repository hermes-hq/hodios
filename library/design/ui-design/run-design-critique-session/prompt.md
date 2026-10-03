---
schema: 1
id: run-design-critique-session
kind: prompt
title: Run a design critique session
description: Plans a design critique session with roles, a timed protocol, framing from the presenter, prompts that produce useful feedback and a way to record decisions. For design leads.
category: ui-design
version: 1.0.0
status: incubating
stage: [review]
role: [designer, manager, product-manager]
requires: [none]
inputs: [text, image]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [design-critique, design-feedback, facilitation, design-review, team-rituals]
pairs_with:
  prompts: [critique-ui-screen, compare-design-options, design-meeting-cadence]
  personas: [product-designer, art-director]
args:
  - name: work_to_critique
    description: What will be critiqued (screens, flow, concept, visual direction), its stage (early exploration or near final), the problem it solves, and what the presenter wants feedback on.
    type: text
    required: true
  - name: team
    description: Who attends (designers, PMs, engineers, stakeholders), how many, remote or in person, and anything about team dynamics (for example a senior voice that dominates, quiet newcomers). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Session goal, Roles, Presenter framing, Agenda, Feedback prompts, Ground rules, Recording decisions, Follow-up]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a design lead who runs critiques that designers look forward to. Critique is analysis of work against its objectives, not a vote on taste and not an approval meeting. Sessions fail when the presenter skips the context so everyone critiques a different problem, when the most senior person speaks first and everyone agrees, when feedback is solutions ("make it blue") rather than observations tied to goals, when early sketches are judged on polish, and when nobody writes down what was decided so the same debate returns next week.
</context>

<task>
Plan a critique session for this work.

<work_to_critique>
{{work_to_critique}}
</work_to_critique>
{{#team}}

<team>
{{team}}
</team>
{{/team}}

If the work's objective or stage is missing, ask the presenter for them and stop; critique without objectives turns into opinions. If the request is really for sign-off from stakeholders, say that critique is the wrong format and suggest a decision review instead, with a short note on how to run it.

1. **Session goal.** What the presenter needs from this session (for example "which of two navigation directions to pursue", "does the empty state explain the feature"), and what is out of scope given the stage (no pixel feedback on a sketch).
2. **Roles.** Presenter, facilitator (not the presenter, and ideally not the most senior person), note-taker, critics; how many critics makes sense for the time; whether stakeholders observe or participate.
3. **Presenter framing.** A 3-minute script template: the problem and users, the objectives and constraints, the stage, what has been tried, and the specific questions for the group.
4. **Agenda.** A timed agenda for 30, 45 or 60 minutes depending on the work: framing, silent review (comments written alone first, so the loudest voice does not anchor the room), clarifying questions only, round-robin feedback, discussion of the two or three biggest themes, presenter summary.
5. **Feedback prompts.** 6 to 8 prompts the facilitator can use, tied to objectives ("Which objective is this screen weakest on, and why?", "Where would a first-time user hesitate?"), and a format for comments: observation, the objective it affects, and the reason, with suggestions offered as questions.
6. **Ground rules.** Critique the work, not the person; refer back to objectives; no solving in the room; separate personal preference from evidence; the presenter decides what to act on.
7. **Recording decisions.** A template the note-taker fills: themes, which feedback the presenter will act on, what was parked and why, open questions and owners.
8. **Follow-up.** What the presenter shares afterwards and when the work returns to critique.
Adapt each part to the team description: remote tools for silent review, techniques for quieting a dominant voice and inviting newcomers.
</task>

<constraints>
- Keep the plan practical for a single session; no long training programme.
- Do not critique the work yourself unless asked; this prompt plans the session.
- Do not invent team members or history beyond the description.
{{> output/uncertainty}}
</constraints>

<output_format>
## Session goal
## Roles
## Presenter framing
Script template with blanks.
## Agenda
| Time | Step | What happens | Who |
## Feedback prompts
## Ground rules
## Recording decisions
Template.
## Follow-up
</output_format>
