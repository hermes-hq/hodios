---
schema: 1
id: write-academic-book-proposal
kind: prompt
title: Write a proposal for a university press
description: Writes a scholarly book proposal for a university or academic press with the rationale, argument, chapter summaries, audience, competing titles, length, schedule and author readiness.
category: scientific-writing
version: 1.0.0
status: incubating
stage: [plan]
role: [researcher]
requires: [none]
inputs: [notes, document, text]
output: [article, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [book-proposal, monograph, university-press, academic-publishing, competing-titles]
pairs_with:
  prompts: [review-academic-book-proposal, write-nonfiction-book-proposal, plan-thesis-structure]
args:
  - name: project
    description: The book's argument, field, intended readers, a list of planned chapters with notes, how much is written, whether it derives from a dissertation, related books you know, and the target press and series.
    type: text
    required: true
  - name: press_guidelines
    description: Optional. The press or series proposal guidelines, pasted from its site.
    type: text
output_contract:
  format: markdown
  sections: [Proposal, Questions an acquisitions editor will ask, Before sending]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Acquisitions editors at university and academic presses decide whether to send a proposal to peer review based on a few questions: is there a clear argument (not just a topic), does it matter beyond a small subfield, who exactly will buy or assign it (libraries, scholars in which fields, course adoption), how it differs from competing and complementary titles, whether the author can deliver on time, and whether it fits the list or series. Proposals typically include: a description and rationale, the argument, chapter-by-chapter summaries of a paragraph each, intended audience and markets, competing titles with how this book differs, length in words and illustrations, a schedule, the state of the manuscript, and a CV. Dissertation-based books must show how the book goes beyond the dissertation (less literature review, broader framing, new chapters). Common faults: chapter summaries that describe content without argument, generic audience statements ("academics and general readers"), and listing competing titles without explaining the difference.
</context>

<task>
Write the proposal for:
<project>
{{project}}
</project>
{{#press_guidelines}}
<press_guidelines>
{{press_guidelines}}
</press_guidelines>
{{/press_guidelines}}

1. Follow the press guidelines' section list and order if given; otherwise use: working title, overview and argument, rationale and contribution, chapter outline, audience and markets, competing and complementary titles, format and length, schedule and status, about the author.
2. Write the overview: the question, the argument in plain terms, the evidence base and why it matters now, in about one page.
3. Write a summary for each chapter that states its argument and role in the book, not only its topic.
4. Define the audience precisely: disciplines, course levels if course adoption is plausible, and any wider readership, with honest limits.
5. For competing titles, use only those the author named; for each, say what it does and how this book differs. Ask for more if fewer than three are given.
6. If the book derives from a dissertation, state what has changed and will change.
7. Give length, illustrations, permissions issues and a realistic schedule from the status given.
</task>

<constraints>
- Do not invent competing titles, publication details, sales figures or endorsements; use placeholders.
- Avoid claims of wide trade appeal unless the material supports them.
- Keep chapter summaries argumentative and of roughly equal length.
- Note that many presses accept simultaneous proposal submissions but expect to be told; advise the author to check the press's policy.
</constraints>

<output_format>
## Proposal
The full proposal with section headings.
## Questions an acquisitions editor will ask
Bullets with suggested answers or gaps.
## Before sending
Checklist: guidelines followed, sample chapters, CV, permissions, cover email.
</output_format>
