---
schema: 1
id: write-family-story-for-children
kind: prompt
title: Write a family story for children
description: Turns a grandparent's or relative's true story into a short picture-book text for children, keeping the facts true, explaining hard parts at the child's level and marking details to check with family.
category: life-writing
version: 1.0.0
status: incubating
stage: [build]
role: [parent, individual]
requires: [none]
inputs: [notes, text]
output: [rewrite, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
tags: [family-history, picture-book, grandparents, true-story, read-aloud]
pairs_with:
  prompts: [write-family-history, interview-relative-for-oral-history, write-childrens-story]
args:
  - name: story_notes
    description: The true story as you know it - who, where, when, what happened, the details the family always tells, and anything you are not sure about. Include who the story is about and how they are related to the child.
    type: text
    required: true
  - name: child_age
    description: The age of the child who will hear or read the book, in years.
    type: number
    required: true
  - name: pages
    description: Number of spreads or pages of text, as in a picture book.
    type: number
    default: 12
output_contract:
  format: markdown
  sections: [The book, Illustration notes, Facts to check, Talking about it]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write true family stories for children: books that families make about a grandparent's journey to a new country, a great-aunt's farm, a parent's childhood in another city. These books work when the person is shown as a real child or young adult the reader can recognise (scared, brave, funny, homesick), when the story follows one clear journey rather than a whole life, and when the hard parts (war, poverty, illness, loss, leaving home) are told truthfully at a level the child can hold, with safety and connection at the end. They go wrong when facts are prettied up into fiction, when frightening detail is too vivid, or when the story turns into a history lecture.

<story_notes>
{{story_notes}}
</story_notes>
Child's age: {{child_age}}. Pages: {{pages}}.
</context>

<task>
1. If the notes do not say who the story is about, their link to the child, and at least one event, ask for those and stop. Otherwise list your assumptions.
2. Choose one journey from the notes (a move, a first job, a brave day, how two grandparents met) with a beginning, a challenge and a warm ending that connects to the child ("and that is why your grandma...").
3. Write the text across {{pages}} pages, labelled Page 1, Page 2 and so on. Pitch to age {{child_age}}: under 5, one or two short sentences a page and a repeated line; 5 to 8, two to four sentences a page and simple dialogue only if the notes record it; 9 and up, a little more detail, feelings and context.
4. Handle hard parts honestly at the child's level: name what happened plainly, focus on how the person felt and who helped, and leave out graphic detail. Do not hide a major fact the family wants told, and do not add one they did not give.
5. Keep facts true: every event, place, name and date comes from the notes. Where the story needs a detail the notes lack (the colour of the boat, what she packed), either leave it out or mark it [check] in the text and add it to Facts to check.
6. Check before output: the story follows one journey; every page has something for the illustrator to draw; no invented events; hard parts suit the age.
</task>

<constraints>
- Do not invent events, dialogue, people or dates. Remembered family dialogue may be used if the notes give it.
- Respect everyone in the story: no villains made up for drama, and careful handling of living relatives' private details.
- Avoid stereotypes about any country, culture or group; describe places through the person's own experience.
- If the notes include trauma (persecution, violence, abuse), keep it to what the age can carry and suggest the family decide together how much to include.
</constraints>

<output_format>
## The book
A title, then Page 1 to Page {{pages}}, each with its text.

## Illustration notes
One line per page: what the picture could show, using only facts from the notes or photos the family may have.

## Facts to check
Table: Page | Detail | Why it needs checking | Who might know.

## Talking about it
Three or four questions to ask the child after reading, and one idea for adding family photos or a real object to the book.
</output_format>
