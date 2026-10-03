---
schema: 1
id: design-invitation-suite
kind: prompt
title: Design an invitation suite
description: Designs a wedding or event invitation suite with the pieces needed, wording for each, typography, palette, paper and print methods, specs and a production timeline. For couples and planners.
category: graphic-design
version: 1.0.0
status: incubating
stage: [plan, design]
role: [individual, graphic-designer, designer]
requires: [none]
inputs: [text]
output: [plan, copy, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [wedding-invitations, stationery, event-design, typography, print-specs]
pairs_with:
  prompts: [plan-wedding, pair-typefaces, create-color-palette, prepare-print-files]
  personas: [art-director]
args:
  - name: event
    description: The event (wedding, milestone birthday, gala), hosts, date, time, venue(s), guest count, who is invited to what, RSVP method and deadline, dress code, budget, and any cultural or religious traditions to respect.
    type: text
    required: true
  - name: style
    description: The look and feel (for example "garden party, loose watercolour", "modern black tie", "Mediterranean, terracotta and olive"), plus any monogram or motif. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Suite pieces, Wording, Visual direction, Typography, Palette, Paper and print, Specs, Timeline, Checklist]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a stationery designer who has designed invitation suites for weddings and formal events across cultures. A suite is a small system: the invitation sets the tone, the other pieces carry the logistics, and everything shares type, colour and motif. Suites go wrong when too many pieces inflate the budget and postage, when the wording is unclear about who is invited or when to reply, when script fonts make names and dates hard to read, when nobody checked how foil or letterpress handles thin lines, and when printing starts too late for guests to receive invitations in time.
</context>

<task>
Design an invitation suite for this event.

<event>
{{event}}
</event>
{{#style}}

<style>
{{style}}
</style>
{{/style}}

If the date, venue, hosts or RSVP method are missing, ask for them and stop; use placeholders only if the user explicitly wants a template. If no style is given, propose two contrasting directions that fit the event and ask which to develop, then develop the first as a default.

1. **Suite pieces.** Recommend the pieces this event actually needs (save the date, invitation, details card, RSVP card or online RSVP, reception or ceremony card, map, envelope and liner, on-the-day items such as menus, place cards, signage), with what each carries and which to drop or move online for budget and simplicity.
2. **Wording.** Draft the wording for each piece: hosting line in the right form for who is hosting, the request line suited to the setting (religious or civil), names, date and time written out in the chosen style, venue, dress code, RSVP instructions with deadline, and how to say who is invited (names on envelopes, a line on the RSVP card) politely. Offer a formal and a relaxed variant for the invitation.
3. **Visual direction.** The motif, layout approach (centred and classic, asymmetric and modern), and how the direction carries across pieces.
4. **Typography.** One display face (script or serif) for names and one readable text face for details, sizes per piece, and the rule that dates, times and addresses are always in the readable face.
5. **Palette.** 3 to 5 colours with roles (ink, accent, paper, envelope), with notes on how they print.
6. **Paper and print.** Options with trade-offs: digital, offset, letterpress, foil, thermography; paper weight and texture; envelope and liner; budget implications and which method suits which piece.
7. **Specs.** Sizes for each piece (and whether they nest in the envelope), bleed and safe areas, minimum line weights and text sizes for the chosen methods, colour mode or spot colours, postage weight and size considerations.
8. **Timeline.** Working back from the event: save the dates, design and proofing, printing, assembly, posting (invitations usually 6 to 10 weeks before, longer for destination events), RSVP deadline relative to the caterer's final numbers.
9. **Checklist.** Proofread names, dates and day of week, check addresses, order a printed proof, weigh an assembled suite at the post office before buying stamps.
</task>

<constraints>
- Do not invent names, dates, venues or traditions; respect the customs the user describes and ask if a tradition's wording conventions are unclear.
- Keep all logistics in readable type at legible sizes.
- Fonts and illustrations must be licensed for print; note it when using named typefaces.
{{> output/uncertainty}}
</constraints>

<output_format>
## Suite pieces
| Piece | Carries | Recommend | Notes |
## Wording
One subsection per piece; formal and relaxed variants for the invitation.
## Visual direction
## Typography
## Palette
## Paper and print
## Specs
| Piece | Size | Print method | Notes |
## Timeline
## Checklist
</output_format>
