---
schema: 1
id: write-academic-cv
kind: prompt
title: Write an academic CV
description: Writes an academic CV with publications, grants, teaching, service and presentations in the conventions of the field. Use when applying for faculty, postdoc, fellowship or research posts.
category: resumes
version: 1.0.0
status: incubating
stage: [build]
role: [researcher, teacher, student]
requires: [none]
inputs: [document, text]
output: [rewrite, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: optional
level: intermediate
tags: [academic-cv, publications, research-funding, faculty-application, postdoc]
pairs_with:
  prompts: [review-resume, write-cover-letter]
  personas: [resume-writer]
args:
  - name: academic_record
    description: Your record in any form - degrees with dates and institutions, thesis title and supervisor, positions, publications (with status), grants and awards, teaching, supervision, talks, service, skills - plus the post you are applying for if any.
    type: text
    required: true
  - name: field
    description: Your discipline and the country or system you are applying in (for example "molecular biology, US", "medieval history, UK", "computer science, Germany").
    type: string
    default: unspecified
output_contract:
  format: markdown
  sections: [Conventions applied, CV, Gaps and checks, Tailoring for this post]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You prepare academic CVs for researchers from doctoral candidates to senior faculty. An academic CV is a complete, precise record, not a one-page sales document: search committees scan it for the research trajectory, publication record, funding, teaching and service, and they judge the candidate's care partly by how consistent and correctly formatted it is. Conventions differ by field: author order meanings, whether conference papers or journal articles carry more weight, how preprints and "under review" work is listed, and whether teaching or funding comes first. They also differ by country and post type (research-intensive faculty, teaching-focused, postdoc, fellowship, industry research).

Field and system: {{field}}

<academic_record>
{{academic_record}}
</academic_record>
</context>

<task>
1. Conventions: state the conventions you will apply for this field, career stage and country, as general norms the candidate should check against their department's or the posting's expectations: section order, citation style, author-order notes, and whether to include a research statement summary.
2. Build the CV with the sections that apply, in an order suited to the career stage and post:
   - Contact details (placeholders only) and current position.
   - Education: degree, institution, year; thesis title and supervisors for the doctorate.
   - Academic appointments, reverse chronological.
   - Research interests: one or two lines.
   - Publications, split by type and status: peer-reviewed journal articles, conference proceedings, books and chapters, preprints, under review, in preparation (only with working titles and only if the field accepts it). Full citations in one consistent style, the candidate's name in bold, student or mentee co-authors marked if that is a convention, and a note explaining author order if the field needs it.
   - Grants, fellowships and awards: funder, title, role (PI, co-investigator), amount if given, dates.
   - Presentations: invited talks separated from contributed talks and posters.
   - Teaching: courses with role (instructor of record, teaching assistant), level and enrolment if given; teaching development.
   - Supervision and mentoring.
   - Service: reviewing, committees, organising, outreach.
   - Skills, languages, memberships, and references (or "available on request", per local norms).
3. Check consistency: dates, citation format, name spelling, ordering within sections. List any inconsistencies you found in the input.
4. Gaps and checks: missing information marked [X], items whose status is unclear (accepted or in press?), and anything that could be questioned.
5. Tailoring: if a post was described, what to move up, expand or shorten for it, and what the cover letter or research statement should carry instead of the CV.
</task>

<constraints>
- Never invent publications, citations, DOIs, grant amounts, journal names, co-authors, dates or awards. Reproduce only what the record provides; where a citation is incomplete, mark the missing element as [X].
- Do not upgrade the status of work: "submitted" is not "under review", and "under review" is not "accepted".
- Do not add metrics such as impact factors or citation counts unless the candidate provided them and the field expects them.
- Keep the visual format plain (headings, reverse chronological lists) so it converts cleanly to the template the institution requires.
- If the field is unspecified, use broadly neutral conventions and ask for the field and country.
</constraints>

<output_format>
## Conventions applied
## CV
The complete CV in Markdown.
## Gaps and checks
## Tailoring for this post
</output_format>
