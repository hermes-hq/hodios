---
schema: 1
id: practise-networking-event-chat
kind: prompt
title: Practise networking event conversations
description: Simulates conversations at a networking event or career fair with a run of different people to approach, so the user practises openers, a short intro, follow-up questions and graceful exits.
category: job-search
version: 1.0.0
status: incubating
stage: [verify]
role: [job-seeker, student]
requires: [none]
inputs: [text]
output: [conversation, report, message]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
tags: [networking, career-fair, small-talk, elevator-pitch, counterpart-simulation, introverts]
pairs_with:
  prompts: [prepare-networking-conversation, plan-career-fair, write-networking-message, write-tell-me-about-yourself]
  personas: [communication-coach, career-coach]
args:
  - name: event_type
    description: The kind of event, for example "industry-meetup", "university career fair", "conference coffee break", "alumni drinks", "online breakout room".
    type: string
    default: industry-meetup
  - name: goal
    description: What you want from the event and your background in a line, for example "find two people at fintech companies who could refer me for a junior analyst role; I'm finishing an economics degree".
    type: string
    required: true
  - name: intro_draft
    description: How you currently introduce yourself, if you have a version. Leave empty and one will be drafted with you.
    type: text
  - name: rounds
    description: How many different people to practise approaching.
    type: number
    default: 4
output_contract:
  format: markdown
  sections: [Warm-up, Rounds, Scorecard, Follow-up message, Practise next]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Networking events go wrong in a few predictable places: walking up to someone (or a group) without an opener, an introduction that is either a mumble or a CV recital, running out of questions after "what do you do?", talking only about yourself, not knowing how to leave, and forgetting to agree a next step. Each of these improves fast with practice against people who behave like real attendees: the friendly talker who will not stop, the busy senior person with two minutes, the quiet one, the recruiter behind a booth, a closed group of three.

Event: {{event_type}}
Goal and background: {{goal}}
{{#intro_draft}}
<intro_draft>
{{intro_draft}}
</intro_draft>
{{/intro_draft}}
Rounds: {{rounds}}
</context>

<task>
1. Warm-up. If the goal does not say what field or roles the person is aiming at, ask one question and stop. Otherwise, work on the introduction: tighten the draft (or write one with them) to about 15 to 20 seconds spoken - who they are, what they are interested in, and one hook that invites a question. Offer it, then ask if they want to adjust it or start.
2. Rounds. Run {{rounds}} rounds, each with a different person suited to the event, drawn from: a friendly talker who dominates, a busy senior person with little time, a quiet attendee, a recruiter or company representative (at career fairs), a group of two or three already talking, and someone who asks blunt questions ("so what are you after?"). For each round:
   - Set the scene in one line in italics (who is where, what they are doing), then wait for the person to approach.
   - Play the character in one to three sentences per turn, with their own job, interests and mood. Reward good open questions and listening with more openness; give short answers to closed or self-centred questions.
   - End the round when the person exits or after about eight exchanges, then give quick notes in three lines: one thing that worked, one thing to try, and a better line for the weakest moment.
3. After the last round, give the scorecard and a follow-up message for the best contact.
</task>

<constraints>
- Stay in character during a round; no coaching until the round ends. If the person types "pause", step out briefly, then resume.
- Make characters realistic and varied in age, seniority and personality, never caricatures.
- In notes and the scorecard, quote the person's actual lines. Do not praise moves they did not make.
- Exits should be practised every round. A good exit thanks the person, sums up, and either agrees a next step or moves on politely.
- Do not script misleading claims about their experience. Keep the intro honest.
- If the person says they find these events very anxious, acknowledge it, keep the first round easy, and offer a quieter character to start.
</constraints>

<output_format>
Warm-up: the tightened intro in a quote block, then a short question.

During rounds: italic scene line, then only the character's words. After each round, three lines headed **Worked**, **Try**, **Better line**.

At the end, in Markdown:
## Scorecard
Table: Skill | Score (1-4) | Evidence (quoted) — rows: Opener, Intro, Questions and listening, Joining a group, Exit, Next step agreed.
## Follow-up message
A short message to the most useful contact from the rounds, referring to something they said, with one clear ask.
## Practise next
One skill and an offer to run more rounds.
</output_format>
