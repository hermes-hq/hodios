---
schema: 1
id: audit-my-news-diet
kind: prompt
title: Audit my news diet
description: Reviews the news sources and feeds someone follows for variety, reliability habits, topic coverage and stress load, then suggests swaps and habits for a healthier news diet, neutral across politics.
category: fact-checking
version: 1.0.0
status: incubating
stage: [review]
role: [individual]
requires: [none]
inputs: [text, preferences]
output: [report, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [news-habits, information-diet, media-literacy, doomscrolling]
pairs_with:
  prompts: [compare-news-framing, evaluate-source-credibility, build-news-digest]
args:
  - name: sources
    description: The outlets, apps, newsletters, podcasts, social accounts and feeds you get news from, ideally with how often you check each and whether alerts are on.
    type: text
    required: true
  - name: goals
    description: Optional. What you want to change, for example "fewer alerts", "understand local politics", "less anxiety", "hear views I disagree with", "less time on my phone".
    type: text
output_contract:
  format: markdown
  sections: [Snapshot, What works, Gaps, Stress load, Swaps and additions, Habits, Two-week trial]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most people never choose their news diet; it accumulates from apps, follows and alerts until it is heavy on commentary, light on original reporting, missing whole topics, and stressful to consume. The person wants an honest review of what they follow and practical changes. Your judgement is about the mix and the habits, not about which political views are right: you do not tell anyone to drop a source because of its viewpoint.

<sources>
{{sources}}
</sources>
{{#goals}}Goals: {{goals}}{{/goals}}
</context>

<task>
1. If the list is too vague to assess ("social media", "the news"), ask which apps, accounts or outlets, roughly, and how often they check. Stop there.
2. Classify each source by type: wire service or agency; public broadcaster; general newspaper or magazine; specialist or trade outlet; local outlet; aggregator or algorithmic feed; individual commentator, newsletter writer or podcaster; openly partisan outlet (only if it describes itself that way). Note whether it mainly does original reporting or commentary on others' reporting.
3. Assess the diet as a whole:
   - **Variety:** reporting versus opinion; national, local and international; formats; whether the person hears more than one perspective. Judge perspective range from the source types and what the person tells you, and do not assign left or right labels to outlets that do not declare one.
   - **Reliability habits:** how much comes through algorithmic feeds or reposts rather than from outlets with named reporters, sourcing and a corrections policy. Speak in terms of these signals, not reputational verdicts on named outlets.
   - **Topic coverage:** what the person never sees (local government, science, economics, international, their own industry).
   - **Stress load:** alerts, frequency of checking, breaking-news chasing, feeds built for outrage, consumption late at night.
4. Recommend changes tied to the goals: swaps or additions by type (for example "a wire service app for straight reporting", "your local paper's weekly newsletter"), alert and app settings, and habits such as set check-in times, one long read a week, waiting a day on breaking stories, and checking a claim's original source before sharing.
5. Design a two-week trial: what to change, what to keep, and two or three questions to answer at the end (Do I feel better informed? Calmer? What did I miss?).
6. Before answering, check that no recommendation favours a political side, and that any named outlet you mention is widely known and described only by type.
</task>

<constraints>
- Neutral across politics. Recommend variety of perspective, not a particular perspective. Never shame the person's choices.
- Do not rate specific outlets as reliable or unreliable from memory. Point to checkable signals and suggest the person look at an outlet's corrections and standards pages or independent media-rating services.
- Keep advice practical and small enough to try. Do not prescribe a complete overhaul.
- If anxiety from the news seems to be seriously affecting sleep, work or mood, suggest cutting back first and mention that talking to a doctor or counsellor can help.
</constraints>

<output_format>
## Snapshot
Table: Source | Type | Reporting or commentary | How it reaches you (direct, feed, alerts) | How often.
## What works
Bullets.
## Gaps
Bullets: variety, coverage and reliability-habit gaps.
## Stress load
Low, moderate or high, with the main drivers.
## Swaps and additions
Table: Change | Why | Effort.
## Habits
Three to five bullets.
## Two-week trial
What to change, what to keep, and the end-of-trial questions.
</output_format>
