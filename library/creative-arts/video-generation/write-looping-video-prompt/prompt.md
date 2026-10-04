---
schema: 1
id: write-looping-video-prompt
kind: prompt
title: Write a seamless looping video prompt
description: Writes prompts for seamless looping background videos for streams, websites and music visualisers, with a loop strategy, motion that returns to its start and a seam check.
category: video-generation
version: 1.0.0
status: incubating
stage: [build]
role: [content-creator, designer]
requires: [none]
inputs: [topic, text]
output: [prompt, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [seamless-loop, background-video, stream-overlay, visualiser]
pairs_with:
  prompts: [write-image-to-video-motion-prompt, write-background-music-cues, grow-streaming-channel]
args:
  - name: scene
    description: "What the loop shows, e.g. 'rain on a café window at night', 'slow nebula drifting', 'pixel-art campfire'."
    type: string
    required: true
  - name: seconds
    description: Loop length in seconds. Short loops (4 to 10 s) are easier to make seamless.
    type: number
    default: 8
  - name: use
    description: "Where it plays: stream-background (behind a streamer and overlays), website-hero (behind a headline on a page), visualiser (behind music, can react to the beat)."
    type: enum
    enum: [stream-background, website-hero, visualiser]
    default: stream-background
output_contract:
  format: markdown
  sections: [Loop strategy, Prompt, Settings, Seam check, Fallbacks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A loop is seamless only when the last frame flows into the first with no jump in position, light or motion. Video models do not plan for that by default: a camera keeps moving, a cloud drifts off-screen, the light changes, and the cut back to the start pops. Seamless loops come from choosing motion that is naturally cyclical or stationary on average, locking the camera, fixing the light, and, where the tool supports it, using the same image as first and last frame. A background loop also has a job: it must not compete with the person, headline or music in front of it.
</context>

<task>
Write a loop prompt for "{{scene}}", {{seconds}} seconds, used as a {{use}}.

1. **Loop strategy.** Choose and explain the method that fits the scene:
   - **cyclical motion:** elements that repeat a whole number of times within {{seconds}} seconds (a pendulum, a rotating object, waves on a period that divides the loop length);
   - **stationary texture:** many small elements in constant, statistically even motion (rain, snow, flicker, particles, slow noise) where no single element must return;
   - **matched first and last frame:** generate from a start image and set the same image as the end frame if the tool supports it;
   - **crossfade fallback:** generate longer than needed and dissolve the tail into the head in the editor;
   - **ping-pong:** play forward then reversed; only for motion that looks natural backwards (not falling water, smoke or walking).
   If the scene requires one-way travel (a car driving through, a sunrise), say it cannot loop cleanly and propose the nearest loopable version.
2. **Prompt.** One paragraph: locked-off static camera (or a perfectly circular move only if the strategy supports it); the moving elements with motion type, speed and how they repeat; what stays still; constant light with no change in time of day or exposure; and the requirement that the scene at the end matches the beginning. Phrase it positively.
3. **Use-specific design.**
   - stream-background: low contrast and calm motion behind the streamer; keep a clear area for the camera box and alerts; avoid motion near the edges where overlays sit.
   - website-hero: very slow, subtle motion; a quiet area for the headline with enough contrast for text; keep file size small (short loop, modest resolution); provide a still poster frame for reduced-motion settings and slow connections.
   - visualiser: motion with a regular pulse; if the tempo is known, make the loop a whole number of bars (seconds per bar = 240 / BPM in 4/4) and say what it is.
4. **Settings.** Aspect ratio for the use, a low motion setting if the tool offers one, seed reuse for retries. Tell the user to check their tool's current first-frame and last-frame options.
5. **Seam check.** A checklist to run in an editor or player on loop: position of every visible element at the cut, brightness and colour at the cut, motion speed across the cut, any element that appears or vanishes, and viewing the loop at least five times in a row.
6. **Fallbacks.** Three fixes if the seam pops, each changing one thing.
7. Before answering, confirm that the prompt contains a static or circular camera, constant light, and a stated repeat or stationary pattern that fits {{seconds}} seconds.
</task>

<constraints>
- If no scene is given, or it is too vague to know what moves in the loop, ask for it in one question and stop.
- No rapid flashing: fewer than three flashes a second, and no large high-contrast flicker, to protect viewers with photosensitive conditions.
- No readable text or logos in the generated loop; add them as overlays.
- No tool, model or version names.
</constraints>

<output_format>
## Loop strategy
## Prompt
Code block.
## Settings
## Seam check
Checklist.
## Fallbacks
</output_format>
