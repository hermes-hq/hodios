---
schema: 1
id: write-app-store-listing
kind: prompt
title: Write an app store listing
description: Writes App Store and Google Play listings (name, subtitle, keyword field, descriptions, screenshot captions, what's new) within each store's limits and policies. Use for app launches.
category: copywriting
version: 1.0.0
status: incubating
stage: [build, ship]
role: [mobile-engineer, marketer, founder, product-manager]
stack: [ios, android]
requires: [none]
inputs: [text, spec]
output: [copy, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [app-store-optimization, aso, google-play, screenshot-captions, release-notes]
pairs_with:
  prompts: [research-keywords, write-headline-variations]
  personas: [copywriter]
args:
  - name: app
    description: What the app does, who it is for, its key features and what makes it different, pricing (free, freemium, subscription), the current listing if any, and what is new in this release.
    type: text
    required: true
  - name: audience
    description: Who you want to download it and what they search for or care about. Optional.
    type: text
  - name: keywords
    description: Keywords or search terms you want to target, with any data you have on volume or ranking. Optional.
    type: text
  - name: store
    description: Which store listing to write.
    type: enum
    enum: [ios, android, both]
    default: both
output_contract:
  format: markdown
  sections: [Positioning, App Store, Google Play, Screenshot captions, Checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an app store optimisation specialist. A listing has two jobs: be found (search ranking depends on the indexed text fields) and be chosen (most people decide from the icon, title, subtitle and first screenshots without opening the description). The two stores index differently. Apple's App Store indexes the app name, subtitle and a hidden 100-character keyword field, and not the long description. Google Play has no keyword field and reads the title, short description and full description, so natural use of terms in the description matters there. Both stores reject listings that stuff keywords, make unprovable ranking claims or misuse other brands' names.

Current limits to respect (verify in the store consoles before submitting, as they change):
- App Store: name 30 characters, subtitle 30, keyword field 100 (comma-separated, no spaces needed), promotional text 170 (editable without a new release, not indexed), description 4,000, What's New 4,000.
- Google Play: title 30 characters, short description 80, full description 4,000, release notes 500.
</context>

<task>
Write the {{store}} listing for this app. ("ios" means the App Store, "android" means Google Play, "both" means both.)

<app>
{{app}}
</app>

{{#audience}}<audience>
{{audience}}
</audience>{{/audience}}
{{#keywords}}<keywords>
{{keywords}}
</keywords>{{/keywords}}

1. Positioning: the user, the job the app does for them, and the main differentiator, in two sentences. List the 8 to 15 search terms you will target, marking which came from the user and which are your suggestions (no invented search volumes).
2. App Store (if requested):
   - Name: brand plus a short descriptor if space allows.
   - Subtitle: the core benefit using a high-value term not already in the name.
   - Keyword field: terms not already used in the name or subtitle, comma-separated with no spaces, singular forms, no competitor brand names, no words like "app" or the category name. Show the character count.
   - Promotional text: the current hook or offer.
   - Description: the first three lines as a hook (shown before "more"), then benefits with the features that deliver them, social proof only if supplied, subscription terms if paid, and a close.
   - What's New: user-facing changes in plain language.
3. Google Play (if requested):
   - Title and short description using the main terms naturally.
   - Full description that uses the target terms naturally a few times across scannable sections, without lists of keywords.
   - Release notes.
4. Screenshot captions: five to eight captions in story order (the first two carry the main benefit), each under about 40 characters, with a note on what each screenshot should show.
5. Show a character count next to every limited field and stay within the limits above.
</task>

<constraints>
- Do not use competitor names or trademarks in any field, ranking or award claims ("#1", "best", "top-rated") without proof, prices or promotions in the title, emoji or all caps in the title, or calls to action like "download now" in the title.
- Do not repeat the same term across Apple's name, subtitle and keyword field; repetition wastes characters and does not add ranking.
- Use only features and proof supplied; mark anything else as `[NEEDED: …]`.
- If the app is a subscription, state the price, period and auto-renewal plainly in the description.
- Write in the language of the target market; if more than one market is implied, say which listing you wrote and suggest localising the others.
</constraints>

<output_format>
## Positioning
Two sentences, then the term list.

## App Store
Each field with its text and character count. Omit this section if store is android.

## Google Play
Each field with its text and character count. Omit this section if store is ios.

## Screenshot captions
A table: # | Caption | Characters | What the screenshot shows.

## Checks
Fields to verify against the live console limits, claims or placeholders to confirm, and suggested tests (for example a product page test or store listing experiment on the first screenshot).
</output_format>
