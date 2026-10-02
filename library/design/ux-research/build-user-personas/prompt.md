---
schema: 1
id: build-user-personas
kind: prompt
title: Build evidence-based user personas
description: Builds UX personas from research notes, grouping participants by behaviour, with goals, pain points and scenarios traced to evidence and assumptions marked. Use after interviews or field research.
category: ux-research
version: 1.0.0
status: incubating
stage: [discover, design]
role: [ux-researcher, designer, product-manager, marketer]
requires: [none]
inputs: [notes, transcript, text]
output: [report, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [personas, research-synthesis, behavioural-segmentation, jobs-to-be-done]
pairs_with:
  prompts: [build-user-journey-map, synthesize-usability-findings, design-diary-study]
  personas: [ux-researcher, product-designer]
args:
  - name: research_data
    description: Interview notes, transcripts, diary entries, survey summaries or support themes, ideally labelled by participant (P1, P2...), plus the product and the decisions the personas should inform.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Evidence base, Behavioural variables, Personas, Anti-persona, Gaps and next research]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most personas are fiction: a stock photo, an age, a hobby and a quote nobody said, built from demographics and the team's assumptions. They do not change a single design decision, so they are ignored. Useful personas group people by what they do and why, are traceable to the research behind them, say plainly where evidence is thin, and come with scenarios that designers can test ideas against.
</context>

<task>
Build personas from this research.

<research_data>
{{research_data}}
</research_data>

1. **Evidence base.** List the sources and participants (count, segments, method, dates if given). If the data contains no actual research (only the team's opinions or a product description), stop and say so: offer a set of clearly labelled proto-personas as hypotheses to test, plus the research needed to confirm them, and do not present them as research-based.
2. **Behavioural variables.** Identify 5 to 8 variables on which participants differ in ways that matter to the product: activities (frequency, volume), attitudes, motivations, skills and context (for example "plans weekly versus decides daily", "tech confidence", "works alone versus as a team"). Place each participant on each variable in a table.
3. **Clusters.** Find participants who sit together on several variables. Each cluster with a distinct pattern of goals and behaviour becomes a persona; aim for 2 to 4. Merge clusters that would lead to the same design decisions. Say how many participants support each one.
4. **Personas.** For each:
   - a name and a short descriptive title based on behaviour ("The weekly planner"), with no stock photo and no invented demographic detail that the data does not support;
   - context: situation, environment and constraints;
   - goals: end goals (what they want to achieve) and experience goals (how they want to feel), from the evidence;
   - behaviours and current workarounds;
   - pain points and what triggers them;
   - two short real quotes with participant ids, only if they appear in the data;
   - 2 key scenarios: concrete situations in which they would use the product, written as short narratives;
   - design implications: 3 to 5 statements of what the product must do for this persona;
   - evidence and confidence: participants supporting it, and every statement that is inferred rather than observed marked "(assumption)".
5. **Primary persona.** Recommend which persona the design should serve first and why, and what the others need so they are not failed.
6. **Anti-persona.** Who the product is not for, based on the data, if anyone, and why.
7. **Gaps.** Segments missing from the sample, contradictions in the data, and the next research to close them.
</task>

<constraints>
- Every goal, behaviour and pain point must trace to the data. Do not invent quotes, numbers or traits; anything inferred is labelled "(assumption)".
- Group by behaviour and goals, not by age, gender or job title alone. Use demographics only when they change behaviour in the data.
- Do not create more personas than the evidence supports. With fewer than about 5 participants, say the personas are provisional.
{{> output/uncertainty}}
</constraints>

<output_format>
## Evidence base
## Behavioural variables
| Variable | Low end | High end | P1 | P2 | ... |
## Personas
One `###` subsection per persona with the fields above, ending with "Evidence: Pn, Pn - confidence high, medium or low". Then a `### Primary persona` subsection with the recommendation from step 5.
## Anti-persona
## Gaps and next research
</output_format>
