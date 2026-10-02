---
schema: 1
id: write-professional-bio
kind: prompt
title: Write a professional bio
description: Writes first- and third-person professional bios at one-line, short and long lengths for speaker pages, websites, proposals and social profiles, using only the facts supplied.
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
tags: [speaker-bio, about-page, personal-branding, linkedin-about]
pairs_with:
  prompts: [write-speech, write-emcee-script, moderate-panel]
args:
  - name: background
    description: Your role, experience, notable work and results, credentials, who you help, anything personal you are happy to share, and links or a CV if you like. Facts only; it will not add any.
    type: text
    required: true
  - name: audience
    description: Where the bio will appear and who reads it, for example "conference speaker page for HR leaders", "consulting proposal for a hospital board", "LinkedIn About".
    type: string
    default: general professional audience
output_contract:
  format: markdown
  sections: [One-liner, Short bio, Medium bio, Long bio, Facts used, Gaps]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A bio answers one question for a specific reader: why should I listen to, hire or trust this person for this? Weak bios list job titles in date order, stack adjectives ("passionate, results-driven, visionary"), and read the same for every audience. Strong ones lead with what the person does and for whom, give two or three concrete proofs (a result, a body of work, a credential that matters to this reader), and end with one human detail. Third person is the convention for speaker pages, programmes and proposals, because someone else introduces you; first person suits websites, social profiles and personal pages.
</context>

<task>
Write professional bios from this background for: {{audience}}.

<background>
{{background}}
</background>

1. If the background lacks the person's name, current role or any concrete achievement, ask for what is missing in up to three short questions and stop.
2. Choose the angle for this audience: the one thing this reader most needs to know about the person. Pick the two or three proofs from the background that support it best, and leave out the rest.
3. Write each version in both third person (using the person's name, then their stated pronouns, or the name again if pronouns are not given) and first person:
   - **One-liner:** up to 25 words, for a badge, byline or introduction slide.
   - **Short:** 50 to 70 words, for programmes and social profiles.
   - **Medium:** 100 to 150 words, for speaker pages and proposals.
   - **Long:** 200 to 250 words, for an about page, with a little more story and one personal detail if supplied.
4. Open each version with what the person does and for whom, not with a date or a title list. End the medium and long versions with something specific and human from the background, or with what they are working on now.
</task>

<constraints>
- Use only facts in the background. Never invent clients, numbers, awards, publications, degrees or employers. Do not inflate: "contributed to" stays "contributed to", and "led" only when the background says so.
- No empty adjectives (passionate, dynamic, visionary, results-driven, thought leader) unless a fact proves them, and then prefer the fact.
- Keep the person's real job titles and organisation names exactly as given.
- Do not include personal details the person did not offer, such as family, age or health.
- Match the register of the audience: formal for a board proposal, warmer for a community event.
</constraints>

<output_format>
## One-liner
Third person, then first person.
## Short bio
Third person, then first person, with word counts.
## Medium bio
Third person, then first person, with word counts.
## Long bio
Third person, then first person, with word counts.
## Facts used
Bullets mapping each claim to the line of the background it came from.
## Gaps
Details that would strengthen the bio (a number, a client type, a credential) as questions. "None" if none.
</output_format>
