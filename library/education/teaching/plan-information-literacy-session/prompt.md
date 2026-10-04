---
schema: 1
id: plan-information-literacy-session
kind: prompt
title: Plan an information literacy session
description: Plans a library or classroom session on searching, judging sources and citing, built around students' real research task, with live search activities and a short assessment.
category: teaching
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist, quiz]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [information-literacy, school-library, search-skills, lateral-reading, citation, librarians]
pairs_with:
  prompts: [plan-media-literacy-lesson, build-course-reading-list, write-lesson-plan]
args:
  - name: age_group
    description: Age, year group or course level, e.g. "Year 8", "ages 16-18 starting extended projects", "first-year undergraduates".
    type: string
    required: true
  - name: minutes
    description: Length of the session.
    type: number
    default: 50
  - name: assignment_context
    description: Optional but strongly recommended. The research task students face, e.g. "a 1,500-word report on a local environmental issue using at least four sources, Harvard referencing". Add the databases or resources your library offers if you want them used.
    type: text
output_contract:
  format: markdown
  sections: [Learning outcomes, Session plan, Search activity, Judging sources activity, Citing, Assessment, Resources and prep]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Information literacy teaching sticks when it is tied to a task students must do now; a generic "how to research" talk is forgotten by the time the assignment arrives. Students tend to type a whole question into a search box, take the first result, judge a source by how it looks, and cite at the last minute. Better habits are concrete and teachable: turning a question into keywords and synonyms, choosing where to search (catalogue, databases, the open web, AI tools with care), using search features, reading laterally (leaving a site to find out who is behind it and what others say) before reading deeply, tracing claims to their origin, and recording sources as they go. This session is for librarians and teachers, often teaching together.

Learners: {{age_group}}. Length: {{minutes}} minutes.
</context>

<task>
{{#assignment_context}}
<assignment>
{{assignment_context}}
</assignment>
Build every activity around this assignment so students leave with progress on their own research.
{{/assignment_context}}

1. **Learning outcomes:** three outcomes students can show by the end, covering searching, judging and citing, worded for this age group.
2. **Session plan:** a timed plan for {{minutes}} minutes with a short hook (for example, two search results for the same question that disagree), brief modelling, mostly hands-on work on devices, and a close. Note who leads each part if a librarian and teacher co-teach.
3. **Search activity:** students turn their research question into keywords, synonyms and narrower or broader terms (a planning grid), then search in at least two places suited to the age: the library catalogue, a database [use the library's own], and the open web with features such as quotation marks, site or domain limits, and date filters. They compare what each place gives and record their best results. Include a short note on using AI chat tools: fine for brainstorming keywords, never as a source, and every claim checked against a real source.
4. **Judging sources activity:** students apply a few concrete moves to two or three of their own results: who is behind this and what do others say about them (lateral reading), what is the evidence and where did it come from, is it current enough for this topic, and what is it for (inform, persuade, sell). Include one worked example the teacher models live, and a reminder that a source can be biased and still useful if used carefully.
5. **Citing:** why we cite, the style required (or a common style appropriate to the age if none is given), a quick demonstration of recording citation details as you search, and how to quote, paraphrase and avoid plagiarism.
6. **Assessment:** a short end-of-session check, such as a search log submitted with their three best sources, a one-sentence justification for each, and one correctly formatted citation, plus a quick self-rating of confidence. Give a simple success checklist the teacher can use to mark it.
7. **Resources and prep:** what to set up before the session (logins, device check, a page of links, a printed planning grid) and follow-up support such as library drop-in times.
</task>

<constraints>
- Do not invent the library's databases, subscriptions or login details. Use placeholders like [your library's database] unless the teacher named them.
- Use real, live searching rather than invented results where possible; for any example sources you describe, keep them generic or clearly invented for illustration.
- Keep talk short; at least half the time is students searching on their own task.
- Pitch it to the age group: younger students use the catalogue and a curated starting list; older students use databases, advanced search and scholarly sources.
- If no assignment is given, say the session will be more effective tied to one, and build it around a sample research question appropriate to the age.
- Before finishing, check that every outcome is practised and assessed in the session and the timings add up to {{minutes}} minutes.
</constraints>

<output_format>
## Learning outcomes
Three numbered outcomes.
## Session plan
Table: Time | Activity | Who leads | Student output.
## Search activity
Steps, the keyword planning grid, and the AI tools note.
## Judging sources activity
The moves as a short checklist, plus the modelled example.
## Citing
Bullets and one example citation in the required style.
## Assessment
The task and a marking checklist.
## Resources and prep
Checklist.
</output_format>
