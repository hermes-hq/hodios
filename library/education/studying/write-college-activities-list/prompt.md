---
schema: 1
id: write-college-activities-list
kind: prompt
title: Write a college activities list
description: Turns a student's extracurriculars into a strong, truthful college activities list within character limits, using action verbs, numbers and an order that tells a coherent story.
category: studying
version: 1.0.0
status: incubating
stage: [build, review]
role: [student]
requires: [none]
inputs: [notes, text]
output: [rewrite, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [college-admissions, activities-list, extracurriculars, common-app, character-limits, us-admissions]
pairs_with:
  prompts: [coach-personal-statement, plan-university-application]
args:
  - name: activities
    description: Each activity with your role, organisation, grade levels, hours per week, weeks per year, what you actually did and any results or recognition. Rough notes are fine.
    type: text
    required: true
  - name: platform
    description: The application platform, such as "Common-App", "UC application" or another portal, which sets the fields and the number of activities allowed.
    type: string
    default: Common-App
  - name: character_limit
    description: Character limit for each activity description, including spaces.
    type: number
    default: 150
output_contract:
  format: markdown
  sections: [Order and story, Activities, What I need from you, Checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Admissions readers spend seconds on each activity. An entry works when the position line says who you were, and the description leads with what you did and what changed because of it, with concrete numbers (people, hours, money, results) and no filler. Strong lists use telegraphic style: action verbs, no "I", minimal articles, semicolons to pack two achievements in. They put the most significant activities first, so the first few entries show a coherent picture. Inflation backfires: counselors, teachers and recommenders describe the same activities, and readers spot vague grandiosity. Character counts include spaces and are hard to estimate by eye.
</context>

<task>
Write an activities list for {{platform}} with descriptions of at most {{character_limit}} characters each.

<activities>
{{activities}}
</activities>

1. **Order and story.** Rank the activities by significance (depth of commitment, leadership, impact, relevance to the student's likely interests), and explain the order in three or four lines, including what picture the first three entries give. If there are more activities than {{platform}} allows, say which to cut or combine and why.
2. **Activities.** For each, write: the position or leadership line, the organisation name, and the description. Keep to the student's facts. Use action verbs, numbers the student gave, and the result or impact; cut words that add nothing ("responsible for", "various", "helped to"). After each description, write its exact character count including spaces, counted carefully; if over {{character_limit}}, shorten it.
3. **What I need from you.** List missing facts that would strengthen specific entries (a number, a result, the scale of something), phrased as questions. Never fill a gap with an invented figure; use a placeholder in brackets instead, such as "[number] students".
4. **Checks.** Flag anything that reads as exaggerated relative to the facts given, any duplicates with what the personal statement might cover (if the student mentions it), and remind the student to re-check character counts in the portal itself, since portals count characters slightly differently.
</task>

<constraints>
- Truthful only. Never upgrade a role (member to leader), invent numbers, results or awards, or imply responsibilities the notes do not support.
- Keep the student's voice and facts; you are editing for compression and clarity.
- Respect {{platform}} fields as you understand them; if you are unsure of its fields or limits, say so and ask.
- Do not advise on whether to report hours dishonestly or pad activities.
</constraints>

<output_format>
Use the section headings from the output contract. Activities as a table: Rank | Position | Organisation | Description | Characters. What I need from you as a numbered list of questions. Checks as bullets.
</output_format>
