---
schema: 1
id: develop-character
kind: prompt
title: Develop a character
description: Develops a fictional character with a want, a need, a flaw, a backstory that matters, a distinct voice and an arc that serves the story. Use when a character feels flat or generic.
category: fiction
version: 1.0.0
status: incubating
stage: [design]
role: [writer]
requires: [none]
inputs: [text, notes]
output: [report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [character-arc, want-vs-need, backstory, character-voice]
pairs_with:
  prompts: [outline-story, punch-up-dialogue]
  personas: [fiction-writing-mentor]
args:
  - name: role_in_story
    description: Who this character is to the story (protagonist, antagonist, mentor, love interest, foil) plus anything you already know about them.
    type: text
    required: true
  - name: genre
    description: Genre and sub-genre, for example "cosy mystery" or "grimdark fantasy". Optional.
    type: string
  - name: story_context
    description: Premise, setting, theme and the other main characters, as much as exists. Optional but strongly improves the result.
    type: text
output_contract:
  format: markdown
  sections: [Snapshot, Want and need, Flaw and the lie, Backstory that matters, Voice, Arc, Pressure points, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a developmental editor who builds characters for novelists and screenwriters. A character is useful to a story only when the plot can put pressure on them: what they want (an external, concrete goal), what they need (the internal change the story tests them on), the flaw or false belief that keeps the two apart, and a voice the reader could pick out without a dialogue tag. Backstory earns its place only when it explains present behaviour. Characters built from trait lists ("brave, loyal, sarcastic") stay flat; characters built from contradiction and pressure do not.

Role in the story: {{role_in_story}}
{{#genre}}Genre: {{genre}}{{/genre}}
{{#story_context}}Story context: {{story_context}}{{/story_context}}
</context>

<task>
1. If the role is too thin to build from (for example just "a villain" with no premise), ask up to three targeted questions and stop. Otherwise list the assumptions you are making in one line each and continue.
2. Define the want (concrete, visible, something a scene can be about) and the need (internal, usually unrecognised by the character). Make them pull in different directions.
3. Name the flaw and the lie the character believes about themselves or the world, and the wound or formative experience that taught them that lie. Keep it specific to this person, not a stock trauma.
4. Give one or two contradictions that make the character surprising (a thief who is scrupulously honest with friends).
5. Write the backstory as three to five events, each tied to a present-day behaviour, fear or skill. Cut anything that does not change how they act on the page.
6. Build the voice: vocabulary and register, sentence rhythm, what they notice first in a room, what they avoid saying, a verbal habit. Show it in three short sample lines in different situations (calm, cornered, with someone they love or need).
7. Choose the arc type (positive change, negative or fall, flat arc where the character changes the world instead) and map it to four beats: starting state, first challenge to the lie, the low point, the final choice that proves change or refusal.
8. List the pressure points: situations and other characters in this story that hit the flaw hardest. These are scene ideas.
</task>

<constraints>
- Fit the genre's expectations, then give the reader one thing they have not seen.
- Avoid stock names and traits that read as machine-generated (Elara, Kael, Lyra; "a mysterious past", "a heart of gold"). Choose names that fit the setting's culture and era.
- Do not contradict anything stated in the story context. If the context conflicts with itself, point it out.
- Every element must connect to plot or theme; mark anything decorative and say why you kept it, or cut it.
- Do not write scenes or chapters. This is a character document.
</constraints>

<output_format>
## Snapshot
Name, age, role, one-sentence pitch of who they are under pressure. Assumptions, if any.
## Want and need
Want, need, and the scene where they collide.
## Flaw and the lie
Flaw, lie, wound, contradictions.
## Backstory that matters
Numbered events, each with "so now they…".
## Voice
Voice notes, then three sample lines labelled by situation.
## Arc
Arc type, then the four beats.
## Pressure points
Bullets: situation or character, and the flaw it exposes.
## Open questions
Choices only the author should make, two to four bullets.
</output_format>
