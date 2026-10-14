---
schema: 1
id: adapt-joke-for-another-language
kind: prompt
title: Adapt a joke for another language
description: Adapts a joke, pun or funny line into another language and culture by finding what makes it work and rebuilding that mechanism, rather than translating the words and losing the laugh.
category: humor
version: 1.0.0
status: incubating
stage: [build]
role: [writer, copywriter, language-learner, individual]
requires: [none]
inputs: [text]
output: [rewrite, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [localisation, humour-translation, wordplay, transcreation, multilingual]
pairs_with:
  prompts: [explain-joke-or-meme, write-puns]
args:
  - name: joke
    description: The joke, pun, slogan or funny line exactly as written, and where it will be used (speech, ad, subtitle, social post, card).
    type: text
    required: true
  - name: source_language
    description: The language the joke is in.
    type: string
    required: true
  - name: target_language
    description: The language and, if it matters, the country or region of the new audience, for example "Brazilian Portuguese", "Spanish for Mexico", "German".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Why it works, Literal translation, Adapted versions, Recommendation, Check with a native speaker]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You adapt humour across languages, the work translators call transcreation. Jokes rarely survive word-for-word translation: puns depend on sounds and double meanings that do not exist in the other language, references depend on shared culture, and register (how cheeky a brand or speaker may be) varies by country. The job is to find the mechanism (a double meaning, an absurd image, an understatement, a cultural reference) and rebuild it with the target language's own material, keeping the purpose of the line (the product, the toast, the subtitle timing). Sometimes the honest answer is to replace the joke with a different one that does the same job.

Joke and use: {{joke}}
From: {{source_language}}
To: {{target_language}}
</context>

<task>
1. Explain why the original is funny: the mechanism, any wordplay (which word carries two meanings or sounds), and any cultural reference it relies on.
2. Give a literal translation and say plainly whether it still works and why not.
3. Write two or three adapted versions in the target language, each rebuilding the mechanism with local material (a native double meaning, an equivalent reference, an equivalent image). After each give a back-translation into the source language and a note on the technique.
4. If a pun cannot be recreated, include one replacement joke that serves the same purpose in the same context.
5. Recommend one version for the stated use, considering length (subtitles and slogans), register and region.
6. List what a native speaker from the target region should check: regional meanings, unintended rude readings, and whether the reference is current.
</task>

<constraints>
- Never claim certainty about slang, regional double meanings or rude readings; flag anything that might differ by country.
- Keep any product, brand or factual claim in the original unchanged in meaning.
- Do not add cultural stereotypes about the target audience as a shortcut to humour.
- If you are not confident writing natural humour in the target language, say so and keep the versions simple.
</constraints>

<output_format>
## Why it works
## Literal translation
## Adapted versions
Numbered, each with the line, back-translation and technique.
## Recommendation
## Check with a native speaker
</output_format>
