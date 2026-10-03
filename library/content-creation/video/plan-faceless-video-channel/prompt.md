---
schema: 1
id: plan-faceless-video-channel
kind: prompt
title: Plan a faceless video channel
description: Plans a faceless YouTube or short-form channel with niche, format, a repeatable workflow, voice-over, visual sourcing and policy checks. Use before starting a channel you will not appear on.
category: video
version: 1.0.0
status: incubating
stage: [plan]
role: [content-creator]
stack: [youtube, tiktok]
inputs: [topic, preferences]
output: [plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [faceless-channel, voice-over, stock-footage, monetization-policy, production-workflow]
pairs_with:
  prompts: [plan-video-series, write-explainer-video-script, package-video-title-thumbnail]
  personas: [youtube-strategist]
args:
  - name: niche
    description: The topic area you want to cover and why you know or care about it.
    type: text
    required: true
  - name: resources
    description: Your hours per week, budget, skills (writing, editing, animation, voice), tools you have, and whether you would use your own voice, a hired voice or a synthetic voice.
    type: text
output_contract:
  format: markdown
  sections: [Niche and angle, Format, Production workflow, Voice and visuals, Policy and rights checks, First 10 videos, 90-day plan]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan channels where the creator never appears on camera: narrated explainers, history and science stories, screen-recorded tutorials, animated breakdowns, compilations with commentary, relaxing ambience, and similar. Without a face, the channel's identity must come from three things: a distinct point of view or depth of research, a recognisable voice and visual style, and a format viewers can predict. The common failure is a channel of interchangeable stock clips over a generic script; platforms' monetisation rules exclude mass-produced, repetitive or reused content, and YouTube requires creators to disclose realistic altered or synthetic content. Copyright is the second common failure: footage, music and images need licences that cover the use, and fair use or fair dealing is narrow, jurisdiction-specific and decided case by case.
</context>

<task>
<niche>
{{niche}}
</niche>

<resources>
{{resources}}
</resources>

1. **Niche and angle.** Test the niche on four questions: is there a defined audience with recurring questions, can the creator make 50 videos without running dry, is there a format that works without a face, and is there an angle existing channels do not own. Propose the angle in one sentence ("The only channel that…"), with two alternative angles. If the niche fails a test, say which and suggest an adjacent niche.
2. **Format.** Choose long-form, short-form or both, with a target length, cadence and a repeatable episode structure (cold open, sections, recurring segment, ending). Explain why this format suits a faceless channel in this niche.
3. **Production workflow.** A step-by-step pipeline from idea to upload (research, script, voice, visuals, edit, thumbnail, publish), with hours per video at the chosen cadence, checked against the stated hours. Show what to batch and what to template. If the hours do not fit, cut the cadence, not the quality.
4. **Voice and visuals.** Recommend a voice approach that fits the resources: own voice (with basic recording tips), hired voice talent, or a synthetic voice, with the trade-offs in warmth, cost, consistency and audience trust. Recommend visual sources ranked by originality: own screen recordings, own footage, custom motion graphics or illustration, licensed stock, public-domain archives. Define a simple visual identity (colours, type, a recurring graphic element).
5. **Policy and rights checks.** A checklist for this channel: the licence each asset source must carry, music licensing, what counts as transformative commentary versus reuse, disclosure of synthetic voices or realistic generated visuals, and how to keep the channel from looking mass-produced (original research, a consistent narrator perspective, varied structure).
6. **First 10 videos.** Titles with a one-line premise each, ordered so the first three show the channel's range and promise.
7. **90-day plan.** Weekly milestones, what to measure (click-through rate, average view duration, returning viewers) and the decision point for adjusting the format.
</task>

<constraints>
- Name tool categories, not specific products, unless the user already named a tool.
- Do not promise earnings, subscriber numbers or timelines to monetisation; describe what the numbers depend on.
- Never recommend reuploading others' videos, lightly edited compilations of others' content, or scripts rewritten from someone else's video. Say why if the niche invites it.
- If resources are empty, assume 5 hours a week and no budget, and say so.
- Platform rules change. Tell the user to check the current monetisation, disclosure and copyright policies before launch rather than quoting thresholds you are unsure of.
</constraints>

<output_format>
## Niche and angle
The four tests with a short verdict each, the chosen angle and two alternatives.

## Format
Length, cadence and the episode structure as a numbered list.

## Production workflow
A table: step | what happens | tool category | hours per video. Total hours against the hours available.

## Voice and visuals
The voice recommendation with trade-offs, the ranked visual sources and the visual identity.

## Policy and rights checks
A checklist.

## First 10 videos
Numbered titles with premises.

## 90-day plan
A week-by-week table, then the metrics and the decision point.
</output_format>
