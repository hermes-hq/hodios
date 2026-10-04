---
schema: 1
id: plan-orchard-season-tasks
kind: prompt
title: Plan the orchard season
description: Builds a month-by-month task calendar for a commercial or community orchard - pruning, blossom frost protection, pollination, thinning, pest monitoring, picking windows and storage.
category: farming
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [individual, founder, operations-manager]
subject: [agriculture]
requires: [none]
inputs: [notes, text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [orchard, fruit-trees, pruning, fruit-thinning, frost-protection, pollination]
pairs_with:
  prompts: [plan-harvest-logistics, triage-crop-symptoms, plan-crop-irrigation-schedule]
  rules: [farm-chemical-label-rules]
args:
  - name: fruit
    description: The fruit and varieties, rootstocks if known, tree age and the planting layout (for example "apples - Cox, Bramley, Gala on MM106, 8 years old; some old standard pears").
    type: text
    required: true
  - name: tree_count
    description: Approximate number of trees.
    type: number
    required: true
  - name: region_climate
    description: Region and climate, including frost risk at blossom, rainfall and the usual harvest months if known.
    type: string
    required: true
  - name: labour
    description: Optional. Who does the work and when - owners, staff, seasonal pickers, community volunteers - and the equipment available.
    type: text
output_contract:
  format: markdown
  sections: [Assumptions, Month by month, Key decisions in the season, Monitoring routine, Labour peaks, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a fruit grower plan the orchard year. Experienced growers plan around the crop's growth stages rather than fixed dates, because bud burst, blossom and harvest move by one to three weeks with the season. The common failures: pruning at the wrong time for the fruit (stone fruit pruned in winter risk silver leaf and canker), no plan for a frost night at blossom, too little thinning so fruit is small and trees fall into biennial bearing, pest and disease decisions made without monitoring, and picking windows that clash with too few hands.

Fruit and trees: {{fruit}}
Approximate number of trees: {{tree_count}}
Region and climate: {{region_climate}}
{{#labour}}
<labour>
{{labour}}
</labour>
{{/labour}}
</context>

<task>
1. State assumptions: the hemisphere and growing season from {{region_climate}}, and the growth stages for each fruit (dormant, bud burst, blossom, fruit set, June drop or equivalent, fruit sizing, harvest, leaf fall).
2. Month-by-month calendar keyed to growth stages: winter pruning for apples and pears while dormant; summer pruning for stone fruit and trained forms; formative pruning for young trees; tree guards, stakes and ties; mulching and weed control around the base; feeding decisions based on leaf or soil analysis; and grass management in the alleys.
3. Blossom: frost risk and the protection options for the scale of the orchard (site choice and cold-air drainage, avoiding mowing or cultivation that lowers frost protection, fleece for small trees, overhead or other systems where already installed), frost alarms or forecast checks, and pollination (compatible pollinators flowering at the same time, bees or hives at about the right density, keeping pollinators safe by not spraying in flower).
4. Thinning: when (after natural drop), how much (for apples, often one or two fruits per cluster and about 10-15 cm apart for dessert fruit, more space for cookers), and why it prevents biennial bearing.
5. Monitoring routine: weekly walks from bud burst with set trees checked, pest traps where used, notes on scab, mildew, canker, aphids, codling moth or the equivalent pests for {{fruit}}, and thresholds agreed with an adviser. Every spray decision goes to the product label and a qualified adviser.
6. Harvest: picking window per variety (judged by starch-iodine, firmness, colour or sugar tests, not the calendar), pick order, picking gear and containers, handling to avoid bruising, cooling and storage life by variety.
7. Labour peaks: estimate hours for pruning, thinning and picking using rules of thumb clearly labelled, and set them against the labour available or as a template if none were given.
</task>

<constraints>
- Never recommend a specific pesticide, fungicide, rate or interval; refer to the label and a qualified adviser, and mention records and buffer zones [CHECK locally].
- Mark all numbers as rules of thumb to adjust for variety, rootstock and site.
- If the fruit, tree count or region is missing, ask and stop.
- Keep it practical for {{tree_count}} trees; do not plan machinery a small orchard will not have.
</constraints>

<output_format>
## Assumptions
Bullets.
## Month by month
Table: Month | Growth stage | Tasks | Notes.
## Key decisions in the season
Bullets: frost, thinning, picking dates, with the test or trigger for each.
## Monitoring routine
Numbered steps and a simple record table: Date | Block | What was seen | Action or adviser query.
## Labour peaks
Table: Job | When | Approx hours | Who.
## Questions
At most three.
</output_format>
