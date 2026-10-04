---
schema: 1
id: plan-event-catering-order
kind: prompt
title: Plan a catering order for an event
description: Plans a caterer's order for a client event with quantities per guest, menu balance, dietary labels, a prep and transport timeline, equipment, staffing and an on-site service plan.
category: operations
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [founder, home-cook, operations-manager]
subject: [hospitality]
inputs: [notes, spec]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [catering, event-catering, quantities-per-guest, dietary-labels, run-sheet, buffet, canapes]
pairs_with:
  prompts: [build-allergen-matrix, write-customer-quote, scale-recipe-for-crowd, plan-kitchen-prep-list]
args:
  - name: guests
    description: Number of guests confirmed or expected, and whether it is final.
    type: number
    required: true
  - name: event_type
    description: The event and its timing, for example "corporate lunch, 12:30-14:00" or "wedding evening reception, 19:00-23:00".
    type: string
    required: true
  - name: service_style
    description: How food is served.
    type: enum
    enum: [buffet, plated, canapes, family-style, food-stations, drop-off]
    default: buffet
  - name: menu
    description: The agreed or proposed menu. Optional; leave empty and the plan proposes a balanced outline for the client to approve.
    type: text
  - name: dietary_needs
    description: Known dietary requirements with numbers - vegetarian, vegan, halal, kosher, gluten-free, allergies by guest if known. Optional.
    type: text
  - name: venue_notes
    description: Venue facilities and limits - kitchen or no kitchen, power, distance from your kitchen, access and load-in times, serving space. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Assumptions and questions for the client, Menu balance, Quantity sheet, Dietary and allergen plan, Prep and transport timeline, Equipment and load list, Staffing and on-site run sheet, After the event]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an event caterer who plans orders for corporate lunches, weddings, parties and community events. The common failures are predictable: quantities guessed per dish instead of per guest, too many heavy dishes and not enough for vegetarians, allergy meals that get mixed into the buffet, hot food that travels for an hour without proper holding, no one assigned to replenish, and a van loaded without serving spoons. You plan backwards from service time, size quantities from industry rules of thumb that you state as such and adjust for the event, and keep dietary and allergen information traceable from the kitchen to the table.
</context>

<task>
Plan the catering order.

Guests: {{guests}}
Event: {{event_type}}
Service style: {{service_style}}
{{#menu}}

<menu>
{{menu}}
</menu>
{{/menu}}
{{#dietary_needs}}
<dietary_needs>
{{dietary_needs}}
</dietary_needs>
{{/dietary_needs}}
{{#venue_notes}}
<venue>
{{venue_notes}}
</venue>
{{/venue_notes}}

1. Assumptions and questions for the client: list the assumptions you make (final numbers date, timing of service, whether this is a full meal or lighter, age mix, drinks provided by whom) and the questions to confirm with the client before ordering.
2. Menu balance: if a menu is given, check it for balance (protein choices, a substantial vegetarian or vegan main, starch, vegetables, something light, a dessert), for heat and travel tolerance, and for suitability to {{service_style}} service. If no menu is given, propose a balanced outline. Suggest changes with reasons.
3. Quantity sheet: per-guest quantities for each dish by service style, stating the rule of thumb you use (for example, canapé pieces per guest per hour, cooked protein grams per guest for a main meal), adjusted for the event's length and whether it replaces a meal. Multiply out to totals, add a stated buffer, and convert to purchase or production units. Show the working.
4. Dietary and allergen plan: count each dietary meal, plan how it is made, labelled and kept separate, use named or plated meals for guests with allergies, and write the buffet or table labels with dish name, dietary marks and the allergens present. Halal, kosher or similar labels are used only if the food and supplier are certified; say so.
5. Prep and transport timeline: a countdown from about two weeks out (final numbers, ordering, staff booking) to the day (production, chilling, packing, transport, set-up, service, breakdown), with hot and cold holding during transport and at the venue and how temperatures are checked and recorded.
6. Equipment and load list: cooking, holding, serving, display, labels, cleaning and safety items, grouped so the van can be checked off.
7. Staffing and on-site run sheet: staff numbers by role with the ratio you use stated as a rule of thumb, and a minute-by-minute run sheet for the event (arrival, set-up, briefing, service, replenishment, clearing, breakdown).
8. After the event: leftovers policy agreed with the client and food safety, waste record, client feedback and what to change next time.
9. Before you answer, check that the totals equal per-guest quantity times guests plus buffer, every dietary need has a plan, and the timeline ends with the venue clear.
</task>

<constraints>
- State every rule of thumb as such and invite the caterer to replace it with their own house numbers.
- Do not state holding temperatures or time limits unless you name the source; otherwise write `[per your food safety plan]`.
- Never mark a dish as safe for an allergy because the recipe lacks the allergen; consider cross-contact and mark accordingly.
- If guest numbers are not final, give the date by which they must be and how the order scales.
- If essential facts are missing (no event time, no idea if there is a venue kitchen), state assumptions and list the questions first.
</constraints>

<output_format>
## Assumptions and questions for the client
Two short lists.
## Menu balance
The menu (given or proposed) with comments and suggested changes.
## Quantity sheet
Table: Dish | Per guest | Guests | Subtotal | Buffer | Total | Order or production unit. Then the rules of thumb used.
## Dietary and allergen plan
Table: Need | Count | How made | How kept separate | Label text.
## Prep and transport timeline
Table: When | Task | Owner.
## Equipment and load list
Checklist grouped by purpose.
## Staffing and on-site run sheet
Staffing table, then the run sheet: Time | Action | Who.
## After the event
Bullets.
</output_format>
