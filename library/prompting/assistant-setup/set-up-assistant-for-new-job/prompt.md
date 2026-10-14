---
schema: 1
id: set-up-assistant-for-new-job
kind: prompt
title: Set up an AI assistant for a new job
description: Sets up an AI assistant for your first months in a new job, checking the employer's AI rules first, then role instructions, a glossary, meeting prep and a never-paste list.
category: assistant-setup
version: 1.0.0
status: incubating
stage: [plan, build]
role: [individual, manager]
requires: [none]
inputs: [text, notes]
output: [prompt, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
level: beginner
depth: specific
tags: [new-starter, first-90-days, workplace-glossary, employer-ai-rules]
pairs_with:
  prompts: [build-project-instructions, write-custom-instructions, write-ai-use-policy]
args:
  - name: role
    description: Your new job title, team, field, seniority and what you will mostly do.
    type: text
    required: true
  - name: policy
    description: "Optional: what your employer says about AI tools - which are approved, what data may go in. Say \"don't know\" if unsure."
    type: text
  - name: notes
    description: "Optional: your onboarding notes - acronyms, teams and their roles, priorities you have heard. Leave out anything confidential if you are not sure it may go in."
    type: text
output_contract:
  format: markdown
  sections: [Check the rules first, Project instructions, Glossary, Uses for the first 90 days, Never paste, 30-day review]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The first months in a job are full of new acronyms, people, systems and unwritten rules. An assistant can help as a glossary, a meeting-prep partner and a writing helper, but the employer decides which tool may be used and for what data. Many organisations approve one tool on a work account and forbid internal information in personal accounts; breaking that in the first weeks is a bad start. A second trap is the assistant guessing how the company works ("your team probably uses quarterly OKRs"); company specifics must come from the user, and anything unconfirmed should be marked.

<role>
{{role}}
</role>
{{#policy}}
<policy>
{{policy}}
</policy>
{{/policy}}
{{#notes}}
<notes>
{{notes}}
</notes>
{{/notes}}
</context>

<task>
1. Policy first. If the policy is missing or unclear, list four or five questions to ask the manager or IT (approved tools, account to use, data classes allowed, recording and transcripts, client data), and say to use only public or personal-skill material until they are answered.
2. Write project instructions for the role: who I am and my level, what I do, how to respond, and the rule "do not guess how this company works; ask me or say it needs checking".
3. Build a glossary from the notes: term, meaning, where it came from, and "unverified" for anything the user was not sure of. Without notes, give an empty template.
4. List the most useful uses for the first 90 days for this role, each with a starter prompt: meeting prep, one-to-one notes, status updates, learning the domain, decoding jargon in messages.
5. Write a "never paste" list fitted to the role: for example customer data, unreleased financials, source code or credentials, HR matters, anything marked confidential.
6. Write a 30-day review: what to update in the instructions and glossary, and which uses actually helped.
</task>

<constraints>
- Do not state what the employer allows; only the employer can say.
- Never invent company facts, people's roles or internal processes.
- Keep the project instructions under about 1,500 characters.
</constraints>

<output_format>
## Check the rules first
Status and the questions to ask.
## Project instructions
One fenced block, ready to paste.
## Glossary
A table: term, meaning, source, verified or not.
## Uses for the first 90 days
Bullets: use and starter prompt.
## Never paste
Bullets.
## 30-day review
Three or four questions.
</output_format>
