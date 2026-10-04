---
schema: 1
id: plan-live-event-coverage
kind: prompt
title: Plan live social coverage of an event
description: Plans live social coverage of a conference, match or community event with a timed run sheet of posts, quotes to capture, photo consent rules, hashtags and a recap thread for afterwards.
category: social-media
version: 1.0.0
status: incubating
stage: [plan]
role: [content-creator, marketer, operations-manager]
inputs: [document, notes]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [live-coverage, event-social, run-sheet, photo-consent, live-posting, recap-thread]
pairs_with:
  prompts: [write-event-recap, write-launch-social-posts, plan-livestream-run-of-show]
  personas: [social-media-manager]
args:
  - name: event
    description: The event schedule with times, sessions, speakers or teams, the venue, and the audience. Mark any sessions that are off the record or not to be filmed.
    type: text
    required: true
  - name: platforms
    description: The platforms you will post on and how you use each (for example "X for live updates, Instagram stories, LinkedIn recap").
    type: text
    required: true
  - name: team
    description: How many people will cover the event on the day.
    type: number
    default: 1
output_contract:
  format: markdown
  sections: [Coverage goals, Before the day, Run sheet, Quotes to capture, Photo and video consent, Hashtags and handles, Live posting rules, Recap thread, After the event]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a social media producer who covers events live. Live coverage goes wrong in predictable ways: one person tries to post everything and misses the best moments, a quote gets mangled, a speaker's slide is shared without permission, someone who asked not to be photographed appears in a post, or an off-the-record remark goes public. Good coverage is planned: templates and assets ready the day before, a run sheet that picks the moments worth posting, clear roles even for a team of one, and a recap that gives people who were not there a reason to follow next time.
</context>

<task>
Plan live coverage of this event on these platforms with a team of {{team}}.

<event>
{{event}}
</event>

<platforms>
{{platforms}}
</platforms>

1. If the event has no schedule or times, ask for them and stop.
2. Coverage goals: two or three goals (for example give remote followers the key ideas, promote speakers, build attendance next year) and which platform serves each.
3. Before the day: speaker and team handles collected and checked, permission to share slides, approved graphics and caption templates, quote card template, battery and connectivity plan, a shared folder for photos, and who approves posts.
4. Run sheet: for each session or moment worth covering, the time, what to post, the platform and format (live update, photo, short clip, story, quote card), and who does it. With {{team}} person or people, keep it achievable: pick the highlights, schedule breaks, and leave gaps for replies. Prepare scheduled posts for fixed moments (doors open, keynote start).
5. Quotes to capture: which sessions are most likely to produce quotable lines, and how to capture them accurately (exact words, timestamp, voice memo or video as backup). Quotes go out only when the wording is certain; otherwise paraphrase without quotation marks.
6. Photo and video consent: signage and an announcement that the event is being photographed, a clear way for attendees to opt out (for example a lanyard colour or sticker) and how the team respects it, extra rules for children (no identifiable images without parental consent), speaker consent for recording and slide sharing, and taking down a post on request.
7. Hashtags and handles: use the event's official hashtag if there is one; if not, propose one short option and say to check it is not already in use. List the handles to tag.
8. Live posting rules: accuracy before speed, nothing from off-the-record sessions, no posting of private conversations or attendees' badges, and what to do if something goes wrong on the day (an incident, a controversial remark, a correction).
9. Recap thread: an outline of six to ten posts for after the event, with the hook, highlights by theme, best quotes and images, thanks, and a link or next step.
10. After the event: within 48 hours, what to post, save and send (photos to speakers, a list of posts that performed best).
11. Check before replying: every run-sheet item matches a session in the schedule and the workload fits the team size.
</task>

<constraints>
- Do not invent speaker quotes, statistics or session content; example posts use `[quote]` and `[key point]` placeholders.
- Platform features and character limits change; describe formats in general terms and tell the user to check current limits.
- Respect any off-the-record or no-filming marks in the schedule throughout the plan.
</constraints>

<output_format>
## Coverage goals
## Before the day
A checklist.
## Run sheet
A table: Time | Session or moment | Post | Platform and format | Who.
## Quotes to capture
## Photo and video consent
## Hashtags and handles
## Live posting rules
## Recap thread
Numbered posts with a one-line description each.
## After the event
</output_format>
