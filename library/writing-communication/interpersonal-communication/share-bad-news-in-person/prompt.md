---
schema: 1
id: share-bad-news-in-person
kind: prompt
title: Share bad news in person
description: Prepares someone to tell a relative or friend bad news face to face, such as a diagnosis, job loss or death, with a warning shot, pacing, silence and next steps.
category: interpersonal-communication
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [script, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [bad-news, warning-shot, family-news, delivering-news, compassion]
pairs_with:
  prompts: [write-bad-news-email, plan-breaking-bad-news, respond-supportively-to-disclosure]
  personas: [communication-coach]
args:
  - name: news
    description: What the news is, what is known and not yet known, and what happens next.
    type: text
    required: true
  - name: person
    description: Who you are telling, their age, how they usually take hard news, and anything they already suspect.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Setting and timing, Warning shot, Saying it, After you say it, Likely reactions, What happens next, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Clinicians are trained to break bad news with frameworks such as SPIKES, and the same principles help anyone telling a parent about a diagnosis, a partner about a lost job, or a child about a death. Choose a private place with time and no interruptions, and someone else present if that helps them. Give a short "warning shot" ("I have some hard news") so the person can brace, then say the news plainly within the next sentence or two, using clear words ("cancer", "died", "I was let go") rather than euphemisms that cause confusion. Then stop and allow silence. Emotion comes before information: once people hear the headline, they often take in little else, so details should come in small pieces when they ask. Common mistakes are a long build-up, burying the news in reassurance, filling silences, answering feelings with facts, and promising outcomes nobody knows. Children need short, honest, concrete words for their age and to hear what will stay the same for them.
</context>

<task>
Help me tell this person some bad news in person.

<news>
{{news}}
</news>

<person>
{{person}}
</person>

1. If it is unclear what the news is or who I am telling, ask up to two short questions and stop.
2. Advise on setting and timing: where, when, who else should be there, whether to tell several people together or separately, and what to have ready (tissues, a drink, time afterwards). If the person must hear it before it spreads (social media, other relatives), say so.
3. Write a warning shot in one sentence that fits them.
4. Write the news itself in one to three plain sentences. If the person is a child, adapt the wording to their age and include what stays the same for them.
5. Explain what to do straight after: pause, let them react, respond to feelings first, offer details only as they ask. Give two or three short lines for the silence or for strong emotion.
6. List their likely reactions (shock, crying, anger, denial, practical questions, "how long have you known?") with a short response to each.
7. Write how to close: what happens next, what I will do, when we will talk again, and who else they can lean on.
</task>

<constraints>
- Use only facts from my input. Do not invent prognoses, timelines or causes, and mark unknowns honestly ("we don't know yet").
- Do not offer false reassurance ("everything will be fine") or minimise.
- I am not their doctor. For medical news, keep explanations to what I know and suggest questions for the doctor.
- If the person who will hear the news may be at risk afterwards (very distressed, alone, has a history of self-harm), plan for someone to stay with them, and follow the safety guidance below.
{{> guardrails/crisis-safety}}
</constraints>

<output_format>
## Setting and timing
Where, when, who and what to have ready.
## Warning shot
One sentence.
## Saying it
The words.
## After you say it
What to do, and lines for silence or strong emotion.
## Likely reactions
Table: If they… | You can say…
## What happens next
How to close.
## Notes
Anything else, including support for me.
</output_format>
