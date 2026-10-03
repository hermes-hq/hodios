---
schema: 1
id: turn-thesis-chapter-into-paper
kind: prompt
title: Turn a thesis chapter into a paper
description: Plans how to turn a thesis chapter into a journal article, deciding the paper's single message, what to cut, how to reframe for a journal audience, and the fit with a target journal.
category: scientific-writing
version: 1.0.0
status: incubating
stage: [plan]
role: [student, researcher]
requires: [none]
inputs: [document, text]
output: [plan, outline]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [thesis-to-article, manuscript, journal-submission, early-career-researchers, dissertation]
pairs_with:
  prompts: [choose-target-journal, write-abstract, write-introduction-section, write-journal-cover-letter]
  personas: [thesis-advisor, academic-writing-coach]
  workflows: [paper-writing-track]
args:
  - name: chapter
    description: The chapter text, or its outline with the main arguments, methods and results, plus its word count and how it relates to the other chapters.
    type: text
    required: true
  - name: target_journal
    description: The journal you have in mind, with its article type and word limit if known. If empty, the plan describes the kind of journal that fits.
    type: string
output_contract:
  format: markdown
  sections: [The paper's message, Keep cut and move, New structure, Journal fit, Revision plan, Things to check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A thesis chapter and a journal article have different readers and different jobs. The chapter shows examiners that the candidate knows the field and did everything carefully, so it is long, exhaustive and leans on other chapters. The article must make one point to busy specialists in a few thousand words, stand alone, and fit a journal's conversation. Converting means choosing a single message, cutting most of the literature review and method justification, moving detail to supplementary material, writing a new introduction aimed at the journal's readers, and reframing the contribution. The common mistake is trimming sentences across the whole chapter instead of rebuilding it around the message.
</context>

<task>
Plan the conversion of this chapter into a journal article.
<chapter>
{{chapter}}
</chapter>
{{#target_journal}}Target journal: {{target_journal}}{{/target_journal}}

1. Find the publishable message: write the paper's central claim in one sentence and the two or three findings that support it. If the chapter holds more than one paper, say so, propose the split, and plan the strongest one.
2. Decide what to keep, cut, condense or move to supplementary material: literature review, theory, methods detail, results, and discussion. Note anything that depends on other chapters and how to make the paper self-contained.
3. Propose the article's structure with a target word count for each section that fits the journal's limit (or about 7,000 to 8,000 words for a typical social science article and 3,500 to 5,000 for many science journals, labelled as assumptions).
4. Reframe the contribution for the journal's readers: the gap the paper fills in their conversation, the opening problem for the introduction, and the angle that makes it more than "part of my thesis".
5. Assess journal fit: scope, article type, methods and length norms, and what to check in recent issues. Without a target, describe two kinds of suitable venue.
6. Write a revision plan in order, with realistic effort for each step.
7. Flag what to check: the university's rules on publishing thesis material before or after examination, self-plagiarism and text recycling (disclose in the cover letter that the paper derives from a thesis), co-authorship with supervisors, and embargo or repository versions.
</task>

<constraints>
- If the chapter text or outline is missing or too thin to find a message, say what you need and stop.
- Do not rewrite the chapter here; plan the conversion so the author does the writing.
- Do not invent journal policies, word limits or impact metrics; mark assumptions and tell the author what to look up.
- The message must be supported by results in the chapter; do not overstate the contribution to make it more publishable.
</constraints>

<output_format>
## The paper's message
The one-sentence claim, the supporting findings, and the split if more than one paper is here.
## Keep cut and move
A table: chapter part | words now | action (keep, condense, cut, supplement) | words in paper | reason.
## New structure
Section headings with target word counts and the point of each section.
## Journal fit
Fit assessment and what to verify.
## Revision plan
Numbered steps with effort.
## Things to check
Institutional, ethical and authorship points.
</output_format>
