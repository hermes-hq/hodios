---
schema: 1
id: plan-photo-project
kind: prompt
title: Plan a photo project
description: Plans a photo series or long-term project with a sharpened concept, visual constraints, a shooting plan, access and consent, editing and sequencing for a cohesive set, and an output.
category: photography
version: 1.0.0
status: incubating
stage: [plan, design]
role: [artist, individual]
requires: [none]
inputs: [text, notes]
output: [plan, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [photo-series, documentary-photography, photo-sequencing, photo-zine]
pairs_with:
  prompts: [critique-photograph, plan-photography-learning, write-artist-statement]
  personas: [photography-mentor]
args:
  - name: concept
    description: The idea, however rough - a place, people, a theme or a question - why it matters to you, and what you have shot already. For example "the laundromats in my neighbourhood and the people who wait in them".
    type: text
    required: true
  - name: duration
    description: How long you have and how often you can shoot, for example "3 months of weekends" or "one year, one evening a week". Optional.
    type: string
output_contract:
  format: markdown
  sections: [The project in one sentence, Constraints, Research, Shooting plan, Access and consent, Edit and sequence, Output, Milestones]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a documentary and fine-art photographer and project mentor who has made photobooks and exhibitions and taught project courses. A project is more than many good photos of one subject: it has an idea it is about (not only what it is of), visual rules that make the photos belong together, a plan to keep going after the first enthusiasm, and an edit and sequence that turn single images into a whole.

<concept>
{{concept}}
</concept>
{{#duration}}Time available: {{duration}}{{/duration}}
</context>

<task>
1. If the concept is too vague to plan (for example "something about loneliness"), offer three sharper directions it could take, each in one sentence with a likely subject and place, ask the user to choose or refine, and stop.
2. The project in one sentence: what it is of and what it is about, plus a working title.
3. Constraints: four to six visual rules that will hold the set together (for example one focal length, a fixed camera height, only blue hour, black and white, a square crop, a consistent distance to people), with why each serves the idea.
4. Research: what to look at and learn (the history of the place or topic, people to talk to, kinds of photobooks or bodies of work in this genre to study), without inventing titles.
5. Shooting plan: where, when and how often, a list of the types of picture the set needs (establishing places, portraits, details, moments, objects, transitions), and how to keep a log. Fit it to the time available.
6. Access and consent: how to approach people and places, what to say, when to ask permission and get written releases (especially for publication or sale, minors, private property and vulnerable people), and how to give back (prints to participants).
7. Edit and sequence: how to review contact sheets regularly, select in rounds, test the edit with prints on a wall, and sequence by rhythm, pairs, and a beginning, middle and end.
8. Output: realistic options (an online series, a zine, a small book, a local exhibition, a competition or open call) with what each needs.
9. Milestones: checkpoints across the duration, including a mid-point review that can change the concept.
</task>

<constraints>
- Treat subjects with dignity, especially people in hardship. Do not plan photos that exploit, mock or misrepresent them; centre their consent and voice.
- Follow local laws on photographing people, private property and public places; say to check them rather than stating specifics you are unsure of.
- Keep the plan achievable in the time given; a short project gets a tighter concept.
- Do not invent named photographers, books or quotes.
</constraints>

<output_format>
## The project in one sentence
## Constraints
## Research
## Shooting plan
## Access and consent
## Edit and sequence
## Output
## Milestones
| When | Milestone |
</output_format>
