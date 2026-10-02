---
schema: 1
id: design-plot-twist
kind: prompt
title: Design a plot twist
description: Designs plot twists that feel surprising yet inevitable, naming the reader's false assumption, the reveal, which clues to plant where and how to hide them. Use for novels and screenplays.
category: fiction
version: 1.0.0
status: incubating
stage: [design]
role: [writer]
requires: [none]
inputs: [text, notes]
output: [ideas, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [plot-twist, foreshadowing, misdirection, story-structure]
pairs_with:
  prompts: [outline-story, write-beat-sheet, check-story-continuity]
  personas: [fiction-writing-mentor, script-consultant]
args:
  - name: story_summary
    description: The story so far or as planned, including point of view, the main characters and their secrets if any, the key events in order and the current ending. The more of the plan you include, the better the clues can be placed.
    type: text
    required: true
  - name: constraints
    description: Anything the twist must or must not do, e.g. "the detective must stay sympathetic", "no amnesia or twins", "it should land at the midpoint", "keep the ending".
    type: text
    default: none
output_contract:
  format: markdown
  sections: [Reading of the story, Twist options, Recommendation, Clue plan, Fairness check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A good twist works in both directions. Forwards, it surprises because the reader has been led, fairly, to a wrong assumption. Backwards, it feels inevitable because the clues were on the page all along and the twist makes earlier scenes mean more, not less. Twists fail when they come from nowhere (no clues), when they cheat (the point-of-view character hides what they know without any signal, a fact is simply withheld, coincidence or a dream undoes events), when the reader guesses them early (clues too loud), or when they are surprising but meaningless because they change nothing about the characters or the theme. The craft is in choosing the assumption to exploit, then planting clues that are visible but read as something else.
</context>

<task>
Design a twist for this story.

<story>
{{story_summary}}
</story>

Constraints: {{constraints}}

1. **Reading of the story:** in three or four lines, state the protagonist, the central question, the point of view and how much the narrator knows, and the assumptions the reader is most likely to make at each stage. If the summary lacks the point of view or the main events in order, ask for them (at most three questions) and stop.
2. **Twist options:** three distinct twists, using different kinds where the story allows (identity, motive, allegiance, timeline, nature of the world, what the protagonist has done, the meaning of an earlier event). For each give:
   - **The assumption:** what the reader believes, and what makes them believe it;
   - **The reveal:** what is actually true, and the scene in which it surfaces;
   - **Why it is inevitable:** three earlier moments that will read differently on a second pass;
   - **What it changes:** the effect on the protagonist's choices, the stakes and the theme from the reveal onwards;
   - **Risk:** how a genre-savvy reader might guess it, or what it could break.
3. **Recommendation:** pick one, or a combination, and say why it serves this story's theme and point of view best.
4. **Clue plan** for the recommended twist, as a table: where in the story (chapter, act or beat), the clue, how it is disguised (buried in a list, given during an action scene, explained away by another character, placed next to a louder red herring, delivered as a joke), and what the reader thinks it means at the time. Plant at least four clues spread across the story, with the first well before the midpoint. Add one or two red herrings that point to the false assumption, each with a fair explanation after the reveal.
5. **Fairness check:** confirm that the point-of-view character does not lie to the reader in narration without a signal, that the reveal follows from established facts, that no coincidence or new character does the work, and that the reveal scene shows the truth through action or discovery rather than a long explanation. Note anything the author must change earlier in the story to make the twist fair.
</task>

<constraints>
- Respect the constraints and the author's existing ending unless they invite changes; if the strongest twist needs a change, propose it separately and say what it costs.
- Avoid stock devices (it was all a dream, evil twin, amnesia reveal, "the narrator was dead all along") unless the constraints ask for them or you can show a fresh angle.
- Do not write the story's scenes. Describe beats and clues; quote at most a line when a clue depends on exact wording.
- Do not hand back the signature twist of a well-known book or film unchanged. If an option resembles one, or the author asks for one, say audiences will recognise it and adapt it so it grows from this story's characters and clues.
</constraints>

<output_format>
## Reading of the story
## Twist options
Three numbered options with the five labelled parts.
## Recommendation
## Clue plan
Table: Location | Clue | Disguise | What the reader thinks.
## Fairness check
</output_format>
