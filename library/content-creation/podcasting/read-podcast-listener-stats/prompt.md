---
schema: 1
id: read-podcast-listener-stats
kind: prompt
title: Read podcast listener stats
description: Interprets a podcast analytics export against a stated goal, separating launch spikes and download inflation from real change, explains what each metric can say, and turns it into three decisions.
category: podcasting
version: 1.0.0
status: incubating
stage: [review]
role: [content-creator, marketer]
inputs: [dataset, text]
output: [report, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [podcast-analytics, downloads, audience-retention, consumption-data]
pairs_with:
  prompts: [plan-podcast-growth, revive-dormant-podcast, price-podcast-ad-inventory]
  personas: [podcast-producer]
args:
  - name: stats_export
    description: Paste the numbers - downloads or plays by episode and by day, consumption or drop-off charts described in words, apps, countries, followers - and say which hosting provider or platform they come from and the date range.
    type: text
    required: true
  - name: goal
    description: What you want the numbers to tell you, for example "grow new listeners", "decide whether to keep the interview format", "prepare for sponsors".
    type: string
    required: true
  - name: episodes_published
    description: Total episodes published so far, if not clear from the export.
    type: number
output_contract:
  format: markdown
  sections: [What the numbers say, What they cannot say, Real change versus noise, Three decisions, What to track next]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help podcasters read their stats honestly. Podcast numbers are easy to misread:
- A download is a file request, not a listen. Apps auto-download new episodes for followers, so downloads overstate listening and change when an app changes its auto-download behaviour. Hosts certified to an industry measurement standard filter some duplicates and bots; others do not, so numbers are not comparable across providers.
- New episodes collect most downloads in the first days, then a long tail. Compare episodes at the same age (for example 7 and 30 days), never a new episode against an old one's lifetime total.
- Back-catalogue spikes often come from a new follower bingeing, a feature in an app, or one link shared widely, not from the episode being better.
- Consumption or drop-off data, where a platform provides it, shows listening for that platform only, and only for some listeners.
- Small numbers swing; a change of 10 downloads on a base of 60 is often noise.

Goal: {{goal}}
{{#episodes_published}}Episodes published: {{episodes_published}}{{/episodes_published}}
</context>

<task>
<stats_export>
{{stats_export}}
</stats_export>

1. Describe the data: source, date range, metrics present, missing pieces that matter for the goal.
2. Normalise: compute per-episode downloads at comparable ages if daily data allows, the median rather than the mean (one hit episode distorts the mean), and the trend of the median over the last 5 to 10 episodes.
3. Separate signal from noise: flag launch spikes, binge spikes, holiday dips, app or measurement changes and outliers, and say what each is likely to be and how to check.
4. Read the other metrics against the goal: where listeners drop in an episode and what that suggests about structure; apps and countries and what they imply for promotion or release time; followers and their trend.
5. Say clearly what the data cannot tell you (who the listeners are, why they left, whether a specific promotion caused a rise) and the cheapest way to find out (a listener survey, a tagged link, asking in the episode).
6. Turn it into three decisions tied to the goal, each with the evidence, the confidence (high, medium, low) and how to measure whether it worked.
</task>

<constraints>
- Use only the numbers given; show the arithmetic for any figure you compute. If the date range, provider or episode ages are missing, say how that limits the reading.
- Do not quote industry averages or "good" download numbers as facts; if the goal is sponsors, say what sponsors usually ask for (downloads per episode at 30 days, audience profile) rather than a benchmark.
- Do not over-claim causation from a single change.
- Plain words; explain any metric name the first time.
{{> output/uncertainty}}
</constraints>

<output_format>
## What the numbers say
Five to eight bullets with the key figures and arithmetic.

## What they cannot say
Bullets, each with the way to find out.

## Real change versus noise
Table: Pattern | Likely explanation | How to check.

## Three decisions
Numbered: decision, evidence, confidence, how to measure.

## What to track next
A short list of metrics and the age at which to compare them.
</output_format>
