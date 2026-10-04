---
schema: 1
id: plan-phd-application
kind: prompt
title: Plan a PhD application
description: Plans a PhD or research master's application with the funding routes to check, how to find supervisors, a research proposal outline, references and a dated timeline back from deadlines.
category: studying
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [student, researcher]
requires: [none]
inputs: [text, resume]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [phd-application, research-funding, research-proposal, academic-references]
pairs_with:
  prompts: [email-prospective-supervisor, refine-research-question, plan-phd-timeline, plan-scholarship-applications]
args:
  - name: field
    description: Your research field and the topic or kind of project you want to do, e.g. "computational ecology, species distribution under climate change".
    type: string
    required: true
  - name: countries
    description: Countries or regions you would consider, e.g. "UK, Netherlands, Germany" or "US and Canada". Say if you need a visa.
    type: string
    required: true
  - name: profile
    description: Optional. Your degrees and grades or expected grades, research experience, publications, skills, funding situation, when you could start, and any known deadlines.
    type: text
output_contract:
  format: markdown
  sections: [How applying works where you are looking, Funding to check, Finding supervisors, Research proposal outline, References, Timeline, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A final-year undergraduate or master's student wants to apply for a PhD or research master's in {{field}}, looking at {{countries}}. Applications go wrong because students start too late (funding deadlines often fall 9-12 months before the start date), assume every country works the same way, apply to a university rather than to a supervisor or project where that is how places are actually decided, or secure a place with no funding. Systems differ: in some countries students apply to an advertised funded project or propose their own project to a supervisor; in others they apply to a doctoral programme with coursework and choose a supervisor later; funding may come with the place or need a separate application. Treat every country-level pattern as something to verify on the official pages.
</context>

<task>
{{#profile}}
<profile>
{{profile}}
</profile>
{{/profile}}

1. For each country or region, describe the usual route in general terms (advertised project, own proposal to a supervisor, programme admission, structured graduate school), the typical application season, and what the student must confirm on official university and funder pages. Mark these as general patterns to verify.
2. List funding routes to check: funded projects or studentships, university scholarships, national research funders and doctoral training schemes, government scholarships for international students, teaching or research assistantships, industry or employer funding. Say what to look for (stipend, fees covered, duration, eligibility by nationality). Warn that a self-funded PhD is a large financial commitment to think through carefully.
3. Finding supervisors: start from papers the student has read and cited; check recent publications and current grants, whether the person is taking students, and talk to current students. Aim for a shortlist of five to ten. Point to the supervisor email prompt for first contact.
4. Research proposal outline (often 1,000-3,000 words; check each programme): working title, background and gap, aims and questions, methods and data, feasibility and ethics, expected contribution, timeline, key references. Say what reviewers look for: a focused question, a credible method, and fit with the supervisor.
5. References: usually two or three academic referees; ask six to eight weeks before the first deadline and give them a short pack (CV, proposal, deadlines, list of places, what to highlight).
6. Build a dated timeline working back from the earliest deadline (or a typical season if none is known): research and shortlist, supervisor contact, proposal drafts, referee requests, any language or admission tests, applications, interviews, funding decisions.
</task>

<constraints>
- Do not state specific deadlines, stipend amounts, fees, test requirements or eligibility rules as fact. Describe the pattern and tell the student where to check. Mark any date you assume as [verify].
- Do not invent funders, programmes, labs or supervisors by name. You may name widely known national funder types generically.
- If the start year, field or countries are too vague to plan, ask.
- Do not write the research proposal; outline it and say what each part must do.
- If the profile shows a gap that matters (no research experience, grades below typical thresholds), say so kindly and suggest how to strengthen the application, such as a research assistant role or a research master's first.
</constraints>

<output_format>
## How applying works where you are looking
Table: Country or region | Usual route | Typical season | Verify on.

## Funding to check
Table: Funding type | What it usually covers | Who is eligible (to verify) | Where to look.

## Finding supervisors
Numbered steps and a shortlist table template: Name | Institution | Recent paper read | Taking students? | Funding route | Contacted on.

## Research proposal outline
Headings with one or two lines each on what the section must show.

## References
A checklist and the referee pack contents.

## Timeline
Table: Month | Tasks | Deadline (marked [verify] if assumed).

## Questions
What the student should answer or check next.
</output_format>
