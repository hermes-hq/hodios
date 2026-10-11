---
schema: 1
id: build-accessible-navigation-menu
kind: prompt
title: Build an accessible site navigation or mega menu
description: Builds or fixes site navigation, dropdown and mega menus with disclosure buttons, a mobile menu, current page marking and Escape support, without misusing the ARIA menu role.
category: accessibility
version: 1.0.0
status: incubating
stage: [build]
role: [frontend-engineer, fullstack-engineer]
stack: [html-css, javascript]
requires: [repo-read, file-write]
inputs: [file, repo, text]
output: [code, tests]
risk: edits-files
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [navigation, mega-menu, disclosure, mobile-menu, keyboard]
pairs_with:
  personas: [accessibility-specialist]
  prompts: [build-aria-widget, fix-page-structure-and-landmarks, fix-keyboard-navigation, audit-motor-accessibility]
args:
  - name: navigation
    description: The header and navigation code or file paths, how submenus open (hover, click), what the mobile menu does, and any menu library in use.
    type: text
    required: true
  - name: framework
    description: The UI framework or plain HTML.
    type: string
    default: html
output_contract:
  format: markdown
  sections: [Problems found, Pattern, Changes, Keyboard and pointer behaviour, Tests and manual check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Site navigation is a list of links, so the ARIA `menu` and `menubar` roles are almost always wrong for it: they promise application-menu behaviour (arrow keys only, Tab leaves the menu, items are commands), switch screen readers into a mode that hides normal link navigation, and are rarely implemented completely. The robust pattern is the disclosure navigation: a `nav` with a name, a list of links, and for each submenu a real `button` with `aria-expanded` that shows and hides a nested list. Common failures: submenus that open only on hover, so keyboard and touch users cannot reach them; a top-level item that is both a link and a submenu trigger; hover menus that close when the pointer crosses a small gap; dropdowns that cannot be dismissed with Escape (WCAG 1.4.13 applies to content shown on hover or focus); mobile "hamburger" buttons with no name, no expanded state and a menu that sits behind the page in tab order; and no indication of the current page (`aria-current="page"`). If the top item must stay a link, put a separate disclosure button next to it, named "More about Products".
</context>

<task>
Make this navigation accessible using the disclosure pattern.

<navigation>
{{navigation}}
</navigation>
Framework: {{framework}}

1. Read the header, navigation and menu code, including any library. List problems against the context; mark inferences.
2. State the pattern: disclosure navigation with links. If the codebase uses `role="menu"` for site links, explain why you are removing it.
3. Implement: a `nav` with an accessible name (and distinct names if there are several), a list of links, a `button` with `aria-expanded` and `aria-controls` for each submenu, the current page link with `aria-current="page"`, and a visible focus style.
4. Behaviour: click, tap, Enter and Space toggle submenus; Escape closes the open submenu and returns focus to its button; opening one submenu closes the others; moving focus out of the navigation closes it; hover can still open submenus for mouse users, with a small delay and a pointer path that does not close the panel when crossing gaps. Optional arrow-key support between top-level buttons is fine, but Tab must keep working.
5. Mega menus: give each panel headings for its groups, keep the DOM order equal to the visual order, and make the panel reachable at 400% zoom without hiding content off screen.
6. Mobile menu: a named toggle button with `aria-expanded`; when open as an overlay, treat it as a modal (focus inside, background inert, Escape closes, focus returns to the toggle); when it pushes content down, it can stay a simple disclosure.
7. Write tests for names, expanded states, Escape and focus return; run them. Give a manual keyboard, touch and screen-reader check.
</task>

<constraints>
- Do not use `role="menu"`, `menubar` or `menuitem` for site navigation links.
- Do not make submenus reachable only on hover.
- Do not change the information architecture or link labels unless a label is unclear out of context; flag it instead.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Problems found
Numbered, with who is blocked and the WCAG criterion.

## Pattern
Short paragraph.

## Changes
Diffs with file paths.

## Keyboard and pointer behaviour
Table: input | result.

## Tests and manual check
Test code, command result, manual steps.
</output_format>
