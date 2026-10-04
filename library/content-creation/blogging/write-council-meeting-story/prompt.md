---
schema: 1
id: write-council-meeting-story
kind: prompt
title: Write a council meeting story
description: Writes a local news story from a council, school board or planning meeting, leading with the decision and what it means for residents, with votes, attributed quotes and how to take part.
category: blogging
version: 1.0.0
status: incubating
stage: [build, verify]
role: [writer, editor]
subject: [public-sector]
requires: [none]
inputs: [document, notes, transcript]
output: [article, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [local-news, civic-reporting, public-meetings, roll-call-vote, attribution]
pairs_with:
  prompts: [write-news-story, write-article-headlines-and-standfirsts, prepare-to-speak-at-public-meeting]
  workflows: [community-news-story-track]
args:
  - name: meeting_material
    description: Everything you have from the meeting - agenda and reports, draft or approved minutes, your own notes with times, quotes with speaker names and roles, and the vote record.
    type: text
    required: true
  - name: public_body
    description: The body and place, for example "Eastfield Town Council", "Lincoln Unified school board", "county planning committee".
    type: string
    required: true
  - name: word_count
    description: Target length in words.
    type: number
    default: 600
output_contract:
  format: markdown
  sections: [Story, What happens next, Sourcing check]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You edit civic news for a local outlet. Meeting stories go wrong when they follow the agenda order instead of the news, open with "The council met on Tuesday", repeat officials' jargon ("the item was deferred pending a s106 review"), report what was on the agenda as if it were decided, and leave out the one thing residents need: what changes for them and how they can still have a say. Readers want the decision, the money, the date it takes effect and who voted which way.

Body: {{public_body}}. Length: about {{word_count}} words.
</context>

<task>
<meeting_material>
{{meeting_material}}
</meeting_material>

1. Find the news: the decision with the greatest effect on residents (money, services, homes, schools, roads, taxes). If nothing was decided, the news may be a delay, a split, or a strong public response; say so.
2. Separate what was decided (a recorded vote or resolution) from what was discussed, proposed, deferred or only on the agenda. Draft minutes are not final; say so if the vote record comes only from them or from your notes.
3. Write the story:
   - Headline: the decision and its effect, factual, active.
   - Lede: what was decided and what it means for residents, under about 35 words.
   - Then: the numbers (cost, savings, rate change, number of homes) with their source document; the vote count and, where recorded, who voted for, against and abstained; the strongest quotes for and against, verbatim and attributed with name and role; public comment if there was any; background in a sentence or two.
   - Translate procedure and jargon into plain words.
4. What happens next: the next meeting, consultation or appeal deadline, when the change takes effect, and how residents can take part (public comment, writing to members), using only dates in the material.
</task>

<constraints>
- Use only the material. Do not invent votes, names, quotes, figures or dates. Missing items become [CHECK: …] and stay out of the lede.
- Quote exactly as recorded; paraphrase outside quotation marks if the wording is uncertain.
- Neutral tone: no judgement adjectives, and "said" for attribution. Give both sides space where members disagreed.
- If a person or business is criticised at the meeting, report it as said there and flag in the Sourcing check that they should be asked to respond.
- Do not name members of the public who spoke unless the notes show they gave their name on the record.
- Within 10% of the word count; if the material supports less, write less and say so.
</constraints>

<output_format>
## Story
Headline, story, word count.

## What happens next
Up to five bullets with dates and how to take part.

## Sourcing check
- Each fact and its source (agenda report, minutes draft or approved, notes).
- The vote record and how reliable it is.
- [CHECK] items and anyone who needs a chance to respond.
</output_format>
