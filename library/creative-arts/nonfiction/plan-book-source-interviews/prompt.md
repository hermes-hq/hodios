---
schema: 1
id: plan-book-source-interviews
kind: prompt
title: Plan interviews for a nonfiction book
description: Plans interviews with sources for a nonfiction book, with who to ask, what each must yield, ground rules on attribution and consent, question sets that draw out scenes and a log for follow-ups.
category: nonfiction
version: 1.0.0
status: incubating
stage: [plan]
role: [writer, researcher]
requires: [none]
inputs: [notes, text]
output: [plan, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [source-interviews, sources, attribution, consent, journalism-ethics]
pairs_with:
  prompts: [plan-book-research, write-narrative-nonfiction-scene]
args:
  - name: book_and_chapter
    description: What the book is about and the chapter or story these interviews serve, with what you still need to know or show.
    type: text
    required: true
  - name: sources
    description: The people or kinds of people you plan to interview and how you know of them. Roles or initials are fine.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Interview plan, Ground rules, Question sets, After each interview]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help nonfiction authors interview sources. Book interviews differ from news interviews: the author often needs scenes (what the room looked like, who said what, what they felt then rather than now), returns to the same source several times, and publishes years later, when the source's circumstances may have changed. Experienced reporters agree attribution terms before the interview starts (on the record, background, not for attribution), never retroactively; ask for concrete moments ("walk me through the morning it happened") rather than opinions; ask for documents, photos and other people who were there to corroborate memory; and keep careful records because memory is reconstructive and two people remember the same event differently.

<book_and_chapter>
{{book_and_chapter}}
</book_and_chapter>
<sources>
{{sources}}
</sources>
</context>

<task>
1. Interview plan: for each source, what the chapter needs from them (scene, expertise, corroboration, a counterview), the order to interview them in and why (often background sources first, the central figure when you know enough, the critics before publication).
2. Ground rules: the attribution terms to agree upfront, how to record consent to record and to quote, how to treat vulnerable sources (minors, people at legal or employment risk, people describing trauma) and what you will and will not promise (for example, never promise copy approval unless you mean it).
3. Question sets for each source: warm-up, scene-building questions (sensory detail, sequence, dialogue as remembered), the hard question placed late, corroboration asks (documents, other witnesses), and a closing question ("what should I have asked?").
4. After each interview: what to log (date, terms, recording location, key quotes with timestamps, claims to verify, follow-ups) and how to handle conflicting accounts between sources.
</task>

<constraints>
- Do not script answers or suggest leading questions that put words in the source's mouth.
- Recommend checking local law on recording calls and on data protection; consent rules for recording differ between countries and states.
- Do not advise deceiving sources about the book's subject or angle.
- For sources describing abuse, crime or trauma, include care steps and recommend trauma-informed practice; do not push for detail the source does not want to give.
</constraints>

<output_format>
## Interview plan
Table: Source | What the chapter needs | Order | Notes.

## Ground rules
Bullets.

## Question sets
One subsection per source.

## After each interview
Log fields and the conflicting-accounts approach.
</output_format>
