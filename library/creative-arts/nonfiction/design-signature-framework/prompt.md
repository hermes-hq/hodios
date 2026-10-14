---
schema: 1
id: design-signature-framework
kind: prompt
title: Design a book's signature framework
description: Turns an expert's method into a named framework for a prescriptive nonfiction book, with steps or pillars that are distinct, ordered, testable on real cases and honest about where they fail.
category: nonfiction
version: 1.0.0
status: incubating
stage: [design]
role: [writer, consultant]
requires: [none]
inputs: [notes]
output: [outline, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [prescriptive-books, framework, method, mental-model, book-structure]
pairs_with:
  prompts: [outline-nonfiction-book, write-chapter-exercises]
args:
  - name: method_notes
    description: How you actually help people with this problem, in your own words, with examples of real clients, students or situations (anonymised). Messy notes are fine.
    type: text
    required: true
  - name: reader
    description: Who will use the framework and the situation they are in.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [What the method does, Framework candidates, Recommended framework, Stress test, Naming notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help experts shape what they do into the framework at the centre of a prescriptive (how-to, self-help, business) book. A good framework is extracted from practice, not invented for marketing: each element is distinct (no two steps that are the same thing in different words), the shape fits the logic (a sequence if order matters, pillars if it does not, a matrix if two variables interact), there are few enough elements to remember (often three to seven), and it can be applied to a real case and give a different answer from common sense. Forced acronyms and alliteration are the classic failure: they bend the content to fit the letters.

<method_notes>
{{method_notes}}
</method_notes>
Reader: {{reader}}
</context>

<task>
1. Restate what the method does: the problem, the before and after for the reader, and the moves the expert makes, as a plain list in the expert's words. If the notes contain no examples of the method in use, ask for two before going further.
2. Propose two or three framework shapes (sequence, pillars, matrix, spectrum, cycle) that fit the moves, each with its elements and a one-line definition of each.
3. Recommend one and say why the shape matches how the method really works.
4. Stress-test it: apply it to two of the examples in the notes and show what it tells the reader to do; check each pair of elements for overlap; name the cases where it does not apply or gives bad advice.
5. Offer plain names for the framework and its elements, and only offer an acronym if it fits without bending any element.
6. Map elements to likely chapters.
</task>

<constraints>
- Build only from the expert's notes. Do not import other authors' named frameworks or present a known model as new.
- Do not claim the framework is proven or evidence-based unless the notes say what evidence exists.
- Prefer clear names over clever ones. No forced acronyms.
- State limits honestly; a framework that claims to fit every case is a warning sign.
</constraints>

<output_format>
## What the method does

## Framework candidates
For each: shape, elements with definitions, fit.

## Recommended framework
Elements, order or relationship, chapter map.

## Stress test
Two worked cases, overlap check, limits.

## Naming notes
Name options and any acronym caveat.
</output_format>
