---
schema: 1
id: build-transcription-pipeline
kind: prompt
title: Build a speech-to-text transcription pipeline
description: "Builds a speech-to-text pipeline with Whisper-class models: audio normalisation, silence-aware chunking, diarisation, word timestamps, hallucination guards and a word error rate check."
category: ai-ml
version: 1.0.0
status: incubating
stage: [build]
role: [ml-engineer, backend-engineer]
stack: [python]
requires: [repo-read, file-write, shell]
inputs: [audio, repo]
output: [code, report]
risk: runs-commands
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [speech-to-text, whisper, diarization, word-error-rate, audio-processing]
pairs_with:
  prompts: [clean-up-speech-transcript, redact-personal-data]
args:
  - name: audio
    description: What the recordings are (calls, meetings, interviews, lectures), languages and accents, typical length, quality, and volume per day.
    type: text
    required: true
  - name: output_needs
    description: What the transcript must contain (speaker labels, word timestamps, subtitles, plain text) and who uses it.
    type: text
    required: true
  - name: constraints
    description: Hardware, whether audio may leave the company, cost or turnaround limits.
    type: string
output_contract:
  format: markdown
  sections: [Design, Code, Accuracy check, Known failure modes, Check, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Whisper-class models are strong but fail in specific ways in pipelines. On silence, music or noise they hallucinate fluent text, often repeating a phrase; voice activity detection before decoding removes most of it. Cutting audio at fixed 30-second boundaries splits words; chunk at pauses with a small overlap and merge carefully. Conditioning each window on the previous text can lock the model into a repetition loop. Automatic language detection on the first seconds misfires for code-switching or long intros. Segment-level timestamps drift; word-level timestamps need forced alignment. Diarisation is a separate model whose speaker turns must be merged with words by time overlap, and it struggles with overlapping speech and similar voices. Accuracy must be measured as word error rate on a sample with careful reference transcripts and text normalisation, or the number is meaningless. Recordings of people carry consent and privacy obligations.
</context>

<task>
Build a transcription pipeline for: {{audio}}

Output needs: {{output_needs}}
{{#constraints}}

Constraints: {{constraints}}
{{/constraints}}

1. Read the repository and existing audio or job-queue code. Choose between a local model (faster-whisper or similar, model size from the hardware and accuracy needs) and a hosted API given the data constraints, and state the trade-off.
2. Normalise audio: decode any format, convert to mono 16 kHz, and record duration and loudness. Reject or flag files that are silent or corrupt.
3. Apply voice activity detection and chunk at pauses under the model's window with a short overlap; merge chunk outputs by timestamps, removing duplicated words at the overlaps.
4. Decode with settings that reduce hallucination: VAD on, previous-text conditioning off or limited, temperature fallback, and a repetition and low-confidence filter that flags rather than silently deletes text. Set the language explicitly when known.
5. If needed, add word timestamps through alignment, and diarisation with a model whose licence and access terms are stated; assign speakers to words by maximum time overlap and mark overlapping speech.
6. Write outputs in the needed formats (JSON with words, speakers and confidences; SRT or WebVTT; plain text) with a version record of the models used.
7. Build an accuracy check: 10-20 representative clips with human reference transcripts, word error rate after normalising case, punctuation and numbers, broken down by speaker or condition; and diarisation error on a few clips if speakers matter.
8. Process long files and batches as resumable jobs; run the pipeline on sample files and the accuracy check, and report real results and real-time factor.
</task>

<constraints>
- Do not send audio to an external service unless the constraints allow it; ask when unsure.
- Remind the user that recording and transcribing people may require consent; do not advise on legality beyond saying it must be checked.
- Do not report accuracy without a measured word error rate on reference transcripts.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Design
Model choice, chunking, decoding settings, diarisation, outputs.
## Code
Code blocks with file paths.
## Accuracy check
Table: clip type | WER | notes, and diarisation results if relevant.
## Known failure modes
Bullets with how the pipeline flags each.
## Check
Commands run, real-time factor, real results.
## Open questions
Numbered, or "None".
</output_format>
