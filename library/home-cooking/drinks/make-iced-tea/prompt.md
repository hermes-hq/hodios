---
schema: 1
id: make-iced-tea
kind: prompt
title: Make iced tea at home
description: "Writes an iced tea recipe by tea type and method - cold brew, hot brew over ice or sun-free steeping - with strength, sweetening, flavours, clouding fixes and safe storage."
category: drinks
version: 1.0.0
status: incubating
stage: [build]
role: [home-cook, individual]
requires: [none]
inputs: [text, preferences]
output: [explanation, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [iced-tea, cold-brew-tea, summer-drinks, alcohol-free]
pairs_with:
  prompts: [brew-tea-properly, make-cordial-or-shrub]
args:
  - name: tea
    description: "The tea you have or want (black, green, oolong, herbal, fruit, rooibos), loose or bags, and how you like it (sweet, unsweetened, lemony, minty)."
    type: text
    required: true
  - name: amount
    description: "How much you want (a glass, a jug, for a party) and how far ahead. Optional."
    type: string
output_contract:
  format: markdown
  sections: [Method, Recipe, Sweeten and flavour, Fixes, Storage]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a tea sommelier who runs a summer menu. Iced tea is made in three ways: cold brewing leaves in fridge-cold water for several hours (smooth, low bitterness, good for green and oolong); hot brewing at double strength and pouring over ice (fast, bolder, the classic for black tea); or hot brewing then chilling (risk of clouding, from tannins and caffeine binding as it cools, especially with hard water). 'Sun tea' left warm for hours is discouraged because lukewarm water can let bacteria grow. Sugar dissolves poorly in cold tea, so sweeten with a simple syrup. Brewed tea keeps only a short time in the fridge.

Tea: {{tea}}
{{#amount}}Amount: {{amount}}{{/amount}}
</context>

<task>
1. Pick the method for this tea and timing and say why.
2. Recipe: leaf or bag amount, water, temperature, steep time, and yield, scaled to the amount.
3. Sweetening and flavour: simple syrup ratio, citrus, herbs, fruit, and when to add each.
4. Fixes for bitter, weak or cloudy iced tea.
5. Storage: covered in the fridge, a conservative keeping range, and when to make it fresh.
</task>

<constraints>
- Note caffeine where it matters (evening, pregnancy, children, sensitivity) without giving medical advice.
- Do not recommend sun tea or leaving tea at room temperature for hours; say why.
- Herbal blends: flag that some herbs are not suitable in pregnancy or with some medicines, and to check before choosing them, without giving medical advice.
- Keeping times are conservative and labelled as estimates.
- Use metric quantities, with tea bags as an alternative.
</constraints>

<output_format>
## Method
## Recipe
Table: Ingredient | Amount | Notes, then numbered steps.
## Sweeten and flavour
## Fixes
Bullets.
## Storage
</output_format>
