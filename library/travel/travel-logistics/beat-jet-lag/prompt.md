---
schema: 1
id: beat-jet-lag
kind: prompt
title: Beat jet lag
description: Builds a jet lag plan for your route around light, sleep timing, meals, caffeine and naps, before, during and after the flight. Use a few days before a long-haul trip across time zones.
category: travel-logistics
version: 1.0.0
status: incubating
stage: [plan]
role: [traveler]
requires: [none]
inputs: [preferences]
output: [plan, table]
risk: read-only
advice_risk: [medical]
invocation: user
effort: quick
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [jet-lag, long-haul, circadian-rhythm, light-exposure, sleep-schedule]
pairs_with:
  prompts: [plan-itinerary, plan-family-trip]
  personas: [travel-planner]
args:
  - name: route
    description: From and to (cities), any stopovers, the length of the stay, and your usual sleep times at home (for example "23:00 to 07:00").
    type: text
    required: true
  - name: departure_and_arrival_times
    description: Local departure and arrival times and dates for each flight, and anything fixed after landing (for example "meeting at 09:00 the next day"). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Your shift, Before you fly, On the plane, After you land, Caffeine naps and alcohol, Coming home]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help travellers adapt to new time zones using what is known about the body clock. Light is the strongest signal that resets it, and its effect depends on timing: light in the hours after the body's temperature low point (roughly 2 to 3 hours before the usual wake time) shifts the clock earlier, which helps when flying east; light in the hours before that point shifts it later, which helps when flying west. Light at the wrong time pushes the clock the wrong way. The clock typically adjusts by only about an hour a day without help, and flying east is usually harder than flying west. Sleep timing, meals, caffeine and naps help when they support the light plan.

Route and stay: {{route}}
{{#departure_and_arrival_times}}Flights and fixed commitments: {{departure_and_arrival_times}}{{/departure_and_arrival_times}}
</context>

<task>
1. Work out the shift: direction (east or west), number of time zones, the traveller's usual sleep window in destination time, and how many days adapting would roughly take. If the usual sleep times are missing, assume 23:00 to 07:00 and say so.
2. Decide the strategy:
   - For short stays (about 2 to 3 days or less), consider staying on home time as far as possible instead of adapting, and schedule key commitments in the traveller's "home daytime".
   - For large eastward shifts (roughly 8 or more time zones), note that early-morning light at the destination may fall before the body's temperature low point and push the clock the wrong way at first; advise avoiding bright light early in the day for the first days and seeking it later in the morning and around midday, shifting earlier each day.
3. Before the flight: whether to shift sleep and wake times by about an hour a day for 2 to 3 days in the direction of travel, with the light timing to match, if the traveller's schedule allows.
4. On the plane: when to sleep and when to stay awake according to destination time, using an eye mask, earplugs and light from screens accordingly, and hydration and movement on long flights.
5. After landing: a day-by-day table for the first days with when to seek light, when to avoid it (sunglasses), meal times on local time, a short nap rule if needed, and bedtime.
6. Caffeine, naps and alcohol: caffeine early in the local day only, naps short (about 20 to 30 minutes) and not late in the afternoon, and alcohol avoided as a sleep aid.
7. Coming home: a short reverse plan.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Sleep medicines and melatonin: mention that some travellers use melatonin or sleep medication, and that whether it is suitable, legal or available, and the timing and dose, should be discussed with a doctor or pharmacist, especially with other medicines, pregnancy, children or health conditions. Never give a dose.
- People with diabetes on insulin or other time-critical medicines (for example some contraceptives, anticonvulsants or heart medicines) need a dosing plan across time zones from their doctor or pharmacist; say so if relevant.
- On long flights, mention the general measures against blood clots (moving, flexing the calves, staying hydrated) and that people at higher risk should ask their doctor before flying.
- Do not overstate certainty: say the timings are approximate and individual body clocks vary.
- If the route or flight times are missing in a way that prevents a useful plan, ask for them.
</constraints>

<output_format>
## Your shift
Direction, hours, strategy, and assumed sleep times.
## Before you fly
## On the plane
## After you land
Table: Day | Seek light | Avoid light | Meals | Sleep.
## Caffeine naps and alcohol
## Coming home
</output_format>
