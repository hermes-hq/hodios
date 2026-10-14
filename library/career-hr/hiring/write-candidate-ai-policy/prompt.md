---
schema: 1
id: write-candidate-ai-policy
kind: prompt
title: Write a candidate AI use policy
description: Sets clear rules for candidates' use of AI tools at each hiring stage, how to redesign assessments so the rules hold, how to handle suspected misuse fairly, and the wording to publish.
category: hiring
version: 1.0.0
status: incubating
stage: [design]
role: [recruiter, manager, engineering-manager, founder]
requires: [none]
inputs: [notes]
output: [plan, copy, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [ai-in-hiring, candidate-ai-use, assessment-integrity, generative-ai, hiring-policy]
pairs_with:
  prompts: [write-take-home-assignment, design-interview-loop, write-interview-process-guide]
  personas: [recruiter]
args:
  - name: process
    description: Your hiring stages (application, written questions, tests, take-home tasks, live interviews), the roles, and whether the job itself uses AI tools day to day.
    type: text
    required: true
  - name: concerns
    description: What prompted this, for example identical AI-written cover letters, suspected live prompting in video interviews, or candidates asking whether they may use assistants. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Principles, Rules by stage, Redesign assessments, Handling suspected misuse, Published wording, Your own use of AI]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a hiring leader who has updated assessment processes for widespread generative AI. Blanket bans are unenforceable and often out of step with the job, where people use AI tools every day; blanket permission makes some stages meaningless. A workable policy decides stage by stage what the stage is for, says plainly what is allowed, and redesigns the assessment so that the rule matters less: asking candidates to explain and extend their work live, using the candidate's own experiences, and assessing judgement rather than first drafts. AI-text detectors are unreliable and can unfairly flag non-native writers, so they should never be the basis of a rejection. Policies also need to cover the employer's side: candidates increasingly ask whether AI screens their application, and many places regulate automated decisions in hiring.

<process>
{{process}}
</process>
{{#concerns}}
<concerns>
{{concerns}}
</concerns>
{{/concerns}}
</context>

<task>
1. Principles: three or four principles for this company (for example the rules mirror how the job is done, transparency both ways, the same rules for everyone, judgement is assessed live).
2. Rules by stage: for each stage, what AI use is allowed, allowed with disclosure, or not allowed, and the reason tied to what the stage assesses. Include assistive technology that candidates rely on for accessibility, which should remain allowed.
3. Redesign assessments: changes that make each stage robust whatever tools are used, such as a live walkthrough of the take-home, follow-up probes on specific choices, questions about the candidate's real past work, or permitting AI and assessing how it is used.
4. Handling suspected misuse: what counts as evidence (not a detector score alone), giving the candidate a chance to explain or redo the task live, consistency, and how decisions are recorded.
5. Published wording: short wording for the job advert or candidate guide, and a longer section for each stage.
6. Your own use of AI: what to tell candidates about any AI used to screen, schedule or assess them, the human review step, and points to confirm with legal counsel on automated decision and data protection rules where the user hires.
</task>

<constraints>
- Do not rely on or recommend AI-text detectors as proof; explain why.
- Keep accessibility tools allowed and say so explicitly.
- Do not state specific laws as applying; list points for the user to confirm locally.
- Rules must be the same for all candidates at the same stage.
</constraints>

<output_format>
## Principles
## Rules by stage
Table: Stage | AI use | Why.
## Redesign assessments
## Handling suspected misuse
## Published wording
## Your own use of AI
</output_format>
