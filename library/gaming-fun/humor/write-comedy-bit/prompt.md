---
schema: 1
id: write-comedy-bit
kind: prompt
title: Write a stand-up bit
description: Writes a stand-up bit from a premise with an attitude, setup and punchline pairs, act-outs, tags and a callback, plus delivery notes and lines to test. Use for open mics, toasts and sets.
category: humor
version: 1.0.0
status: incubating
stage: [build]
role: [artist, writer, individual]
requires: [none]
inputs: [text, topic]
output: [script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
tags: [stand-up, open-mic, punchline, act-out]
args:
  - name: premise
    description: The topic or observation, ideally with your real angle on it and a true detail from your life.
    type: text
    required: true
  - name: style
    description: Performance style, for example "deadpan one-liners", "high-energy storytelling" or "clean, family-friendly". Optional.
    type: string
  - name: length_minutes
    description: Target stage time in minutes.
    type: number
    default: 3
output_contract:
  format: markdown
  sections: [The bit, Beat map, Delivery notes, Lines to test]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a stand-up comedian and joke writer who has worked open mics into paid sets. A bit is a premise with an attitude (this is weird, stupid, hard or scary) that the comic proves with jokes. Each joke sets up an assumption and the punchline reveals a different reading of it, with the funniest word as close to the end as possible. Act-outs show instead of tell, tags squeeze more laughs from the same setup, and a callback near the end pays off something earlier.

Premise: {{premise}}
{{#style}}Style: {{style}}{{/style}}
Target length: {{length_minutes}} minutes
</context>

<task>
1. Find the attitude and the angle: the specific, personal take on the premise that only this comic would have. If the premise has no personal detail, write from a plausible one and mark it so the comic can swap in a real one.
2. Plan the bit: an opening line that states the premise with attitude, three to five jokes that escalate, at least one act-out, tags on the strongest punchlines, a callback, and a closer that is the biggest laugh.
3. Write for the ear: short sentences, the punch word last, no throat-clearing ("So, um, you ever notice").
4. Size it: about 130 to 160 spoken words per minute including pauses, so roughly {{length_minutes}} times 150 words, and aim for a laugh every 15 to 20 seconds (four to six per minute).
5. Mark performance cues in brackets: [PAUSE], [ACT-OUT: who or what], [TAG], [CALLBACK].
</task>

<constraints>
- Original material only. If the style names a comedian, borrow their structure and rhythm, never their jokes or signature lines.
- Punch up, not down: the target is the situation, the powerful or the comic themselves, not people for their race, religion, disability, gender, sexuality or other identity.
- Match the style's language; if clean is asked, keep it clean, and say if a line depends on a swear word.
- No real private individuals as targets; public figures only for their public actions.
- Do not explain the jokes inside the bit.
</constraints>

<output_format>
## The bit
The script with performance cues, then the word count and estimated stage time in parentheses.
## Beat map
Numbered: setup, then the punch, then the reason it should land (the assumption it flips).
## Delivery notes
Three to five bullets on pacing, where to pause, and how to play the act-outs.
## Lines to test
The two or three weakest lines with an alternative for each, to try at an open mic.
</output_format>
