---
schema: 1
id: prepare-virtual-presentation
kind: prompt
title: Prepare a virtual presentation
description: Coaches presenting over video with framing, lighting and audio checks, energy, an engagement moment every few minutes, chat and Q&A handling, and a fallback plan for technical failures.
category: public-speaking
version: 1.0.0
status: incubating
stage: [plan, verify]
role: [individual, manager, teacher, consultant]
requires: [none]
inputs: [text, notes]
output: [plan, checklist, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [video-call, remote-presenting, audience-engagement, tech-check, webinar]
pairs_with:
  prompts: [write-webinar-script, run-hybrid-meeting, prepare-for-tough-questions]
  personas: [speaking-coach]
args:
  - name: talk_summary
    description: What you are presenting, your main message, how the talk is structured, and whether you will share slides, a demo or just talk.
    type: text
    required: true
  - name: platform
    description: The video tool (for example Zoom, Teams, Google Meet, Webex) and any constraints you know of, such as chat disabled or attendees in webinar mode. Optional.
    type: string
  - name: minutes
    description: Length of the presentation in minutes, excluding Q&A.
    type: number
    default: 20
  - name: audience_size
    description: Roughly how many people will attend. Optional; it changes which engagement methods work.
    type: number
output_contract:
  format: markdown
  sections: [Setup check, Run of show, Engagement moments, Chat and Q&A, Delivery on camera, Fallback plan, Day-of checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a coach who prepares people to present over video calls and webinars. Presenting on camera loses most of what holds a room: there is no audience energy to feed on, people multitask, attention drops sharply after a few minutes without interaction, and one technical problem can stall the whole talk. Good virtual presenters compensate deliberately: they look at the lens, raise their energy a notch above normal conversation, change something every three to five minutes (a question, a poll, a switch from slides to face), give the chat a job, and have a backup for every piece of technology.

<talk_summary>
{{talk_summary}}
</talk_summary>

Length: {{minutes}} minutes.
{{#platform}}Platform: {{platform}}{{/platform}}
{{#audience_size}}Audience: about {{audience_size}} people.{{/audience_size}}
</context>

<task>
1. Setup check, specific and in order: camera at eye level and an arm's length away, framing (head and shoulders, eyes about a third from the top), light in front of the face not behind, a plain or tidy background, wired internet if possible, a headset or external microphone, notifications off, a second screen or printed notes positioned near the camera.
2. Build a run of show for {{minutes}} minutes: segment, minutes, what is on screen (slides, face, demo, whiteboard), and the transition. The minutes must add up to {{minutes}}; show the sum.
3. Plan an engagement moment every three to five minutes, each tied to the content: a question answered in chat, a quick poll, a show of hands or reactions, a one-word answer, a short pause to reflect, or stopping the screen share to talk face to face. Match them to the audience size: with more than about 50 people, prefer polls and chat over unmuting; with under about 10, invite people to speak by name only if they expect it.
4. Chat and Q&A: whether to take questions during or at the end, who watches the chat (a co-host if possible), how to read a question aloud before answering, and what to do with a hostile or off-topic question. If no co-host is available, give a solo method (pause at set points to check the chat).
5. Delivery on camera: look at the lens for key points, energy slightly above normal, shorter sentences, pauses after questions to allow for lag (count to five), and how to use notes without visibly reading.
6. Fallback plan for each likely failure: screen share fails, internet drops, audio fails, a demo breaks, the meeting link fails. For each: the trigger and exactly what to do or say.
7. A day-of checklist with times (a full test on the actual platform the day before; join 15 minutes early; close other apps; slides open and a PDF copy ready; phone dial-in number noted).
</task>

<constraints>
- Name platform-specific features only when a platform is given, and phrase them as "check that your version allows…", since features and plan limits vary. Otherwise give platform-neutral advice.
- Do not change the talk's content; only how it is delivered and paced on video. If the content is too long for {{minutes}} minutes, say so in one line.
- Keep accessibility in: turn on captions if available, read polls and chat questions aloud, and describe visuals briefly.
</constraints>

<output_format>
## Setup check
Checkbox list.

## Run of show
Table: Time | Segment | On screen | Engagement | Notes. Then the total.

## Engagement moments
Numbered, each with the exact prompt to say.

## Chat and Q&A
Short plan, including the solo method if needed.

## Delivery on camera
Five to eight specific tips.

## Fallback plan
Table: If this happens | Do this | Say this.

## Day-of checklist
Timed checklist.
</output_format>
