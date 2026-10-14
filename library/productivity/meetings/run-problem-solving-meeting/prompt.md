---
schema: 1
id: run-problem-solving-meeting
kind: prompt
title: Run a problem-solving meeting
description: Plans a meeting to solve one specific problem - define it, find causes, generate and choose options, agree actions - with timings, a fitting tool for each stage and the facilitator's questions.
category: meetings
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [manager, project-manager, operations-manager, individual]
requires: [none]
inputs: [text]
output: [plan, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [problem-solving, root-cause, facilitation, options, action-planning]
pairs_with:
  prompts: [run-five-whys, make-group-decision, write-meeting-agenda]
  personas: [meeting-facilitator]
args:
  - name: problem
    description: The problem as you would describe it now, with any facts, numbers or history you have.
    type: text
    required: true
  - name: attendees
    description: Who will be there and what each knows or controls; remote or in person.
    type: text
    required: true
  - name: minutes
    description: Meeting length in minutes.
    type: number
    default: 60
output_contract:
  format: markdown
  sections: [Problem statement, Before the meeting, Run sheet, Facilitator questions, Choosing, Actions and follow-up]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design meetings that solve a single problem. Most problem-solving meetings jump straight to solutions: the first plausible idea from the most senior person wins, the group argues about fixes for different problems because nobody agreed what the problem was, and the meeting ends with "let's all think about it". Good facilitators slow the start and speed the end: they write a problem statement everyone agrees with (what is happening, where, since when, how big, and what good looks like), check facts versus assumptions, explore causes before solutions, generate several options separately before discussing them, choose with explicit criteria, and leave with owned actions and a date to check whether the fix worked. They also match the tool to the problem: a quick five whys for a simple chain, a cause map or fishbone for several contributing causes, silent idea writing so seniority does not dominate.

<problem>
{{problem}}
</problem>
Attendees: {{attendees}}
Length: {{minutes}} minutes
</context>

<task>
1. Draft a problem statement from what the user gave: what, where, when, how much, impact, and the target state. Mark unknowns as questions to answer before or in the meeting. If the input is really several problems, split them and recommend tackling one.
2. List what to gather or send before the meeting (data, examples, the draft problem statement) and who should be there to make a decision possible.
3. Build a run sheet that fits the length: agree the problem statement; facts and evidence; causes (with the tool you recommend and why); options (silent generation then sharing); choosing; actions. Give timeboxes and outputs.
4. Write the facilitator's key questions for each stage, including how to stop early solution-jumping and how to separate symptoms from causes.
5. Define how the group chooses: two to four criteria suited to the problem (impact, effort, speed, risk, reversibility), and who makes the final call if the group does not agree.
6. Describe actions and follow-up: owners, dates, a small test before a full roll-out when sensible, and a date to check whether the problem actually improved, with the measure to use.
</task>

<constraints>
- Do not diagnose the cause yourself from thin information; offer hypotheses only as prompts for the group and label them as such.
- Keep it to one problem; push anything else to a parking list.
- If the meeting is too short for all stages, say which stages to do before or after and do not squeeze everything in.
- Do not invent data; ask for it.
</constraints>

<output_format>
## Problem statement
Draft statement plus open questions.

## Before the meeting
Bullets.

## Run sheet
Table: Time | Stage | Method | Output.

## Facilitator questions
Per stage.

## Choosing
Criteria and decision rule.

## Actions and follow-up
Template table: Action | Owner | Due | How we will know it worked.
</output_format>
