---
schema: 1
id: write-vertical-microdrama-episodes
kind: prompt
title: Write vertical microdrama episodes
description: Writes a run of one-to-two-minute vertical drama episodes with a hook in the first seconds, a cliffhanger on every episode and a series plan. Use for short-drama apps and serialized social video.
category: screenwriting
version: 1.0.0
status: incubating
stage: [build]
role: [writer, content-creator]
requires: [none]
inputs: [text, topic]
output: [script, outline]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [microdrama, vertical-video, serialized-drama, cliffhanger, short-drama]
pairs_with:
  prompts: [write-beat-sheet, write-logline-and-synopsis, format-screenplay-scene]
args:
  - name: premise
    description: The series idea, genre (revenge, romance, thriller, family drama), the lead and the central conflict.
    type: text
    required: true
  - name: episodes
    description: How many episodes to script in full now (the rest are outlined in the series plan).
    type: number
    default: 5
  - name: total_episodes
    description: Planned length of the whole series in episodes.
    type: number
    default: 60
  - name: constraints
    description: Production limits, e.g. number of locations, cast size, whether exteriors or night shoots are possible.
    type: text
output_contract:
  format: markdown
  sections: [Series spine, Series plan, Episodes, Production notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Vertical microdramas are serialized stories cut into episodes of roughly one to two minutes, shot 9:16 for phones and watched in a feed. Viewers decide in the first three seconds, so each episode opens mid-conflict, not on establishing shots. Every episode ends on a hook: a reveal, a reversal or a threat, never on a resolved beat. The genre runs on clear desires, big reversals, visible status shifts (humiliation then vindication) and secrets revealed in public. Framing is tight (singles and two-shots), dialogue is short and readable as captions, and the story must be shootable in a few locations over a few days. A common structure front-loads a strong opening run, then places a major reversal around where viewers would decide whether to keep paying or watching.
</context>

<task>
Write vertical microdrama material for this series.

<premise>
{{premise}}
</premise>
{{#constraints}}
<production_constraints>
{{constraints}}
</production_constraints>
{{/constraints}}

1. **Series spine:** logline, the lead's want, the antagonist and what they hold over the lead, the central secret, and the ending the series builds to. If the premise has no clear lead or conflict, ask up to three questions and stop.
2. **Series plan:** split {{total_episodes}} episodes into four or five movements with the major reversal at the end of each, and mark the episode where the first big reversal lands (early, about the first sixth of the run).
3. **Episodes:** write the first {{episodes}} episodes in full. For each: episode number, a three-second hook line (what the viewer sees first), the script in standard scene format with short sluglines, action of one or two lines, and dialogue lines short enough to read as captions, and an end-hook. Target about 1 to 2 minutes (roughly 1 to 2 script pages) each.
4. **Production notes:** list locations and cast used per episode, the shots that must be vertical-composed (close-ups for reveals, inserts of phones or documents), and anything that breaks the constraints.
</task>

<constraints>
- Every episode starts inside a conflict and ends unresolved. No recaps longer than one line.
- Keep sex, violence and cruelty within what the writer specifies; do not escalate shock for its own sake.
- Stay within the production constraints; flag scenes that need more.
- Do not name or imitate a specific existing series or app.
</constraints>

<output_format>
## Series spine
## Series plan
Table: Movement | Episodes | What happens | Reversal at the end.
## Episodes
One subsection per episode: Hook, Script, End-hook.
## Production notes
</output_format>
