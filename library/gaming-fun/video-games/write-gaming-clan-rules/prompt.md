---
schema: 1
id: write-gaming-clan-rules
kind: prompt
title: Write gaming clan rules
description: Writes a charter for a gaming clan or guild covering purpose, joining and trial periods, ranks and officer duties, activity, shared resources and loot, disputes and leaving.
category: video-games
version: 1.0.0
status: incubating
stage: [plan]
role: [gamer]
requires: [none]
inputs: [text, preferences]
output: [docs, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [guild-charter, clan-management, guild-leadership, loot-rules, online-community]
pairs_with:
  prompts: [write-community-guidelines, plan-esports-team-practice]
args:
  - name: group
    description: The game or games, size, age range (adults only, mixed, includes minors), and what the group does together.
    type: text
    required: true
  - name: problems
    description: What has gone wrong or what you want to prevent, for example "officers playing favourites", "people taking guild bank items and leaving", "inactive members filling slots".
    type: text
  - name: tone
    description: How it should read, for example "relaxed and friendly" or "competitive and clear".
    type: string
    default: relaxed and friendly
output_contract:
  format: markdown
  sections: [Charter, Officer handbook, Pinned summary, Open decisions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help clan and guild leaders write a charter people will actually follow. Gaming groups break down over a few predictable things: unclear authority (who decides, how officers are chosen), shared resources (guild banks, loot, base materials) with no rules, inactive members holding limited slots, drama handled in public channels, and leaders burning out with no succession. A good charter is short, gives examples, and says what happens when a rule is broken. Groups that include minors need extra care with voice chat, private messages and age-appropriate content.

Group: {{group}}
{{#problems}}Problems to address: {{problems}}{{/problems}}
Tone: {{tone}}
</context>

<task>
1. Write the charter with these parts, each short with an example where helpful: purpose and the kind of player who fits; joining, trial period and how a trial ends; ranks and what each can do; officer selection, duties and how officers are replaced; activity expectations and what happens to inactive members (with a return path); shared resources and loot; conduct in voice and text including cheating, harassment and real-money trading; how disputes and reports are handled privately with a right to explain; leaving or being removed and what happens to shared items; leadership succession.
2. Write a one-page officer handbook: handling a report, warning steps, logging decisions, avoiding favouritism, and escalating to the platform's reporting tools.
3. Write a pinned summary of the top rules in under 120 words.
4. List open decisions the leader must make (numbers, thresholds), marked [DECIDE].
5. If minors are in the group, add rules on adult-minor private contact, voice chat and content, and reporting serious concerns.
</task>

<constraints>
- Do not set thresholds the leader has not chosen; mark them [DECIDE] with a suggested range.
- Keep it consistent with the game's and platform's terms; never allow cheating, account sharing or real-money trading the game forbids.
- Rules for behaviour must apply to officers too.
</constraints>

<output_format>
## Charter
Numbered sections.
## Officer handbook
Bullets.
## Pinned summary
Under 120 words.
## Open decisions
Checklist with [DECIDE] items.
</output_format>
