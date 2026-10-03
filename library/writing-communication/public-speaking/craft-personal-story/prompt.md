---
schema: 1
id: craft-personal-story
kind: prompt
title: Craft a personal story
description: Shapes a personal anecdote into a tellable story with a hook, stakes, a turning point and a point, in versions for a talk, an interview answer and a toast, using only what happened.
category: public-speaking
version: 1.0.0
status: incubating
stage: [build]
role: [individual, job-seeker, founder, manager]
requires: [none]
inputs: [text, notes]
output: [script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [storytelling, anecdote, story-structure, star-method, toast]
pairs_with:
  prompts: [write-speech, write-lightning-talk]
  personas: [speechwriter, speaking-coach]
args:
  - name: raw_story
    description: What happened, in your own words, however messy. Include where you were, who was there, what you thought or felt, what changed, and anything someone said that stuck.
    type: text
    required: true
  - name: where_it_will_be_told
    description: "The main occasion, for example \"keynote at a nursing conference\", \"job interview: tell me about a failure\", \"my sister's wedding toast\" or \"team offsite opener\"."
    type: string
    required: true
  - name: time_limit
    description: "Optional: how long you have for the main telling, for example \"2 minutes\" or \"90 seconds\"."
    type: string
output_contract:
  format: markdown
  sections: [Story spine, Main version, Other versions, Gaps to fill, Telling it]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most personal stories are told in the order they happened, with the setup taking half the time and the point arriving as an afterthought. Stories that land have a shape: a hook that starts close to the action, a specific moment rather than a summary, stakes (what could be lost), a turning point where something changes, and a point that connects to why the listener is hearing it. The same experience needs different shapes for different rooms: a talk can afford a scene and a pause; an interview answer must show what the speaker did and learned in about 90 seconds; a toast makes the honoree the hero and lands warmly in under a minute.
</context>

<task>
Turn this into a story to tell at: {{where_it_will_be_told}}
{{#time_limit}}Time for the main telling: {{time_limit}}.{{/time_limit}}

<raw_story>
{{raw_story}}
</raw_story>

1. If the raw story has no event (only a general view or lesson), ask for one specific moment when it happened and stop.
2. Find the spine: the hook (the moment to start on), the context needed (as little as possible), the stakes, the turning point, the resolution and the point. Say what to cut.
3. Write the main version for where it will be told, in spoken language, fitted to the time limit at about 130 words a minute (default: two minutes for a talk, 90 seconds for an interview, 45 seconds for a toast).
4. Write the two other versions briefly, so the story is ready for any of: a talk (scene, pause, point for the audience), an interview answer (situation, task, action, result, then what I learned, with "I" not "we"), and a toast (the honoree at the centre, warm, ending on the raise of a glass). Skip any version that would be inappropriate for the material, and say why.
5. List missing details that would make it stronger, as questions.
</task>

<constraints>
- Truth only: do not invent events, dialogue, sensory details, feelings, outcomes or numbers. Where a vivid detail would help but is missing, put a `[ADD: …]` slot and list it as a question.
- Start in the moment, not with "So, back in 2016…". Use present tense for the key scene if it suits the speaker.
- Spoken style: short sentences, one idea per sentence, a line of dialogue if the raw story has one, and a deliberate pause before the turning point.
- The point must be stated in one sentence and fit the occasion; avoid a moral that sounds like a poster.
- For toasts, do not include embarrassing details, ex-partners, or stories that would hurt the honoree or their family in the room.
- Show word counts so the speaker can check timing.
</constraints>

<output_format>
## Story spine
A list: Hook, Context, Stakes, Turning point, Resolution, Point. Then "Cut:" with what to leave out.
## Main version
The script with a word count and estimated time.
## Other versions
Two short sections with headings for the other formats, each with a word count, or a line saying why one was skipped.
## Gaps to fill
Questions for missing details, matched to the `[ADD: …]` slots.
## Telling it
Three bullets: where to pause, which line to say exactly as written, and how to end.
</output_format>
