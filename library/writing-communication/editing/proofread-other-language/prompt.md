---
schema: 1
id: proofread-other-language
kind: prompt
title: Proofread text in another language
description: Proofreads text written in a language other than English for grammar, spelling, punctuation and that language's typography conventions, listing each fix with a reason in English.
category: editing
version: 1.0.0
status: incubating
stage: [review]
role: [language-learner, writer, individual, editor]
requires: [none]
inputs: [text, document]
output: [rewrite, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
tags: [proofreading-non-english, typography, diacritics, grammar-check, multilingual]
pairs_with:
  prompts: [proofread-text, correct-my-sentences, translate-preserving-tone]
  personas: [editor]
args:
  - name: text
    description: The text to proofread, in the language it is written in.
    type: text
    required: true
  - name: language
    description: "The language of the text, for example \"French\", \"German\", \"Brazilian Portuguese\", \"Polish\"."
    type: string
    required: true
  - name: regional_variant
    description: "Optional, the regional norm to follow, for example \"France\" or \"Quebec\", \"Switzerland\", \"Portugal\", \"Mexico\". Inferred from the text if left out."
    type: string
output_contract:
  format: markdown
  sections: [Corrected text, Changes, Queries, Patterns]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Proofreading outside English means applying that language's own norms, not English habits. Beyond spelling and grammar (agreement, gender, case, verb forms, mood), each language has typography rules that spellcheckers miss: French puts a non-breaking space before ; : ! ? and inside « » (Swiss usage differs), German uses „…“ quotation marks and capitalises nouns, Spanish opens questions and exclamations with ¿ and ¡, many languages write decimals with a comma and group thousands with a space or full stop, and date formats, capitalisation of months and days, and dash and hyphen use all differ. Regional variants are not errors: Brazilian and European Portuguese spell and conjugate differently, and Swiss German does not use ß.
</context>

<task>
Proofread this {{language}} text{{#regional_variant}}, following {{regional_variant}} norms{{/regional_variant}}.

<text>
{{text}}
</text>

1. If the text is empty, ask for it and stop. If the text is mostly in a different language from the one stated, say which language it appears to be and ask which to use before proofreading. Stop there.
2. If no regional variant was given, infer it from the spelling and vocabulary and state it in one line. If the text mixes variants, follow the dominant one and list the others as queries.
3. Note the register and the author's deliberate choices (formal or informal address such as vous/tu or Sie/du, dialect, house style) and keep them. Flag an inconsistent form of address rather than choosing one.
4. Correct, following the language's main reference norms (for example Duden for German, the RAE and ASALE for Spanish, the current spelling agreement for Portuguese):
   - spelling, including accents and diacritics, and capitalisation;
   - grammar: agreement, gender, case, verb forms and tense, mood, prepositions, word order errors;
   - punctuation: commas and other marks where that language's rules require them;
   - typography: quotation marks, required spaces, decimal and thousands separators, dates, times, ordinals, dashes, apostrophes.
5. Log each change with a short reason in English, naming the rule where it helps (for example "subjonctif after bien que", "Dativ after mit").
6. Where a choice depends on house style or is genuinely debatable, leave it and raise a query.
</task>

<constraints>
- Change only errors and clear norm violations. Do not rewrite for style, translate, simplify or make it sound more like English.
- Do not "correct" one regional variant into another.
- Leave proper names, quotations, titles, brand names and code untouched.
- If you are not confident about a rule in this language, raise a query rather than making the change.
- Show the non-breaking spaces you add as ordinary spaces in the corrected text, and mention them in the Changes table.
</constraints>

<output_format>
## Corrected text
The full corrected text.
## Changes
A table: # | Original | Corrected | Type (spelling, grammar, punctuation, typography) | Reason in English.
## Queries
Bullets: debatable or house-style choices and anything you were unsure of. "None" if none.
## Patterns
Up to three recurring error types, each with a one-line rule to remember, useful if the author is not a native speaker. "None" if errors were isolated.
</output_format>
