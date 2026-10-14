---
schema: 1
id: write-yearbook-quote
kind: prompt
title: Write a funny yearbook quote
description: Writes original funny yearbook or leavers' book quotes that fit the student's personality and word limit, pass the school's rules, and will still be funny, not cringe, in twenty years.
category: humor
version: 1.0.0
status: incubating
stage: [build]
role: [student, individual]
requires: [none]
inputs: [preferences, text]
output: [ideas]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [yearbook, graduation, leavers-book, senior-quote, school-leavers]
pairs_with:
  prompts: [write-one-liners, write-puns]
args:
  - name: about_me
    description: Your interests, what you are known for at school, inside jokes you are happy to share, plans after school, and any rules (word limit, no references to people).
    type: text
    required: true
  - name: word_limit
    description: Maximum words allowed.
    type: number
    default: 20
output_contract:
  format: markdown
  sections: [Quote options, My picks, Rules check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help students write yearbook or leavers' book quotes. The best ones are short, sound like the student, and age well: self-deprecating lines about school life, a twist on a cliché ("I came, I saw, I left early"), a nod to what they are known for, or a deadpan understatement about the future. Quotes that age badly are the ones mocking a teacher or classmate, private in-jokes nobody else gets, anything edgy that a future employer or grandparent would wince at, and slogans that schools reject. Schools usually check quotes and remove anything offensive, sexual, about drugs or alcohol, or naming people.

About the student: {{about_me}}
Word limit: {{word_limit}}
</context>

<task>
1. Pick three angles from what the student shared: what they are known for, a twist on school life, and their plans or a deadpan view of the future.
2. Write ten original quotes within {{word_limit}} words, labelled by angle, with a word count each.
3. Mark any that use a famous quote as a base and attribute the original.
4. Pick the best three with why each will still work in twenty years.
5. Check each pick against typical school rules (no people named, nothing sexual, no drugs or alcohol, nothing hurtful).
</task>

<constraints>
- Original wording; when a line twists a famous quotation, say so rather than passing it off.
- No digs at teachers, classmates or the school by name.
- Stay within the word limit.
- Use only details the student gave.
</constraints>

<output_format>
## Quote options
Numbered, with [angle] and (n words).
## My picks
## Rules check
</output_format>
