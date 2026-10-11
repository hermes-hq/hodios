---
schema: 1
id: apply-brand-voice-to-copy
kind: prompt
title: Apply a brand voice guide to copy
description: Edits copy to match an organisation's existing brand voice guide, checking each passage against the guide's rules and word lists, fixing the misses and logging which rule each edit applies.
category: editing
version: 1.0.0
status: incubating
stage: [review]
role: [copywriter, marketer, content-creator, editor]
requires: [none]
inputs: [text, document]
output: [rewrite, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [brand-voice, tone-of-voice, brand-consistency, copy-editing, voice-guidelines]
pairs_with:
  prompts: [write-brand-voice-guide, copyedit-to-style-guide, rewrite-for-tone]
  personas: [editor]
args:
  - name: copy
    description: The copy to edit, such as web pages, emails, app text, social posts or packaging.
    type: text
    required: true
  - name: voice_guide
    description: The brand voice guide, or its key parts (voice traits, dos and don'ts, word lists, examples).
    type: text
    required: true
  - name: channel
    description: "Where the copy appears, for example \"error message in the app\" or \"launch email\". Voice guides often flex tone by channel."
    type: string
output_contract:
  format: markdown
  sections: [Fit summary, Edited copy, Edit log, Guide gaps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A brand voice guide usually defines a few voice traits ("warm, not gushing"; "confident, not arrogant"), how tone flexes by situation (lighter in marketing, plainer in errors and billing, careful in apologies), word lists (say "members", not "users"; never "cheap"), grammar and formatting choices (contractions, sentence case, no exclamation marks), and examples. Applying it is an editing job with rules, not a vibe: each change should trace to a line in the guide. The usual failures are applying the marketing tone everywhere (a jokey error message on a failed payment), changing meaning or legal text to fit the voice, and "fixing" copy the guide does not actually cover by inventing rules.
</context>

<task>
Edit this copy to match the brand voice guide.
{{#channel}}Channel: {{channel}}{{/channel}}

<voice_guide>
{{voice_guide}}
</voice_guide>

<copy>
{{copy}}
</copy>

1. If the copy or the guide is missing, ask for it and stop.
2. Extract the guide's checkable rules: voice traits with their "not" limits, tone by situation, required and banned words, grammar and formatting rules, and any examples.
3. Decide the tone that applies to this channel and situation, according to the guide.
4. Check each passage of the copy against the rules and list the misses with the rule they break.
5. Edit to fix the misses with the smallest change. Keep facts, offers, prices, product names, legal and regulatory text exactly; flag legal text that clashes with the voice instead of rewriting it.
6. Note situations the copy contains that the guide does not cover, and how you handled them.
</task>

<constraints>
- Every edit must trace to a specific guide rule. Do not invent rules or apply personal taste.
- Do not change meaning, offers, prices, terms or claims.
- Do not use banned words; use required terms consistently.
- Keep length within about 15 percent unless the guide calls for shorter copy.
</constraints>

<output_format>
## Fit summary
Two or three sentences: how well the copy fitted, and the main misses.
## Edited copy
The full edited copy.
## Edit log
A table: Original | Edited | Guide rule.
## Guide gaps
Bullets: situations the guide does not cover and the choice made. "None" if none.
</output_format>
