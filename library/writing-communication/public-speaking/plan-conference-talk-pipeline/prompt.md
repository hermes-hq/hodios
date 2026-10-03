---
schema: 1
id: plan-conference-talk-pipeline
kind: prompt
title: Plan a conference talk pipeline for an open-source maintainer
description: Picks the meetups and conferences worth submitting to, finds talk angles that teach rather than pitch a project, schedules CFP deadlines and plans how each talk is reused. Use to plan talks.
category: public-speaking
version: 1.0.0
status: incubating
stage: [plan]
role: [maintainer, developer-advocate, software-engineer]
requires: [web]
inputs: [text]
output: [plan, table, ideas]
risk: network
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [open-source, cfp, conference-talks, meetups, talk-reuse, speaking-pipeline]
pairs_with:
  prompts: [write-conference-talk-proposal, write-lightning-talk, write-build-story-article]
  personas: [developer-advocate]
args:
  - name: speaker
    description: Who is speaking, their experience on stage, the project and what they learned building it, location, travel budget and languages.
    type: text
    required: true
  - name: horizon_months
    description: How far ahead to plan.
    type: number
    default: 12
  - name: talks_per_year
    description: How many talks the speaker can realistically give.
    type: number
    default: 4
output_contract:
  format: markdown
  sections: [Angles, Events, Calendar, Reuse plan, Measuring]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Talks reach audiences no launch post does, and their recordings and slides keep working for years; projects have seen star jumps after major conference talks. Programme committees read many proposals quickly (one reviewer reported about 87 seconds each), often in anonymous first rounds, and reject product pitches and generic, AI-sounding abstracts; they accept concrete lessons, honest failures and talks that help attendees whatever tool they use. A sustainable path for a maintainer: start at local meetups and online community events, reuse the best material for regional conferences, then submit the proven talk to larger events. Deadlines usually close months before the event, so a pipeline beats one-off submissions.
</context>

<task>
<speaker>
{{speaker}}
</speaker>
Horizon: {{horizon_months}} months. Capacity: {{talks_per_year}} talks a year.

If you cannot tell what the speaker knows or has built, ask and stop.

1. **Angles.** Five talk angles from the speaker's real experience, each a lesson attendees can use without adopting the project (for example "What we learned parsing 10 TB of logs on a laptop"). For each: the audience, the takeaway, the evidence or story behind it, and where the project fits (one slide of context, a demo, or not at all).
2. **Events.** Search for meetups, community days, regional and large conferences, and online events that fit each angle in the speaker's region and topic, over the next {{horizon_months}} months. For each: name, link, audience, format (lightning, 25 or 45 minutes, workshop), CFP deadline, travel support or speaker policy, and whether it values first-time speakers. Mark anything you could not confirm on the event's own site as UNVERIFIED.
3. **Calendar.** Pick events that fit {{talks_per_year}} talks: one or two smaller events first to rehearse each angle, then larger ones. Give submission dates, writing dates and a rehearsal plan.
4. **Reuse plan.** For each talk: the blog post, docs page, short video clips and social posts it becomes, and the FAQ from audience questions. Publish slides with a link to the project and notes.
5. **Measuring.** What to watch after each talk without tracking attendees: referrers to the repo and docs, downloads in the following two weeks, questions and issues that mention the talk, and invitations that follow.
</task>

<constraints>
- No talk that is a product pitch in disguise; the project stays context unless the event is about the project's ecosystem.
- Do not invent events, dates or CFP details; mark unverified ones and tell the speaker to confirm on the event site.
- Respect events' rules on vendor talks and sponsorship; disclose affiliation in the bio.
</constraints>

<output_format>
## Angles
| Angle | Audience | Takeaway | Evidence | Project's role |
## Events
| Event | Link | Format | CFP deadline | Fit | Verified? |
## Calendar
| Date | Action |
## Reuse plan
## Measuring
</output_format>
