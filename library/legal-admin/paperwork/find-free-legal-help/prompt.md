---
schema: 1
id: find-free-legal-help
kind: prompt
title: Find free legal help
description: Finds the kinds of free or low-cost legal help that fit a problem and country, such as legal aid, law clinics, unions, tenant groups or migrant NGOs, and prepares the first meeting.
category: paperwork
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [individual]
subject: [law]
requires: [none]
inputs: [text]
output: [plan, table, checklist, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [legal-aid, law-clinic, pro-bono, access-to-justice, legal-expenses-insurance]
pairs_with:
  prompts: [explain-legal-letter, prepare-small-claims-case, prepare-to-self-represent]
  personas: [legal-information-guide, tenant-rights-advisor]
args:
  - name: problem
    description: What happened, in your own words, with dates, any letters or deadlines you have received, and what outcome you want.
    type: text
    required: true
  - name: country
    description: Country and region or city; legal aid and clinics are often organised regionally.
    type: string
    required: true
  - name: income_level
    description: Rough household income compared with your area. It decides whether means-tested legal aid is worth checking first.
    type: enum
    enum: [low, middle, unsure]
    default: unsure
output_contract:
  format: markdown
  sections: [Urgency check, What kind of problem this is, Where to look, Search terms, Cover you may already have, What to bring, Questions for the first meeting, Warning signs]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most people with a legal problem never get advice because they assume a lawyer is unaffordable, or they find help after a deadline has passed. Free and low-cost help exists in most countries but is fragmented: state legal aid with means and merits tests, law school clinics, bar association referral schemes with cheap first consultations, unions for members, tenant and consumer organisations, ombudsman and complaint schemes that cost nothing, specialist charities (migrants, disability, domestic abuse, debt), court self-help desks, pro bono programmes, and legal expenses cover hidden in home, car, card or union memberships. Your job is to sort the problem, spot urgent deadlines, map the kinds of help to look for, and get the person ready for a productive first meeting.

Country: {{country}}
Income level: {{income_level}}
</context>

<task>
The problem:

<problem>
{{problem}}
</problem>

1. Urgency check first. Look for deadlines that commonly run short: court dates, eviction notices, dismissal claims, immigration decisions and appeals, debt enforcement, benefit decisions. If one is present or likely, say so at the top, tell them to contact help today and to note the date on the letter. If anything suggests danger (violence, threats, a child at risk), point to emergency services first.
2. Name the area of law in plain words (housing, employment, family, immigration, consumer, debt, benefits, criminal, discrimination) and what kind of adviser typically handles it. If it spans areas, say which is most time-sensitive.
3. Map where to look, in order of fit for this problem and {{income_level}} income: for each kind of help, who it fits, how to find it in {{country}}, typical cost, and typical eligibility, all marked verify. Name a specific organisation only if you are confident it exists and serves this problem, and mark it verify.
4. Give search terms in the local language and English (for example the local words for legal aid, law clinic, tenants' association, free legal advice) so they can find services themselves.
5. Cover they may already have: legal expenses insurance in home, car or card policies, union or professional association membership, employer assistance programmes.
6. What to bring: a one-page timeline, the key documents, letters with deadlines, and the outcome wanted. Draft the timeline skeleton from what they wrote, with gaps in [BRACKETS].
7. Questions for the first meeting, and warning signs of fake or exploitative helpers (unregistered "consultants", upfront fees for free services, promises of guaranteed results, notario-style fraud aimed at migrants).
8. Before writing, check that the urgency verdict matches any dates in the problem.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not tell them whether they will win or what legal action to take; frame the merits as questions for the adviser.
- Never state eligibility thresholds, fees or limitation periods as current fact; mark them verify.
- Prefer services that are free at the point of use; flag where a cheap first consultation can lead to paid work and how to ask about costs up front.
- Keep personal identifiers out of the output.
{{> output/uncertainty}}
</constraints>

<output_format>
## Urgency check
One bold line (urgent today, soon, or no deadline found), then why.

## What kind of problem this is
Two or three lines.

## Where to look
Table: Kind of help | Fits if | How to find it | Typical cost | Eligibility to verify.

## Search terms
Bullets in the local language with English.

## Cover you may already have
Bullets.

## What to bring
Checklist, then the timeline skeleton.

## Questions for the first meeting
Numbered, including questions about cost.

## Warning signs
Bullets.
</output_format>
