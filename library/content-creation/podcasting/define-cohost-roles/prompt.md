---
schema: 1
id: define-cohost-roles
kind: prompt
title: Define co-host roles
description: Helps two or three co-hosts agree who does what on air and off, with steering, interruption signals, segment ownership, prep duties and a way to settle disagreements, as a short co-host agreement.
category: podcasting
version: 1.0.0
status: incubating
stage: [plan]
role: [content-creator]
inputs: [notes]
output: [docs, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [co-hosting, on-air-chemistry, show-agreement, workload-split, team-roles]
pairs_with:
  prompts: [plan-podcast-episode, critique-episode-from-transcript, plan-podcast-season]
  personas: [podcast-producer]
args:
  - name: hosts
    description: Each co-host's name or initial, what they are good at and enjoy, how much time they have per week, and how they tend to behave on mic (talks a lot, goes quiet, jokes, goes deep).
    type: text
    required: true
  - name: show_format
    description: The show - topic, length, cadence, segments, live or edited, audio or video, and any money or ownership involved.
    type: text
    required: true
  - name: pain_points
    description: What is not working now - talking over each other, one person doing all the editing, arguments about direction, uneven airtime. Leave empty for a new show.
    type: text
output_contract:
  format: markdown
  sections: [On-air roles, Signals, Segment owners, Off-air duties, Decisions and disagreements, Co-host agreement, Review date]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help co-hosts set up how they work together. Co-hosted shows rarely fail on talent; they fail on friction nobody named: two people chasing the same joke, nobody steering back to the point, one person quietly doing all the editing and resenting it, and creative disagreements settled by whoever is most stubborn. Listeners hear the result as crosstalk, rambling and uneven airtime.

Roles that work on air are complementary, not fixed personalities:
- The guide keeps the episode's thread, sets up segments and lands the ending.
- The questioner or "listener's proxy" asks what a newcomer would ask and pushes for examples.
- The colour or expert voice adds stories, depth or humour.
Roles can rotate by segment or episode. Off air, the work (booking, research, recording, editing, show notes, social, money) needs named owners and a fair split relative to each person's time.

<show_format>
{{show_format}}
</show_format>
</context>

<task>
<hosts>
{{hosts}}
</hosts>

{{#pain_points}}
<pain_points>
{{pain_points}}
</pain_points>
{{/pain_points}}

1. Propose on-air roles based on each host's strengths and habits, and say when roles rotate. Address each named pain point with a specific practice.
2. Agree signals: a hand sign or chat cue to say "let me in", "wrap this up", "go deeper" and "we are off track", plus one rule for crosstalk (for example: finish the sentence, then hand over by name). Include a cue for remote recording where hands are not visible.
3. Assign segment owners: who opens, who leads each recurring segment, who closes, who reads sponsors.
4. Split off-air duties in a table with an owner, a backup and weekly hours, and compare total hours per person with the time they said they have. Flag any split where one person carries much more without agreeing to it.
5. Set the decision rules: which decisions each person can make alone, which need everyone (format changes, sponsors, guests, money, ending the show), how to raise a disagreement (off mic, within a week) and a tie-breaker that is not "whoever cares most".
6. Write a short co-host agreement in plain words, one page, that they can edit and both sign or simply save.
7. Set a review date (for example after six episodes) and three questions to ask then.
</task>

<constraints>
- Base roles on what the hosts said about themselves; do not invent personalities. If you lack each host's time or strengths, ask and mark gaps [X].
- Stay neutral between hosts; no blame.
- If money, ownership of the show name or feed, or revenue splits come up, note them as items to agree in writing and suggest professional advice for a formal partnership or contract; do not draft legal terms.
- Keep the agreement under 300 words.
</constraints>

<output_format>
## On-air roles
Table: Host | Main role | Rotates when | Watch out for.

## Signals
Bullets.

## Segment owners
Table: Segment | Owner | Backup.

## Off-air duties
Table: Task | Owner | Backup | Hours per week, then totals per host against their time.

## Decisions and disagreements
Bullets.

## Co-host agreement
The draft agreement.

## Review date
The date or episode count and three review questions.
</output_format>
