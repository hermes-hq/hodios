---
schema: 1
id: write-webinar-script
kind: prompt
title: Write a webinar script
description: Writes a timed webinar script with opening, agenda, teaching segments, polls, demo transitions, Q&A handling and a call to action, built to keep a remote audience engaged to the end.
category: presentations
version: 1.0.0
status: incubating
stage: [build]
role: [marketer, teacher, founder, consultant]
requires: [none]
inputs: [topic, notes]
output: [script]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [webinar, polls, live-demo, run-of-show, call-to-action]
pairs_with:
  prompts: [outline-presentation, write-speaker-notes, prepare-for-tough-questions, moderate-panel]
  personas: [speaking-coach]
args:
  - name: topic
    description: The webinar topic, the main points or lessons, any demo or product to show, the presenters and their roles, and who registered and why.
    type: text
    required: true
  - name: duration_minutes
    description: Total running time in minutes, including Q&A.
    type: number
    default: 45
  - name: goal
    description: "What attendees should do afterwards, for example \"book a demo\", \"start a free trial\", \"enrol in the course\", \"apply the checklist this week\"."
    type: text
output_contract:
  format: markdown
  sections: [Run of show, Script, Polls, Q&A plan, Follow-up, Placeholders]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Webinar audiences are one click from leaving and are usually multitasking. Attention drops sharply after the first few minutes and at every long, uninterrupted stretch. Webinars that hold people deliver value early instead of after ten minutes of housekeeping and company history, change mode every five to eight minutes (a poll, a question, a demo, a story, a switch of speaker), tell people what they will get and when Q&A happens, and make the call to action a natural next step from the teaching rather than a hard sell bolted on at the end. People who arrive late and people who watch the recording should still be able to follow.
</context>

<task>
Write a webinar script for {{duration_minutes}} minutes.
{{#goal}}Goal for attendees: {{goal}}{{/goal}}

<topic>
{{topic}}
</topic>

1. If the topic lacks the actual content to teach (the points, steps or insights), ask for it in up to three short questions and stop. Do not fill a teaching segment with generic advice.
2. Build the run of show: segments with start times adding up to {{duration_minutes}} minutes, roughly:
   - opening and value promise (2 to 3 minutes; a short pre-start for late joiners if live);
   - a brief agenda and housekeeping (chat, Q&A, recording, under 1 minute);
   - two to four teaching segments, each built around one takeaway, with an interaction point between them;
   - a demo, if the topic includes one, with clear transitions in and out;
   - the call to action, introduced as the next step after the teaching;
   - Q&A (about 20 to 25% of the time);
   - a close that restates the takeaways and the call to action.
3. Write the script in spoken language for each presenter (label speakers), with:
   - a cold open in the first 60 seconds: a problem, a striking fact from the topic, or a question to the audience;
   - signposts ("That's the first mistake; the second is the one that costs most");
   - interaction cues every five to eight minutes: polls, chat prompts, "type 1 if…";
   - demo transitions: what to say while switching screens, and a fallback line if the demo fails;
   - a mid-point recap for late joiners.
4. Write two or three polls with answer options, when to launch them, and how the presenter will use the results live.
5. Plan Q&A: three seed questions in case the chat is quiet, how to group similar questions, how to handle off-topic or hostile ones, and what to do with unanswered questions.
6. Write the follow-up: the closing line about the recording and resources, and a three- to five-sentence follow-up email outline.
</task>

<constraints>
- Use only facts, claims, customer stories and product details from the topic. Mark anything missing as `[NEEDED: …]`; never invent statistics, testimonials or product features.
- The call to action is one clear step, mentioned briefly at the start ("stay to the end for…") and fully once near the end. No fake scarcity or invented deadlines.
- Keep slides and screen-sharing cues in brackets, separate from spoken lines.
- Spoken pace about 130 words a minute; scripted segments should leave room for interaction and Q&A.
</constraints>

<output_format>
## Run of show
Table: Start | Segment | Presenter | Interaction | Minutes. Total row.
## Script
Segment by segment, with speaker labels, spoken lines and [cues].
## Polls
Each: question, options, launch time, how to use the result.
## Q&A plan
Seed questions, handling rules, unanswered-question plan.
## Follow-up
Closing line and follow-up email outline.
## Placeholders
Every `[NEEDED: …]`. "None" if none.
</output_format>
