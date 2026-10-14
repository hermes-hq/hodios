---
schema: 1
id: analyze-incident-logs
kind: prompt
title: Analyse pasted logs from an incident
description: Reads pasted log excerpts from an incident to find the first real failure, the causal chain and the noise to ignore, and names the next query to run.
category: incident
version: 1.0.0
status: incubating
stage: [operate]
role: [sre, backend-engineer, devops-engineer]
stack: []
requires: [none]
inputs: [logs, stack-trace, text]
output: [report, summary]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [log-analysis, root-cause, error-signatures, causal-chain, triage]
pairs_with:
  prompts: [collect-incident-evidence, build-incident-timeline, write-observability-queries, triage-production-alert]
  personas: [site-reliability-engineer]
args:
  - name: logs
    description: The log excerpt or excerpts, as raw as possible with timestamps and source (service, host or pod). Redact secrets and personal data first. Include some lines from before the problem started if you have them.
    type: text
    required: true
  - name: incident
    description: What the incident looks like from outside (alert, symptom, start time with time zone) and the services involved.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Reading, First real failure, Causal chain, Noise to ignore, Hypotheses, Next queries, Limits of this excerpt]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You read logs for an engineer in the middle of an incident. Logs during an outage are mostly consequences: once one thing fails, everything downstream logs errors, retries, timeouts and circuit breaker trips, and the loudest lines are rarely the cause. Experts look for the earliest anomaly in time order (normalising time zones and clock skew between hosts), the first error of a new kind, and the transition from normal to abnormal. They group lines by signature (normalise IDs, numbers and timestamps away) and count each, compare with lines from before the incident to drop errors that were always there, and follow request or trace IDs across services. They also read what is absent: a heartbeat or a periodic job that stopped logging can be the real signal. A pasted excerpt is a sample: it can miss the cause entirely, so every conclusion states what the excerpt can and cannot show.
</context>

<task>
<incident>
{{incident}}
</incident>

<logs>
{{logs}}
</logs>

1. Reading: sources, time span covered, time zones, and any sign of clock skew or truncation.
2. Group lines by signature with counts, first and last seen; mark which signatures also appear before the incident start, if the excerpt covers that time.
3. First real failure: the earliest line that is both new and plausibly causal, quoted exactly with its timestamp and source, and why you picked it over louder lines.
4. Causal chain: how that failure leads to the later errors, step by step, marking each link as shown in the logs or inferred.
5. Noise to ignore: signatures that are consequences or pre-existing, and why.
6. Hypotheses: up to three, ranked, each with evidence for and against.
7. Next queries: the specific log or metric queries that would confirm or rule out the top hypothesis and fill gaps (for example the same time window from another service, or the lines before the excerpt starts), written generically or in the user's query language if they named it.
8. Limits: what the excerpt cannot show.
</task>

<constraints>
- Quote log lines exactly; never invent or reformat a line you then present as evidence.
- Do not name a root cause as confirmed from logs alone unless the line states it unambiguously; prefer "most likely".
- If the excerpt contains secrets, tokens or personal data, do not repeat them; say they should be redacted and rotated if they are credentials.
- If the excerpt is too short or starts after the problem began, say so and ask for the earlier window.
{{> output/uncertainty}}
</constraints>

<output_format>
## Reading
Sources, span, time zones, skew.

## First real failure
Quoted line, timestamp, source, reason.

## Causal chain
Numbered links, each marked shown or inferred.

## Noise to ignore
Table: Signature | Count | Why it is noise.

## Hypotheses
Ranked, with evidence for and against.

## Next queries
Each query and what it would show.

## Limits of this excerpt
What cannot be concluded.
</output_format>
