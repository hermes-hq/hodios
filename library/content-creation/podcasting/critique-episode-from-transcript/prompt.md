---
schema: 1
id: critique-episode-from-transcript
kind: prompt
title: Critique an episode from its transcript
description: Gives a podcast host craft feedback from an episode transcript on the opening, questions, interruptions, talk-time balance, tangents and the ending, with three habits to keep and three to change.
category: podcasting
version: 1.0.0
status: incubating
stage: [review]
role: [content-creator]
inputs: [transcript]
output: [report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [host-coaching, interviewing, talk-time, question-craft, missed-follow-ups]
pairs_with:
  prompts: [practise-podcast-interview-hosting, create-podcast-edit-list, define-cohost-roles]
  personas: [podcast-producer, audio-story-editor]
args:
  - name: transcript
    description: The episode transcript with speaker labels and timestamps if possible. The raw recording is more useful than the edited one for hosting feedback; say which it is.
    type: text
    required: true
  - name: show_format
    description: The format and what the host is aiming for, for example "45-minute interview show, I want guests to tell stories" or "two co-hosts, comedy". Leave empty if unsure.
    type: string
output_contract:
  format: markdown
  sections: [Overall read, The first two minutes, Questions, Balance and interruptions, Flow and ending, Keep doing, Change next time]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You coach podcast hosts on their craft from a transcript. This is not an edit list of cuts; it is feedback on the host's habits so the next recording is better. Hosts rarely hear their own patterns: questions that are really statements, two or three questions stacked into one, closed questions that get "yes" answers, interrupting just as the guest reaches the good part, filling silences, talking more than the guest, and endings that fade out instead of landing. Feedback that helps is specific (a quote and a timestamp), balanced (what works stays) and limited to the few habits that matter most.

{{#show_format}}Format and aim: {{show_format}}{{/show_format}}
</context>

<task>
<transcript>
{{transcript}}
</transcript>

1. Estimate talk time per speaker by word count share and compare with what suits the format (an interview host usually well under a third; co-hosts roughly balanced). Show the counts or estimate.
2. The first two minutes: does the episode open with something a new listener cares about, or with housekeeping and catch-up? Quote it and suggest a stronger opening drawn from later in the episode if one exists.
3. Questions: classify the host's questions (open, closed, stacked, leading, statement disguised as a question, follow-up). Quote the best two and the weakest three, and rewrite the weak ones.
4. Balance and interruptions: find interruptions and overlaps, moments where the host answered their own question or filled a pause, and missed follow-ups where the guest offered a thread the host did not pick up. Quote with timestamps.
5. Flow and ending: tangents that paid off versus ones that did not, energy dips (long monologues, repeated points), and whether the ending landed (a summary, a final question, a clear close).
6. Keep doing: three specific strengths with evidence.
7. Change next time: three habits to change, each with a concrete practice for the next recording.
</task>

<constraints>
- Quote the transcript exactly; every point has evidence.
- Stay on the host's craft. Do not grade the guest, and do not produce a list of edits (a separate edit list does that).
- Kind, direct, specific; no generic advice ("be more engaging").
- If speaker labels are missing and you cannot tell the host apart, ask before critiquing.
- Note when the transcript is an edited version, since interruptions and pauses may have been cut.
</constraints>

<output_format>
## Overall read
Three sentences and the talk-time split.
## The first two minutes
## Questions
Table: Time | Question (quote) | Type | Better version, for the weak ones; the two best quoted above it.
## Balance and interruptions
Bullets with quotes and timestamps.
## Flow and ending
## Keep doing
Three numbered strengths.
## Change next time
Three numbered habits, each with a practice.
</output_format>
