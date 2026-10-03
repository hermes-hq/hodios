---
schema: 1
id: write-custom-gpt-instructions
kind: prompt
title: Write instructions for a shared custom assistant
description: Writes the instructions, knowledge-file plan, conversation starters and test prompts for a shareable custom assistant such as a custom GPT, Gem or project assistant, scoped to its audience.
category: assistant-setup
version: 1.0.0
status: incubating
stage: [design, build]
role: [individual, teacher, manager, founder]
requires: [none]
inputs: [text, preferences]
output: [prompt, plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [custom-assistant, gpt-builder, knowledge-files, conversation-starters]
pairs_with:
  prompts: [prepare-knowledge-files, build-project-instructions, write-system-prompt]
  workflows: [assistant-setup-track]
args:
  - name: purpose
    description: What the assistant should help with, the main jobs, and any documents you plan to give it.
    type: text
    required: true
  - name: audience
    description: "Who will use it and what they know, for example \"new hires in our sales team\", \"my Year 9 chemistry class\", \"just me\"."
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Setup summary, Instructions, Knowledge files, Conversation starters, Settings to check, Test prompts]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Builder tools for custom assistants (custom GPTs, Gems, project assistants and similar) all take the same ingredients: an instructions field, optional knowledge files, conversation starters, and switches for capabilities such as web search, code or image generation. Most custom assistants disappoint for the same reasons: the instructions describe a personality instead of the jobs, nobody told it when to use the knowledge files versus general knowledge, the scope is so broad it is generic, and it was never tested with the questions real users ask. Anyone who can use the assistant may also be able to coax out its instructions and knowledge files, so nothing confidential belongs in them.

<purpose>
{{purpose}}
</purpose>
Audience: {{audience}}
</context>

<task>
1. If the purpose is too vague to define the main jobs, ask up to three questions and stop. Otherwise list your assumptions.
2. Write a setup summary: name suggestion, one-line description for the builder's description field, the two to four jobs it does, and what it deliberately does not do.
3. Write the instructions field:
   - Role and audience in two sentences, including what users typically know.
   - How to handle each main job: what to ask first if information is missing, the steps, and the format of a good answer.
   - Knowledge use: which questions to answer from the knowledge files, to quote or name the file it used, to say when the files do not cover something, and when general knowledge is acceptable.
   - Tone, length and formatting for this audience.
   - Boundaries: out-of-scope requests and what to do instead, with reasons; honesty that it is an AI and can be wrong; protecting personal data users paste.
   Keep it within about 6,000 characters so it fits common builder limits, and tell the user to check their tool's current limit.
4. Plan the knowledge files: which documents to include, the format and naming, what to remove first (personal data, confidential material, outdated versions), and one sentence per file on what it answers.
5. Write four conversation starters that show the main jobs.
6. List settings to check: capabilities to turn on or off for this purpose and who it is shared with, phrased generically because menus differ by tool.
7. Write eight test prompts: each main job, a question the files answer, a question they do not, an out-of-scope request, an attempt to extract the instructions, and a vague request.
</task>

<constraints>
- Never put secrets, passwords, API keys, client data or anything confidential in the instructions or knowledge files; say so explicitly in the output when the purpose suggests it.
- Do not invent facts about the user's organisation, course or products; use placeholders such as [RETURN POLICY].
- Do not claim exact menu names or limits for a specific builder as current fact.
- For an audience of children, keep the assistant within the platform's age rules and recommend adult supervision.
</constraints>

<output_format>
## Setup summary
## Instructions
One fenced block, ready to paste.
## Knowledge files
Table: File | Format and name | What it answers | Clean-up before upload.
## Conversation starters
## Settings to check
## Test prompts
Table: Prompt | What it tests | Good behaviour.
</output_format>
