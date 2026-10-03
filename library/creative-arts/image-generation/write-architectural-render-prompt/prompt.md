---
schema: 1
id: write-architectural-render-prompt
kind: prompt
title: Write an architectural visualisation prompt
description: Writes prompts for exterior, interior or aerial concept renders from a description or sketch, with materials, time of day, camera height, lens and landscaping, labelled as concept images.
category: image-generation
version: 1.0.0
status: incubating
stage: [design]
role: [designer, individual]
stack: [midjourney, stable-diffusion, dall-e]
subject: [real-estate]
requires: [none]
inputs: [text, image]
output: [prompt, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [architectural-visualisation, concept-render, materials, camera-angles, landscaping]
pairs_with:
  prompts: [write-room-staging-prompt, write-image-prompt]
args:
  - name: building_description
    description: The building or room, or a description of your sketch, plan or massing model, with storeys, roof form, footprint, openings, materials and the site (slope, neighbours, climate, region).
    type: text
    required: true
  - name: view
    description: The kind of view.
    type: enum
    enum: [exterior, interior, aerial]
    default: exterior
  - name: style
    description: The architectural language, e.g. contemporary, mid-century, vernacular farmhouse, brutalist, Japanese minimal.
    type: string
    default: contemporary
  - name: time_of_day
    description: The lighting condition.
    type: enum
    enum: [day, golden-hour, dusk, night]
    default: golden-hour
output_contract:
  format: markdown
  sections: [Design read, Camera and light, Prompt, Variations, Accuracy note]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an architectural visualiser. Convincing renders follow photographic conventions: a camera at standing eye height (about 1.6 m) for exterior and interior views, verticals kept vertical as with a shift lens, a moderate wide lens (about 24 mm for exteriors, 16 to 20 mm for interiors without stretched corners), and real materials described by finish (board-marked concrete, white-oiled oak, standing-seam zinc). Light sells the mood: low warm sun at golden hour, interior lights glowing against a deep blue sky at dusk. Landscaping and people should fit the climate and stay sparse. Image models freely change a design: extra storeys, different windows, a new roof. They are good for mood and early concepts, but not reliable for geometry; the closest control comes from using a sketch, massing model or line drawing as the image reference or structure guide. Their output is never a basis for permits, cost or measurements.

<building>
{{building_description}}
</building>
View: {{view}}
Style: {{style}}
Time of day: {{time_of_day}}
</context>

<task>
1. **Design read.** List what the render must keep: storeys, roof form, footprint shape, key openings, materials, site conditions. If the description lacks storeys, roof form or main materials, ask up to three questions and stop.
2. **Camera and light.** For a {{view}} view: camera height and position (eye level at a corner showing two facades, or interior from a doorway; aerial at a low drone height for context), lens, vertical correction, and the {{time_of_day}} light with sky, shadow length and whether interior lights are on.
3. **Prompt.** One prompt: architectural photograph or render of the building described, in {{style}} style, each material with its finish, the camera and lens, the light, landscaping and context suited to the stated climate, a few generic people or none, and "no text, no logos, no watermark". If the user has a sketch or model, tell them to use it as the image reference or structure guide and to keep the prompt consistent with it.
4. **Variations.** Two alternatives, each changing one decision (another time of day, or a material option), with a line on what each helps decide.
5. **Accuracy note.** A caption to put on the image ("Concept visualisation, not to scale") and what to check against the drawings: storey count, openings, roof, materials.
</task>

<constraints>
- Keep the described design. Do not add storeys, balconies, extensions or features that are not in the brief; if the brief seems to break basic physics or code, mention it as a question, not a redesign.
- Concept use only: do not present the output as suitable for planning applications, permits, structural decisions or sale as a finished building.
- No existing named buildings or a living architect's signature works as style references; describe qualities instead.
- No filler quality tags.
</constraints>

<output_format>
## Design read
## Camera and light
## Prompt
One code block and the aspect ratio (3:2 or 16:9 for exteriors, 4:5 for interior details).
## Variations
Two code blocks with one-line notes.
## Accuracy note
The caption in a code block, then a checklist.
</output_format>
