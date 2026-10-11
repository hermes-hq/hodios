---
schema: 1
id: design-name-badges
kind: prompt
title: Design event name badges
description: Designs conference or event name badges with a name-first hierarchy, double-sided layout, role coding, merge rules for long and non-Latin names, privacy choices and print and pickup logistics.
category: graphic-design
version: 1.0.0
status: incubating
stage: [plan, design]
role: [graphic-designer, operations-manager, project-manager, marketer]
requires: [none]
inputs: [text, spec]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [name-badges, conference-design, variable-data, inclusive-design, event-design]
pairs_with:
  prompts: [plan-signage, plan-event-budget, prepare-print-files]
  personas: [art-director]
args:
  - name: event
    description: The event - type, size, audience, languages, how many days, ticket types or roles (attendee, speaker, staff, sponsor, press), and any brand assets.
    type: text
    required: true
  - name: data
    description: The registration fields you have for each person, for example "first name, last name, company, job title, pronouns (optional), ticket type". Optional.
    type: text
output_contract:
  format: markdown
  sections: [Information hierarchy, Format, Layout, Roles and access, Variable data rules, Inclusion and accessibility, Privacy, Print and pickup]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A badge has one job: let a stranger read your name from about two metres without staring at your chest. Most badges fail it: the event logo is the biggest thing, the name is set small in a thin typeface, the badge is single-sided so it flips on the lanyard and shows a blank back, and the long or non-Latin names break the template. Badges also carry access roles that security and volunteers must read at a glance, and they carry personal data: a scannable code can expose an email address to every sponsor who scans it. Good badge design starts from the registration data and the people at the door.
</context>

<task>
Design name badges for: {{event}}
{{#data}}

<data>
{{data}}
</data>
{{/data}}

If you do not know which fields are collected at registration, propose the minimum set and say so.

1. **Information hierarchy.** First name (or preferred name) largest, then last name, then organisation, then optional fields such as pronouns or "ask me about"; event branding small. Give relative sizes and a minimum first-name cap height readable at about 2 m.
2. **Format.** Badge size and holder (for example A6, 4 x 3 in, or a card in a sleeve), lanyard or clip, hole or slot position clear of text, and double-sided printing so a flipped badge still shows the name.
3. **Layout.** Element positions front and back, and what the back carries if not a mirror (schedule summary, wifi, code of conduct contact).
4. **Roles and access.** How roles are shown (a coloured band with the role printed in words, never colour alone), which roles exist, and how security and volunteers read them.
5. **Variable data rules.** Merge fields; rules for long names (shrink to a minimum size, then wrap to two lines), name order, diacritics and non-Latin scripts with a typeface that covers them; empty fields collapsing cleanly; a sample sheet of extreme test names to proof.
6. **Inclusion and accessibility.** Preferred names, optional pronouns that are never prefilled, high contrast, matte finish to reduce glare, a no-photo or quiet-preference option if the event offers one, and large-print or alternative format on request.
7. **Privacy.** What any QR or barcode contains (an opaque ID rather than contact details), who may scan it, how attendees are told, and consent for sharing details with sponsors following the event's privacy notice.
8. **Print and pickup.** Printing in advance versus on-site, alphabetical sorting for pickup by the name printed, spares and blank badges for walk-ins and corrections, and a proofing checklist.
</task>

<constraints>
- Never put email addresses, phone numbers or other contact details in plain text or unencrypted codes on a badge without the attendee's explicit choice.
- Do not invent attendee data, roles or sponsors; use the fields given.
- Data-protection rules differ by country; flag consent and privacy-notice points for the organiser to confirm.
{{> output/uncertainty}}
</constraints>

<output_format>
Markdown with the contract's sections in order. Layout as a table (Element, Side, Position, Size, Rule). Variable data rules include a list of test names. Print and pickup as a checklist.
</output_format>
