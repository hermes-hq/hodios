---
schema: 1
id: practise-talking-to-empty-chat
kind: prompt
title: Practise talking to an empty chat
description: Coaches a small streamer through practice rounds of talking to an empty or quiet chat, with silent stretches and first-time chatters, then gives feedback on dead air and engagement habits.
category: livestreaming
version: 1.0.0
status: incubating
stage: [learn]
role: [content-creator, gamer]
inputs: [preferences, text]
output: [conversation]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: optional
level: beginner
tags: [dead-air, on-camera-confidence, rehearsal, small-streamer, narration]
pairs_with:
  prompts: [grow-streaming-channel, plan-livestream-run-of-show]
  personas: [stream-producer]
args:
  - name: stream
    description: What you stream (game, art, cooking, talk), what you find hardest (silence, feeling silly, not knowing what to say, freezing when someone chats), and how long you have been streaming.
    type: text
    required: true
  - name: rounds
    description: How many practice rounds to run.
    type: number
    default: 4
output_contract:
  format: markdown
  sections: [Patterns, Three habits for next stream, Go-to lines]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most streams start with nobody watching, and most viewers who drop in on a small stream see a silent streamer and leave. Talking to an empty room is a skill. What works: narrating decisions rather than actions ("I'm going left because last time the right path had the ambush"), asking open questions to an imagined viewer, telling short stories that connect to what is on screen, greeting lurkers without pressuring them to talk, and naming the stream's topic often for people who just arrived. Dead air of a few seconds is fine; long silence while concentrating needs a habit (thinking out loud or a quick summary when coming back up). When the first chatter appears, the mistake is either ignoring them or overwhelming them; a warm, specific reply and a simple question works better.
</context>

<task>
<stream>
{{stream}}
</stream>

Rounds: {{rounds}}

1. Open with one short line: you will run {{rounds}} practice rounds, the user types what they would say out loud (or a summary if they practise speaking aloud), and they can type "hint", "skip" or "end".
2. Each round, give a **Round prompt**: a short scene from their kind of stream (for example "you just failed a jump for the fifth time, chat is empty", "you are mixing paint and nobody has spoken for ten minutes", "a first-time chatter says 'hi'"). Vary the scenes: silence, frustration, a lurker, a first chatter, a returning regular, a mildly rude comment.
3. After they reply, give **Feedback** in three to five lines: what worked, one concrete thing to try, and a sample line in their style. When a chatter appears in the scene, reply in character as that chatter once before giving feedback.
4. Adjust difficulty: if they do well, add pressure (a fast question while they are busy); if they struggle, give a narration prompt to lean on.
5. After the last round or "end", give the **Debrief**: patterns noticed, three habits for the next real stream, and a short list of go-to lines and topics drawn from what they wrote.
</task>

<constraints>
- Keep each round short; this is practice, not a lecture.
- Feedback is specific and kind; never mock how they talk.
- Do not encourage fake chatters, viewer bots or pretending chat is active to real viewers.
- If they say streaming is making them anxious or miserable, acknowledge it and suggest shorter streams or breaks; do not push them to continue.
</constraints>

<output_format>
During rounds:
**Round N prompt:** the scene.
Then after their reply, **Feedback:** three to five lines.

Debrief:
## Patterns
## Three habits for next stream
## Go-to lines
</output_format>
