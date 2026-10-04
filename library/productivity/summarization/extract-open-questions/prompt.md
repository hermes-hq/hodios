---
schema: 1
id: extract-open-questions
kind: prompt
title: Extract the open questions in a document
description: Lists the open questions, unknowns and unresolved disagreements a document raises, ranked by how much answering each would matter for what the reader does next.
category: summarization
version: 1.0.0
status: incubating
stage: [discover, review]
role: [researcher, student, product-manager]
requires: [none]
inputs: [document, notes, text]
output: [questions, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [unknowns, research-questions, open-issues, gap-analysis]
pairs_with:
  prompts: [summarize-long-document, find-research-gaps, surface-hidden-assumptions]
args:
  - name: content
    description: The document, report, proposal, meeting notes or paper section to examine.
    type: text
    required: true
  - name: purpose
    description: What you will do next with it, which decides what matters most, for example "decide whether to fund phase 2", "plan my thesis chapter", "prepare questions for the vendor". Default research.
    type: string
    default: research
output_contract:
  format: markdown
  sections: [Top three, Open questions, Disagreements left open, Already settled]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Summaries tell a reader what a document settles. This extraction does the opposite: it lists what the document leaves open, so the reader knows what to find out before acting on it. A useful open question is specific enough that someone could go and answer it; "more research is needed" is not one.

<content>
{{content}}
</content>
Reader's next step: {{purpose}}
</context>

<task>
1. Read the document and note its main claims or proposals.
2. Collect three kinds of open question:
   - **Explicit:** what the document itself calls unknown, uncertain, out of scope, to be decided, or for future work.
   - **Implicit:** gaps a careful reader would notice: a claim resting on an untested assumption, missing data or comparison, an undefined term, a decision with no owner or date, a risk named but not assessed.
   - **Disagreements:** positions in the document that conflict and are not reconciled (between people quoted, between sections, or between the document and sources it cites).
3. Write each as an answerable question: who or what, measured how, by when. Merge near-duplicates.
4. Rate each for **Impact** (how much the answer would change the conclusion or the decision about {{purpose}}: high, medium, low) and **Effort to answer** (low: a question to one person or a document lookup; medium: some analysis or data gathering; high: a study or long investigation).
5. Rank by impact first, then by lower effort. Cap the list at 12; mention how many lower-impact ones you left out.
6. For each, say where it comes from (a short quote or location) and how it could be answered (who to ask, what data, what kind of study).
7. List briefly the questions a reader might think are open but the document does answer, with the location, so they are not re-asked.
8. Before answering, check every question traces to the text and that implicit ones are labelled as your inference.
</task>

<constraints>
- Ground every question in the document. Do not raise questions from general knowledge of the topic that the document gives no hook for.
- No generic questions ("What are the risks?"). Name the specific risk, number or decision.
- Do not answer the questions from outside knowledge; that is the reader's next step.
- If the document is too short or too vague to examine, say so and ask for the full text.
</constraints>

<output_format>
## Top three
Numbered: the question, then one line on why it matters for the reader's next step.
## Open questions
Table: # | Question | Type (explicit, implicit, disagreement) | Impact | Effort | Comes from | How to answer it.
## Disagreements left open
Bullets: who or which section holds each side, with short quotes.
## Already settled
Bullets: the question and where the document answers it.
</output_format>
