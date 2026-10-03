---
schema: 1
id: write-podcast-intro-outro
kind: prompt
title: Write a podcast intro and outro
description: Writes a podcast cold open, a recurring show intro, an episode intro and an outro with a call to action, timed for reading aloud in the host's voice. Use when setting up a show or an episode.
category: podcasting
version: 1.0.0
status: incubating
stage: [build]
role: [content-creator, marketer]
inputs: [text, transcript]
output: [script]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [cold-open, show-intro, outro, call-to-action, read-aloud]
pairs_with:
  prompts: [plan-podcast-episode, write-show-notes, write-podcast-ad-read]
  personas: [podcast-producer]
args:
  - name: show_description
    description: The show's name, who it is for, what each episode gives listeners, the format (solo, interview, co-hosted), and the action you want listeners to take.
    type: text
    required: true
  - name: episode_topic
    description: This episode's topic, the guest if any, and ideally the best moment or quote from the recording. Leave empty to get templates.
    type: string
  - name: host_voice_notes
    description: How the host talks, for example "dry humour, short sentences, says 'right' a lot", plus phrases they would never say.
    type: text
output_contract:
  format: markdown
  sections: [Cold open, Show intro, Episode intro, Outro, Timing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write the spoken framing of podcast episodes. Listeners decide in the first minute whether to keep going, often while doing something else, so the opening has to earn attention before it asks for anything. The usual parts: a cold open (a 15 to 45 second moment from the episode, played before any intro, that raises a question), a recurring show intro (10 to 20 seconds, the same every episode, saying what the show is and for whom), an episode intro (30 to 60 seconds, what this episode gives the listener and why now, no long catch-up), and an outro (the takeaway, one call to action, what is next). Spoken copy is different from written copy: short sentences, contractions, one idea per sentence, no lists longer than three, nothing that is hard to say aloud. People speak at about 150 words per minute.
</context>

<task>
<show>
{{show_description}}
</show>

<episode>
{{episode_topic}}
</episode>

<host_voice>
{{host_voice_notes}}
</host_voice>

1. **Cold open.** If the episode material includes a real moment or quote, write the setup line and mark the clip as `[CLIP: …]` with what it should contain and its rough length. If there is no material, write a template with the clip criteria (a surprising answer, a tension, a vivid story beat) and do not invent what anyone said.
2. **Show intro.** Two versions: about 10 seconds and about 20 seconds, evergreen, saying the show name, who it is for and the promise. Mark where the theme music starts and ducks under the voice.
3. **Episode intro.** What this episode gives the listener, why it matters to them, who the guest is in one line that earns their place (only from facts given), and a reason to stay to the end. If the topic is empty, write a fill-in template.
4. **Outro.** One-line recap of the main takeaway, a single call to action from the show description, a tease of next episode as `[NEXT: …]` unless given, and a short sign-off in the host's voice.
5. **Timing.** Word count and estimated seconds for each part at 150 words per minute.
</task>

<constraints>
- Write in the host's voice from the notes; if there are none, write plainly and conversationally, and avoid radio-announcer clichés ("Welcome back to another episode").
- One call to action per episode in the outro. No subscribe request, sponsor read or housekeeping before the episode intro has landed.
- Mark pauses with `/` and words to stress in *italics*; keep every sentence easy to say in one breath.
- Never invent guest credentials, quotes or episode content. Use `[FILL: …]` placeholders.
- If the host has a sponsor, leave a marked slot (`[SPONSOR SLOT]`) after the episode intro rather than writing the read.
</constraints>

<output_format>
## Cold open
Setup line and clip marker, or the template.

## Show intro
10-second and 20-second versions with music cues.

## Episode intro
The script.

## Outro
The script.

## Timing
A table: part | words | seconds.
</output_format>
