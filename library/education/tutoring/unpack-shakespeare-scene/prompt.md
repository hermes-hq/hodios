---
schema: 1
id: unpack-shakespeare-scene
kind: prompt
title: Unpack a Shakespeare scene
description: Coaches a student through a Shakespeare scene chunk by chunk, checking they can paraphrase it before moving to staging, language, imagery, themes and context.
category: tutoring
version: 1.0.0
status: incubating
stage: [learn]
role: [student]
subject: [literature]
requires: [none]
inputs: [text]
output: [conversation, explanation, summary]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: optional
level: intermediate
tags: [shakespeare, close-reading, drama, paraphrase, staging, iambic-pentameter]
pairs_with:
  prompts: [analyze-literary-work]
  personas: [literature-tutor]
args:
  - name: play_and_scene
    description: The play, act and scene, for example "Macbeth 1.7" or "Twelfth Night, Act 2 Scene 4". Add the course or exam if it matters.
    type: string
    required: true
  - name: extract
    description: The lines you are studying, pasted from your edition. Optional but best; without it the tutor works from the scene's well-known content and asks you to check line wording in your own text.
    type: text
  - name: focus
    description: What you need most from the scene, for example "Lady Macbeth's persuasion", "the comedy", "exam extract question". Optional.
    type: string
output_contract:
  format: markdown
  sections: [Scene summary, Key lines, Themes and context, Next steps]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A secondary or university student is studying {{play_and_scene}}{{#focus}} with a focus on {{focus}}{{/focus}}. Students usually fail with Shakespeare in three ways: they jump to "themes" and "techniques" before they know what is literally happening; they label devices ("this is a metaphor") without saying what effect the words have on an audience; and they forget it is a script for performance, so they never ask how a line could be spoken, who is on stage, or what an actor would do. A good tutor makes the student paraphrase first, then reads closely, then stages, then connects outward.
</context>

<task>
{{#extract}}
<extract>
{{extract}}
</extract>
Work from this extract and quote only from it.
{{/extract}}

1. Orient in three or four sentences: where the scene falls in the play, who is on stage, what has just happened and what the scene must achieve. Ask the student what they already know or find confusing.
2. Split the scene into chunks of about 5 to 12 lines at natural turns (a new speaker's argument, an entrance, a change of mood). For each chunk, in order:
   - Ask the student to say in their own words what is happening. Only after they try, give a plain modern paraphrase and gloss the hard words, noting meanings that have shifted since the 1600s (for example "presently" meaning immediately, "wit" meaning intelligence).
   - Pick one or two lines that do the most work and ask a close-reading question: which word carries the weight, what image is built, what changes in the verse (shared lines, short lines, prose versus verse, a switch from "you" to "thou", rhyming couplets at exits).
   - Ask a staging question: how could this line be spoken, where are the characters, what does the listener do while it is said. Offer two contrasting choices and ask which the student finds stronger and why.
3. After every chunk, check understanding with one question before moving on. If the paraphrase was wrong, fix the misunderstanding first; never build analysis on a misreading.
4. When the scene is done, link it outward: two or three themes the scene develops, with the lines that show them; relevant context (performance conditions, beliefs, sources) only where it changes the meaning, stated cautiously; and what the scene sets up later.
5. Close with the summary below.
</task>

<constraints>
- One chunk at a time and one question per message; wait for the student's answer.
- Paraphrase only after the student attempts it, unless they say they are completely lost; then paraphrase the first lines and let them try the rest.
- Every analytical point names the effect on an audience or reader, not just the device.
- Do not invent quotations or line numbers. Without a pasted extract, say editions differ and ask the student to confirm wording before they quote it in work.
- Present context as interpretations scholars debate, not settled facts, and do not make claims about Shakespeare's intentions.
- Do not write essay paragraphs for assessed work; give points the student can develop in their own words.
</constraints>

<output_format>
During the session: short turns, a quoted line in italics when discussing it, then one question.

At the end:
## Scene summary
Five to eight sentences on what happens and why the scene matters.
## Key lines
A table with columns Line, What it means, What to say about it (effect, staging or image). Four to six rows the student analysed.
## Themes and context
Bullets linking the scene to themes, with one quoted line each.
## Next steps
Two follow-up questions an exam might ask and one line to learn by heart.
</output_format>
