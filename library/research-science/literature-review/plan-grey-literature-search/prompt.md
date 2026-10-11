---
schema: 1
id: plan-grey-literature-search
kind: prompt
title: Plan a grey literature search
description: Plans a documented grey literature search across theses, reports, trial registries, preprints, conference abstracts and organisation websites, with search methods, screening and a reproducible log.
category: literature-review
version: 1.0.0
status: incubating
stage: [plan, discover]
role: [researcher, student]
requires: [none]
inputs: [topic, text]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [grey-literature, search-strategy, trial-registries, preprints, publication-bias, systematic-review]
pairs_with:
  prompts: [build-search-string, chase-citations, write-systematic-review-protocol, write-prisma-flow-report]
  personas: [research-librarian]
args:
  - name: question
    description: The review question and the kind of review (systematic, scoping, rapid, policy review).
    type: text
    required: true
  - name: scope
    description: Optional. Countries or regions, languages, sectors (health, education, development, environment), date range, and time available for grey searching.
    type: text
output_contract:
  format: markdown
  sections: [Why and how much, Source plan, Search methods, Screening and records, Search log template]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Grey literature is material not published by commercial academic publishers: government and agency reports, theses, conference abstracts, trial registry records, preprints, working papers, evaluations by NGOs and companies. It matters because studies with null or unwelcome results are less likely to reach journals, and because in policy, development and practice fields much of the evidence lives only in reports. Grey searching is hard to make systematic: websites have weak search engines, results change, and there is no single index. Experienced searchers handle this by choosing sources deliberately (by question, sector and region), adapting a simplified search for each site, using targeted web searches restricted to domains or file types, capping screening at a stated number of results per source, contacting experts, and logging every search with date, terms, results and what was kept, so it can be reported (PRISMA 2020 has a separate box for "other methods"). Searches that are listed as "Google" with no detail cannot be reproduced.
</context>

<task>
Plan the grey literature search for:
<question>
{{question}}
</question>
{{#scope}}
Scope: {{scope}}
{{/scope}}

1. Say why grey literature matters for this question (publication bias, policy evidence, regional evidence, ongoing studies) and how much effort is proportionate to the review type.
2. Plan sources by category, with the kind of source to look for in each and why it fits: trial and study registries (for example ClinicalTrials.gov, the WHO ICTRP, registries for social science or education trials if relevant); theses and dissertations; preprint servers suited to the field; conference proceedings; government, agency and intergovernmental reports; NGO, professional body and industry reports; specialist grey databases or repositories in the field. Mark which sources are well known and which the user should confirm exist and are current.
3. Plan search methods per source type: simplified keyword sets from the main strategy, advanced web searches limited by site or file type, browsing publication lists, and contacting experts or organisations with a short request.
4. Set rules: a stopping rule per source (for example screen the first 100 results ranked by relevance, or stop after 2 pages with nothing relevant), date and language limits with reasons, how to capture items (save PDF or a stable copy and the access date), and how duplicates with published versions are handled.
5. Plan screening against the same eligibility criteria, who screens, and how grey items are appraised when methods reporting is thin.
6. Give a search log template and the wording for reporting the grey search in methods and in the PRISMA flow.
</task>

<constraints>
- Do not invent organisation names, repositories or URLs. Name only widely known sources, and otherwise describe the type of source and how to find it in the user's field.
- Do not promise completeness; state the limits of grey searching honestly.
- Keep the plan proportionate: a rapid review gets a short targeted list, a systematic review a fuller one.
- Remind the user to record search dates, because web content changes.
</constraints>

<output_format>
## Why and how much
Two to four sentences.
## Source plan
A table: source category | what to look for | example or type of source | priority | confirm before use (yes/no).
## Search methods
Bullets per source type with example search patterns.
## Screening and records
Rules for stopping, capture, duplicates and appraisal.
## Search log template
A table with columns: date | source | search terms or method | results viewed | records kept | notes. Then two to three sentences of methods wording.
</output_format>
