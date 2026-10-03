---
schema: 1
id: write-pinterest-pins
kind: prompt
title: Write Pinterest pins
description: Writes Pinterest pin titles, descriptions, board names and text-overlay ideas that match search intent for a product, recipe or article. Use when promoting content on Pinterest.
category: social-media
version: 1.0.0
status: incubating
stage: [build]
role: [content-creator, marketer]
inputs: [text, url]
output: [copy, ideas, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [pinterest, pin-descriptions, search-intent, text-overlay, alt-text]
pairs_with:
  prompts: [write-instagram-caption, plan-carousel-post]
  personas: [social-media-manager]
args:
  - name: content_or_product
    description: The product, recipe, article or page the pins link to, with its key details, who it is for, the destination URL, and any seasonal timing.
    type: text
    required: true
  - name: keywords
    description: Search terms you have found in Pinterest's search bar suggestions or Pinterest Trends, if any.
    type: text
  - name: pin_count
    description: How many distinct pins to write.
    type: number
    default: 5
output_contract:
  format: markdown
  sections: [Search intent, Pins, Board names, Keyword checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write Pinterest pins. Pinterest behaves like a visual search engine more than a social feed: people come to plan (dinners, outfits, rooms, trips, projects), they search with descriptive phrases, and they save pins to boards for later. A pin is found through the keywords in its title, description, board and the image itself, and it can keep bringing traffic for months. Pins that work show the outcome in a tall image (2:3 ratio is standard), carry a short text overlay that says what the click delivers, and use natural, descriptive language rather than hashtags. Only the start of a title shows in the feed, so the most important words go first. People search for seasonal ideas well ahead of the date, often a month or more.
</context>

<task>
Write {{pin_count}} distinct pins for this content.

<content>
{{content_or_product}}
</content>

<keywords>
{{keywords}}
</keywords>

1. **Search intent.** Name the two or three things a Pinner would be planning or trying to solve when this content is the answer, and the descriptive phrases they would type. Use the supplied keywords first; add natural variations and mark them as suggestions to verify.
2. **Pins.** Write {{pin_count}} pins, each aimed at a different intent or angle (for example the outcome, a how-to, a list, a specific use case, a seasonal angle). For each pin:
   - Title: up to 100 characters, the main phrase in the first 40.
   - Description: two to three natural sentences, up to 500 characters, with the main and one or two related phrases, what the click delivers, and a soft call to action (save it, try it, shop it).
   - Text overlay: at most six words, readable on a phone.
   - Image concept: what the 2:3 image shows and where the overlay sits.
   - Alt text: a plain description of the image.
   - Board: which board it belongs on.
3. **Board names.** Three to five keyword-rich board names with a one-line board description each.
4. **Keyword checks.** How to confirm the phrases using Pinterest's search suggestions and Trends, and when to publish if the content is seasonal.
</task>

<constraints>
- Describe the content accurately: no claims, prices, results or features that are not in the material. Use `[FILL: …]` where a detail is missing.
- Do not state search volumes or trend data; you have not seen them.
- No hashtags, emoji strings or clickbait. Each pin must be distinct, not the same words reshuffled.
- If the content is a product with an affiliate or paid relationship, add a disclosure note to the description.
</constraints>

<output_format>
## Search intent
Bullets.

## Pins
One numbered block per pin with the six fields above.

## Board names
A list with descriptions.

## Keyword checks
Bullets, including the suggested publish timing.
</output_format>
