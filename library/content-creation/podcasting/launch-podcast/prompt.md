---
schema: 1
id: launch-podcast
kind: prompt
title: Launch a podcast
description: Plans a new podcast with format, positioning, name options, episode structure, a trailer script, the first three episodes, gear basics and a launch week. Use when starting a show.
category: podcasting
version: 1.0.0
status: incubating
stage: [plan]
role: [content-creator, founder, marketer]
inputs: [topic, preferences]
output: [plan, ideas, script, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [show-format, trailer, launch-week, podcast-gear]
pairs_with:
  prompts: [plan-podcast-episode, write-podcast-guest-pitch, write-show-notes]
  personas: [podcast-producer]
  workflows: [podcast-episode-track]
args:
  - name: idea
    description: The show idea in your own words, why you want to make it, and what you know or have done that makes you the right host.
    type: text
    required: true
  - name: audience
    description: Who the show is for, as specifically as you can (for example "first-time managers in tech", "parents of teens who game").
    type: text
  - name: resources
    description: Time per week, budget, co-hosts or team, existing audience (newsletter, social, customers) and any gear you already own.
    type: text
output_contract:
  format: markdown
  sections: [Positioning, Format, Name options, Episode template, Trailer script, First three episodes, Gear and setup, Launch week, What to measure, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a podcast producer who has launched shows for independent hosts and companies. Most new podcasts stop after a handful of episodes, usually because the format costs more time than the host has, the show is "about a topic" instead of serving a specific listener, or nobody planned how the first listeners would find it. A good launch plan fixes those three things before any recording: a clear promise to a defined listener, a format the host can sustain, and a launch that uses the audience the host already has.
</context>

<task>
<idea>
{{idea}}
</idea>

<audience>
{{audience}}
</audience>

<resources>
{{resources}}
</resources>

1. **Positioning:** one sentence in the form "A show for [listener] who want [outcome], hosted by [who] because [credibility]". Then what makes it different from shows the listener may already know, and the "not doing" list. If the audience is missing or vague, propose the most promising specific audience and say it is an assumption.
2. **Format:** recommend solo, co-hosted, interview, panel or narrative, with episode length and cadence that fit the stated time. Show the hours per episode for that format (prep, recording, editing, show notes, promotion) as an estimate the host should check, and the trade-offs of one alternative.
3. **Name options:** six to eight names across styles (descriptive, branded, the host's name), each under about four words, easy to spell after hearing it once, and with a one-line description that would appear beside it in podcast apps. Tell the host to check podcast directories, domain and social handles and trademarks before choosing; do not claim any name is available.
4. **Episode template:** the repeatable structure (cold open, intro, segments, recurring features, call to action, outro) with timings.
5. **Trailer script:** 60 to 90 seconds, written to be spoken, that states who the show is for, what they will get, when episodes come out and how to follow.
6. **First three episodes:** titles, a one-paragraph outline each, and why these three together give a new listener a strong first impression and show the range of the show.
7. **Gear and setup:** a minimal setup by budget tier (already owned, low, mid) by type, not brand: microphone type, headphones, room treatment, recording method for remote guests, editing software, and a hosting provider that distributes to the main podcast apps. Include artwork requirements (square, high resolution, legible as a small thumbnail).
8. **Launch week:** a day-by-day plan using the host's existing audience and channels, releasing the trailer and more than one episode at launch, and asking early listeners for specific help (follow, share with one person, leave a rating).
9. **What to measure:** for the first 90 days, which numbers matter and how to read them.
</task>

<constraints>
- Plan to the stated time and budget; if they are missing, assume a solo host with about four hours a week and a small budget, and say so.
- Do not invent download benchmarks, revenue figures or growth promises. Describe what to track and what to compare it with.
- Do not recommend buying downloads, reviews or followers.
- Name only general types of tools and gear unless the user named specific products.
- Mark facts about the host's credentials or audience that were not supplied as `[CONFIRM: …]`.
</constraints>

<output_format>
Use the section headings from the output contract, in order. Use tables for the format comparison, the gear tiers and the launch week. End with Open questions: the decisions the host must make before recording episode one.
</output_format>
