---
schema: 1
id: write-impact-statement
kind: prompt
title: Write a research impact statement
description: Writes a research impact statement or pathway to impact naming beneficiaries, the mechanisms that reach them, activities, indicators and evidence, matched to the funder's or assessment's format.
category: scientific-writing
version: 1.0.1
status: incubating
stage: [plan, build]
role: [researcher]
requires: [none]
inputs: [text, document]
output: [docs, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [research-impact, pathways-to-impact, grant-writing, broader-impacts, impact-case-study, theory-of-change]
pairs_with:
  prompts: [write-research-proposal, plan-research-dissemination, write-policy-brief]
  workflows: [grant-proposal-track]
args:
  - name: research
    description: The research - question, methods, expected or achieved findings - plus who might use or benefit from it, partners or users already involved, and any evidence of use so far.
    type: text
    required: true
  - name: funder
    description: The funder or assessment and section, for example "NSF Broader Impacts", "Horizon Europe impact section", "REF impact case study", or a foundation's impact section, with any word limit and headings. Funders change their forms, so paste the current headings if you have them.
    type: string
output_contract:
  format: markdown
  sections: [Format and assumptions, Impact logic, Impact statement, Indicators and evidence, Gaps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.1, note: "Retrospective case studies open with a summary of the impact and make the research-to-impact link explicit; the funder examples no longer name a retired format."}
  - {version: 1.0.0, note: "First version."}
---
<context>
Funders and assessments ask researchers to show how their work will change something beyond academia, and reviewers score this on credibility, not ambition. Strong statements name specific beneficiaries rather than "society", explain the mechanism by which the research reaches them (a tool they adopt, guidance they follow, a policy decision it informs, training, a product), show that users are involved early, plan activities and resources that match the claims, and propose indicators that could actually be collected. Formats differ: forward-looking proposal sections (pathways to impact, broader impacts, Horizon Europe impact) plan and justify; retrospective case studies (such as REF impact case studies) evidence change that has happened and link it to underpinning research. Weak statements list dissemination outputs and call them impact.
</context>

<task>
Write an impact statement for this research.
<research>
{{research}}
</research>
{{#funder}}Funder or assessment: {{funder}}{{/funder}}

1. Identify the format: forward-looking plan or retrospective case study, the funder's criteria, headings and word limit. If the funder is not given or its criteria are unknown to you, use a generic forward-looking structure and say what to check in the call documents.
2. Build the impact logic: for each beneficiary group, what will change for them (knowledge, practice, policy, economy, health, environment, culture), the mechanism linking the research to that change, the activities and outputs that drive it, the time frame, and the assumptions and risks along the way.
3. Distinguish dissemination (papers, talks) from engagement (working with users) and impact (the change itself), and keep only credible claims; say which ones are long-term and outside the project's control.
4. Write the statement in the funder's format and voice, concrete and evidenced, with partners and users named as given, resources and responsibilities, and how impact will be monitored. For a retrospective case study, structure it as a summary of the impact, underpinning research, references to that research, details of the impact, and sources to corroborate it, and make the link from each piece of research to each claimed change explicit.
5. Propose indicators and evidence for each claimed change: what will be collected, by whom and when (for example adoption numbers, policy citations, testimonials collected through a defined process, changes in practice data).
</task>

<constraints>
- Use only partners, users, results and evidence in the input; mark anything needed but missing as [TO CONFIRM: ...]. Never invent letters of support, policy citations or adoption figures.
- Name specific beneficiaries and mechanisms; replace generic phrases like "benefit society" or "inform policy" with who, what and how.
- Keep claims proportionate to the project's size, duration and stage.
- Respect the word limit; if none is given, aim for about 500 words for a proposal section.
</constraints>

<output_format>
## Format and assumptions
The format, criteria and limit used, and anything to check in the call.
## Impact logic
A table: beneficiary | change | mechanism | activities | time frame | key assumption.
## Impact statement
The statement, ready to adapt, with its word count.
## Indicators and evidence
A table: change | indicator | evidence source | when collected | responsible.
## Gaps
The [TO CONFIRM] items and the weakest links in the logic, with how to strengthen them.
</output_format>
