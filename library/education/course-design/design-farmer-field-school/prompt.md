---
schema: 1
id: design-farmer-field-school
kind: prompt
title: Design a farmer field school
description: Designs a season-long farmer field school with participatory field observation, comparison plots, group analysis and locally chosen topics, scheduled around the crop or livestock calendar.
category: course-design
version: 1.0.0
status: incubating
stage: [design, plan]
role: [consultant, teacher]
subject: [agriculture]
requires: [none]
inputs: [text, notes]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [farmer-field-school, agricultural-extension, participatory-learning, comparison-plots, agroecosystem-analysis, smallholders]
args:
  - name: crop_or_livestock
    description: The main crop, livestock or system the school studies, e.g. "maize with bean intercrop", "dairy goats", "irrigated rice".
    type: string
    required: true
  - name: local_context
    description: Where and who - region and climate, season dates, farm sizes, main problems farmers report, group size and gender mix, literacy, languages, land available for a study plot, and the facilitator's background.
    type: text
    required: true
  - name: sessions
    description: Number of field school sessions across the season.
    type: number
    default: 12
output_contract:
  format: markdown
  sections: [Learning priorities, Study plot design, Season calendar, Session routine, Special topics, Group and facilitation, Evaluation and graduation]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A farmer field school is a group of 20-30 farmers who meet regularly through one whole season at a shared study plot, observe, experiment and decide together, with a facilitator rather than a lecturer. It works because farmers test practices in their own conditions and draw their own conclusions. It goes wrong when it turns into demonstrations of a package the facilitator already chose, when sessions do not line up with what is happening in the field that week, when meetings clash with peak labour or market days, or when women, younger farmers or non-literate members cannot take part fully.

System: {{crop_or_livestock}}. Sessions: {{sessions}}.
</context>

<task>
<local_context>
{{local_context}}
</local_context>

1. **Learning priorities:** from the context, the three to five problems the group will investigate, phrased as farmers' questions (for example "Does mulching save enough water to pay for the labour?"). Plan a first-session problem ranking so the group confirms or changes them.
2. **Study plot design:** a comparison of the farmers' usual practice against one to three alternatives they choose, with plot or animal group sizes, layout, what stays the same, and what gets recorded (growth, pests and beneficial insects, disease, water, labour hours, costs, yield or milk). Keep it simple enough to run without a lab.
3. **Season calendar:** place the {{sessions}} sessions across the season so each matches a field stage (land preparation, planting, early growth, flowering, pest peaks, harvest, post-harvest or the livestock equivalents), avoiding peak labour and market days.
4. **Session routine:** the repeated half-day flow - field observation in small groups, agro-ecosystem analysis drawing (plant, pests, natural enemies, weather, soil, decisions), presentation and group decision, a special topic, and a group dynamic or energiser - with timings.
5. **Special topics:** one per session, matched to the calendar and the priorities (seed selection, soil and water, scouting, natural enemies, safe storage, record keeping, marketing).
6. **Group and facilitation:** group formation and norms, subgroups with rotating roles, inclusion (timing and childcare for women, pictorial recording for non-literate members, local language), and what the facilitator does and does not do.
7. **Evaluation and graduation:** a simple pre- and post-season ballot box test on field knowledge, records of plot results, farmers' own decisions about adoption, a field day for neighbours and a graduation event.
</task>

<constraints>
- Farmers choose what to test; the facilitator suggests options but does not impose a package.
- Do not give pesticide, veterinary medicine or fertiliser product names, doses or withdrawal periods. Where a topic involves them, say to use the national extension service or a qualified agronomist or vet and local label rules.
- Do not invent local yields, prices, rainfall or pest data; mark them to collect locally.
- Plans must work with low cost and local materials.
- If season dates or the main problems are missing, ask for them and stop.
</constraints>

<output_format>
## Learning priorities
Numbered farmer questions.
## Study plot design
Table: Treatment | What changes | Plot or group size | What to record.
## Season calendar
Table: Session | Approximate date or crop stage | Field focus | Special topic.
## Session routine
Table: Minutes | Activity | Who leads.
## Special topics
Bullets, one line each.
## Group and facilitation
Bullets.
## Evaluation and graduation
Bullets and three sample ballot box questions.
</output_format>
