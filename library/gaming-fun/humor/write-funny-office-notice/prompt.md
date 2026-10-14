---
schema: 1
id: write-funny-office-notice
kind: prompt
title: Write a funny shared-space notice
description: Writes a funny notice for a shared fridge, kitchen, printer, bathroom or flat that gets people to change the habit without passive aggression, blame or naming anyone.
category: humor
version: 1.0.0
status: incubating
stage: [build]
role: [individual, manager, operations-manager]
requires: [none]
inputs: [text]
output: [copy]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [office-kitchen, house-share, shared-fridge, signage, behaviour-change]
pairs_with:
  prompts: [write-clean-jokes, punch-up-with-humor]
args:
  - name: problem
    description: The habit you want changed and where, for example "mugs left in the sink overnight in the office kitchen", "food left in the shared fridge for weeks", "nobody refills the printer paper".
    type: text
    required: true
  - name: setting
    description: Who will read it, for example "open-plan office of 60", "student flat of five", "community hall users".
    type: string
    required: true
  - name: action_needed
    description: The specific thing you want people to do, for example "wash your mug before you leave", "fridge is cleared every Friday at 4pm". Optional; inferred if missing.
    type: string
output_contract:
  format: markdown
  sections: [Notice options, Recommended pick, Where and how to post it]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write notices for shared spaces. Passive-aggressive notes ("Some of us were brought up to wash our own mugs!!") get photographed, mocked and ignored, and they sour the place. Notices that work are funny about the situation, never the people, state one clear action with a time or rule, sit at the point of decision (on the fridge door, above the sink), and are short enough to read while holding a mug. Humour helps because it signals goodwill; it fails when the joke buries the instruction.

Problem: {{problem}}
Setting: {{setting}}
{{#action_needed}}Action needed: {{action_needed}}{{/action_needed}}
</context>

<task>
1. Name the one action you want and any rule or time it depends on. If none was given, propose one realistic option and mark it as a suggestion to confirm.
2. Write three notices in different comic styles: (a) a mock-official sign (pretend regulation, deadpan), (b) the object speaking for itself (the lonely mug, the fridge), (c) a gentle one-liner with a simple visual idea. Each is at most 40 words plus a headline.
3. Make the action unmissable in each: bold or on its own line, with the time or rule.
4. Recommend one for this setting and say why.
5. Say where to post it, at what height and point of decision, and how long to leave it up before replacing it so it does not become wallpaper.
</task>

<constraints>
- Never name, hint at or describe a specific person or team, and never use guilt, sarcasm aimed at readers, or capitals-and-exclamation-mark scolding.
- One action per notice.
- Do not invent rules or consequences the writer has not got the authority to enforce (fines, CCTV, reporting to HR); if a consequence is needed, use the one supplied.
- Keep it readable for non-native speakers: no heavy idiom in the action line.
</constraints>

<output_format>
## Notice options
Three notices, each with a headline, body and the action line in bold.
## Recommended pick
## Where and how to post it
</output_format>
