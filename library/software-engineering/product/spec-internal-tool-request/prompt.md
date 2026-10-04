---
schema: 1
id: spec-internal-tool-request
kind: prompt
title: Specify an internal tool request
description: Interviews a non-technical colleague about the internal tool they want, one question at a time, and writes a spec developers can estimate, with problem, users, workaround, data and value.
category: product
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [operations-manager, support-agent, business-analyst, manager]
stack: []
requires: [none]
inputs: [text, notes]
output: [questions, docs]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
tags: [internal-tools, requirements-interview, automation-request, workflow-automation]
pairs_with:
  prompts: [write-user-stories, list-feature-edge-cases]
  personas: [business-analyst]
args:
  - name: initial_request
    description: The request in the colleague's own words, for example "I need something that sends the weekly supplier report automatically" or "a form instead of our shared spreadsheet".
    type: text
    required: true
  - name: max_questions
    description: Roughly how many questions to ask before writing the spec.
    type: number
    default: 10
output_contract:
  format: markdown
  sections: [Request summary, Current process, Users and volume, Data and systems, Must-haves, Nice-to-haves, Value, Risks and constraints, Open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
People in operations, finance, HR and support ask for internal tools in terms of a solution ("a dashboard", "an app", "automate it") because they do not know what developers need to estimate. Developers then build the wrong thing or let the request sit because it is too vague to size. A good intake interview starts from the job and the current workaround, gets real numbers (how often, how many, how long), finds the data and systems involved, and separates the few must-haves from the wish list, without making the colleague feel quizzed. The person may not know technical terms; never make them feel they should.
</context>

<task>
<initial_request>
{{initial_request}}
</initial_request>

Run a short interview, then write the spec.

1. Open with one sentence restating the request in plain words, say that the result is a short spec developers can estimate (not the tool itself), say you will ask about {{max_questions}} short questions and that they can type "done" at any time, then ask the first one.
2. Ask one question per turn, in plain language, each with a short example answer so the person knows the level of detail wanted. Skip anything the person has already answered, including in the initial request; if one answer covers several topics, note them all and move on. Cover:
   - the outcome: what will be different when this exists, and what triggers the task (a date, an email, a customer action);
   - the current workaround, step by step: which tools, files and people, how long each run takes, how often, and where it goes wrong;
   - who does it and who receives the result, and how many people;
   - the data: where it comes from, who owns it, whether it includes personal or financial data, and an example of the input and the output (with real values removed);
   - the systems involved and whether they have exports, APIs or integrations the person knows of;
   - must-haves versus nice-to-haves: "if it did only one thing, what would it be?";
   - deadlines, approvals or audit needs, and what happens today when it fails.
3. Listen for numbers and repeat them back to check ("so about 3 hours every Monday?"). If an answer is vague, ask one follow-up, then move on.
4. Stay in the interviewer role: do not propose a technical solution during the interview. If asked, say you will note options in the spec.
5. Stop when you have enough, when you reach about {{max_questions}} questions, or when the person types "done". Before writing, read back the must-haves and the key numbers in two or three lines and ask them to confirm or correct; if they typed "done", skip the read-back. Then write the spec, and estimate value: hours saved per month (frequency x time x people), errors avoided, and any risk reduced, labelled as an estimate from their answers.
6. In the spec, add a short note of possible approaches for developers (spreadsheet improvement, no-code automation, small internal app, feature in an existing system), without choosing one.
</task>

<constraints>
- One question per message during the interview; never a list of questions at once.
- Use only what the person said; mark unknowns as [X] and list them under Open questions.
- Ask the person not to paste real personal or financial records; ask for made-up examples instead.
- Plain language throughout: no jargon such as API, ETL or schema in questions unless the person used it first.
- If the request turns out to be a policy or staffing problem rather than a tool, say so kindly in the spec.
</constraints>

<output_format>
During the interview: one short acknowledgement line, then one question with an example answer.
Final spec in Markdown:
## Request summary
Two to three sentences: the job and the outcome.
## Current process
Numbered steps with time and frequency, and where it fails.
## Users and volume
Bullets with numbers.
## Data and systems
Table: data, source system, owner, sensitive (yes or no), example.
## Must-haves
At most five numbered items, each testable.
## Nice-to-haves
Bullets.
## Value
The hours-saved calculation shown, plus other benefits.
## Risks and constraints
Bullets, including possible approaches for developers.
## Open questions
Numbered.
</output_format>
