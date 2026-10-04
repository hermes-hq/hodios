---
schema: 1
id: optimize-restaurant-website-search
kind: prompt
title: Optimise a restaurant website for search
description: Optimises a restaurant or cafe site for local and menu searches, covering an HTML menu, dish and diet terms, consistent hours and booking, restaurant structured data, photos and pages diners look for.
category: seo
version: 1.0.0
status: incubating
stage: [review, plan]
role: [founder, marketer]
subject: [hospitality]
requires: [none]
inputs: [text, notes]
output: [checklist, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [dining-out, cafes, online-menu, restaurant-schema, dietary-labels]
pairs_with:
  prompts: [plan-local-seo, audit-business-citations, write-schema-markup]
args:
  - name: restaurant
    description: Name, cuisine, location, price level, opening hours, how people book or order (own system, third-party platform, phone), dietary options you really offer, private dining or events, and what sets you apart.
    type: text
    required: true
  - name: current_site_notes
    description: What the website has now - platform, pages, whether the menu is a PDF or image, photos, where hours appear, and what the map listing shows. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Quick wins, Menu, Consistency, Structured data, Pages diners search for, Photos, Checklist]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help restaurant and cafe owners get found by people searching for a cuisine, a dish, a dietary need or an occasion near them ("vegan brunch Shoreditch", "ramen near me", "private dining for 20"). The usual problems: the menu is a PDF or a photo search engines and phones handle poorly, hours differ between the site, the map listing and booking platforms, the only menu online lives on a delivery app, and the site has one page with no text about what diners actually search for. Most diners also check the map listing first, so the website and the listing must agree.
</context>

<task>
<restaurant>
{{restaurant}}
</restaurant>

{{#current_site_notes}}<current_site_notes>
{{current_site_notes}}
</current_site_notes>{{/current_site_notes}}

1. Quick wins: the three changes with the most effect for least effort for this restaurant.
2. Menu: an HTML text menu page (PDF only as an extra download), dish names as diners say them, short descriptions with key ingredients, prices, clear dietary labels only for options that really qualify, an allergen statement pointing diners to staff, and a date or season so it is visibly current. Separate pages or sections for menus people search for (brunch, set lunch, kids, drinks) when they exist.
3. Consistency: name, address, phone, hours, holiday hours, booking link and menu link identical on the website, map listings, social profiles and booking or delivery platforms. Say how to update hours for holidays and closures.
4. Structured data: Restaurant (or CafeOrCoffeeShop) with name, address, telephone, url, servesCuisine, priceRange, openingHoursSpecification, hasMenu (the menu URL), acceptsReservations, image; matching what is visible on the page.
5. Pages diners search for, only where the restaurant really offers it: menu, booking, private dining and events with capacity, location and getting here (transport, parking, accessibility), gift vouchers, a short story page. One page per real offer, with the text a diner needs to decide.
6. Photos: real dish, room and outside shots with descriptive file names and alt text, sized for mobile; the same strong photos on the map listing.
7. A checklist to run monthly (menu current, hours, photos, review replies).
</task>

<constraints>
- Do not invent dishes, prices, dietary or allergen claims, awards, capacity or reviews. Use [X] for missing details.
- Never label a dish vegan, gluten-free or allergen-free unless the restaurant stated it; remind the owner that allergen information rules differ by country and to check theirs.
- Name a booking or website platform setting only when you are confident it exists; otherwise describe what to look for.
- If the restaurant's location or what it serves is missing, ask and stop.
</constraints>

<output_format>
## Quick wins
Three numbered items with the reason for each.

## Menu
What the menu page should contain, with a sample section in the restaurant's own dishes.

## Consistency
Table: Place | Field | Action.

## Structured data
Field list with values from the input and [X] where missing.

## Pages diners search for
Table: Page | Searches it answers | Must include.

## Photos
Bullets: shots to take, naming and alt text examples.

## Checklist
Monthly checklist, ten items or fewer.
</output_format>
