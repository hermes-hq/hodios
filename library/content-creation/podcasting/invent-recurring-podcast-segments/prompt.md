---
schema: 1
id: invent-recurring-podcast-segments
kind: prompt
title: Invent recurring podcast segments
description: Invents recurring podcast segments that give a show a shape listeners look forward to, each with rules, length, prep load, a listener hook and a sample run, cutting ideas that need too much prep.
category: podcasting
version: 1.0.0
status: incubating
stage: [design]
role: [content-creator]
inputs: [notes]
output: [ideas, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
tags: [segments, show-format, recurring-bits, listener-participation]
pairs_with:
  prompts: [plan-podcast-episode, plan-listener-voicemail-episode, plan-podcast-season]
  personas: [podcast-producer]
args:
  - name: show_summary
    description: The show's topic, audience, tone, hosts, length, and the current running order. Mention segments you have tried and how they went.
    type: text
    required: true
  - name: prep_time
    description: Extra prep time per episode you could give a segment, for example "15 minutes" or "none". Leave empty if unsure.
    type: string
output_contract:
  format: markdown
  sections: [What the show needs, Segment ideas, Cut list, Top three, Trial plan]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design recurring segments. A good segment gives a show landmarks: listeners know where they are in the episode, look forward to a favourite part, and can join in. It has a name that says what it is, simple rules, a fixed length, a repeatable shape and an ending. Segments fail when they need research the host never has time for, when they depend on listener submissions that do not arrive, when the name is an inside joke nobody gets, or when they clash with the show's tone (a quiz in a grief podcast).

<show_summary>
{{show_summary}}
</show_summary>

{{#prep_time}}Prep time available per episode: {{prep_time}}{{/prep_time}}
</context>

<task>
1. What the show needs: from the running order and tone, say where the episode sags or lacks shape (opening, middle, close) and what kind of segment would help: a quick opener, a mid-episode change of pace, a participation bit, a closer.
2. Generate eight to ten segment ideas across types: a quick-fire opener, a recurring question for every guest, a game or challenge, a listener-driven bit, a recommendation or "one thing" closer, a myth-buster or explainer, a recurring story format. For each: a plain, descriptive name; the rules in two or three lines; length in minutes; prep per episode in minutes; what is needed (submissions, research, sound effects); how listeners can join; the episode slot.
3. Test each against the show: tone fit, prep against the time available, whether it survives a week with no submissions, and whether it gets stale after ten episodes.
4. Cut list: name the ideas that fail the test and why.
5. Top three: for each, write a sample run as a short script (60 to 120 seconds of dialogue for the hosts), and the intro line that will become familiar.
6. Trial plan: run the top segments for three to four episodes, what to watch (listener mentions, drop-off around the segment if the stats show it, host enjoyment), and when to keep, change or drop each.
</task>

<constraints>
- Respect the prep time; if none, only zero-prep or in-the-moment segments make the top three.
- Every listener-driven segment has a fallback for weeks without submissions.
- No segment that mocks listeners or guests, or that depends on copyrighted clips the show cannot use.
- Use the show's own tone and audience; do not import a generic comedy-show voice.
- If the show summary is too thin to judge tone and length, ask for them before generating.
</constraints>

<output_format>
## What the show needs
Three or four sentences.
## Segment ideas
Table: Name | Rules | Minutes | Prep | Listener hook | Slot.
## Cut list
Bullets with reasons.
## Top three
For each: why it fits, the intro line and the sample run.
## Trial plan
Table: Episode | Segments run | What to watch, then the keep, change or drop rule.
</output_format>
