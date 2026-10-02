---
schema: 1
id: build-project-instructions
kind: prompt
title: Build project instructions
description: Writes project-level instructions and a knowledge-file outline for a recurring project in an AI assistant, with a playbook for each repeated task and test prompts.
category: assistant-setup
version: 1.0.0
status: incubating
stage: [plan, build]
role: [individual, manager, content-creator, consultant]
inputs: [text, preferences]
output: [prompt, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [project-workspace, knowledge-files, playbooks, recurring-work]
pairs_with:
  prompts: [write-custom-instructions, write-system-prompt]
  personas: [prompt-engineer]
args:
  - name: project
    description: What the project is, who it is for, the standing facts that matter (names, terms, constraints), and what good output looks like.
    type: text
    required: true
  - name: recurring_tasks
    description: Optional - the tasks you ask for again and again, with an example request for each if you have one.
    type: text
output_contract:
  format: markdown
  sections: [Assumptions, Project instructions, Knowledge files, Maintenance, Test prompts]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Many assistants let people group conversations into a project with standing instructions and uploaded reference files. The pattern works when the two are split well: instructions describe behaviour (how to do each recurring task, what to check, what to ask), and knowledge files hold facts that change (style guide, product details, past examples). Instructions stuffed with facts go stale; files with no instructions pointing to them get ignored.

<project>
{{project}}
</project>
{{#recurring_tasks}}
<recurring_tasks>
{{recurring_tasks}}
</recurring_tasks>
{{/recurring_tasks}}
</context>

<task>
1. List the assumptions you are making. If the project is too vague to write useful instructions (no purpose or audience), ask up to three questions and stop.
2. If no recurring tasks are given, infer the three most likely from the project and label them as inferred.
3. Write the project instructions:
   - Purpose and audience in two or three sentences.
   - Standing rules that apply to everything (voice, terminology, units, things never to do), each with a short reason when it is not obvious.
   - A short playbook for each recurring task: inputs to expect, steps, which knowledge file to check first, the output format, and the definition of done.
   - What to do when information is missing: which questions to ask, or which assumptions are acceptable and must be labelled.
   - How to use the knowledge files: refer to them by file name, prefer them over general knowledge, and say when a file does not cover a question.
4. Outline the knowledge files: names, what each contains, why the assistant needs it, and who updates it and when. Suggest a template or headings for any file the user would need to create.
5. Add a maintenance note: what to update when, and signs the instructions need revising.
6. Write four or five test prompts, including one per recurring task and one the files do not cover.
</task>

<constraints>
- Keep instructions model-agnostic and under about 800 words; move facts into files.
- Use placeholders such as [BRAND_COLOURS] for facts you do not have. Never invent names, figures or policies.
- Do not recommend uploading secrets, credentials or personal data the tasks do not need; if the project involves people's personal data, suggest minimising or anonymising it.
- Write the instructions in second person, addressed to the assistant.
</constraints>

<output_format>
## Assumptions
## Project instructions
Fenced code block, ready to paste.
## Knowledge files
Table: File | Contents | Why the assistant needs it | Owner and update rhythm. Then any templates as short heading lists.
## Maintenance
## Test prompts
Table: Prompt | Tests | Good result.
</output_format>
