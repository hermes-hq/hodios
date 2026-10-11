---
schema: 1
id: set-up-assistant-for-second-language-work
kind: prompt
title: Set up an assistant for working in a second language
description: Sets up an AI assistant for professionals who work in a second language, with modes to fix, polish, explain messages and find the natural phrasing, minimal edits by default and a mistake log.
category: assistant-setup
version: 1.0.0
status: incubating
stage: [plan, build]
role: [individual, language-learner]
requires: [none]
inputs: [text, preferences]
output: [prompt, tests]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
level: beginner
tags: [non-native-speakers, workplace-writing, register, idioms, minimal-edits]
pairs_with:
  prompts: [edit-non-native-english, write-custom-instructions]
  rules: [target-language-reply-rules]
  styles: [{id: global-english, level: 2}]
args:
  - name: languages
    description: Your first language, the language you work in, and your level in it (for example "fluent in meetings, less sure in formal writing").
    type: text
    required: true
  - name: work
    description: What you write and read at work, and who for - emails to clients, reports, chat with colleagues, presentations.
    type: text
    required: true
  - name: preferences
    description: "Optional: whether you want to see every change or just the clean text, and what bothers you about current AI edits."
    type: text
output_contract:
  format: markdown
  sections: [Your profile, Instructions, Modes, Learning loop, Tests]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
People who work in a second language need something different from language learners: the work comes first and learning is a by-product. Typical AI edits overshoot. They swap plain words for fancy ones, change the meaning of a careful sentence, smooth away the writer's own tone and make every email sound machine-written. The common real problems are smaller and different: articles and prepositions, a register that is too direct or too stiff for the culture of the workplace, false friends from the first language, and idioms or indirect phrases in colleagues' messages that are easy to misread ("quite good" in British English can mean "not great").

<languages>
{{languages}}
</languages>
<work>
{{work}}
</work>
{{#preferences}}
<preferences>
{{preferences}}
</preferences>
{{/preferences}}
</context>

<task>
1. Write a short profile: languages and level, kinds of text, readers, known trouble spots.
2. Write standing instructions: minimal edits by default; keep the writer's meaning, terminology, names and numbers exactly; do not upgrade vocabulary without a reason; flag anything ambiguous instead of guessing what was meant; point out tone risks for the reader's culture without assuming every workplace is the same; explanations in the first language only when asked.
3. Define four modes the user triggers with a keyword at the start of a message:
   - "fix": correct errors only, return clean text plus a short list of changes;
   - "polish": also improve flow and register for the stated reader;
   - "explain": explain a received message, including tone, idioms and what is implied, and suggest how to read it;
   - "say it": give two or three ways to say something, labelled by register.
4. Set up a learning loop: after "fix" and "polish", add the recurring mistake types to a short running list the user keeps in memory or project instructions, and review it monthly.
5. Give four tests, one per mode, with pass conditions.
</task>

<constraints>
- Never change facts, figures, names, technical terms or commitments in the user's text.
- Do not present one culture's norms as universal; describe tone risks as "may read as".
- Keep the instructions under about 1,500 characters.
</constraints>

<output_format>
## Your profile
Three to five bullets.
## Instructions
One fenced block, ready to paste.
## Modes
A table: keyword, what it does, what comes back.
## Learning loop
A starter list and the monthly routine.
## Tests
Four bullets: prompt and pass condition.
</output_format>
