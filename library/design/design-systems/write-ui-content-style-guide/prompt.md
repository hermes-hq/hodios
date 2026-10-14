---
schema: 1
id: write-ui-content-style-guide
kind: prompt
title: Write a UI content style guide
description: "Writes the content section of a design system, covering capitalisation, button verbs, error and confirmation patterns, numbers, dates, terminology and accessibility for UI text."
category: design-systems
version: 1.0.0
status: incubating
stage: [design]
role: [writer, designer, product-manager]
requires: [none]
inputs: [text, image, document]
output: [docs, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [content-design, ui-text, terminology, error-messages, localisation]
pairs_with:
  prompts: [write-ux-microcopy, write-house-style-guide, write-ux-pattern-guideline, write-component-spec]
  personas: [ux-writer, design-systems-lead]
args:
  - name: product
    description: The product, its audience, and its voice in a few words. Paste the brand voice guide if one exists.
    type: text
    required: true
  - name: samples
    description: Real UI text from the product (buttons, errors, empty states, settings labels), including inconsistencies you have noticed.
    type: text
    required: true
  - name: locales
    description: Optional. Languages and markets the product ships in.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Principles, Mechanics, Component patterns, Messages, Numbers dates and units, Terminology list, Accessibility and localisation, Review checklist, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Brand voice guides describe how a company sounds; they rarely settle the mechanical questions that cause most UI inconsistency. Which case for buttons and headings (sentence case is easier to read and translate), whether labels end with periods, "Sign in" or "Log in", "Delete" or "Remove" (removing usually means it still exists elsewhere), "my" or "your" in navigation. Strong UI text patterns are specific: buttons say what will happen ("Delete project", not "OK"), destructive confirmations repeat the action in the button, and error messages say what happened, why if known, and what to do next, without blame and without an error code as the only content. Dates like 03/04/2026 are read differently by country, so formats should come from locale-aware formatting, not hard-coded strings, and relative times need an absolute time on hover or nearby. One term per concept matters more than any rule: a product that says "workspace", "team" and "organisation" for the same thing confuses users and translators. Placeholder text is not a label, "click here" is not a link, and English text grows by a third or more in many languages, so layouts must allow it.
</context>

<task>
Write the UI content style guide for this product.

<product>
{{product}}
</product>

<samples>
{{samples}}
</samples>
{{#locales}}Locales: {{locales}}.
{{/locales}}

1. **Principles.** Three to five principles for UI text derived from the voice, each with a short before and after from the samples.
2. **Mechanics.** Capitalisation, punctuation in labels, headings and tooltips, contractions, pronouns, abbreviations, symbols such as ampersands, and emoji, each with a rule and an example.
3. **Component patterns.** Rules and examples for buttons and links, form labels and helper text, placeholders, tooltips, empty states, toasts, dialogs and confirmation dialogs, and navigation labels.
4. **Messages.** Patterns for errors (validation, system, permission, offline), warnings, success and destructive confirmations, with templates and rewrites of real samples.
5. **Numbers dates and units.** Numerals, thousands and decimals, currency, percentages, ranges, dates, times, time zones and relative time, all through locale-aware formatting.
6. **Terminology list.** A table of preferred terms, terms to avoid and definitions, built from inconsistencies in the samples. Flag conflicts the team must decide.
7. **Accessibility and localisation.** Link and button text that makes sense out of context, alt text, no meaning by colour or position words alone, avoiding idioms, string expansion, no concatenated sentences in code, and plural handling.
8. **Review checklist.** Ten to fifteen checks a designer or engineer can run before shipping a screen.
</task>

<constraints>
- Base rules on the samples and voice given; where you choose between valid conventions, say which and why.
- Do not invent product features, legal wording or terms not supported by the samples; mark gaps as open questions.
- Keep examples in the product's domain, not generic.
{{> output/uncertainty}}
</constraints>

<output_format>
Markdown with the sections from the contract, in order. Rules as short bullets with examples, terminology as a table, checklist as checkboxes. End with Open questions.
</output_format>
