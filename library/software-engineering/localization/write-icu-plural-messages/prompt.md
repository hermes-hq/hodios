---
schema: 1
id: write-icu-plural-messages
kind: prompt
title: Write ICU plural and select messages
description: Converts messages with counts, gender or choices into correct ICU MessageFormat for each target locale's plural categories, with test values. Use when strings depend on a number or gender.
category: localization
version: 1.0.0
status: incubating
stage: [build]
role: [software-engineer, frontend-engineer, mobile-engineer]
requires: [none]
inputs: [text, file]
output: [code, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [icu-messageformat, pluralization, cldr]
pairs_with:
  prompts: [translate-string-catalog, review-translated-strings]
args:
  - name: messages
    description: The messages to convert, as code, concatenations or plain sentences, with their keys and what each variable holds.
    type: text
    required: true
  - name: locales
    description: Target locales, for example "en, de, ru, ar, ja".
    type: string
    required: true
  - name: translations
    description: "draft: write a translation for every locale, marked for native review. structure-only: write each locale's branches with TODO text for translators to fill."
    type: enum
    enum: [draft, structure-only]
    default: draft
output_contract:
  format: markdown
  sections: [Messages, Test values, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
English has two plural forms, so English-speaking developers write `count === 1 ? "item" : "items"` and ship it. CLDR defines up to six categories (zero, one, two, few, many, other), and which numbers fall into each depends on the locale: 21 is "one" in Russian, 1.5 is "one" in French but "other" in English, and Japanese has only "other". ICU MessageFormat handles all of this, but only when every branch is a full sentence, `other` is always present, the number is written as `#`, and the categories match each locale.
</context>

<task>
Convert these messages to ICU MessageFormat for the locales {{locales}}:

{{messages}}

1. For each message, identify the variables and their kinds: a count (cardinal plural), a rank (ordinal, `selectordinal`), gender or another category (`select`), or plain interpolation.
2. Write the source-language message first:
   - Use `#` for the formatted count inside plural branches.
   - Use `=0` (or any exact `=N`) only for wording that is genuinely special ("No messages"), never as a stand-in for a plural category.
   - Use `offset:1` for patterns like "You and # others".
   - Put `select` outside and `plural` inside when both apply, and make every branch a complete sentence. Never assemble fragments around a plural.
   - Every `plural`, `select` and `selectordinal` has an `other` branch.
   - Escape a literal apostrophe as `''` and literal braces with apostrophe quoting.
3. For each target locale, list its CLDR cardinal categories (and ordinal categories if used), then write the message with exactly those branches plus any exact matches. Translations: {{translations}}. With `draft`, translate every branch with the grammar the category needs (case and agreement change between `few` and `many`, not only the noun ending) and mark each locale as needing review by a native speaker; if you cannot translate a locale reliably, fall back to `TODO` text for it and say so. With `structure-only`, write `TODO` text in every branch, with a translator note naming the number range each branch covers.
4. Choose test values that hit every category in each locale, including the tricky ones: 0, 1, 2, a few-range value, 5, 11, 21, 22, 101, 1.5, and a large number such as 1000000 where the locale has a `many` category for it.
5. If a runtime is available, verify categories with `Intl.PluralRules` (or the ICU library) and say you did. Otherwise state that the categories come from CLDR rules.
</task>

<constraints>
- Never translate ICU keywords, argument names or category names.
- Do not reduce a locale's categories to make messages shorter; missing categories fall back to `other` and read wrongly.
- If a message cannot work as ICU without a copy change (for example, a count embedded in a fragment shared across messages), say so and propose the reworded source.
{{> output/uncertainty}}
</constraints>

<output_format>
## Messages
For each key: the source message, then one code block per locale, headed by the locale and its category list.

## Test values
| Key | Locale | Value | Category | Expected output |

## Notes
Copy changes needed, translations to review, and any category you could not confirm.
</output_format>

<examples>
<example>
Key `inbox.unread`, variable `count`, locales en and ru.

en (one, other):
```
{count, plural, =0 {You have no unread messages} one {You have # unread message} other {You have # unread messages}}
```

ru (one, few, many, other):
```
{count, plural, =0 {У вас нет непрочитанных сообщений} one {У вас # непрочитанное сообщение} few {У вас # непрочитанных сообщения} many {У вас # непрочитанных сообщений} other {У вас # непрочитанного сообщения}}
```

Test values for ru: 1 and 21 are one; 2 and 22 are few; 5, 11 and 100 are many; 1.5 is other.
</example>
</examples>
