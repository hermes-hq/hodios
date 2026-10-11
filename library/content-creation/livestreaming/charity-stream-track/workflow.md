---
schema: 1
id: charity-stream-track
kind: workflow
title: Charity stream track
description: Takes a charity livestream from idea to money delivered - confirming the charity, planning the show and incentives, setting up donations and safety, running it live, then reporting and thanking.
category: livestreaming
version: 1.0.0
status: incubating
stage: [plan, build, operate, ship]
role: [content-creator, gamer]
requires: [none]
inputs: [notes, preferences, text]
output: [plan, checklist, message, report]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [charity-stream, donation-drive, donation-incentives, marathon-stream, donor-thanks]
pairs_with:
  prompts: [plan-livestream-run-of-show, plan-subathon-stream, write-fundraiser-progress-posts]
  personas: [stream-producer]
args:
  - name: idea
    description: The cause or charity you have in mind, why it matters to you and your community, the date or window, and how long you want to stream.
    type: text
    required: true
  - name: channel
    description: Your platform, typical viewers, past streams that went well, who can help (mods, co-hosts, friends) and your country.
    type: text
    required: true
  - name: goal
    description: Optional. A fundraising target if you have one in mind.
    type: string
steps:
  - {id: cause, file: steps/01-confirm-the-cause.md, stage: plan, gate: approve, artifact: "charity-stream/01-cause.md"}
  - {id: show, file: steps/02-plan-the-show.md, stage: plan, gate: approve, artifact: "charity-stream/02-show-plan.md"}
  - {id: setup, file: steps/03-set-up-donations-and-safety.md, stage: build, gate: approve, artifact: "charity-stream/03-setup.md"}
  - {id: live, file: steps/04-run-it-live.md, stage: operate, gate: approve, artifact: "charity-stream/04-live-sheet.md"}
  - {id: close, file: steps/05-report-and-thank.md, stage: ship, gate: none, artifact: "charity-stream/05-report.md"}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
Runs a charity stream the way an experienced organiser would. The money has to reach the charity in a way donors can check, the charity has to know about the stream before it is announced, and the show has to be watchable for hours without wrecking the streamer. Each step writes one artifact and waits for approval.

<idea>
{{idea}}
</idea>

<channel>
{{channel}}
</channel>

{{#goal}}Fundraising target in mind: {{goal}}{{/goal}}

Rules for every step:
- Donations go straight to the charity through a platform built for charity fundraising, or through the charity's own fundraising page, never through the streamer's personal tips or payment account. Say this once, early.
- Never invent the charity's registration details, platform fees, payout times or legal rules. Fundraising and prize-draw rules differ by country; mark them as checks with the charity or local guidance.
- Totals are reported honestly: what was raised, what reached the charity, and any fees, with the source.
- Incentives must be things the streamer is happy and safe to do. No dangerous challenges, sleep deprivation stunts, or incentives that pressure people to give more than they can afford.
- Use only facts given; mark gaps as [X] and end each artifact with open questions.
