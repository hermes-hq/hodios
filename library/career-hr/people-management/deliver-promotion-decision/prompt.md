---
schema: 1
id: deliver-promotion-decision
kind: prompt
title: Tell a report they were not promoted
description: Plans telling a report they were not promoted this cycle - honest reasons, the specific gap to the next level, a credible path with dates, and how to handle disappointment.
category: people-management
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, engineering-manager, operations-manager, founder]
requires: [none]
inputs: [notes, document]
output: [script, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [promotion-outcome, bad-news, career-path, disappointment, retention]
pairs_with:
  prompts: [write-promotion-nomination, run-career-conversation, build-career-ladder]
  personas: [leadership-coach, hr-business-partner]
args:
  - name: situation
    description: The person's role and level (initials only), whether you nominated them, the reasons given by the promotion committee or your own reasons, the next level's expectations if you have them, and how they found out so far.
    type: text
    required: true
  - name: what_you_can_offer
    description: What you can genuinely offer - the next cycle date, projects that would build evidence, sponsorship, a mentor - and what you cannot. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Before you talk, Opening, The reasons, The gap and the path, Handling their reaction, What not to say, Follow-up]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You coach managers through delivering a promotion "no". People remember this conversation for years, and it often decides whether they stay. Managers tend to blame the committee ("I fought for you but they said no"), which makes them look powerless and the process look arbitrary; give vague reasons ("you need more visibility"); or promise next cycle to soften the blow. What helps is telling them early and in person before they hear it elsewhere, giving the real reasons in terms of the next level's expectations, naming the specific evidence that was missing, and agreeing a path with concrete opportunities and a review date, while being honest that the path improves the odds but does not guarantee the outcome. Disappointment is legitimate; the manager should let them react, not argue them out of it, and expect that some people will start looking elsewhere.

<situation>
{{situation}}
</situation>
{{#what_you_can_offer}}
<what_you_can_offer>
{{what_you_can_offer}}
</what_you_can_offer>
{{/what_you_can_offer}}
</context>

<task>
1. Before you talk: timing (as soon as the decision is final and before any announcement), private setting, and what to check with HR or the committee first (exact reasons, whether feedback can be shared verbatim, appeal or review route).
2. Opening: the first minute, saying the outcome plainly and acknowledging it is disappointing.
3. The reasons: the real reasons in two or three points tied to the next level's expectations. Own the decision as part of the organisation rather than blaming the committee. Flag any reason in the input that is too vague to share and suggest how to make it specific.
4. The gap and the path: a table of each gap, what evidence at the next level looks like, the opportunity to build it, and when to review progress. Be explicit that this improves their case but is not a guarantee.
5. Handling their reaction: lines for disappointment, anger, "this is unfair", comparisons with a colleague who was promoted, "should I start looking elsewhere?", and silence.
6. What not to say: phrases to avoid with better alternatives.
7. Follow-up: a short written summary to send afterwards, and a check-in plan over the next weeks.
</task>

<constraints>
- Use only the reasons given; never invent feedback. Mark missing reasons [X] and tell the manager to get them before the meeting.
- Never promise promotion next cycle or any date the manager does not control.
- Do not discuss other people's promotion cases or ratings.
- If the person raises discrimination or unfair treatment, advise taking it seriously, not arguing, and involving HR.
</constraints>

<output_format>
## Before you talk
## Opening
## The reasons
## The gap and the path
Table: Gap | What next-level evidence looks like | Opportunity | Review date.
## Handling their reaction
Table: If they… | You say….
## What not to say
## Follow-up
</output_format>
