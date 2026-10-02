---
schema: 1
id: write-preregistration
kind: prompt
title: Write a study preregistration
description: Writes a study preregistration with hypotheses, design, sampling plan, variables, exclusion rules and a pre-specified analysis plan, flagging open choices. For OSF or AsPredicted users.
category: research-methods
version: 1.0.0
status: incubating
stage: [plan, design]
role: [researcher, student, data-scientist]
requires: [none]
inputs: [spec, text]
output: [docs, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [preregistration, open-science, osf, aspredicted, analysis-plan, reproducibility]
pairs_with:
  prompts: [design-research-study, write-data-management-plan, write-methods-section]
  personas: [research-methodologist, statistician]
args:
  - name: study
    description: The study design as you have it - question, design, participants, procedure, measures, planned analysis, sample size reasoning, and whether any data already exist.
    type: text
    required: true
  - name: hypotheses
    description: Your hypotheses or predictions, as precisely as you can state them, including direction.
    type: text
    required: true
  - name: template
    description: Which registration format to follow.
    type: enum
    enum: [osf, aspredicted, secondary-data]
    default: osf
output_contract:
  format: markdown
  sections: [Undecided choices, Preregistration, Deviations log]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A preregistration is a time-stamped plan that separates confirmatory tests, decided before seeing the data, from exploratory analysis. It only protects against flexible analysis if it is specific enough that a stranger could run the analysis from it and reach the same decision: the exact variables and how they are computed, the statistical model, the inference criterion, the sample size and stopping rule, how outliers, missing data and exclusions are handled, and what result would count as support or as disconfirmation. Vague preregistrations ("we will use appropriate tests") give a false sense of rigour. The OSF Preregistration template covers study information, design, sampling, variables and the analysis plan; AsPredicted asks nine short questions; secondary-data templates add what the researchers already know about the dataset.
</context>

<task>
Write a {{template}} preregistration for this study.
<study>
{{study}}
</study>
<hypotheses>
{{hypotheses}}
</hypotheses>

1. Rewrite each hypothesis so it is testable: name the variables, the direction, the population, and the specific statistical test that will evaluate it. Split compound hypotheses into separate ones and label each H1, H2, and so on.
2. Find every analysis choice the study description leaves open (for example the covariates, the outlier rule, the handling of missing data, one- or two-tailed tests, the correction for multiple comparisons, the smallest effect size of interest, manipulation checks) and list them first under Undecided choices with options and a recommended default. Draft the plan with your recommendation marked [CONFIRM].
3. Write the preregistration in the structure of the chosen template:
   - osf: study information (title, research questions, hypotheses); design plan (study type, blinding, design, randomisation); sampling plan (existing data, data collection procedures, sample size, sample size rationale, stopping rule); variables (manipulated, measured, indices); analysis plan (statistical models, transformations, inference criteria, data exclusion, missing data, exploratory analyses).
   - aspredicted: whether data have been collected, the main question or hypothesis, the key dependent variable and how it is measured, conditions, the analyses, outliers and exclusions, sample size, anything else, and the type of study.
   - secondary-data: the osf sections plus the dataset's source, what the authors have already seen or analysed in it, and how prior knowledge of the data could bias the plan.
4. For each hypothesis, state the decision rule: what result supports it, what result counts against it, and what result is inconclusive (for example an equivalence test against the smallest effect size of interest).
5. Separate confirmatory from exploratory analyses explicitly.
6. Add a deviations log template for reporting any departures from the plan.
</task>

<constraints>
- Do not invent a sample size, power, effect size or prior result. If the sample size rationale is missing, explain the options (a power analysis with a justified effect size, a precision target, resource constraints) and leave [SAMPLE SIZE RATIONALE] for the user.
- Every variable must have an operational definition: the instrument, items, scoring and the transformation.
- If data already exist or have been looked at, say so honestly in the plan and recommend the secondary-data template; a preregistration written after seeing the results is not a preregistration.
- Keep statistical terms precise. If a planned test does not match the design or the data type, say so and propose an appropriate one.
- Keep AsPredicted answers short, as the format requires; put detail in the osf template only.
</constraints>

<output_format>
## Undecided choices
Table: choice | options | recommended default | why.
## Preregistration
The template's sections in order, with [CONFIRM] markers on recommended choices.
## Deviations log
Empty table: date | planned | actual | reason | effect on conclusions.
</output_format>
