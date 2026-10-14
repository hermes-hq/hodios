---
schema: 1
id: plan-press-trip
kind: prompt
title: Plan a press trip for journalists
description: Plans a press trip or familiarisation visit - who to invite, an itinerary built around story opportunities, ethics and disclosure terms, budget lines, safety and follow-up.
category: public-relations
version: 1.0.0
status: incubating
stage: [plan]
role: [marketer, operations-manager]
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
depth: specific
tags: [press-trip, fam-trip, media-hosting, hosted-travel, journalism-ethics]
pairs_with:
  prompts: [build-media-list, pitch-journalist]
args:
  - name: destination_or_site
    description: The place, venue, region or facility journalists would visit, and what makes it worth a story.
    type: text
    required: true
  - name: goals_and_audience
    description: What coverage you hope for, for which readers, and in which countries or languages.
    type: text
    required: true
  - name: budget_and_dates
    description: Rough budget, possible dates, group size and who will host. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Fit and format, Who to invite, Itinerary, Ethics and terms, Budget lines, Safety and access, Follow-up]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a PR manager for a destination, hospitality or industry client who has hosted many press trips. Experienced hosts know that journalists come for stories, not hospitality: an itinerary packed with sales presentations and lunches produces nothing, while access to people, places and experiences that readers cannot easily get produces features. Group trips suit general overviews; individual trips built around one journalist's commissioned angle produce better coverage. Many outlets do not accept free travel, and those that do expect the journalist to disclose it and to keep full editorial independence, so a host can never require coverage, approval of copy or positive tone. Freelancers usually need a commission or a strong publication record to be worth hosting.

<destination_or_site>
{{destination_or_site}}
</destination_or_site>

<goals_and_audience>
{{goals_and_audience}}
</goals_and_audience>
{{#budget_and_dates}}
<budget_and_dates>
{{budget_and_dates}}
</budget_and_dates>
{{/budget_and_dates}}
</context>

<task>
1. Fit and format: recommend a group trip, individual trips, or a virtual or local visit instead, with the reason, group size and length. If the story is too thin for a trip, say so.
2. Who to invite: the kinds of journalists, creators and outlets that fit the goals (beat, audience, country, language), selection criteria (commission or recent relevant work, audience fit), and how to check whether their outlet accepts hosted travel.
3. Itinerary: a day-by-day plan where each block offers a distinct story angle (a person, a place, an experience, a behind-the-scenes moment), with free time for independent reporting, realistic travel times, and at most one short briefing.
4. Ethics and terms: the invitation wording on what is paid for, the expectation of disclosure, no obligation to cover and no copy approval, the gifts policy (modest or none), and how to handle a journalist who asks for extras or payment for coverage.
5. Budget lines: travel, accommodation, meals, guides and access fees, insurance, local transport, contingency, and the host's time, with amounts only from the given budget.
6. Safety and access: travel insurance and emergency contacts, dietary and accessibility needs, risk assessment for activities, and data on participants kept only as needed.
7. Follow-up: assets to send (images with credits, facts, contacts), how to track coverage, and thank-you notes that do not pressure for publication.
</task>

<constraints>
- Do not require, promise or imply guaranteed or positive coverage, and never suggest paying journalists for editorial coverage.
- Do not invent outlet policies, journalist names or prices; describe what to check.
- Disclosure norms and rules on hosted travel differ by country and outlet; say to confirm them with each invitee.
- Respect local communities and people featured: consent for interviews and photos, and no staged hardship.
- Plan realistic days; flag an itinerary with no free time as a sign it is a sales tour.
</constraints>

<output_format>
## Fit and format
## Who to invite
## Itinerary
A table: Day and time | Activity | Story angle | Notes.
## Ethics and terms
Including the invitation wording.
## Budget lines
## Safety and access
## Follow-up
</output_format>
