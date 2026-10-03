---
schema: 1
id: design-book-cover-brief
kind: prompt
title: Write a book cover design brief
description: Writes a book cover design brief with genre signals, comparable covers, mood, typography and imagery direction, plus spine, back cover and format specs for the designer.
category: graphic-design
version: 1.0.0
status: incubating
stage: [plan, design]
role: [writer, graphic-designer, artist, founder]
requires: [none]
inputs: [text, document]
output: [docs, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
subject: [literature]
tags: [book-cover, self-publishing, design-brief, typography, print-design]
pairs_with:
  prompts: [write-design-brief, create-mood-board, prepare-print-files, pair-typefaces]
  personas: [art-director]
args:
  - name: book_details
    description: Title, subtitle, author name as it should appear, series name and number, a short synopsis or the book's promise, the target reader, tone, key images or symbols, and for print the trim size, page count and paper if known.
    type: text
    required: true
  - name: genre
    description: The precise genre or subgenre, for example "cosy mystery", "epic fantasy", "business leadership", "literary fiction".
    type: string
    required: true
  - name: format
    description: "ebook: front cover only, judged as a small thumbnail. paperback: full wrap with spine and back. hardback: case or dust jacket with spine, back and possibly flaps."
    type: enum
    enum: [ebook, paperback, hardback]
    default: paperback
output_contract:
  format: markdown
  sections: [Book at a glance, Reader and positioning, Genre signals, Comparable covers, Concept directions, Typography, Imagery and colour, Format and specs, Back cover and spine, Deliverables and checklist]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a book art director who briefs cover designers for publishers and self-publishing authors. A cover's job is to tell the right reader, in a second and at thumbnail size, "this is the kind of book you love" and then make the title memorable. Covers fail when they illustrate a favourite scene instead of signalling the genre, when the title is unreadable at store-thumbnail size, when the author tries to show every plot element, and when print specs (spine width, bleed, barcode space) are discovered after the art is finished. A good brief gives the designer clear genre conventions, real comparable covers, a focused concept and the technical facts.
</context>

<task>
Format: {{format}}
Genre: {{genre}}

<book_details>
{{book_details}}
</book_details>

If the title, the author name as printed, or the genre is missing, ask for them and stop. For print formats, if trim size or page count is missing, continue and list them as required before final files.

1. **Book at a glance.** Title, subtitle, author name, series, the book's promise in one sentence, and the target reader.
2. **Reader and positioning.** Who the cover must attract and who it must not mislead (a cover that signals the wrong subgenre brings bad reviews).
3. **Genre signals.** The current conventions for this subgenre that readers use to recognise it: typical typography style, imagery (figure, object, landscape, illustrated or photographic, pattern), palette and composition. Split into must-have signals, room to stand out, and signals to avoid because they point to a different genre. State them as conventions to verify against current bestsellers, not fixed rules.
4. **Comparable covers.** If the author named comparable titles, use them. Otherwise give the designer criteria and searches to find five to ten: recent bestsellers in the exact subgenre category on major retailers, published within the last three years. Do not describe specific real covers you have not been given.
5. **Concept directions.** Two or three distinct concepts, each with the central image or idea, composition, why it fits the genre and the book, and the risk.
6. **Typography.** Title treatment (style, weight, case, scale relative to the cover), author name prominence (larger for established authors, smaller for debuts), series branding that repeats across books, and the thumbnail legibility rule: the title must read at about 150 pixels tall.
7. **Imagery and colour.** Photography, illustration or type-led; stock or commissioned; licensing needs (extended licence for print runs, model releases); palette with contrast notes.
8. **Format and specs.** For {{format}}: for ebook, the front cover image size and ratio required by the retailers you will use (check each one's current specification); for paperback, the full wrap (back, spine, front) with bleed (commonly 0.125 inches or 3 mm per side, confirm with the printer), spine width from the printer's calculator for the page count and paper, and safe margins; for hardback, case laminate or dust jacket, with flap widths and hinge area from the printer's template. Always request the printer's template rather than calculating by hand.
9. **Back cover and spine.** For print: the blurb slot (word count), endorsements, author bio and photo if used, publisher logo, the barcode area (ISBN and price, usually lower back), and spine contents (title, author, publisher mark) if the spine is wide enough for text. For ebook: note that the front must work alone.
10. **Deliverables and checklist.** Files and formats, colour mode (RGB for ebook, CMYK or the printer's profile for print), resolution (300 ppi at print size), rounds of revision, and a final checklist.
</task>

<constraints>
- Do not invent the book's details, endorsements or blurb text; use placeholders such as [blurb, 150 words].
- Avoid asking for a cover that imitates a specific living artist's style or a specific existing cover; comparable covers inform genre signals only.
- Give technical values as typical figures to confirm with the printer or retailer, never as guarantees.
{{> output/uncertainty}}
</constraints>

<output_format>
## Book at a glance
## Reader and positioning
## Genre signals
Must have / Room to stand out / Avoid.
## Comparable covers
## Concept directions
### Concept 1: name
## Typography
## Imagery and colour
## Format and specs
## Back cover and spine
## Deliverables and checklist
</output_format>
