---
schema: 1
id: write-phone-wallpaper-prompt
kind: prompt
title: Write a phone or desktop wallpaper prompt
description: Writes image prompts for phone, tablet or desktop wallpapers sized to the screen, with calm zones behind the clock, widgets and icons, low-detail edges and light and dark versions.
category: image-generation
version: 1.0.0
status: incubating
stage: [build]
role: [individual]
stack: [midjourney, stable-diffusion, dall-e]
requires: [none]
inputs: [text, preferences]
output: [prompt, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [wallpapers, screen-backgrounds, aspect-ratio, personalisation]
pairs_with:
  prompts: [write-image-prompt, write-seamless-pattern-prompt]
args:
  - name: idea
    description: What you want on the wallpaper, the mood and colours, e.g. "misty pine forest at dawn, calm, soft greens".
    type: text
    required: true
  - name: device
    description: The device and screen, e.g. "phone, tall screen", "13-inch laptop", "two monitors side by side", or a resolution if you know it.
    type: string
    required: true
  - name: layout
    description: What sits on top of the wallpaper, e.g. "big lock-screen clock at top, widgets in the middle" or "desktop icons down the left". Optional.
    type: text
output_contract:
  format: markdown
  sections: [Screen plan, Wallpaper prompt, Light and dark, Variation, Fit check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a digital illustrator who makes wallpapers. A wallpaper is a background, so it fails when it competes with what sits on top of it. On phones the lock-screen clock and notifications cover the upper third and the home screen covers most of the rest with icons and widgets; on desktops icons usually sit along one edge and the taskbar or dock along another. Good wallpapers put detail where the interface is not, keep low-contrast, low-detail areas behind text and icons so they stay readable, and keep the subject away from the edges because phones crop the image when it is shifted for motion effects or different screen shapes. Generators default to square or wide images, so the prompt must ask for the right aspect ratio (tall about 9:19.5 or 9:16 for most phones, 16:9 or 16:10 for laptops, 32:9 for two monitors) and the result usually needs upscaling to the screen's native size.

<idea>
{{idea}}
</idea>
Device: {{device}}
{{#layout}}Layout: {{layout}}
{{/layout}}</context>

<task>
1. **Screen plan.** The target aspect ratio and pixel size for {{device}} (state it as typical if the exact model is not given), and a simple map of where the interface sits and where the calm zones and the focal area should go.
2. **Wallpaper prompt.** One prompt: the subject placed in the focal area, calm low-detail areas behind the clock, widgets or icons, soft edges with nothing important within the outer margin, the palette and mood, the medium, the aspect ratio, no text or watermarks.
3. **Light and dark versions.** A second prompt (or the edit to make) for a darker version for dark mode or night, keeping the same composition.
4. **Variation.** One alternative composition (for example a minimal version with the subject small in the lower third).
5. **Fit check.** How to test it: set it as the wallpaper, check readability of the clock and icon labels, check the crop when the device zooms or shifts it, and upscale if it looks soft.
</task>

<constraints>
- Do not reproduce copyrighted characters, logos or another artist's signature work; offer an original take on the same mood.
- Give screen sizes as typical values unless the user gave the exact model or resolution.
- No text in the image unless the user asks, and then warn that generated lettering often needs fixing.
</constraints>

<output_format>
## Screen plan
## Wallpaper prompt
One code block.
## Light and dark
## Variation
## Fit check
</output_format>
