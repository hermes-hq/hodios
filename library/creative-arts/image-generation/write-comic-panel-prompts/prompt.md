---
schema: 1
id: write-comic-panel-prompts
kind: prompt
title: Write comic panel image prompts
description: Turns a comic script page into panel image prompts with a page grid, shot sizes, consistent characters, balloon space and clear reading flow, for creators drafting comics with image tools.
category: image-generation
version: 1.0.0
status: incubating
stage: [build]
role: [writer, artist]
stack: [midjourney, stable-diffusion, dall-e]
requires: [none]
inputs: [document, text]
output: [prompt, plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [comics, panel-layout, sequential-art, lettering-space, character-consistency]
pairs_with:
  prompts: [write-character-consistency-prompts, create-storyboard]
args:
  - name: script_page
    description: One page of script with panel descriptions and dialogue, plus short descriptions of the characters who appear (or their identity blocks if you already have them). Say if the book reads right to left.
    type: text
    required: true
  - name: style
    description: The art style, e.g. ligne-claire, manga, noir inks, webcomic flat colour, newspaper strip.
    type: string
    default: ligne-claire
  - name: panels
    description: Panel count to plan for if the script does not fix it.
    type: number
    default: 6
output_contract:
  format: markdown
  sections: [Page layout, Cast and style blocks, Panel prompts, Balloon placement, Continuity checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a comics artist and letterer who drafts pages with image generators. A comics page reads in a fixed order (left to right and top to bottom, or right to left for manga), so panel shape, shot size and where each speaker stands all steer the eye. Balloons are read in order too: the first speaker should sit on the left (or right for right-to-left books) with clear sky or wall above them for the balloon. Shots should vary: an establishing panel, medium shots for dialogue, close-ups for reactions, and the 180-degree rule kept within a scene so characters do not swap sides. Generators forget characters between panels, ignore panel borders and invent garbled lettering, so each panel is generated separately at the panel's own aspect ratio, characters come from identity blocks reused verbatim, and lettering is added in a layout tool. This is about comic pages; storyboards for video are a separate job.

<script>
{{script_page}}
</script>
Style: {{style}}
Panels: {{panels}}
</context>

<task>
1. **Page layout.** Reading direction, a page grid (for example three tiers of two), each panel's size and aspect ratio, and which panel is the largest and why. Use the script's panel count if it has one; otherwise plan {{panels}} panels and say so. If the script page lacks the characters' looks or the setting, ask up to three questions and stop.
2. **Cast and style blocks.** One identity block per character (fixed face, hair, build, outfit colours, signature trait), and one style block describing {{style}} by technique (line weight, inking, colour approach, shading) without naming a living artist.
3. **Panel prompts.** For each panel: shot size and angle, the characters (identity blocks verbatim) with positions left to right, their action and expression, the setting, the light, empty space reserved for balloons at a stated position, the panel's aspect ratio, the style block, and "no text, no speech balloons, no panel border".
4. **Balloon placement.** For each panel, the dialogue in reading order and where each balloon and caption goes, with tails pointing to the speaker and a note if the dialogue is too long for the panel (suggest splitting).
5. **Continuity checklist.** What to compare across panels before assembling the page.
</task>

<constraints>
- Do not change the script's dialogue. Pacing suggestions go in balloon notes.
- No lettering, balloons or sound effects in the generated images; they are added in a layout or lettering tool.
- Keep each character on the same side of the frame within a scene unless the script calls for a cut that changes the axis.
- No existing published characters and no living artist's name as a style.
</constraints>

<output_format>
## Page layout
Reading direction, grid, then a table: Panel | Size | Aspect ratio | Shot.
## Cast and style blocks
Code blocks.
## Panel prompts
One heading and code block per panel.
## Balloon placement
Table: Panel | Order | Speaker or caption | Position.
## Continuity checklist
Faces and outfits, screen direction, props in hand, light and time of day, balloon space clear.
</output_format>
