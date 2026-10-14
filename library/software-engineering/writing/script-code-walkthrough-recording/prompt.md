---
schema: 1
id: script-code-walkthrough-recording
kind: prompt
title: Script a recorded code walkthrough
description: Scripts a short screen recording that walks colleagues through a pull request or an area of the codebase for async review or handover, with file order, what to show and the key points.
category: writing
version: 1.0.0
status: incubating
stage: [review]
role: [software-engineer, tech-lead]
requires: [repo-read]
inputs: [diff, repo]
output: [script, outline]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [async-review, screen-recording, code-walkthrough, handover, knowledge-sharing]
pairs_with:
  prompts: [write-pr-description, write-testing-notes-for-qa]
args:
  - name: target
    description: The PR, branch or code area to walk through, and why you are recording (async review, handover, onboarding).
    type: text
    required: true
  - name: audience
    description: Who will watch, what they already know, and the length you want (default under 10 minutes).
    type: text
output_contract:
  format: markdown
  sections: [Purpose and length, Before recording, Chapters, Description for the video]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Recorded walkthroughs replace a meeting only if they are tight. Unscripted ones open files in alphabetical order, scroll through boilerplate, and spend minutes on setup while the one tricky decision gets ten seconds. A good walkthrough starts with the behaviour (a quick demo or the failing case), then follows the path of a request or data through the code in execution order, shows only the lines that carry the idea, says out loud the alternatives considered and where the reviewer's attention is most needed, and ends by pointing to what is not covered. Chapters with timestamps let viewers skip.
</context>

<task>
Script a recorded walkthrough.

<target>
{{target}}
</target>
{{#audience}}
<audience>
{{audience}}
</audience>
{{/audience}}

1. If you can read the diff or code, read it first: entry points, the main path, tests, and anything surprising. Note files that are mechanical (renames, generated code) to skip.
2. Write a one-sentence purpose for the recording and a target length.
3. Plan chapters in execution or data-flow order, not file order. For each: files and line ranges or symbols to show, what to say in two to four bullet points, and roughly how long.
4. Open with the behaviour: what the change does or what the code area is for, shown from the outside if possible.
5. Include the decisions and alternatives, the risky spots where you want reviewer attention, and how it is tested.
6. Close with what is out of scope, open questions, and where to leave feedback.
7. List the setup to do before recording: branches checked out, tabs and terminal ready, font size, notifications off, secrets and personal data off screen.
</task>

<constraints>
- Only reference files and symbols that exist in the code you read or the input; never invent them.
- Keep spoken points as bullets, not a word-for-word script.
- Stay within the target length; cut chapters before rushing them.
- Remind the author not to show credentials, production data or customer information on screen.
</constraints>

<output_format>
## Purpose and length
## Before recording
## Chapters
Per chapter: title, timestamp estimate, what to show, what to say.

## Description for the video
Short summary and chapter list to paste with the recording.
</output_format>
