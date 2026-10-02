---
schema: 1
id: write-data-management-plan
kind: prompt
title: Write a data management plan
description: Writes a research data management plan covering data types, storage, security, metadata, sharing, retention and FAIR principles, matched to the funder's template. For grant applicants.
category: research-methods
version: 1.0.0
status: incubating
stage: [plan]
role: [researcher, data-scientist]
requires: [none]
inputs: [spec, notes]
output: [docs, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: intermediate
tags: [dmp, fair-data, open-data, data-sharing, data-repository, research-data]
pairs_with:
  prompts: [write-ethics-application, write-research-proposal, write-preregistration]
  workflows: [grant-proposal-track]
args:
  - name: project
    description: The project in brief - aims, methods, partners, duration, and whether it involves people, animals, commercial partners or sensitive locations.
    type: text
    required: true
  - name: funder
    description: The funder or template, for example "Horizon Europe", "NIH DMS Plan", "NSF", "UKRI", "Wellcome", or "institutional". Paste the template headings if you have them.
    type: string
  - name: data_types
    description: The data you will create or reuse - kinds (surveys, interviews, images, sequences, code, models), formats, rough volumes, and any personal or sensitive data.
    type: text
output_contract:
  format: markdown
  sections: [Template used, Data management plan, Costs and resources, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A data management plan (DMP) says what data a project will produce, how they will be documented, stored and protected during the project, and how they will be shared and preserved afterwards. Funders score DMPs on specifics: named formats, metadata standards, repositories, licences, access conditions, retention periods, responsibilities and costs. Vague promises ("data will be stored securely and shared where possible") are the most common weakness. The FAIR principles (findable, accessible, interoperable, reusable) mean persistent identifiers, rich metadata, open or well-documented formats, clear licences and access conditions, not that every dataset must be open: "as open as possible, as closed as necessary". Templates differ: Horizon Europe uses a FAIR-structured template, the NIH Data Management and Sharing Plan has six elements, NSF asks for a short plan, and many funders and institutions follow the Science Europe core requirements.
</context>

<task>
Write a data management plan.
<project>
{{project}}
</project>
{{#funder}}Funder or template: {{funder}}{{/funder}}
{{#data_types}}
<data_types>
{{data_types}}
</data_types>
{{/data_types}}

1. Choose the structure: the pasted template headings if given; otherwise the named funder's template as you know it, flagged "check against the current template", since templates change; otherwise the six Science Europe core requirements (data description and collection or reuse; documentation and data quality; storage and backup during the project; legal and ethical requirements; data sharing and long-term preservation; responsibilities and resources).
2. Data description: a table of each dataset with source (new or reused), type, format during the project and for sharing (prefer open, non-proprietary formats), estimated volume, and whether it contains personal, sensitive or commercially confidential information.
3. Documentation and quality: metadata standard suited to the discipline (for example DDI for social science, Darwin Core for biodiversity, DICOM for imaging, or a general one such as DataCite when no community standard exists), README and codebook contents, file naming and versioning, and quality-control steps.
4. Storage and security during the project: where data live, backup (for example three copies on two media with one off-site), access control, encryption for personal data, and transfer between partners.
5. Legal and ethical: consent covering sharing and reuse, anonymisation or pseudonymisation, the applicable data-protection law and lawful basis as a placeholder for the data-protection officer to confirm, intellectual property, ownership and any restrictions from partners.
6. Sharing and preservation: which data are shared and which are not (with reasons), the repository (prefer a trusted discipline-specific repository, otherwise a general one such as Zenodo, Dryad, Figshare or an institutional repository), persistent identifiers, licence (for example CC BY 4.0 or CC0 for data, an open-source licence for code), access conditions for restricted data, timing (at publication or by end of project) and retention period.
7. Responsibilities and resources: who does what, and costs (storage, curation time, repository fees, anonymisation), which many funders allow in the budget.
</task>

<constraints>
- Be specific: name formats, standards, repositories and licences, and give a reason when you choose. If you are not sure a repository accepts this data type or a standard fits the discipline, say "confirm with the repository" rather than assert it.
- Do not invent institutional systems, retention periods or policies. Use placeholders such as [INSTITUTIONAL STORAGE] and [RETENTION PER INSTITUTIONAL POLICY] and list them under Open questions.
- Do not promise open sharing of data the participants did not consent to share, or that partners own. Explain the restricted-access route instead.
- Respect the template's length limit if one is given (for example NSF's two pages).
- If key facts are missing (what data, whether people are involved), ask for them in Open questions and draft the rest with placeholders.
</constraints>

<output_format>
## Template used
One line, and any "check against the current template" note.
## Data management plan
Under the template's headings, with the dataset table in the data description section.
## Costs and resources
Table: item | estimate or placeholder | justification.
## Open questions
Every placeholder and who can answer it (data steward, data-protection officer, repository, partner).
</output_format>
