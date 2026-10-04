---
schema: 1
id: set-up-assistant-for-older-adult
kind: prompt
title: Set up an AI assistant for an older relative
description: "Helps set up an AI assistant for an older relative, with voice or large-text use, patient custom instructions, scam awareness, privacy settings, a short first lesson and a large-print cheat sheet."
category: assistant-setup
version: 1.0.0
status: incubating
stage: [plan, build]
role: [individual, parent]
requires: [none]
inputs: [text, preferences]
output: [prompt, checklist, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [older-adults, scam-awareness, digital-inclusion, family-tech-support, voice-assistant]
pairs_with:
  prompts: [teach-older-relative-smartphone, set-up-assistant-for-accessibility, write-custom-instructions]
  rules: [privacy-first-assistant-rules]
  styles: [{id: plain, level: 3}]
args:
  - name: relative_needs
    description: "What your relative is comfortable with and what is hard: eyesight, hearing, hand movement, memory, confidence with technology, languages, and how they feel about trying AI. Use a first name or 'my dad', no other identifying details."
    type: text
    required: true
  - name: device
    description: "The device they will use, for example 'a large Android tablet', 'an iPhone', 'a smart speaker in the kitchen' or 'a Windows laptop'."
    type: string
    required: true
  - name: uses
    description: "What they want help with, in their words if possible, for example 'recipes for one', 'writing to the council', 'understanding letters from the bank', 'company and conversation', 'questions about the garden'."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Before you start, How they will use it, Assistant instructions, Settings to check, Scam safety, First lesson, Cheat sheet, Follow-up]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An AI assistant can be genuinely useful to an older person: reading and explaining letters, drafting replies, answering questions without judgement, recipes, hobbies and conversation. The setup is what decides whether it helps or confuses: a mode of use that suits their eyes, ears and hands (voice, large text, or both), instructions that make the assistant patient, plain and step by step, settings that protect privacy, and a clear understanding that the assistant can be wrong and that scammers now use AI too (cloned voices of family members, fake support chats, convincing letters). The person stays in charge: the setup is done with them, at their pace, for the things they want.

Device: {{device}}

<relative_needs>
{{relative_needs}}
</relative_needs>

<uses>
{{uses}}
</uses>
</context>

<task>
1. Before you start: advise doing the setup together with the relative, with their agreement, and starting from one or two of the uses they care about most. If the needs or uses are too vague to plan for, ask up to three questions and stop.
2. Recommend how they will use it on this device: voice, large text or both, and the general accessibility settings to look for (text size, bold text, high contrast, read-aloud, dictation, hearing-aid connection, a home-screen shortcut), described generically because menus differ.
3. Write custom instructions for the assistant: who it is talking to (an older adult, by first name or none, with the relevant needs), to use plain words and short answers, one step at a time and to check before moving on, to repeat or rephrase patiently when asked, to say when it is not sure and suggest checking with a trusted person or the official source, to give general information only on health, money and legal letters and suggest the GP, pharmacist, bank or adviser for decisions, never to ask for passwords, bank details or codes, to warn about likely scams, and to remind them gently that it is a computer program.
4. List privacy settings to check: memory or personalisation, chat history, use of chats for training, voice recordings, location, connected apps and purchases.
5. Write a scam safety section in plain language for the relative: the warning signs (urgency, secrecy, requests for money, gift cards, codes or remote access, a "family member" in trouble), a family code word for real emergencies, and the rule to hang up and call back on a known number.
6. Plan a first lesson of about twenty minutes: three short tasks drawn from their uses, done by them, not for them, including one where the assistant gets something wrong so they see why to check.
7. Write a one-page cheat sheet in large-print style: how to start, three example things to say or type, what to do if it goes wrong, and who to call for help.
8. Suggest a light follow-up: when to check in and what to look for.
</task>

<constraints>
- Respect the relative's autonomy and dignity: no talking down, no secret monitoring, and no settings that read their conversations without their knowledge and agreement.
- Do not claim specific menu names, features or age-related settings for a particular product as fact; describe what to look for and suggest checking the device's current settings.
- Do not use the relative's full name, address or other identifying details in the instructions.
- This is about setting up the AI assistant; general phone or tablet skills are a separate job, so mention them only where the setup depends on them.
- If the needs mention signs of serious memory problems, confusion about money or possible financial abuse, suggest talking to their doctor or a local support service, gently and in one or two sentences.
</constraints>

<output_format>
## Before you start
## How they will use it
## Assistant instructions
One fenced block to paste into the custom instructions.
## Settings to check
Checkbox list.
## Scam safety
Short bullets written for the relative.
## First lesson
Numbered tasks with what to say or type.
## Cheat sheet
A fenced block, short lines, ready to print in large type.
## Follow-up
Two or three bullets.
</output_format>
