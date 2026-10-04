---
schema: 1
id: practise-peer-review
kind: prompt
title: Practise writing your first peer review
description: Coaches an early-career researcher through writing a peer review of a manuscript, asking for their assessment section by section and critiquing the review they write rather than writing it for them.
category: peer-review
version: 1.0.0
status: incubating
stage: [learn, review]
role: [researcher, student]
requires: [none]
inputs: [document]
output: [conversation, questions, explanation]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [refereeing, early-career, reviewer-training, critical-appraisal, coaching]
pairs_with:
  prompts: [write-peer-review, appraise-study-quality, read-paper-with-me]
  personas: [peer-reviewer, research-methodologist]
args:
  - name: manuscript
    description: The manuscript to practise on, ideally full text; at least the abstract, methods and results. A published paper or a preprint is the safest choice.
    type: text
    required: true
  - name: field
    description: The research field, for example "clinical epidemiology", "condensed matter physics" or "qualitative education research". Sets the standards and reporting guidelines used.
    type: string
    required: true
  - name: journal_type
    description: The kind of journal to review for, which sets the bar for novelty and scope, for example "general", "high-selectivity general science", "specialist society journal" or "sound-science megajournal".
    type: string
    default: general
output_contract:
  format: markdown
  sections: [Before we start, Your turn, Feedback on your review]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
New reviewers learn by writing reviews and getting feedback on them, not by reading a model review. Common first-review mistakes: summarising instead of evaluating, nitpicking style while missing a design flaw, asking for a different study, mixing major and minor issues, making demands without saying why, an unkind or sarcastic tone, and a recommendation that does not follow from the comments. A good coach asks the trainee to commit to their own judgement first, then shows what a seasoned reviewer would also look at, and critiques the review as a piece of writing. Real manuscripts under review are confidential, and many journals forbid uploading them to AI tools.
</context>

<task>
Coach me through writing a peer review of this {{field}} manuscript for a {{journal_type}} journal.

<manuscript>
{{manuscript}}
</manuscript>

This is a conversation. Ask, wait for my answer, then give feedback. Never write a section of the review for me before I have tried it.

First turn (Before we start):
1. Remind me in one or two sentences that a manuscript I received as a reviewer is confidential and may not be shared with AI tools under many journals' policies, and that practising on a published paper, a preprint or my own draft avoids the problem. If the text looks like a confidential submission, ask me to confirm I am allowed to use it before continuing.
2. Explain in three lines what an editor wants from a review: an assessment of whether the conclusions follow from the evidence, the most important problems ranked, and a recommendation that follows.
3. Ask me for my two- or three-sentence summary of what the paper claims and how. Stop.

Then work through these stages, one per turn, in this order: summary of claims; importance and fit for the journal type; methods and design; results and statistics; interpretation and limitations; presentation and reporting (including the reporting guideline usual in {{field}}). For each stage:
4. Ask one or two focused questions that prompt my own assessment (for example "What would you need to see to believe the main effect is not confounded by age?").
5. When I answer, say what I got right, then name what an experienced reviewer would also check here and why, phrased as a question I can investigate rather than a ready-made verdict.
6. Ask me to turn my points into review comments, then critique the comments for specificity, evidence, actionability, tone and whether each is major or minor.

Final stage: ask me to assemble the full review and a recommendation. Then give Feedback on your review: a scorecard (accuracy of the summary, depth on methods, ranking of issues, actionability, tone, recommendation consistent with the comments), the three changes that would most improve it, and one strength to keep.
</task>

<constraints>
- Keep each turn short enough to read in two minutes, and end every turn with a question or task for me.
- Work only from the manuscript text. If a section, figure or table is missing, say so instead of guessing what it contains.
- Hold the paper to the standards of {{field}}; if you are unsure of a field convention, say so.
- Push back if my criticism asks for a different study, is unfair, or is unsupported; explain how to rephrase it as a fair comment.
- If I ask you to just write the review, explain that the point is to practise, and offer a smaller step instead (for example, one model comment for comparison after I write mine).
- Do not invent references, statistics or quotes.
</constraints>

<output_format>
## Before we start
First turn only.
## Your turn
Each turn: brief feedback on my last answer, what an experienced reviewer would also check, then the next question or task.
## Feedback on your review
Final turn only: the scorecard as a table (Criterion | Rating 1-5 | Why), three improvements, one strength.
</output_format>
