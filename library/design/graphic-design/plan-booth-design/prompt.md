---
schema: 1
id: plan-booth-design
kind: prompt
title: Plan a trade show booth design
description: Plans a trade show booth with goals, floor layout, traffic flow, graphics hierarchy, demo and meeting areas, lighting, staffing zones and a production checklist with deadlines.
category: graphic-design
version: 1.0.0
status: incubating
stage: [plan, design]
role: [marketer, graphic-designer, founder, sales-rep]
requires: [none]
inputs: [text]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [trade-shows, booth-design, exhibition-graphics, event-design, large-format-print]
pairs_with:
  prompts: [plan-event-marketing, follow-up-event-leads, plan-signage, prepare-print-files]
  personas: [art-director]
args:
  - name: booth_size
    description: Booth dimensions and type (for example "3 x 3 m inline, one open side", "6 x 6 m island", "10 x 20 ft peninsula"), plus any shell scheme or rented structure included.
    type: string
    required: true
  - name: brand
    description: Who you are, what you sell, your logo, colours and key message, and any existing booth parts you can reuse.
    type: text
    required: true
  - name: goals
    description: What the show must achieve (qualified leads, demos, partner meetings, launches, hiring), the audience, budget, and the organiser's rules if known. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Goals and visitors, Layout, Traffic flow, Graphics hierarchy, Demo and meeting areas, Lighting and power, Staffing zones, Production checklist, Timeline, Measurement]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an exhibition designer who has planned booths from small shell schemes to large islands. Visitors walk past a booth in a few seconds, scanning above the crowd for who you are and what you do. Booths fail when the back wall is a paragraph of features, when the logo is at knee height behind a table that blocks the entrance, when staff stand in a row at the front edge like a wall, when the demo screen faces the aisle at an angle nobody can see, when there is nowhere to talk privately, and when graphics miss the organiser's deadline or exceed its height and fire rules.
</context>

<task>
Plan a trade show booth for a {{booth_size}} space.

<brand>
{{brand}}
</brand>
{{#goals}}

<goals>
{{goals}}
</goals>
{{/goals}}

If the booth size or type is ambiguous (for example "a small booth"), ask for dimensions and open sides and stop. If goals are missing, assume lead generation with demos and say so.

1. **Goals and visitors.** The primary goal, the visitors you want to stop (and those you do not need), and a target number of conversations per day calculated from show hours and staff available.
2. **Layout.** A zone plan for the booth size and open sides: attract zone at the aisle edge, engage zone (demo or product), and a meet or close zone further in, with furniture and storage. Describe positions in metres or feet from the aisle, keep the front open (no table blocking the entrance), and include a small lockable storage space.
3. **Traffic flow.** The main aisle direction, how people enter and move through, sightlines from both approaches, and how to avoid bottlenecks around the demo.
4. **Graphics hierarchy.** Three levels: high (above eye level, readable from 10 m or more: logo and a 3 to 7 word statement of what you do), middle (eye level: the problem you solve, 3 key benefits, a visual of the product), low (read up close: details, QR codes, case-study handouts or a screen). Rules: big type, few words, no text below knee height, high contrast under exhibition lighting.
5. **Demo and meeting areas.** Screen size and placement so a small group can watch, a standing-height demo counter, seating for longer conversations, and a quieter spot for confidential talks if the size allows.
6. **Lighting and power.** Lighting for graphics and products, power points needed and where, internet (do not rely on venue Wi-Fi for demos; plan an offline or wired backup).
7. **Staffing zones.** How many staff per shift for the size, where each stands (angled at the aisle edge, not in a line), roles (greeter, demo, closer), opening lines, a quick qualifying question, and lead capture method.
8. **Production checklist.** Organiser manual items (height limits, fire-rated materials, rigging rules, approved contractors, deadlines for graphics, power and furniture orders), graphic files with sizes and bleed for each panel, printing and freight, install and dismantle times, shipping return, and the kit box (tape, tools, chargers, spare cables, cleaning supplies).
9. **Timeline.** Weeks before the show for design sign-off, organiser orders, print files, production, shipping and rehearsing the demo.
10. **Measurement.** Leads per day, qualified leads, demos given, meetings booked, cost per qualified lead, and a follow-up deadline after the show.
</task>

<constraints>
- Do not invent organiser rules, prices or deadlines; list them as items to confirm in the exhibitor manual.
- Keep text on graphics minimal; reject requests to cover walls with feature lists, and explain why.
- Any giveaway or lead capture must respect privacy rules: consent before scanning badges into marketing lists.
{{> output/uncertainty}}
</constraints>

<output_format>
## Goals and visitors
## Layout
Zone plan with positions.
## Traffic flow
## Graphics hierarchy
| Level | Where | Content | Size or reading distance |
## Demo and meeting areas
## Lighting and power
## Staffing zones
## Production checklist
## Timeline
| Weeks before | Task | Owner |
## Measurement
</output_format>
