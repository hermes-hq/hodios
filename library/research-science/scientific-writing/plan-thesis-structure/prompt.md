---
schema: 1
id: plan-thesis-structure
kind: prompt
title: Plan a thesis structure
description: Plans a thesis or dissertation structure with each chapter's purpose, the argument flow, word budgets and a writing timeline working back from the deadline. For graduate students.
category: scientific-writing
version: 1.0.0
status: incubating
stage: [plan]
role: [student, researcher]
requires: [none]
inputs: [topic, notes]
output: [outline, plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [thesis, dissertation, chapter-outline, writing-timeline, phd]
pairs_with:
  prompts: [write-research-proposal, write-methods-section, write-discussion-section]
  personas: [thesis-advisor]
args:
  - name: topic
    description: The thesis topic and research question(s), the methods, what is already done (studies, data, published papers, drafts), and your discipline.
    type: text
    required: true
  - name: degree
    description: The degree and format, for example "MSc dissertation", "PhD monograph", "PhD by publication with 3 papers", "professional doctorate".
    type: string
    required: true
  - name: deadline
    description: The submission date, for example "30 June 2027", plus any fixed dates such as a draft due to the supervisor.
    type: string
  - name: word_limit
    description: The institution's word limit and what it includes, for example "80,000 words excluding references and appendices".
    type: string
output_contract:
  format: markdown
  sections: [The argument in brief, Chapter plan, Word budget, Writing timeline, Risks and questions for your supervisor]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A thesis is one argument, not a collection of chapters. Examiners look for a clear question, a gap the student explains, methods that fit, results that answer the question, and a contribution stated plainly in the introduction and the conclusion. Structures differ by discipline and format: the classic IMRaD-style monograph in the sciences, thematic chapters in the humanities and parts of the social sciences, and the thesis by publication, where linking chapters must turn separate papers into one story. Students lose most time by writing in order from chapter one, letting the literature review grow without limit, and leaving the conclusion, formatting and institutional steps to the last week.
</context>

<task>
Plan the structure for a {{degree}} on:
<topic>
{{topic}}
</topic>
{{#deadline}}Deadline: {{deadline}}{{/deadline}}
{{#word_limit}}Word limit: {{word_limit}}{{/word_limit}}

1. **The argument in brief:** write the research question(s), the gap, the approach and the contribution as four sentences. If the topic does not yet contain a clear question or contribution, say so, offer two or three candidate formulations, and plan around the most feasible one, marked for the student to confirm.
2. **Chapter plan:** propose a structure suited to the degree, format and discipline. For each chapter: working title, purpose in one sentence, the question it answers, its main content, what it hands to the next chapter, and the status of the material (done, partly done, not started) from what the student said. For a thesis by publication, include the linking chapters and how each paper connects to the overall question.
3. **Word budget:** split the word limit across chapters with typical proportions for the format, and note what is excluded (references, appendices). If no limit was given, ask for it and use a placeholder budget labelled as typical, not institutional.
4. **Writing timeline:** working back from the deadline, schedule chapters in a sensible order (often methods and results first, introduction and conclusion last), with buffer for supervisor feedback (assume two to three weeks per round unless told otherwise), revisions, proofreading, formatting, and the institution's submission steps. Show it by week or month with milestones. If no deadline was given, give durations instead of dates.
5. **Risks and questions for your supervisor:** what could break the plan (data not yet collected, ethics, a co-author paper still under review, scope creep), and questions to settle with the supervisor (format rules, chapter order, use of published papers, word limit inclusions).
</task>

<constraints>
- Institutions set their own rules for structure, limits and use of published work. Present the plan as a proposal to check with the supervisor and the graduate school regulations, and never state an institution's rule as fact.
- Base status and timelines on what the student told you; do not assume work is done.
- If the deadline is unrealistic for the remaining work, say so plainly and propose what to cut or how to negotiate.
- Keep the plan to the student's own work; do not draft chapters.
</constraints>

<output_format>
## The argument in brief
Four labelled sentences.
## Chapter plan
Table: chapter | working title | purpose | key content | status.
## Word budget
Table: chapter | words | share of total.
## Writing timeline
Table: period | task | milestone. Mark supervisor review points.
## Risks and questions for your supervisor
Two short bullet lists.
</output_format>
