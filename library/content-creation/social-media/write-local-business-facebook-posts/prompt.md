---
schema: 1
id: write-local-business-facebook-posts
kind: prompt
title: Write Facebook posts for a local business
description: Writes a month of Facebook posts for a local business with community topics, offers, events and reply templates that drive visits. Use for a cafe, shop, salon, gym or trade business.
category: social-media
version: 1.0.0
status: incubating
stage: [build]
role: [founder, marketer]
inputs: [notes]
output: [post, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [facebook, local-business, community-marketing, foot-traffic, neighbourhood]
pairs_with:
  prompts: [reply-to-comments, plan-social-media-giveaway, write-instagram-caption]
  personas: [social-media-manager]
args:
  - name: business
    description: What the business is, where it is, who the customers are, what makes it different, the tone, opening hours, and any staff or regulars happy to be featured.
    type: text
    required: true
  - name: month_events
    description: This month's events, offers, new products, local happenings, holidays and anything changing, such as closures or new hours. Leave empty if nothing is planned.
    type: text
output_contract:
  format: markdown
  sections: [Month at a glance, Posts, Reply templates, Photo list]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write Facebook content for local businesses. Local customers follow a business page because it is part of their neighbourhood, so the posts that work are the ones that feel like a neighbour talking: the faces behind the counter, what is fresh today, a local team or school being supported, an event worth coming to, a question about the area. Pure promotion every day gets ignored, while one clear offer among genuinely local posts gets noticed. Facebook's feed demotes engagement bait ("comment YES", "tag 5 friends", "share to win" without proper rules), so engagement must come from real questions and real community. Practical details (hours, address, parking, booking link) drive visits and should be easy to find in posts about events and offers. Facebook Events and local groups extend reach beyond the page's followers.
</context>

<task>
<business>
{{business}}
</business>

<month_events>
{{month_events}}
</month_events>

1. Plan the month: about three posts a week (12 to 14 in total), with a mix of roughly one in four promotional and the rest community, behind-the-scenes and useful posts. Place every event and offer from the month's list on the calendar with a teaser before and a reminder on the day.
2. Write each post, using a range of these types:
   - **Behind the scenes:** a staff member, a process, a delivery, how something is made.
   - **Community:** a local partner, a school or club supported, a neighbourhood event, a shout-out to another local business.
   - **Customer:** a regular's favourite (only with their permission), a question about local life, a "this or that" choice.
   - **Offer or product:** what it is, why now, how to claim it, and when it ends, all from the month's list.
   - **Event:** what, when, where, cost, who it is for, and whether to book; suggest creating a Facebook Event for it.
   - **Practical:** hours changes, holiday opening, booking reminders.
3. Each post: a first line that stops the scroll (most readers see only that), short paragraphs, the practical detail needed to act, and a natural question or call to action. Suggest the photo or short video for it.
4. Write reply templates for common comments and reviews: a question about hours or prices, a compliment, a complaint (acknowledge, take it to private messages, offer to fix), and a negative review.
</task>

<constraints>
- Offers, prices, dates and events come only from the notes; anything else is `[FILL: …]`.
- No engagement bait and no giveaway posts without saying the business must publish rules that comply with Facebook's promotion guidelines and local law.
- Feature people (staff, customers, children) only with permission; add a reminder in the photo list.
- Match the stated tone; if none is given, write warm, plain and local, without corporate phrasing or hashtags beyond one local tag.
- If month events are empty, build the month from evergreen community and behind-the-scenes posts plus seasonal hooks, and mark the seasonal ones for the owner to confirm.
</constraints>

<output_format>
## Month at a glance
A table: date or week | post type | topic | goal (visit, booking, awareness, community).

## Posts
Numbered posts with the suggested day, the post text and the photo or video idea.

## Reply templates
Each template headed by the situation.

## Photo list
Bullets of shots to take this month, with permission reminders.
</output_format>
