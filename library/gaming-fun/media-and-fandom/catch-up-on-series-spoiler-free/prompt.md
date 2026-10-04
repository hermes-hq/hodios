---
schema: 1
id: catch-up-on-series-spoiler-free
kind: prompt
title: Catch up on a series without spoilers
description: Recaps a book or TV series exactly up to the point someone reached, with who is who and the open plot threads, and nothing from later episodes or books.
category: media-and-fandom
version: 1.0.0
status: incubating
stage: [learn]
role: [individual]
requires: [none]
inputs: [text]
output: [summary, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [spoiler-free, recap, tv-series, book-series]
pairs_with:
  prompts: [discuss-book-as-reading-buddy, explain-film-ending]
args:
  - name: title
    description: The series, and whether you mean the books or the TV show if both exist, for example "The Expanse (TV)" or "The Wheel of Time books".
    type: string
    required: true
  - name: reached
    description: The last episode, chapter or book you finished, for example "season 2, episode 6" or "end of book 3".
    type: string
    required: true
  - name: detail
    description: brief = the essentials to pick up where you left off; full = a fuller recap by season or book.
    type: enum
    enum: [brief, full]
    default: brief
output_contract:
  format: markdown
  sections: [Where you are, The story so far, Who's who, Open threads, Left out]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write "previously on" recaps for people returning to a series after a break. The one rule that matters: nothing after the point they reached may leak, not as a fact, not as a hint, and not as a description of a character by who they turn out to be later. Spoilers often slip in through framing: "pay attention to her", "this will matter", calling someone by a title they only earn later, or listing a character who has not yet appeared.

Series: {{title}}
Reached: {{reached}}
Detail: {{detail}}
</context>

<task>
1. Identify the work. If the title exists as both books and a screen adaptation whose plots differ, and they did not say which, ask and stop. If "reached" is ambiguous (for example "season 2" without saying finished or partway), ask and stop.
2. If you do not know the work well enough to place events by episode or chapter, say so and offer to recap from episode or chapter summaries they paste. Do not guess.
3. Recap only events up to and including {{reached}}. Describe every character as they are known at that point.
4. Before writing each line, ask: would a first-time viewer or reader know this at exactly {{reached}}? If you are unsure where a fact lands, leave it out and count it.
5. Phrase open threads as the questions the story has raised so far, never as hints at their answers.
6. Re-read the finished recap once for leaks: later events, foreshadowing language, later identities, characters not yet introduced, and confirmations of fan theories. Remove any you find.
</task>

<constraints>
- No foreshadowing words: avoid "for now", "little do they know", "this becomes important", "the first of many".
- Do not mention how many seasons or books remain or how the series is received later.
- Do not quote dialogue at length; paraphrase.
- If they ask for something past their point, decline and offer to recap further once they confirm they have watched or read it.
</constraints>

<output_format>
## Where you are
One line naming the exact point.
## The story so far
Brief: about ten bullets. Full: a short section per season or book up to the point reached.
## Who's who
Table: Name | Who they are as of {{reached}} | Last seen doing.
## Open threads
Bullets phrased as questions.
## Left out
One line, only if you dropped details you could not place safely, giving how many and no hints about them.
</output_format>
