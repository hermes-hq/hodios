---
schema: 1
id: write-podcast-guest-pitch
kind: prompt
title: Write a podcast guest pitch
description: Writes a short pitch to appear as a guest on a podcast, tailored to the show's audience with three concrete episode angles and a follow-up. Use when pitching yourself to a show.
category: podcasting
version: 1.0.0
status: incubating
stage: [build]
role: [content-creator, founder, consultant, writer]
inputs: [text, url]
output: [message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [guest-pitch, podcast-outreach, booking]
pairs_with:
  prompts: [write-guest-interview-questions]
args:
  - name: show
    description: The podcast you are pitching, with what you know about it (host, audience, format, recent episodes you listened to, what guests usually talk about). Paste notes, not just a name.
    type: text
    required: true
  - name: my_expertise
    description: Who you are and what you can talk about with authority, including specific results, stories, data or opinions that are your own.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Fit check, Pitch, Follow-up]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write podcast guest pitches that hosts actually answer. Hosts and producers get many pitches, and most are deleted after the subject line: they are generic ("I'd love to be on your show"), about the guest rather than the listener, or obviously sent to fifty shows. Pitches that get booked prove the sender has listened, offer episode angles the host can picture, back each angle with something only this guest can bring (a story, a number, a contrarian view), and make it easy to say yes. Short beats long.
</context>

<task>
Write a pitch to appear on this show.

<show>
{{show}}
</show>

<my_expertise>
{{my_expertise}}
</my_expertise>

1. Fit check: in two or three bullets, say who the show's listeners are, what they come for, and where the sender's expertise overlaps. If the overlap is weak, say so plainly and suggest how to reframe, or a better kind of show to pitch.
2. Write the pitch email:
   - Subject line: specific to the show and the strongest angle, under 60 characters. Give two options.
   - Opening line: a specific reference to the show from the notes provided (an episode, a recurring theme, something the host said), connected to why you are writing. If the notes contain nothing specific, insert `[SPECIFIC EPISODE OR MOMENT YOU LISTENED TO]` rather than inventing one.
   - Three episode angles, each with a working title, the listener takeaway in one sentence, and the story, result or data point from the sender's expertise that backs it.
   - Credibility in one or two sentences: the most relevant proof only.
   - An easy close: availability, offer to send a one-page guest sheet or past appearances, and one clear question ("Would any of these fit an episode this spring?").
3. Write a short follow-up for one week later that adds one new piece of value (a fresh angle or a timely hook) rather than "just bumping this".
</task>

<constraints>
- Pitch body under 200 words, follow-up under 80.
- Write about the listener's benefit first, the sender second.
- No generic flattery ("huge fan", "love your show") unless followed by something specific.
- Do not invent episodes, host names, audience numbers or the sender's achievements; use only what is provided and placeholders for gaps.
- Plain text, no bold or bullet styling inside the email except the three angles.
</constraints>

<output_format>
## Fit check
## Pitch
Subject options, then the email body.
## Follow-up
</output_format>
