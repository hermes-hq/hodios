---
schema: 1
id: audit-html-email-accessibility
kind: prompt
title: Audit HTML email accessibility
description: Audits HTML email code for screen-reader and low-vision problems specific to email clients, then returns fixed markup that still renders across Outlook, Gmail and Apple Mail.
category: accessibility
version: 1.0.0
status: incubating
stage: [review, build]
role: [frontend-engineer, software-engineer]
stack: [html-css]
requires: [none]
inputs: [file, text]
output: [report, code]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [html-email, layout-tables, dark-mode, images-off, screen-reader]
pairs_with:
  personas: [accessibility-specialist]
  prompts: [audit-web-accessibility, review-color-contrast, write-alt-text]
args:
  - name: email_html
    description: The full email HTML, including the head and inline styles. Templating tags (Handlebars, Liquid, MJML output) are fine.
    type: text
    required: true
  - name: email_kind
    description: The kind of email, which changes what matters most.
    type: enum
    enum: [transactional, newsletter, marketing]
    default: transactional
output_contract:
  format: markdown
  sections: [Summary, Findings, Fixed HTML, Test plan]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Email is the web from fifteen years ago with stricter rules. Layout still needs tables in many clients, CSS support varies by client, and some clients strip or rewrite `head` styles, `lang` and ARIA. Screen-reader users get the worst of it: every layout table read as a data table ("table with 3 columns, 12 rows"), images-off emails that read file names, "Click here" links, and a preheader that repeats as noise. Low-vision users hit 11 px text, light-grey footers, and dark-mode inversion that leaves dark logos on dark backgrounds. A good fix keeps rendering in Outlook for Windows, Gmail and Apple Mail, so it uses techniques email developers trust rather than web-only CSS.
</context>

<task>
Audit this {{email_kind}} email:

<email_html>
{{email_html}}
</email_html>

Check, in this order:
1. Document: `<html lang>` and `dir`, a meaningful `<title>`, `meta charset`, and a wrapping element with `lang` and `dir` as well, because some clients drop the `html` attributes.
2. Layout tables: every table used for layout has `role="presentation"` (and no `summary`, `caption` or `th`). Real data tables, such as order line items, keep `th` with `scope`.
3. Reading order: the source order matches the visual order when columns stack on mobile and when read linearly.
4. Headings: real `h1` to `h3` for the main message and sections, styled inline, not bold `td` text.
5. Images: meaningful alt on every content image; `alt=""` on spacers and decorative images; no important text only in images (the order total, the reset link, the date); bulletproof (HTML and CSS) buttons instead of image buttons; styled alt text so the images-off view is still readable.
6. Links and buttons: link text that makes sense out of context ("Reset your password", not "Click here"); underlines or another non-colour cue in body text; tap targets at least 44 by 44 px for main actions.
7. Text: body at least 14 px (16 px preferred), line-height around 1.5, left-aligned body text, no all-caps paragraphs, contrast 4.5:1 including footer and legal text.
8. Dark mode: logos and icons on transparent backgrounds that disappear when inverted, colours forced by client inversion, `color-scheme` meta and `prefers-color-scheme` styles where supported.
9. Hidden content: the preheader is hidden from sight and from screen readers once read where possible, and invisible spacer characters are not read aloud as noise.
10. {{email_kind}}-specific: for transactional mail, the action and key figures come first in text; for newsletters and marketing, a clear heading structure and an accessible unsubscribe link.
</task>

<constraints>
- Every fix must work in table-based email; do not suggest flexbox, grid or external CSS as the only fix. Note the clients where a fix degrades.
- Do not rewrite copy beyond link text and alt text; flag copy problems in one line.
- If the HTML is truncated or the templating hides structure, say what you could not check.
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Summary
Two or three sentences: the most serious barriers and who they affect.

## Findings
Table: # | Issue | Who is affected | Location | Fix. Highest impact first, at most 15.

## Fixed HTML
The corrected email, complete, with brief comments at changed places.

## Test plan
Numbered: images-off view, a screen reader on at least one webmail and one desktop client, dark mode in Apple Mail and Outlook, 200% zoom on mobile, and a rendering test service run.
</output_format>
