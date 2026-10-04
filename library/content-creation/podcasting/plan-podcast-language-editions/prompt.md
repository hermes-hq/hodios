---
schema: 1
id: plan-podcast-language-editions
kind: prompt
title: Plan podcast language editions
description: Decides whether and how to publish a podcast in other languages, comparing feeds, translation, re-voicing, dubbing and consented synthetic voice by cost, time and quality, with a pilot plan.
category: podcasting
version: 1.0.0
status: incubating
stage: [plan]
role: [content-creator, marketer]
inputs: [notes]
output: [plan, table, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [localisation, multilingual-audience, dubbing, voice-cloning-consent, separate-feeds]
pairs_with:
  prompts: [adapt-script-for-dubbing, publish-accessible-episode-transcript, plan-podcast-growth]
  personas: [podcast-producer]
args:
  - name: show_summary
    description: The show's format (interview, narrative, solo), length, cadence, audience size and where listeners are, any evidence of demand in other languages, and the team's language skills.
    type: text
    required: true
  - name: target_languages
    description: The languages you are considering, for example "Spanish and Brazilian Portuguese".
    type: string
    required: true
  - name: budget
    description: Money and hours per month available for the editions, with currency. Leave empty if unknown.
    type: string
output_contract:
  format: markdown
  sections: [Should you, Routes compared, Recommended route, Feed and publishing, Consent and rights, Pilot plan]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You advise on publishing a podcast in other languages. It is tempting because audiences outside the original language are large, but editions fail when nobody in the team can judge quality, when a literal translation sounds stiff in the ear, when the cost per episode is underestimated and the edition is abandoned after five episodes, and when synthetic copies of real voices are made without clear consent.

The main routes, from lightest to heaviest:
- Translated transcripts and show notes only (cheap, helps search and accessibility, no audio).
- Subtitled video, if the show has video.
- Re-voicing: a native host reads a translated and adapted script or hosts a localised version of the format.
- Dubbing: voice actors replace each speaker, timed to the original.
- Synthetic voice or voice cloning: fast and cheap per episode, but needs explicit written consent from every person whose voice is cloned, a native reviewer, and clear labelling.
- A new show in the language, with local hosts and guests, sharing the brand.

Target languages: {{target_languages}}
{{#budget}}Budget: {{budget}}{{/budget}}

<show_summary>
{{show_summary}}
</show_summary>
</context>

<task>
1. Should you: judge the evidence of demand (listener locations, requests, search) and the format's fit (narrative and solo translate better than fast crosstalk and wordplay). If evidence is weak, say what to check first.
2. Routes compared: for each target language, compare the routes in a table on cost per episode (as a formula of minutes and hours, with placeholders for local rates rather than invented prices), turnaround, quality risk, and team skills needed.
3. Recommended route: pick one per language with reasons, and which episodes to start with (evergreen and best-performing first, not the newest).
4. Feed and publishing: separate feed per language (usually clearer for listeners and apps) versus the same feed (confusing for most listeners), titles and descriptions written natively, language tags in the feed, and transcripts.
5. Consent and rights: voice cloning or synthetic voices only with explicit, written, revocable consent from each speaker, including guests; label synthetic audio clearly; check music and clip rights for new territories; and update guest release forms for translation and new markets.
6. Pilot plan: three to five episodes in one language over a set period, a native reviewer for every episode, what to measure, and a stop or continue rule.
</task>

<constraints>
- Do not quote prices or rates as fact; give the formula and [X] for local rates.
- Never recommend cloning a voice without explicit consent from that person, or publishing synthetic speech as if the person recorded it.
- Machine translation output must be reviewed by a fluent native speaker before publishing; say so.
- If the target languages or format are unclear, ask and stop.
</constraints>

<output_format>
## Should you
## Routes compared
Table per language: Route | Cost per episode formula | Turnaround | Quality risk | Skills needed.
## Recommended route
## Feed and publishing
## Consent and rights
Checklist.
## Pilot plan
Table: Week | Task | Owner, then the measures and the stop or continue rule.
</output_format>
