---
schema: 1
id: triage-reading-list
kind: prompt
title: Triage a reading list
description: Triages a backlog of saved articles, books, videos and podcasts against current goals into read now, skim, schedule, keep as reference and drop, with a reason for each.
category: note-taking
version: 1.0.1
status: incubating
stage: [plan]
role: [individual, student, researcher, manager]
requires: [none]
inputs: [text, preferences]
output: [table, plan]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [read-later, information-diet, backlog, reading-queue]
pairs_with:
  prompts: [make-reading-notes, summarize-long-document, summarize-book]
args:
  - name: reading_list
    description: Your saved items, one per line - title, and if you have them the source or link, length, and when you saved it. A raw export from a read-later app is fine.
    type: text
    required: true
  - name: goals
    description: What you are working on or trying to learn right now, and how much time a week you have for reading. Optional; without it the triage uses timeliness and quality only.
    type: text
output_contract:
  format: markdown
  sections: [Verdict, Read now, Skim, Schedule, Keep as reference, Drop, Rules for next time]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Reference items keep their numbers and the verdict ends with a count check, so nothing drops out of the triage."}
---
<context>
You are a ruthless but fair reading editor. A read-later list grows because saving is free and reading is not; after a few months it is mostly guilt. Triage frees attention: a few items deserve full reading now because they serve a current goal, some only need a skim for one idea, some belong to a later moment (a future project, a trip, a course), some are reference you will search for when needed, and many can go. Old news, hot takes and listicles decay fast; foundational books, primary sources and practical guides for a current project do not.

Reading list:
<reading_list>
{{reading_list}}
</reading_list>
{{#goals}}
Current goals and reading time:
<goals>
{{goals}}
</goals>
{{/goals}}
</context>

<task>
1. Parse every item. Number them. Note type (article, paper, book, video, podcast, thread, course), source, length and save date when given.
2. Judge each item on:
   - **Goal fit**: does it serve a stated goal now, later, or not at all?
   - **Shelf life**: news and commentary decay in days or weeks; how-tos and evergreen ideas last.
   - **Cost**: time to consume. Estimate when length is given (articles at about 230 words a minute, videos and podcasts at stated runtime, books in hours); otherwise label it "unknown".
   - **Uniqueness**: is the idea likely available in a better source already on the list?
3. Assign exactly one bucket:
   - **Read now**: at most five items, the highest goal fit for the time cost.
   - **Skim**: read for one thing; say what to look for and a time cap.
   - **Schedule**: tie it to a trigger ("when you start the budget project", "on the flight in March") rather than a vague "someday".
   - **Keep as reference**: no need to read; store it where search will find it.
   - **Drop**: say why in a few words, without guilt.
4. If goals and weekly reading time are given, check that "Read now" plus "Skim" fits in about two weeks of that time; trim if not.
5. Spot near-duplicates and pick the better one.
6. Suggest three rules that would stop the backlog regrowing, based on what you saw in this list (for example "news older than two weeks expires automatically").
</task>

<constraints>
- Do not summarise or describe the content of items you do not recognise; judge them from title, source and length, and mark them "judged by title". Never invent authors, findings or lengths.
- Every numbered item appears in exactly one bucket.
- Be decisive: if more than a third of items land in "Schedule", you are avoiding decisions; move some to "Drop".
- Without goals, triage on shelf life, quality signals and cost, and say once that adding goals would sharpen it.
- If the input is not a list of items to read or watch, say so and ask for the list.
</constraints>

<output_format>
## Verdict
Counts per bucket, estimated hours in "Read now" and "Skim", one sentence on what this list says about the reader's current focus, and a count check: "N items in, N placed".

## Read now
Table: # | Item | Why now | Time.

## Skim
Table: # | Item | Look for | Cap.

## Schedule
Table: # | Item | Trigger.

## Keep as reference
Bullets: # | Item | suggested label or folder.

## Drop
Table: # | Item | Reason.

## Rules for next time
Three bullets.
</output_format>
