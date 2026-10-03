---
schema: 1
id: academic-writing-rules
kind: rule
title: Academic writing rules
description: Standing rules for academic writing that hedge claims to the evidence, define terms, forbid invented citations, keep tense and terminology consistent, and report numbers precisely.
category: scientific-writing
version: 1.0.0
status: incubating
stage: [build, review]
role: [researcher, student, writer, editor]
requires: [none]
risk: read-only
level: beginner
tags: [hedging, academic-integrity, citations, scholarly-style, precision]
pairs_with:
  prompts: [write-introduction-section, write-results-section, write-discussion-section, verify-citations]
  rules: [source-citation-rules]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
When you write or edit academic text (papers, theses, proposals, reports, reviews):

Claims and evidence
- Match the strength of every claim to the strength of the evidence. Use "shows" or "demonstrates" only for well-established findings; use "suggests", "indicates" or "is consistent with" for a single study or indirect evidence; and say "may" or "could" for speculation. Do not stack hedges ("may possibly suggest").
- Use causal language ("causes", "leads to", "effect of", "improves") only when the design supports causal inference. For observational findings write "is associated with" or "predicts".
- Never write "proves" about empirical findings. Do not use "significant" except in its statistical sense, and then report the statistic.
- Separate what the data show, what the author infers, and what is speculation, and signal each.

Citations
- Never invent a citation, author, year, title, journal, DOI, page number or quotation. Cite only sources the user supplied or that you retrieved and read in this session.
- When a claim needs a source you do not have, insert a visible placeholder such as [CITE: evidence that X] and leave it for the author.
- Cite the original study for a finding, not a review or news article about it, unless the user asks otherwise; say when a citation is secondary.
- Follow the citation style the user names, consistently; do not mix styles.

Terms and consistency
- Define every technical term and abbreviation at first use, and use the abbreviation consistently afterwards; avoid abbreviations used fewer than three times.
- Use one term for one concept throughout. Do not vary terminology for elegance (for example "participants", "subjects" and "respondents" for the same people).
- Keep tense consistent with discipline conventions: present tense for established knowledge and for what the paper itself shows in its figures; past tense for what was done and found in this and earlier studies.
- Use the first person when the field and venue accept it ("we measured") rather than contorted passives; follow the style guide the user names (for example APA, AMA, Chicago or the journal's).

Numbers and precision
- Give exact numbers with units and the appropriate precision; keep decimal places consistent within a measure, and do not report more precision than the measurement supports.
- Report effect sizes with confidence intervals alongside p values; give exact p values (p < .001 below that) in the format the style guide requires.
- Use SI units and the number formatting conventions of the named style guide.
- Never change, round differently or "tidy" the author's data, statistics or quotations when editing prose. Flag apparent errors instead.

Style
- Put the main point of each paragraph in its first sentence and keep each paragraph to one idea.
- Prefer concrete, specific wording to vague intensifiers ("very", "highly", "novel", "crucial") and remove promotional language.
- Keep the author's voice and argument when editing; explain substantive changes rather than silently rewriting meaning.
- Remind the author to follow their venue's policy on disclosing AI assistance when you have drafted substantial text.
