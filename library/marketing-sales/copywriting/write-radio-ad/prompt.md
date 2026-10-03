---
schema: 1
id: write-radio-ad
kind: prompt
title: Write radio and audio ad scripts
description: Writes 15, 30 and 60 second radio or audio ad scripts written for the ear, with sound cues, one message and a memorable call to action. Use for broadcast, streaming audio or produced spots.
category: copywriting
version: 1.0.0
status: incubating
stage: [build]
role: [copywriter, marketer, founder]
requires: [none]
inputs: [text, spec]
output: [script, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: intermediate
tags: [radio-ad, audio-ad, sound-design, broadcast, streaming-audio]
pairs_with:
  prompts: [write-video-ad-script, write-podcast-ad-read, write-jingle, plan-podcast-ad-buy, plan-local-advertising]
  personas: [copywriter]
args:
  - name: offer
    description: The business, what you are advertising, the offer and any deadline, proof you can use, and the one action you want (visit, call, search a name, go to a URL). Include required legal lines if you know them.
    type: text
    required: true
  - name: audience
    description: Who hears it and when (for example "commuters on local radio, weekday mornings", "streaming listeners aged 25-40").
    type: string
    required: true
  - name: lengths
    description: Spot lengths in seconds, comma-separated.
    type: text
    default: 15,30,60
output_contract:
  format: markdown
  sections: [Concept, Scripts, Production notes, Clearance checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a radio copywriter. Audio is heard once, at the listener's pace, usually while they drive, cook or work, and they cannot scroll back. So a spot carries one idea, names the brand early and again at the end, and makes the response easy to remember without writing anything down: a brand name to search, a simple URL, or a place. Sound does the work pictures do on screen: a voice, a sound effect or a short scene puts the listener somewhere in a second. Spoken copy runs at about 2.5 words per second, and a spot that crams in words gets read too fast to understand.
</context>

<task>
Write radio or audio ad scripts.

<offer>
{{offer}}
</offer>

Audience: {{audience}}
Lengths (seconds): {{lengths}}

1. If the business name, what is advertised or the action is missing, ask in one message and stop.
2. Concept: the one message, the format (single voice, two-voice dialogue, a short scene with sound effects, a testimonial-style read, a jingle tag) and why it suits this audience and listening moment. Offer two concepts in one line each and develop the stronger.
3. Write one script per length:
   - A table with the columns Time, Sound or music cue, Voice (who speaks), and Line.
   - The brand named in the first third and again in the last few seconds.
   - The call to action said at least twice in 30 and 60 second spots; once is enough at 15 seconds.
   - Shorter spots cut to hook, brand, offer and call to action; do not compress a 60 into 15 by talking faster.
   - Under each script: the word count of spoken lines and the target (about 30 to 35 words for 15 seconds, 65 to 75 for 30, 130 to 150 for 60, less if there is a scene or sound effect).
4. Production notes: voice direction (age range, energy, accent only if it matters to the audience), music mood, sound effects with what they make the listener picture, and any word the voice talent must pronounce a specific way.
5. Clearance checklist: claims that need proof, required legal or price lines (spoken fast at the end only if the market allows it), and the response URL or number to confirm.
</task>

<constraints>
- Write for the ear: short sentences, no parentheses, no abbreviations a voice cannot read, no long URLs or phone numbers unless the business insists (then repeat the number and suggest a memorable form).
- Use only facts and claims given; mark gaps `[NEEDED: …]`. No invented testimonials or statistics; a testimonial voice played by an actor must not be presented as a real customer.
- Do not imitate emergency sounds (sirens, alarm tones, broadcast emergency alerts) or real celebrities' voices, which are commonly prohibited and confuse drivers.
- One call to action across all lengths so the campaign reinforces itself.
</constraints>

<output_format>
## Concept
Two one-line concepts and the chosen one with the reason.

## Scripts
A heading per length, each with the Time | Sound or music cue | Voice | Line table and the spoken word count against the target.

## Production notes
Bullets.

## Clearance checklist
Bullets: claims to substantiate, legal lines, details to confirm.
</output_format>
