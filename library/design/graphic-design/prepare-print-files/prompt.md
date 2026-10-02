---
schema: 1
id: prepare-print-files
kind: prompt
title: Prepare artwork for print
description: Prepares artwork for print with bleed, margins, resolution, colour mode, fonts, paper and finishes, and gives a preflight checklist for the printer. Use before sending any design to a printer.
category: graphic-design
version: 1.0.0
status: incubating
stage: [ship, verify]
role: [graphic-designer, designer, founder, marketer]
requires: [none]
inputs: [text, document]
output: [checklist, table, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [print-production, preflight, bleed, cmyk, pdf-export]
pairs_with:
  prompts: [critique-graphic-design, write-design-brief, build-brand-guidelines]
args:
  - name: print_item
    description: What is being printed (business cards, flyer, folded brochure, poster, packaging, book cover), finished size, quantity, the design tool used, and the colours or special effects wanted.
    type: text
    required: true
  - name: printer_specs
    description: The printer's file requirements if you have them (bleed, file format, colour profile, ink limits, minimum line weight). Optional; without them the prompt uses common defaults and marks them to confirm.
    type: text
output_contract:
  format: markdown
  sections: [Specification, Document setup, Images and colour, Type and lines, Paper and finish, Export settings, Preflight checklist, Questions for the printer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Print problems cost money and are discovered only when the boxes arrive: white slivers at the edge because there was no bleed, text trimmed off because it sat too close to the edge, blurry photos copied from the web, bright screen blues that print dull, a rich black that smudges in small text, missing fonts replaced by defaults, or a fold that cuts through a headline. Every printer has its own requirements, so a reliable process starts from their spec sheet and checks the file against it before sending.
</context>

<task>
Prepare this artwork for print.

<print_item>
{{print_item}}
</print_item>
{{#printer_specs}}
<printer_specs>
{{printer_specs}}
</printer_specs>
{{/printer_specs}}

1. **Specification.** Summarise the job: finished (trim) size, document size including bleed, pages or panels, colours (CMYK, spot colours, or both), quantity, and the likely printing method (digital for short runs, offset for longer runs, large-format for posters and signs). If no printer specs were given, say you are using common defaults and mark each with "(confirm with printer)".
2. **Document setup.** Bleed (commonly 3 mm or 0.125 inch on each edge, more for some products such as packaging or bound covers); safe area or quiet zone (commonly 3 to 5 mm inside the trim, more near folds and bindings); for folded items, the panel widths (inside panels of a roll or letter fold are slightly narrower so they tuck in) and fold lines on a separate non-printing layer; for saddle-stitched booklets, page counts in multiples of four and allowance for creep; dielines for packaging or special shapes on their own spot layer set to overprint, as the printer specifies.
3. **Images and colour.** Image resolution of about 300 ppi at final printed size (less for large posters viewed from a distance, as the printer advises), never upscaled from screen images; colour mode CMYK using the printer's colour profile, with conversion from RGB done once and checked for colour shifts (bright blues, greens and oranges often dull); total ink coverage within the printer's limit; black text as 100 per cent black only, and rich black only for large solid areas; spot colours named exactly as the printer and swatch book require; transparency and effects flattened or preserved according to the export standard.
4. **Type and lines.** Fonts embedded or, if the printer requires, converted to outlines in a copy of the file (keep the editable original); minimum text sizes (small text, reversed text and thin serifs need extra care, especially on uncoated paper); minimum line weight (often around 0.25 pt); no text in the bleed or safe area except intentional background elements.
5. **Paper and finish.** Recommend paper weight and type for the item (coated or uncoated, matt or gloss), noting that uncoated paper absorbs ink and makes colours duller and darker; finishes such as lamination, spot UV, foil or embossing and how each must be supplied (usually a separate spot-colour layer or file, 100 per cent of a named spot colour); scoring for folds on heavier stock.
6. **Export settings.** A print-ready PDF using a standard the printer accepts (PDF/X-1a or PDF/X-4 are common), with bleed and crop marks as requested, the correct output intent, no compression that reduces image quality, and one file per item or as the printer requests. Note the equivalent settings for the design tool named, if any.
7. **Preflight checklist.** A yes-or-no checklist to run before sending, covering every point above plus spelling, phone numbers, URLs and QR codes tested, and the final quantity and size.
8. **Questions for the printer.** What to confirm before ordering, and the proof to request (a digital proof at minimum, a hard proof for colour-critical work).
</task>

<constraints>
- Printer requirements override general defaults. Never present a default as the printer's requirement.
- Do not promise exact colour matches between screen and print; explain that a physical proof is the only reliable check.
- Keep advice specific to the item and the tool named; skip settings that do not apply.
</constraints>

<output_format>
Markdown with the contract's sections as `##` headings. The specification as a table: | Setting | Value | Source (printer / default - confirm) |. The preflight checklist as `- [ ]` items grouped by section.
</output_format>
