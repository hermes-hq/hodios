---
schema: 1
id: plan-spec-episode
kind: prompt
title: Plan a spec episode of an existing show
description: Plans a spec episode of a current TV show that sounds like the show, honours its format and engine, and changes nothing permanent. Use before writing a spec for a fellowship or portfolio.
category: screenwriting
version: 1.0.0
status: incubating
stage: [plan]
role: [writer]
requires: [none]
inputs: [text, notes]
output: [outline, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [spec-script, tv-writing, episode-outline, show-voice]
pairs_with:
  prompts: [write-beat-sheet, develop-tv-series-concept, format-screenplay-scene, write-script-coverage]
  personas: [script-consultant]
args:
  - name: show
    description: The show you are speccing, and what you know of its format (half-hour or hour, single or multi-camera, cold open or teaser, act count, recurring segments) and its main characters.
    type: text
    required: true
  - name: episode_idea
    description: Your idea for the episode, however rough. Optional; leave blank to get three story pitches first.
    type: text
  - name: purpose
    description: What the spec is for, e.g. a writing fellowship, a staffing portfolio, practice.
    type: string
    default: portfolio
output_contract:
  format: markdown
  sections: [Show engine, Story pitches, Episode outline, Voice notes, Spec traps check, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A spec episode proves a writer can deliver the show the showrunner already makes. Readers judge it on three things: does it sound like these characters, does it follow the show's format exactly (act count, cold open, runners, tag), and is the story one the show would plausibly air but has not. Specs fail by changing the status quo (killing, marrying or firing a lead), centring a guest star, writing a "very special episode", relying on a long-running arc the reader must know, or speccing a show that is ending or too old for readers to know. The main character must drive the A story; the B and C stories use the ensemble and pay off the theme. Many programmes and representatives now ask for original pilots instead of, or as well as, specs, so the writer should check the current rules of each target before writing one.
</context>

<task>
Plan a spec episode of this show for: {{purpose}}.

<show>
{{show}}
</show>
{{#episode_idea}}
<episode_idea>
{{episode_idea}}
</episode_idea>
{{/episode_idea}}

1. **Show engine:** from what the writer gave you, state the format (length, camera style, cold open or teaser, number of acts, tag), what generates stories week to week, the lead's want and flaw, and the recurring relationships the show leans on. Mark anything you are inferring rather than told as "(check against episodes)"; you may not have seen recent seasons.
2. **Story pitches:** if no idea was given, pitch three standalone A stories, each one line, plus a B story. If an idea was given, test it against the traps in step 5 and offer one adjusted version if it fails.
3. **Episode outline:** for the chosen pitch, act by act, list the scenes (location, who, what turns) for A, B and C stories, with the act-out at the end of each act as a question or reversal. Size it to the show's real page count (roughly 25 to 35 pages for a half-hour, 50 to 65 for an hour).
4. **Voice notes:** for each main character, two or three verbal habits, what they would never say, and how they typically react under pressure, phrased as guidance, not invented quotes from the show.
5. **Spec traps check:** mark OK or Flag for: status quo intact at the end; lead drives the A story; no guest star at the centre; works without deep arc knowledge; runners and signature elements used; no real-world plot that dates it.
6. **Questions:** up to three things the writer should confirm by rewatching.
</task>

<constraints>
- Do not quote or reproduce dialogue or scenes from the show; describe its style instead.
- Do not invent facts about the show's canon, cast or production; flag guesses.
- Keep every pitch inside the show's current status quo and tone.
- Do not write script pages.
</constraints>

<output_format>
## Show engine
## Story pitches
## Episode outline
One table per act: Scene | Story (A/B/C) | Who | What turns.
## Voice notes
## Spec traps check
## Questions
</output_format>
