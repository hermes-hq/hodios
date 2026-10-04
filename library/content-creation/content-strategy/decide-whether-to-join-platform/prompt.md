---
schema: 1
id: decide-whether-to-join-platform
kind: prompt
title: Decide whether to join a platform
description: Decides whether a creator or organisation should start on a new platform by weighing audience presence, format fit, effort and what it replaces, ending in join, wait or skip with a 60-day exit test.
category: content-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [content-creator, marketer, founder]
requires: [none]
inputs: [text]
output: [report, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [channel-choice, new-platform, opportunity-cost, exit-criteria, fomo]
pairs_with:
  prompts: [analyze-competitor-channels, define-content-pillars, plan-content-calendar]
  personas: [content-strategist]
args:
  - name: platform
    description: The platform you are considering, for example "Threads", "a WhatsApp channel", "Substack Notes", "a new video app my clients mention".
    type: string
    required: true
  - name: current_channels
    description: Where you post now, how often, roughly how many people you reach on each, which ones bring results, and your weekly hours for content.
    type: text
    required: true
  - name: audience_description
    description: Who you want to reach and any evidence of whether they use the new platform (they mention it, peers are there, you have seen them there).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Verdict, Scorecard, What it would replace, If you join, Evidence to gather first]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a creator, small business or nonprofit decide whether to start on a new platform. The pressure usually comes from fear of missing out ("everyone is on it", "early accounts grow fast"), and the cost is hidden: a new channel takes hours from channels that already work, and abandoned accounts look worse than none. The real questions are whether this audience is there and paying attention, whether the platform's native format suits what the person can make, how much effort each post costs, what will be dropped to make time, and how the person will know after a fixed trial whether to continue. Early-adopter upside is real but uneven: it pays most when the platform rewards new accounts and the person can post often in its native format.
</context>

<task>
Platform under consideration: {{platform}}

<current_channels>
{{current_channels}}
</current_channels>

<audience>
{{audience_description}}
</audience>

1. Score the platform 1 to 5 on: audience presence (evidence, not assumption), format fit (can they make the native format well), effort per post, repurposing potential from existing work, early-adopter upside, ownership and risk (can they reach followers off-platform, policy or account risk), and strategic fit with their goal. One-line reason per score.
2. What it would replace: hours needed per week against hours available; which current activity drops or shrinks, and the result that activity currently brings.
3. Verdict: join, wait or skip. Join only if audience presence and format fit are both 4 or more and time can be freed honestly. Wait when the audience evidence is weak but rising, with the trigger that would change it. Skip otherwise.
4. If join: a 60-day trial with a minimum of posts per week, the one native format to use, how to repurpose from existing work, a fixed exit test (for example "if after 60 days fewer than X profile visits to website or Y replies, stop"), and how to park the account cleanly if it fails (bio pointing to the main channel).
5. Evidence to gather first: cheap checks that would change the verdict (ask ten audience members, look at three peers' accounts, test one repurposed post).
</task>

<constraints>
- Do not state user numbers, demographics or algorithm behaviour of the platform as fact; you may describe what is commonly reported, labelled as such, and tell them to check current information.
- Never recommend adding a channel without naming what gets less time.
- If current channels or audience are too vague to score, ask for them and stop.
- Keep the whole answer under about 500 words.
</constraints>

<output_format>
## Verdict
Join, wait or skip, in bold, then two or three sentences on why.

## Scorecard
Table: criterion | score 1-5 | reason.

## What it would replace
Two or three bullets with hours.

## If you join
The 60-day trial and exit test (or "Not applicable" with the trigger to revisit, for wait).

## Evidence to gather first
Up to three bullets.
</output_format>
