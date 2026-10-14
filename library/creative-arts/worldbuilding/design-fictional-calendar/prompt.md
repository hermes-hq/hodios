---
schema: 1
id: design-fictional-calendar
kind: prompt
title: Design a fictional calendar
description: Designs a fictional world's calendar and timekeeping from its astronomy and culture, with months, weeks, festivals, dating eras and how different peoples count time differently.
category: worldbuilding
version: 1.0.0
status: incubating
stage: [design]
role: [writer, gamer, game-developer]
requires: [none]
inputs: [notes, text]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [timekeeping, festivals, holidays, astronomy, setting-design]
pairs_with:
  prompts: [build-world-timeline, design-fictional-religion, design-fictional-culture, design-alien-planet]
  personas: [worldbuilding-consultant]
args:
  - name: setting
    description: The world and the culture(s) that keep the calendar - how many suns and moons, length of day and year if known, climate and seasons, religion, farming or herding, technology level, and any dates already used in the story.
    type: text
    required: true
  - name: use
    description: Optional. How the calendar will be used, for example "date chapter headings", "track a campaign's in-game time", "festivals for the town the players live in".
    type: text
output_contract:
  format: markdown
  sections: [Assumptions, The sky it follows, Year and seasons, Months and weeks, Days and hours, Counting the years, Festivals and holy days, Other calendars, Converter, On the page]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a worldbuilder who designs calendars and timekeeping for fiction and games. Calendars come from what people can see and what they need: the sun gives the year and seasons, the moon gives months, and since neither divides neatly into the other, every lunar or solar calendar needs fixes (leap days, intercalary months, uncounted days) that become politically and religiously charged. Farmers, priests, sailors and tax collectors each care about different cycles, so rival calendars often coexist. Weeks are cultural, tied to markets or rest days. Year counts start from a founding event, a reign or a god, and a change of dynasty can restart the count. Flat fictional calendars are the Gregorian calendar with renamed months and every culture agreeing on it.

<setting>
{{setting}}
</setting>
{{#use}}Use: {{use}}{{/use}}
</context>

<task>
1. If the setting gives no idea of the culture keeping the calendar or of its sky (number of moons and suns, or "Earth-like"), ask for it and stop. Otherwise list assumptions in one line each and keep every established date.
2. The sky it follows: the cycles available (day, moon phases, year, other moons, stars, magical cycles) with lengths in days, choosing values that do not divide evenly unless the setting says otherwise.
3. Year and seasons: how the year is defined and divided, and what the seasons mean for work, war and travel.
4. Months and weeks: names with their meaning or origin, length, and how the leftover days are handled. Week length and the reason for it.
5. Days and hours: when the day starts (sunrise, sunset, midnight), how hours are counted, and how people tell time without clocks if that fits.
6. Counting the years: the era the years count from, how a date is written, and one controversy (a disputed founding date, a reformed calendar, a lost year).
7. Festivals and holy days: six to ten observances tied to the sky, the farming cycle, history or religion, each with date, what people do, and a tension or taboo around it.
8. Other calendars: how at least one other group (a neighbouring people, a religious order, sailors, a rival state) counts time differently, and where the two collide.
9. Converter: a short table or rule for turning a date in this calendar into a day-of-year count, so the author can keep travel times, ages and pregnancies consistent{{#use}}, shaped for: {{use}}{{/use}}.
10. Check before output: month and week lengths add up to the stated year with leftover days handled; festivals do not contradict the seasons; at least one calendar problem exists for story use.
</task>

<constraints>
- Check the arithmetic: state the total days and show how months, intercalary days and leap rules sum to it.
- Do not simply rename Earth months unless the user asks for an Earth-like calendar; even then, give names a cultural origin.
- Do not copy calendars from existing fiction or games.
- Keep names pronounceable and few enough to remember; offer short forms for everyday use.
</constraints>

<output_format>
## Assumptions
## The sky it follows
## Year and seasons
## Months and weeks
Table: Month | Days | Meaning | Season.
## Days and hours
## Counting the years
## Festivals and holy days
Table: Festival | Date | What people do | Tension.
## Other calendars
## Converter
## On the page
Six to eight ways the calendar shows up in dialogue and scenes.
</output_format>
