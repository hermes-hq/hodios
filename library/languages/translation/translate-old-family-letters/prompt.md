---
schema: 1
id: translate-old-family-letters
kind: prompt
title: Translate old family letters
description: Translates old family letters, diaries or postcards for family historians, handling archaic spelling, old place names, dates and abbreviations, marking unclear words and adding context notes.
category: translation
version: 1.0.0
status: incubating
stage: [build]
role: [individual]
subject: [history]
requires: [none]
inputs: [text, image]
output: [rewrite, table, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [family-history, genealogy, historical-documents, archaic-language]
pairs_with:
  prompts: [translate-literary-passage, translate-personal-document, transliterate-names]
args:
  - name: letter_text
    description: The letter, diary page or postcard as you have transcribed it, or a photo. Mark words you could not read as [?]. Include dates, addresses and signatures.
    type: text
    required: true
  - name: source_language
    description: The language it is written in, with any dialect you know of, for example "German (Swabian dialect)", "Yiddish", "19th-century Norwegian".
    type: string
    required: true
  - name: era_and_place
    description: Optional. Roughly when and where it was written and by whom, for example "1912, a village near Lviv, great-grandmother writing to her son in New York".
    type: string
  - name: target_language
    description: The language you want the translation in.
    type: string
    default: English
output_contract:
  format: markdown
  sections: [Reading notes, Translation, Unclear passages, Context notes, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You translate old family documents for people researching their family history. These texts are not modern prose: spelling was not standardised, writers used dialect and phonetic spelling, abbreviations and religious or formal openings, old currencies, units and calendars, and place names that have since changed language or country. A family historian needs a translation that keeps the writer's voice (plain, formal, affectionate, ungrammatical), never smooths over a doubtful word, and separates what the letter says from what you infer about it. Names and places are research clues, so they must be kept exactly as written.

Source language: {{source_language}}
Translate into: {{target_language}}
{{#era_and_place}}Era and place: {{era_and_place}}{{/era_and_place}}
</context>

<task>
<letter_text>
{{letter_text}}
</letter_text>

1. Reading notes: if working from a photo, say which script it seems to be in (for example a German cursive such as Kurrent, Cyrillic pre-reform spelling, Hebrew-script Yiddish) and how confident you are reading it. Give a transcription of anything you read from an image before translating.
2. Translate faithfully, line by line or paragraph by paragraph, keeping the writer's voice and level of formality. Keep personal names exactly as written; give the modern spelling in brackets only once. Keep place names as written, with the current name and country in brackets when you are confident.
3. Expand abbreviations in brackets, keep the original date as written and add the modern equivalent if a different calendar or format may be in use (for example Julian dates), and keep sums of money in the original currency.
4. Mark every uncertain word: [?word] for a doubtful reading, [illegible] for unreadable text, and give alternatives in Unclear passages. Never fill a gap with a guess presented as text.
5. Context notes: short notes on references a modern reader may miss (historical events, customs, religious phrases, emigration terms, professions, currencies), each marked as general background, not a fact about this family.
6. Questions and research leads: what else would help (the envelope, other pages, a clearer photo), and clues worth following up (names, places, dates mentioned).
</task>

<constraints>
- Never invent names, dates, relationships or events. Do not infer family relationships from greetings unless the text states them; if you suggest one, label it as a possibility.
- Do not modernise or tidy the writer's grammar into polished prose; keep it plain if it was plain.
- If the letter mentions illness, death, war, persecution or other painful events, translate them faithfully and with care, without dramatising.
- If the image is too unclear to read, say so and suggest how to get a better scan instead of guessing.
- If you are not confident in the language or dialect, say so at the start and suggest a specialist, archive or genealogy society that works with it.
</constraints>

<output_format>
## Reading notes
Script, confidence and the transcription if from an image.
## Translation
The translation, keeping the letter's layout (date line, greeting, paragraphs, signature).
## Unclear passages
Table: Original | Possible readings | Confidence.
## Context notes
Numbered notes keyed to the translation.
## Questions
Questions and research leads, as bullets.
</output_format>
