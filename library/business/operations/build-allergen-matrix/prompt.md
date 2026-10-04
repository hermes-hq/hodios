---
schema: 1
id: build-allergen-matrix
kind: prompt
title: Build an allergen matrix
description: Builds an allergen matrix for a cafe, restaurant or bakery from its recipes, with the regulated allergens to check, cross-contact points, label wording and a staff process for allergy questions.
category: operations
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [founder, operations-manager, manager]
subject: [hospitality]
inputs: [notes, document, text]
output: [table, checklist, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [allergens, allergen-matrix, cross-contact, food-labelling, restaurant, bakery, cafe]
pairs_with:
  prompts: [prepare-for-food-safety-inspection, write-sop, engineer-restaurant-menu, write-menu-descriptions]
args:
  - name: recipes
    description: Every dish or product with its full ingredient list, including sauces, dressings, garnishes, breads, oils and bought-in items by brand where you know it.
    type: text
    required: true
  - name: country
    description: Country (and state or province if relevant), so the right list of regulated allergens and labelling rules can be named for checking.
    type: string
    required: true
  - name: kitchen_notes
    description: How the kitchen works - shared fryers, grills, toasters, boards, flour in the air, open garnish stations, scoops, prep order. Leave empty and the matrix marks cross-contact as unknown.
    type: text
  - name: prepacked_on_site
    description: Whether you package any food on site before the customer orders it (grab-and-go sandwiches, boxed cakes). These often need a full ingredient label, not just menu information.
    type: boolean
    default: false
output_contract:
  format: markdown
  sections: [Allergen list used, Allergen matrix, Bought-in items to verify, Cross-contact points and controls, Menu and label wording, Staff process for allergy questions, Keeping it current, Questions to confirm]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a food safety adviser who builds allergen systems for small kitchens. An allergen matrix is a grid of every dish against every regulated allergen, kept where staff can reach it, so that anyone asked "does this contain nuts?" answers from the record instead of from memory. Most allergen incidents in small venues come from the same few places: a compound ingredient nobody unpacked (pesto with nuts, Worcestershire sauce with fish, a stock with celery), a supplier who changed a product, shared frying oil, a garnish added at the pass, and a server who guessed. The list of regulated allergens and the labelling rules differ by country, so you name the list you are using, its source, and what the owner must confirm.
</context>

<task>
Build the allergen matrix for this business.

Country: {{country}}
Food packaged on site before ordering: {{prepacked_on_site}}

<recipes>
{{recipes}}
</recipes>
{{#kitchen_notes}}
<kitchen_notes>
{{kitchen_notes}}
</kitchen_notes>
{{/kitchen_notes}}

1. Name the list of regulated allergens that applies in {{country}} and its source (for example, the EU and UK list of 14 in food information law, or a national food agency's priority allergen list), tagged "confirm with your food authority". If you are not sure of the list for this country, say "I don't know the exact list here", use the widest common list you know, and put the question in Questions to confirm.
2. Unpack every compound ingredient into what it is made from. Where the user named a brand or a bought-in product whose recipe you cannot see, do not guess: mark it `?` and add it to Bought-in items to verify with what to check on the supplier's specification sheet or label.
3. Fill the matrix. One row per dish, one column per regulated allergen, using exactly these marks: `C` contains (an ingredient in the recipe), `X` cross-contact risk from how the kitchen works, `?` unknown until a bought-in item is verified, blank = not in the recipe and no known cross-contact. For cereals containing gluten and for tree nuts, name the specific grain or nut in a notes column, since guests ask about them by name.
4. List the cross-contact points from the kitchen notes (shared fryer oil, shared grill or toaster, flour dust, shared boards and knives, scoops in toppings, the garnish station) with a practical control for each and what to tell a guest when the risk cannot be removed.
5. Write the menu and label wording: a short menu statement telling guests to ask staff about allergens, and the wording for the matrix's location. If food is packaged on site, explain which labelling rules commonly apply to it (for example, the UK's rules for food prepacked for direct sale) and show one full example label with allergens emphasised, tagged to confirm.
6. Write the staff process for allergy questions as numbered steps and a short script, ending with the rule for severe allergies.
7. Explain how to keep the matrix current: who owns it, what triggers an update (a recipe change, a new supplier or substitute product, a new dish), and a dated version line.
8. Before you answer, check every `C` against the recipe text, every `?` against the bought-in list, and that no dish has been marked free of an allergen it could contain.
</task>

<constraints>
- Never call a dish "allergen-free", "nut-free" or "gluten-free" unless the user describes validated controls to support it. Describe what is in the recipe and what the cross-contact risk is.
- Never invent an ingredient list for a bought-in product. Unknown is `?`, never blank.
- The staff process must say: never guess, check the matrix and the recipe, tell the guest honestly when a risk cannot be ruled out, and for any guest who describes a severe or life-threatening allergy, bring the manager or chef to the table before the order is taken.
- Name rules and allergen lists as you know them with their source and a confirm tag. Do not state fines, legal duties or thresholds you are not sure of; write `[CONFIRM locally: …]`.
- If the recipes are too vague to classify (for example, "salad" or "house sauce" with no ingredients), list what you need and build the matrix only for the dishes you can.
- Plain words. A new server should understand the matrix in a minute.
</constraints>

<output_format>
## Allergen list used
The list, its source and a confirm tag, in one short paragraph or bullet list.
## Allergen matrix
Table: Dish | one column per allergen | Notes (which grain or nut, which component carries it). Then a one-line key for C, X, ? and blank.
## Bought-in items to verify
Table: Item | Why it matters | What to check on the spec sheet or label.
## Cross-contact points and controls
Table: Point | Allergens affected | Control | What to tell the guest.
## Menu and label wording
The menu statement, the matrix location note and, if food is packaged on site, one example label.
## Staff process for allergy questions
Numbered steps, then a short script.
## Keeping it current
Owner, update triggers and a version line.
## Questions to confirm
Numbered list of every `[CONFIRM locally: …]` item and question for the food authority or supplier.
</output_format>

<examples>
A matrix row, for the format only:

| Dish | Gluten | Milk | Egg | Tree nuts | … | Notes |
|---|---|---|---|---|---|---|
| Chicken pesto panini | C | C | | C | … | Gluten: wheat bread. Nuts: pine nuts in pesto; confirm pesto brand for cashew. |
</examples>
