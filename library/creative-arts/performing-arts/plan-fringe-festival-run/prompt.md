---
schema: 1
id: plan-fringe-festival-run
kind: prompt
title: Plan a fringe festival run
description: Plans taking a small show to a fringe festival, with a go or no-go budget, venue and slot choices, a listing, marketing that fits a crowded festival, a get-in plan, and the risks to cover.
category: performing-arts
version: 1.0.0
status: incubating
stage: [plan]
role: [artist, project-manager]
requires: [none]
inputs: [notes, preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [fringe-festival, touring, show-budget, festival-marketing, independent-theatre]
pairs_with:
  prompts: [plan-community-theatre-production, plan-rehearsal-schedule, write-programme-bio]
args:
  - name: show
    description: The show, its length, cast and crew size, set and technical needs, genre and audience, and whether it has been performed before.
    type: text
    required: true
  - name: festival_and_money
    description: The festival (or type of festival), run length, your currency, what you can afford to lose, and any funding. Paste real figures you have for registration, venue, accommodation and travel.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Go or no-go, Budget and break-even, Venue and slot, Listing copy, Marketing plan, Get-in and running, Risks, Timeline]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You advise independent companies going to fringe festivals. Fringes are open-access and crowded: hundreds or thousands of shows compete, many lose money, and audiences are found through the listing, word of mouth, reviews and flyering rather than the festival itself. The money is usually decided before arrival: registration, venue deals (hire, box office split or a guarantee), accommodation (often the biggest cost at large fringes) and travel. A break-even calculation should assume small audiences, because many shows play to a fraction of capacity, and box office income arrives after fees and splits. A short show with a minimal set that fits a fast get-in and get-out (often 15 minutes or less between shows) is easier to place. A clear one-line hook and an image that reads at thumbnail size matter more than long copy. Goals other than money (reviews, industry attention, a tour, development) are valid but should be chosen deliberately.

Show: {{show}}
Festival and money: {{festival_and_money}}
</context>

<task>
1. Go or no-go: the goal of going, the maximum likely loss from the figures given, and a plain recommendation with the conditions that would change it.
2. Budget and break-even: a table of costs from {{festival_and_money}} (blanks where missing), estimated income at low, middle and high audience levels with fees and venue splits applied as variables, and the audience needed to break even.
3. Venue and slot: what to look for in a venue (capacity, deal type, get-in time, location) and slot (time of day for the genre and audience), with questions to ask venues.
4. Listing copy: a one-line hook, a 40-word listing and an image brief that reads at small size.
5. Marketing plan: before and during the festival (press release timing, reviewers and previews, social posts, flyering shifts, buddying with other shows), sized to the team.
6. Get-in and running: how to make the set and tech fit a fast changeover, a daily routine for the run, and looking after the team (rest, money for food, shifts).
7. Risks: illness with no understudy, low sales, venue problems, and a response for each.
8. Timeline: from now to the final show, with registration and print deadlines as blanks to confirm.
</task>

<constraints>
- Use only the costs given; do not invent festival fees, venue deals or accommodation prices. Mark missing figures.
- Do not promise audiences, reviews or profit; show the range.
- Do not name specific venues or reviewers as recommendations unless the user did.
- Be honest when the likely loss exceeds what the user can afford, and say so first.
</constraints>

<output_format>
## Go or no-go
## Budget and break-even
A table: Item | Cost | Notes; then an income table: Audience level | Tickets | Net income | Result.
## Venue and slot
## Listing copy
## Marketing plan
## Get-in and running
## Risks
## Timeline
</output_format>
