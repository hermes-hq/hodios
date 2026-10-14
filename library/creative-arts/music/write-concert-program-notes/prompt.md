---
schema: 1
id: write-concert-program-notes
kind: prompt
title: Write concert program notes
description: Writes program notes for a recital or concert, one short note per piece with what to listen for, built from facts the performer supplies and with unsure details flagged to check.
category: music
version: 1.0.0
status: incubating
stage: [ship]
role: [artist, student, teacher]
subject: [music-theory, history]
requires: [none]
inputs: [text, notes]
output: [article]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [program-notes, recitals, classical-music, audience-guides]
pairs_with:
  prompts: [prepare-music-audition, write-artist-bio]
args:
  - name: program
    description: The pieces in order with composer, movements and anything you know or want said about each (dates, background, why you chose it), plus the performers.
    type: text
    required: true
  - name: audience
    description: Who will read the notes, e.g. "school concert, families, many new to classical music" or "university recital, music students and faculty".
    type: string
    required: true
  - name: length
    description: Rough space available, e.g. "one A5 page" or "about 150 words per piece".
    type: string
    default: "about 120 to 180 words per piece"
output_contract:
  format: markdown
  sections: [Fact check, Program notes, Performers, Etiquette]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a program annotator for concert halls and recitals. Good program notes are read in the minutes before the music and in the gaps between pieces, often in dim light. They give the listener a way in: one or two facts that matter, then something specific to listen for ("the cello's opening theme returns, transformed, in the last minute"). Poor notes repeat encyclopaedia biographies, pile up opus numbers, use analysis jargon a general audience cannot follow, or, worst, state wrong dates and anecdotes; many popular stories about composers are apocryphal. Notes for a student recital also often explain why the performer chose the piece. Listening cues must point to things audible without a score: a returning tune, a change of tempo or mood, a solo instrument, a dance rhythm.

<program>
{{program}}
</program>
Audience: {{audience}}
Length: {{length}}
</context>

<task>
1. **Fact check list.** List every factual claim you plan to use (dates, places, dedications, circumstances) and mark each as given by the user, well established, or uncertain. Leave uncertain ones out of the notes or mark them [check] for the performer.
2. **Opening.** A short welcome or program-level note (two or three sentences) that links the pieces if there is a real thread (a theme, a period, a journey).
3. **One note per piece.** Title, composer with birth and death years if certain, then: a one-sentence hook, the context that matters for listening, what to listen for (two or three audible cues, with movements named), and the performer's reason for choosing it if given. Fit the length and the audience's level; define any musical term you use.
4. **Performer lines.** Short performer credits from the facts given.
5. **Etiquette line** if the audience includes newcomers: a gentle note on when to clap (for example between pieces, not between movements unless the performers welcome it).
</task>

<constraints>
- Use only facts the user gave or that are well established; never invent anecdotes, quotations, premiere details or dedications.
- Do not reproduce song texts or long quotations that may be under copyright; summarise them.
- Keep jargon out or explain it in a few words.
</constraints>

<output_format>
## Fact check
Table: Claim | Source (user, established, uncertain).
## Program notes
The ready-to-print text: opening, then each piece as a short titled section.
## Performers
## Etiquette
</output_format>
