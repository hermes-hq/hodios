---
schema: 1
id: script-terminal-demo
kind: prompt
title: Script a demo GIF or short video for a developer tool
description: Scripts a 15 to 60 second demo GIF or video for a developer tool, with one story, exact commands, timing, captions, a reproducible recording setup and README placement. Use before a launch.
category: video
version: 1.0.0
status: incubating
stage: [build]
role: [maintainer, developer-advocate, software-engineer]
requires: [none]
inputs: [text, notes]
output: [script, checklist]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: optional
level: intermediate
tags: [open-source, demo-gif, terminal-recording, vhs, asciinema, readme]
pairs_with:
  prompts: [audit-readme-conversion, write-launch-social-posts, prepare-product-demo]
  personas: [developer-advocate]
args:
  - name: tool
    description: What the tool does, the one moment that makes people want it, how it is run (CLI, TUI, desktop app, web), and the commands or clicks involved.
    type: text
    required: true
  - name: placement
    description: Where the demo will be used.
    type: enum
    enum: [readme-gif, social-video, launch-video, docs]
    default: readme-gif
  - name: max_seconds
    description: Longest acceptable length.
    type: number
    default: 30
output_contract:
  format: markdown
  sections: [Story, Shot list, Recording setup, Captions and alt text, Placement]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A short demo of the real thing working answers "what is it" faster than any paragraph, and popular READMEs tend to include images. Most demos fail by showing too much: setup, menus and every feature, at a speed nobody can follow. One story works best: a recognisable problem, the one command or action, the result, done. Terminal demos can be scripted so they are reproducible and re-recorded on each release: tools such as VHS turn a script of keystrokes into a GIF or video, and asciinema records text that viewers can copy and that stays small. GitHub renders GIFs inline in READMEs; large files load slowly, so keep README GIFs small and short. Desktop app demos need a clean profile, a readable window size and no personal data on screen.
</context>

<task>
Tool:
<tool>
{{tool}}
</tool>
Placement: {{placement}}. Maximum length: {{max_seconds}} seconds.

If you cannot tell what the key moment is, ask what users say when they first see it working, and stop.

1. **Story.** One sentence: the problem, the action, the result. Cut every feature that does not serve it and list what was cut so it can go in other demos.
2. **Shot list.** Second by second within {{max_seconds}} seconds: what is on screen, the exact command typed or click made, the output that appears, and pauses long enough to read the result (about two to three seconds on the key output). Start on a state the viewer recognises, not on setup. For a terminal, keep commands short, use realistic sample data, and avoid scrolling walls of output.
3. **Recording setup.** For terminal tools, write a scripted recording (for example a VHS-style tape with Set FontSize, Set Width, Set Height, Type, Sleep and Enter lines, or the asciinema steps) using only commands from the input; mark anything assumed as [CHECK]. For desktop or web apps, give the window size, a clean profile with sample data, cursor highlighting and what to hide. Note the theme, font size and contrast for legibility, and the target file size for {{placement}}.
4. **Captions and alt text.** Short on-screen captions if the format needs them, and alt text that says what the demo shows for people who cannot see it.
5. **Placement.** Where it goes (for a README, directly under the one-line pitch), how to keep it current (re-record on each release, ideally in CI for scripted terminal demos), and a still image fallback for places that do not play GIFs.
</task>

<constraints>
- Show only what the tool really does today; no mocked output, sped-up sections without a note, or unreleased features.
- Use only commands and features from the input.
- No personal data, tokens, real customer data or private paths on screen.
</constraints>

<output_format>
## Story
## Shot list
| Time | On screen | Input | Output |
## Recording setup
## Captions and alt text
## Placement
</output_format>
