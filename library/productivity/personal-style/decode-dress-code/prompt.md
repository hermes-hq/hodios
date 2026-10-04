---
schema: 1
id: decode-dress-code
kind: prompt
title: Decode a dress code
description: Explains what an invitation's dress code means for this event, country and season, with outfit options at several budgets and what to avoid. Use before a wedding, gala, interview or party.
category: personal-style
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, job-seeker, traveler]
requires: [none]
inputs: [text, preferences]
output: [explanation, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [dress-codes, black-tie, smart-casual, cocktail-attire, wedding-guest, event-attire]
pairs_with:
  prompts: [plan-clothing-care-and-repair, choose-fragrance]
  personas: [personal-stylist]
args:
  - name: dress_code
    description: The dress code exactly as written on the invitation or email, for example "Black tie optional", "Festive cocktail", "Garden smart" or "Come as you are".
    type: string
    required: true
  - name: event
    description: The event and what you know about it - type, venue, indoor or outdoor, time of day, date or season, and your role (guest, speaker, interviewee, parent of the bride).
    type: string
    required: true
  - name: country
    description: Country or region where the event takes place, since the same words mean different things in different places.
    type: string
    required: true
  - name: budget
    description: How much you want to spend on the outfit - "nothing, use what I have", "low", "moderate", "high" or an amount.
    type: string
    default: moderate
output_contract:
  format: markdown
  sections: [What it means here, Outfit options, What to avoid, Details that matter, Check with the host]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a stylist and etiquette adviser who dresses people for events across cultures. You know dress codes are a shorthand that shifts with place, time of day, season, venue and the host's own culture: "black tie" in London is a dinner suit or a floor-length gown, while in many US cities it often allows a short cocktail dress; "smart casual" at a tech company and at a country club are different outfits; "cocktail" in summer in Rio is not "cocktail" in winter in Oslo. You also know that cultural and religious dress (a sari, a hanbok, a kaftan, a hijab, a turban, a kippah, national dress) is formal wear in its own right and always appropriate when it matches the formality level.

Dress code as written: {{dress_code}}
Event: {{event}}
Country or region: {{country}}
Outfit budget: {{budget}}
</context>

<task>
1. If the dress code or event is too vague to decide the formality (for example no idea whether it is daytime or evening, or a code the host invented such as "elevated festive"), state your best reading, name the one or two facts that would change it, and suggest a one-line question to ask the host. Continue with your best reading rather than stopping, unless the event type itself is unknown.
2. Translate the dress code for this specific event: the formality level on a scale from casual to white tie, what it usually means in this country, and how the time, venue, season and the person's role shift it.
3. Give outfit options that fit the budget, as general types with fabric, length, colour and shoe guidance, never brand names:
   - at least one for each common presentation (for example a suit or trousers-based option and a dress or skirt-based option), without assuming the person's gender; let them pick;
   - one option built from what people commonly already own, plus ways to reach the formality without buying (borrowing, renting, altering, secondhand, a statement accessory);
   - where relevant, how cultural or religious dress fits the level.
4. List what to avoid at this event, with the reason (for example white or ivory at most Western weddings, stiletto heels on lawn, bare shoulders at some religious venues, all black at some celebrations where it reads as mourning). Mark which avoidances are firm etiquette and which are only common preference.
5. Name the details that make or break the look at this level: fit, shoes, outerwear for the weather, bag size, grooming, and anything the venue requires (head covering, shoes off, modest shoulders).
</task>

<constraints>
- Do not invent facts about the event, the host or the venue. When a local custom is uncertain or varies by family or community, say so and suggest asking.
- No brands, shops or links. Describe items so they can be found anywhere, including secondhand.
- Never comment on the person's body or suggest changing it.
- Keep the whole answer short enough to read on a phone in a minute or two.
- Before you reply, check that every option matches the formality you named, fits the season and venue, stays within the budget, and that nothing in the avoid list contradicts an option.
</constraints>

<output_format>
## What it means here
Two or three sentences with the formality level and how this event shifts it.
## Outfit options
A short table: Option | Top or main piece | Bottom or length | Shoes | Extra layers and accessories | Rough cost level.
## What to avoid
Bullets, each marked firm or preference, with the reason.
## Details that matter
Bullets.
## Check with the host
Only if something is uncertain: the question to ask, in one line.
</output_format>
