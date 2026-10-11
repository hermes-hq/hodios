---
schema: 1
id: audit-desktop-app-accessibility
kind: prompt
title: Audit desktop app accessibility
description: Audits a desktop app (Electron, Tauri, WPF, WinUI, Qt, AppKit or GTK) for keyboard access, focus, accessible names and roles exposed to the platform accessibility API, scaling and contrast themes.
category: accessibility
version: 1.0.0
status: incubating
stage: [review, verify]
role: [software-engineer, frontend-engineer, qa-engineer]
stack: [electron, tauri, dotnet, cpp, swift]
requires: [none]
inputs: [file, text]
output: [report, code, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [desktop-app, ui-automation, accessibility-api, keyboard-shortcuts, screen-reader, wcag]
pairs_with:
  personas: [accessibility-specialist]
  prompts: [audit-web-accessibility, fix-keyboard-navigation, support-forced-colors-mode]
args:
  - name: app_code
    description: UI code for the screens to audit (window layout, custom controls, menus, dialogs, shortcuts) or a textual description of the screens and how they behave.
    type: text
    required: true
  - name: toolkit
    description: The UI toolkit and target operating systems, for example "WPF on Windows", "Qt 6 on Windows and Linux", "Electron on macOS and Windows".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Scope and assumptions, Findings, Fixes, Tools and test steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Desktop apps are judged by WCAG through the WCAG2ICT guidance and by procurement standards such as EN 301 549 and Section 508, but the mechanics differ from the web. Assistive technology reads the platform accessibility API: UI Automation (and legacy MSAA) on Windows, NSAccessibility on macOS, AT-SPI on Linux. Standard toolkit controls expose name, role, state and value for free; custom-drawn controls (owner-drawn lists, canvas editors, custom title bars, toolbars built from images) expose nothing unless the developer implements the provider interfaces (for example `AutomationPeer` in WPF, `QAccessibleInterface` in Qt, the NSAccessibility protocol in AppKit). Desktop-specific expectations include full keyboard access with menu bar access keys and documented shortcuts, no shortcuts that collide with screen-reader or system keys, predictable focus when windows and dialogs open and close, respect for system text scaling, display scaling and contrast themes, and notifications that assistive technology can read. Web-based shells (Electron, Tauri) inherit web accessibility inside the web view but add native menus, tray icons, custom title bars and window management.
</context>

<task>
Toolkit and platforms: {{toolkit}}

<app_code>
{{app_code}}
</app_code>

1. State the scope: screens covered, platforms, and which parts are native controls, custom-drawn controls or web content.
2. Check keyboard access: every function reachable, logical tab order, visible focus, access keys and accelerators, shortcut collisions with common screen-reader and system keys, keyboard traps in panes and embedded web views, and focus placement on window and dialog open and close.
3. Check what the accessibility API exposes for each control: name, role, state, value, and relationships (labelled-by, described-by). Flag custom-drawn controls and icon-only buttons with nothing exposed.
4. Check display adaptation: system text scaling and display scaling (no clipped text or fixed-size windows), contrast themes and forced colours, colour-only status, and animation that ignores the system reduce-motion setting.
5. Check announcements: progress, toasts, validation errors and background events, and whether they reach assistive technology through the toolkit's notification mechanism.
6. For each finding, write the toolkit-specific fix (property, provider interface or API to implement) with a code sketch, and map it to the closest WCAG success criterion as interpreted for software.
7. Give the tools and steps to verify: the platform's accessibility inspector (for example Accessibility Insights for Windows or Inspect, Accessibility Inspector on macOS, Accerciser on Linux), plus a screen reader per platform.
</task>

<constraints>
- Name only toolkit APIs you are confident exist; mark anything uncertain to verify against the toolkit's documentation.
- Do not claim conformance or non-conformance to any legal standard; report findings and leave the formal conformance statement to a qualified auditor.
- Mark findings that need runtime inspection rather than code reading as "verify with inspector".
{{> output/uncertainty}}
</constraints>

<output_format>
## Scope and assumptions
Bullets.

## Findings
Table: # | Screen or control | Problem | Users affected | WCAG reference | Severity.

## Fixes
Numbered, matching findings, with toolkit-specific code.

## Tools and test steps
Per platform: inspector, screen reader, and the checks to run.
</output_format>
