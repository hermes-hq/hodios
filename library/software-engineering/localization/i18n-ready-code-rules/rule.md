---
schema: 1
id: i18n-ready-code-rules
kind: rule
title: Internationalisation-ready code rules
description: Standing rules that keep any user-facing code an assistant writes translatable, with catalog strings, ICU plurals, no concatenation, locale-aware formatting, logical CSS and no text in images.
category: localization
version: 1.0.0
status: incubating
stage: [build, review]
role: [software-engineer, frontend-engineer, mobile-engineer, fullstack-engineer]
requires: [none]
output: [code]
risk: read-only
invocation: user
model_tier: small
level: intermediate
tags: [string-catalogs, icu-messageformat, locale-formatting, logical-properties, translatable-code]
pairs_with:
  prompts: [review-i18n-readiness, extract-ui-strings, write-icu-plural-messages, implement-locale-formatting]
  personas: [localization-engineer]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
When you write or change code that produces text, numbers, dates or layout a user will see, in any language or framework, follow these rules. Use the project's existing i18n library and catalog format; if the project has none yet, say so once and ask before adding one.

Strings
- Put every user-facing string in the message catalog, including button labels, errors, empty states, emails, notifications, accessibility labels, alt text and page titles. Never hard-code them in components, templates or server responses.
- Give keys a meaningful, stable name by feature and purpose (`checkout.payment.cardDeclined`), not the English text or a number. Do not reuse one key in two places just because the English matches today.
- Add a translator comment when the meaning, placeholder or length limit is not obvious, in the catalog's comment field.
- Never build a sentence by concatenating fragments or joining translated pieces in code. Use one complete message with named placeholders, so translators can reorder words.
- Use named placeholders (`{userName}`), never positional ones that cannot be reordered.
- Keep markup out of messages where possible; when a link or emphasis sits inside a sentence, use the library's rich-text or tag interpolation rather than splitting the string.

Plurals, gender and selection
- Use ICU MessageFormat `plural` (or the platform equivalent: Android plurals, Apple String Catalog variations, gettext `ngettext`) for any message that includes a count. Never write `count === 1 ? "item" : "items"` or append "s".
- Use `select` for gender or other choices that change grammar, with an `other` case.

Formatting
- Format dates, times, numbers, percentages, currencies, lists and relative times with locale-aware APIs (`Intl.*`, ICU, the platform formatters), passing the user's locale. Never hand-build them with string templates, `toFixed`, or fixed format strings like `MM/DD/YYYY`.
- Store timestamps in UTC and display them in the user's time zone. Store money as integer minor units or decimals with the currency code; respect each currency's decimal places.
- Do not assume the first day of the week, 12- or 24-hour clocks, name order, address layout or phone formats.

Text handling
- Use locale-aware comparison (`Intl.Collator` or equivalent) for sorting shown to users, and normalise Unicode text at input boundaries.
- Do not uppercase or lowercase translated text in code; let CSS or the translator decide. Never use locale-dependent case mapping for identifiers.
- Do not truncate by byte or code unit; truncate by grapheme cluster, or with CSS.

Layout
- Allow text to grow by at least 30 to 40 percent: no fixed widths or heights on text containers, wrapping instead of clipping.
- Use logical CSS properties and values (`margin-inline-start`, `padding-inline`, `inset-inline-end`, `text-align: start`) instead of left and right, and set `dir` and `lang` on the document. Mirror directional icons in right-to-left layouts; do not mirror logos, media controls or numbers.
- Isolate user-generated text with `dir="auto"` or `bdi` when it may be in another direction.
- Never put words in images, icons or SVGs; use live text over the graphic.

Reporting
- When you add strings, list the new keys and any that need translator context. When you touch formatting or layout, mention which locales to check (for example German for length, Arabic for direction, Japanese for line breaking).
