---
schema: 1
id: diagnose-stream-quality-issues
kind: prompt
title: Diagnose stream quality issues
description: Diagnoses why a livestream lags, drops frames, stutters or looks blocky by separating network, encoder and rendering causes from the streamer's stats and logs, then gives one change at a time to test.
category: livestreaming
version: 1.0.0
status: incubating
stage: [operate, maintain]
role: [content-creator, gamer]
inputs: [logs, notes, config]
output: [explanation, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [dropped-frames, encoder-overload, bitrate, stream-lag, stream-settings]
pairs_with:
  prompts: [choose-first-streaming-setup, plan-stream-scenes]
  personas: [stream-producer]
args:
  - name: symptoms
    description: What viewers or you see (buffering, pixelation in fast motion, choppy video while the game is smooth, audio out of sync, the stream dropping), when it happens and since when.
    type: text
    required: true
  - name: setup
    description: Computer (CPU, GPU, RAM), streaming software and encoder, output resolution, frame rate and bitrate, platform, wired or wireless connection, and measured upload speed.
    type: text
    required: true
  - name: logs
    description: Optional. The streaming software's log or stats panel figures (frames dropped due to network, skipped due to encoding lag, missed due to rendering lag, CPU usage).
    type: text
output_contract:
  format: markdown
  sections: [Most likely cause, Evidence, Fix plan, Settings to try, How to confirm, Missing information]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Stream quality problems have three distinct sources and each has a different fix, so the first job is to tell them apart. Network problems (frames dropped because the connection could not send them) come from upload speed, an unstable or wireless connection, or a bitrate too high for the line, and show up for viewers as buffering or disconnects. Encoder problems (frames skipped because encoding lagged) come from asking the CPU or GPU encoder for more than it can do, often a slow CPU preset or a GPU already maxed by the game. Rendering problems (frames missed because the software could not draw them) come from the GPU being saturated, often by an uncapped game frame rate, and show as a choppy stream while the game feels fine. Blocky video in fast motion with no dropped frames is usually just too little bitrate for the resolution and frame rate, which is fixed by lowering resolution or frame rate, not by raising bitrate past what the platform or the line allows. Upload speed tests vary; leave headroom rather than using the full measured upload. Change one thing per test.
</context>

<task>
<symptoms>
{{symptoms}}
</symptoms>

<setup>
{{setup}}
</setup>

{{#logs}}
<logs>
{{logs}}
</logs>
{{/logs}}

1. **Most likely cause:** network, encoder, rendering, or bitrate-for-resolution (or a combination), ranked, in plain words.
2. **Evidence:** which symptom, number or log line points to each cause. If the logs are missing, say which stats to read and where to find them in general terms.
3. **Fix plan:** ordered changes, cheapest and most likely first (for example wired connection, capping the game frame rate, a faster encoder preset or switching between CPU and GPU encoding, lowering output resolution or frame rate, lowering bitrate to leave upload headroom), with the trade-off of each.
4. **Settings to try:** a starting profile for this hardware and line as a table, stated as starting points to test, and a note to check the platform's current recommended bitrate and resolution ranges.
5. **How to confirm:** a short private test (a test stream or local recording of the same scene for 10 minutes), which numbers should improve, and when to stop changing things.
6. **Missing information:** what would sharpen the diagnosis.
</task>

<constraints>
- Do not quote platform bitrate caps or encoder behaviour for specific hardware as fact when unsure; mark them as checks.
- Change one setting per test, and say so.
- Do not recommend buying hardware until free changes are tried; when hardware is the limit, say what kind of upgrade addresses which cause.
- If the symptom is audio drift or desync, treat it separately from video and say so.
</constraints>

<output_format>
## Most likely cause
## Evidence
Table: cause | evidence for | evidence against.

## Fix plan
Numbered, with trade-offs.

## Settings to try
Table: setting | try | why.

## How to confirm
## Missing information
</output_format>
