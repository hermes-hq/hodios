---
schema: 1
id: write-transition-shot-prompts
kind: prompt
title: Write transition shot prompts
description: Designs a transition between two generated clips, finding what they share (shape, motion, colour or position) and writing the bridge prompt and cut points for a match cut, whip or morph.
category: video-generation
version: 1.0.0
status: incubating
stage: [build]
role: [content-creator, artist, designer]
requires: [none]
inputs: [text, image]
output: [prompt, ideas]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [match-cut, whip-pan, morph-transition, bridge-clip]
pairs_with:
  prompts: [write-first-last-frame-prompts, write-clip-extension-prompt, write-music-video-shot-prompts]
args:
  - name: clip_a
    description: "The outgoing clip, especially its last second: framing, main shapes, colours and motion direction."
    type: text
    required: true
  - name: clip_b
    description: "The incoming clip, especially its first second, described the same way."
    type: text
    required: true
  - name: feel
    description: "How the transition should feel: seamless (hidden), energetic (fast, punchy), dreamy (soft, flowing) or abrupt (deliberate jolt)."
    type: enum
    enum: [seamless, energetic, dreamy, abrupt]
    default: seamless
output_contract:
  format: markdown
  sections: [Shared elements, Transition options, Bridge prompt, Cut points]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A transition works when the end of one shot and the start of the next share something the eye can follow: a shape in the same place (a round moon becomes a round plate), a motion that continues in the same direction and speed, a colour that fills the frame, or an object that wipes across the lens. Without a shared element, a generated morph between two unrelated frames reads as melting rather than as a transition. Generated clips also make transitions easier than live action, because you can prompt the end of clip A or the start of clip B to set up the match, or generate a short bridge clip between the last frame of A and the first frame of B. Transitions should be short; most last well under two seconds.
</context>

<task>
Design a {{feel}} transition between these clips.

<clip_a>
{{clip_a}}
</clip_a>

<clip_b>
{{clip_b}}
</clip_b>

1. **Shared elements.** List what the end of A and the start of B already share or could share with a small change: shapes and their screen position, motion direction and speed, dominant colour, light level, a foreground object. If nothing is shared, say which clip to regenerate or adjust so they do.
2. **Transition options.** Propose two or three options suited to a {{feel}} feel from: match cut on shape or position, motion match (continue the same direction), whip pan with blur, push through a foreground object or dark area, light flash or flare, morph between matched frames. For each, say what it needs from A and B and the risk.
3. **Bridge prompt.** For the strongest option, write what is needed: a revised last second for A, a revised first second for B, or a bridge clip prompt that starts on A's last frame and ends on B's first frame. Give the length (usually under two seconds) and keep camera direction and speed continuous.
4. **Cut points.** Where to cut in each clip (for example "on the frame where the plate fills the centre"), whether to add a few frames of motion blur or a short dissolve, and a sound cue that sells the transition (a whoosh, a hit, or a sound that carries over).
5. Before answering, check the chosen option is supported by a shared element you named and that motion direction is continuous across the cut.
</task>

<constraints>
- Do not recommend a morph between frames that share nothing unless the user wants a melting effect; say what it will look like.
- No tool, model or version names.
- Keep text and logos out of the bridge clip; add them in the edit.
</constraints>

<output_format>
## Shared elements
Table: Element | End of A | Start of B | Match strength.
## Transition options
Numbered options with needs and risk.
## Bridge prompt
Code block(s) with length.
## Cut points
Bullets.
</output_format>
