---
schema: 1
id: write-client-holiday-greetings
kind: prompt
title: Write year-end greetings to clients
description: Writes inclusive year-end greetings to clients, partners and suppliers, personalised by relationship with a real detail from the year, holiday hours where needed and no sales pitch.
category: email
version: 1.0.0
status: incubating
stage: [build]
role: [founder, consultant, sales-rep, manager]
requires: [none]
inputs: [notes, text]
output: [message, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [year-end, season-greetings, client-relationships, holiday-hours, thank-you, account-management]
pairs_with:
  prompts: [write-greetings-for-other-faiths-holidays, write-client-check-in-email, write-out-of-office-message, write-card-message]
args:
  - name: sender
    description: Who is sending (you, your business, your team), what you do, and the tone of your brand or relationships, for example "two-person design studio, friendly and informal".
    type: string
    required: true
  - name: recipients
    description: The clients or groups to write to, one line each with something specific from this year where you have it, for example "Dana at Northfield Bakery - rebrand launched in June, she sent us cake", or groups like "about 40 smaller clients we did one job for".
    type: text
    required: true
  - name: details
    description: Optional - your closing dates and emergency contact over the holidays, whether you are sending email, cards or a gift, any client who has had a hard year, countries and cultures of recipients, and any rules on gifts at their end.
    type: text
output_contract:
  format: markdown
  sections: [Approach, Personal notes, Group message, Holiday hours note, Subject lines, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help small businesses and account owners send year-end greetings that strengthen relationships instead of joining the pile of identical templates. What works: a short note with one specific memory or thanks from the year, sent early enough to be read (before the last working week), inclusive wording ("season's greetings", "a restful break", "all the best for the new year") unless you know the recipient's own celebration, and no sales pitch, discount code or upsell. What fails: mass emails with visible recipient lists, "Merry Christmas" to people who do not celebrate it, invented personal touches, over-familiarity with formal clients, and gifts that breach a client's gift policy. Many organisations, especially public bodies and large companies, restrict gifts and hospitality. Year-end timing also varies: not every country or culture closes in late December, and some clients mark the new year at another time.

Sender: {{sender}}

<recipients>
{{recipients}}
</recipients>
{{#details}}Details: {{details}}{{/details}}
</context>

<task>
1. Approach: in a few bullets, say when to send, which recipients deserve a personal note versus the group message, and whether email or a card fits each, based on the relationship.
2. Personal notes: for each named recipient, write a short note (40 to 90 words) using the specific detail given, thanks that names what they did, a light look ahead without a pitch, and a warm close. Vary openings so no two notes look templated. For a recipient who had a hard year, write something gentle that does not pretend the year was great.
3. Group message: one inclusive message for the remaining clients that still feels human, with a placeholder for a first name and one optional line to personalise.
4. Holiday hours note: if closing dates were given, a short paragraph with the dates, how urgent issues are handled and when normal service resumes; otherwise a placeholder version.
5. Subject lines: three options that do not look like marketing.
6. Notes: send individually or with blind copy, never with an open recipient list; check gift policies before sending gifts; and adjust the greeting for anyone whose own holiday is known.
</task>

<constraints>
- Use only details the user gave. Do not invent shared memories, projects or personal facts.
- No sales pitch, offers, discount codes or "let's book a call" in the greetings.
- Default to inclusive wording; use a specific holiday greeting only when the user says the recipient celebrates it.
- Keep each personal note under about 90 words and the group message under about 120.
- Match formality to the relationship: first names and warmth for close clients, more reserved wording for formal or public-sector clients.
</constraints>

<output_format>
## Approach
## Personal notes
One note per recipient, headed with their name.
## Group message
## Holiday hours note
## Subject lines
## Notes
</output_format>
