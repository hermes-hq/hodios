---
schema: 1
id: run-weekly-review
kind: prompt
title: Run a weekly review
description: Guides a weekly review - clears inboxes and open loops, checks every project has a next action, reviews the calendar back and ahead, and picks next week's priorities against real capacity.
category: task-management
version: 1.0.0
status: incubating
stage: [review, plan]
role: [individual, manager, founder, project-manager]
inputs: [notes, text]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
tags: [weekly-review, open-loops, next-actions, capacity-planning]
pairs_with:
  personas: [productivity-coach]
  prompts: [plan-my-week, prioritize-todo-list, write-project-plan]
args:
  - name: open_loops
    description: Optional brain dump - tasks, inbox items, notes, promises made, things on your mind.
    type: text
  - name: calendar
    description: Optional - last week's and next week's calendar, pasted or summarised, with fixed commitments.
    type: text
  - name: goals
    description: Optional - current goals or projects for the month or quarter.
    type: text
output_contract:
  format: markdown
  sections: [Processed open loops, Projects, Calendar, Waiting for, Next week's top three, Capacity check, Parked]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A weekly review is the habit that keeps a task system trustworthy: everything captured gets a decision, every project has a next action, the calendar is checked in both directions, and next week is planned against the hours that actually exist. Without it, lists go stale and people fall back to keeping everything in their heads.

{{#open_loops}}
<open_loops>
{{open_loops}}
</open_loops>
{{/open_loops}}
{{#calendar}}
<calendar>
{{calendar}}
</calendar>
{{/calendar}}
{{#goals}}
<goals>
{{goals}}
</goals>
{{/goals}}
</context>

<task>
If none of the material above was provided, run the review interactively: explain the five stages in two lines, then start with stage 1 by giving a short mind-sweep list of triggers (work projects, people waiting on you, money and admin, home, health appointments, things you promised) and ask the user to dump everything. Go one stage at a time and wait for their reply before moving on.

If only a calendar or only goals were provided, ask for the open-loop brain dump first, with the same mind-sweep list, and wait. Then process everything in one pass.

If open loops were provided, process all the material in one pass:
1. Get clear. Turn every open loop into a decision: do it now (under two minutes), schedule it, add a next action to a project, delegate it (and log it as waiting for), park it in someday or maybe, or drop it. Anything with more than one step becomes a project.
2. Get current on projects. List each active project with its desired outcome in a few words and one concrete next action that starts with a verb. Flag projects with no next action or no progress.
3. Calendar back and ahead. From last week, pull follow-ups and loose ends. From the next two weeks, list what needs preparation and when to do it.
4. Waiting for. List what others owe the user, since when, and whether to chase.
5. Choose next week. Pick the top three outcomes that best serve the goals and deadlines, and give each a slot in the week. Then compare the hours needed against free hours left after fixed commitments; if the plan does not fit, propose what to defer or drop. Stop at the top three and their slots; an hour-by-hour schedule is a separate planning step.
</task>

<constraints>
- Never invent tasks, dates, people or estimates. If a time estimate is needed and missing, write "estimate?" and use a stated rough guess in the capacity check.
- Next actions are physical and specific ("Email Sam the draft budget"), not vague ("work on budget").
- Three priorities, not ten. Everything else goes in the project list or is parked.
- Keep the user's wording for items so they recognise them.
- Leave at least 20 percent of free time unplanned for the unexpected.
</constraints>

<output_format>
For the interactive path: one stage at a time, under 150 words per turn.
For the one-pass path:
## Processed open loops
Table: Item | Decision (do now, schedule, project, delegate, someday, drop) | Next action or note.
## Projects
Table: Project | Outcome | Next action | Flag.
## Calendar
Two lists: Follow-ups from last week, Prepare for upcoming.
## Waiting for
Table: What | From whom | Since | Chase?
## Next week's top three
Numbered, each with why it matters and when it is scheduled.
## Capacity check
Free hours, hours needed, and the verdict; if over, what to defer or drop.
## Parked
Someday or maybe items, one line each.
</output_format>
