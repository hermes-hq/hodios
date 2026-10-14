---
schema: 1
id: chunk-expert-content-into-modules
kind: prompt
title: Chunk expert content into modules
description: Turns a large dump of expert material such as manuals, slide decks or procedures into task-based modules and lessons, deciding what to teach, what to cut and what becomes reference.
category: course-design
version: 1.0.0
status: incubating
stage: [design]
role: [teacher, manager]
requires: [none]
inputs: [document, text]
output: [outline, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [content-audit, need-to-know, job-aids, module-structure, learning-and-development, cognitive-load]
pairs_with:
  prompts: [design-course-outline, write-learning-objectives, interview-subject-matter-expert]
args:
  - name: content
    description: The material, pasted or summarised (table of contents, slide titles, sections of the manual or procedure).
    type: text
    required: true
  - name: audience
    description: Who will take the training, what they already know and what they need to do on the job afterwards.
    type: string
    required: true
  - name: time
    description: Optional. Time available for the training, for example "two half-day sessions" or "60 minutes of e-learning".
    type: string
output_contract:
  format: markdown
  sections: [Performance goals, Content audit, Module map, Reference and job aids, Cut, Questions for the expert]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an instructional designer who regularly receives "here is everything, make it a course". Experts organise material the way they think about the field (by system, by chapter, by history), while learners need it organised by the tasks they will do. Most of what an expert hands over is accurate but not needed to do the job; teaching it all overloads learners and hides the few things that matter. The skill is triage: name the job tasks, keep content that people must know from memory to do them, move content they can look up at the moment of need into job aids and reference, and cut the rest. Then build each module around one task or decision, in the order the work happens, with practice.

Audience: {{audience}}
{{#time}}Time available: {{time}}{{/time}}

<content>
{{content}}
</content>
</context>

<task>
1. **Performance goals:** from the content and audience, list the five to ten things learners must be able to do on the job afterwards. Mark any you inferred.
2. **Content audit:** go through the material section by section and label each: must know (needed from memory for a task), look up (needed but can be found when needed), nice to know, or not for this audience. Give the reason.
3. **Module map:** group the must-know content into modules by task, in the order of the work. For each module: the goal, the lessons, the practice activity, and an estimated time. Fit the total to the time available if given, and say what had to move to reference to fit.
4. **Reference and job aids:** what to turn into checklists, quick-reference cards, decision tables or searchable reference, and where each should live.
5. **Cut:** what to leave out and why, in a form the expert can agree to.
6. **Questions for the expert:** gaps, contradictions and missing examples found in the material, phrased as questions for the subject matter expert.
</task>

<constraints>
- Do not add facts, steps or numbers that are not in the content. Where the material is unclear or conflicting, ask in Questions for the expert instead of guessing.
- Safety-critical and compliance content is never cut without the expert's agreement; mark it.
- Organise by task, not by the source document's chapter order, unless they match.
- If the audience is missing or is "everyone", ask which roles will take it and what they must do afterwards, and stop: the triage depends on it.
</constraints>

<output_format>
## Performance goals
Numbered list.
## Content audit
Table: Source section | Label | Reason | Goes to (module, job aid, cut).
## Module map
Table: Module | Goal | Lessons | Practice | Minutes.
## Reference and job aids
Table: Job aid | Content | Format | Where it lives.
## Cut
Bullets with reasons.
## Questions for the expert
Numbered list.
</output_format>
