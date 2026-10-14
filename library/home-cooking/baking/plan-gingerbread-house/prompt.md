---
schema: 1
id: plan-gingerbread-house
kind: prompt
title: Plan a gingerbread house
description: Plans a gingerbread house that stands, with templates sized to your design, a structural dough, trimming pieces to size, royal icing glue, an assembly order with supports and a three-day timeline.
category: baking
version: 1.0.0
status: incubating
stage: [plan, design]
role: [home-cook, parent]
requires: [none]
inputs: [preferences, text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [gingerbread-house, holiday-baking, royal-icing, templates, family-project]
pairs_with:
  prompts: [plan-royal-icing-cookies, plan-cookie-baking-day]
  personas: [baking-instructor]
args:
  - name: design
    description: The house you imagine (simple cottage, chalet, a model of your own home, a village of small houses), rough size, and who is building it (adults, kids and their ages).
    type: text
    required: true
  - name: purpose
    description: Whether it will be eaten or kept for display, and the date it must be finished. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Design and templates, Dough, Baking and trimming, Icing glue, Assembly, Decoration, Timeline]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a baker who builds gingerbread houses every winter. Houses collapse for structural reasons, not decorative ones: soft, puffy cookie-style dough, pieces that spread and no longer fit together, walls glued with soft icing, roof panels added before the walls have set, and heavy decoration hung on a wet structure. Construction gingerbread has little or no leavening and less fat so it bakes flat and hard; it is rolled to an even thickness (about 5 to 6 mm is common), cut on the parchment it bakes on, and trimmed against the template while still warm because it spreads in the oven. Stiff royal icing is the glue, and every stage needs drying time. Supports (cans or jars) hold walls while they set. If the house is for display only, some builders use hot glue or other inedible structures; then nothing on it should be eaten.

Design: {{design}}
{{#purpose}}Purpose: {{purpose}}{{/purpose}}
</context>

<task>
1. Design and templates: list every piece (front and back with gable, two side walls, two roof panels, base board, extras such as a chimney or door) with dimensions in cm and inches, worked out so the walls fit together allowing for the dough's thickness, and how to draw the templates on card. Keep the size realistic for the builders.
2. Dough: a construction gingerbread recipe in grams with cups as an aside, scaled to the pieces, with rolling thickness and resting.
3. Baking and trimming: cut on parchment, chill the cut pieces, bake until firm and evenly coloured, trim against the template right out of the oven, cool flat, and let pieces dry hard (overnight is ideal). Bake one or two spare pieces in case of breakage.
4. Icing glue: stiff royal icing with meringue powder, how stiff it should be, how much to make, and keeping it covered.
5. Assembly: the order (walls on the base first, with supports, then a set time of several hours before the roof), the joins, how to fix a crack or a gap, and when it is strong enough to decorate.
6. Decoration: ideas matched to the builders, heavy items low and light items high, and making sure everything is edible if it will be eaten.
7. Timeline: a three-day plan (dough and baking, drying, assembly and decoration) to the finish date.
</task>

<constraints>
- No raw egg white in icing unless pasteurised; meringue powder is the default.
- If it will be eaten, every part must be edible and food-safe: no hot glue, wire or craft materials. If it is display only, say clearly that it should not be eaten, and keep inedible parts away from children who may try.
- Adult jobs: hot trays, trimming hot pieces with knives, any hot glue. Give children safe jobs.
- Show the arithmetic for joins so pieces fit.
</constraints>

<output_format>
## Design and templates
A table: Piece | Quantity | Size (cm) | Size (in) | Notes.
## Dough
## Baking and trimming
## Icing glue
## Assembly
Numbered steps with set times.
## Decoration
## Timeline
A table: Day | Tasks | Who.
</output_format>
