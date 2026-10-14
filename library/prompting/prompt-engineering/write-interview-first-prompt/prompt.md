---
schema: 1
id: write-interview-first-prompt
kind: prompt
title: Write an interview-first prompt
description: Writes a prompt that makes an assistant ask targeted questions one at a time before producing a document, plan or answer, with a question budget, a stop rule and a summary check.
category: prompt-engineering
version: 1.0.0
status: incubating
stage: [design, build]
role: [individual, consultant, manager, product-manager]
requires: [none]
inputs: [text]
output: [prompt, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
depth: specific
tags: [clarifying-questions, requirements-gathering, interview-pattern, reusable-prompt]
pairs_with:
  prompts: [write-task-prompt, write-system-prompt, turn-chat-into-prompt]
  personas: [prompt-engineer]
args:
  - name: output_wanted
    description: What the assistant should produce at the end, for example "a personal budget", "a job description", "a project brief for an agency".
    type: text
    required: true
  - name: who_answers
    description: Who will answer the questions and how much they know (yourself, clients, colleagues, beginners).
    type: text
    required: true
  - name: known_needs
    description: Optional - what the final output must contain and what usually goes wrong when information is missing.
    type: text
output_contract:
  format: markdown
  sections: [What must be learned, Prompt, Example opening]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write prompts that make an assistant interview the user before producing anything. By default, assistants either guess and produce a generic result, or ask ten questions in one message that people skim and half answer. The interview pattern works when the prompt lists what must be known before the output can be good, ranked by how much each item changes the result; asks one question at a time (or a small related group), with an example answer or options so people know the level of detail wanted; adapts the next question to the last answer and skips what is already known; lets the person say "skip" or "you decide" and records the assumption made; stops at a question budget or when the must-knows are covered; and plays back a short summary for confirmation before writing. Without a stop rule, interviews drag on; without a playback, misunderstandings reach the final output.

Output wanted: {{output_wanted}}

Who answers: {{who_answers}}
{{#known_needs}}

Known needs: {{known_needs}}
{{/known_needs}}
</context>

<task>
1. List what must be learned: the must-know items ranked by impact on the output, the nice-to-know items, and the defaults to use if skipped.
2. Write the prompt. It tells the assistant to: start with one sentence on what it will produce and roughly how many questions it will ask; ask one question per message with options or an example answer; never ask for what was already given; accept "skip" or "you decide" and note the default used; stop when the must-knows are covered or at the question budget; play back a short summary with assumptions marked and ask for corrections; and only then produce the output in the stated format. Include a rule for vague answers (one follow-up, then a default).
3. Example opening: the first two or three turns as they would look for a typical answerer.
</task>

<constraints>
- Question budget: usually five to ten; justify a higher number.
- Do not ask for unnecessary personal data; where the output needs sensitive details (health, finances), the prompt asks only for what the output requires and says why.
- Keep the wording plain enough for the stated answerer; avoid jargon unless they are experts.
- Model-agnostic; works in any chat assistant or as custom instructions.
</constraints>

<output_format>
## What must be learned
Table: Item | Why it matters | Default if skipped.
## Prompt
In a fenced code block.
## Example opening
Short transcript.
</output_format>
