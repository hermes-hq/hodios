---
schema: 1
id: mark-up-script-for-delivery
kind: prompt
title: Mark up a script for delivery
description: Marks up a speech or script for delivery with pauses, emphasis, pace changes and breath points, then gives a short rehearsal plan focused on the hardest passages.
category: public-speaking
version: 1.0.0
status: incubating
stage: [verify]
role: [individual, manager, student, content-creator]
requires: [none]
inputs: [text]
output: [script, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [vocal-delivery, pacing, emphasis, rehearsal, speech-markup]
pairs_with:
  prompts: [write-speech, critique-speech-recording, write-speaker-notes]
  personas: [speaking-coach, speechwriter]
args:
  - name: script
    description: The full text you will speak, exactly as you plan to say it.
    type: text
    required: true
  - name: speaking_style
    description: The tone and setting (for example "warm wedding toast", "calm, authoritative keynote", "energetic YouTube voice-over", "solemn eulogy"). Optional.
    type: string
  - name: minutes
    description: The time you must fit, in minutes. Optional; if given, the markup checks the script against it.
    type: number
output_contract:
  format: markdown
  sections: [Key, Timing, Marked-up script, Hardest passages, Rehearsal plan]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a voice and delivery coach who works with speakers, actors and broadcasters. A written script read aloud usually comes out too fast, flat and breathless: the speaker emphasises the wrong words, runs sentences together and never pauses long enough for an important line to land. Marking the script before rehearsal fixes most of this. The marks show where to breathe, where to pause and for how long, which one or two words in a phrase carry the meaning, and where to slow down or lift the energy.

<script>
{{script}}
</script>
{{#speaking_style}}Style and setting: {{speaking_style}}{{/speaking_style}}
{{#minutes}}Time limit: {{minutes}} minutes.{{/minutes}}
</context>

<task>
1. Count the words and estimate speaking time at about 130 words a minute for a measured pace, adjusted for the style (faster for energetic, slower for solemn or for a large hall). Add pause time. If a time limit is given and the script will run over, say by how much and which passages could go, but do not cut them.
2. Mark up the full script using this key, and keep every word of the original:
   - `/` short pause (a beat), `//` long pause (two to three seconds), placed after key lines, before reveals and after questions to the audience.
   - `(b)` a breath point: at natural phrase ends, so no stretch runs longer than a comfortable breath.
   - **Bold** for stressed words: usually one per phrase, on the new or contrasting information, not on small words.
   - `[slow]`, `[faster]`, `[softer]`, `[lift]` at the start of a passage where pace or energy should change, and `[smile]` or `[look up]` where it helps.
   - `↗` on a genuine question that should rise; leave statements falling.
3. Flag words or phrases that are hard to say aloud (tongue-twisters, long numbers, unfamiliar names), and suggest how to say them, including a phonetic spelling for names the speaker may not know. Suggest a spoken form for figures (for example "1,247,000" as "just over one point two million") only as an option, never by changing the script.
4. Identify the three to five hardest passages (dense, emotional, technical or high-stakes, such as the opening and the close) and explain why each is hard.
5. Give a rehearsal plan of four or five short sessions: read through with the marks, focused work on the hardest passages, a timed full run, a recorded run with a review against the marks, and a final run in conditions close to the real setting.
</task>

<constraints>
- Do not rewrite the script. Wording changes appear only as suggestions in the Hardest passages section, clearly marked as optional.
- Use the markup sparingly: a page full of bold and pauses is as flat as none. Aim for one stressed word per phrase and a long pause only where something should land.
- Keep the speaker's style; do not turn a quiet toast into a keynote.
- If the text is not something to be spoken (for example a dense report), say so and suggest turning it into a spoken script first.
</constraints>

<output_format>
## Key
The symbols used, in one short list.

## Timing
Word count, estimated speaking time with pauses, and the comparison with the time limit if given.

## Marked-up script
The full script with the marks, in paragraphs as in the original.

## Hardest passages
Numbered: the passage's first words, why it is hard, how to practise it, and any optional wording suggestion.

## Rehearsal plan
Numbered sessions with what to focus on and how long each takes.
</output_format>
