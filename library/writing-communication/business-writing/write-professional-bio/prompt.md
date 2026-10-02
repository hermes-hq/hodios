---
schema: 1
id: write-professional-bio
kind: prompt
title: Write a professional bio
description: Writes the bio others read or say about you on speaker pages, programmes, proposals, author notes and team pages, at one-line to long lengths, angled to that reader and built only from your facts.
category: business-writing
version: 1.0.0
status: incubating
stage: [build]
role: [consultant, founder, executive, individual]
requires: [none]
inputs: [text, resume]
output: [copy]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [speaker-bio, author-bio, proposal-bio, team-page]
pairs_with:
  prompts: [write-social-bio, write-speech, write-emcee-script, moderate-panel]
args:
  - name: background
    description: Your name and pronouns, current role, experience, notable work and results, credentials, who you help, anything personal you are happy to share, or a CV. Facts only; it will not add any.
    type: text
    required: true
  - name: audience
    description: Where the bio will appear and who reads it, for example "conference speaker page for HR leaders", "consulting proposal for a hospital board", "author note in a trade book", "team page of our agency website".
    type: string
    default: general professional audience
  - name: point_of_view
    description: Third person suits speaker pages, programmes, proposals and introductions read by someone else; first person suits your own website. Choose both to get each version twice.
    type: enum
    enum: [third, first, both]
    default: third
output_contract:
  format: markdown
  sections: [Angle, One-liner, Short bio, Medium bio, Long bio, Introduction to read aloud, Facts used, Gaps]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A professional bio is usually read or spoken by someone else on your behalf: the conference programme, the host who introduces you, the proposal a client's board skims, the note at the back of a book. It answers one question for that reader: why should I listen to, hire or trust this person for this? Weak bios list job titles in date order, stack adjectives ("passionate, results-driven, visionary") and read the same for every audience. Strong ones lead with what the person does and for whom, give two or three proofs that matter to this reader (a result with a number, a body of work, a credential this audience respects), and end with one specific human detail or what the person is working on now. The same career yields different bios for a hospital board and a design meetup, because the proof each reader cares about differs. Character-limited social profiles (Instagram, X, LinkedIn headline) are a different job with platform limits; this prompt does not write them.
</context>

<task>
Write professional bios for: {{audience}}. Point of view: {{point_of_view}}.

<background>
{{background}}
</background>

1. If the background lacks the person's name, current role, or anything concrete to prove it (a result, a body of work, a credential, years in a field), ask for what is missing in up to three short questions and stop. If the audience is a character-limited social profile, say that a platform bio written to that site's character limit fits better, then write only the one-liner and short bio.
2. Choose the angle: the one thing this reader most needs to know about the person, in one sentence. Pick the two or three proofs from the background that support it best for this reader, and leave the rest out rather than listing everything.
3. Write each length in the requested point of view. In third person, use the full name first, then the stated pronouns, or the surname or first name again (matching the register) if pronouns are not given:
   - **One-liner:** up to 25 words, for a badge, byline or slide.
   - **Short:** 50 to 70 words, for programmes and directories.
   - **Medium:** 100 to 150 words, for speaker pages and proposals.
   - **Long:** 200 to 250 words, for an about or team page, with a little more story and one personal detail if supplied.
4. Open every version with what the person does and for whom, not a date or a title list. End the medium and long versions with something specific and human from the background, or what the person is working on now.
5. Write a 20- to 30-second introduction (about 50 to 70 words) a host can read aloud: spoken rhythm, the name said last as the cue to walk on, nothing hard to pronounce without a marker.
</task>

<constraints>
- Use only facts in the background. Never invent clients, numbers, awards, publications, degrees or employers. Do not inflate: "contributed to" stays "contributed to", and "led" only when the background says so. If the person asks for claims the background does not support, leave them out and say why in Gaps.
- No empty adjectives (passionate, dynamic, visionary, results-driven, thought leader) unless a fact proves them, and then use the fact instead.
- Keep job titles and organisation names exactly as given.
- Do not include personal details the person did not offer, such as family, age, health or location.
- Match the register of the audience: formal for a board proposal, warmer for a community event. Hit each word range and show the count.
</constraints>

<output_format>
## Angle
One sentence, then the proofs chosen and why they matter to this reader.
## One-liner
## Short bio
With word count.
## Medium bio
With word count.
## Long bio
With word count.
(With `both`, give the third-person version, then the first-person version, under each heading.)
## Introduction to read aloud
The spoken introduction, with `[pronunciation?]` after any name the host should check.
## Facts used
Bullets mapping each claim to the part of the background it came from.
## Gaps
Unsupported requests left out, and details that would strengthen the bio (a number, a client type, a credential) as questions. "None" if none.
</output_format>
