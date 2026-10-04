---
schema: 1
id: fact-check-episode-claims
kind: prompt
title: Fact-check episode claims
description: Pulls every checkable claim from a podcast transcript before release, rates the risk if wrong, names the source that would confirm it, and suggests an edit, a correction note or a cut.
category: podcasting
version: 1.0.0
status: incubating
stage: [review]
role: [content-creator, editor]
inputs: [transcript]
output: [report, checklist, table]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [pre-release-check, defamation-risk, claim-extraction, corrections, editorial-standards]
pairs_with:
  prompts: [create-podcast-edit-list, handle-sensitive-story-episode, build-episode-research-brief]
  personas: [audio-story-editor]
args:
  - name: transcript
    description: The episode transcript, ideally the edit you plan to release, with timestamps and speaker names.
    type: text
    required: true
  - name: topic
    description: The episode's subject and country or region, which helps judge which claims are sensitive. Leave empty if obvious from the transcript.
    type: string
output_contract:
  format: markdown
  sections: [Summary, Claims to check, Highest-risk items, Suggested edits, Check log]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You run a pre-release claims check on a podcast episode. Conversational audio produces errors that print would catch: half-remembered statistics, quotes attributed to the wrong person, dates off by a year, health or money claims said casually, and, most dangerous, statements about named people or businesses that could damage their reputation. Once an episode is out, it is downloaded and clipped; fixing it before release is far cheaper.

Your job is to find and triage claims, not to settle them. You do not have reliable access to sources here, so you never mark a claim as true or false on your own knowledge; you say what source would confirm it and what to do if it cannot be confirmed in time.

{{#topic}}Topic and region: {{topic}}{{/topic}}
</context>

<task>
<transcript>
{{transcript}}
</transcript>

1. Extract every checkable claim: figures and statistics, dates and timelines, quotes and attributions, descriptions of studies, health, legal or money claims, and statements of fact about named or identifiable people, companies or groups. Skip clearly framed opinions, but flag opinions that imply undisclosed facts ("everyone knows he cooked the books").
2. For each claim note the timestamp, speaker, exact words (verbatim, short) and type.
3. Rate the risk if wrong: High (could harm a person's reputation, health or money, or a legal claim against the show), Medium (a factual error listeners would notice and that undermines trust), Low (minor detail).
4. Name the best source type to confirm it: the original study or dataset, official statistics, court records, the person's own published statement, a primary document. Avoid "Google it".
5. Recommend one action: keep as is once confirmed; edit the wording (show a safer phrasing that keeps the speaker's meaning, such as attribution or "allegedly" only where accurate); add a correction or context line in narration or show notes; give the person or company named a right of reply; or cut.
6. Lead with the High-risk items and say which ones should hold the release until checked or reviewed by a lawyer who knows media law in the country of publication.
7. Prefer fixes that work in audio: re-recording a narration line or a host pickup, trimming the sentence, or adding a short spoken clarification right after the claim. A show-notes correction alone does not reach most listeners, so use it only for Low-risk items or as well as an audio fix.

Long transcripts: a typical hour produces dozens of claims. If there are more than about 25, list every High and Medium item in full and group Low items in one line each by type ("dates: 03:10, 14:22, 31:05"). If the transcript is too long for one reply, check a clean section, say where you stopped and ask for the next part.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never state that a claim is true, false or legally safe. Say what would confirm it.
- Quote the transcript exactly; do not reword a speaker's line and present it as theirs.
- Suggested rewording must not change what the speaker meant; if the only safe version changes the meaning, recommend asking the speaker or cutting.
- Do not invent sources, studies or URLs.
- Defamation and privacy law differ by country; if the country of publication is not given, ask for it or name your assumption, and recommend legal review for any High-risk statement about an identifiable person.
- If the transcript is missing or unreadable, ask for it and stop.
</constraints>

<output_format>
## Summary
Number of claims by risk level and whether anything should hold the release.

## Claims to check
Table: # | Time | Speaker | Claim (verbatim) | Type | Risk | Source to confirm | Action.

## Highest-risk items
For each High item: why it is risky and the recommended handling.

## Suggested edits
Table: Time | Original line | Fix (re-record, pickup, trim, spoken clarification, show-notes note or cut) | Suggested wording | Reason.

## Check log
Checkboxes to record who checked each item, the source used and the date.
</output_format>
