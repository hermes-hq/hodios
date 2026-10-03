---
schema: 1
id: write-jokes-for-kids
kind: prompt
title: Write jokes for kids
description: Writes age-right jokes, knock-knocks and riddles for children on a theme, notes which ones teach wordplay, and plans a mini joke show the child can perform for the family.
category: kids-activities
version: 1.0.0
status: incubating
stage: [build]
role: [parent, teacher]
requires: [none]
inputs: [preferences, topic]
output: [ideas, script]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [kids-jokes, knock-knock, wordplay, joke-show, lunchbox-notes, kind-humour]
pairs_with:
  prompts: [write-riddles, write-puns, create-puppet-show]
args:
  - name: age
    description: The child's age in years, or the youngest age in the group. Decides which kinds of jokes will land.
    type: number
    required: true
  - name: theme
    description: The topic, for example "animals", "dinosaurs", "space", "food", "school", "Halloween", or "a mix".
    type: string
    default: animals
  - name: count
    description: How many jokes in total.
    type: number
    default: 15
output_contract:
  format: markdown
  sections: [The jokes, Why they are funny, Mini joke show]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write jokes for children that they will actually laugh at and want to tell again. What is funny changes fast with age. Under five, children laugh at silliness, surprise and absurd images (a cow saying "quack"), and they often do not get puns yet. From about six, they discover that words can mean two things, and knock-knocks and simple puns become hugely satisfying. From about eight or nine, they enjoy clever wordplay, riddles with a twist and jokes they can use to stump adults. Telling jokes also builds language skills, confidence and timing.

Age: {{age}}
Theme: {{theme}}
Number of jokes: {{count}}
</context>

<task>
1. If the age is missing, ask and stop.
2. Choose the mix for the age: for under-fives, mostly silly-surprise jokes and very simple knock-knocks with the pattern explained; for six to eight, knock-knocks, simple puns and "what do you call…" jokes; for nine and up, sharper puns, riddles and jokes with a twist. Group them by type.
3. Write {{count}} jokes on the theme. Each must be short enough for the child to remember, with the punchline on its own line. Prefer original jokes; where you use a well-known classic, make sure it is told correctly.
4. Why they are funny: for four or five of the jokes, explain the wordplay in one child-friendly sentence (the double meaning, the sound-alike word), so a grown-up can help the child "get it". Mark these jokes as good for learning words.
5. Mini joke show: a five-minute show the child can perform for family or friends - an opening line, the order of jokes (start with a sure laugh, end with the best), where to pause before the punchline, how to handle a joke that falls flat ("Tough crowd!"), a bow, and an optional role for a sibling or friend as the knock-knock partner.
6. Before answering, read every joke as a child of this age would: check that the punchline works, that the double meaning exists in the language used, that no joke depends on knowledge too advanced for the age, and that the count is right.
</task>

<constraints>
- Kind humour only: no jokes about bodies, appearance, weight, disability, race, religion, gender, families or any group; no mean or put-down humour, even gentle.
- No toilet or gross-out humour unless the user asks for it, and then keep it mild and suitable for school.
- No references to scary, violent or adult topics; Halloween jokes stay silly, not frightening.
- Do not explain every joke; explanations are only for the ones marked for learning.
</constraints>

<output_format>
## The jokes
Grouped under `###` headings by type, numbered. Setup line, then the punchline on the next line.
## Why they are funny
## Mini joke show
</output_format>

<examples>
Age 6, theme food:
What do you call a sad strawberry?
A blueberry!
(Why it is funny: "blue" is a colour and also means sad.)
</examples>
