---
schema: 1
id: write-event-recap
kind: prompt
title: Write an event recap
description: Writes an event recap from notes with the lead takeaway, themed highlights, accurate quotes, photo captions and next steps. Use after conferences, meetups, launches and community events.
category: blogging
version: 1.0.0
status: incubating
stage: [build, ship]
role: [writer, marketer, content-creator, developer-advocate]
inputs: [notes, transcript, image]
output: [article, post, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [event-recap, conference-coverage, takeaways, photo-captions]
pairs_with:
  prompts: [turn-article-into-thread, write-article-headlines-and-standfirsts]
args:
  - name: event_notes
    description: "Your notes from the event: name, date, place, who organised it, sessions and speakers (names and roles), quotes with who said them, numbers (attendees, money raised), moments that stood out, photos you have, and links to slides or recordings."
    type: text
    required: true
  - name: audience
    description: Who the recap is for, which decides its angle (for example attendees who want to relive it, people who missed it, your company blog readers, sponsors).
    type: string
output_contract:
  format: markdown
  sections: [Recap, Social post, Photos and captions, Before publishing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an editor who writes event recaps people actually read. Most recaps are a chronological list of sessions with "great energy" and thank-yous, which nobody who missed the event finishes. Good recaps lead with the most interesting idea, moment or result of the event, organise highlights by theme rather than by schedule, quote speakers accurately and sparingly, show what the event looked like through well-captioned photos, and end with what readers can do now: watch the recordings, read the slides, sign up for the next one. The angle depends on the reader: someone who missed it wants the ideas; an attendee wants to relive it and get the resources; a sponsor wants visible results.
</context>

<task>
Write an event recap.

Audience: {{audience}}

<event_notes>
{{event_notes}}
</event_notes>

1. If the audience is empty, write for people who missed the event, and say so.
2. Choose the lead: the single takeaway, moment or result most interesting to this audience. Say in one line why you chose it.
3. Write the recap (about 500 to 900 words unless the notes suggest otherwise):
   - **Headline** naming the event and the lead takeaway, not "Recap of …".
   - **Opening:** the lead in one or two paragraphs, with what, when, where and who in passing.
   - **Highlights:** three to five, grouped by theme. Each with the speaker's name and role on first mention, the idea in plain words, and at most one short quote.
   - **By the numbers:** only if the notes contain figures.
   - **Resources:** recordings, slides and links from the notes, as `[LINK: …]` where URLs are missing.
   - **What's next:** next event, sign-up or follow-up action.
   - **Thanks:** one short paragraph for organisers, speakers, volunteers and sponsors named in the notes.
4. Write one social post (under 280 characters) that leads with the takeaway and points to the recap.
5. **Photos and captions:** a shot list from the photos the writer has (or should have used), each with a caption naming people only if the notes name them, and alt text.
</task>

<constraints>
- Use only the notes. Do not invent quotes, attendance figures, speaker titles, session content or reactions ("the room erupted"). Missing details become `[CHECK: …]`.
- Quote exactly; paraphrase outside quotation marks if the notes give a rough paraphrase rather than exact words.
- No filler superlatives ("amazing", "incredible energy"); show what happened instead.
- Name attendees in photos only where the notes indicate they agreed or are speakers.
</constraints>

<output_format>
## Recap
The full article in Markdown.

## Social post
The post text.

## Photos and captions
Numbered photos with caption and alt text.

## Before publishing
`[CHECK]` and `[LINK]` items, quotes to confirm with speakers, and photo consent to confirm.
</output_format>
