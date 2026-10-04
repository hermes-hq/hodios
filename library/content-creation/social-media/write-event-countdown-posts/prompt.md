---
schema: 1
id: write-event-countdown-posts
kind: prompt
title: Write event countdown posts
description: Writes a dated sequence of posts promoting a local event from announcement to the day and the thank-you, each with a new reason to share, sized to the weeks left.
category: social-media
version: 1.0.0
status: incubating
stage: [plan, build]
role: [marketer, content-creator, founder]
requires: [none]
inputs: [text]
output: [plan, post, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [event-promotion, content-calendar, local-events, save-the-date]
pairs_with:
  prompts: [plan-live-event-coverage, write-local-business-facebook-posts]
args:
  - name: event_details
    description: What the event is, date and times, venue and address, price or free, who it is for, line-up or highlights, access details (step-free, toilets, parking, quiet space), booking link, and any assets you have (photos, posters, speaker quotes).
    type: text
    required: true
  - name: weeks_until
    description: Weeks from now until the event day.
    type: number
    required: true
  - name: platforms
    description: Where you will post (for example "Instagram, Facebook event page, local WhatsApp groups").
    type: string
    default: Instagram and Facebook
output_contract:
  format: markdown
  sections: [Schedule, Posts, On the day, After the event, Gaps to fill]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An organiser, venue, nonprofit or small business is promoting a local event. Countdown campaigns usually fail by repeating the same poster with "only X days to go!", which gives people nothing new to share and feels like nagging. Each post needs a fresh reason to care (a new act announced, what the day feels like, practical worries answered), and the practical post (getting there, access, what to bring) is the one that turns "interested" into "going". Most people decide in the last week, so the plan front-loads awareness and saves the strongest content for the final days.

Weeks until the event: {{weeks_until}}
Platforms: {{platforms}}
</context>

<task>
<event_details>
{{event_details}}
</event_details>

1. Size the plan to the time left: about one post a week while more than four weeks remain, two a week from four weeks out, and three to four posts in the final week, capped at about 12 posts in total (more reads as nagging for a local event). If fewer than two weeks remain, merge save-the-date and what-to-expect and say so; if less than one week remains, plan only the practical post, the last call, the day and the thank-you.
2. Plan these beats in order, dropping or merging any that do not fit: save the date; what to expect (the feeling of the day); highlights or line-up (one per post if there are several); meet a person behind it (organiser, performer, stallholder); practical details and access; last call (tickets, spaces, or "see you Saturday"); live on the day; thank-you and results.
3. For each post give: date (as "week -N, day"), platform, format (photo, short video, carousel, story, event update), the hook line, the full caption, and the share reason (why someone would tag a friend or forward it).
4. The practical post covers getting there, times, price, what to bring, step-free access, toilets, quiet space, food, weather plan, children and dogs, as far as the details allow.
5. Plan the day: three to five short story or live updates (doors open, a highlight, a crowd moment with consent, last chance to come down).
6. Write the thank-you post with spaces for numbers and photo credits, and a "save the date for next year" line if relevant.
</task>

<constraints>
- Use only details given. Mark missing ones as [X] and list them under Gaps to fill; never invent acts, prices, times or sponsors.
- No fake scarcity: say "nearly sold out" only if the organiser confirms it.
- Each caption under 120 words; one clear action per post (book, save, share, come).
- Note photo consent for crowd shots and children, and alt text for every image.
- If what the event is, or roughly where it happens, is missing, ask for it and stop. A missing exact date, start time or address does not stop the plan: count back from the weeks given and mark those details [X].
</constraints>

<output_format>
## Schedule
Table: when | platform | beat | format | share reason.

## Posts
Numbered, matching the schedule: hook line, caption ready to paste, image or video idea with alt text.

## On the day
Bulleted live updates.

## After the event
The thank-you post.

## Gaps to fill
Checklist of [X] items.
</output_format>
