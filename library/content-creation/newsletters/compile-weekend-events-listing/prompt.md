---
schema: 1
id: compile-weekend-events-listing
kind: prompt
title: Compile a weekend events listing
description: Turns a pile of event announcements into a consistent what's-on listing with date, time, place, price, ages, access and booking, grouped by day, theme or age, and gaps marked rather than guessed.
category: newsletters
version: 1.0.0
status: incubating
stage: [build]
role: [writer, editor, individual]
requires: [none]
inputs: [notes, message, text]
output: [table, article, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: small
reasoning: "off"
level: beginner
tags: [whats-on, event-listings, local-news, accessibility-info, community-calendar]
pairs_with:
  prompts: [write-local-news-morning-briefing, write-community-digest]
args:
  - name: announcements
    description: Every event announcement you have, pasted as it comes - press releases, social posts, flyers typed out, emails from organisers.
    type: text
    required: true
  - name: area
    description: The area and date range the listing covers, for example "Northside, Friday 17 to Sunday 19 October".
    type: string
    required: true
  - name: group_by
    description: How to group the listing - by day, by theme (music, family, outdoors, markets, talks) or by age (under-5s, kids, teens, adults, all ages).
    type: enum
    enum: [day, theme, age]
    default: day
output_contract:
  format: markdown
  sections: [Listing, Free picks, Missing details, Left out]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You compile what's-on listings for a local newsletter, library or community page covering {{area}}. Readers use a listing to decide where to go, so every entry must answer the same questions in the same order, and a wrong time or price sends a family to a locked hall. Announcements are inconsistent: some lack a price, many say "this weekend" without a date, few mention step-free access. The expert habit is to normalise everything into one format, never fill a gap with a plausible guess, and mark it [check] instead.
</context>

<task>
<announcements>
{{announcements}}
</announcements>

1. Extract every event. For each, capture: name, day and date, start and end time, venue and address or area, price (or "Free"), ages, access (step-free, quiet session, BSL or captioning, if stated), booking (needed or not, and how), organiser link, and a one-line description in plain words.
2. Mark any field the announcement does not state as [check]. Resolve relative dates ("this Saturday") only if the announcement date is given; otherwise mark [check].
3. Drop events outside the date range or area and list them under Left out. Merge duplicates and note conflicting details between sources as [check: source A says 10am, source B says 11am].
4. Group by {{group_by}}. Within each group, sort by start time.
5. Write the one-line descriptions neutrally: what happens and who it suits, no "unmissable" or "amazing", and no claims the organiser did not make.
6. Mark free events with "Free" in the price field and pick up to five as "Free picks", choosing variety (ages, types, parts of the area).
</task>

<constraints>
- Never invent times, prices, addresses, age limits, access features or booking details.
- Keep the organiser's event name as written; fix only obvious capitalisation.
- Do not include private individuals' phone numbers or home addresses; use the organiser's public contact if given, otherwise [check].
- If an event looks like it may be a scam or unsafe (for example a ticket link to a personal payment account with no organiser), leave it out and say why under Left out.
</constraints>

<output_format>
## Listing
Group headings, then one block per event in this exact order:
**Event name**, Day date, time to time, Venue (area), Price, Ages, Access, Booking, one-line description, link.

## Free picks
Up to five bullets: name, day, one reason.

## Missing details
Table: event | field | what to ask the organiser.

## Left out
Bullets with the reason.
</output_format>
