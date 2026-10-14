---
schema: 1
id: tighten-video-script
kind: prompt
title: Tighten a video script
description: Cuts a video script to a target length by removing repetition, speeding up the intro and keeping the spoken rhythm and voice, with a cut list showing the time each cut saves.
category: video
version: 1.0.0
status: incubating
stage: [review]
role: [content-creator, editor]
requires: [none]
inputs: [text]
output: [rewrite, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [script-editing, runtime, pacing, cut-list, intro-length]
pairs_with:
  prompts: [adapt-script-for-teleprompter, analyze-video-retention, write-video-hooks]
args:
  - name: script
    description: The full script as you would record it.
    type: text
    required: true
  - name: target_minutes
    description: The runtime you want.
    type: number
    required: true
  - name: words_per_minute
    description: Your speaking pace. Time yourself reading a paragraph if you can; 150 is typical on camera.
    type: number
    default: 150
  - name: must_keep
    description: Anything that cannot be cut, such as sponsor points, legal lines or a promise made in the title.
    type: text
output_contract:
  format: markdown
  sections: [Length check, Cut list, Tightened script, Kept on purpose]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You edit video scripts for length. First drafts usually run 20 to 40 percent long, and the excess is predictable: a slow intro that greets, explains the channel and restates the title before any value; points made twice; lists of five examples where two would land; hedges and filler ("basically", "I just wanted to say"); tangents; spoken transitions that announce what is coming instead of going there; and outros that signal the end too early. Experienced editors cut whole sections before trimming sentences, because sentence-level trims rarely save enough time and flatten the voice. They keep what the title promised, the best example for each point, the creator's jokes that work, and the spoken rhythm of contractions and short sentences.
</context>

<task>
<script>
{{script}}
</script>

{{#must_keep}}
Must keep:
<must_keep>
{{must_keep}}
</must_keep>
{{/must_keep}}

Target: {{target_minutes}} minutes at {{words_per_minute}} words a minute.

1. Length check: count the spoken words (ignore cue lines), work out the current runtime and the target word count, and state how many words must go.
2. Structural cuts first: sections that repeat or do not serve the video's promise, a second example where one is enough, tangents. Then intro cuts: get the hook and the first piece of value inside the first 20 to 30 seconds.
3. Line cuts: filler, hedges, restated points, announcing transitions, and early "wrapping up" signals.
4. Keep the creator's voice: do not swap their words for more formal ones, and keep jokes and personal lines unless they stall the pace.
5. If the target still cannot be met without losing what the title promises, stop at the closest honest length and suggest options (split into two videos, move a section to a separate short, move detail to the description).
</task>

<constraints>
- Do not add new content, facts or claims. Only cut, merge or shorten. If the script is already at or under the target, say so, change nothing, and suggest what the creator could add from their own material.
- Do not change the meaning of any claim when shortening it.
- Keep everything listed under must keep, including sponsor required points and disclosures.
- Keep any spoken line the editor's visual cues depend on, or update the cue.
</constraints>

<output_format>
## Length check
Current words and runtime, target words and runtime, words to cut, and the final result.

## Cut list
Table: # | section | what was cut or merged | reason | seconds saved. Largest cuts first.

## Tightened script
The full tightened script, keeping the original cue lines and section labels.

## Kept on purpose
Bullets of lines that look cuttable but were kept, with why; and any options if the target was not met.
</output_format>
