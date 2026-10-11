---
schema: 1
id: design-roll-up-banner
kind: prompt
title: Design a roll-up banner
description: Designs a pull-up banner stand around viewing distance and the parts hidden by the base, tables and crowds, with height zones, type sizes, layout options and the supplier's file specs.
category: graphic-design
version: 1.0.0
status: incubating
stage: [plan, design]
role: [graphic-designer, marketer, founder, individual]
requires: [none]
inputs: [text, preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [pull-up-banner, large-format-print, exhibition-graphics, event-display, viewing-distance]
pairs_with:
  prompts: [plan-booth-design, plan-poster-layout, prepare-print-files, write-booth-copy]
  personas: [art-director]
args:
  - name: purpose
    description: Where the banner will stand and what it must do, for example "careers fair stand to get students to scan for internships" or "reception banner introducing a charity".
    type: text
    required: true
  - name: assets
    description: Logo, brand colours, photos, the message and any copy you already have. Optional.
    type: text
  - name: size
    description: Banner size from the supplier, for example "850 x 2000 mm" or "33 x 81 in". Optional; without it a common size is assumed and must be checked against the supplier template.
    type: string
output_contract:
  format: markdown
  sections: [Message, Height zones, Layout options, Type sizes, Imagery and colour, Supplier specs, Checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A roll-up banner is seen from 3 to 10 metres by someone walking past, for two or three seconds. Most banners fail because they are designed as a tall poster read at arm's length: paragraphs of text, a logo at the bottom, a call to action that ends up behind the table. Real constraints: the bottom 100 to 200 mm disappears into the base cassette (the supplier template says exactly how much); at events a table, chairs or people usually hide everything below about 900 mm to 1 m; the zone around eye level (roughly 1.2 to 1.8 m from the floor) is where the main message must sit; the top band is what is seen over a crowd, so the name or logo belongs there. Banners often stand side by side, so they should work as a set.
</context>

<task>
Design a roll-up banner for: {{purpose}}
{{#assets}}

<assets>
{{assets}}
</assets>
{{/assets}}
{{#size}}Size: {{size}}{{/size}}

If no size is given, assume 850 x 2000 mm and say the supplier's template decides the hidden areas and bleed.

1. **Message.** One headline of about 3 to 7 words that says what you offer or why to stop, one supporting line, and one action (talk to us, scan, visit). Cut everything else and say where it should go instead (leaflet, conversation, web page).
2. **Height zones.** Map the banner from top to bottom with heights in millimetres: top band (name or logo, visible over crowds), eye-level message zone, support zone (image, short points), action zone above table height, and the dead zone hidden by the base and furniture.
3. **Layout options.** Two layouts that fit the zones (for example a strong image with the headline over it, and a typographic layout with colour blocks), each described element by element.
4. **Type sizes.** A table of minimum cap heights for headline, support line and action at the expected viewing distances, using the common sign rule of about 25 mm of letter height per 3 m of viewing distance (1 in per 10 ft) as a floor and larger for messages read on the move; one or two typefaces, heavy weights, no light or script faces for key text.
5. **Imagery and colour.** Image choice and crop (one strong image, not a collage), resolution needed at full size (about 100 to 150 ppi at final size is usually enough for viewing from a distance), strong contrast, and how it sits next to other banners of the same organisation.
6. **Supplier specs.** File size and bleed per the supplier template, colour mode, fonts outlined or embedded, file format, and the hidden-area margins.
7. **Checks.** View a scaled print from across the room, check the action is above table height, and check QR codes are large enough to scan from about 1 m (and that they lead to a page that works on phones).
</task>

<constraints>
- Do not invent offers, statistics or contact details; use placeholders.
- No more than about 25 words on the banner unless the user insists; say what the extra words cost.
- Never place the call to action or contact details in the bottom metre.
{{> output/uncertainty}}
</constraints>

<output_format>
Markdown with the contract's sections in order. Height zones as a table (Zone, From mm, To mm, Content). Type sizes as a table (Element, Viewing distance, Minimum cap height). Supplier specs and checks as checklists.
</output_format>
