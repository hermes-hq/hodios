---
schema: 1
id: plan-open-source-launch
kind: prompt
title: Plan an open-source project launch
description: Plans an open-source launch with a readiness check, channel choice by audience fit, a sequenced calendar, per-channel post briefs, maintainer load planning and how to measure it without telemetry.
category: product-launch
version: 1.1.0
status: incubating
stage: [plan]
role: [maintainer, developer-advocate, founder]
requires: [none]
inputs: [text, url]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [open-source, launch-plan, show-hn, developer-marketing, launch-calendar]
pairs_with:
  prompts: [write-show-hn-post, plan-developer-community-posts, write-launch-social-posts, plan-directory-submissions, audit-readme-conversion]
  personas: [open-source-growth-strategist]
args:
  - name: project
    description: What it is, who it is for, license, platforms, install path and how long to first success, current state (stars, users, prior posts), and what is launching (first public release, 1.0, a major version).
    type: text
    required: true
  - name: capacity
    description: Who is available during launch week and how many hours each, including for answering issues.
    type: string
    required: true
  - name: existing_audience
    description: Channels you already have (newsletter, followers, Discord, past users) with rough sizes.
    type: text
  - name: launch_window
    description: Target dates or constraints.
    type: string
output_contract:
  format: markdown
  sections: [Readiness, Goals and measures, Channels, Calendar, Post briefs, Load plan, After launch]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.1.0, note: "Notes how fast launch spikes fade."}
  - {version: 1.0.0, note: "First version."}
---
<context>
Open-source launches rarely come down to one day. A Show HN, a few subreddits or a newsletter mention bring a spike that usually fades within days; what stays depends on whether visitors can understand the project in seconds and get it running in minutes, and on whether the maintainers answer the first wave of issues fast. Channels differ by audience and rules: Show HN needs something people can try now with no sign-up, an account with real HN history and text the maker wrote by hand; subreddits each set their own self-promotion rules, and many now ban AI-written posts or require a minimum project age; Product Hunt features only a selective share of launches and suits products with a broad maker audience more than libraries; awesome lists and registries compound slowly; newsletters and podcasts pick from what is already visible. Platforms punish vote solicitation, vote rings and cross-post spam. GitHub traffic data (views, clones, referrers, popular paths) is kept for only 14 days, so it must be saved during launch week to learn anything.
</context>

<task>
<project>
{{project}}
</project>
Capacity: {{capacity}}.
{{#existing_audience}}Existing audience: {{existing_audience}}.{{/existing_audience}}
{{#launch_window}}Launch window: {{launch_window}}.{{/launch_window}}

If you cannot tell who the project is for or how people try it, ask and stop.

1. **Readiness.** Score each item ready, partly or missing, and list blockers first: a one-line pitch with a searchable category noun; a README that shows the thing working (GIF or screenshot) and gets people to first success in minutes; prebuilt or package-manager install where relevant; an honest status and license line; issue templates and a place for questions; a tagged release with notes; a site or demo that survives a spike. If blockers exist, the plan starts with fixing them and moves the launch.
2. **Goals and measures.** Two or three goals tied to use (installs or downloads, first issues from new users, returning visitors to docs, first-time contributors), with how to measure each without telemetry: release asset downloads, registry stats, GitHub traffic and referrers saved daily, star history as a lagging signal, cookie-free site analytics if the site has it.
3. **Channels.** For this audience, rank channels (Show HN, specific subreddits and forums, Lobsters if someone has an invite, X, Bluesky, Mastodon, LinkedIn, dev.to or the project blog, Product Hunt, relevant newsletters, awesome lists, registries and directories, the maintainers' own audience). For each: fit, what it requires, effort, and whether to use it now, later or never.
4. **Calendar.** A sequence from two weeks before to two weeks after. Space the big channels so each gets the maker's full attention; put the strongest-fit channel first when the README is ready; leave a day between community posts; schedule directory and awesome-list submissions for after the launch, when there are users to point to.
5. **Post briefs.** For each chosen channel: the angle, the title or hook, the link, and what to prepare. Keep them short; full drafts come from dedicated prompts.
6. **Load plan.** Who answers issues, comments and community posts in which hours, response targets the team can keep, saved replies for the five most likely questions, and a rule for what to defer.
7. **After launch.** Day 3 and day 14 reviews: what to compare (downloads, referrers, new issue authors, contributors), what to fix in the README from the questions people asked, and thank-you notes to the people and communities that helped.
</task>

<constraints>
- No vote solicitation, vote rings, alternate accounts, astroturfed posts, fake reviews or mass cross-posting. Supporters may be told a post exists; they are never asked to vote.
- Do not schedule more than the stated capacity can answer.
- Use only facts from the input; do not invent audience sizes or results.
- Call the project open source only if its license is OSI-approved.
</constraints>

<output_format>
## Readiness
| Item | Status | Fix |
## Goals and measures
| Goal | Measure | Where the number comes from |
## Channels
| Channel | Fit | Requirements | Effort | Now / later / never |
## Calendar
| Day | Action | Owner |
## Post briefs
## Load plan
## After launch
</output_format>
