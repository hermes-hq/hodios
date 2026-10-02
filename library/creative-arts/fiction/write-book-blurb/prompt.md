---
schema: 1
id: write-book-blurb
kind: prompt
title: Write a book blurb
description: Writes back-cover and online store blurbs with a hook, stakes and the right genre tone, in several lengths from a one-line pitch to a full store description. Use when publishing or relaunching a book.
category: fiction
version: 1.0.0
status: incubating
stage: [ship]
role: [writer, marketer]
requires: [none]
inputs: [text]
output: [copy]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
tags: [book-marketing, back-cover-copy, self-publishing, genre-conventions]
pairs_with:
  prompts: [write-query-letter, write-logline-and-synopsis, write-product-description]
args:
  - name: book_summary
    description: What the book is about, including the protagonist, the inciting situation, the central conflict, the tone, and any tropes or selling points. Include the ending only if you want it kept out of the copy deliberately.
    type: text
    required: true
  - name: genre
    description: Genre and subgenre, e.g. "cosy mystery", "enemies-to-lovers romantasy", "literary fiction", "military sci-fi", "domestic thriller".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Positioning, Back cover, Store description, Short blurb, One-liners, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A blurb is not a summary. It is sales copy that makes a browsing reader of a specific genre recognise their next book within seconds: who the protagonist is, what disrupts their world, what they want, what stands in the way, and what happens if they fail, in the tone the book delivers. Readers of each genre scan for different signals: romance readers look for both leads, the trope and the emotional promise; thriller readers for the threat and the clock; fantasy readers for the world's hook and the scale of the stakes; literary readers for voice and the central question. Weak blurbs retell the plot in order, start with the weather or a rhetorical question, list too many names, and spoil the midpoint.
</context>

<task>
Write blurbs for this {{genre}} book:

<book>
{{book_summary}}
</book>

1. **Positioning:** in three lines, the reader this book is for, the two or three signals that reader looks for in {{genre}}, and the single emotional promise of the book. If the summary lacks the protagonist, the central conflict or the stakes, ask for them (at most three questions) and stop.
2. **Back cover** (150 to 200 words):
   - a bold one-line hook at the top (a situation, a striking line of voice, or the core conflict in one sentence);
   - one paragraph introducing the protagonist in their world and the inciting incident;
   - one paragraph escalating the conflict and the stakes, ending on the dilemma or the question the book answers;
   - an optional closing line of tone or tagline.
   Introduce at most two or three named characters. Reveal nothing beyond roughly the first third of the story or the setup of the central conflict.
3. **Store description** (200 to 300 words): the back-cover copy adapted for online stores: a strong first line (it may be all that shows before "read more"), short paragraphs, and a closing line inviting the reader in. Add a line for series position or trope list only if the summary supports it, and a "Perfect for fans of" line only if the author named comparable books.
4. **Short blurb** (40 to 60 words) for ads, newsletters and social posts.
5. **One-liners:** three distinct loglines or taglines under 20 words each, each built on a different angle (character, conflict, tone).
6. **Notes:** which version leads with which angle, and two words or phrases worth testing in ads.
</task>

<constraints>
- Present tense, third person, unless the summary shows the voice is first person and voice is a selling point; then you may offer one first-person variant of the short blurb.
- No spoilers beyond the setup, no plot told in order, no rhetorical questions stacked at the end, no "In a world where", no clichés like "a journey of self-discovery" or "nothing will ever be the same" unless subverted.
- Do not invent review quotes, awards, sales figures, rankings or endorsements.
- Match the genre's tone and heat level as described; do not add content the summary does not support.
</constraints>

<output_format>
## Positioning
## Back cover
## Store description
## Short blurb
## One-liners
Numbered list.
## Notes
</output_format>
