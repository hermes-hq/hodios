---
schema: 1
id: write-critically-appraised-topic
kind: prompt
title: Write a critically appraised topic (CAT)
description: Answers a focused clinical or practice question as a one-page critically appraised topic with the PICO question, search, best evidence, appraisal, bottom line and level of evidence.
category: literature-review
version: 1.0.0
status: incubating
stage: [review, build]
role: [student, researcher]
subject: [healthcare]
requires: [none]
inputs: [document, notes]
output: [report, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [evidence-based-practice, cat, pico, critical-appraisal, clinical-question]
pairs_with:
  prompts: [appraise-study-quality, build-search-string, assess-study-applicability]
  personas: [research-methodologist]
args:
  - name: question
    description: The practice question, as you would ask it at work, for example "Do silver dressings heal venous leg ulcers faster than plain dressings?"
    type: text
    required: true
  - name: evidence
    description: The studies or reviews you found, with full text or at least methods and results. Without it you get a search plan and a CAT template, not a bottom line.
    type: text
  - name: search_done
    description: What you searched, for example "PubMed and CINAHL, 2015-2025, terms ...", so it can be reported.
    type: text
  - name: setting
    description: Your profession and setting, for example "community nursing, UK" or "outpatient physiotherapy, Brazil".
    type: string
output_contract:
  format: markdown
  sections: [Clinical bottom line, Question, Search, Evidence summary, Appraisal, Applicability, Level of evidence and review date]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A critically appraised topic is a short, structured answer to one focused question from practice, built on the best available evidence rather than all of it. It is standard in nursing, allied health, medicine and increasingly education and social work programmes. The method is fixed: frame the question (PICO: population, intervention or exposure, comparison, outcome), search for the highest level of evidence suited to the question type (a recent systematic review for therapy questions, cross-sectional accuracy studies for diagnosis, cohorts for prognosis and harm), appraise the one to three best sources with a design-appropriate checklist, then state a clinical bottom line with its level of evidence and a date to review it. Weak CATs answer a fuzzy question, use whatever they found first instead of the best design for the question type, report relative effects without absolute numbers, and write a bottom line stronger than the evidence.
</context>

<task>
Write a critically appraised topic for this question:
<question>
{{question}}
</question>
{{#setting}}Setting: {{setting}}{{/setting}}
{{#search_done}}
Search done:
{{search_done}}
{{/search_done}}
{{#evidence}}
<evidence>
{{evidence}}
</evidence>
{{/evidence}}

1. Rewrite the question in PICO form and name its type (therapy or prevention, diagnosis, prognosis, harm or aetiology, experience) and the best study design for that type.
2. Search: if a search is given, summarise it. If not, give a reproducible search plan: databases suited to the profession, PICO-based terms and filters, and where to look first for pre-appraised evidence (systematic review collections and guideline bodies).
3. If no evidence is given, stop after the search plan, provide the CAT template with the remaining sections empty, and say what to bring back.
4. If evidence is given, choose the best one to three sources for the question type and say why others were set aside.
5. Summarise each chosen source: design, participants, intervention and comparator, outcomes and main results with numbers as reported. Where a baseline risk is given, add absolute differences and number needed to treat, with the calculation.
6. Appraise each with a checklist suited to its design (for example CASP, JBI or the CEBM worksheets), giving the main validity issues and how they affect trust in the result.
7. Judge applicability to the setting.
8. Write the clinical bottom line in one or two sentences, at the strength the evidence allows, with the level of evidence (state the scheme used, for example Oxford CEBM 2011) and a review date (usually one to two years, sooner in fast-moving areas).
</task>

<constraints>
- Use only the evidence text provided for results and appraisal. Do not add trials, figures or reviews from memory; if you think a key source is missing, say what kind and how to find it, marked "(verify)".
- The bottom line must not exceed the evidence: say "insufficient evidence" or "evidence of low certainty" when that is the honest answer.
- A CAT informs practice; it is not individual patient advice. Note that local guidelines, patient preferences and professional judgement also apply.
- State which level-of-evidence scheme you used, since schemes differ.
- Keep the whole CAT to about one page (500 to 800 words) unless the brief says otherwise.
</constraints>

<output_format>
## Clinical bottom line
One or two sentences, at the top.
## Question
PICO table and question type.
## Search
The search done or the plan, in a short table or code block.
## Evidence summary
Table: source | design | participants | intervention vs comparator | outcome | result as reported.
## Appraisal
Bullets per source: strengths, main validity issues, effect on trust.
## Applicability
Two or three sentences for the setting.
## Level of evidence and review date
Scheme, level, review date, appraiser initials placeholder.
</output_format>
