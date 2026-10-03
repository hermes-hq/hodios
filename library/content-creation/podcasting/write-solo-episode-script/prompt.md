---
schema: 1
id: write-solo-episode-script
kind: prompt
title: Write a solo podcast episode script
description: Writes a solo podcast episode as a full script or detailed talking notes with a hook, segments, stories, transitions and a close, in a conversational voice. Use when recording alone.
category: podcasting
version: 1.0.0
status: incubating
stage: [build]
role: [content-creator, writer]
inputs: [notes, topic]
output: [script, outline]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [solo-episode, talking-points, storytelling, signposting, read-aloud]
pairs_with:
  prompts: [plan-podcast-episode, write-podcast-intro-outro, write-show-notes]
  personas: [podcast-producer]
args:
  - name: topic_and_points
    description: The topic, the points you want to make, stories or examples from your own experience, and who the episode is for.
    type: text
    required: true
  - name: length_minutes
    description: Target episode length in minutes.
    type: number
    default: 20
  - name: style
    description: A full word-for-word script, or detailed talking notes with key lines written out.
    type: enum
    enum: [full-script, talking-notes]
    default: talking-notes
output_contract:
  format: markdown
  sections: [Episode promise, Run sheet, Script, Stories to supply]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help hosts record solo podcast episodes that sound like a person talking to one listener, not someone reading an essay. Solo episodes lose listeners when they start slowly, wander, or stack abstract points without stories. Listeners cannot skim or glance back, so a solo episode needs signposting ("there are three things…", "that's the first one; the second is the one people get wrong"), concrete stories or examples for every point, recaps at segment ends, and a close that lands one takeaway. Hosts speak at about 150 words per minute. A full script gives control but can sound read; talking notes sound natural but can ramble, so they work best with the open, the transitions and the close written word for word.
</context>

<task>
Write a {{length_minutes}}-minute solo episode in the {{style}} style.

<material>
{{topic_and_points}}
</material>

1. **Episode promise:** one sentence: what the listener will understand, decide or be able to do by the end. If the material has more points than fit in {{length_minutes}} minutes, keep the strongest and list the rest as ideas for another episode.
2. **Run sheet:** timed segments that add up to {{length_minutes}} minutes: the hook (under a minute, opening on a story, a surprising claim or the listener's problem), why this matters to the listener, two to four main segments, and the close.
3. **Script.** For full-script: every word, written for the ear, at about 150 words per minute. For talking-notes: per segment, the point in one line, the story or example to tell (as bullet prompts), a key line written word for word, and the transition into the next segment; write the hook, every transition and the close word for word.
4. In both styles: one story or concrete example per main point, a signpost at the start of each segment, a one-sentence recap at its end, and a callback to the hook in the close.
5. **Close:** the single takeaway, one call to action, and a line about what is next.
</task>

<constraints>
- Use only the host's own stories and facts from the material. Where a point needs a story or example the host did not give, insert `[STORY: …]` with what kind of story would work and a question to jog their memory. Never write a fake personal anecdote.
- Write for speaking: short sentences, contractions, no bracketed asides, no lists longer than three, no statistics without a source; mark claims to check as `[CHECK: …]`.
- Keep the hook free of greetings, housekeeping and sponsor mentions.
- Match the host's voice if the material shows it; otherwise write warm and plain.
</constraints>

<output_format>
## Episode promise
One sentence, then any points moved to another episode.

## Run sheet
A table: segment | start time | minutes | purpose.

## Script
The full script or the talking notes, by segment with headings.

## Stories to supply
Every `[STORY]` and `[CHECK]` placeholder with its question, then the word count (full-script) or estimated length (talking-notes).
</output_format>
