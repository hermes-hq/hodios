---
schema: 1
id: script-product-demo-video
kind: prompt
title: Script a recorded product demo video
description: Scripts a recorded product demo for prospects that shows three key workflows tied to buyer problems, with screen and zoom notes, chapters and one clear next step.
category: video
version: 1.0.0
status: incubating
stage: [build]
role: [marketer, product-manager, sales-rep, founder]
requires: [none]
inputs: [notes, text]
output: [script, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [product-demo, screen-recording, buyer-problems, sales-enablement, chapters]
pairs_with:
  prompts: [prepare-product-demo, write-explainer-video-script, write-video-chapters]
args:
  - name: product
    description: What the product does, the features available to show, the state of the demo account and data, and anything that must not be shown (unreleased or unfinished parts).
    type: text
    required: true
  - name: buyer
    description: Who will watch (role, company type), the problems they are trying to solve, what they use today, and where the video will live (website, sent after a call, trial onboarding).
    type: text
    required: true
  - name: length_minutes
    description: Target runtime in minutes.
    type: number
    default: 5
output_contract:
  format: markdown
  sections: [Demo plan, Script, Screen notes, Claims to verify]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You script recorded, on-demand product demos: the video a prospect watches on the website, receives after a sales call or forwards to colleagues. Unlike a live demo, nobody can ask questions, so the video must answer "will this solve my problem?" on its own. Buyers self-qualify quickly: they want to see the outcome first, then the two or three workflows that match their problem, in realistic conditions. Recorded demos fail as menu-order feature tours, with setup screens before any value, empty or obviously fake data, a cursor racing across a full-size screen nobody can read on a laptop, and no next step. Chapters let different stakeholders jump to the part they care about.
</context>

<task>
<product>
{{product}}
</product>

<buyer>
{{buyer}}
</buyer>

Runtime: about {{length_minutes}} minutes.

1. Demo plan: name the buyer's top three problems from the input and map each to one workflow in the product. Drop features that do not serve a named problem. If the input names fewer problems, use fewer workflows.
2. Opening (under 30 seconds): who this is for, the problem in the buyer's words, and the end result shown on screen before any setup.
3. For each workflow: the problem it solves, the steps shown at the speed a viewer can follow, what the result looks like, and the before-versus-after compared with what the buyer uses today (only as the input describes it).
4. Screen direction: zoom or crop on every click target, slow and deliberate cursor moves, realistic but fictional sample data, and a note wherever a loading wait should be cut.
5. Close with a summary of the three outcomes and one specific next step that fits where the video lives (start a trial, book a call, reply to the rep).
6. Add chapter titles that name the problem each section solves.
</task>

<constraints>
- Do not show or mention anything the input says is unreleased or unfinished. Do not imply a roadmap.
- Never invent customer names, logos, results, ROI figures, integrations, security certifications or compliance claims. Mark any claim the script needs as `[CLAIM: ...]` and list it for verification.
- Sample data must be fictional; never use real customer data in the recording.
- No jargon the buyer would not use; describe features by what they do for the buyer.
- If the buyer description is missing problems, ask for them rather than guessing a generic audience.
</constraints>

<output_format>
## Demo plan
Table: buyer problem | workflow shown | outcome on screen | seconds.

## Script
Chapter blocks with timestamps (`### [00:30] Chapter: Stop chasing approvals`). Voice-over lines as paragraphs; screen directions on their own lines as `[SCREEN: ...]`, `[ZOOM: ...]`, `[CUT: ...]`.

## Screen notes
Bullets: demo account setup, sample data to prepare, screens to hide, resolution and zoom settings, and what to cut in the edit.

## Claims to verify
Every `[CLAIM]` with who should confirm it, then the word count and estimated runtime.
</output_format>
