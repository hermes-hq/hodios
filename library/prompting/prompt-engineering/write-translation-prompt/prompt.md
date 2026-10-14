---
schema: 1
id: write-translation-prompt
kind: prompt
title: Write a translation prompt
description: Writes a reusable AI translation prompt with audience, register, glossary, do-not-translate list, formatting and placeholder preservation, and a self-check for omissions and added meaning.
category: prompt-engineering
version: 1.0.0
status: incubating
stage: [design, build]
role: [individual, marketer, support-agent, operations-manager]
requires: [none]
inputs: [text]
output: [prompt, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [machine-translation, glossary, register, do-not-translate, reusable-prompt]
pairs_with:
  prompts: [post-edit-machine-translation, build-translation-glossary, back-translate-to-verify]
  personas: [prompt-engineer]
args:
  - name: content_type
    description: What you translate again and again and between which languages and regional variants, for example "help-centre articles, English to Brazilian Portuguese and European Spanish".
    type: text
    required: true
  - name: audience
    description: Who reads the translation and how formal it should be (for example formal "Sie" or informal "du" in German, "vous" or "tu" in French).
    type: text
    required: true
  - name: terms
    description: Optional - glossary terms with approved translations, product and brand names to keep, and an example of a past translation you liked.
    type: text
output_contract:
  format: markdown
  sections: [Translation decisions, Prompt, Self-check, When a human must review]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write prompts for recurring AI translation. "Translate this into German" gives fluent text with avoidable problems: the formality changes between paragraphs, product names and UI labels get translated, glossary terms vary from article to article, placeholders like {name} or %s are translated or moved so the software breaks, Markdown or HTML tags are damaged, dates, numbers and units keep source-language formats, a sentence is quietly dropped or a softener added, and idioms are translated word for word. Fluency hides these errors from anyone who cannot read the target language. A good translation prompt fixes the target variant and register, carries a glossary and a do-not-translate list, protects formatting and placeholders, says how to handle locale formats and idioms, and asks for a short self-check report of uncertain terms rather than silent guesses.

Content: {{content_type}}

Audience: {{audience}}
{{#terms}}

<terms>
{{terms}}
</terms>
{{/terms}}
</context>

<task>
1. Translation decisions: target language and regional variant, register and form of address, how to treat names, UI labels and brand terms, locale formats (dates, decimals, currency, units - convert or keep), idioms and cultural references (adapt or keep), and gendered language rules where the target language needs them. Ask up to three questions if a decision cannot be made from the inputs.
2. Write the prompt: the source text in delimited tags, the decisions above as rules, the glossary and do-not-translate list as tables the prompt points to, rules to preserve every placeholder, tag and line break exactly, to translate the whole text without adding, cutting or softening content, and to output the translation followed by a short notes block listing uncertain terms, adapted idioms and anything ambiguous in the source.
3. Self-check: a checklist the assistant runs before answering and the user can rerun with a second prompt - same number of paragraphs or segments, all placeholders present, glossary terms used, numbers unchanged, register consistent, nothing added. For high-stakes passages, add a back-translation into the source language by a separate request, compared against the source; it catches dropped or shifted meaning but not unnatural phrasing.
4. When a human must review: name the content where machine translation alone is not enough (legal, medical, safety, contracts, marketing slogans, anything published widely) and recommend review by a qualified translator or native-speaking reviewer.
</task>

<constraints>
- Do not invent glossary translations for the user's terms; where a term has no approved translation, the prompt keeps it in the notes for review.
- Keep the prompt usable in any assistant or API; no vendor-specific features.
- Do not claim the result is certified or legally valid; certified and sworn translations need a human translator under local rules.
- Keep the prompt under about 400 words excluding the glossary.
</constraints>

<output_format>
## Translation decisions
Short table: Decision | Choice | Why.
## Prompt
In a fenced code block with [SOURCE_TEXT], [GLOSSARY] and [DO_NOT_TRANSLATE] placeholders.
## Self-check
Numbered checklist.
## When a human must review
Short bullets.
</output_format>
