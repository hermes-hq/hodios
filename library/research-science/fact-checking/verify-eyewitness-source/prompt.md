---
schema: 1
id: verify-eyewitness-source
kind: prompt
title: Verify an online eyewitness before relying on them
description: Checks that an online eyewitness or anonymous source is who and where they say they were, from their digital footprint, their media and an interview, before you quote or rely on their account.
category: fact-checking
version: 1.0.0
status: incubating
stage: [verify]
role: [writer, editor, researcher]
requires: [none]
inputs: [text, url, image]
output: [report, checklist, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [eyewitness-media, user-generated-content, osint, breaking-news, source-safety]
pairs_with:
  prompts: [verify-image-provenance, assess-breaking-news-reports, check-social-account-authenticity]
  personas: [fact-checker]
args:
  - name: source
    description: What you know about the person - their account, what they posted or told you, any photos or video they shared, and what they claim to have seen.
    type: text
    required: true
  - name: event
    description: The event, its place and time, and what you already know from other sources.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Assessment, Footprint checks, Media checks, Questions to ask them, Safety and consent, How to attribute]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
In breaking news, the first accounts come from people on the scene posting online, and from people pretending to be. Verification teams test two things separately: is this person who they claim to be, and were they where they claim, when they claim? The digital footprint helps: an account's age, past posts showing they live or work in the area, photos taken in the same place before, and consistent details across platforms. Their media helps: is the photo or video original to them (no earlier copies online), and do its details (weather, shadows, signs, landmarks, language) match the place and time? The interview helps most: real witnesses can answer follow-up questions with specific sensory detail, describe what they could not see, and send the original file. Fabricators repeat details already in the news and avoid specifics. People at the scene of violence or disaster may be in danger or traumatised, so consent, safety and not exposing their identity come first.
</context>

<task>
Help me verify this eyewitness.
<source>
{{source}}
</source>
<event>
{{event}}
</event>

1. Assess what is known and the main risks: impersonation, recycled media, second-hand account presented as first-hand, or a genuine witness with a partial view.
2. List footprint checks: account age and history, earlier posts placing them in the area, consistency across platforms, and connections to the place.
3. List media checks: reverse image search for earlier copies, requesting the original file, and the details in the image or video to compare with the claimed place and time.
4. Draft interview questions that a genuine witness can answer and a fabricator cannot easily: where exactly they stood, what they saw before and after, what they could not see, who else was there, and what they did next. Avoid leading questions that feed them details.
5. Cover safety and consent: whether naming or showing them could put them at risk, how to ask permission to use their account and media, and how to approach someone who may be distressed.
6. Say how to attribute their account depending on what you can confirm.
</task>

<constraints>
- Do not treat the account as confirmed until the checks are done; say what remains unconfirmed.
- Do not invent facts about the person, their account or the event. If you have web access, cite only pages you opened.
- Do not suggest pretexting, deceptive approaches or pressure on distressed people.
- Never advise publishing details that could locate or identify a witness without their informed consent.
- Corroborate a single eyewitness with other evidence before treating the claim as fact.
</constraints>

<output_format>
## Assessment
## Footprint checks
Checklist.
## Media checks
Checklist.
## Questions to ask them
Numbered, non-leading.
## Safety and consent
## How to attribute
Suggested wording for confirmed, partly confirmed and unconfirmed outcomes.
</output_format>
