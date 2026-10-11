---
schema: 1
id: package-logo-files
kind: prompt
title: Package logo files for handover
description: Specifies a full logo file package - versions, colour variants, colour values, vector and raster formats, favicon and avatar sizes, naming, folders and a usage sheet for a client or team handover.
category: branding
version: 1.0.0
status: incubating
stage: [ship]
role: [graphic-designer, designer, founder]
requires: [none]
inputs: [text]
output: [checklist, table, docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [logo-files, file-formats, design-handover, asset-management, visual-identity]
pairs_with:
  prompts: [build-brand-guidelines, design-logo-concepts, prepare-print-files]
  personas: [brand-strategist, art-director]
args:
  - name: logo
    description: The logo and its versions (primary, horizontal, stacked, symbol, wordmark), colours with any known values, and the typeface used.
    type: text
    required: true
  - name: uses
    description: Where the logo will be used - website, app, social media, print, signage, embroidery, video, partners - and who will use the files (designers, office staff, printers). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Version matrix, Colour specifications, File formats, Special sizes, Naming and folders, Usage sheet, Handover checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Clients often receive one JPG and a PDF, and then the logo is stretched, pixelated or placed on the wrong background for years. A complete package anticipates every use: vector masters for printers and sign makers, transparent PNGs for office staff, SVG for the web, a favicon and app icon drawn for small sizes, a square or circular avatar version, one-colour and reversed versions, and colour values for every medium (spot colour for print where used, CMYK, RGB and HEX for screens), because a single colour converts differently in each. Text in vector files must be converted to outlines so it does not depend on installed fonts. Clear file names and a one-page usage sheet let non-designers pick the right file.
</context>

<task>
Specify the logo file package for:

<logo>
{{logo}}
</logo>
{{#uses}}

<uses>
{{uses}}
</uses>
{{/uses}}

1. **Version matrix.** A table of every lock-up (primary, horizontal, stacked, symbol only, wordmark only) against every colour variant (full colour, one colour, black, white or reversed), marking which combinations to produce and which to skip, with reasons.
2. **Colour specifications.** For each brand colour, the values needed for each medium (spot colour reference if used, CMYK, RGB, HEX), and a note to match them visually on a printed proof because conversions shift colour. Use the values given; where none are given, leave placeholders and say how to define them.
3. **File formats.** Which format serves which use: SVG for web, PDF or EPS vector masters for print and signage, transparent PNG at set pixel sizes for office and social use, JPG only where transparency is not possible; colour mode for each; text outlined in vectors; artboards cropped to the logo with or without clear space (say which).
4. **Special sizes.** Favicon and app icon (simplified mark, square, checked at 16 and 32 px), social avatar safe within a circular crop, email signature size, embroidery or single-colour simplified version, and a video or animated version if one exists.
5. **Naming and folders.** A naming pattern such as brand_logo-version_colour_format_size and a folder tree split by use (print, digital, social, guidelines), so non-designers find files quickly.
6. **Usage sheet.** A one-page guide included in the package: which file to use for what, clear space, minimum sizes, backgrounds, and don'ts (stretching, recolouring, effects, rearranging).
7. **Handover checklist.** Check every file opens and looks right, transparency works, colours match the spec, outlines are applied, font licences and the source files' ownership are as agreed, and the package is stored where the team can find it.
</task>

<constraints>
- Do not invent colour values or spot colour references; use placeholders where the input lacks them.
- Keep the package as small as the uses require; skip combinations nobody will use.
- Font files are licensed separately; do not include them unless the licence allows.
{{> output/uncertainty}}
</constraints>

<output_format>
Markdown with the contract's sections in order. Version matrix and colour specifications as tables. Naming and folders with a folder tree in a code block. Usage sheet as a short block the user can paste into a PDF. Handover as a checklist.
</output_format>
