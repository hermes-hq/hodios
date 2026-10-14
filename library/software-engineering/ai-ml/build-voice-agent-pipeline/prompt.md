---
schema: 1
id: build-voice-agent-pipeline
kind: prompt
title: Build a voice agent pipeline
description: Builds a real-time voice agent pipeline (speech-to-text, LLM, text-to-speech) with streaming at every stage, turn detection, barge-in, a latency budget and graceful failure handling.
category: ai-ml
version: 1.0.0
status: incubating
stage: [design, build]
role: [backend-engineer, ml-engineer, fullstack-engineer, software-engineer]
stack: [llm-apps]
requires: [repo-read, file-write, shell]
inputs: [repo, spec]
output: [code, plan, tests]
risk: runs-commands
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [voice-ai, speech-to-text, text-to-speech, barge-in, latency-budget]
pairs_with:
  prompts: [implement-llm-streaming, implement-llm-tool-calling]
args:
  - name: use_case
    description: What the voice agent does, the channel (phone line, web browser, mobile app), languages, and expected call length and volume.
    type: text
    required: true
  - name: components
    description: Speech-to-text, LLM and text-to-speech providers or models already chosen, and any voice framework in use, or "not chosen yet".
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Architecture, Latency budget, Turn taking, Code, Tests, Check, Risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A voice agent feels broken when the gap between the caller finishing and the agent speaking exceeds about a second, when it talks over the caller, or when it cannot be interrupted. Getting under that bar means streaming every stage: partial transcripts from speech-to-text, the LLM's first tokens starting text-to-speech on the first complete sentence, and audio playback beginning before the reply is finished. Turn detection is the hardest part: a fixed silence timeout either cuts people off mid-thought or adds dead air, so voice activity detection plus a semantic end-of-turn check works better. Barge-in means stopping playback and cancelling the in-flight LLM and TTS requests the moment the caller speaks, and recording what was actually heard so the history matches reality. Phone audio adds its own constraints: 8 kHz codecs, echo, and DTMF tones.
</context>

<task>
Build the voice pipeline for: {{use_case}}

Components: {{components}}

1. Read any existing code. If components are not chosen, list the criteria (streaming support, latency, languages, telephony support, data handling) and leave the choice to the user rather than picking vendors from memory.
2. Architecture: audio transport (WebRTC for browsers, the telephony provider's media stream for phone), a session process per call, and the stages wired as streams with cancellation: STT streaming, turn detector, LLM streaming, sentence chunker, TTS streaming, playback.
3. Latency budget: set targets per stage (end-of-turn detection, STT finalisation, LLM time to first token, TTS time to first audio, network) summing to the total target, and log each per turn.
4. Turn taking: voice activity detection with a tuned silence threshold, plus an end-of-turn check on the transcript where available; handle short backchannels ("uh-huh") without treating them as interruptions.
5. Barge-in: on detected caller speech during playback, stop audio, cancel the LLM and TTS requests, and truncate the assistant message in history to what was actually played.
6. Voice-specific prompting: short sentences, no Markdown, lists or URLs read aloud, numbers and dates in speakable form, and confirmation of critical details (amounts, addresses) by reading them back.
7. Failure handling: a spoken fallback when a stage times out, retry or switch for STT and TTS errors, a path to a human or a callback, and clean hang-up handling that releases resources.
8. Tests: unit tests for the sentence chunker and barge-in truncation, and a scripted audio or transcript replay test for turn taking. Run them and report. Describe a manual test script for real calls.
</task>

<constraints>
- Do not record or store call audio or transcripts unless the use case says it is allowed; note consent and disclosure duties vary by country and leave that decision to the owner.
- Use the real streaming APIs of the chosen components for the versions in the repository; if unsure, say so.
- Prefer the project's existing voice framework if one is in use rather than rewiring the stages by hand.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Architecture
Stages, transport and cancellation path, in a short numbered list.
## Latency budget
Table: stage | target ms | how measured.
## Turn taking
Endpointing and barge-in rules with starting values to tune.
## Code
Code blocks with file paths.
## Tests
Code blocks with file paths, plus the manual call test script.
## Check
Commands run with real results.
## Risks
Latency, cost per minute, privacy and failure risks still open.
</output_format>
