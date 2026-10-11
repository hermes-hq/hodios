---
schema: 1
id: write-office-copilot-prompts
kind: prompt
title: Write prompts for an office suite assistant
description: Writes prompts for the AI assistant inside a word processor, spreadsheet, email or chat app that point to the right files, ranges and threads and ask for output you can check.
category: prompt-engineering
version: 1.0.0
status: incubating
stage: [build]
role: [individual, manager, operations-manager, business-analyst]
requires: [none]
inputs: [text]
output: [prompt, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [office-assistant, workplace-ai, email-summaries, document-drafting, checkable-output]
pairs_with:
  prompts: [write-spreadsheet-ai-prompts, write-task-prompt, build-ai-output-review-checklist]
args:
  - name: app
    description: Which app or apps the assistant sits in, for example a word processor, spreadsheet, email client, slides or team chat.
    type: string
    required: true
  - name: tasks
    description: The jobs you want it to do, in your own words, for example "summarise this week's emails from the client" or "find why the totals do not match last month".
    type: text
    required: true
  - name: material
    description: Optional - the files, sheets, tables, folders or threads involved and how they are named.
    type: text
output_contract:
  format: markdown
  sections: [Assumptions, Prompts, How to check each output, Data cautions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Assistants built into office apps work on what they can see: the open document, a selection, a file or thread you reference, or whatever your account can reach across mail and storage. Vague prompts ("summarise this", "analyse the data") get generic answers because the assistant has to guess the scope. Prompts that work name the exact source (file name, sheet and range or table, email thread, sender and date range), the reader and purpose, and the shape of the output, and they ask for something checkable: where each point came from, the formula behind a number, a new column instead of overwritten data. In spreadsheets, data formatted as a table with clear headers gets much better results than loose ranges. Org-wide assistants can also surface files the user did not mean to include.

App: {{app}}
<tasks>
{{tasks}}
</tasks>
{{#material}}
<material>
{{material}}
</material>
{{/material}}
</context>

<task>
1. For each task, decide what the assistant needs to see and how to point to it. If a task is unclear about the source or the goal, state an assumption and write the prompt with a bracketed placeholder.
2. Write one prompt per task with: the action, the exact source with placeholders such as [FILE NAME], [SHEET!A1:F200] or [THREAD SUBJECT], [DATE RANGE]; the reader and purpose; the output shape and length; and a request for checkable output (source locations for each point, formulas shown, assumptions listed, changes added beside the original rather than replacing it).
3. Where a task is too big for one prompt, split it into two or three prompts run in order, and say why.
4. For each prompt, give a quick check the user can do in under two minutes: open the cited cells, re-add one total by hand, read the original email for one quoted point, compare the draft with the source for names and dates.
5. List data cautions: what not to include, how to limit the assistant's scope to the named file or folder, and what to do before sharing AI output with others.
</task>

<constraints>
- Do not claim specific menu names, commands or features of a named product as fact; describe them generically ("reference the file", "select the range").
- Never write prompts that ask the assistant to send, delete or overwrite anything without the user reviewing it first.
- Do not invent file names, figures or people; use placeholders.
- Keep each prompt under about 90 words.
</constraints>

<output_format>
## Assumptions
Bullets.
## Prompts
Numbered, each in a fenced block with a one-line note on when to use it.
## How to check each output
Table: Prompt | Quick check | Red flag.
## Data cautions
Bullets.
</output_format>
