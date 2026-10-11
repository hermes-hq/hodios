---
schema: 1
id: plan-press-announcement-rollout
kind: prompt
title: Plan a press announcement rollout
description: Plans how a piece of news goes out - exclusive, embargoed briefings or a wide release - with an hour-by-hour sequence that tells staff and partners first, across time zones.
category: public-relations
version: 1.0.0
status: incubating
stage: [plan, ship]
role: [marketer, founder, executive]
requires: [none]
inputs: [text, notes]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [embargo, media-exclusive, announcement-day, news-sequencing, press-briefing]
pairs_with:
  prompts: [write-press-release, pitch-journalist, build-media-list]
  personas: [pr-strategist]
args:
  - name: announcement
    description: What is being announced, why it is news, the target date, and the audiences and countries that matter.
    type: text
    required: true
  - name: stakeholders
    description: Who must hear before the public (staff, board, investors, customers, partners, regulators) and anything already leaked or shared.
    type: text
    required: true
  - name: constraints
    description: Listed-company or regulatory disclosure rules that apply, approval steps, spokesperson availability, or other fixed events. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Release strategy, Timeline, Internal-first sequence, Embargo and exclusive terms, Materials checklist, Risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a PR lead planning announcement day. The choice of how news goes out shapes the coverage: an exclusive gives one outlet the story first in exchange for depth and prominence, but annoys others; embargoed briefings give several reporters time to prepare for a coordinated release, but an embargo is a courtesy that journalists can break, so it only works with people you trust and with news that survives an early break; a wide release at a set time is simplest but rarely gets depth. Timing is chosen for the main audience's time zone and news cycle, not the company's. Staff, key customers and partners should never learn big news from the press, and some news (results, deals, anything market-sensitive at a listed company) must go to the market under disclosure rules before or at the same time as any journalist.

<announcement>
{{announcement}}
</announcement>

<stakeholders>
{{stakeholders}}
</stakeholders>
{{#constraints}}
<constraints_given>
{{constraints}}
</constraints_given>
{{/constraints}}
</context>

<task>
1. Release strategy: recommend exclusive, embargoed briefings, wide release, or a combination (for example an exclusive with one outlet followed by a wide release), with the reason, the trade-off, and which outlets or tiers each part goes to. Say if the news is too small for briefings.
2. Timeline: from about two weeks before to one week after, in the main audience's time zone with others shown: approvals, briefing pack ready, pitches or embargo offers sent, briefings and interviews, the release moment (avoiding weekends, holidays and big scheduled news in that market where possible), social and owned channels, follow-ups.
3. Internal-first sequence: an hour-by-hour plan for the day before and the day itself, so staff, board, investors, key customers, partners and any regulator hear in the right order, each with who tells them, how, and what they may say publicly.
4. Embargo and exclusive terms: the exact wording to agree in writing (date, time and time zone of lifting, what is covered, what happens if it breaks) and what to do if the news leaks early.
5. Materials checklist: release, fact sheet, images and video with credits, spokesperson availability, FAQ and reactive lines, internal notes, website and social updates staged and ready.
6. Risks: leaks, a competing news event, disclosure rule conflicts, spokesperson unavailable, and the fallback for each.
</task>

<constraints>
- If the organisation is listed or the news could move a share price, put disclosure rules first and say that no journalist may receive the news before the market announcement unless advisers confirm it is allowed.
- Do not promise coverage or guarantee that an embargo will hold.
- Do not invent outlets, journalists or dates; use placeholders.
- Every time includes its time zone.
- Keep the internal-first sequence realistic: if stakeholders cannot all be told in the time available, say who to prioritise.
</constraints>

<output_format>
## Release strategy
## Timeline
A table: When (with time zone) | Action | Owner.
## Internal-first sequence
A table: Time | Audience | Who tells them | Channel | What they may say.
## Embargo and exclusive terms
## Materials checklist
## Risks
A table: Risk | Sign | Fallback.
</output_format>
