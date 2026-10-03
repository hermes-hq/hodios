---
schema: 1
id: plan-podcast-growth
kind: prompt
title: Plan podcast audience growth
description: Plans podcast audience growth with guest spots, feed swaps, clips, newsletter, search, directories and community, ranked into a 90-day plan. Use when an existing show has plateaued.
category: podcasting
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [content-creator, marketer]
inputs: [notes]
output: [plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [podcast-growth, feed-swap, podcast-clips, discoverability, cross-promotion]
pairs_with:
  prompts: [write-podcast-guest-pitch, write-guest-promo-kit, analyze-content-performance]
  personas: [podcast-producer]
args:
  - name: show
    description: The show's topic, format, length and cadence, who it is for, how long it has run, where it is published (including video), and what promotion you already do.
    type: text
    required: true
  - name: current_audience
    description: Current numbers you have, such as downloads per episode after 7 and 30 days, followers, YouTube views, newsletter size and where listeners say they found you.
    type: string
output_contract:
  format: markdown
  sections: [Diagnosis, Growth levers ranked, 90-day plan, Weekly routine, What to measure]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help independent and branded podcasts grow. Podcast apps have weak discovery compared with social platforms, so most new listeners arrive through people and other media: a recommendation from a friend, the host appearing on another show, a promo swapped into another show's feed, a clip on a video or social platform, a newsletter, or a search result for an episode page. Many people now also listen to or watch podcasts on video platforms, where search and recommendations work differently. A show grows fastest when it is easy to describe in one sentence, each episode title says what the listener gets, and the back catalogue is easy to start with. Ranking and chart positions are noisy and mostly reflect short bursts of new follows; steady growth comes from compounding small channels.
</context>

<task>
<show>
{{show}}
</show>

<current_audience>
{{current_audience}}
</current_audience>

1. **Diagnose.** From the details given, name the most likely limits on growth: a fuzzy positioning line, titles that do not say what the episode is, no presence where the audience already spends time, inconsistent release, or a weak first-listen experience. Give the evidence for each. If the numbers are missing, say which ones would change the plan and state your assumptions.
2. **Rank growth levers** for this show by expected impact and effort, choosing from at least:
   - Positioning, show description, artwork and episode titles rewritten for a new listener.
   - Guest appearances by the host on other shows with an overlapping audience, and how to pick and pitch them.
   - Feed swaps and promo swaps with shows of similar size.
   - Clips: which moments to cut, formats for vertical video and audiograms, cadence, and how each points back to the show.
   - Video version or a presence on video platforms, if it fits the format and resources.
   - A newsletter or owned list, and episode pages with transcripts and show notes written for search.
   - Directory listings and the basics on each major app (category, description, trailer, featured starter episodes).
   - Guests sharing their episode, with a ready-made promo kit.
   - Community: listener questions, a group or chat, live events, and asking for word-of-mouth in a specific way ("send this to one person who…").
3. **Write a 90-day plan** using the top four or five levers, in three phases with concrete weekly actions.
4. **Write the weekly routine** that keeps growth work under a set number of hours, alongside production.
5. **Define what to measure:** downloads per episode at 7 and 30 days, follower growth, listener sources from a short survey, clip-to-listen conversion where trackable, and newsletter sign-ups, each read against the show's own baseline.
</task>

<constraints>
- Do not promise download numbers or chart positions.
- Do not recommend buying downloads, incentivised fake reviews, or download-inflating practices such as auto-playing ads; say they distort the data and can breach directory and advertiser rules.
- If the show has fewer than about ten episodes, put the first-listen experience and consistency before outreach and say why.
- Name platforms and app categories, not paid tools, unless the user named a tool.
- Keep every action specific to this show; replace generic advice with an example from its topic.
</constraints>

<output_format>
## Diagnosis
Limits with evidence, assumptions and missing numbers.

## Growth levers ranked
A table: lever | why it fits this show | impact (high, medium, low) | effort (hours per week) | first action.

## 90-day plan
A table: weeks | focus | actions.

## Weekly routine
A short schedule with hours.

## What to measure
A table: metric | baseline to record now | how to read it.
</output_format>
