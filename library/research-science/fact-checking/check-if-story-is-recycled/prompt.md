---
schema: 1
id: check-if-story-is-recycled
kind: prompt
title: Check whether a story is old news resurfacing
description: Checks whether a news story or viral post is old, from another place or about a resolved situation but shared as current, using its own clues and dated sources it retrieves.
category: fact-checking
version: 1.0.0
status: incubating
stage: [verify]
role: [individual, editor, content-creator, writer]
requires: [web]
inputs: [text, url]
output: [report]
risk: network
invocation: user
effort: quick
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [false-context, resurfaced-content, misinformation, dates]
pairs_with:
  prompts: [verify-image-provenance, fact-check-claims, respond-to-misinformation]
args:
  - name: story
    description: The post, article text or link as it is being shared now, including the caption or comment that frames it.
    type: text
    required: true
  - name: where_seen
    description: Where and when you saw it, for example "family group chat, today".
    type: string
output_contract:
  format: markdown
  sections: [Verdict, Clues in the story, Dated evidence, What to say if you share it]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A large share of misleading content is genuine but out of time or place: a real article from years ago, a recall that was resolved, a storm in another country, a crime from a decade back, or a policy that was proposed and dropped. Platforms show when something was shared, not when it happened, so an old headline reads as today's news. The fix is mechanical: find the original publication date and place, check whether the situation changed since, and compare that with how it is being framed now. The story's own clues (named officials, prices, currency, technology, seasons, references to other events) often date it before any search.
</context>

<task>
Check whether this is being shared out of time or place{{#where_seen}} (seen: {{where_seen}}){{/where_seen}}:
<story>
{{story}}
</story>

1. Write down what the sharing frames as true now: the event, the place and the implied date.
2. Read the story for internal clues to date and place: named officials and their roles, prices and currency, technology, weather or season, references to other events, spelling conventions and local terms.
3. Search for the original publication with date limits: the earliest dated version of the headline, distinctive phrases, names and figures. Record the date and place of the original.
4. Check for later developments: corrections, follow-ups, a recall ended, charges dropped, a proposal withdrawn.
5. Compare: is the event current, recurring, or old and resolved? Did the place or scale change in the retelling?
</task>

<constraints>
- Cite only pages you opened in this session, with URL and publication date. Never cite from memory or construct a URL.
- If you have no web access, say so, give the clue-based assessment only, and list the searches that would settle it. Do not give a final verdict.
- A story can be old and still accurate; say so if the situation has not changed.
- Do not call the person who shared it dishonest; recycled stories usually spread by accident.
</constraints>

<output_format>
## Verdict
One rating in bold (Current, Old but still accurate, Old and outdated, Wrong place, Cannot tell yet), then one or two sentences.
## Clues in the story
Bullets: each clue and what it suggests about date or place.
## Dated evidence
Table: date | source (linked) | what it shows.
## What to say if you share it
A one- or two-sentence reply or caption that gives the correct date, place and current status.
</output_format>
