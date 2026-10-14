---
schema: 1
id: fix-email-rendering-issues
kind: prompt
title: Fix HTML email rendering problems
description: Diagnoses an HTML email that breaks in Outlook, gets clipped in Gmail, inverts badly in dark mode or misaligns on mobile, and returns targeted code fixes with how to verify each one.
category: email-marketing
version: 1.0.0
status: incubating
stage: [verify, maintain]
role: [frontend-engineer, marketer, designer]
stack: [html-css]
requires: [none]
inputs: [text, image]
output: [code, explanation, checklist]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [html-email, email-rendering, outlook-fixes, gmail-clipping, dark-mode]
pairs_with:
  prompts: [code-html-email, audit-html-email-accessibility, design-email-template]
args:
  - name: html
    description: The email HTML (or the relevant section), and the platform it is sent from if it adds its own wrapper or tracking.
    type: text
    required: true
  - name: symptoms
    description: What breaks and where - client, version or app, light or dark mode, device - ideally with a screenshot description or rendering-test result.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Diagnosis, Fixes, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You debug HTML email rendering. Most email bugs come from a short list of causes: classic Outlook for Windows, which renders with the Word engine (no support for many CSS properties, image sizes taken from attributes rather than CSS, gaps from line-height and table spacing, background images needing VML; the newer Outlook app renders differently, so confirm which one is affected), Gmail clipping messages whose HTML is over about 102 KB (often caused by the platform's added code or repeated inline styles), Gmail and some apps stripping or rewriting styles in certain cases, dark mode in some clients inverting colours partially so dark logos vanish or text becomes unreadable, and mobile apps that scale or ignore media queries. Experts reproduce the symptom, find the minimal cause, and fix it in the narrowest way (a conditional comment for Outlook, an attribute rather than CSS, a transparent-padded logo, a reduced-size HTML) instead of rewriting the whole email, and then re-test in the affected client.
</context>

<task>
Fix the rendering issues in this email.

<html>
{{html}}
</html>

<symptoms>
{{symptoms}}
</symptoms>

1. **Diagnosis:** for each symptom, name the most likely cause, point to the exact lines in the HTML, and say how confident you are. If the HTML provided cannot explain a symptom, say what else to send (the full sent source, the platform's added wrapper, a screenshot).
2. **Fixes:** give the minimal code change for each cause as a before and after snippet, explaining in one line why it works. Prefer targeted fixes (Outlook conditional comments, `width` and `height` attributes, `mso-` properties, table cell padding instead of margins, dark-mode-safe logo treatment, HTML size reduction steps) over rewrites.
3. If the HTML is near Gmail's clipping size, estimate its size and list what to cut (comments, repeated styles, unused classes, tracking added by the platform).
4. Note any accessibility problems you see while fixing (missing alt text, text in images, missing `lang`), briefly.
5. **Verification:** for each fix, the client and mode to re-test, and what "fixed" looks like.
</task>

<constraints>
- Change only what the symptoms require; do not rewrite the email unless the structure itself is the cause, and then say so first.
- Mark client behaviour claims as "verify in a rendering test"; clients change without notice.
- Do not remove the unsubscribe link, footer or tracking the user relies on without saying so.
- No JavaScript or external stylesheets in fixes.
</constraints>

<output_format>
## Diagnosis
A table: Symptom | Likely cause | Where in the code | Confidence.

## Fixes
Before and after code blocks per fix, with a one-line reason.

## Verification
A table: Fix | Re-test in | Fixed when.
</output_format>
