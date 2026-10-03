---
schema: 1
id: prepare-networking-conversation
kind: prompt
title: Prepare for a networking event
description: Prepares someone for a networking event with a natural self-introduction, openers suited to the crowd, follow-up questions, graceful exits and a follow-up plan, for introverts and job seekers.
category: interpersonal-communication
version: 1.0.0
status: incubating
stage: [plan]
role: [job-seeker, founder, student, individual]
requires: [none]
inputs: [text, preferences]
output: [plan, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [networking, small-talk, introverts, conferences, meetups, follow-up]
pairs_with:
  prompts: [write-self-introduction, write-follow-up-email, reconnect-with-old-contact]
  personas: [communication-coach]
args:
  - name: event
    description: "The event and who will be there, for example \"local Python meetup, about 60 developers, talks then drinks\" or \"industry conference reception for logistics managers\"."
    type: text
    required: true
  - name: goals
    description: "What you want from it, for example \"meet two people hiring for junior analyst roles\", \"find a co-founder\", \"just get more comfortable at these\"."
    type: text
    required: true
  - name: background
    description: Optional, a few lines about you, your work or studies, and anything interesting you could talk about.
    type: text
  - name: comfort_level
    description: How comfortable you feel at events like this.
    type: enum
    enum: [nervous, ok, confident]
    default: ok
output_contract:
  format: markdown
  sections: [Game plan, Your introduction, Openers, Questions that go deeper, Talking about what you want, Graceful exits, Follow-up plan]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Networking works when it feels like ordinary conversation with a purpose in the background. People remember those who were curious about them and easy to talk to, not those who recited a pitch. What helps most is preparation that removes the hard moments: a short, natural answer to "So what do you do?", a few openers that fit the room, questions that go past small talk, a polite way to leave a conversation, and a follow-up within two days, which is where most of the value is made or lost. For nervous attendees, a small, concrete goal ("three real conversations") beats "work the room".
</context>

<task>
Help me prepare for this event at a {{comfort_level}} comfort level.

<event>
{{event}}
</event>
<goals>
{{goals}}
</goals>
{{#background}}
<background>
{{background}}
</background>
{{/background}}

1. If the event or goals are too thin to tailor anything, ask for the missing piece in one question and stop. If my background is missing, continue with `[placeholders]` for details only I know; never invent a job, employer or achievement for me.
2. Check the fit between the event and my goals. If the setting is wrong for what I want (for example pitching at a social occasion), say so and adjust the goal to what is appropriate there, such as making a connection and arranging to talk later.
3. Set a realistic game plan: a number of conversations to aim for, when to arrive, where to stand or start, and one easy first move.
4. Write my introduction in two lengths: about 10 seconds and about 30 seconds. Plain words, what I do or am looking for, one specific detail that invites a question, and a turn back to them. No buzzwords.
5. Write five or six openers that fit this crowd and setting: situational ones (the talk, the venue, the event), and one or two for joining a group already talking.
6. Write follow-up questions that go deeper than job titles: what they are working on, what is hard about it, how they got into it, what they would recommend.
7. Show how to mention what I want naturally and without pressure, for example asking for advice or a referral to the right person rather than for a job or an investment.
8. Give four graceful exit lines that leave a good impression, including one that introduces them to someone else.
9. Give a follow-up plan: what to note on my phone after each conversation, a message template to send within 48 hours that references something specific we discussed, and what to do if they do not reply.
10. If I am nervous, add three small tactics, such as arriving early when the room is quiet, volunteering or helping at the event, or bringing a question from the talk.
</task>

<constraints>
- Sound like a real person at an event, not a sales script. Lines must be easy to say aloud.
- No manipulation tactics, fake interest or flattery formulas.
- Keep cultural and setting norms in mind (a trade-show floor versus a dinner versus an online event) and adapt the lines.
- Keep the whole plan to something I can read on my phone in five minutes.
</constraints>

<output_format>
## Game plan
Three to five bullets.
## Your introduction
**10 seconds:** in a quote block. **30 seconds:** in a quote block.
## Openers
A numbered list, each with when to use it in a few words.
## Questions that go deeper
Six to eight bullets.
## Talking about what you want
Two or three example lines.
## Graceful exits
Four lines.
## Follow-up plan
What to note, the 48-hour message template in a quote block, and what to do if there is no reply.
</output_format>
