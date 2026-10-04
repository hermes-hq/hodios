---
schema: 1
id: find-gaps-in-research-sample
kind: prompt
title: Find who your research sample is missing
description: Compares the people a team has researched with the people its product or service serves, shows who is missing or over-represented and sets quotas and routes for the next round.
category: product-discovery
version: 1.0.0
status: incubating
stage: [review, plan]
role: [product-manager, ux-researcher, researcher, designer]
requires: [none]
inputs: [notes, text]
output: [table, plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [research-sample, sampling-bias, participant-quotas, inclusive-research, recruitment-bias]
pairs_with:
  prompts: [write-research-screener, set-up-research-panel, synthesize-customer-interviews, interview-non-customers, plan-continuous-interview-cadence]
  workflows: [public-service-discovery-track]
args:
  - name: participants_so_far
    description: Who you have interviewed or tested with so far - how many, how each was recruited (panel, email list, in-app invite, social post, a community meeting) and what you know about them (usage, device, plan, language, location, age band, access needs). Participant codes only, no names.
    type: text
    required: true
  - name: user_population
    description: Who uses or should use the product or service, with any figures you have (analytics segments, customer base, eligibility population, channel mix) and the country or region. Rough or partial is fine.
    type: text
    required: true
  - name: decision
    description: The decision or question the research feeds, so the gaps that matter most can be prioritised. Optional.
    type: text
  - name: next_round_size
    description: How many participants you can add in the next round.
    type: number
    default: 8
output_contract:
  format: markdown
  sections: [Dimensions that matter, Coverage matrix, Where the skew comes from, What the findings so far can claim, Next round quotas, How to reach the gaps]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a research lead auditing a team's sample before they trust their findings. Product research quietly drifts towards the easiest people to reach: active users who see the in-app invite, confident people who answer online panels, the team's own network, English speakers, people free at office hours. The findings then describe those people and get applied to everyone. Teams rarely check, because nobody lays the sample next to the population. The fixes are cheap once the gap is visible: name the dimensions that change the experience, compare sample with population, trace each skew to the recruitment route that caused it, limit what current findings can claim, and set quotas for the next round.

Next round: {{next_round_size}} participants
</context>

<task>
Participants so far:

<participants_so_far>
{{participants_so_far}}
</participants_so_far>

User population:

<user_population>
{{user_population}}
</user_population>
{{#decision}}

Decision the research feeds:

<decision>
{{decision}}
</decision>
{{/decision}}

1. Choose four to six dimensions that plausibly change how people experience this product for this decision. Start with behaviour (frequency and tenure of use, plan or tier, new vs established, lapsed or never-converted, buyer vs user), then access (device and channel, digital confidence, language, disability and assistive technology, connectivity, rural vs urban), then demographics only where they change the experience (for example age for a pensions service). Say in one line why each matters and drop the rest.
2. Coverage matrix: for each segment, its share of the population (given, or "unknown" with where to get it: analytics, CRM, eligibility or case data, public statistics) next to the count and share in the sample. Flag each segment as missing (none), thin (fewer than about five, too few to see a pattern), over-represented (sample share roughly double the population share or more) or covered.
3. Where the skew comes from: link each skew to the recruitment route that produced it (in-app invites reach active users; email lists reach engaged customers; online panels reach confident, frequent survey-takers; social posts reach the team's network; daytime sessions miss shift workers and parents; voucher incentives tied to one store skew to its shoppers).
4. What the findings so far can claim: which conclusions rest only on covered segments and are safe to state for them, and which are at risk because the people most likely to disagree were never asked (for example "setup is easy" heard only from power users). Phrase at-risk claims as "true for [segment]; untested for [segment]".
5. Next round quotas: allocate the {{next_round_size}} places to the gaps that matter most for the decision, ranked by how much the missing segment could change the conclusion. Aim for about five per segment you need a pattern from; if there are not enough places, cover fewer segments well, say which ones wait for a later round, and say so plainly rather than spreading one person per segment.
6. How to reach the gaps: for each quota, the route that reaches those people (a rotating in-product sample of light users, recent support contacts, lapsed or unconverted lists, intermediaries and offline places for people who are offline, interpreters for other languages, evening or weekend slots), two or three behaviour-based screener questions, and the quota tracker columns. Where a group needs real outreach work (trusted intermediaries, interpreters, adjusted sessions), flag that a dedicated outreach plan is needed and roughly how much lead time to allow.
</task>

<constraints>
- Never invent population shares, sample traits or counts. Use "unknown" and say how to find out. Count only what the participant notes state.
- Never infer anyone's ethnicity, age, disability, religion, immigration status or other personal traits from names, photos, voices or accents. Sensitive traits are collected only when relevant to the decision, self-reported, voluntary and with consent; keep the data minimal and separate from notes.
- Use participant codes; if the notes contain names, do not repeat them and suggest removing them.
- A sample is never "representative" from qualitative research; the aim is coverage of the experiences that matter, not statistical proportion. Do not suggest weighting interview findings.
- If the participant notes give no information about who was recruited or how, ask for the recruitment routes and what is known about each participant, and stop.
{{> output/uncertainty}}
</constraints>

<output_format>
## Dimensions that matter
Table: dimension | segments | why it matters for this decision.

## Coverage matrix
Table: dimension | segment | population share (or unknown + source) | sample count | sample share | status (missing, thin, over-represented, covered).

## Where the skew comes from
Bullets: skew | recruitment route that caused it.

## What the findings so far can claim
Two lists: safe for the segments covered; at risk, with the untested segment named.

## Next round quotas
Table: segment | places | why it ranks here. Then the segments deferred to a later round.

## How to reach the gaps
Per quota: route, screener questions, outreach lead time if needed. Then the tracker columns: code | segment | route | invited | booked | done | notes.
</output_format>
