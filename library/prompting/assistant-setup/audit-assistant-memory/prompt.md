---
schema: 1
id: audit-assistant-memory
kind: prompt
title: Audit what your assistant remembers
description: Reviews the memories an AI assistant has saved about you, marks each to keep, fix or delete, finds the ones skewing answers and returns a clean memory set with steps to apply it.
category: assistant-setup
version: 1.0.0
status: incubating
stage: [review, maintain]
role: [individual]
requires: [none]
inputs: [text, preferences]
output: [checklist, rewrite]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
level: beginner
depth: specific
tags: [saved-memory, personalisation, stale-context, data-minimisation]
pairs_with:
  prompts: [write-memory-profile, review-custom-instructions]
  rules: [privacy-first-assistant-rules]
args:
  - name: memories
    description: The saved memories as listed in the assistant's settings, pasted one per line. Numbering them helps.
    type: text
    required: true
  - name: context
    description: "Optional: what has changed in your life or work, and anything odd you have noticed in answers (for example \"it keeps suggesting vegetarian recipes\")."
    type: text
output_contract:
  format: markdown
  sections: [Verdict per item, Likely causes, Clean memory set, Worth adding, How to apply]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Assistants with memory save facts from conversations, often without asking. After a few months the list collects problems that quietly bend every answer: facts that went stale (an old job, a finished project), wrong inferences (one recipe request for a friend saved as "is vegetarian"), sensitive details nobody meant to keep (a diagnosis, a salary, a child's school), facts about other people, duplicates and contradictions. Most tools let people view and delete saved memories in settings, and some also draw on past chats separately from that list, so cleaning the list does not always remove every source.

<memories>
{{memories}}
</memories>
{{#context}}
<context_notes>
{{context}}
</context_notes>
{{/context}}
</context>

<task>
1. If no memory list is given, explain in three or four lines how people usually find it (the memory or personalisation area of settings; asking the assistant to list what it remembers, which may be incomplete) and stop.
2. Give every item one verdict: keep, update, merge or delete. Give the reason in a few words: stale, wrong inference, sensitive, about someone else, duplicate, too specific to one task, contradicts another item, or still useful.
3. Using the context notes, point to the items most likely behind any odd answers the user described, and say how each one would cause it.
4. Write the clean memory set: kept and updated items as short, durable, plainly worded statements, one fact each, with merges applied.
5. List facts the user's own notes suggest are missing and would improve answers. Only use what the user wrote; do not guess facts about them.
6. Give the steps to apply it: delete in settings rather than by asking in chat where possible, add the new items, start a new chat and ask what the assistant remembers to check, and set a review reminder (every three to six months, or after a big life change).
</task>

<constraints>
- Refer to sensitive items by their number and a neutral label ("item 7, health detail"). Do not repeat account numbers, addresses, diagnoses or other people's details in the output.
- Recommend deleting health, financial, identity, precise location and third-party details unless the user says they want them kept; if kept, say what they change in answers.
- Do not name menu paths or features for a specific tool as fact. Describe them by function and say the wording varies.
- Do not invent memories, and do not add facts that are not in the input.
</constraints>

<output_format>
## Verdict per item
A table: item number, short label, verdict, reason.
## Likely causes
Bullets linking items to the odd behaviour described, or "No odd behaviour described".
## Clean memory set
Numbered short statements, ready to add or keep.
## Worth adding
Bullets taken from the user's notes, or "Nothing".
## How to apply
Numbered steps, ending with the review reminder.
</output_format>
