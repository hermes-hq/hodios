---
schema: 1
id: write-door-to-door-leaflet-copy
kind: prompt
title: Write door-to-door leaflet copy
description: Writes a letterbox leaflet, door hanger or postcard for a local trade, takeaway or shop, with one headline, a real reason to act now, a tracked response code and a keep-on-the-fridge back.
category: copywriting
version: 1.0.0
status: incubating
stage: [build]
role: [founder, marketer]
subject: [construction, hospitality, retail]
requires: [none]
inputs: [text]
output: [copy, plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [leaflet-drop, door-hanger, response-tracking, local-marketing, print]
pairs_with:
  prompts: [write-brochure-copy, write-direct-mail-letter, plan-local-advertising, plan-promotional-offer, canvass-neighbours-after-job]
args:
  - name: business
    description: What you do, where you work, who your best customers are, prices or price ranges, proof you can show (years trading, local jobs done, reviews, accreditations), phone, website and hours.
    type: text
    required: true
  - name: offer
    description: The offer or reason to get in touch now (seasonal service, opening deal, free quote, slots available in the area this month) and any end date or limit.
    type: text
    required: true
  - name: format
    description: Print format - a5-leaflet (two sides, through the letterbox), door-hanger (hangs on the handle) or postcard (one picture side, one message side).
    type: enum
    enum: [a5-leaflet, door-hanger, postcard]
    default: a5-leaflet
  - name: area
    description: Streets, estates or postcode areas you plan to cover, roughly how many homes, and what they are like (new-build estate, older terraces, flats). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Who this drop is for, Front, Back, Response tracking, Delivery plan, Checks before printing]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write unaddressed door-to-door print for local businesses: plumbers, roofers, cleaners, gardeners, takeaways, salons and corner shops. Most leaflets go straight in the recycling because they try to speak to everyone, list every service and give no reason to act this week. The ones that work pick one audience on one kind of street, lead with one problem or craving in a headline readable in two seconds, show local proof, and give a simple next step. The back earns a second life when it is useful enough to stick on the fridge: a price list, a menu, a seasonal checklist or an emergency number. Response is usually low and varies a lot, so tracking each drop with its own code is what turns leaflets from a hope into a channel the owner can judge.

This prompt covers the printed piece and its delivery only. If the owner wants to knock and talk to neighbours after finishing a job nearby, point them to canvass-neighbours-after-job for the doorstep visit (a knock-and-talk visit); a leaflet drop to the same streets can follow it a week or two later.

Format: {{format}}
</context>

<task>
<business>
{{business}}
</business>

<offer>
{{offer}}
</offer>

{{#area}}<area>
{{area}}
</area>{{/area}}

1. If you do not know what the business does, how to contact it, or what the offer is, ask for those and stop.
2. Choose one audience for this drop (for example owners of 1930s houses with old boilers, families on the new estate, flats near the high street) and state it.
3. Front: one headline of eight words or fewer about that audience's problem or want, a subhead with the offer, three short proof or benefit lines from supplied facts, and one call to action with the phone number or a short web address. For a door hanger, fit the front to the narrow hanging panel; for a postcard, write the picture-side line and image idea.
4. Reason to act now: use only a real limit or date from the input (season, slots, opening week). If none is given, suggest honest options and mark them as suggestions.
5. Back: the keep-it content that suits the business (menu with prices, service price guide, seasonal checklist, "what to do if your pipe bursts" steps), plus contact details, hours and area covered.
6. Tracking: a unique code or short web path per drop and area ("quote ELM10"), what staff ask when someone calls, and a simple sheet to record homes reached, responses, jobs or orders and revenue per drop.
7. Delivery plan: how many drops, how far apart (a repeat drop to the same streets usually beats one big drop), timing for the business type, and who delivers.
</task>

<constraints>
- Use only facts supplied. No invented prices, reviews, ratings, accreditations or numbers of local jobs; mark gaps as [X].
- No fake urgency, fake "final notice" styling, or designs that look like official letters, bills or council notices.
- Always respect "no junk mail", "no flyers" and "no cold callers" signs, and in some countries such signs are legally binding. In the US, unstamped material must not go in mailboxes; door hangers go on the door. Tell the owner to check local rules for leaflet distribution.
- Push leaflets fully through the letterbox: one left sticking out signals an empty home.
- If the leaflet collects contact details or uses a QR code to a form, say what consent and privacy wording to check locally.
{{> output/uncertainty}}
</constraints>

<output_format>
## Who this drop is for
Audience, area and the one problem or want, in three lines.

## Front
Headline, subhead, proof lines, call to action, and layout notes for the chosen format.

## Back
The keep-it content and contact block, ready to set.

## Response tracking
The code, the staff question, and a table: Drop | Date | Area | Homes | Responses | Jobs or orders | Revenue.

## Delivery plan
Bullets: number of drops, spacing, timing, who delivers.

## Checks before printing
Checklist: facts to confirm, [X] placeholders, phone number tested, no-junk-mail rule, readable at arm's length.
</output_format>
