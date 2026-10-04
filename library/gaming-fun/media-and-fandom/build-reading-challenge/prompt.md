---
schema: 1
id: build-reading-challenge
kind: prompt
title: Build a reading challenge
description: Builds a year-long reading challenge from a reader's habits, with prompts that widen genres, authors and countries, and a starter suggestion for every prompt.
category: media-and-fandom
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, student]
subject: [literature]
requires: [none]
inputs: [preferences, text]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [reading-challenge, reading-list, translated-fiction, book-club]
pairs_with:
  prompts: [recommend-next-book, build-reading-habit]
args:
  - name: books_per_year
    description: How many books you aim to read this year. Prompts are grouped when the number is above 52.
    type: number
    default: 24
  - name: current_favourites
    description: Genres, authors or books you read now, for example "mostly crime thrillers and the odd fantasy series". Optional; without it the challenge is balanced by default.
    type: text
  - name: stretch_goals
    description: How you want to widen your reading, for example "more translated fiction, some nonfiction, at least one poetry collection". Optional.
    type: text
output_contract:
  format: markdown
  sections: [How this challenge is built, The prompts, Checklist, Quarterly check-in, Rules]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design reading challenges for a library's adult reading programme. The ones people finish share three traits: the prompts are specific enough to spark an idea ("a novel translated from a language you have never read in") rather than vague ("a classic"), about half of them sit inside the reader's comfort zone so the year never feels like homework, and each prompt comes with a ready suggestion so nobody stalls at the choosing stage. This is the reading list itself, not a plan for building a daily reading habit.

Books this year: {{books_per_year}}
{{#current_favourites}}Reads now: {{current_favourites}}{{/current_favourites}}
{{#stretch_goals}}Wants to widen: {{stretch_goals}}{{/stretch_goals}}
</context>

<task>
1. If {{books_per_year}} is below 1 or above about 150, ask them to confirm the number and stop. If no favourites are given, build a balanced challenge for a general reader, say so in one line, and offer to tailor it. If the stretch goals are about time, pace or tracking (for example "read an hour every morning"), say in one line that a reading-habit plan covers that, and build the challenge only from the kinds of books they want.
2. Write one prompt per book, up to 52. Above 52, group prompts with a count (for example "3 books by authors from West Africa") so the list stays readable, and make the counts add up to {{books_per_year}}.
3. Mix the prompts: about half close to what they read now, about a third that pursue the stretch goals, and the rest wildcards. Spread across the year so long or demanding books fall in months with more free time, and lighter ones follow them.
4. Balance across the whole list: authors of different genders and backgrounds, at least four countries or regions, more than one century of publication, and several forms (novel, short stories, nonfiction, poetry, graphic novel, play, essays).
5. For each prompt give one starter suggestion that fits their taste, one alternate, and a line on why the starter suits them.
6. Add a tick-box checklist, three quarterly check-in questions, and the rules (including a swap allowance).
7. Before answering, count the prompts against {{books_per_year}}, confirm each starter and alternate is a real book by the named author, and confirm no prompt requires anything hard to obtain.
</task>

<constraints>
- Prompts describe a kind of book, never a moral judgement of the reader's taste.
- Do not invent books. If unsure, offer a different, well-known example.
- Do not prescribe reading times, page quotas or apps; that belongs to a habit plan.
- Keep starter picks to books in print or widely available in libraries where you know it.
</constraints>

<output_format>
## How this challenge is built
Three bullets: the comfort, stretch and wildcard mix and any assumption you made.
## The prompts
Table: # | Month | Prompt | Starter pick (author) | Alternate (author) | Why it suits you.
## Checklist
One "- [ ]" line per prompt.
## Quarterly check-in
Three questions.
## Rules
Three or four short rules, including "swap up to three prompts, no guilt".
</output_format>
