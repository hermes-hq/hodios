---
schema: 1
id: write-methodology-chapter
kind: prompt
title: Write a thesis methodology chapter
description: Writes a thesis or dissertation methodology chapter covering research philosophy, design justification, sampling, data collection, analysis, ethics, rigour and limitations.
category: scientific-writing
version: 1.0.0
status: incubating
stage: [build]
role: [student, researcher]
requires: [none]
inputs: [notes, text]
output: [article, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [thesis, dissertation, research-design, methodology-justification, research-ethics]
pairs_with:
  prompts: [write-methods-section, plan-thesis-structure, write-ethics-application]
  personas: [thesis-advisor, research-methodologist]
args:
  - name: study
    description: Research questions, what you did or will do (design, participants or data, instruments, procedure, analysis), ethics approval, and any problems or changes along the way.
    type: text
    required: true
  - name: requirements
    description: Optional. Degree level, field, word limit for the chapter and any department guidance on what it must contain.
    type: text
output_contract:
  format: markdown
  sections: [Chapter, Justification check, Missing information]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A thesis methodology chapter is not a long journal methods section. A journal methods section lets another researcher replicate the study; a thesis chapter must also show the examiner that the candidate understands why each choice was made and what was given up. Examiners look for: a stated philosophical position or paradigm where the field expects one (common in social sciences and education, less so in lab sciences), a design that follows from the research questions, each choice justified against at least one realistic alternative, sampling and sample size reasoning, transparent data collection and analysis steps, ethics beyond "approval was obtained" (consent, harm, confidentiality, power relations), quality criteria suited to the approach (validity and reliability, or credibility and trustworthiness), and an honest account of limitations and of what changed from the plan. Typical weaknesses: textbook descriptions of paradigms not connected to the study, and listing methods without reasons.
</context>

<task>
Write the methodology chapter for:
<study>
{{study}}
</study>
{{#requirements}}
Requirements: {{requirements}}
{{/requirements}}

1. Open with the research questions and a roadmap of the chapter.
2. If the field expects it, state the research philosophy or paradigm in a short paragraph and connect it directly to the design; if the field does not, skip it and say why.
3. Justify the design (for example experimental, survey, case study, mixed methods, ethnography) from the questions, naming the main alternative and why it was not chosen.
4. Describe setting, population, sampling strategy and sample size reasoning, recruitment and inclusion criteria.
5. Describe data collection instruments and procedures, including piloting and how instruments were developed or validated.
6. Describe analysis step by step, linked to each research question, with software named as given.
7. Write the ethics section: approval (with reference placeholder), consent, confidentiality, data storage, risks and how they were handled, and researcher position where relevant.
8. Address rigour with criteria that match the approach, and state limitations with their likely effect.
9. Report honestly any deviations from the original plan and why.
</task>

<constraints>
- Use only what the author supplied; mark gaps as [MISSING: ...]. Do not invent sample sizes, approval numbers, instrument reliability values or software versions.
- Cite methodological sources only as [CITE: ...] placeholders unless the author gave them.
- Write in the tense that matches the stage: past for completed work, future for a proposal; say which you used.
- Keep paradigm talk short and tied to choices.
</constraints>

<output_format>
## Chapter
The chapter with numbered subheadings.
## Justification check
Table: choice made, reason given, alternative considered.
## Missing information
Each [MISSING] item and why an examiner will ask for it.
</output_format>
