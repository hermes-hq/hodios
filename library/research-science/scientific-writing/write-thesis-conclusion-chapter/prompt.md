---
schema: 1
id: write-thesis-conclusion-chapter
kind: prompt
title: Write a thesis conclusion chapter
description: Writes a thesis or dissertation conclusion chapter that answers each research question, states the original contributions, implications, limitations and future work across the whole thesis.
category: scientific-writing
version: 1.0.0
status: incubating
stage: [build]
role: [student, researcher]
requires: [none]
inputs: [notes, document, text]
output: [article]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [thesis, dissertation, original-contribution, phd, viva]
pairs_with:
  prompts: [write-discussion-section, plan-thesis-structure]
  personas: [thesis-advisor]
  workflows: [thesis-track]
args:
  - name: thesis
    description: The research questions or aims, a summary of each chapter's main findings, and what you believe the contributions are.
    type: text
    required: true
  - name: requirements
    description: Optional. Degree level, field, word limit, and whether the thesis is a monograph or thesis by publication.
    type: text
output_contract:
  format: markdown
  sections: [Chapter, Contribution check, Viva questions this invites]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Examiners often read the introduction and conclusion first to decide what the thesis claims. A conclusion chapter is not a summary of each chapter in turn, and not another discussion. It answers each research question directly, synthesises findings across chapters (what they mean together that no single chapter shows), and states the original contribution to knowledge in specific terms: what is now known, what method or framework now exists, what evidence now settles or reopens a debate. It then gives implications for theory, practice or policy that the evidence supports, limitations of the thesis as a whole, and future research that follows from those limitations. Weak conclusions repeat abstracts chapter by chapter, introduce new data or literature, inflate contributions ("this thesis revolutionises"), or list future work disconnected from what was found. In a thesis by publication, the conclusion carries the burden of showing the papers form one coherent body of work.
</context>

<task>
Write the conclusion chapter from:
<thesis>
{{thesis}}
</thesis>
{{#requirements}}
Requirements: {{requirements}}
{{/requirements}}

1. Open by restating the problem and aims in two or three sentences.
2. Answer each research question in turn, directly and briefly, citing the chapter that provides the evidence.
3. Write a synthesis section that connects findings across chapters, including tensions between them.
4. State the contributions to knowledge as numbered, specific claims (empirical, theoretical, methodological, practical as applicable), each tied to evidence in the thesis.
5. Give implications for theory, practice or policy at the strength the evidence supports.
6. State limitations of the thesis as a whole, not a repeat of each chapter's limitations.
7. Propose future research that follows from specific findings and limitations.
8. Close with a short final paragraph that returns to the opening problem.
</task>

<constraints>
- No new data, analyses or literature not already in the material; mark any needed citation as [CITE: ...].
- Contribution claims must be specific and supportable; avoid "first", "groundbreaking" or "revolutionary" unless the author has clear evidence and flag them for checking.
- Do not answer a research question more strongly than the chapter summary supports; if a question was only partly answered, say so.
- Keep the chapter proportionate: typically shorter than any empirical chapter unless requirements say otherwise.
</constraints>

<output_format>
## Chapter
The chapter with subheadings.
## Contribution check
Table: contribution claim, evidence chapter, strength (strong, moderate, tentative).
## Viva questions this invites
Bullets of likely examiner questions arising from the claims.
</output_format>
