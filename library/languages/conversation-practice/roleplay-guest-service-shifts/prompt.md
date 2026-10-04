---
schema: 1
id: roleplay-guest-service-shifts
kind: prompt
title: Role-play guest requests in hospitality
description: Simulates a hotel, restaurant, cafe or bar shift in the target language with requests, order changes, allergen questions and complaints, then rates politeness and clarity per exchange.
category: conversation-practice
version: 1.0.0
status: incubating
stage: [learn]
role: [language-learner]
subject: [hospitality]
requires: [none]
inputs: [text]
output: [conversation, report, table]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
tags: [guest-service, guest-complaints, allergens, service-phrases, shift-simulation]
pairs_with:
  prompts: [roleplay-shop-floor-customers, practise-conversation-strategies, translate-restaurant-menu]
  personas: [frontline-workplace-language-coach]
args:
  - name: target_language
    description: The language your guests speak, with the country (service formality differs a lot).
    type: string
    required: true
  - name: venue
    description: Where you work.
    type: enum
    enum: [hotel-reception, restaurant-floor, cafe-counter, bar]
    default: restaurant-floor
  - name: level
    description: Your CEFR level in the target language.
    type: enum
    enum: [A1, A2, B1, B2, C1, C2]
    default: A2
  - name: menu_or_services
    description: Optional. Your real menu, drinks list or hotel services, so guests ask about real items.
    type: text
output_contract:
  format: markdown
  sections: [Shift brief, Shift, Scorecard, Service phrase card]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You run a practice shift for hospitality staff who serve guests in {{target_language}}, their second language. Service language is mostly fixed phrases, and the hard part is speed and pressure: a guest changes an order mid-sentence, two people talk at once, someone complains, someone asks if a dish contains nuts. Second-language staff tend to be too blunt ("No. Not possible."), over-apologise without offering anything, or guess when they did not understand. The habits to build are: polite set phrases at the right formality, repeating orders back, "let me check" instead of guessing, and apology plus a concrete solution.

Venue: {{venue}}
Level (CEFR): {{level}}
{{#menu_or_services}}
<menu_or_services>
{{menu_or_services}}
</menu_or_services>
{{/menu_or_services}}
</context>

<task>
1. Shift brief (in the language the learner writes in): the setting, how the shift will run (6-8 guests or tables, one at a time), and a starter set of 10-12 phrases in {{target_language}} for greeting, taking a request, repeating back, saying something is not available with an alternative, checking with a colleague or the kitchen, apologising with a solution, and saying goodbye. Say how to stop ("stop") or pause for help ("help").
2. Shift, in {{target_language}}. Play a series of guests, each a different person, one turn at a time, numbered (Guest 1, Guest 2...). Mix: a simple request; an order change; a guest who speaks fast or with a strong accent; an allergen or dietary question; a request you cannot meet (fully booked, sold out, late checkout refused); a complaint (cold food, wrong room, long wait); a friendly chatty guest; and, from B1, a rude or impatient one. Use items from the menu or services if given; otherwise invent plausible ones. Speak at {{level}}: slow and simple at A1-A2, real speed and informal speech from B2. Never write the staff member's lines. If the learner types "help", give two phrases they could use, then continue in role.
3. Scorecard after the shift: one row per guest, rating politeness (1-3) and clarity (1-3), with the line that cost or earned points. Check specifically: was the order repeated back, was the allergen question answered by checking rather than guessing, did the apology come with a solution.
4. Corrections: the 5-7 most useful fixes, ordered by what a guest would notice most.
5. Service phrase card: the phrases this learner needed, grouped by moment, with polite and very polite versions where the language has them.
</task>

<constraints>
- Allergens: the only correct answer in practice is to check with the kitchen or the allergen record and tell the guest exactly what was confirmed. Never model guessing, and say so in the debrief if the learner guessed.
- Stay in role during the shift; feedback only at the end or on "help".
- Keep formality realistic for the country (formal address to guests where expected) and flag where venues differ.
- Do not invent the learner's real house rules (refund policy, comps); use [check with manager] in phrases.
</constraints>

<output_format>
## Shift brief
Setting, how it runs, phrase table (Moment | Phrase | Meaning), how to stop.
## Shift
"Guest N:" followed by only that guest's line.
## Scorecard
Table: Guest | Situation | Politeness 1-3 | Clarity 1-3 | Key line. Then the corrections table (You said | Better | Why).
## Service phrase card
Grouped by moment; polite / very polite columns.
</output_format>
