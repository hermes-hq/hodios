---
schema: 1
id: write-dating-app-openers
kind: prompt
title: Write dating app openers
description: Writes first messages to a dating app match that pick up a specific detail from their profile, ask an easy question and sound like you, with a follow-up if the chat stalls.
category: relationships
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text, preferences]
output: [message, ideas]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [online-dating, dating-apps, first-message, conversation-starters, opening-lines]
pairs_with:
  prompts: [write-dating-profile, plan-first-date, plan-online-dating-approach]
args:
  - name: match_profile
    description: 'What their profile says or shows, in your own words, for example "photos hiking in Scotland and holding a sourdough loaf; a prompt answer about being scared of geese". Leave out their surname and other identifying details.'
    type: text
    required: true
  - name: about_you
    description: A little about you and how you talk, for example "dry humour, also bake, hate small talk". Optional.
    type: text
  - name: goal
    description: What you are hoping for, for example "something serious", "see where it goes", "a date this week". Optional.
    type: string
output_contract:
  format: markdown
  sections: [What to pick up on, Openers, If they reply, If it stalls, Avoid]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people write first messages on dating apps. Openers that get replies are short, refer to something specific in the match's profile so they could not be pasted to anyone else, and end with a question that is easy and fun to answer. "Hey" and compliments on looks get ignored or read as low effort; long paragraphs, interview-style question lists and sexual comments put people off. Matching the other person's energy and moving towards a real meeting after a few good exchanges usually works better than weeks of chat.

<match_profile>
{{match_profile}}
</match_profile>
{{#about_you}}About the sender: {{about_you}}{{/about_you}}
{{#goal}}Hoping for: {{goal}}{{/goal}}
</context>

<task>
1. What to pick up on: list the two to four most promising hooks in the profile (a shared interest, a funny prompt answer, a place, an activity in a photo) and why each works.
2. Openers: write five openers in different styles (playful, curious, shared interest, light opinion question, one bolder option). Each under about 30 words, tied to a specific hook, ending with an easy question. Match the sender's voice if given.
3. If they reply: give two or three ways to keep the thread going (follow up on their answer, share something back) and a natural line for suggesting a meet-up or call after a few good exchanges, fitted to the goal.
4. If it stalls: one light follow-up message to send once, and the advice to let it go after that.
5. Avoid: a short list of what not to send for this profile (looks compliments, copy-paste lines, heavy topics, anything that comments on body or ethnicity).
</task>

<constraints>
- Never write sexual, negging, pushy or manipulative lines, and no pickup-artist techniques.
- Do not assume gender, orientation or who should message first.
- Use only details given; do not invent facts about the match.
- If the profile is very thin, say so and write openers around what little is there plus one genuinely open question.
- Do not encourage sharing contact details, address or workplace in early messages.
</constraints>

<output_format>
## What to pick up on
## Openers
Numbered, each message in quotes with a one-line note on the style.
## If they reply
## If it stalls
## Avoid
</output_format>
