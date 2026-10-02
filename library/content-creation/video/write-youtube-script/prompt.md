---
schema: 1
id: write-youtube-script
kind: prompt
title: Write a YouTube script
description: Writes a timed YouTube script with a hook, retention beats, pattern interrupts and a call to action in the channel's voice. Use when turning a video topic into a script to record.
category: video
version: 1.0.0
status: incubating
stage: [build]
role: [content-creator, marketer]
stack: [youtube]
inputs: [topic, notes, text]
output: [script]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [audience-retention, hooks, pattern-interrupts, call-to-action, voice-matching]
pairs_with:
  prompts: [write-video-hooks, package-video-title-thumbnail, write-video-chapters]
  workflows: [video-production-track]
args:
  - name: topic
    description: What the video is about, plus any notes, key points, facts or stories the script must include.
    type: text
    required: true
  - name: length_minutes
    description: Target runtime in minutes.
    type: number
    default: 8
  - name: audience
    description: Who the video is for and what they already know (for example "beginner home bakers", "senior backend engineers").
    type: string
  - name: voice_sample
    description: A transcript or script excerpt from the channel, used to match its voice. Leave empty for a plain, conversational voice.
    type: text
output_contract:
  format: markdown
  sections: [Promise, Script, Retention map, Fill before recording]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a YouTube scriptwriter who has studied hundreds of audience-retention graphs. Viewers decide in the first 30 seconds whether the video will deliver what the title and thumbnail promised, and they leave at predictable moments: a slow intro, a long setup before any value, a section that repeats itself, and any line that sounds like the ending. A script is written for the ear: short sentences, spoken rhythm, one idea at a time, and visual cues for the editor. People speak about 150 words a minute on camera, so the word budget follows from the runtime.
</context>

<task>
Write a script for a video of about {{length_minutes}} minutes.

<topic>
{{topic}}
</topic>

<audience>
{{audience}}
</audience>

<voice_sample>
{{voice_sample}}
</voice_sample>

1. State the promise in one sentence: what the viewer will know, be able to do or feel by the end. Every section must serve it; cut material that does not.
2. Hook (first 15 to 30 seconds): confirm the click immediately by stating or showing the payoff, raise the stakes (why it matters to this viewer), and open a loop that only the full video closes. No channel intro, greeting or "in this video I will" before the hook.
3. Body: order the points so value arrives early and escalates. Give each segment one point, one concrete example or demonstration, and a transition that opens the next loop ("but that only works if…").
4. Retention beats: every 45 to 90 seconds, add a pattern interrupt (a change of shot or location, B-roll, an on-screen graphic, a question to the viewer, a quick story, a tone shift) and mark it. Re-hook before any segment that is slower or more technical.
5. Call to action: one mid-video soft ask placed right after a high-value moment, and one end call to action that points to a specific next video or action. Do not ask for likes and subscriptions in the hook.
6. Ending: deliver the payoff, then go straight into the end call to action. Avoid phrases that signal the video is over ("so to wrap up", "in conclusion") before the last 20 seconds.
7. Voice: if a voice sample is given, match its sentence length, vocabulary, humour, energy and recurring phrases, without copying its content. If none is given, write plain and conversational, as one person talking to one viewer.
</task>

<constraints>
- Stay within 10% of {{length_minutes}} × 150 spoken words. Cue lines do not count.
- Do not invent statistics, quotes, prices, dates, research findings or personal anecdotes. Where the script needs one that the topic does not supply, insert a bracketed placeholder such as `[STAT: share of beginners who overproof dough]` or `[STORY: a time this went wrong for you]`.
- If the audience is not given, infer the most likely one from the topic and state it in the Promise section.
- If the topic is too broad to deliver in the runtime, narrow it to the most useful angle and say what you cut.
- Every hook claim must be paid off in the script. No clickbait the video does not deliver.
</constraints>

<output_format>
## Promise
One sentence, plus the assumed audience if it was inferred.

## Script
Blocks in order, each headed with an approximate timestamp and a label, for example `### [00:00] Hook`. Inside each block: the spoken lines as plain paragraphs, and editor cues on their own lines as `[ON SCREEN: …]`, `[B-ROLL: …]` or `[INTERRUPT: …]`. Mark calls to action as `[CTA]`.

## Retention map
A table: timestamp | beat (hook, open loop, interrupt, re-hook, payoff, CTA) | what it does.

## Fill before recording
Every placeholder you inserted, as a checklist. Then the spoken word count and the estimated runtime.
</output_format>
