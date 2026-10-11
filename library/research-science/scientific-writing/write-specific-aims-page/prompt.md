---
schema: 1
id: write-specific-aims-page
kind: prompt
title: Write a one-page specific aims page
description: Writes a one-page NIH-style specific aims page with the opening hook, knowledge gap, long-term goal, objective, central hypothesis, two or three aims and expected impact.
category: scientific-writing
version: 1.0.0
status: incubating
stage: [build]
role: [researcher]
requires: [none]
inputs: [notes, text]
output: [article]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
subject: [biology, medicine]
tags: [specific-aims, grant-application, central-hypothesis, research-funding, biomedical-research]
pairs_with:
  prompts: [write-research-proposal, write-impact-statement]
  personas: [grant-writer]
args:
  - name: project
    description: The problem and why it matters, what is known and the gap, your preliminary data, your hypothesis, the aims you have in mind and the approach for each, and the expected outcomes.
    type: text
    required: true
  - name: mechanism
    description: Optional. The funding mechanism and institute or panel, for example "R01, cancer biology study section" or "K99".
    type: string
output_contract:
  format: markdown
  sections: [Specific aims page, Logic check, Reviewer risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
For NIH and many similar biomedical funders, the specific aims page is the single most-read page of an application: assigned reviewers use it to decide whether to champion the proposal, and unassigned panel members may read little else. It must fit on one page and follows a well-known logic. Paragraph 1 opens with the importance of the problem, what is known, and a single clear knowledge gap that is critical. Paragraph 2 states the long-term goal, the objective of this application, the central hypothesis (testable, and grounded in preliminary data), and the rationale. Then two to four aims, each with a short active title, a one- or two-sentence approach and the hypothesis or expected outcome; aims should be related but not dependent, so failure of Aim 1 does not sink Aim 2. A final paragraph states the expected outcomes and positive impact, and often the innovation. Typical faults: aims that are descriptive ("to characterise") with no hypothesis, aims that depend on each other, too much background, and a gap that the aims do not actually fill.
</context>

<task>
Write a specific aims page for:
<project>
{{project}}
</project>
{{#mechanism}}
Mechanism: {{mechanism}}
{{/mechanism}}

1. Write the opening paragraph: the problem and its significance, what is known, and one critical gap, ending with the consequence of the gap not being filled.
2. Write the second paragraph: long-term goal, objective, central hypothesis built on the preliminary data supplied, and rationale.
3. Write each aim with a bold active title, the approach in one or two sentences, and the hypothesis or expected outcome. Make the aims independent; if they depend on each other, restructure or flag it.
4. Write the closing paragraph: expected outcomes, innovation if supplied, and impact on the field or patients.
5. Keep the whole page to about 500 to 600 words so it fits on one page at standard font and margins; give the word count.
6. Check that the gap, hypothesis, aims and outcomes form one chain.
</task>

<constraints>
- Use only the preliminary data and facts supplied; mark gaps as [MISSING: ...] or [CITE: ...]. Do not invent prevalence figures, preliminary results or references.
- Each aim must be testable; replace "characterise" or "explore" with what will be tested, or flag that the aim is descriptive.
- Avoid jargon that a reviewer outside the subfield would not follow.
- Follow the mechanism's conventions if stated (for a career award, include the training element); note that the author must check the current funding announcement.
</constraints>

<output_format>
## Specific aims page
The page, with bold aim titles, and the word count.
## Logic check
Table: gap, hypothesis, each aim, expected outcome, with whether each link holds.
## Reviewer risks
Bullets: likely criticisms (feasibility, dependence between aims, weak preliminary data) and how to pre-empt them.
</output_format>
