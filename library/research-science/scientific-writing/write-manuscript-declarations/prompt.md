---
schema: 1
id: write-manuscript-declarations
kind: prompt
title: Write a manuscript's declarations and end statements
description: Writes a manuscript's ethics approval, consent, funding, competing interests, author contributions (CRediT), acknowledgements and AI-use statements from the facts you supply.
category: scientific-writing
version: 1.0.0
status: incubating
stage: [ship]
role: [researcher, student]
requires: [none]
inputs: [notes, text]
output: [article, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [declarations, competing-interests, credit-taxonomy, ai-disclosure, journal-submission]
pairs_with:
  prompts: [write-data-availability-statement, write-journal-cover-letter, check-manuscript-before-submission]
args:
  - name: facts
    description: Ethics committee name and reference, consent obtained, every funder with grant numbers and their role, each author's financial and non-financial interests, who did what, people to thank, and any use of AI tools and for what.
    type: text
    required: true
  - name: journal
    description: Optional. The journal's required statements and wording, pasted from its author guidelines.
    type: text
output_contract:
  format: markdown
  sections: [Statements, Missing or unclear, Checks before submission]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
End statements look routine but are where submissions are returned and, after publication, where corrections and integrity complaints come from. Points experienced authors know: ethics statements name the committee and approval reference, or state why approval was not needed under the relevant rules, and say how consent was obtained (written, verbal, waived and by whom); funding statements list every funder and grant number and state the funder's role in design, analysis and the decision to publish; competing interests cover financial (employment, consulting, shares, patents, speaker fees) and non-financial interests over the period the journal specifies, and "none" must be true for every author; author contributions increasingly use the CRediT roles (Conceptualization, Methodology, Software, Validation, Formal analysis, Investigation, Resources, Data curation, Writing - original draft, Writing - review and editing, Visualization, Supervision, Project administration, Funding acquisition); acknowledgements need permission from those named; and most publishers now require disclosure of generative AI use in writing or analysis, while not allowing AI tools as authors.
</context>

<task>
Write the declarations from:
<facts>
{{facts}}
</facts>
{{#journal}}
<journal>
{{journal}}
</journal>
{{/journal}}

1. Write each statement under its own heading: Ethics approval, Consent (to participate and, if applicable, for publication), Funding, Competing interests, Author contributions, Acknowledgements, and Use of AI tools. Add others the journal requires.
2. Use the journal's required wording and order if given.
3. For author contributions, map what each author did to CRediT roles using initials, and check every author has at least one role and that roles needed for the study are covered.
4. For competing interests, write one line per author, and use the "no competing interests" form only for authors the facts say have none.
5. For AI use, state the tool, what it was used for and that the authors checked and take responsibility for the output; if no use is reported, ask rather than assume.
6. List missing or unclear facts and the checks to do before submission.
</task>

<constraints>
- State only facts supplied. Never invent approval numbers, grant numbers, funders, interests or contributions; use [MISSING: ...].
- Do not declare "no competing interests" on an author's behalf without that being stated.
- Do not list an AI tool as an author or contributor in CRediT.
- If facts suggest a problem (for example human participants and no ethics approval, or an undeclared industry funder), flag it plainly.
</constraints>

<output_format>
## Statements
Each statement under its heading, ready to paste.
## Missing or unclear
Bullets.
## Checks before submission
Checklist, including confirming each author agrees with their statements and that acknowledged people consented.
</output_format>
