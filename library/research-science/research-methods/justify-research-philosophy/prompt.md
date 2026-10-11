---
schema: 1
id: justify-research-philosophy
kind: prompt
title: Justify your research philosophy
description: Helps a student choose and justify an ontology, epistemology and paradigm such as positivism, interpretivism or pragmatism for their study, with text for the methodology chapter.
category: research-methods
version: 1.0.0
status: incubating
stage: [plan, design]
role: [student, researcher]
requires: [none]
inputs: [text]
output: [explanation, rewrite]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
subject: [social-sciences]
tags: [ontology, epistemology, research-paradigm, methodology-chapter, dissertation, interpretivism, pragmatism]
pairs_with:
  prompts: [design-research-study, write-methods-section, write-positionality-statement]
  personas: [research-methodologist, thesis-advisor]
args:
  - name: study
    description: Your research questions, the methods you plan or have used, and what your programme or supervisor expects in the methodology chapter.
    type: text
    required: true
  - name: word_limit
    description: Roughly how many words the philosophy section should be.
    type: text
output_contract:
  format: markdown
  sections: [What your study implies, Recommended position, Draft section, Pitfalls to avoid]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Methodology chapters in business, education, health and social science are expected to state a research philosophy, and students often pick one from a textbook diagram (the "research onion" is common) and then contradict it. The position should follow from the questions and the kind of knowledge claimed, not the other way round. Positivism and post-positivism assume a reality that can be measured and aim for generalisable explanation; interpretivism and constructivism treat reality as constructed in meaning and aim for understanding of particular contexts; critical realism holds a real world with mechanisms that are only partly observable; pragmatism chooses methods by what answers the question and is the usual home of mixed methods; critical and transformative paradigms foreground power and change. Examiners look for consistency: the stated ontology and epistemology must match the questions, the sampling logic, the role of the researcher, the quality criteria (validity and reliability versus trustworthiness) and the claims made in the conclusion.
</context>

<task>
Help me choose and justify a research philosophy for:
<study>
{{study}}
</study>
{{#word_limit}}
Target length: {{word_limit}} words.
{{/word_limit}}

1. Read what the questions imply: what kind of knowledge they seek (measurement, explanation, meaning, mechanism, change), and what the planned methods already assume.
2. Compare the two or three paradigms that plausibly fit, with what each would mean for this study's role of the researcher, sampling, data, analysis and quality criteria.
3. Recommend one position, and state its ontology, epistemology, axiology (role of values) and the methodology it leads to, in plain words first and then in the technical terms.
4. Point out any contradiction between the recommended position and the planned methods or wording (for example "generalise" in an interpretivist study, or "uncover the truth of participants' experience"), and how to fix it.
5. Draft the section for the methodology chapter, written in a careful academic register, with [cite: ...] placeholders for key methodological sources rather than invented references.
6. List the pitfalls examiners commonly pick up for this position.
</task>

<constraints>
- Do not invent citations; use placeholders and name well-known authors only as suggestions to look up, marked as such.
- Do not present one paradigm as superior in general; justify the fit to this study.
- If the programme's expected framework is named (for example the research onion), map to it, but do not force a position the questions do not support.
- Keep jargon defined on first use.
</constraints>

<output_format>
## What your study implies
Bullets on the knowledge sought and assumptions already in the methods.
## Recommended position
A table comparing the fitting paradigms, then the recommendation with ontology, epistemology, axiology and methodology.
## Draft section
Ready-to-edit prose with placeholders.
## Pitfalls to avoid
Bullets, including any contradictions found in the user's plan.
</output_format>
