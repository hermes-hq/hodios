---
schema: 1
id: write-college-activities-list
kind: prompt
title: Write a college activities list
description: Turns a student's extracurriculars into a strong, truthful college activities list within each field's character limits, using action verbs, numbers and an order that tells a coherent story.
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
    description: The application platform. common-app and uc set the fields, entry count and limits as the assistant understands them; other uses the limits you give in field_limits.
    type: enum
    enum: [common-app, uc, other]
    default: common-app
  - name: field_limits
    description: Optional character limits to use instead of the platform's, such as "position 50, organisation 100, description 150", and the maximum number of entries. Needed when platform is other.
    type: string
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
Admissions readers spend seconds on each activity, and the first entries shape their picture of the applicant. An entry works when the position line says who the student was, and the description leads with what they did and what changed because of it, with concrete numbers (people, hours, money, results) and no filler. Strong lists use a telegraphic style: action verbs, no "I", few articles, and semicolons to fit two achievements into one line. Inflation backfires: counselors and recommenders describe the same activities, and readers recognise vague grandiosity. Work, family responsibilities and caring for siblings are real activities and often say more than a club membership.

Platform fields, as commonly understood (the student must confirm in the portal): the Common App allows 10 activities, each with an activity type, a position or leadership line of up to 50 characters, an organisation name of up to 100, a description of up to 150, grade levels, timing, hours per week and weeks per year. The UC application allows up to 20 entries in its own categories, with longer descriptions of up to 350 characters. Character counts include spaces and punctuation. Language models miscount characters, so the safe method is to write well inside the limit and have the student check in the portal.
</context>

<task>
Write an activities list for the `{{platform}}` platform.
{{#field_limits}}Use these limits and entry count instead of the platform's: {{field_limits}}.{{/field_limits}}

<activities>
{{activities}}
</activities>

If platform is `other` and no limits were given, ask for the field limits and the number of entries allowed, and stop.

1. **Order and story.** Rank the activities by significance: depth and length of commitment, hours, leadership, impact, and relevance to what the student seems to care about. Explain the order in three or four lines, including what picture the first three entries give together. If there are more activities than the platform allows, say which to cut or combine and why.
2. **Activities.** For each, write the position line, the organisation name and the description, each inside its field's limit, plus the grade levels and hours as the student gave them. Keep strictly to the student's facts. Lead with the strongest verb and the result; cut words that add nothing ("responsible for", "various", "helped to", "participated in"). Write each description to about 90% of its limit, then count its characters including spaces and give the count, marked approximate. If a draft is over the limit, cut it before showing it.
3. **What I need from you.** For each entry that would be stronger with a missing fact (a number, a result, the scale of something, what changed), ask for it as a specific question. In the draft, use a bracketed placeholder such as "[number] students" instead of inventing a figure.
4. **Checks.** Flag anything that could read as exaggerated relative to the facts given, any entry that duplicates what the student says their personal statement covers, and remind them to paste each line into the portal and check the counter there.
</task>

<constraints>
- Truthful only. Never upgrade a role (member to leader), invent numbers, results or awards, or imply responsibilities the notes do not support. If the student asks for inflation, decline in one sentence and write the strongest honest version.
- Keep the student's facts and voice; you are editing for compression and clarity.
- If you are unsure of a platform's fields or limits, say so and use the limits the student gives.
- Do not advise padding hours or listing activities the student did not do.
</constraints>

<output_format>
Use the section headings from the output contract. Activities as a table: Rank | Position | Organisation | Grades and hours | Description | Characters (approx.). What I need from you as a numbered list of questions, each naming the entry. Checks as bullets.
</output_format>
