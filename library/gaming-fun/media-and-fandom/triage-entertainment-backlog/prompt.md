---
schema: 1
id: triage-entertainment-backlog
kind: prompt
title: Triage your entertainment backlog
description: Sorts a backlog of unwatched films, unread books and unplayed games by mood, time needed and likely enjoyment, then picks what to start next and suggests what to drop.
category: media-and-fandom
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text, preferences]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [backlog, watchlist, to-be-read, pile-of-shame]
pairs_with:
  prompts: [recommend-films-from-favorites, recommend-next-book, recommend-games]
args:
  - name: backlog
    description: The list, one item per line if you can, with any notes such as "half-read", "friend insisted", "bought in a sale", "loved the first one".
    type: text
    required: true
  - name: time_per_week_hours
    description: Hours a week you realistically have for films, books and games combined.
    type: number
    default: 5
  - name: mood_now
    description: How you feel at the moment, for example "tired, want something cosy" or "ready for something big". Use "any" for no preference.
    type: string
    default: any
output_contract:
  format: markdown
  sections: [Start tonight, The sorted backlog, Drop list, Next four weeks, The maths]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people stop feeling guilty about their pile of unwatched films, unread books and unplayed games. A backlog grows because things get added for the wrong reasons (a sale, someone else's enthusiasm, a sense of obligation to a classic) and are then judged against an imaginary future with endless free time. The cure is honest numbers (how long each item really takes against the hours someone actually has), matching items to moods, and permission to let things go.

Backlog: {{backlog}}
Time per week: {{time_per_week_hours}} hours
Mood now: {{mood_now}}
</context>

<task>
1. If the backlog does not list actual titles (for example "my Steam library" or "everything on my list"), ask them to paste the titles and stop.
2. Estimate the time each item needs: a film's running time, a series by its episodes, a book by length at an average adult pace, a game by its typical main-story length. Mark every estimate as approximate and suggest a completion-time site for games if they want precision.
3. Judge likely enjoyment as high, medium or low from the signals they gave: why it was added, whether they started and stopped, whether they loved related works, and how it fits their apparent tastes. Say which signal drove each judgement.
4. Tag the mood each item suits (cosy, gripping, demanding, light, social).
5. Give every item a verdict: now (fits the mood and the week), next, someday, or drop. Suggest dropping items with low likely enjoyment and a large time cost, items added out of obligation, and items they abandoned for reasons that still hold. Say that dropping is not failing.
6. Pick one thing to start tonight that fits {{mood_now}} and an evening's time.
7. Plan the next four weeks within {{time_per_week_hours}} hours a week, mixing media and moods and finishing items rather than starting many.
8. Do the maths: total hours of the remaining backlog after drops, and how many weeks that is at their pace.
9. Before answering, check that each week's plan fits the hours and that every item from the list appears in the table exactly once.
</task>

<constraints>
- If the list is very long (more than about 40 items), group similar items in the table and focus verdicts on the ones that matter, but still account for all of them in the maths.
- Do not shame the person for the size of the list or for what they enjoy.
- Do not recommend new titles to add; this is about the existing list.
- If a title is ambiguous, say which one you assumed.
</constraints>

<output_format>
## Start tonight
The pick and two sentences on why.
## The sorted backlog
Table: Item | Type | Time needed | Mood | Likely enjoyment (and why) | Verdict.
## Drop list
Items to let go, with one line each.
## Next four weeks
Table: Week | Items | Hours.
## The maths
Total hours left and weeks to clear at {{time_per_week_hours}} hours a week.
</output_format>
