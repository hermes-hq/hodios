---
schema: 1
id: recruit-consumer-research-participants
kind: prompt
title: Recruit consumer research participants
description: Plans recruiting consumers for a UX study through your own users, panels, social channels and intercepts, with quotas, screener checks against fraud and professional testers, and a timeline.
category: ux-research
version: 1.0.0
status: incubating
stage: [plan]
role: [ux-researcher, designer, product-manager]
requires: [none]
inputs: [text]
output: [plan, table, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [participant-recruitment, recruitment-quotas, screener-fraud, consumer-panels, intercepts]
pairs_with:
  prompts: [write-research-screener, set-participant-incentives, recruit-b2b-research-participants]
  personas: [ux-researcher]
args:
  - name: study
    description: The study, how many participants, the people you need described by behaviour (for example "bought groceries online at least twice in the last month"), any segments, and the deadline.
    type: text
    required: true
  - name: resources
    description: What you have - customer email list, in-app messaging, social accounts, budget for a panel or agency, locations for intercepts. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Who and how many, Quotas, Channels, Screener essentials, Quality and fraud checks, Invitation copy, Timeline and tracking]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Consumer recruiting looks easy because there are so many people, but the sample is easily skewed. Your own users who reply fastest are fans and heavy users; social posts reach your followers; open panels are full of experienced testers who know what researchers want to hear, and online screeners attract people who lie to qualify for the incentive, increasingly with bots or AI-written answers. Defining participants by recent behaviour rather than demographics, setting quotas for the segments that matter (new versus experienced, device, age bands only where they change behaviour, accessibility needs), hiding which answer qualifies, and checking open-ended answers and a short call or camera-on start for remote sessions protect the data. Over-recruiting by around 10 to 20 percent and keeping a short standby list covers no-shows. Recruiting usually takes one to two weeks, longer for narrow groups.
</context>

<task>
<study>
{{study}}
</study>
{{#resources}}

<resources>
{{resources}}
</resources>
{{/resources}}

1. Who and how many: behavioural criteria, people to exclude (employees, people in research or marketing jobs, recent participants, competitors), target number plus over-recruit and standby.
2. Quotas: the segments that matter for this study with targets per segment, and which quotas are hard versus soft.
3. Channels ranked for this study (own users via email or in-app, social and communities, a recruitment panel or agency, intercepts in a relevant place, referrals), with expected effort, bias each brings, and cost type.
4. Screener essentials: 6 to 10 questions that verify behaviour without revealing the qualifying answer, including at least one open-ended question and an attention or consistency check.
5. Quality and fraud checks: duplicate detection, open-answer review, a brief pre-session check, and how to handle someone who clearly does not match on the day (pay them, end politely).
6. Invitation copy: a short invitation for the main channel, honest about purpose, time and incentive, and not revealing the qualifying criteria.
7. Timeline and tracking: day-by-day plan to the deadline and a tracking sheet layout.
</task>

<constraints>
- Do not invent panel or agency names, prices or response rates; describe types and label estimates as assumptions.
- Do not collect more personal data in the screener than the study needs, and state how it will be stored and deleted.
- Recruiting minors or vulnerable people needs extra consent and safeguarding; flag it if the study implies it.
- Invitation copy must not be a marketing message.
</constraints>

<output_format>
## Who and how many
## Quotas
| Segment | Target | Hard or soft |
## Channels
| Channel | Fit | Bias | Effort | Cost type |
## Screener essentials
## Quality and fraud checks
## Invitation copy
## Timeline and tracking
</output_format>
