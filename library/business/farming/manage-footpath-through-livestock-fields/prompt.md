---
schema: 1
id: manage-footpath-through-livestock-fields
kind: prompt
title: Manage a footpath through livestock fields
description: Plans managing a public path through fields with cattle or sheep, covering which animals to keep away, temporary fencing, gates, signs, dog advice, an incident plan and rules to check locally.
category: farming
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [individual, founder]
subject: [agriculture]
requires: [none]
inputs: [notes, text]
output: [checklist, plan, copy]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [public-right-of-way, cattle-and-walkers, dogs-and-livestock, farm-signage, temporary-fencing]
pairs_with:
  prompts: [write-farm-task-risk-assessment, answer-neighbour-farm-complaint]
  personas: [farm-safety-adviser]
args:
  - name: path_description
    description: Where the path or paths run (across the middle, along an edge, through a yard), how busy they are and when, gates and stiles, alternative fields, and any past incidents or complaints.
    type: text
    required: true
  - name: livestock
    description: The animals and when they use those fields - cows with calves, bulls (breed and age), heifers, sheep at lambing, horses - and how they behave with people and dogs.
    type: text
    required: true
  - name: country
    description: Country and region, because access rights and the rules on bulls, signs and obstructing paths differ by country.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Risk by field, Where to put which stock, Fencing and gates, Signs, Dogs and walkers, Incident plan, Rules to check locally, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a livestock farmer manage public paths through their fields so walkers stay safe and the farm stays on the right side of the law. Most serious incidents involve cattle, especially cows protecting young calves, and walkers with dogs; bulls are a risk too, and in some places rules restrict which bulls may be kept in fields crossed by public paths. Sheep are chased and attacked by dogs, especially at lambing. The farmer usually has a duty not to obstruct the path and not to put up misleading signs, and a duty to manage known risks from their animals. The best controls are about placement and separation: choosing which stock go in path fields, at what times, and fencing the path off when needed, with clear, factual signs and good gates.

Country: {{country}}
</context>

<task>
<path_description>
{{path_description}}
</path_description>

<livestock>
{{livestock}}
</livestock>

1. Rate each field the path crosses (high, medium, low) by the stock in it, the season (calving, lambing), how busy the path is and where it runs (open middle versus fenced edge, pinch points at gates and water troughs).
2. Plan stock placement through the year: keep cows with young calves and bulls out of path fields where possible, or in the fields with the least use; use path fields for sheep outside lambing, dry cows, steers, or for hay and silage; note any animal with a history of aggression should not be in a path field and may need to leave the herd.
3. Fencing and gates: where a temporary electric fence along the path line would separate stock while keeping the path open at its full width; gates that are easy to open and close and self-closing where appropriate; keeping troughs, feeders and handling areas away from the path line.
4. Signs: factual, temporary signs that say what is in the field and what to do (for example "Cows with calves in this field. Keep dogs on a short lead. Do not walk between cows and calves."), removed when the stock move. No signs that discourage lawful use or are not true.
5. Dogs and walkers: the advice to give: keep dogs on a short lead around livestock; if cattle threaten, let go of the lead and move calmly to the edge or out of the field; do not run; close gates; report problems with contact details.
6. Incident plan: what to do and who to call if someone is hurt, if stock are chased or attacked by a dog, and how to record incidents and near misses.
7. Rules to check: access rights in {{country}}, restrictions on bulls by breed and age, signs, obstruction, temporary diversions, liability and insurance, dog attacks on livestock.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state the law on access, bulls, signage or liability as fact; frame each as a question to check with the local access authority, a farming union or a solicitor.
- Never suggest blocking, ploughing out, diverting or hiding a public path without the proper legal process, or putting up false or deterrent signs.
- Use only the farm details given; mark missing items `[CONFIRM]`.
- If the path, livestock or country is missing, ask and stop.
</constraints>

<output_format>
## Risk by field
Table: field | stock and season | path position | footfall | risk.

## Where to put which stock
Table: season | path fields | stock in them | reason.

## Fencing and gates
Bullets with locations.

## Signs
Sign wordings with where and when they go up and come down.

## Dogs and walkers
Short advice text suitable for a sign or the farm website.

## Incident plan
Numbered steps and an incident log layout.

## Rules to check locally
Checklist.

## Questions
What to confirm.
</output_format>
