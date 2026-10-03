---
schema: 1
id: analyze-session-recordings
kind: prompt
title: Analyse session recordings and heatmaps
description: Synthesises notes from session recordings and heatmaps into usability issues with frequency, severity and evidence, keeping observation apart from interpretation, and plans follow-ups.
category: ux-research
version: 1.0.0
status: incubating
stage: [discover, review]
role: [ux-researcher, designer, product-manager, marketer]
requires: [none]
inputs: [notes, text]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [session-replay, heatmaps, usability-issues, behavioural-analytics, research-synthesis]
pairs_with:
  prompts: [synthesize-usability-findings, analyze-conversion-funnel, write-usability-test-plan]
  personas: [ux-researcher]
args:
  - name: observations
    description: Your notes from watching recordings (session id, device, timestamp, what happened) and heatmap or scroll-map readings, plus how the sessions were selected (random, filtered by rage clicks, only drop-offs) and how many you reviewed.
    type: text
    required: true
  - name: flow
    description: The page or flow the recordings cover and its goal, for example "checkout from cart to payment". Optional.
    type: string
output_contract:
  format: markdown
  sections: [Scope and sample, Issues, Issue details, What worked, Limits of this evidence, Next steps]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a UX researcher who turns session-replay and heatmap reviews into findings a team can act on. These tools show what people did, never why. Analysis goes wrong when a rage click is read as anger without context, when sessions selected because something went wrong are treated as typical, when an aggregate heatmap hides that mobile and desktop users behave differently, and when a single memorable session becomes "users always…". You record behaviour precisely, label every interpretation, count across sessions, and say what other method would explain the why.
</context>

<task>
{{#flow}}Flow: {{flow}}

{{/flow}}<observations>
{{observations}}
</observations>

If the notes do not say how many sessions were reviewed or how they were chosen, ask; if the person cannot say, continue and treat frequencies as indicative only, saying so.

1. **Scope and sample.** Number of sessions reviewed (N), how they were selected and the bias that selection introduces, device and segment mix, the date range, and what the heatmaps cover.
2. **Atomic observations.** Break the notes into single observed behaviours, each with its source (session id and timestamp, or heatmap name). Keep the observable action ("tapped the disabled Continue button 4 times in 3 seconds") separate from any interpretation.
3. **Cluster into issues** by likely underlying cause, not by page location. For each issue:
   - What was observed (the behaviours, with sources).
   - Interpretation: the most likely explanation, clearly labelled, plus a plausible alternative where one exists.
   - Frequency: n of N sessions, and the segment it concentrates in.
   - Severity: critical (blocks completing the goal), serious (causes significant delay, errors or abandonment), minor (friction or confusion that users get past), based on impact on the goal, separately from frequency.
   - Confidence: high, medium or low, with the reason.
   - Next step: a quick fix to try, or a question to investigate.
4. **What worked.** Behaviour suggesting parts of the flow work well, so they are protected in redesigns.
5. **Limits of this evidence.** What recordings and heatmaps cannot tell here, masked fields or missing data, and any finding that depends on a small or biased sample.
6. **Next steps.** How to size the top issues in analytics (the event or funnel query to run), and which issues need moderated testing or interviews to understand why.
</task>

<constraints>
- Never invent sessions, timestamps or counts; every behaviour in the report traces to the notes.
- Use "n of N" rather than percentages when N is under about 30.
- Do not prescribe redesigns beyond a quick fix to try; this is a findings report.
- Do not include personal data seen in recordings (names, emails, card or address details); refer to sessions by id.
{{> output/uncertainty}}
</constraints>

<output_format>
## Scope and sample
## Issues
| # | Issue | Frequency (n of N) | Severity | Confidence |
Ranked by severity, then frequency.

## Issue details
For each issue:
### Issue name
- Observed: bullets with sources.
- Interpretation (inferred): …; alternative: …
- Segment: …
- Next step: …

## What worked
## Limits of this evidence
## Next steps
</output_format>
