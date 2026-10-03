---
schema: 1
id: write-systematic-review-protocol
kind: prompt
title: Write a systematic review protocol
description: Writes a PROSPERO-style systematic review protocol with the question, eligibility criteria, search, screening, extraction, risk of bias and synthesis plan, following PRISMA-P. For review teams.
category: literature-review
version: 1.1.0
status: incubating
stage: [plan, design]
role: [researcher, student]
requires: [none]
inputs: [topic, text]
output: [docs, plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [systematic-review, prisma-p, prospero, review-protocol, eligibility-criteria, evidence-synthesis]
pairs_with:
  prompts: [build-search-string, screen-studies, appraise-study-quality, extract-data-for-meta-analysis, plan-meta-analysis]
  personas: [research-librarian, research-methodologist]
args:
  - name: review_question
    description: The question the review should answer, with any decisions already made about population, interventions or exposures, outcomes, study designs, dates or languages.
    type: text
    required: true
  - name: field
    description: The discipline, for example "clinical medicine", "education", "software engineering". It decides databases, risk-of-bias tools and the registry.
    type: string
output_contract:
  format: markdown
  sections: [Before you start, Protocol, Registration notes, Open decisions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.1.0, note: "Adds scoping-review handling: PRISMA-ScR and JBI guidance, data charting instead of risk of bias and certainty rating, and OSF registration."}
  - {version: 1.0.0, note: "First version."}
---
<context>
A protocol fixes the review's methods before the team sees the results, which is what protects a systematic review from selective inclusion and outcome switching. Good protocols follow PRISMA-P and are registered (PROSPERO for reviews with a health-related outcome; otherwise a registry such as OSF Registries or a field-specific one). Reviewers and registries look for an answerable question, eligibility criteria that two people would apply the same way, a reproducible multi-source search, duplicate independent screening and extraction, a risk-of-bias tool that matches the included designs, a synthesis plan that says what happens if pooling is not appropriate, and a plan for rating certainty.
</context>

<task>
Write a protocol for this review.
<review_question>
{{review_question}}
</review_question>
{{#field}}Field: {{field}}{{/field}}

First check the question. If it is too broad to review systematically (no defined population, intervention or exposure, or outcome), propose two or three narrower versions, recommend one, and write the protocol for that one with the choice stated as an open decision.

Then write the protocol sections:
1. Title, and the review type (intervention, exposure, prognostic, diagnostic accuracy, qualitative evidence synthesis, or scoping review if the aim is mapping rather than answering).
2. Rationale: why the review is needed, with [CITE] placeholders for claims, and a reminder to search for existing and ongoing reviews before going further.
3. Objectives and the structured question (PICO, PECO, PIRD, SPIDER or PCC, whichever fits).
4. Eligibility criteria for each element plus study designs, setting, publication status, language and dates, each with a reason; list clear exclusions.
5. Information sources: bibliographic databases suited to the field, trial or study registries, grey literature, preprint servers, citation searching and contacting authors.
6. Search strategy: a draft strategy for one main database with concept blocks, free-text terms and controlled vocabulary placeholders, a plan for peer review of the search (PRESS) and for translating it to other databases.
7. Study selection: two independent reviewers at title-abstract and full-text stages, a pilot on a sample to calibrate, how disagreements are resolved, and the flow diagram.
8. Data extraction: the items to extract, piloting the form, duplicate extraction, and contacting authors for missing data.
9. Outcomes: primary and secondary, with time points and how they are measured, and the effect measure for each.
10. Risk of bias: the tool for each design (for example RoB 2 for randomised trials, ROBINS-I or ROBINS-E for non-randomised studies, QUADAS-2 for diagnostic accuracy, CASP or JBI for qualitative), done in duplicate.
11. Synthesis: criteria for meta-analysis, the model and heterogeneity plan, pre-specified subgroups and sensitivity analyses, publication-bias assessment if enough studies, and a structured narrative synthesis (SWiM) if pooling is not appropriate.
12. Certainty of evidence (GRADE or CERQual) and how findings will be summarised.
13. Amendments, timeline and roles.

For a scoping review, follow PRISMA-ScR and JBI scoping guidance instead: use PCC, replace steps 10 to 12 with data charting and a descriptive or thematic summary, say that critical appraisal and certainty rating are usually not done (or why this review does them), and register on OSF rather than PROSPERO.
</task>

<constraints>
- Do not invent existing reviews, studies, databases' subject headings or registration numbers. Use placeholders such as [MeSH TERM TO CONFIRM] and [PROSPERO ID].
- Every methodological choice should be specific enough for another team to repeat it, and justified in one line.
- Keep the protocol about methods: no expected results.
- Name the registry that fits the field and say if PROSPERO would not accept it.
</constraints>

<output_format>
## Before you start
The question check, narrowing if needed, and the search for existing reviews to run first.
## Protocol
Numbered PRISMA-P sections as above, with a table for eligibility criteria (element | include | exclude | reason) and the draft search in a code block.
## Registration notes
Which registry, and the fields that map from this protocol.
## Open decisions
Choices the team must make, with the options.
</output_format>
