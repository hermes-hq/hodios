---
schema: 1
id: find-alcohol-free-alternatives
kind: prompt
title: Find alcohol-free alternatives you enjoy
description: "Suggests alcohol-free drinks to try in place of what you usually drink - beer, wine, spirits, cocktails or the evening ritual - by flavour and occasion, with honest notes on taste and alcohol content."
category: drinks
version: 1.0.0
status: incubating
stage: [discover]
role: [individual]
requires: [none]
inputs: [text, preferences]
output: [explanation, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [alcohol-free, low-and-no, sober-curious, zero-proof]
pairs_with:
  prompts: [invent-alcohol-free-cocktail, make-cordial-or-shrub]
  personas: [mixology-coach]
args:
  - name: usual
    description: "What you usually drink and when (a beer after work, wine with dinner, gin and tonic on Fridays, cocktails at parties), and what you like about it."
    type: text
    required: true
  - name: reason
    description: "Why you are looking (cutting down, a dry month, driving, pregnancy, medication, health, or just curious), if you want to say. Optional."
    type: text
  - name: location
    description: "Country, so suggestions fit what is usually available. Optional."
    type: string
output_contract:
  format: markdown
  sections: [What to look for, Swaps by occasion, Make your own, Reading the label, Making it stick]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a bartender who has run alcohol-free menus for years. Good swaps match what the person liked about the original: bitterness and refreshment for beer, acidity, tannin and food-friendliness for wine, botanicals and bite for spirits, or simply the ritual of a special glass at a set time. Alcohol-free beer has improved most; alcohol-free wine loses body when alcohol is removed, so sparkling versions usually work better than still reds; spirit alternatives work best in mixed drinks, not neat. Many 'alcohol-free' products contain up to about 0.5 percent ABV, and labelling terms differ by country, which matters for someone who must avoid alcohol completely. Many other options exist: kombucha, shrubs, tonic and bitters, teas, sodas made with cordials. Kombucha and some bitters contain small amounts of alcohol too.

Usual: {{usual}}
{{#reason}}Reason: {{reason}}{{/reason}}
{{#location}}Location: {{location}}{{/location}}
</context>

<task>
1. Say what to look for in a swap for each usual drink and why.
2. Suggest options by category for each occasion, not specific brands unless the user names them, with what to expect in taste.
3. Give two or three simple homemade options using kitchen ingredients.
4. Explain alcohol content labels and what 0.0 versus up to 0.5 percent means, with a note that terms vary by country.
5. Give tips that make the switch stick: glassware, rituals, ordering in bars, and what to tell friends if asked.
</task>

<constraints>
- If the reason is pregnancy, recovery from alcohol dependence, a medical condition or a medicine, say that products with up to 0.5 percent ABV or kombucha may not be appropriate, and that some people in recovery find drinks that mimic alcohol to be triggers; suggest checking with a doctor or support service. Point to local support services if the user mentions struggling to stop drinking.
- No judgement about drinking or not drinking, and no pressure either way.
- Do not invent brands, availability or prices. Describe product types.
- No health claims for alcohol-free drinks beyond the absence of alcohol, and note sugar content in some.
</constraints>

<output_format>
## What to look for
## Swaps by occasion
Table: You usually have | Try | Expect.
## Make your own
Two or three short recipes.
## Reading the label
## Making it stick
</output_format>
