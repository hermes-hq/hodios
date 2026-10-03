---
schema: 1
id: design-menu-layout
kind: prompt
title: Design a menu layout
description: Designs a restaurant menu layout with sections, eye path, item placement, price presentation, typography and allergen marking for print, digital or menu board formats. For restaurant owners.
category: graphic-design
version: 1.0.0
status: incubating
stage: [design]
role: [graphic-designer, founder, designer, operations-manager]
requires: [none]
inputs: [text, document]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [menu-design, print-design, typography, allergens, menu-boards]
subject: [hospitality]
pairs_with:
  prompts: [engineer-restaurant-menu, write-menu-descriptions, design-cocktail-menu, prepare-print-files]
  personas: [art-director]
args:
  - name: menu_items
    description: The full menu with sections, item names, descriptions, prices and dietary or allergen information. Mark any high-margin or signature items you want to sell more of.
    type: text
    required: true
  - name: brand
    description: The restaurant's concept, style, logo, colours and fonts, or a short description of the feel. Optional.
    type: text
  - name: format
    description: "print: a printed menu (single sheet, folded or booklet). digital: a phone-friendly web or PDF menu, often reached by QR code. board: a wall or counter menu board read from a distance."
    type: enum
    enum: [print, digital, board]
    default: print
output_contract:
  format: markdown
  sections: [Menu edit, Structure, Layout, Item placement, Prices, Typography and colour, Dietary and allergen marking, Format specs, Checklist]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a graphic designer who specialises in hospitality, working with chefs and owners on menus that guests find easy to order from and that support the business. Menus fail when they are too long to choose from, when sections follow the kitchen's logic instead of the guest's, when prices are lined up in a right-hand column with dot leaders so guests shop by price, when the items the restaurant wants to sell are buried mid-list, when type is tiny and low-contrast in dim light, and when allergen information is missing or unreadable. A menu is the restaurant's main sales tool and also a legal document in many places.
</context>

<task>
Design the {{format}} menu layout for these items.

<menu_items>
{{menu_items}}
</menu_items>
{{#brand}}

<brand>
{{brand}}
</brand>
{{/brand}}

If there are no prices or no item list, ask for them and stop. If no brand is given, propose a direction that fits the food and price level and say it is a starting point. If sales or margin data is mentioned but not given, place items using the owner's priorities and note that a menu engineering analysis would refine them.

1. **Menu edit.** Flag sections with too many items (more than about 7 to 10 per section slows decisions), duplicates, and items that could be cut or combined; recommendations only, the owner decides.
2. **Structure.** Section order in the order guests eat or decide (for example snacks, starters, mains, sides, desserts; drinks separately or on the back), section names in the restaurant's voice but still clear.
3. **Layout.** For the format: panels or pages and what goes on each, the eye path (for a single page, guests often look first near the top and centre; for a two-panel spread, the upper right panel draws attention), white space, and where the logo, contact details and service notes sit.
4. **Item placement.** Where signature and high-margin items go (first or last in a section, in a box or with a small graphic device, used sparingly on 1 or 2 items per section), and how the rest are ordered.
5. **Prices.** Present prices after the description in the same type size or slightly smaller, without currency symbols where local practice allows, no dot leaders, no price column. Note local rules on showing prices with tax or service included.
6. **Typography and colour.** One or two typefaces, sizes (item names around 11 to 14 pt for print, descriptions not below about 9 to 10 pt), weights, contrast for the actual lighting, and colour use.
7. **Dietary and allergen marking.** A clear, consistent key (letters or icons with a legend), placement next to each item, and a line telling guests to ask staff about allergies. Do not mark an item free of an allergen unless the input says so.
8. **Format specs.**
   - print: size and fold, paper weight and coating (wipeable or laminated for daily use, uncoated for disposable), bleed, colour mode, and how often prices change (inserts or a printable single sheet).
   - digital: single-column mobile layout, real text rather than an image or PDF scan, fast loading, collapsible sections, accessible contrast and text sizing.
   - board: viewing distance and letter heights, a maximum number of items per board, grouping by colour or panel, and where daily specials sit.
9. **Checklist.** Prices and spelling double-checked, allergens confirmed by the kitchen, legal notices (tax, service charge, calorie or allergen rules where required) checked, and a print or device proof tested in the restaurant's real light.
</task>

<constraints>
- Never invent allergen, dietary or calorie information; mark missing items "to confirm with kitchen".
- Do not change prices or item names; suggestions go in the menu edit.
- Guest-first: avoid manipulative tricks such as hiding prices or decoy items with misleading descriptions.
{{> output/uncertainty}}
</constraints>

<output_format>
## Menu edit
## Structure
## Layout
## Item placement
| Section | Order of items | Highlighted item(s) and why |
## Prices
## Typography and colour
## Dietary and allergen marking
## Format specs
## Checklist
</output_format>
