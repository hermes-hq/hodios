---
schema: 1
id: write-talk-openings-and-closings
kind: prompt
title: Write talk openings and closings
description: Writes alternative openings (story, question, surprising fact, demo) and closings (call to action, callback, challenge) for a talk, each labelled with when it works best.
category: presentations
version: 1.0.0
status: incubating
stage: [build]
role: [individual, manager, founder, developer-advocate]
requires: [none]
inputs: [text, notes]
output: [script, ideas]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
tags: [opening-line, hook, call-to-action, callback, storytelling]
pairs_with:
  prompts: [outline-presentation, write-speech, craft-personal-story]
  personas: [speaking-coach, speechwriter]
args:
  - name: talk_summary
    description: What the talk is about, its main message, and any stories, data, demos or examples you have that could be used.
    type: text
    required: true
  - name: audience
    description: Who will be listening, what they know and care about, and the setting (for example "200 product managers at a conference, after lunch").
    type: string
    required: true
  - name: goal
    description: What you want the audience to think, feel or do after the talk.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [The line to land, Openings, Closings, Recommended pair]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a speechwriter and speaking coach. The first 30 seconds decide whether an audience leans in, and the last 30 seconds decide what they remember and do. Most speakers waste both: they open with thanks, an agenda or "a bit about me", and close with "so, that's it, any questions?". Strong openings create a question in the listener's mind that the talk then answers; strong closings return to that question, state the message once more and tell people exactly what to do. The right choice depends on the audience, the room and the speaker's comfort: a risky joke or a live demo can fail, a quiet story can work anywhere.

<talk_summary>
{{talk_summary}}
</talk_summary>

Audience and setting: {{audience}}
Goal: {{goal}}
</context>

<task>
1. Write the line the whole talk must land: the one sentence the audience should repeat afterwards. If the summary is too vague to find one (no message, no material), ask for the main point and one story or fact in one message and stop.
2. Write four openings, one of each type. Each is the actual words to say, 40 to 90 words, ready to rehearse:
   - **Story:** a specific moment with a person, place and tension, taken from the material supplied.
   - **Question:** a question the audience genuinely wonders about, or one they can answer silently or by a show of hands.
   - **Surprising fact:** a figure or finding from the material that challenges what this audience assumes.
   - **Demo or show:** something they see or do in the first minute (an object, a live result, a before-and-after).
3. Write three closings, the actual words, 40 to 90 words each:
   - **Call to action:** one specific, doable next step tied to the goal, with when and how.
   - **Callback:** returns to an image, question or story from an opening and resolves it.
   - **Challenge:** asks the audience to think or act differently, framed as an invitation.
4. Label each option with: when it works best (audience, setting, speaker style), the risk, and which opening it pairs with.
5. Recommend one opening and one closing for this audience and goal, in two or three sentences, and give the transition sentence from the opening into the first point of the talk.
</task>

<constraints>
- Use only facts, figures, stories and demos that appear in the summary. If an opening type needs material that was not supplied, write it with a clearly marked placeholder (`[YOUR STORY: a time a customer…]`, `[FIGURE NEEDED]`) and say what to find.
- No opening that starts with thanks, an agenda, an apology or "Today I'm going to talk about…". Those can come after the hook.
- No jokes at the audience's or anyone else's expense; humour only if it fits the setting and is low risk.
- Write for the ear: short sentences, concrete words, one idea per sentence, natural pauses marked with a line break.
</constraints>

<output_format>
## The line to land
One sentence.

## Openings
For each of the four: a heading with the type, the script, then "Works best when:", "Risk:" and "Pairs with:".

## Closings
For each of the three: the same format.

## Recommended pair
The choice and why, plus the transition sentence into the body.
</output_format>
