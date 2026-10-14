---
schema: 1
id: adapt-key-visual-to-formats
kind: prompt
title: Adapt a key visual to many formats
description: Plans how one master design adapts to every campaign format, from vertical stories to wide banners and print, with fixed design rules, recomposed layouts, copy cuts, safe zones and file naming.
category: graphic-design
version: 1.0.0
status: incubating
stage: [design, ship]
role: [graphic-designer, marketer, content-creator]
requires: [none]
inputs: [text, image, spec]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [key-visual, campaign-design, format-adaptation, resizing, safe-zones]
pairs_with:
  prompts: [design-social-media-templates, write-display-banner-set, plan-poster-layout, prepare-print-files]
  personas: [art-director]
args:
  - name: visual
    description: The master design - its elements (image, headline, support copy, logo, call to action, graphic devices), its original format, and what makes it recognisable.
    type: text
    required: true
  - name: formats
    description: The list of formats needed, for example "1080x1920 story, 1080x1350 feed, 1200x628 link, 728x90 and 300x250 banners, A3 poster, 6 m x 3 m billboard, email header".
    type: text
    required: true
  - name: rules
    description: Brand rules that apply, such as logo minimum size, clear space and colours. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Design DNA, Format families, Adaptation rules, Format-by-format layouts, Copy cuts, Safe zones and minimum sizes, File setup and naming, Review checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Campaigns are judged in their smallest and most awkward formats, not in the hero poster. A key visual designed as a portrait poster cannot simply be scaled into a 728 x 90 leaderboard or a 9:16 story: elements must be recomposed, copy must be cut, and the image recropped. Common failures: the headline shrunk until unreadable instead of shortened, logos below their minimum size, faces cropped badly in square formats, text placed under platform interface overlays at the top and bottom of vertical stories, and dozens of files with names nobody can trace. The fix is to define what must stay constant (the design's DNA), group formats into families by shape, and set rules per family before producing anything.
</context>

<task>
Plan the adaptation of this key visual:

<visual>
{{visual}}
</visual>

<formats>
{{formats}}
</formats>
{{#rules}}

<rules>
{{rules}}
</rules>
{{/rules}}

1. **Design DNA.** The three to five elements that must appear the same way everywhere (for example the image crop around the subject's eyes, the headline typeface and colour, the graphic device, the logo lock-up) and what may flex.
2. **Format families.** Group the formats by aspect ratio (tall, near-square, wide, extreme wide, large print) and say which is the hardest.
3. **Adaptation rules.** For each family: composition (stacked, side by side, single line), image treatment (recrop, extend background, use a cut-out), which elements drop first as space shrinks, and logo placement.
4. **Format-by-format layouts.** A short layout description for each format in the list, with element positions.
5. **Copy cuts.** A long, medium and short version of the headline and call to action, and which format uses which; the shortest must still make sense alone.
6. **Safe zones and minimum sizes.** Margins and platform overlay zones to keep clear (check each platform's current guidance), minimum headline sizes per format, logo minimum size, and file weight limits for ad networks to confirm with the media plan.
7. **File setup and naming.** Master file structure (linked assets, shared styles or components), a naming pattern such as campaign_format_size_version_language, colour modes (RGB for screen, CMYK or the printer's profile for print), and export settings.
8. **Review checklist.** View every format at actual size on the real device or a printed scale proof, check the smallest format first, check the DNA is intact, and check legibility and contrast.
</task>

<constraints>
- Do not state platform pixel specs or overlay sizes as current fact; give common values and say to confirm with each platform's or media owner's current specs.
- Shorten copy before shrinking type; never go below the minimum size to fit words.
{{> output/uncertainty}}
</constraints>

<output_format>
Markdown with the contract's sections in order. Format-by-format layouts as a table (Format, Size, Family, Layout, Copy version, Notes). Review checklist as a checklist.
</output_format>
