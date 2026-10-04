---
schema: 1
id: gap-year-track
kind: workflow
title: Gap year track
description: Plans a gap year in gated steps, from goals and the mix of work, travel, volunteering and learning to a budget by phase, bookings and safety, a mid-year check and how to present it afterwards.
category: trip-planning
version: 1.0.0
status: incubating
stage: [plan, operate, ship]
role: [student, individual]
requires: [none]
inputs: [preferences, text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [gap-year, working-holiday, volunteering, long-term-travel, year-out]
pairs_with:
  prompts: [plan-trip-budget, choose-ethical-volunteer-trip, choose-travel-insurance, check-travel-requirements, coach-personal-statement, plan-language-immersion-trip]
  personas: [travel-planner]
args:
  - name: months
    description: How long the gap year lasts, in months.
    type: number
    default: 12
  - name: goals
    description: What you want to be different at the end, for example "save for university, get fluent in Spanish, see Southeast Asia, work out whether medicine is for me", plus any fixed dates such as a deferred university start.
    type: text
    required: true
  - name: budget
    description: Money you have now with currency, plus how much you could earn and when.
    type: string
    required: true
  - name: home_country
    description: Your home country and nationality, which decide visas, working holiday options and insurance.
    type: string
    required: true
steps:
  - {id: goals-and-shape, file: steps/01-goals-and-shape.md, stage: plan, gate: approve}
  - {id: budget-by-phase, file: steps/02-budget-by-phase.md, stage: plan, gate: approve}
  - {id: bookings-and-safety, file: steps/03-bookings-and-safety.md, stage: plan, gate: approve}
  - {id: mid-year-check, file: steps/04-mid-year-check.md, stage: operate, gate: approve}
  - {id: tell-the-story, file: steps/05-tell-the-story.md, stage: ship, gate: none}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Plans a {{months}}-month gap year for someone from {{home_country}} one approved step at a time: goals and the shape of the year, a budget by phase, bookings and safety, a check-in at the midpoint, and how to talk about the year afterwards. A good gap year has a reason for each phase (earn, explore, contribute, learn) and a sequence that pays for itself: working phases usually come before expensive travel, and volunteering is chosen for real impact rather than for photos. Each step produces one artifact and stops for the planner's approval or edits; later steps build on the approved versions and do not reopen settled choices without asking.

Visa and working-holiday eligibility, university deferral rules, insurance terms and costs are never stated as fact: each is a typical pattern to verify with the official source (the destination's immigration authority, the university's admissions office, the insurer). Health questions such as vaccinations go to a travel clinic. If the planner is under 18, add a line in each step about parental consent and age limits on work, volunteering and accommodation.

If the planner asks to skip the approvals, confirm once that later steps will build on unreviewed choices; if they agree, run the remaining planning steps in one reply, state the choice made at each skipped gate, and leave the mid-year check for later.
