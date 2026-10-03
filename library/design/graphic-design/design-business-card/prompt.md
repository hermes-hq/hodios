---
schema: 1
id: design-business-card
kind: prompt
title: Design a business card
description: Designs a business card with a content edit, information hierarchy, two or three layout options, typography, paper and finish choices and print-ready specs. For freelancers and small firms.
category: graphic-design
version: 1.0.0
status: incubating
stage: [design]
role: [graphic-designer, founder, individual, designer]
requires: [none]
inputs: [text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [business-cards, print-design, typography, stationery, print-specs]
pairs_with:
  prompts: [design-logo-concepts, pair-typefaces, prepare-print-files, build-personal-brand-identity]
  personas: [art-director]
args:
  - name: details
    description: Everything you might put on the card (name, title, business, phone, email, website, address, social handles, services, QR code) and where you hand cards out.
    type: text
    required: true
  - name: brand
    description: Logo, colours, typefaces or the feel you want (for example "warm and handmade", "precise and technical"). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Content edit, Hierarchy, Layout options, Typography and colour, Paper and finish, Print specs, Checklist]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a graphic designer who has designed stationery for hundreds of small businesses. A business card is a tiny piece of print that people keep, glance at later and use to contact someone. Cards fail when they carry every possible detail in 6-point type, when the logo is huge and the name is tiny, when light grey text sits on white, when the design ignores how it will be printed (thin lines on textured stock, ink coverage to the edge without bleed), and when a QR code links to nothing useful.
</context>

<task>
Design a business card for these details.

<details>
{{details}}
</details>
{{#brand}}

<brand>
{{brand}}
</brand>
{{/brand}}

If the name or a way to make contact is missing, ask and stop. If no brand is given, propose a simple direction suited to the profession and say it is a starting point. If the profession is regulated (for example law, health, finance), note that some jurisdictions require specific information or wording on business materials and that the person should check.

1. **Content edit.** Recommend what stays, what goes and why: name, role, business, one or two contact methods people actually use, website. Move extras (full address, many social handles, service lists) to the website or the back of the card. A QR code only if it points to something useful, such as a contact card or a booking page.
2. **Hierarchy.** What is read first (usually the name or the business), second and third.
3. **Layout options.** Two or three distinct layouts at standard size (85 x 55 mm in Europe, 3.5 x 2 in in North America, or the local standard), front and back. For each: orientation, alignment, where the logo and each piece of text sit, use of white space, and what kind of business it suits.
4. **Typography and colour.** Typefaces (or the brand's), sizes (minimum about 7 to 8 pt for contact details, larger for the name), weight, letter spacing for small caps, colours and contrast, and how the colours will print in CMYK or as a spot colour.
5. **Paper and finish.** Two or three options with trade-offs: weight (around 350 gsm or heavier for a solid feel), coated or uncoated (uncoated is easy to write on), special finishes (letterpress, foil, spot gloss, rounded corners) and what they do to cost and lead time.
6. **Print specs.** Trim size, bleed (usually 3 mm or 0.125 in), safe zone (keep text at least 3 to 4 mm inside the trim), colour mode, minimum line weight and text size for the chosen process, resolution, file format and fonts outlined or embedded.
7. **Checklist.** Proofread every character, test the phone number and email, test the QR code from a printed proof, order a physical proof before a full run.
</task>

<constraints>
- Do not invent contact details, credentials or qualifications; use placeholders for anything missing.
- Keep every text element legible at the printed size; reject requests that would put contact details below the minimum size, and say why.
- Mention local size and requirements as items to confirm, not as rules you know apply.
{{> output/uncertainty}}
</constraints>

<output_format>
## Content edit
| Item | Keep, move or cut | Reason |
## Hierarchy
## Layout options
### Option 1 (front / back)
### Option 2 (front / back)
### Option 3 (optional)
## Typography and colour
## Paper and finish
## Print specs
## Checklist
</output_format>
