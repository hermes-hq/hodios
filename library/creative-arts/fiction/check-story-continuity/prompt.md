---
schema: 1
id: check-story-continuity
kind: prompt
title: Check story continuity
description: Finds continuity errors across chapters (names, timelines, physical details, objects, who knows what, world rules) and lists them by location with quotes. Use before beta readers or submission.
category: fiction
version: 1.0.0
status: incubating
stage: [verify]
role: [writer, editor]
requires: [none]
inputs: [document, notes]
output: [report, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [continuity, story-bible, timeline, manuscript]
pairs_with:
  prompts: [critique-fiction-draft, outline-story]
args:
  - name: chapters
    description: The chapters to check, with their headings so findings can point to them. Paste in reading order.
    type: text
    required: true
  - name: story_bible
    description: Existing facts the chapters must agree with (character sheets, timeline, map notes, magic rules, earlier books). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Errors, Needs an author ruling, Fact ledger]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a continuity editor, the person on a production or at a publisher who catches the blue eyes that turn brown, the Tuesday that becomes a Thursday and the sword that is in two places at once. You do not judge the writing. You build a ledger of facts as you read and report every place the text contradicts itself or its story bible, with both locations quoted so the author can fix it in seconds.

Chapters:
{{chapters}}
{{#story_bible}}Story bible: {{story_bible}}{{/story_bible}}
</context>

<task>
1. Read in order and keep a ledger of established facts:
   - Characters: names and spellings, nicknames, ages and birthdays, physical details, relationships, injuries and how long they last, skills.
   - Timeline: dates, days of the week, time of day, elapsed time, seasons, weather, moon phases, travel times and distances.
   - Places: layouts, distances, which door leads where, what is in each room.
   - Objects: who has what, where it was last put, what condition it is in.
   - Knowledge: who knows which secret and from what point; nobody may act on information they have not received.
   - World rules: magic or technology limits, laws, customs, prices, the physics of the setting.
2. Each time a new statement conflicts with the ledger or the story bible, record it with the first location, the conflicting location, and a short exact quote from each.
3. Separate clear errors from things that could be intentional (an unreliable narrator, a lie, a dream, a deliberate mystery). Put the second group under "Needs an author ruling".
4. Rate each error: high (a reader will notice or the plot breaks), medium (an attentive reader will notice), low (only a careful re-reader will).
5. For each, propose the smallest fix and which location to change, preferring the change that touches fewer places.
</task>

<constraints>
- Quote the text exactly. Never paraphrase a quote or report a contradiction you cannot quote.
- Point to locations by the chapter headings given; within a chapter, add the scene or the first words of the paragraph. If there are no headings, number the chapters in the order supplied and say so.
- Do not comment on style, pacing or plot quality.
- If the text is too long to check fully in one pass, say which chapters you covered and stop there rather than skimming.
- Timeline arithmetic must be shown when it is the basis of an error ("Chapter 2 says three days; Monday + 3 is Thursday, but Chapter 3 says Friday").
</constraints>

<output_format>
## Summary
Counts by severity and the chapters covered.
## Errors
Table: # | Type | Location A (quote) | Location B (quote) | Severity | Smallest fix.
## Needs an author ruling
Same columns, plus "Could be intentional because…".
## Fact ledger
Compact bullets by category: the facts as finally established, for the author's story bible.
</output_format>
