---
schema: 1
id: fix-cookie-banner-accessibility
kind: prompt
title: Fix cookie consent banner accessibility
description: Fixes a cookie consent banner or preferences modal so it is reachable first, labelled, does not hide or trap the page, has equally operable choices and works with zoom and screen readers.
category: accessibility
version: 1.0.0
status: incubating
stage: [build, verify]
role: [frontend-engineer, fullstack-engineer]
stack: [html-css, javascript]
requires: [repo-read, file-write]
inputs: [file, repo, text]
output: [code, checklist]
risk: edits-files
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [cookie-consent, consent-banner, dialog, focus-management, third-party-widget]
pairs_with:
  personas: [accessibility-specialist]
  prompts: [build-aria-widget, fix-reflow-and-text-resize, fix-keyboard-navigation]
args:
  - name: banner
    description: The banner and preferences code, or the consent platform used (OneTrust, Cookiebot, Usercentrics, Didomi, custom) and its configuration options.
    type: text
    required: true
  - name: behaviour
    description: Whether the banner blocks the page until a choice is made or sits at the edge while the page stays usable.
    type: string
output_contract:
  format: markdown
  sections: [Problems found, Fixes, Vendor settings and limits, Manual check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The consent banner is the first thing every visitor meets, and on many sites it is the first barrier. Typical failures: the banner is injected at the end of the DOM, so keyboard and screen-reader users reach it only after tabbing through the whole page, or never notice it while it covers the content they are reading (WCAG 2.4.11, focus not obscured); a blocking overlay that does not move focus into itself or make the background inert, so focus wanders behind it; "Accept" as a bright button and "Reject" or "Settings" as low-contrast text links; toggles in the preferences modal built from `div`s with no name or state; the banner growing past the viewport at 200% zoom or on small screens with no way to scroll to the buttons; and a "Cookie settings" link that cannot be found again later. The fix depends on the design: a blocking banner should be a modal dialog (focus inside, background inert, a name, Escape only if closing it is a valid choice); a non-blocking banner should be a named region placed early in the DOM, never covering focused content. Most consent platforms expose configuration for some of this, and some issues need vendor support.
</context>

<task>
Fix the accessibility of this cookie consent UI.

<banner>
{{banner}}
</banner>
{{#behaviour}}
Behaviour: {{behaviour}}
{{/behaviour}}

1. Read the banner code or the platform's configuration and documentation. List problems against the failures in the context; mark inferences and anything you cannot verify inside a vendor script.
2. Decide the pattern: modal dialog if the banner blocks the page, named region early in the DOM if it does not. State the choice.
3. Fix structure and focus: for a modal, a dialog with a name, initial focus on the dialog heading or first control, inert background and focus returned to a sensible place after a choice; for a region, a landmark with a name, placed before main content, with page padding so it never hides focused content.
4. Fix the choices: accept, reject and settings as real buttons of equal prominence and contrast, with clear text; preference toggles as native checkboxes or switches with names, state and descriptions of each purpose.
5. Fix layout: the banner and modal reflow at 320 px and 400% zoom with all buttons reachable, and the text is readable at 200% text size.
6. Provide a persistent, findable way to reopen settings (footer link, named button).
7. Separate fixes you can make in code or configuration from issues that need the vendor, and draft a short, specific issue for the vendor where needed.
8. Give a manual check with keyboard only, a screen reader and 400% zoom.
</task>

<constraints>
- Do not give legal advice on consent law; keep to accessibility and note that the consent design itself should be checked by whoever owns privacy compliance.
- Do not patch a vendor's minified script; use configuration, CSS and documented APIs.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Problems found
Numbered, with WCAG criterion and who is blocked.

## Fixes
Diffs or configuration changes.

## Vendor settings and limits
Bullets, plus a draft vendor issue if needed.

## Manual check
Checklist.
</output_format>
