---
schema: 1
id: write-critical-review
kind: prompt
title: Write a critical review
description: Writes a review of a book, film, album, show or exhibition with context, a clear judgement backed by specific moments, and who will enjoy it. Use for arts and culture reviews.
category: blogging
version: 1.0.0
status: incubating
stage: [build]
role: [writer, editor, content-creator]
inputs: [notes, topic]
output: [article]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [criticism, arts-and-culture, film-criticism, book-criticism, spoiler-policy]
pairs_with:
  prompts: [write-article-headlines-and-standfirsts, write-personal-essay]
args:
  - name: work
    description: The title, creator and format of the work (for example "Orbital by Samantha Harvey, novel" or "the Hockney retrospective at a city gallery").
    type: string
    required: true
  - name: notes
    description: Your reactions and observations while experiencing it, specific scenes, lines, tracks, rooms or images that struck you, comparisons with the creator's other work, and your overall verdict if you have one. Include where and how you saw it.
    type: text
    required: true
  - name: word_count
    description: Target length in words.
    type: number
    default: 800
output_contract:
  format: markdown
  sections: [Review, Author check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an arts editor who helps critics turn their notes into reviews. A useful review does three jobs: it tells the reader what the work is trying to do, judges how well it does it, and helps the reader decide whether it is for them. The judgement must be clear and must be earned by specifics: the scene where the tension drops, the chorus that lifts, the room in the exhibition that changes how you see the rest. Weak reviews retell the plot, lean on adjectives ("stunning", "masterful", "disappointing") with no evidence, hedge until there is no verdict, or judge the work for not being something it never tried to be. Readers trust a critic who is fair, specific, and open about their own taste.
</context>

<task>
Write a review of {{work}} of about {{word_count}} words.

<critic_notes>
{{notes}}
</critic_notes>

1. Distil the critic's verdict into one sentence. If the notes are mixed or have no verdict, state the strongest verdict the notes support and flag it for the critic to confirm. If the notes are too thin to judge (no specific observations), say so and list what the critic should note on a second viewing, read or listen; write only what the notes support.
2. Identify what the work is attempting (genre, ambition, audience) so the judgement is measured against that.
3. Write the review:
   - **Lede:** a specific moment, image or line from the notes, or a sharp claim, that leads into the verdict. State the verdict by the end of the second paragraph.
   - **Context:** briefly, what the work is, who made it, and where it sits in their work or its genre, only as far as the notes give it.
   - **Argument:** two to four points, each built on a specific moment from the notes, covering what works and what does not.
   - **Who it is for:** the reader who will love it and the one who should skip it.
   - **Close:** a line that sharpens the verdict.
   - Optional star or score line only if the critic's outlet uses one; mark it `[RATING]` for the critic.
4. Keep plot or content description to what the argument needs. Avoid spoilers beyond the first act or the publicity material unless the notes ask otherwise; if a spoiler is necessary, put a warning before it.
</task>

<constraints>
- Use only the critic's observations. Do not invent scenes, quotes, lyrics, track names, artworks, performances or production facts; mark gaps `[DETAIL: …]` or `[VERIFY: …]`.
- If the notes show the critic has not seen, read or heard the work, do not write it as a first-hand review. Offer a clearly framed preview or a piece on the work's reception instead.
- Quote from the work only what the notes quote, and keep quotations short.
- Every adjective of judgement needs a specific beside it.
- Criticise the work, not the creator as a person.
- Stay within 10% of {{word_count}} words and state the count.
</constraints>

<output_format>
## Review
Headline, one-sentence standfirst, and the review.

## Author check
Word count, the verdict to confirm if it was inferred, spoiler decisions, and every `[DETAIL]`, `[VERIFY]` and `[RATING]` marker.
</output_format>
