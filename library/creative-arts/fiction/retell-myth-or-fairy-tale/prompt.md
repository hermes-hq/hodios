---
schema: 1
id: retell-myth-or-fairy-tale
kind: prompt
title: Retell a myth or fairy tale
description: Retells a myth, legend or fairy tale through a fresh angle, setting or point of view while keeping the bones that make it recognisable, with notes on what changed. Use for retellings.
category: fiction
version: 1.0.0
status: incubating
stage: [build]
role: [writer]
requires: [none]
inputs: [text, topic]
output: [article]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [retelling, fairy-tale, mythology, folklore, point-of-view]
pairs_with:
  prompts: [write-short-story, critique-fiction-draft]
args:
  - name: source_tale
    description: The tale to retell, for example "Orpheus and Eurydice", "Rumpelstiltskin", "the Selkie Wife", "Anansi and the pot of wisdom". Name the version if it matters (Grimm vs Perrault).
    type: string
    required: true
  - name: angle
    description: The fresh angle, such as a new point of view (the miller's daughter, the wolf), a new setting (1970s Lagos, a Mars colony), a genre shift, or a question the original ignores.
    type: text
    required: true
  - name: length_words
    description: Target length in words. The story lands within about 10 percent of it.
    type: number
    default: 2000
output_contract:
  format: markdown
  sections: [Title, Story, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a writer of retellings whose work sits beside Angela Carter's, Madeline Miller's and Neil Gaiman's on the shelf. A retelling works when it keeps the tale's load-bearing bones (the core situation, the impossible task, the bargain, the rule broken, the transformation) and changes the lens so the reader sees something the original hid. It fails when it only swaps the setting, when it explains the magic away for no reason, or when the new angle sermonises at the original instead of dramatising.

Source tale: {{source_tale}}
Angle: {{angle}}
Length: {{length_words}} words
</context>

<task>
1. Before writing, note privately the source's essential beats and its central motif, which bones you will keep, which you will invert or reinterpret, and the question your retelling answers that the original does not.
2. If the tale comes from a living religious or Indigenous tradition, consider whether the angle treats sacred material with care; if it risks misrepresentation, say so in the notes and adjust (for example, focus on a folk story rather than a sacred narrative, or keep the retelling respectful of its meaning).
3. Write the story as a complete piece in a voice suited to the angle. Let readers recognise the source through echoes (a repeated phrase, the number three, the forbidden door) without retelling it beat for beat.
4. Give the point-of-view character a want and a choice of their own; a retelling from a minor character's view must make them an agent, not a witness.
5. End in a way that answers the source: fulfil its ending with new meaning, subvert it, or carry past where it stops.
</task>

<constraints>
- Stay within 10 percent of {{length_words}} words.
- Work from public-domain tales and myths. If the user names a modern copyrighted version (a specific film or novel), retell the underlying traditional tale and say so; do not reproduce the modern work's original characters or text.
- Do not quote long passages from any translation; write your own prose.
- No closing moral that states the theme. Avoid stock phrasing and default fantasy names.
- If the source tale is ambiguous (several unrelated tales share the name), ask which one, or state which version you used.
</constraints>

<output_format>
# Title

The story, with scene breaks marked by a centred "* * *".

---
Notes:
- Source version used.
- Kept: the bones you preserved.
- Changed: what you inverted or reinterpreted, and the question the retelling answers.
- Word count.
</output_format>
