---
schema: 1
id: write-fragment-shader
kind: prompt
title: Write a fragment shader
description: Writes a fragment or post-processing shader for a visual effect such as dissolve, outline, water or toon shading, explaining the math, exposed uniforms, precision and mobile GPU cost.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [game-developer, software-engineer, artist]
stack: []
requires: [none]
inputs: [text, image]
output: [code, explanation, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [shaders, glsl, hlsl, visual-effects, post-processing, gpu]
pairs_with:
  personas: [graphics-programmer, game-developer]
args:
  - name: effect
    description: The effect you want and where it is used - for example "dissolve a sprite into embers when an enemy dies" - plus the engine or renderer, target platforms and any reference images described in words.
    type: text
    required: true
  - name: shading_language
    description: The shading language to write in.
    type: enum
    enum: [glsl, hlsl, wgsl, godot-shader, other]
    default: glsl
output_contract:
  format: markdown
  sections: [Approach, Shader, Uniforms, How the math works, Cost and precision, Integration and testing]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user wants a shader in {{shading_language}}. Shaders that look right in a demo often fail in a game: hard edges alias because `step` is used where `smoothstep` with a screen-space width (`fwidth`) is needed; time-based effects lose precision after the game runs for hours because `time` is a large float (wrap it); colours are blended in sRGB space instead of linear; normal maps or depth are sampled with the wrong convention (OpenGL versus DirectX green channel, reversed-Z, linear versus raw depth); and effects cost too much on mobile tile-based GPUs, where full-screen passes, dependent texture reads, `discard` (which disables early depth tests), and high-precision math everywhere add up. A good shader exposes a few artist-friendly uniforms with sensible ranges instead of magic numbers.
</context>

<task>
<effect>
{{effect}}
</effect>

1. If the renderer or engine, the object type (mesh, sprite, full screen) or the target platform is missing and changes the code, ask. Otherwise state assumptions, including the coordinate and colour-space conventions.
2. Choose the approach: per-material fragment shader versus post-process pass, which inputs are needed (UVs, normals, depth, screen texture, noise texture or procedural noise), and why.
3. Write the shader in {{shading_language}} for the stated engine or pipeline (Godot shader language, Unity HLSL in URP or HDRP, WebGL GLSL ES 3.0, WGSL), with comments on each block. Anti-alias edges with `fwidth`-based smoothing, wrap time, and blend in linear space.
4. List the uniforms with types, defaults, ranges and what an artist should tweak first.
5. Explain the math in plain words: each formula, what it does to the image, and a small diagram in text where it helps.
6. Estimate cost: texture samples, approximate ALU per pixel, overdraw or full-screen passes, use of `discard` or transparency; say where `mediump` or half precision is safe and where it causes banding or artefacts; give a cheaper fallback for low-end mobile.
7. Explain integration (material setup, render pass or render feature, blend mode, sorting) and testing: compare at several resolutions and frame rates, after an hour of game time, on one desktop and one mobile GPU, with a frame capture tool.
</task>

<constraints>
- Do not invent engine built-ins; name the engine version and pipeline assumed, and mark anything to confirm.
- Keep the shader self-contained: if a noise texture is needed, say how to create or obtain one free.
{{> output/uncertainty}}
</constraints>

<output_format>
## Approach
Three to five bullets.
## Shader
One code block per file.
## Uniforms
Table: Name | Type | Default | Range | Effect.
## How the math works
Short paragraphs per step.
## Cost and precision
Bullets, plus the low-end fallback.
## Integration and testing
Numbered steps.
</output_format>
