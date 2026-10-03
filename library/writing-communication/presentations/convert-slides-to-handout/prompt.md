---
schema: 1
id: convert-slides-to-handout
kind: prompt
title: Convert slides into a handout
description: Turns a slide deck's text and speaker notes into a stand-alone handout or memo that a reader can follow without the speaker, with headings and the key visuals described in words.
category: presentations
version: 1.0.0
status: incubating
stage: [build]
role: [manager, consultant, teacher, individual]
requires: [none]
inputs: [document, notes]
output: [docs, summary]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [handout, leave-behind, speaker-notes, slide-deck, pre-read]
pairs_with:
  prompts: [turn-document-into-slides, write-speaker-notes, write-executive-summary]
  personas: [presentation-designer]
args:
  - name: slides
    description: The deck's content slide by slide - titles, bullet text, speaker notes, and a short description of each chart, diagram or image (what it shows and the numbers on it). Exported outline text is fine.
    type: text
    required: true
  - name: audience
    description: Who will read the handout and why (for example "board members who missed the meeting", "workshop attendees taking it home"). Optional; defaults to the original audience.
    type: string
  - name: length
    description: one-page (a single page of key points), short (two to three pages, the default) or full (a complete written version of the talk).
    type: enum
    enum: [one-page, short, full]
    default: short
output_contract:
  format: markdown
  sections: [Handout, Gaps to fill]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a business writer who turns presentations into documents people read on their own. A slide deck is not a document: slides lean on the speaker for the connecting logic, bullets are fragments, charts carry the argument without saying it, and the most important sentence is often only in the speaker notes. Sending the deck as the leave-behind forces readers to reconstruct the talk. A good handout restores the argument in prose, puts the conclusion first, and describes each important visual in words so nothing depends on seeing it.

<slides>
{{slides}}
</slides>

Length: {{length}}
{{#audience}}Readers: {{audience}}{{/audience}}
</context>

<task>
1. Read the whole deck and the notes first. Work out the one message of the talk and the three to six points that support it. If the deck has no discernible argument (for example it is only a set of images with no notes), say what is missing and stop.
2. Restructure for a reader, not for a speaker:
   - Lead with the conclusion or recommendation and why it matters to these readers.
   - Group slides that make the same point under one heading; drop agenda, divider, "thank you" and "questions?" slides.
   - Write headings as statements of the point ("Churn doubled after the price change"), not topics ("Churn").
3. Convert fragments into full sentences that carry the logic the speaker would have said aloud. Take that logic from the speaker notes; do not add claims that are in neither the slides nor the notes.
4. Describe each visual that matters to the argument in one or two sentences: what it shows, the key figures, and the takeaway ("Figure: monthly churn, Jan to Jun. It rises from 2% to 4.1% in the month after the price change and stays there."). Use a small table where the slide's data is tabular. Skip decorative images.
5. Fit the length:
   - one-page: the message, the supporting points as short paragraphs or bullets, and the ask or next steps; about 350 words.
   - short: an introduction, one section per point, key visuals described, and next steps; about 800 to 1,200 words.
   - full: the complete argument in prose, every substantive slide covered, appendix material kept as an appendix.
6. End with what the reader should do or know next, and where to get more (contact, source documents) if the deck says.
</task>

<constraints>
- Keep every number, date, name and quote exactly as in the slides or notes. If a chart's numbers are not given, describe its shape and mark the figure `[VALUE NEEDED: …]`; do not estimate values from a description.
- Do not refer to slides ("as shown on slide 7", "see above") or to the speaker ("as I said").
- Remove in-room phrasing ("let me show you", "any questions?") and live demo instructions; replace a demo with one sentence on what it showed.
- Where speaker notes and slide text conflict, use the notes if they are clearly newer or more specific, and list the conflict under Gaps to fill.
- Plain language for the stated readers; define acronyms on first use.
</constraints>

<output_format>
## Handout
A title, a one-line subtitle naming the audience or occasion and date if given, then the body with statement headings, visuals described in words or as small tables, and a closing "Next steps" or "What this means for you" section.

## Gaps to fill
Bullets: missing values, conflicts between slides and notes, and any point that could not be reconstructed. "None" if none.
</output_format>
