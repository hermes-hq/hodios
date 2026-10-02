---
schema: 1
id: create-storyboard
kind: prompt
title: Create a storyboard with image prompts
description: Creates a shot-by-shot storyboard with shot size, angle, movement, action, sound and timing, plus a consistent image prompt for every frame. Use when planning a video, animation or comic.
category: image-generation
version: 1.0.0
status: incubating
stage: [plan, design]
role: [content-creator, artist, marketer, writer]
requires: [none]
inputs: [text, topic]
output: [table, prompt]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [storyboard, shot-list, visual-storytelling, comics]
pairs_with:
  prompts: [write-image-prompt, build-image-style-guide]
args:
  - name: story
    description: The story, script or idea, the format (ad, short film, explainer, music video, comic page), the target length and the audience.
    type: text
    required: true
  - name: shots
    description: Number of frames or panels, between 4 and 24.
    type: number
    default: 8
  - name: tool
    description: The image tool for the frame prompts, e.g. "Midjourney", "Stable Diffusion", "ChatGPT images". Optional; without it prompts are tool-neutral.
    type: string
output_contract:
  format: markdown
  sections: [Concept, Visual bible, Storyboard, Frame prompts, Continuity notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A storyboard is where a story becomes pictures: which moments get a frame, how close the camera is, where the viewer's eye goes, and how one shot cuts to the next. Generated storyboards often fail at the basics: every frame is the same medium shot, the story beat in a frame is unclear, screen direction flips between shots, and the main character looks different in every image prompt. This prompt plans the shots like a director and writes the image prompts like a continuity supervisor.
</context>

<task>
Create a {{shots}}-frame storyboard{{#tool}} with image prompts for {{tool}}{{/tool}}.

<story>
{{story}}
</story>

1. **Concept:** the format, length, audience, and the one feeling or message the piece must leave, in 2 to 3 lines. If the story has no clear beginning, turn and end, propose one and label it.
2. **Beats:** choose the {{shots}} moments that tell the story. Spend frames on turning points and emotion, not on transitions the viewer can infer. Use an establishing shot early unless the format calls for a cold open.
3. **Visual bible:** fixed descriptions reused word for word in every prompt: each character (age, build, face, hair, clothing, colours), key locations, the style tokens (medium, palette, lighting, aspect ratio). Characters are described by appearance, never by a real person's name.
4. **Storyboard:** for each frame give:
   - number and beat;
   - shot size (extreme wide, wide, medium, close-up, extreme close-up) and angle (eye level, low, high, overhead, over-the-shoulder);
   - camera movement for video (static, pan, tilt, dolly, handheld) or panel size and placement for comics;
   - the action, and where the subject sits in the frame;
   - dialogue, caption, sound or music cue;
   - duration in seconds for video (totals must match the target length), or page and panel for comics;
   - the transition to the next frame (cut, match cut, dissolve, page turn).
   Vary shot sizes to control rhythm, keep screen direction consistent (the 180-degree rule) unless a cross is intended, and use close-ups for the emotional peaks.
5. **Frame prompts:** one image prompt per frame, built from the visual bible plus that frame's shot size, angle, action and setting, formatted for the tool if one was given (for example Midjourney parameters at the end, or plain sentences for chat-based tools). Keep the character descriptions identical across frames.
6. **Continuity notes:** props, costumes, lighting and time of day that must carry over, and frames likely to need reference images to stay consistent.
7. If the story is too thin to choose beats (a single sentence with no event), ask up to three questions and stop. If {{shots}} is outside 4 to 24, use the nearest bound and say so.
</task>

<constraints>
- Every frame must move the story forward or deliver an emotional beat; merge or drop frames that only repeat.
- No real, identifiable people, and no copyrighted characters in the prompts; describe original characters.
- Do not claim the image tool will keep characters identical. Recommend reference images or the tool's character-consistency features where they exist.
</constraints>

<output_format>
## Concept
## Visual bible
Characters, locations and style tokens, in a code block for copying.
## Storyboard
| # | Beat | Shot and angle | Movement or panel | Action and framing | Dialogue / sound | Duration or page | Transition |
## Frame prompts
Numbered code blocks, one per frame.
## Continuity notes
</output_format>
