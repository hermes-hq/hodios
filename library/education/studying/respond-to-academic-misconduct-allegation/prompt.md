---
schema: 1
id: respond-to-academic-misconduct-allegation
kind: prompt
title: Respond to an academic misconduct allegation
description: Prepares a student accused of plagiarism, collusion or unauthorised AI use for the integrity process, with a factual statement, evidence of their process and questions to ask.
category: studying
version: 1.0.0
status: incubating
stage: [plan]
role: [student]
requires: [none]
inputs: [text, document]
output: [plan, message, checklist, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [academic-integrity, plagiarism, ai-detection, integrity-hearing, student-advocacy]
pairs_with:
  prompts: [write-ai-use-disclosure, appeal-university-decision, write-email-to-professor]
args:
  - name: allegation
    description: The allegation as written to you - the email or letter, the assessment, what is alleged (plagiarism, collusion, contract cheating, unauthorised AI use), the evidence cited (similarity report, AI detector score, matching answers) and any meeting date or response deadline.
    type: text
    required: true
  - name: what_happened
    description: Your honest account of how you produced the work - sources and tools used, any help, drafts and notes you have, and anything you think may have gone wrong (for example missing citations).
    type: text
    required: true
  - name: process_info
    description: Optional institution policy text on academic integrity, the stages of the process, possible outcomes and your rights (to see evidence, to bring someone, to appeal). Include the country.
    type: text
output_contract:
  format: markdown
  sections: [What you are accused of, Process and rights to check, Evidence of your process, Your statement, Questions to ask, Before the meeting]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An academic misconduct allegation is frightening, and students often make it worse by panicking: ignoring the deadline, writing a long emotional email, denying something the evidence clearly shows, or admitting to more than happened. Integrity processes generally decide two things, whether misconduct occurred and how serious it is, and they weigh honesty, intent, first offence and the student's own evidence. For alleged AI use, detector scores alone are widely regarded as unreliable evidence, and the strongest response is the student's own process trail: version history in the document editor, notes, drafts, search history, sources read, and the ability to explain and discuss the work. For similarity cases, the question is often whether matching text is properly cited and quoted. Students usually have the right to see the evidence, to respond in writing, to be accompanied (often by a students' union or student advocate), and to appeal; the details vary by institution and country.
</context>

<task>
Prepare the student's response.

<allegation>
{{allegation}}
</allegation>

<what_happened>
{{what_happened}}
</what_happened>
{{#process_info}}
<process_info>
{{process_info}}
</process_info>
{{/process_info}}

1. State plainly what is alleged, the evidence cited, the stage of the process and any deadline (marked "verify"). If there is a deadline, put responding on time first.
2. List the process and rights to check: the right to see all evidence (the full similarity or detector report), to respond in writing, to be accompanied, the possible outcomes, and the appeal route. Use the policy text if given; otherwise describe common patterns, marked to verify, and point to the student advice service or students' union advocate.
3. Build the evidence of the student's process from their account: version history, drafts, notes, sources, search and reading history, messages, and anything showing the work was theirs. Say how to export or screenshot each with dates.
4. Draft a factual written statement in the student's voice: what they did, in order, with evidence references; where something went wrong (poor citation, help that crossed a line), acknowledge it accurately without overstating it; and, for AI allegations, a clear description of any AI use or non-use, matched to the course policy.
5. Write questions to ask at or before the meeting: what exactly the evidence shows, how the detector or similarity score was interpreted, what the policy says about this kind of case, and what outcomes are possible.
6. Prepare for the meeting: how to explain their work and reasoning (be ready to discuss sources and choices), bring someone if allowed, take notes, ask for decisions in writing, and look after themselves.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never advise the student to deny, admit or change their account. Help them set out what actually happened, accurately.
- Never help fabricate, backdate or alter drafts, notes, version history or other evidence; if asked, refuse and explain that it would turn an allegation into proven misconduct.
- Do not state the institution's rules, rights, penalties or deadlines as fact unless they are in the policy text given; mark everything else to verify.
- Do not predict the outcome. For serious cases (possible expulsion, a degree withheld, a professional programme with fitness-to-practise rules), strongly recommend the student advice service, a students' union advocate or a lawyer.
- If the student mentions severe distress or being unsafe, point them to support services or local emergency services first.
</constraints>

<output_format>
## What you are accused of
## Process and rights to check
A checklist, each item marked "verify" unless from the policy text.
## Evidence of your process
A table: Evidence | What it shows | How to export it.
## Your statement
## Questions to ask
## Before the meeting
</output_format>
