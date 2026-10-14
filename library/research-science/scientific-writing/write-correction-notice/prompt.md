---
schema: 1
id: write-correction-notice
kind: prompt
title: Write a correction request for a published paper
description: Helps authors who found an error in their published paper judge whether it needs a correction, an expression of concern or a retraction, and write the notice and the letter to the editor.
category: scientific-writing
version: 1.0.0
status: incubating
stage: [maintain]
role: [researcher]
requires: [none]
inputs: [text]
output: [message, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [erratum, corrigendum, publication-ethics, research-integrity, journal-correspondence]
pairs_with:
  prompts: [respond-to-reviewers, write-results-section]
  personas: [academic-writing-coach]
args:
  - name: paper
    description: The paper's citation, the passage, table or figure with the error, and what it should say.
    type: text
    required: true
  - name: impact
    description: How the error arose and whether it changes any result, conclusion, figure or the abstract, and whether all co-authors know.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What kind of notice, Correction notice text, Letter to the editor, Before you send]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Finding an error in your own published paper is common, and reporting it promptly is what integrity requires. Journals following COPE guidance distinguish: a correction (erratum for publisher errors, corrigendum for author errors) when a small part of an otherwise reliable paper is wrong and the conclusions stand; a retraction when findings are unreliable (major error, unreproducible results) or there is misconduct, which authors can request themselves, sometimes as a "retraction and replacement" if the corrected work is still sound; and an expression of concern, issued by editors when an investigation is pending. A good correction notice is short and factual: what was wrong, where, what it should be, and whether conclusions change, with no blame or excuses. The covering letter tells the editor how the error was found, what was rechecked, and that all authors agree. Authors often understate the impact to avoid retraction, which tends to come out later and cost more.
</context>

<task>
Prepare a correction request for:
<paper>
{{paper}}
</paper>
<impact>
{{impact}}
</impact>

1. Judge the appropriate route (correction, retraction and replacement, or retraction) against the impact described, with the reasoning, and say what would change the judgement. Say if the information is not enough to decide.
2. Write the correction notice text in the usual journal form: the citation, the location of the error, the original and corrected text or values, and one sentence on whether the conclusions are affected.
3. Write a letter to the editor: what happened, how it was found, what was rechecked (other analyses, data, figures), the requested route, confirmation that all authors agree (or a note to obtain it), and an offer to provide data or code.
4. List what to do before sending: recheck all related numbers including the abstract and supplements, get every co-author's agreement, and check the journal's correction policy and any form it requires.
</task>

<constraints>
- Do not minimise the impact; if the corrected values change a conclusion, say the notice must state it.
- Use only the facts supplied; do not invent values, page numbers or the journal's procedures.
- Keep the notice neutral and short, with no attribution of blame.
- If the user describes possible misconduct by someone, advise contacting the journal and the institution's research integrity office rather than drafting accusations.
</constraints>

<output_format>
## What kind of notice
The recommendation and reasoning.
## Correction notice text
The draft notice.
## Letter to the editor
The draft letter.
## Before you send
A checklist.
</output_format>
