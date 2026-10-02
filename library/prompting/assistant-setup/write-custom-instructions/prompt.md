---
schema: 1
id: write-custom-instructions
kind: prompt
title: Write custom instructions
description: Writes personal custom instructions for an AI assistant from your role, preferences and pet peeves, turning them into specific behaviours, with test prompts to check the difference.
category: assistant-setup
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
inputs: [preferences, text]
output: [prompt]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
level: beginner
tags: [personalisation, response-preferences, assistant-profile, pet-peeves]
pairs_with:
  prompts: [build-project-instructions]
  rules: [candid-feedback-rules]
  styles: [{id: skimmable, level: 2}, {id: plain, level: 2}]
args:
  - name: about_me
    description: Your role, field, experience level, what you mostly use the assistant for, and anything about your situation that should shape answers.
    type: text
    required: true
  - name: preferences
    description: Optional - how you like answers (length, tone, format, language), and what annoys you.
    type: text
  - name: tool
    description: Optional - the assistant you will paste this into, and its character limit if you know it.
    type: string
output_contract:
  format: markdown
  sections: [Instructions, Why each line, Left out, Try it]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most assistants let people save standing instructions: a short profile of who they are and how they want answers. Most people write adjectives ("be concise, be smart") that change little. Instructions work when they describe behaviour the assistant can follow and the user can notice: "Lead with the answer in one or two sentences, then details only if they change what I do."

<about_me>
{{about_me}}
</about_me>
{{#preferences}}
<preferences>
{{preferences}}
</preferences>
{{/preferences}}
{{#tool}}
Tool: {{tool}}
{{/tool}}
</context>

<task>
1. If the input says nothing about what the user does or uses the assistant for, ask for that in one question and stop. Otherwise write the "About me" part: the facts about the user that should change answers (role, expertise, recurring tasks, location or units if relevant, language). Leave out what would not change an answer.
2. Write the "How to respond" part as short, specific behaviours:
   - Default length and structure, and when to go longer.
   - Tone and register.
   - How to treat uncertainty, errors and disagreement.
   - When to ask a clarifying question versus making a stated assumption.
   - Formatting habits (lists, tables, code, headings) for the user's typical use.
   Turn each pet peeve into the positive behaviour that replaces it ("No preamble" becomes "Start with the answer").
3. Resolve conflicts. If two preferences pull against each other (always short, always thorough), write a rule for when each applies, and mention it in the notes.
4. Fit the tool. Some assistants have two fields (one about you, one for how to respond); others have a single instructions field. If the user says theirs has one field, write one block with both parts as labelled paragraphs. Otherwise write two parts and note that they can also be pasted together into a single field. If a character limit is given, stay well under it, since your count is an estimate. If not, keep each part under about 1,500 characters and say so.
5. Explain each line briefly so the user can edit it.
6. Give three test prompts the user can try before and after, each with what should change.
</task>

<constraints>
- Every line must be something the assistant can do and the user can observe. No adjectives on their own.
- Do not include sensitive data that the assistant does not need: passwords, ID or account numbers, full home address, other people's personal details, or health information unrelated to how answers should be given. If the input contains any, leave it out and list it under "Left out".
- Write in second person to the assistant ("Start with...", "When I ask for code...").
- Use the user's language and spelling conventions.
</constraints>

<output_format>
## Instructions
"About me" and "How to respond", each in its own fenced code block, ready to paste, followed by its approximate length in characters. For a single-field tool, one fenced block with both parts as labelled paragraphs.
## Why each line
Bullets, one per line of the instructions.
## Left out
Anything removed and why, or "Nothing".
## Try it
Three bullets: test prompt and what should change.
</output_format>
