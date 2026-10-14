---
schema: 1
id: plan-an-event
kind: prompt
title: Plan an event or party
description: Plans a birthday, party or small gathering from the occasion, guests, date and budget, with a budget split, food amounts, a to-do list and a plan for the day. Use when you are hosting.
category: event-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [preferences, topic]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
depth: basic
tags: [party, birthday, celebration, gathering, hosting, guest-list, invitations]
pairs_with:
  prompts: [build-event-planning-timeline, plan-event-budget, plan-surprise-party, organise-potluck]
  personas: [event-planner]
args:
  - name: occasion
    description: What you are celebrating or organising, and for whom, for example "my dad's 70th", "a housewarming", "end-of-season party for the kids' football team".
    type: text
  - name: details
    description: Date or rough time, number of guests, budget, and where (home, garden, park, a hired room, a restaurant) if you know.
    type: text
  - name: wishes
    description: The feel you want and anything to plan around, for example "relaxed, lots of kids", "surprise", "dietary needs", "a guest uses a wheelchair", "no alcohol".
    type: text
output_contract:
  format: markdown
  sections: [The idea, Budget, Place, Guests and invitations, Food and drink, On the day, To-do list, If things go wrong, Next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-14
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help everyday people host birthdays, parties and small gatherings. Plain advice gives a generic checklist and an idea list; hosts still forget the things that go wrong: booking too late, running out of food or ice, no plan for rain, too much to do on the day, and not enjoying their own party. A good plan starts from who it is for and how it should feel, fits the budget and guest count, works back from the date, and leaves the host with little to do on the day.

{{#occasion}}Occasion: {{occasion}}
{{/occasion}}{{#details}}Details: {{details}}
{{/details}}{{#wishes}}Wishes and needs: {{wishes}}
{{/wishes}}
</context>

<task>
1. Missing essentials. If you do not yet know the occasion, roughly how many guests, and the date or budget (here or in their message), ask these and stop:
   1. What is the occasion and who is it for? (for example "my partner's 40th, she loves live music")
   2. Roughly how many people, and are children coming?
   3. When is it, and what budget do you have in mind? (for example "a Saturday in March, about 400")
   Say that if they answer "just do it", you will plan a relaxed evening party at home for about 20 adults on a modest budget, six weeks away. If they gave enough, skip this step.
2. The idea: one or two sentences on the feel of the event, the format (drop-in, sit-down meal, party with an activity), and its length.
3. Budget: split it into place, food and drink, decorations, activities or entertainment, and a 10% buffer. Show the amounts and two ways to spend less.
4. Place: at home or two or three kinds of venue that fit the guests and budget, with what to check before booking (capacity, accessibility, noise and finish time, deposit and cancellation, what is included).
5. Guests and invitations: when to invite (earlier for weddings, holidays and travel), how (message, group chat, card), what to include (date, time, address, what to bring, dietary question, RSVP date), and how many will likely come.
6. Food and drink: the format (cooked, buffet, potluck, caterer), amounts for their guest count with simple rules of thumb (stated as estimates), dietary and allergy labels, soft drinks and water, and ice.
7. On the day: a short timeline from set-up to clear-up, with a job list to hand to helpers so the host is free.
8. To-do list working back from the date: what to do now, a month before, two weeks, one week, the day before and the day.
9. If things go wrong: weather backup for outdoor plans, late cancellations, a guest who needs care (allergies, too much alcohol), and noise or neighbours.
</task>

<constraints>
- Fit everything to their guest count and budget; show the arithmetic. If the budget does not fit the plan, say so and offer the trade-off.
- No country assumptions: costs, permits and customs vary; use their currency and say what to check locally (for example permits for public parks or large outdoor events).
- Food safety in one line: keep cold food cold, hot food hot, and do not leave perishables out for more than about two hours.
- If children are coming, include supervision, quiet space and safe drinks. If alcohol is served, include non-alcoholic options and a way home for guests.
- Weddings, conferences and large public events need more than this; say so and point to the specialists.
</constraints>

<output_format>
## The idea
## Budget
Table: Item | Amount | Ways to save. Total and buffer.
## Place
## Guests and invitations
Include a ready-to-send invitation message.
## Food and drink
Table: Item | Amount for N guests | Notes.
## On the day
Table: Time | What happens | Who.
## To-do list
Checklist grouped by when.
## If things go wrong
## Next steps
One line: to go deeper, try "Build an event planning timeline", "Plan an event budget", "Plan a surprise party" or "Organise a potluck".
</output_format>
