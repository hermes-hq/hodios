---
schema: 1
id: write-setting-description
kind: prompt
title: Write a setting description
description: Writes setting descriptions filtered through a point-of-view character's senses, history and mood, in three lengths from a passing line to a full arrival passage. Use when a place feels flat.
category: fiction
version: 1.0.0
status: incubating
stage: [build]
role: [writer, gamer]
requires: [none]
inputs: [text]
output: [article, ideas]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
tags: [setting, sensory-detail, point-of-view, atmosphere]
pairs_with:
  prompts: [revise-show-dont-tell, design-fictional-geography, design-fictional-culture]
args:
  - name: setting
    description: The place, time of day, season and era, plus anything that must appear (an object, a landmark, a plot clue). Real or invented.
    type: text
    required: true
  - name: character
    description: Who is seeing it, e.g. "Ana, 40, ex-firefighter, back in her childhood home for her father's funeral". Their job, history and what they want right now shape what they notice. Leave blank for a neutral close observer.
    type: text
  - name: mood
    description: The feeling the passage should leave, e.g. "dread", "nostalgic warmth", "giddy freedom". Defaults to the mood implied by the character's situation.
    type: string
    default: auto
output_contract:
  format: markdown
  sections: [Lens, Brief, Medium, Extended, Detail bank]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Setting description goes flat when it reads like an estate agent's listing: a camera panning left to right, a stack of adjectives, everything visual, nothing that matters to anyone. On the page, a place exists only through someone's perception. A carpenter notices joinery, a thief notices exits, a grieving daughter notices the chair nobody sits in. What a character notices, what they ignore and the words they use for it characterise them, set the mood and can plant plot. The strongest descriptions choose a few specific, telling details over many general ones, use more than one sense, carry mood through verbs and selection rather than adjectives, and stay tied to what the character is doing.
</context>

<task>
Describe this setting:

<setting>
{{setting}}
</setting>

Point-of-view character: {{character}}
Mood: {{mood}}

1. **Lens:** in three or four lines, say what this character would notice first and why (job, history, current want or fear), which two senses beyond sight they would register, the dominant impression the place should make, and the one telling detail that carries the mood. If no character is given, use a neutral close observer, say so, and suggest how a specific character would change the lens. If {{mood}} is auto, state the mood you chose.
2. **Brief** (one or two sentences): for a scene in motion, when the character is busy and the reader needs just enough to orient.
3. **Medium** (one paragraph, about 100 to 150 words): for entering a scene, mixing description with a small action.
4. **Extended** (about 250 to 350 words): for an arrival or a turning point where the place itself matters. Move through the space as the character moves or their attention shifts, not in a fixed camera sweep; let one memory or judgement of the character surface; end on a detail that leads into action or tension.
5. **Detail bank:** eight to twelve specific details (sounds, smells, textures, temperatures, objects with history) the author can reuse later in the same location, each tagged with the mood or meaning it carries.
</task>

<constraints>
- Match the point of view and tense if the setting text or character note implies them; otherwise use close third person, past tense, and say so in the Lens.
- Prefer precise nouns and active verbs to adjective chains. At most one comparison (simile or metaphor) per paragraph, drawn from the character's own world.
- Avoid stock openings and phrases: weather as the first line, "the air was thick with", "a testament to", "nestled", "eerie silence", "bustling".
- For a real place, do not invent specific facts presented as real (street names, businesses, historical events); keep invented details plausible and generic, or mark them.
- Each version stands alone: do not make the Extended version simply the Medium version with more adjectives.
</constraints>

<output_format>
## Lens
## Brief
## Medium
## Extended
## Detail bank
A list: detail, then what it conveys.
</output_format>
