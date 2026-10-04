---
schema: 1
id: tidy-flashcard-deck
kind: prompt
title: Tidy a flashcard deck
description: Critiques an existing flashcard deck for bad cards (lists, ambiguous prompts, guessable wording, orphan facts, overlong answers), rewrites or splits them, and reports what changed.
category: studying
version: 1.0.0
status: incubating
stage: [review, learn]
role: [student, language-learner]
requires: [none]
inputs: [text, file]
output: [rewrite, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [spaced-repetition, minimum-information, cloze-deletion, card-design]
pairs_with:
  prompts: [make-flashcards, create-memory-aids]
args:
  - name: cards
    description: The cards, one per line as "front | back" or pasted from an export. Up to about 60 cards per run. Say the subject or exam if it is not obvious.
    type: text
    required: true
  - name: card_types
    description: Which card types your tool supports for the rewrite.
    type: enum
    enum: [basic, basic-and-cloze]
    default: basic-and-cloze
output_contract:
  format: markdown
  sections: [Summary, Rewritten deck, Removed or merged, Import block, Habits for new cards]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A student has a flashcard deck (Anki, Quizlet, paper or similar) that feels slow or frustrating to review. Most problems come from a few kinds of bad card: several facts or a whole list on one card, so the student "half knows" it every time; ambiguous prompts with more than one right answer; prompts so close to a textbook sentence that the student recognises the wording instead of recalling the idea; orphan facts with no context about why they matter; yes/no cards; and long answers that cannot be checked quickly. The principle used by experienced spaced-repetition users is minimum information: one small, unambiguous fact per card, phrased so the answer must be retrieved, not recognised. Tidying means rewriting and splitting, not deleting the student's content. Card types available: {{card_types}}.
</context>

<task>
<cards>
{{cards}}
</cards>

1. Number the cards in their original order. Accept "front | back", tab-separated or similar exports; if a line cannot be split into front and back, list it under Removed or merged as [unclear] and ask.
2. Diagnose each card against these issues: list or set on one card; more than one fact; ambiguous prompt; guessable or recognisable wording; orphan fact (no context); yes/no or true/false; answer longer than about 15 words; duplicate or near-duplicate; factual doubt.
3. Fix each problem card:
   - Lists: split into one card per item with a shared context line, or overlapping cloze deletions if cloze is available; for ordered lists, cards that ask "what comes after X".
   - Ambiguous: add context to the prompt (subject, era, unit) until only one answer fits.
   - Recognisable wording: rephrase into a question, or ask for an example or application.
   - Orphan facts: add a short "why it matters" or link to a bigger idea on the back.
   - Yes/no: turn into an open question.
   - Long answers: shorten to the key point; move detail to an extra note.
4. Keep good cards unchanged and say so.
5. Count what changed.
</task>

<constraints>
- Do not delete content the student made except exact duplicates; split or rewrite instead. Merges and removals are listed separately with reasons.
- Do not change facts. If a card's answer looks wrong or doubtful, keep it, mark it [check], and say why.
- Use cloze cards only when the card types above include cloze; otherwise rewrite lists as separate basic cards.
- If more than about 60 cards are pasted, handle the first 60 and say how to run the rest.
- If the subject is unclear and it changes how a prompt should be disambiguated, ask.
</constraints>

<output_format>
## Summary
Table: Issue | Cards affected (numbers) | Count. Then one line: cards in, cards out.

## Rewritten deck
Table: Original # | Front | Back | Change (unchanged, split, reworded, context added, shortened, check).

## Removed or merged
Bullets with reasons, or "None".

## Import block
The final deck as tab-separated lines (front, tab, back) in a code block, ready to import. If there are cloze cards, put them in a second code block: most tools import one card type per file, so basic and cloze cards are imported separately, each with the matching card or note type. Write cloze text in the tool's cloze syntax (in Anki: the hidden text inside double curly braces, prefixed by c1 and two colons). Keep any formatting tags (such as line breaks) that were in the pasted export, and never put a tab inside a field.

## Habits for new cards
Five short rules for writing future cards, drawn from this deck's most common problems.
</output_format>
