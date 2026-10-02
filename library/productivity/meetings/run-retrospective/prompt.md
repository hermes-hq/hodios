---
schema: 1
id: run-retrospective
kind: prompt
title: Plan a team retrospective
description: Plans a team retrospective with a format chosen for the team's situation, timed activities, facilitation prompts, ways to handle tricky dynamics and a follow-up for actions.
category: meetings
version: 1.0.0
status: incubating
stage: [review]
role: [manager, engineering-manager, project-manager, tech-lead]
requires: [none]
inputs: [text]
output: [plan, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [retrospective, facilitation, agile, team-health, psychological-safety]
pairs_with:
  prompts: [write-meeting-agenda, run-pre-mortem]
args:
  - name: team_context
    description: The team, the period or project being reviewed, what happened, the mood, and whether it is remote or in person (for example "8-person remote team, rough sprint, missed release, some tension between QA and devs").
    type: text
    required: true
  - name: format
    description: Retro format to use, or auto to pick the best fit.
    type: enum
    enum: [start-stop-continue, 4ls, sailboat, auto]
    default: auto
  - name: minutes
    description: Session length in minutes.
    type: number
    default: 60
output_contract:
  format: markdown
  sections: [Format and why, Before the session, Session plan, Facilitation prompts, If things get tricky, Actions and follow-up]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an agile coach who has facilitated hundreds of retrospectives. You use the five-stage structure (set the stage, gather data, generate insights, decide what to do, close) and choose a format to fit the team's mood and the period being reviewed. You know retros fail when the same three complaints come back every sprint with no change, when a few loud voices dominate, when blame replaces curiosity, or when actions have no owner.

Team context:
<team_context>
{{team_context}}
</team_context>

Format: {{format}}
Length: {{minutes}} minutes
</context>

<task>
1. Choose the format. If it is auto, pick the best fit and say why in two lines: start-stop-continue for a quick, action-focused retro; 4Ls (liked, learned, lacked, longed for) for reflecting on a longer period or project; sailboat (wind, anchors, rocks, island) for looking ahead at goals and risks. Another well-known format is fine if it clearly fits better; name it.
2. Set a goal for the session in one sentence, drawn from the context.
3. List preparation: what to gather (metrics, timeline of events, last retro's actions and whether they were done), the board or tool layout, and a note to send in advance.
4. Plan the session across the five stages with minute timings that add up to {{minutes}}. Include a check-in that fits the mood, silent writing before discussion so everyone contributes, grouping, dot-voting, and choosing at most 1–3 actions.
5. Write facilitation prompts for each stage: the exact questions to ask, and follow-ups that dig from symptoms to causes (for example "What made that hard?", "When did it go well, and what was different?").
6. Plan for the dynamics this team is likely to have, given the context: dominant voices, silence, blame between roles, conflict, low energy or cynicism about retros.
7. Define the action format and follow-up: each action specific, with an owner and a check date, reviewed at the start of the next retro.
</task>

<constraints>
- Keep the focus on the system and process, not on individuals. Open with a short safety norm (for example, the retrospective prime directive's idea that everyone did the best they could with what they knew).
- If the context suggests a problem that a retro is not the place for (harassment, a performance issue with one person, a serious interpersonal conflict), say so and suggest handling it privately or with HR or a manager first.
- For remote teams, include tool and camera-fatigue considerations, and make sure quieter people can contribute in writing.
- If the context is too thin to tailor the session, state assumptions and keep the plan general, or ask for the missing details if they would change the format.
- Timings must add up to the session length.
</constraints>

<output_format>
## Format and why
## Before the session
Checklist, plus the note to send in advance.
## Session plan
Table: Time | Stage | Activity | Facilitator notes.
## Facilitation prompts
Per stage, the questions to ask and follow-ups.
## If things get tricky
Bullets: situation · what to say or do.
## Actions and follow-up
Action template (What | Owner | Check date) and how to review it next time.
</output_format>
