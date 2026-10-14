---
schema: 1
id: assess-breaking-news-reports
kind: prompt
title: Sort early reports on a breaking news event
description: Sorts the early reports, posts and official statements on a breaking event into confirmed, single-sourced, unverified and contradicted, and lists what not to repeat yet.
category: fact-checking
version: 1.0.0
status: incubating
stage: [verify]
role: [editor, writer, content-creator, individual]
requires: [none]
inputs: [text, message]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [breaking-news, rumours, unconfirmed-reports, crisis-events]
pairs_with:
  prompts: [verify-image-provenance, evaluate-source-credibility, respond-to-misinformation]
  personas: [fact-checker]
args:
  - name: reports
    description: The reports you have so far, pasted with their source, time stamp and wording. Include posts, wire copy, official statements and messages.
    type: text
    required: true
  - name: event
    description: What is happening, where, and when it started, in one or two lines.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [State of knowledge, Claim board, Do not repeat yet, Holding summary, What to watch for]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
In the first hours of a shooting, disaster, attack or outage, early information is often wrong in the same ways. Casualty numbers swing widely and early figures are usually revised. Suspects are named, and sometimes the wrong person. Old footage from another event is reshared as new. Several outlets "confirm" a detail that all trace back to one unnamed source. Official statements are slower but carefully worded, and the wording matters: "reports of" is not "there was". Experienced breaking-news editors keep a claim board: each detail, who says it, how they know, and what would confirm it, and they publish what is known with clear attribution instead of what is likely.
</context>

<task>
Event: {{event}}
Reports so far:
<reports>
{{reports}}
</reports>

1. Break the reports into individual details (what happened, where, when, how many, who, why).
2. For each detail, list who reports it and trace whether they are independent or repeating each other. Note whether each source is first-hand (official on the record, eyewitness with location, direct footage) or second-hand.
3. Classify each detail: Confirmed (on-record official or two independent first-hand sources), Single-sourced, Unverified (no clear original), Contradicted (credible sources disagree), or Likely recycled (matches a pattern of old or unrelated material).
4. Flag high-harm details: names of suspects or victims, casualty numbers, claims about motive, ethnicity or religion, and instructions to the public.
5. Write a short holding summary a careful outlet or person could share now, with attribution for every detail.
</task>

<constraints>
- Use only the reports supplied. Do not add details from your own knowledge of the event, and do not fill gaps with what usually happens.
- Never treat a suspect's name, a motive or a victim's identity as confirmed unless an on-record official source in the reports says so, and even then flag the risk of repeating it.
- Count repetitions of one source as one source.
- Prefer "not yet known" to a range you cannot support.
- Safety instructions from authorities in the reports come first in the holding summary.
</constraints>

<output_format>
## State of knowledge
Three to five sentences: what is confirmed, what is not, and the time of the latest report used.
## Claim board
Table: detail | reported by | first-hand or second-hand | independent sources | status.
## Do not repeat yet
Bullets: each detail that should not be shared, why, and what would confirm it.
## Holding summary
Two to four attributed sentences that can be shared now, leading with any official safety instruction.
## What to watch for
Expected official updates and the misinformation patterns common to this kind of event.
</output_format>
