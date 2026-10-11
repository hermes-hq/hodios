---
schema: 1
id: html-rules
kind: rule
title: HTML rules
description: Standing rules for the HTML an assistant writes, covering document basics, semantic elements, headings, forms and button types, images, links, tables and valid nesting.
category: conventions
version: 1.0.0
status: incubating
stage: [build]
role: [frontend-engineer, fullstack-engineer]
stack: [html-css]
requires: [none]
output: [code]
risk: read-only
invocation: user
model_tier: mid
level: beginner
tags: [semantic-html, form-markup, headings, responsive-images, markup-validity]
applies_to: ["**/*.html", "**/*.htm", "**/*.jsx", "**/*.tsx", "**/*.vue", "**/*.svelte", "**/*.astro", "**/*.erb", "**/*.njk", "**/*.twig", "**/*.blade.php"]
pairs_with:
  rules: [frontend-accessibility-rules, css-rules]
  personas: [frontend-engineer]
  prompts: [build-page-from-mockup]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
When you write or change HTML, or markup in templates and components, in this project:

**Know the project first**
- Follow the existing templates, component library and class naming. Reuse an existing component before writing new markup for the same thing.

**Document basics**
- Full pages start with `<!doctype html>`, `<html>` with a `lang` attribute set to the page's real language, `<meta charset="utf-8">` as the first element in `head`, and `<meta name="viewport" content="width=device-width, initial-scale=1">`. Never add `user-scalable=no` or `maximum-scale=1`; they block zoom.
- Give every page a unique, descriptive `<title>` and, for public pages, a `meta name="description"`. Set `rel="canonical"` where the project does.

**Semantic structure**
- Use elements for their meaning: `header`, `nav`, `main` (one per page), `footer`, `article`, `section` with a heading, `aside`, `ul` and `ol` for lists, `figure` with `figcaption`, `time datetime` for dates. Use `div` and `span` only when no element fits.
- One `h1` per page, then headings in outline order without skipping levels. Choose the heading level by structure and style it with CSS, never pick a level for its size.
- Use `table` only for tabular data, with `caption`, `thead`, and `th` with `scope`. Never use tables for layout.

**Links and buttons**
- A link (`a href`) goes somewhere; a button does something. Never use `a href="#"` or `javascript:` URLs as buttons, and never a clickable `div`.
- Give every `button` an explicit `type`. A button inside a form defaults to `type="submit"` and will submit the form.
- Link text says where it goes; avoid "click here". Links that open a new tab say so. Current browsers imply `rel="noopener"` on `target="_blank"`; add it explicitly where older browsers are supported, and add `noreferrer` when the destination must not see the referring URL.

**Forms**
- Every control has a visible `label` tied by `for` and `id`, or wrapping. Placeholders are hints, not labels.
- Use the right `type` (`email`, `tel`, `url`, `number` only for real quantities, `date`), plus `name`, `autocomplete` tokens for personal data fields, and `inputmode` where it helps mobile keyboards.
- Group related controls such as radio buttons with `fieldset` and `legend`. Mark required fields with `required` and in the visible label.
- Native validation attributes help users but are not security; the server validates again.

**Images and media**
- Every `img` has `alt`: a description of its purpose, or `alt=""` for decoration. Every `img` has `width` and `height` (or a CSS aspect ratio) so the layout does not jump.
- Use `srcset` and `sizes`, or `picture`, for large images; `loading="lazy"` for images below the fold, never for the main above-the-fold image.
- Video and audio have controls, no autoplay with sound, and captions or a transcript where speech matters.

**Validity and hygiene**
- Keep `id` values unique per page. Do not nest interactive elements (a button in a link, a link in a button), and do not put block elements inside `p`.
- No inline `style` or inline event handler attributes (`onclick`) unless the project already uses them; they also break a strict Content Security Policy.
- Insert untrusted content as text, never as raw HTML, unless it passes an allow-list sanitiser.
- Prefer native elements (`details` and `summary`, `dialog`) over custom widgets; add ARIA only where no native element provides the semantics.

**Before finishing**
- Run the project's HTML or template linter if there is one, and check the page in the browser at a narrow width and with keyboard only.
