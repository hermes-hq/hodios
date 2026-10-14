---
schema: 1
id: write-standup-update
kind: prompt
title: Write a standup or async daily update
description: Turns your commits, tickets and notes into a short standup or async daily update with done, next and blockers, including the specific asks people usually forget to make.
category: writing
version: 1.0.0
status: incubating
stage: [build]
role: [software-engineer, tech-lead]
requires: [none]
inputs: [notes, ticket]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: off
level: beginner
depth: specific
tags: [standup, daily-update, async-update, blockers, status-update]
pairs_with:
  prompts: [summarize-my-git-activity, fix-daily-standup, write-shipped-this-week-update]
args:
  - name: activity
    description: What you did since the last update - commits, PR titles, ticket ids and states, meeting notes, rough notes.
    type: text
    required: true
  - name: plan
    description: What you intend to do next, if you know.
    type: text
  - name: format
    description: Where it goes - spoken standup, Slack thread, written async update - and any team template.
    type: text
output_contract:
  format: markdown
  sections: [Update, Notes for you]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A useful standup update is read by people deciding whether they need to act, not by someone checking that you worked. Lists of activity ("worked on PR 412, looked at logs") tell the team nothing; outcomes and state do ("checkout retry fix merged, deploying tomorrow"). The most valuable line is usually the one people leave out: a blocker phrased as a specific ask to a named role with a time ("need a review from payments by Thursday or the release slips"). Vague blockers like "waiting on infra" are not acted on. Long updates get skimmed, so the useful ones fit in about five lines.
</context>

<task>
Write my standup update.

<activity>
{{activity}}
</activity>
{{#plan}}
<plan>
{{plan}}
</plan>
{{/plan}}
{{#format}}
<format>
{{format}}
</format>
{{/format}}

1. Group the activity by piece of work, not by commit, and state each one's outcome and current state (merged, in review, blocked, deployed, abandoned).
2. Drop noise: routine meetings, trivial commits and anything nobody else needs to know.
3. Write "Next" as one to three concrete items for the coming day{{#plan}}, from the plan{{/plan}}.
4. Find anything in the input that is waiting on someone else, slipping, or uncertain, and turn each into a blocker or risk with a specific ask: what is needed, from whom (role or team), by when, and what happens if it does not come.
5. Fit the result to the format{{#format}} given{{/format}}; for a spoken standup, keep it under about 45 seconds of speech.
</task>

<constraints>
- Do not invent progress, dates, ticket ids or blockers the input does not support. If something's state is unclear, mark it with "(check)".
- Plain words; ticket ids are fine, internal jargon only if the team uses it.
- No padding such as "continued working on" when there is nothing new; say "no change" instead.
- If there are no blockers, say "No blockers" rather than inventing one.
</constraints>

<output_format>
## Update
Done, Next, Blockers / asks, in at most about eight lines.

## Notes for you
Anything you should confirm before posting, such as unclear states or an ask that needs a name, or "None".
</output_format>
