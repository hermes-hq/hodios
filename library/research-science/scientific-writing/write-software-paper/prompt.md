---
schema: 1
id: write-software-paper
kind: prompt
title: Write a research software paper
description: Writes a short paper describing research software, with the statement of need, what it does, comparison with alternatives, quality and testing, examples of research use and how to cite it.
category: scientific-writing
version: 1.0.0
status: incubating
stage: [ship]
role: [researcher, software-engineer, data-scientist]
requires: [none]
inputs: [text]
output: [article, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [research-software, software-citation, open-licence, statement-of-need, journal-submission]
pairs_with:
  prompts: [write-data-availability-statement, choose-target-journal, write-abstract]
  personas: [academic-writing-coach]
args:
  - name: software
    description: What the software does, who it is for, language and dependencies, how it is tested and documented, licence, repository and archive identifiers if any, and where it has been used in research.
    type: text
    required: true
  - name: venue
    description: Optional. The target journal or venue and its limits, for example "a short software paper of about 1,000 words" or "a full software article with performance benchmarks".
    type: text
output_contract:
  format: markdown
  sections: [Summary, Statement of need, Functionality, Quality and sustainability, Research use and citation, Submission checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Research software papers let developers receive citable credit and help researchers judge whether a tool fits their work. Venues range from short-format journals that review the repository as much as the paper (for example the Journal of Open Source Software, which asks for a summary for non-specialists, a statement of need, references, and a repository with an open licence, documentation, tests and contribution guidelines) to full articles in domain or software journals with benchmarks. Reviewers look for a clear statement of need (which research problem, for whom, and why existing tools fall short), honest comparison with alternatives, evidence of quality (automated tests, continuous integration, documentation, versioned releases archived with a persistent identifier), and evidence of research use. Weak papers read like a README or marketing copy, overclaim performance without benchmarks, or ignore competing tools.
</context>

<task>
Write a software paper for:
<software>
{{software}}
</software>
{{#venue}}
Venue: {{venue}}
{{/venue}}

1. Write a summary for a non-specialist reader: the research area, what the software does, and its main capability in two short paragraphs.
2. Write the statement of need: the research problem, the target users, what existing tools do and do not do (only those the user named, with a request to name any others), and the gap filled.
3. Describe functionality: main features, design choices that matter to users, inputs and outputs, and a minimal usage example in pseudocode or the software's language, marked to be checked against the real interface.
4. Describe quality and sustainability: tests and coverage if stated, continuous integration, documentation, versioning and archive, licence, contribution and support routes. Mark anything missing.
5. Describe research use with only the supplied examples, and how to cite the software (paper and archived version).
6. Give a submission checklist adapted to the venue.
</task>

<constraints>
- Use only supplied facts. Do not invent benchmarks, user counts, citations, competitor features or identifiers; use placeholders.
- No marketing language ("revolutionary", "powerful", "seamless"); state capabilities plainly.
- Comparison with alternatives must be fair and specific.
- If the repository lacks a licence, tests or documentation, say most venues will ask for them before review.
</constraints>

<output_format>
## Summary
Two paragraphs.
## Statement of need
One to three paragraphs.
## Functionality
Features, then a code block example marked "check against the real interface".
## Quality and sustainability
Bullets.
## Research use and citation
Paragraph and a citation placeholder.
## Submission checklist
A checklist with items marked present or missing.
</output_format>
