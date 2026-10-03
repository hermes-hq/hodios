---
schema: 1
id: translate-restaurant-menu
kind: prompt
title: Translate a restaurant menu
description: Translates a restaurant menu for international guests with appetising dish explanations, correct allergen terms and dish names kept consistent across every language.
category: translation
version: 1.0.0
status: incubating
stage: [build]
role: [founder, operations-manager, copywriter]
subject: [hospitality]
requires: [none]
inputs: [document, text]
output: [copy, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: intermediate
tags: [menu-translation, allergens, food-and-drink, multilingual, terminology]
pairs_with:
  prompts: [translate-recipe, transcreate-marketing-copy, build-translation-glossary]
  personas: [translator]
args:
  - name: menu
    description: The menu as it is, with sections, dish names, descriptions, prices and any allergen markings.
    type: text
    required: true
  - name: target_languages
    description: One or more languages to translate into, separated by commas (for example "English, German, Japanese").
    type: string
    required: true
  - name: cuisine
    description: The restaurant's cuisine and style (for example "Neapolitan pizzeria", "Basque tapas bar", "fine-dining Nordic"); guides which names to keep in the original.
    type: string
output_contract:
  format: markdown
  sections: [Translated menus, Name table, Allergen terms, Questions for the kitchen]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You translate menus for restaurants. A good translated menu makes a guest want to order, tells them what they will actually get, and never misleads them about allergens. Signature dishes usually keep their original name, followed by a short, appetising description ("Cacio e pepe: spaghetti with pecorino and black pepper"); generic dishes are translated; and the same dish carries the same name in every language version so staff and guests can point at it. Literal translations of creative names ("bread of the house") and machine-translated allergens are the classic failures.

Target languages: {{target_languages}}
{{#cuisine}}
Cuisine: {{cuisine}}
{{/cuisine}}

<menu>
{{menu}}
</menu>
</context>

<task>
1. Identify the source language, the menu sections, and every dish, drink and side. Note any allergen markings or legend already on the menu.
2. Decide per dish whether to keep the original name (signature, regional or well-known dishes), translate it (generic dishes like "grilled chicken"), or keep it and add a translated subtitle. Apply the decision identically in every target language and record it in the name table.
3. Write each description in each target language: short (about the length of the original), appetising, concrete about the main ingredients and the cooking method, in the menu's tone (casual, classic, fine dining). Use the culinary terms native speakers expect (a cut of meat by its local name, cheese by name, "confit" or "tartare" where those are understood).
4. Allergens: translate every allergen marking and legend with the standard term in each language. Where the menu marks allergens with numbers or letters, keep the same keys. Use the 14 allergen groups of EU food-information rules as the reference list unless the restaurant names another.
5. Questions for the kitchen: list dishes where an allergen is likely but not marked (for example pesto usually contains nuts, many sauces contain gluten or celery), unclear ingredients, and names you could not interpret.
6. Keep prices, currency and section order exactly as in the source. Use each language's punctuation and quotation conventions.
</task>

<constraints>
- Never add, remove or infer allergens in the translated menus. Unmarked likely allergens go only into the questions list, for the restaurant to confirm.
- Do not invent ingredients or cooking methods. If a description is missing, translate the name and list the dish in the questions.
- Avoid translations that are funny, misleading or unappetising in the target language (check for unfortunate literal meanings), and flag any you avoided.
- Say once that the restaurant remains responsible for the accuracy of allergen information under local law, and should have a native speaker or the kitchen check the final menus.
- For non-Latin-script target languages, write the menu in that script; add romanisation only for dish names kept in the original.
</constraints>

<output_format>
## Translated menus
One subsection per target language, with the menu in source order, ready to lay out.
## Name table
Table: Original name | Decision (keep / translate / keep + subtitle) | one column per target language.
## Allergen terms
Table: Key or source term | one column per target language.
## Questions for the kitchen
Numbered list, or "None".
</output_format>
