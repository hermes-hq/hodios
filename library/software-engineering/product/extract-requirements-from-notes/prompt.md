---
schema: 1
id: extract-requirements-from-notes
kind: prompt
title: Extract requirements from meeting notes
description: Extracts draft requirements from stakeholder meeting notes or transcripts, tying each to who said it, separating decisions from wishes, and listing conflicts and open questions.
category: product
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [business-analyst, product-manager, project-manager]
stack: []
requires: [none]
inputs: [notes, transcript, text]
output: [table, questions, summary]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [requirements-elicitation, stakeholders, meeting-notes, requirements]
pairs_with:
  prompts: [write-prd, write-user-stories, write-project-glossary]
args:
  - name: notes
    description: Meeting notes or a transcript from requirement or stakeholder sessions; several meetings can be pasted with dates.
    type: text
    required: true
  - name: project_context
    description: What the project is and what is already agreed, so repeats and changes can be spotted.
    type: text
output_contract:
  format: markdown
  sections: [Draft requirements, Decisions recorded, Wishes and ideas, Conflicts, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Requirement meetings produce notes full of mixed material: firm decisions, one person's wish, a solution proposed before the problem was clear, a complaint about the current system, and a number someone half-remembered. Turning that into requirements goes wrong when every sentence becomes a "must", when the speaker is lost so nobody knows whom to ask, or when two stakeholders who said opposite things both end up in the spec. A careful analyst keeps the source of every item, rewrites solutions back into the underlying need while preserving the suggestion, labels confidence, and turns gaps and disagreements into questions for the next session instead of resolving them alone.
</context>

<task>
<notes>
{{notes}}
</notes>
{{#project_context}}
<project_context>
{{project_context}}
</project_context>
{{/project_context}}

1. Read all notes and identify the speakers or roles, dates and topics.
2. Extract draft requirements as single, testable statements of need ("[role] needs to [capability] so that [outcome]" or "The system must..."), each with the speaker, the date and a short supporting quote.
3. Where a speaker proposed a solution, record the underlying need as the requirement and keep the proposed solution as a note.
4. Separate decisions that were explicitly agreed (and by whom) from wishes, ideas and complaints; label each requirement firm, tentative or wish.
5. List conflicts: different stakeholders, or the same one at different dates, saying incompatible things; quote both sides.
6. List open questions: missing numbers, undefined terms, unclear owners, assumptions that need checking, each addressed to the person best placed to answer.
</task>

<constraints>
- Every requirement must trace to text in the notes; do not add requirements the notes do not support.
- Do not resolve conflicts or upgrade a wish to a decision; record them for the stakeholders.
- Keep names exactly as written in the notes; if notes use initials, keep the initials.
- Numbers mentioned vaguely ("around a thousand", "fast") stay vague and become open questions.
- If the notes contain no requirement content, say so briefly.
</constraints>

<output_format>
## Draft requirements
Table: ID, requirement, label (firm / tentative / wish), source (speaker, date), quote, proposed solution if any.
## Decisions recorded
Bullets: decision, who agreed, date.
## Wishes and ideas
Bullets with source.
## Conflicts
Numbered, with both quotes.
## Open questions
Numbered: question, addressed to.
</output_format>
