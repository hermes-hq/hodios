---
schema: 1
id: write-learning-story
kind: prompt
title: Write an early-years learning story
description: Writes an early-years learning story from observation notes in a warm narrative voice, linking what the child did to learning dispositions and outcomes and suggesting next steps.
category: teaching
version: 1.0.0
status: incubating
stage: [review]
role: [teacher]
requires: [none]
inputs: [notes]
output: [article]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [learning-stories, early-years, observation, pedagogical-documentation, family-partnership, play-based-learning]
pairs_with:
  prompts: [plan-early-years-activity, write-report-card-comments]
  personas: [early-years-educator]
args:
  - name: observation
    description: What the educator saw and heard, as factual as possible (what the child did and said, who with, for how long, any photos taken). Use the child's first name or initials as the setting prefers.
    type: text
    required: true
  - name: child_age
    description: The child's age, e.g. "2 years 4 months", "4 years".
    type: string
    required: true
  - name: framework
    description: Optional curriculum framework the setting uses, e.g. "Te Whāriki", "EYLF", "EYFS", "Head Start ELOF".
    type: string
output_contract:
  format: markdown
  sections: [Title, The story, What learning was happening, Where to next, Family voice]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A learning story is a short narrative assessment of a moment in a young child's play, written warmly so the child, their family and other educators can share it. It comes from the New Zealand early-childhood tradition and is now used in many countries. It notices what the child can do and is interested in, recognises the learning (including dispositions such as taking an interest, being involved, persisting with difficulty, expressing ideas, and taking responsibility), and suggests how the educator will build on it. It is credit-based: it describes competence, not deficits. It must also be accurate, because families trust it as a record of their child's day: the story cannot add events the educator did not see.
</context>

<task>
Write a learning story about a child aged **{{child_age}}** from this observation:

<observation>
{{observation}}
</observation>
{{#framework}}
The setting uses: **{{framework}}**.
{{/framework}}

1. **Title:** a short, warm title that captures the moment (for example "The Great Bridge Builder").
2. **The story:** 120 to 220 words in the educator's first-person voice, addressed to the child ("Today I noticed you…") or about the child, as the setting prefers (default: addressed to the child). Tell what happened in order, include the child's own words where the notes give them, and describe their actions, ideas and feelings as observed. Do not add events, dialogue or emotions that are not in the notes; if you need to bridge two moments, keep it general.
3. **What learning was happening:** 3 to 5 sentences, written for the family and educators, naming the dispositions and skills seen, with the evidence for each. If a framework is named and you know it reliably, link to its strands, principles or outcomes by their names; do not invent outcome codes or quote wording you are not sure of. If no framework is named, describe learning in plain terms and suggest the educator add framework links.
4. **Where to next:** 2 or 3 concrete ideas the educator could offer to extend this interest or skill (resources, a provocation, a question to ask, a trip or visitor), following the child's lead.
5. **Family voice:** a short invitation for the family to add a comment, with one or two questions about whether they see this interest at home.
</task>

<constraints>
- Strengths-based and specific. Avoid generic praise ("You are so clever!") and comparisons with other children.
- Stick to the observation. If the notes are too thin for a story (one line, no actions), write a short version and list what to observe next time.
- Use the language suited to a family audience: warm, plain, no jargon unless explained.
- Privacy: refer to other children only by first name or initial as the setting allows, and never include health, family circumstances or behaviour concerns in a story that is shared with families. If the notes include a concern about the child's wellbeing or development, leave it out of the story and add a separate note to the educator to follow the setting's procedure (safeguarding concerns go to the designated lead the same day).
</constraints>

<output_format>
## Title
## The story
## What learning was happening
## Where to next
## Family voice
If the notes contained something left out for privacy or safety, end with a short "Note for the educator" after Family voice.
</output_format>
