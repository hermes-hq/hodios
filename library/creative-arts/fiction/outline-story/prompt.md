---
schema: 1
id: outline-story
kind: prompt
title: Outline a story
description: Outlines a story in a chosen structure with beats, subplots and turning points, and flags every link where events follow by coincidence instead of cause. Use before drafting.
category: fiction
version: 1.0.0
status: incubating
stage: [plan]
role: [writer]
requires: [none]
inputs: [text, notes]
output: [outline]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [plot-structure, three-act, save-the-cat, causality]
pairs_with:
  prompts: [develop-character, check-story-continuity]
  workflows: [story-development-track]
args:
  - name: premise
    description: The premise, plus any characters, setting, theme or set pieces you already have.
    type: text
    required: true
  - name: structure
    description: Story structure to outline in.
    type: enum
    enum: [three-act, save-the-cat, heros-journey, kishotenketsu]
    default: three-act
  - name: length
    description: Target length; sets the number of beats, scenes and subplots.
    type: enum
    enum: [short-story, novella, novel]
    default: novel
output_contract:
  format: markdown
  sections: [Logline, Spine, Beat outline, Subplots, Causality check, Open decisions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a story editor who outlines with writers before they draft. A structure is a diagnostic, not a template: its job is to make sure the story turns at the right moments and that each turn is caused by what came before. The test you apply to every link between beats is "therefore" or "but", never "and then". Coincidence may get a character into trouble; it must never get them out.

Premise: {{premise}}
Structure: {{structure}}
Length: {{length}}
</context>

<task>
1. If the premise has no clear protagonist, no goal or no source of opposition, ask for the missing piece in up to three questions and stop. Otherwise state any assumptions in one line each.
2. Write a one-sentence logline and the spine: protagonist, want, opposition, stakes, and the dramatic question the ending answers.
3. Outline in the chosen structure:
   - three-act: setup, inciting incident, lock-in at the end of act one, rising complications, midpoint reversal, crisis, climax, resolution.
   - save-the-cat: the 15 beats from opening image to final image, with approximate page or percentage marks.
   - heros-journey: the stages that actually apply to this story; say which you are skipping and why rather than forcing all twelve.
   - kishotenketsu: ki (introduction), sho (development), ten (an unexpected turn or juxtaposition, not necessarily conflict), ketsu (reconciliation that recasts the first two parts). Do not smuggle in a Western conflict climax.
4. Scale to length: short-story = one plotline, 4 to 8 beats; novella = main plot and at most one subplot, 10 to 20 scenes; novel = main plot plus two or three subplots, 40 to 70 scenes summarised by sequence.
5. For each subplot give its own mini-arc and the beats where it collides with or reflects the main plot. A subplot that never touches the main plot gets flagged.
6. Run the causality check: walk every beat-to-beat link and mark it "therefore", "but" or "and then". List every "and then", every coincidence that helps the protagonist, and every turning point the protagonist does not cause or choose, with a concrete fix for each.
</task>

<constraints>
- Turning points must change the protagonist's situation or understanding, not just add events.
- The climax must be decided by a choice or action of the protagonist that draws on the arc.
- Keep beat descriptions to one or two sentences; this is an outline, not a draft.
- Do not change the premise to make it fit the structure. If the chosen structure fits poorly, say so and suggest the better fit, then outline in the one asked for.
</constraints>

<output_format>
## Logline
## Spine
Protagonist, want, opposition, stakes, dramatic question. Assumptions, if any.
## Beat outline
A table: # | Beat | What happens | Link to next (therefore / but / and then) | Approx. position (% of story).
## Subplots
For each: name, mini-arc in three to five beats, collision points with the main plot.
## Causality check
Numbered problems: beat number, the issue, the fix.
## Open decisions
Choices the author must make, two to five bullets.
</output_format>
