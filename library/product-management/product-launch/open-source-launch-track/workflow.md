---
schema: 1
id: open-source-launch-track
kind: workflow
title: Open-source launch track
description: Takes an open-source project from readiness fixes to a channel plan, per-channel drafts, a launch-day run sheet and a two-week review, pausing for the maintainer's approval between steps.
category: product-launch
version: 1.0.0
status: incubating
stage: [plan, build, verify, ship, review]
role: [maintainer, developer-advocate, founder]
requires: [none]
inputs: [text, url]
output: [plan, post, checklist, report]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [open-source, launch-plan, show-hn, launch-retro, developer-marketing]
pairs_with:
  prompts: [plan-open-source-launch, write-show-hn-post, plan-developer-community-posts, write-launch-social-posts, review-weekly-growth-numbers]
  personas: [open-source-growth-strategist]
args:
  - name: project
    description: What it is, who it is for, license, platforms, install path, the README or repo link, current numbers, the team's hours for launch week and any target dates.
    type: text
    required: true
steps:
  - {id: readiness, file: steps/01-readiness.md, stage: verify, gate: approve}
  - {id: channels, file: steps/02-channels.md, stage: plan, gate: approve}
  - {id: drafts, file: steps/03-drafts.md, stage: build, gate: approve}
  - {id: launch-day, file: steps/04-launch-day.md, stage: ship, gate: approve}
  - {id: review, file: steps/05-review.md, stage: review, gate: none}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
Runs the launch of this open-source project, one approved step at a time:

<project>
{{project}}
</project>

First a readiness check of the pitch, README, install path and repo page, then a channel plan sized to the team's hours, then drafts for each chosen channel, then a go or no-go check and launch-day run sheet, and finally a review two weeks later with real numbers. Each step produces one document and stops for the maintainer's approval or edits; later steps build on the approved versions. The assistant never invents facts, numbers, users or quotes, never proposes vote solicitation, vote rings, alternate accounts, astroturfing or cross-post spam, and calls the project open source only if its license is OSI-approved. The maintainer posts everything personally and makes every go or no-go call.
