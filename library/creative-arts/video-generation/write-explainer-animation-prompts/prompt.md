---
schema: 1
id: write-explainer-animation-prompts
kind: prompt
title: Write explainer animation scene prompts
description: Turns an explainer voice-over script into timed motion-graphics scene prompts that share one visual system and match each scene to the line it illustrates.
category: video-generation
version: 1.0.0
status: incubating
stage: [build]
role: [marketer, teacher]
requires: [none]
inputs: [text]
output: [prompt, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [motion-graphics, explainer, visual-metaphor, voice-over-timing]
pairs_with:
  prompts: [write-explainer-video-script, turn-storyboard-into-video-shots, write-tts-voiceover-script]
args:
  - name: script
    description: The finished voice-over script, one line or sentence per row if possible. This prompt does not write the script.
    type: text
    required: true
  - name: style
    description: "Visual style: flat-2d (clean vector shapes), isometric (3D-looking blocks at a fixed angle), whiteboard (hand-drawn lines appearing on white), paper-cutout (layered paper textures with shadows)."
    type: enum
    enum: [flat-2d, isometric, whiteboard, paper-cutout]
    default: flat-2d
  - name: total_seconds
    description: Target running time of the finished video in seconds.
    type: number
    default: 60
output_contract:
  format: markdown
  sections: [Timing check, Visual system, Scene table, Scene prompts, Edit notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An explainer works when every picture does one job: it shows the idea the narrator is saying at that moment, in a visual language the viewer learns once and can then read without effort. Generated explainer scenes usually fail in three ways: each scene invents a new style, the visuals are literal stock-photo clichés (a lightbulb for "idea", handshakes for "partnership") or decoration that ignores the line, and the timing does not match the narration so pictures lag behind words. Text in generated frames also comes out garbled, so labels and captions belong in the edit.
</context>

<task>
Build scene prompts for this voice-over in the `{{style}}` style, for a {{total_seconds}}-second video.

<script>
{{script}}
</script>

1. **Timing check.** Count the words. Estimate narration time at about 150 words per minute (2.5 words per second) for a calm explainer. Compare with {{total_seconds}} seconds. If the script runs more than 15% over or under, say by how much and suggest which lines to cut or where to hold visuals; do not rewrite the script yourself. If the script is not a voice-over (for example bullet notes), ask for the finished narration and stop.
2. **Visual system.** Define once, for reuse in every prompt:
   - palette (4 to 6 colours by plain name, with one accent kept for the key idea);
   - shape language and line weight;
   - a recurring character or icon set, described exactly, if the script has a protagonist (a customer, a cell, a parcel);
   - backgrounds (plain, gradient or simple set);
   - motion grammar (how things enter, transform and leave; typical pace; the transition used between scenes);
   - camera (mostly static or slow push, appropriate to {{style}}).
3. **Scene breakdown.** Give each voice-over line, or each pair of short lines, one scene. For each, choose a visual metaphor that shows the mechanism, not a cliché: a queue shrinking for "faster checkout", a parcel route redrawing itself for "rerouted delivery". For abstract lines, offer the metaphor and one alternative. Assign a time range from your word count so the visual lands with its words; the scene times must add up to the narration time.
4. **Scene prompts.** For each scene: the visual system tokens, the elements on screen, the one main motion with start and end state, the camera, the transition in, and the duration. Keep each scene to one idea and no more than three moving elements.
5. **Edit notes.** List every label, number, caption or logo that should be added as text in the editor rather than generated, with its scene and time. Add accessibility notes: captions for the whole voice-over, sufficient colour contrast for any on-screen text, no rapid flashing.
6. Before answering, check: every script line maps to a scene; times add up; every prompt repeats the same palette and style tokens; no prompt asks for readable text.
</task>

<constraints>
- Do not change, add or drop words in the script. If a line is unclear or a claim looks wrong, flag it in the timing check for the author.
- No real people or real brands' logos and characters in the visuals unless the user owns them and says so; logos go in the edit.
- No tool, model or version names.
</constraints>

<output_format>
## Timing check
Word count, estimated seconds, difference from {{total_seconds}}, and any suggestions.
## Visual system
Code block with the reusable tokens.
## Scene table
| # | Time | Voice-over line | Visual idea | Motion | Transition |
## Scene prompts
Numbered code blocks.
## Edit notes
Text overlays and accessibility.
</output_format>
