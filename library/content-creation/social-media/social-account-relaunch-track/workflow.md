---
schema: 1
id: social-account-relaunch-track
kind: workflow
title: Social account relaunch track
description: Relaunches a neglected social account in gated steps, from reviewing what to keep to a new bio and pillars, a two-week starter set, a sustainable rhythm and a one-month review.
category: social-media
version: 1.0.0
status: incubating
stage: [discover, design, build, plan, review]
role: [founder, marketer, content-creator]
subject: [nonprofit, retail]
requires: [none]
inputs: [text, notes, dataset]
output: [plan, post, checklist, report]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [account-relaunch, content-pillars, posting-rhythm, profile-refresh, starter-posts]
pairs_with:
  prompts: [run-social-media-audit, write-social-bio, plan-sustainable-posting-schedule, write-monthly-social-report]
  personas: [social-media-manager]
args:
  - name: account_details
    description: The account (platform, handle, followers), when it was last active, what it used to post, what got a response, who runs it now and any brand or legal limits. Paste recent post stats if you have them.
    type: text
    required: true
  - name: goals
    description: What the account should do for you now (for example "bookings for weekday classes", "volunteer sign-ups", "show new work to galleries") and who you want to reach.
    type: text
    required: true
  - name: weekly_hours
    description: Realistic hours per week you or your team can spend on this account.
    type: number
    default: 2
steps:
  - {id: review, file: steps/01-review-account.md, stage: discover, gate: approve, artifact: "relaunch/01-account-review.md"}
  - {id: reposition, file: steps/02-reposition.md, stage: design, gate: approve, artifact: "relaunch/02-positioning.md"}
  - {id: starter-set, file: steps/03-starter-set.md, stage: build, gate: approve, artifact: "relaunch/03-starter-posts.md"}
  - {id: rhythm, file: steps/04-rhythm.md, stage: plan, gate: approve, artifact: "relaunch/04-rhythm.md"}
  - {id: month-review, file: steps/05-month-review.md, stage: review, gate: none, artifact: "relaunch/05-month-review.md"}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Brings a quiet social account back to life for a small business, nonprofit or creator. Relaunches fail when people post a burst of content for a week and vanish again, or try to rebuild everything at once. This track decides what to keep, sets a clear position, prepares two weeks of posts before the first one goes out, sets a rhythm that fits the hours available, and checks results after a month. Each step writes one artifact and stops for approval.

<account_details>
{{account_details}}
</account_details>

<goals>
{{goals}}
</goals>

Hours per week available: {{weekly_hours}}

Rules for every step:
- Use only facts the user gave. Ask for missing essentials (platform, who runs it, what the account is for) and mark gaps as [X].
- Never invent follower numbers, results, benchmarks, testimonials or customer quotes.
- Fit everything to the weekly hours; when the plan does not fit, cut scope rather than stretching the person.
- No buying followers, follow-unfollow tactics, engagement pods or fake reviews; say why if asked.
- Check access first: two-step login on, and at least two people able to recover the account.
- End each artifact with open questions.
