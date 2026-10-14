---
schema: 1
id: learn-to-test-with-a-screen-reader
kind: prompt
title: Learn to test with a screen reader
description: Teaches a developer to start NVDA, VoiceOver or TalkBack, the dozen commands that matter, and how to check their own component without fooling themselves.
category: accessibility
version: 1.0.0
status: incubating
stage: [learn, verify]
role: [frontend-engineer, qa-engineer, mobile-engineer, designer]
requires: [none]
inputs: [text]
output: [explanation, checklist]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [screen-reader, nvda, voiceover, talkback, manual-testing]
pairs_with:
  personas: [accessibility-specialist]
  prompts: [write-screen-reader-test-plan, preview-screen-reader-announcements, write-accessibility-bug-report]
args:
  - name: setup
    description: Your operating system and device, and the browser you will test in, for example "MacBook with Safari", "Windows 11 with Chrome", "Android phone".
    type: string
    required: true
  - name: thing_to_test
    description: The component or page you want to check first, for example "our signup form" or "a custom dropdown".
    type: text
output_contract:
  format: markdown
  sections: [Which screen reader and why, Start and stop, The commands you need, Your first test, Mistakes that fool sighted testers, Next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most developers open a screen reader once, get lost in the speech, and close it. A useful first session needs very little: the right pairing (NVDA or JAWS with Chrome or Firefox on Windows, VoiceOver with Safari on macOS and iOS, TalkBack with Chrome on Android), a way to stop speech and quit, a slower speech rate, and about a dozen commands. Sighted testers fool themselves in predictable ways: they tab through a page and miss everything that is not focusable, they read the screen instead of listening, they use the mouse, which moves the screen reader's cursor in ways real users do not, and they assume Windows screen readers behave like VoiceOver. Screen readers on Windows have a browse mode and a focus mode; knowing which one you are in explains most "it reads differently" surprises.
</context>

<task>
Teach me to test with a screen reader on: {{setup}}.
{{#thing_to_test}}
First thing I want to test: {{thing_to_test}}
{{/thing_to_test}}

1. Recommend the screen reader and browser pairing for this setup and why it is the one real users mostly use there. If the setup cannot run a common screen reader (for example Linux only), say what is realistic.
2. Explain how to turn it on and off quickly, stop speech, slow the speech rate, and turn on a speech viewer or caption panel if the screen reader has one. Give a safe exit if things go wrong.
3. Teach the commands that matter, as a table of at most fifteen rows: read next and previous item, read everything from here, jump by heading, by landmark, by link and by form field, open the elements list or rotor, activate, enter and leave form or focus mode, interact with a group (VoiceOver), and gestures for mobile.
4. Give a first test of 10 to 15 minutes on the thing to test (or on a generic form if none was given): what to do step by step, and what you should hear for each step if it is built correctly (role, name, state, value, errors).
5. List the mistakes that fool sighted testers and how to avoid each, including testing with the monitor on and the mouse in hand.
6. Suggest how to keep the skill: a five-minute check per pull request, which second screen reader to learn next, and when to involve people who use screen readers every day.
7. End by asking me what I heard, so I can paste a confusing announcement and get an explanation.
</task>

<constraints>
- Give key commands only for the screen reader and platform chosen; if unsure of a command for the current version, say so and point to the screen reader's built-in help (for example NVDA+1 for input help, VoiceOver's help menu).
- Do not claim one screen reader's output proves behaviour in another.
- Do not present developer testing as a replacement for testing with disabled users.
</constraints>

<output_format>
## Which screen reader and why
Two or three sentences.

## Start and stop
Numbered steps.

## The commands you need
Table: task | keys or gesture | what you hear.

## Your first test
Numbered steps with the expected announcement for each.

## Mistakes that fool sighted testers
Bullets.

## Next steps
Bullets, then one question back to me.
</output_format>
