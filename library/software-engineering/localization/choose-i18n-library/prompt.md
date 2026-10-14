---
schema: 1
id: choose-i18n-library
kind: prompt
title: Choose an i18n library for a project
description: Compares i18n libraries for a given stack on message format, plurals, type safety, bundle size, server rendering and tooling, then recommends one with a small proof-of-concept plan.
category: localization
version: 1.0.0
status: incubating
stage: [design, plan]
role: [frontend-engineer, fullstack-engineer, tech-lead, architect]
requires: [none]
inputs: [text, spec]
output: [table, plan, adr]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [library-selection, icu-messageformat, tradeoffs]
pairs_with:
  prompts: [extract-ui-strings, automate-translation-file-sync]
args:
  - name: project
    description: Stack and rendering model (for example Next.js App Router, Vue SPA, Flutter, Django templates), team size, current i18n if any, and constraints such as bundle size.
    type: text
    required: true
  - name: locales
    description: Locales now and expected later, including any right-to-left or complex-plural ones.
    type: string
    required: true
  - name: translation_workflow
    description: Who translates and with which tool or vendor, if known; it decides which file formats matter.
    type: text
output_contract:
  format: markdown
  sections: [Requirements, Candidates, Comparison, Recommendation, Proof of concept]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Teams pick an i18n library by popularity and discover the limits later. The criteria that matter: whether messages use full ICU MessageFormat (plurals, select, ordinals) or a custom syntax with its own plural suffixes; whether keys and arguments can be type-checked; whether it works with server rendering and streaming, and loads only the messages a route needs; runtime size versus compile-time message compilation; how formatting of dates, numbers and lists is done (usually via `Intl`); extraction tooling; and which file formats it reads, because the translation tool or vendor must round-trip them. Migration cost later is high, since every call site and catalog changes.
</context>

<task>
Recommend an i18n library for:

{{project}}

Locales: {{locales}}.
{{#translation_workflow}}Translation workflow: {{translation_workflow}}{{/translation_workflow}}

1. Turn the input into requirements and rank them: must-have, should-have, nice-to-have. Include rendering model, plural complexity of the locales, type safety, bundle size, catalog format, extraction, editor support and team familiarity.
2. Shortlist two to four libraries that are realistic for this stack, including the platform's built-in option when one exists (for example Flutter's `intl` with ARB, Django's gettext, Apple String Catalogs).
3. Compare them against the requirements. For each, note the message syntax, plural handling, type safety, server rendering and route-level loading, catalog formats, extraction tooling and maintenance signals the team should check (release activity, open issues), without quoting figures you cannot verify.
4. Recommend one, with the main trade-off accepted and the condition that would change the choice.
5. Write a proof-of-concept plan for one real screen: a plural, a select, a rich-text message with a link, a date and a currency, a locale switch, server rendering if relevant, a missing-key fallback, and a round trip through the translation format. List what result would reject the choice.
6. If replacing an existing library, estimate the migration in terms of call sites and catalog conversion steps, not days.
</task>

<constraints>
- Do not cite download counts, bundle sizes or version numbers unless the user supplied them; tell the team what to measure instead.
- Prefer the platform's standard option unless a requirement rules it out.
- Keep the shortlist to libraries that support the stated stack.
{{> output/uncertainty}}
</constraints>

<output_format>
## Requirements
Ranked list.

## Candidates
One short paragraph per library.

## Comparison
| Requirement | Library A | Library B | ... |

## Recommendation
The choice, the trade-off and what would change it.

## Proof of concept
A checklist with rejection criteria.
</output_format>
