---
schema: 1
id: design-book-interior-layout
kind: prompt
title: Design a book interior layout
description: Designs a book's interior for print, ebook or both, with trim size, margins, typefaces, heading hierarchy, front and back matter, and widow, orphan and hyphenation rules.
category: graphic-design
version: 1.0.0
status: incubating
stage: [design]
role: [writer, graphic-designer, editor]
requires: [none]
inputs: [text, document]
output: [docs, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [book-typesetting, interior-design, self-publishing, ebook-formatting, typography]
pairs_with:
  prompts: [design-book-cover-brief, pair-typefaces, prepare-print-files]
  personas: [art-director]
args:
  - name: genre
    description: The genre and the kind of content, for example "literary novel", "cookbook with photos", "technical guide with code and tables", "poetry collection", "children's chapter book".
    type: string
    required: true
  - name: formats
    description: print, ebook or both, with any details known - the printing route (print-on-demand or offset), reflowable or fixed-layout ebook, and approximate word count or page count.
    type: text
    required: true
  - name: trim_size
    description: The finished page size, for example 6x9in, 5.5x8.5in, 5x8in, 129x198mm, A5. Ignored for ebook-only books.
    type: string
    default: 6x9in
output_contract:
  format: markdown
  sections: [Design brief, Page geometry, Typography, Heading hierarchy, Special elements, Front and back matter, Typesetting rules, Ebook adaptation, Production checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A book interior is read for hours, so good design is mostly invisible: a comfortable line length, a calm text block, margins that keep text away from the spine, and running heads and folios that help without distracting. Self-published and first-time books show the same tell-tale problems: margins that are too small at the gutter, a sans-serif body at screen sizes, double spaces and widows, chapters that start on the left page, missing or misordered front matter, and an ebook that is a PDF of the print file. Genre conventions matter: a thriller, a cookbook and a technical manual need different pages.
</context>

<task>
Design the interior of a {{genre}} book.

Formats: {{formats}}.
Trim size: {{trim_size}} (print only).

1. **Design brief:** in three or four sentences, the reading experience this genre needs (immersive, scannable, reference) and the conventions readers expect.
2. **Page geometry:** for {{trim_size}}, the text block, margins (inside or gutter, outside, top, bottom), and how the gutter grows with page count for a thicker book. Aim for a line length of roughly 55 to 75 characters for continuous prose, adjusted for the genre. Give values in the unit of the trim size and the other unit, and note that print-on-demand services have minimum margins and bleed rules the user must check.
3. **Typography:** a body typeface recommendation with two alternatives (choose faces designed for long reading at small sizes; for print this usually means a text serif, and say when a sans works), the size and leading, a display or heading face if any, and licensing notes (check the licence covers print and ebook embedding). Recommend only typefaces that exist, and say if you are unsure of a licence.
4. **Heading hierarchy:** the levels the content needs (part, chapter, section, subsection), with size, style, spacing and alignment for each; chapter opening design (sink, drop cap or small caps lead-in, ornament), and whether chapters open on right-hand pages only.
5. **Special elements:** fitted to {{genre}}: block quotes, epigraphs, scene breaks, lists, tables, code, recipes, captions and images, footnotes or endnotes, sidebars, poetry line handling. Give a style for each that the content uses.
6. **Front and back matter:** the elements in conventional order (for example half title, title page, copyright page, dedication, contents, foreword or preface; back matter such as acknowledgements, notes, bibliography, index, about the author), which pages are recto, which are optional for this genre, and how pages are numbered (roman numerals in front matter if used).
7. **Typesetting rules:** widows and orphans, runts (very short last lines), hyphenation limits (no more than two or three consecutive hyphenated lines, no hyphenated words across a page turn), justification and word spacing, rivers, consistent baseline grid or facing-page alignment, running heads and folios (where they are suppressed), true quotes and dashes, non-breaking spaces where needed, and no double spaces.
8. **Ebook adaptation:** if ebook is in formats, how the design maps to a reflowable ebook (styles not fixed sizes, no running heads or page numbers, scene breaks that survive reflow, images with alt text, a navigable contents, semantic headings, accessible tables), or when a fixed-layout ebook is justified for this genre. Note that readers can override fonts.
9. **Production checklist:** proofs to order, things to check on a printed proof (gutter, colour of greys, image resolution), files to export, and metadata.
10. Before answering, check that the type size, leading and text block produce a sensible characters-per-line and lines-per-page figure for the trim size; show the estimate.
11. If {{formats}} is unclear about print versus ebook, ask, and stop.
</task>

<constraints>
- Do not give exact print-on-demand specifications as fact; describe the kind of requirement and tell the user to check the printer's current guide.
- Recommend typefaces by name only when confident they exist and suit the purpose; never invent a font name.
- Keep to conventions unless the genre benefits from breaking them, and say why when you do.
{{> output/uncertainty}}
</constraints>

<output_format>
Markdown with the contract's sections in order. Page geometry and typography as tables (Element, Value, Notes). The heading hierarchy as a table (Level, Face and style, Size and leading, Space before and after, Alignment). Front and back matter as an ordered list marking recto pages and optional items.
</output_format>
