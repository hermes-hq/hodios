---
schema: 1
id: write-short-story
kind: prompt
title: Write a short story
description: Writes a complete short story from a premise to a target length, point of view, tone and ending type, built around one change and free of stock phrasing. Use for a first draft or a model to study.
category: fiction
version: 1.0.0
status: incubating
stage: [build]
role: [writer]
requires: [none]
inputs: [text]
output: [article]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
tags: [flash-fiction, first-draft, point-of-view, story-ending]
pairs_with:
  prompts: [critique-fiction-draft, outline-story]
args:
  - name: premise
    description: The premise or situation, plus anything required (characters, setting, an image or line to include).
    type: text
    required: true
  - name: length_words
    description: Target length in words. The story lands within about 10 percent of it.
    type: number
    default: 1500
  - name: pov
    description: Point of view and tense, for example "close third, past tense" or "first person present". Optional; chosen to suit the premise if missing.
    type: string
  - name: tone
    description: Tone, for example "wry", "eerie and quiet" or "warm". Optional.
    type: string
  - name: ending
    description: Ending type, for example "resolved", "open", "bittersweet" or "twist". Optional; chosen to suit the story if missing.
    type: string
output_contract:
  format: markdown
  sections: [Title, Story, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a short-story writer whose work appears in literary and genre magazines. A short story has room for one central change: a character sees, decides or loses something, and the story is shaped so that moment lands. It starts as late as possible, trusts the reader with gaps, and earns its ending from details planted earlier.

Premise: {{premise}}
Target length: {{length_words}} words
{{#pov}}Point of view: {{pov}}{{/pov}}
{{#tone}}Tone: {{tone}}{{/tone}}
{{#ending}}Ending: {{ending}}{{/ending}}
</context>

<task>
1. Before writing, decide privately: the protagonist's want in this story, the single change the story turns on, the opening image, and the final image that answers it. If point of view, tone or ending were not given, pick what serves the premise best.
2. Plant early what the ending needs: an object, a line or a detail that returns transformed.
3. Write the story in scenes, with summary only for bridges. Open in motion, inside a specific moment, not with weather, waking up or backstory.
4. Ground every scene in concrete, specific sensory detail chosen for this character's eye.
5. Land the ending in the final paragraph through action or image, without stating the lesson. A twist must be fair: re-reading should reveal it was set up.
6. Revise once against the constraints below before you output.
</task>

<constraints>
- Stay within 10 percent of {{length_words}} words.
- Keep the point of view and tense consistent; no head-hopping.
- Avoid stock phrasing and names that read as machine-generated: "a testament to", "tapestry", "the air was thick with", "little did she know", "a breath she didn't know she was holding", eyes that "sparkle with mischief"; names like Elara, Kael or Lyra unless the user asks.
- No dream endings, no "it was all a simulation", no deus ex machina, no closing moral.
- Dialogue carries subtext; characters do not explain their feelings to each other.
- If the premise asks for content you will not write, write the closest version you can and say what you changed in the notes.
</constraints>

<output_format>
# Title

The story, in paragraphs with standard dialogue punctuation. Scene breaks marked with a centred "* * *" line.

---
Notes: word count, the point of view and ending you chose if they were not given, and one sentence on what the story turns on.
</output_format>
