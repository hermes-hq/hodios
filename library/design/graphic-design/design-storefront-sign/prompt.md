---
schema: 1
id: design-storefront-sign
kind: prompt
title: Design a shopfront sign
description: Designs a shop's exterior signage - fascia, projecting sign, window and door graphics, A-board - for reading from across the street and along the pavement, with permission checks and a maker's brief.
category: graphic-design
version: 1.0.0
status: incubating
stage: [plan, design]
role: [graphic-designer, founder, operations-manager]
requires: [none]
inputs: [text, image, preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [shopfront, fascia-sign, window-graphics, retail-design, small-business-marketing]
pairs_with:
  prompts: [plan-signage, plan-visual-merchandising, build-diy-brand-kit]
  personas: [art-director]
args:
  - name: shop
    description: The business, what it sells, its name and logo, brand colours, and opening hours.
    type: text
    required: true
  - name: street
    description: The building and street - fascia dimensions if known, shopfront materials, how people approach (walking along a busy pavement, driving past, across a square), neighbouring signs, listed or historic area, landlord. Optional.
    type: text
output_contract:
  format: markdown
  sections: [What the signs must say, Sign types, Fascia layout, Projecting sign, Window and door, Legibility, Materials and lighting, Permissions to check, Brief for the sign maker]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
People meet a shop in two ways: from across the street, where the fascia is read face-on, and walking along the pavement, where the fascia is seen at a steep angle and only a projecting sign or window graphics register. Owners often spend everything on the fascia and nothing on the projecting sign. Other failures: a name that does not say what the shop sells, a fascia crowded with phone, web and services, window vinyl covering so much glass that people cannot see in (seeing inside is what draws them in), opening hours too small or placed at the top of the door, and illuminated or large signs installed without the permission that many places require, especially in historic areas.
</context>

<task>
Design shopfront signage for: {{shop}}
{{#street}}

<street>
{{street}}
</street>
{{/street}}

If you do not know how people approach the shop or roughly how big the fascia is, give the plan with assumptions and list the measurements to take.

1. **What the signs must say.** The name, and if the name does not say it, a few words for what is sold. Everything else (hours, web, services) goes lower, on the door or windows.
2. **Sign types.** Which of fascia, projecting (blade) sign, window graphics, door vinyl, A-board and wall plaque this shop needs, and the job of each.
3. **Fascia layout.** Lettering size in proportion to the fascia height (letters typically fill about 50 to 60 percent of the fascia height), margins, logo placement, alignment with the shopfront's columns or bays, and whether to use applied letters or a printed panel.
4. **Projecting sign.** Size, height above the pavement (check the local minimum clearance), symbol or short name readable along the street, double-sided.
5. **Window and door.** What goes on the glass (name or symbol at eye level, a short list of what's inside), how much glass stays clear, opening hours and accessibility information at eye level on or beside the door.
6. **Legibility.** Minimum letter heights for the viewing distances on this street, contrast against the fascia colour and the building, and a typeface with clear shapes at a distance and at an angle.
7. **Materials and lighting.** Material choices for durability and character (painted timber, metal letters, acrylic), lighting options (trough, halo, external spot) and how illumination affects permission.
8. **Permissions to check.** Planning or advertising consent, rules for historic or conservation areas, landlord or lease approval, and pavement licences for A-boards; tell the user to check with the local council or authority and the landlord before ordering.
9. **Brief for the sign maker.** Dimensions to measure, files to supply, materials, lighting, fixing method, a mock-up or photo montage on the real frontage, and installation timing.
</task>

<constraints>
- Do not state that a sign is allowed or exempt; rules differ by country and town and must be checked locally.
- Do not invent the shop's products, hours or contact details; use placeholders.
- Fewer words on the fascia; resist adding phone numbers and lists of services there.
{{> output/uncertainty}}
</constraints>

<output_format>
Markdown with the contract's sections in order. Sign types as a table (Sign, Job, Content, Approximate size). Permissions and the sign-maker brief as checklists.
</output_format>
