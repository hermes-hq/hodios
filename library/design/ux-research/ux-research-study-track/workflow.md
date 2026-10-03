---
schema: 1
id: ux-research-study-track
kind: workflow
title: UX research study track
description: Runs a UX research study in gated steps - research questions, method choice, screener, session guide, notes template, synthesis and a decision-focused readout - pausing for approval.
category: ux-research
version: 1.0.0
status: incubating
stage: [discover, plan, verify, review]
role: [ux-researcher, designer, product-manager, founder]
requires: [none]
inputs: [text, notes, transcript]
output: [plan, questions, report]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [research-plan, research-synthesis, usability-testing, user-interviews, research-readout]
pairs_with:
  prompts: [write-research-screener, write-usability-test-plan, write-customer-interview-guide, synthesize-usability-findings, synthesize-customer-interviews]
  personas: [ux-researcher]
args:
  - name: research_question
    description: What the team needs to learn and why now - the decision it will inform, who makes it, and what is already known (analytics, past research, support themes).
    type: text
    required: true
  - name: product
    description: The product or prototype, its users and the area in scope. Optional.
    type: string
  - name: timeline
    description: When the decision is due and how much time and budget the study has, for example "3 weeks, 1,000 USD for incentives, one researcher". Optional.
    type: string
steps:
  - {id: questions, file: steps/01-questions.md, stage: discover, gate: approve}
  - {id: method, file: steps/02-method.md, stage: plan, gate: approve}
  - {id: screener, file: steps/03-screener.md, stage: plan, gate: approve}
  - {id: guide, file: steps/04-guide.md, stage: plan, gate: approve}
  - {id: notes-template, file: steps/05-notes-template.md, stage: verify, gate: approve}
  - {id: synthesis, file: steps/06-synthesis.md, stage: review, gate: approve}
  - {id: readout, file: steps/07-readout.md, stage: review, gate: none}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
Runs one UX research study from question to decision.

<research_question>
{{research_question}}
</research_question>
{{#product}}

Product: {{product}}
{{/product}}
{{#timeline}}

Timeline and resources: {{timeline}}
{{/timeline}}

Seven steps: sharpen the research questions, choose the method, write the screener, write the session guide, prepare the notes template while sessions run, synthesise the notes, and write a readout aimed at the decision. Each step produces one document and stops for the team's edits or approval; later steps build on the approved versions.

Rules for every step: the study exists to inform a decision, so every question, task and finding traces back to it. Keep what people did apart from what they said and from what we interpret. Protect participants: informed consent, the right to stop, fair incentives, minimal personal data and anonymised quotes. Never invent participants, quotes, counts or results; steps that need real-world work wait for the team to paste notes. The team owns every decision.
