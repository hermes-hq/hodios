---
schema: 1
id: write-logline-and-synopsis
kind: prompt
title: Write a logline and synopsis
description: Writes three logline options and a one-page synopsis that make the hook, protagonist, stakes and ending clear for agents, producers or contests. Use when pitching a script or novel.
category: screenwriting
version: 1.0.0
status: incubating
stage: [ship]
role: [writer, artist]
requires: [none]
inputs: [text, document]
output: [copy, summary]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: intermediate
tags: [logline, synopsis, pitching, query-letter]
pairs_with:
  prompts: [format-screenplay-scene, outline-story]
args:
  - name: story
    description: "The story to pitch, including the ending: a treatment, outline, summary or the full script or manuscript."
    type: text
    required: true
  - name: genre
    description: Genre and medium, for example "feature thriller", "half-hour comedy pilot" or "YA fantasy novel". Optional.
    type: string
output_contract:
  format: markdown
  sections: [Loglines, Synopsis, Gaps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write pitch materials for screenwriters and novelists. A logline sells the concept in one breath: who the protagonist is (a descriptor, not a name), what happens to them, what they must do, what stands in the way and what they lose if they fail, with an ironic or surprising hook. A synopsis is a different tool: readers at agencies, studios and contests use it to judge whether the story works, so it tells the whole story, including the ending, plainly and in order.

Story:
{{story}}
{{#genre}}Genre and medium: {{genre}}{{/genre}}
</context>

<task>
1. Extract the protagonist, inciting incident, goal, antagonist or central obstacle, stakes, key turning points, climax and ending. If the material does not include the ending or the protagonist's goal, ask for it and stop; do not invent the ending.
2. Write three loglines, each at most 40 words, with a different emphasis: one leading with the hook or irony, one with character, one with stakes. Recommend one and say why in a sentence.
3. Write a one-page synopsis of 400 to 550 words: present tense, third person, the protagonist's name in capitals at first mention, then other main characters the same way. Open with the protagonist and their world in one or two sentences, then the inciting incident, the escalating turning points, the dark moment, the climax and the resolution, including how the protagonist has changed.
4. List gaps: places where the source material was unclear and you had to choose.
</task>

<constraints>
- The synopsis reveals the ending. No teasers, rhetorical questions or cliffhangers ("Will she survive?").
- Describe story, not marketing: no "in a world where", no "a gripping tale", no comparisons to famous titles unless the user supplies them.
- Name at most five characters in the synopsis; refer to the rest by role.
- Keep the tone of the synopsis close to the tone of the story (a comedy synopsis can be light).
- Do not add plot that is not in the source material.
</constraints>

<output_format>
## Loglines
1. Hook-led
2. Character-led
3. Stakes-led
Recommended: number and one-sentence reason.
## Synopsis
Prose paragraphs, then the word count in parentheses.
## Gaps
Bullets, or "None".
</output_format>
