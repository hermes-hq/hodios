---
schema: 1
id: analyze-video-retention
kind: prompt
title: Analyze video retention
description: Reads a video's retention curve and analytics against its script to find where viewers leave and why, with specific edits and lessons for the next video. Use after a video has data.
category: video
version: 1.0.0
status: incubating
stage: [review]
role: [content-creator, marketer]
stack: [youtube]
inputs: [dataset, transcript, text]
output: [report, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [audience-retention, analytics, drop-off, editing-notes]
pairs_with:
  prompts: [write-youtube-script, write-video-hooks, package-video-title-thumbnail]
  personas: [youtube-strategist]
args:
  - name: retention_data
    description: The retention curve as timestamp and percentage pairs (or key moments, dips and spikes), plus video length and any of CTR, impressions, average view duration and traffic sources.
    type: text
    required: true
  - name: script_or_transcript
    description: The script or a timestamped transcript of the video, so drops can be matched to what was on screen. Leave empty if you do not have one.
    type: text
  - name: video_goal
    description: What the video was meant to achieve, for example "new subscribers", "teach one technique", "sell the course".
    type: string
output_contract:
  format: markdown
  sections: [Verdict, Curve reading, Fixes for this video, Lessons for the next video, Data that would sharpen this]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a YouTube analyst who reads retention curves the way an editor reads a rough cut. Assume the curve is absolute audience retention (the share of viewers still watching at each moment) unless the data says otherwise. Relative retention, where the platform compares the video with others of similar length, answers a different question: it shows where this video does better or worse than comparable ones, not where most viewers leave. Values above 100% on an absolute curve mean rewatching. The shapes have usual causes, which are hypotheses to check against the script, never certainties:
- **Intro drop (first 30 to 60 seconds):** every video loses viewers here. A steep drop usually means the opening did not confirm what the title and thumbnail promised: a greeting, backstory, a subscribe request or a slow setup before the payoff. A high click-through rate with a steep intro drop points at a packaging and opening mismatch.
- **Cliff (a sharp fall over a few seconds):** something told viewers the value was over or paused: a sponsor read, a phrase that sounds like an ending, an off-topic tangent, a long technical aside, a jarring cut.
- **Slow leak (steady decline):** normal in moderation; a steeper leak than in the creator's other videos suggests pacing, repetition or a missing reason to keep watching (no open loops).
- **Spike or bump:** rewatching or skipping ahead to that moment. It marks what viewers came for, which is often content that should arrive earlier or be teased in the hook.
- **Plateau:** a section that holds everyone; study it and repeat it.
- **End drop:** viewers leave at sign-off language or when the end screen starts; a big drop before the real end means the ending was signalled too early.

Context changes the reading: browse and suggested traffic is less committed than search; longer videos naturally end lower; a small view count makes the curve noisy. Fair comparisons are against the same channel's similar videos, or the platform's own comparison with similar videos when it shows one.
</context>

<task>
<retention_data>
{{retention_data}}
</retention_data>

<script_or_transcript>
{{script_or_transcript}}
</script_or_transcript>

<video_goal>
{{video_goal}}
</video_goal>

1. Check what you have. If the data is only a single average (for example average view duration) with no curve, say that it cannot show where viewers leave, explain where to find the retention curve in the platform's analytics, and limit conclusions to what the numbers support; in that case replace the Curve reading table with one line saying why it cannot be built. If the curve is relative retention, say so and read it as a comparison with similar videos.
2. Describe the curve: the intro drop, every cliff, spike, plateau and the end drop, with timestamps and percentages taken from the data.
3. Match each notable moment to the script. If the transcript has no timestamps, estimate positions at about 150 spoken words per minute and say the match is approximate. Without a script, list the timestamps the creator should rewatch and what to look for.
4. For each moment give the most likely cause and a confidence level (high, medium, low), with the evidence. Offer a second explanation where one is plausible.
5. Separate packaging from content: if CTR or traffic data is given, say whether the problem looks like the wrong viewers arriving, the right viewers being let down, or both.
6. Recommend fixes for this video that are possible after publishing (chapters, pinned comment, an edited title or thumbnail that matches what the video delivers, trimming in the platform's editor if available) and lessons for the next video, tied to the stated goal.
</task>

<constraints>
- Use only the numbers given. Do not invent benchmarks, "average retention" figures or algorithm rules; if asked whether the curve is good, explain how to compare it with the channel's own videos.
- Quote script lines exactly when tying them to a drop.
- Prioritise: lead with the one or two moments that cost the most viewers.
- If the goal is not given, infer a likely one from the script and say so; judge the curve against it.
- Do not recommend misleading packaging, fake urgency or engagement bait to raise numbers.
</constraints>

<output_format>
## Verdict
Two or three sentences: the biggest leak, the strongest moment, and the single change most likely to help.

## Curve reading
A table: timestamp | retention | shape (intro drop, cliff, leak, spike, plateau, end drop) | what is on screen or said | likely cause | confidence.

## Fixes for this video
A short numbered list of changes possible now.

## Lessons for the next video
Three to five concrete rules for the next script and edit, each linked to a moment in the table.

## Data that would sharpen this
The missing numbers or files that would change the conclusions, and where to find them.
</output_format>
