---
schema: 1
id: create-memory-aids
kind: prompt
title: Create memory aids for lists and facts
description: Creates mnemonics, memory palaces and chunking schemes for list-like facts, then runs a short recall test and repairs the weak links. Use for lists, sequences and arbitrary pairings.
category: studying
version: 1.0.0
status: incubating
stage: [learn]
role: [student, language-learner, individual]
requires: [none]
inputs: [text, notes]
output: [explanation, quiz]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
tags: [mnemonics, memory-palace, chunking]
pairs_with:
  prompts: [make-flashcards]
args:
  - name: facts
    description: The list, sequence or pairs to memorise, e.g. the 12 cranial nerves in order or the dates of key treaties.
    type: text
    required: true
  - name: style
    description: Which technique to use. mixed picks the best one for each group of facts.
    type: enum
    enum: [acronym, story, memory-palace, mixed]
    default: mixed
output_contract:
  format: markdown
  sections: [What to memorise, Memory aids, Recall test]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Mnemonics shine for arbitrary information: ordered lists, names, numbers and pairings with no logic to hold on to. They are the wrong tool for material that has a reason behind it, where understanding the mechanism is easier to remember and more useful. A good mnemonic uses vivid, concrete, slightly absurd images, keeps each cue clearly tied to its item, and comes with a decoding key so it cannot be recalled wrongly.
</context>

<task>
Create memory aids for the facts below using the `{{style}}` technique, then test recall.

<facts>
{{facts}}
</facts>

1. Sort the facts into groups: ordered sequences, unordered sets, pairings (term ↔ number, term ↔ meaning) and items that have a real logic behind them. For the last group, give the logic in one line instead of a mnemonic.
2. Chunk long lists into groups of 3 to 5 items by a real shared feature where possible.
3. Build the aids:
   - **Acronym or acrostic:** first letters form a word or a memorable sentence. Keep the order if the list is ordered. Prefer real words; when letters do not allow one, use an acrostic sentence.
   - **Story:** one short scene per item, with each image changing into or crashing into the next, so the order is part of the plot.
   - **Memory palace:** place one vivid image per item at a fixed stop along a route the learner knows well. If they have not named a place, use a generic home route (front door, hallway, kitchen, sofa, stairs, bathroom, bed) and tell them to swap in their own rooms.
   - **Numbers:** turn digits into images with a consistent code (for example the major system) and say which code you are using.
   - **Mixed:** choose the technique that fits each group and say why in a few words.
4. Under every aid, give the decoding key: each cue → the exact item it stands for.
5. End with a recall test of 5 to 8 prompts in a different order from the list: some asking for the whole sequence, some for one item ("what comes after X?", "what is the 4th?"). Do not show the answers. Wait for the learner's reply.
6. When they reply, mark each answer, then strengthen any cue that failed: make the image more vivid or change the cue so it no longer clashes with a neighbouring one. Offer one more round on the misses.
</task>

<constraints>
- Every cue must decode to exactly one item. Avoid two cues that could stand for the same item.
- Keep imagery memorable but suitable for any learner: absurd is good, gory or sexual is not.
- Do not change, shorten or "correct" the facts. If a fact looks wrong, ask before building on it.
- If the facts are too vague to memorise (a topic instead of a list), ask for the exact list and stop.
</constraints>

<output_format>
## What to memorise
The groups from step 1, with any "remember the logic instead" items.
## Memory aids
For each group: the technique, the aid, and the decoding key as a two-column table (Cue | Item).
## Recall test
A numbered list of prompts with no answers, then the line "Answer from memory, without scrolling up."
</output_format>
