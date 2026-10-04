---
schema: 1
id: adapt-course-for-low-bandwidth
kind: prompt
title: Adapt a course for low bandwidth
description: Redesigns a course for learners with poor connectivity or only a phone, using text and audio over video, offline packs, messaging-app or SMS delivery, small files and asynchronous assessment.
category: course-design
version: 1.0.0
status: incubating
stage: [design, build]
role: [teacher, manager]
requires: [none]
inputs: [text, spec]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [low-bandwidth, mobile-learning, offline-learning, messaging-apps, data-costs, digital-divide]
pairs_with:
  prompts: [convert-course-to-online, design-microlearning-series]
args:
  - name: course_outline
    description: The current course - modules, materials (videos with lengths, PDFs, live sessions, platform), assessments, and what you know about learners' devices, data costs, power and connectivity.
    type: text
    required: true
  - name: channel
    description: Main delivery channel to design for.
    type: enum
    enum: [messaging-app, sms, offline-pack, mixed]
    default: mixed
output_contract:
  format: markdown
  sections: [Learner access profile, Format conversions, Weekly delivery plan, Offline pack, Assessment and feedback, Data budget, Support and testing]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
For many learners in rural areas, refugee settings, or on prepaid data, a typical online course is unusable: a 20-minute HD video can cost a day's wages in data, live sessions drop, platforms do not load on older phones, and shared devices mean a learner has the phone only in the evening. Redesigns fail when they just compress the video. They succeed when they start from what learners actually have (device, data cost, power, time of access, shared or own phone, literacy), choose the lightest format that does the job, deliver in small chunks through a channel learners already use, and make assessment and feedback work asynchronously.

Main channel: {{channel}}.
</context>

<task>
<course_outline>
{{course_outline}}
</course_outline>

1. **Learner access profile:** summarise devices, connectivity, data cost, power, time of access and literacy from the outline; list what to check with a short access survey (sent by SMS or asked by phone) if unknown.
2. **Format conversions:** for each material, the lightest format that keeps the learning: video to a short audio clip (voice notes under 3 minutes, low bitrate) plus key images or a text summary; slides to a one-page text or image; long PDFs to short chunks readable on a small screen; live sessions to recorded audio plus an asynchronous Q&A window, with an optional live call at a fixed low-cost time.
3. **Weekly delivery plan:** how each week reaches learners through {{channel}}: message sequence (what is sent, when, size), group versus one-to-one messages, and reminders. For SMS: messages under 160 characters, numbered, with a reply code for answers.
4. **Offline pack:** what goes in a downloadable or printed pack (memory card, USB, printed booklet), how often it is refreshed, and how learners collect it.
5. **Assessment and feedback:** asynchronous tasks that work on a basic phone (photo of written work, voice note answer, short text reply, multiple-choice by reply code), how teachers give feedback (voice notes, batch replies), and fair deadlines.
6. **Data budget:** an estimated data size per week, using rough file sizes stated as assumptions, against a target (for example under 50 MB per week), and what to cut if over.
7. **Support and testing:** a test on the lowest common device and network before launch, a help line or contact window, peer study pairs, and how to reach learners who go quiet.
</task>

<constraints>
- Every course outcome must still be reachable; if something cannot be done without bandwidth (for example a live lab), propose an alternative or flag it.
- Protect privacy on shared phones and messaging groups: do not expose learners' numbers to the whole group where avoidable, get consent for groups, and avoid sending sensitive content.
- Do not invent data prices or network coverage; give file sizes as approximate ranges and say what to check locally.
- Name channels generically (a messaging app, SMS) unless the outline already names a specific one.
- If the outline gives no modules or materials, ask for them and stop.
</constraints>

<output_format>
## Learner access profile
Bullets, plus survey questions if needed.
## Format conversions
Table: Current material | New format | Approx size | Notes.
## Weekly delivery plan
Table: Day | What is sent | Format | Size. Then a sample message sequence.
## Offline pack
Bullets.
## Assessment and feedback
Bullets.
## Data budget
Table: Week | Estimated MB | Within target?
## Support and testing
Checklist.
</output_format>
