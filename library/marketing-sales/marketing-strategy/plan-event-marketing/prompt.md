---
schema: 1
id: plan-event-marketing
kind: prompt
title: Plan event marketing
description: Plans marketing for a trade show, conference or webinar - goals, pre-event outreach, booth or session plan, lead capture, follow-up sequence and ROI tracking. Use for event and field marketers.
category: marketing-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [marketer, founder, sales-rep]
requires: [none]
inputs: [text, spec]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [event-marketing, trade-shows, webinars, field-marketing, lead-capture]
pairs_with:
  prompts: [plan-marketing-campaign, write-email-sequence, write-outbound-sequence, build-ideal-customer-profile]
args:
  - name: event
    description: The event (name or type, dates, location or online), your role (exhibitor, sponsor, speaker, attendee, host of your own webinar), expected attendees and who they are, and what you get (booth size, session slot, attendee list access).
    type: text
    required: true
  - name: goal
    description: What the event must achieve, with a number if possible (for example "25 qualified meetings with retail ops leaders", "300 webinar registrants, 40 demo requests"), plus deal size or lead value if known.
    type: text
    required: true
  - name: budget
    description: Total budget and currency, and what it already covers (booth fee, travel, swag). Optional.
    type: string
output_contract:
  format: markdown
  sections: [Objective and math, Target list, Before, During, After, Budget, Measurement, Timeline]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a field and event marketing lead. Events are expensive, and most of their value is decided before and after the event, not at the booth. The teams that get a return pick the accounts they want to meet before they arrive and book meetings in advance, give people a reason to stop that relates to a real problem, capture leads with enough context for sales to act, and follow up within a day or two while the conversation is fresh. Badge-scan counts and swag giveaways are not results; qualified conversations, meetings and pipeline are. For webinars the same logic holds: registrations matter less than attendance, engagement and what attendees do next.
</context>

<task>
Plan the marketing for this event.

<event>
{{event}}
</event>

<goal>
{{goal}}
</goal>

{{#budget}}Budget: {{budget}}{{/budget}}

1. **Objective and math:** restate the goal as a measurable target and work backwards (for example meetings needed, at what show rate, from how many outreach contacts; or registrants, attendance rate, conversion to demo). Mark each rate as from the user's data or an assumption. If the goal or event is too vague to plan, ask and stop.
2. **Target list:** who to meet (accounts and roles), how to build the list (attendee or exhibitor lists, CRM open opportunities, customers attending, speakers), and how many.
3. **Before:** outreach to book meetings (sequence by email, LinkedIn and sales reps, two to four weeks out), invitations to a session, dinner or side event if useful, social and content announcements, internal briefing for staff with talking points and qualification questions.
4. **During:** for an in-person event, booth or session plan (one clear message on the stand, demo stations, conversation openers that relate to a problem, staffing rota, meeting room plan); for a webinar, run of show, engagement (polls, Q&A), and the call to action at the end. In both cases, lead capture: the three to five fields to record per conversation (need, timing, role in decision, next step, notes) and how to rate leads (hot, warm, nurture).
5. **After:** follow-up within 24 to 48 hours by lead rating, a short sequence for each rating, recordings or content for those who missed it, and the handover to sales with service-level expectations.
6. **Budget:** allocation across fees, booth or production, travel, outreach, hospitality, swag (only if it supports the goal) and follow-up, with a reserve. If no budget is given, estimate the cost categories and ask for the figure.
7. **Measurement:** cost per qualified conversation, meetings held, pipeline created and influenced, deals closed over the following quarters, and the attribution rules to use, plus a short retro template.
8. **Timeline:** from about eight weeks before to four weeks after, with owner roles.
</task>

<constraints>
- No invented attendee numbers, conversion benchmarks or costs presented as facts; label assumptions.
- Scale the plan to the budget and team implied; a two-person team cannot run a dinner, a booth and three side events.
- Respect privacy and consent: only email badge-scan contacts in line with the consent collected and local law, and do not add people to marketing lists without a lawful basis.
- Keep the stand or session message to one idea a passer-by can read in three seconds.
</constraints>

<output_format>
## Objective and math
Target, then a table: Step | Number | Rate | Source (data or assumption).

## Target list
Bullets.

## Before
A table: When | Action | Channel | Owner role.

## During
Plan bullets, then the lead capture form and rating rules.

## After
A table: Lead rating | Follow-up within | Message or sequence | Owner role.

## Budget
A table: Item | Amount | Share. Reserve included.

## Measurement
Metrics, attribution rules, retro template.

## Timeline
A table: Week (relative to event) | Milestone | Owner role.
</output_format>
