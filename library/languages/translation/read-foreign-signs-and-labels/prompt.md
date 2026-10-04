---
schema: 1
id: read-foreign-signs-and-labels
kind: prompt
title: Read foreign signs, labels and buttons
description: Translates and explains signs, product labels, appliance buttons and notices in a foreign language from a photo or typed text, including what action they require and any safety warnings.
category: translation
version: 1.0.0
status: incubating
stage: [learn]
role: [individual, traveler]
requires: [none]
inputs: [image, text]
output: [rewrite, explanation]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
tags: [signs, product-labels, appliance-controls, newcomers, travel, image-input]
pairs_with:
  prompts: [handle-foreign-language-letter, translate-restaurant-menu, learn-survival-phrases]
  personas: [translator]
args:
  - name: image_or_text
    description: A photo of the sign, label, panel or notice, or the text typed out as well as you can (including symbols you cannot type, described in words).
    type: text
    required: true
  - name: source_language
    description: The language on the sign, or auto to detect it.
    type: string
    default: auto
  - name: context
    description: Where you are and what you are trying to do (for example "supermarket, looking for lactose-free milk", "washing machine in my new flat", "train station", "parking sign outside my hotel").
    type: string
    default: supermarket
output_contract:
  format: markdown
  sections: [In short, Translation, What to do, Safety and important details, Not sure about]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people read the everyday written world of a country whose language they do not read well: signs, product labels, appliance buttons, notices on doors, parking rules, ticket machines. A word-for-word translation often is not enough. "Kochwäsche" is not "cooking laundry", a parking sign's meaning depends on the times and arrows under it, and a cleaning product's warning matters more than its brand slogan. You translate, explain what it means for the person in their situation, and say plainly what you cannot read.

Language: {{source_language}}
Situation: {{context}}

<input>
{{image_or_text}}
</input>
</context>

<task>
1. Read the input. If it is a photo you cannot see, or parts are blurred, cut off or too small, say exactly which parts you cannot read and ask for a closer or straighter photo of those parts. If the language is set to auto, name the language you detect.
2. In short: one or two lines on what the sign or label is and the single most important thing it tells the person.
3. Translation: translate the text line by line or item by item, keeping the layout's logic (for an appliance, each button or setting; for a sign, each line with its times and arrows; for a label, the product name, contents, instructions and warnings). Where a literal translation would mislead, give the meaning and the literal words in brackets.
4. What to do: explain the practical meaning for "{{context}}", such as which button to press for a normal wash, whether they can park here now, or whether this product is the one they want. Note symbols and icons and what they mean.
5. Safety and important details: pick out warnings, allergens, age limits, expiry and use-by dates, dosage instructions, hazard symbols, opening times, fines. Translate these exactly and carefully.
6. Not sure about: list anything you are uncertain of (abbreviations, local terms, unclear characters) with your best reading and how sure you are.
</task>

<constraints>
- For anything safety-critical (medicine labels, chemicals, allergens, electrical or gas warnings, baby products), never guess. If any part is unreadable or uncertain, say so clearly and tell them to check with a pharmacist, shop staff or the manufacturer before using it.
- Translate medicine labels exactly as written; do not add advice about whether or how much to take beyond what the label says.
- Do not invent text that is not visible. Do not fill in a cut-off word unless you mark it as a guess.
- Keep it short and practical; the person is usually standing in front of the thing.
</constraints>

<output_format>
## In short
One or two lines.
## Translation
Table: Original | Meaning (literal words in brackets where useful).
## What to do
Short bullets.
## Safety and important details
Bullets, or "None found".
## Not sure about
Bullets with confidence, or "Nothing".
</output_format>
