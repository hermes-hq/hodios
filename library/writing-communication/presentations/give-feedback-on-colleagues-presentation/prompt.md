---
schema: 1
id: give-feedback-on-colleagues-presentation
kind: prompt
title: Give feedback on a colleague's presentation
description: Turns your notes from watching a colleague present into useful feedback on both the deck and the delivery, prioritised to the few changes that matter and kind enough to be heard.
category: presentations
version: 1.0.0
status: incubating
stage: [review]
role: [manager, engineering-manager, teacher, individual]
requires: [none]
inputs: [notes, text]
output: [message, report]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [presentation-feedback, delivery, coaching, peer-feedback, specific-feedback]
pairs_with:
  prompts: [critique-slide-deck, review-talk-feedback, recover-after-presentation-went-badly]
  personas: [presentation-designer]
args:
  - name: observations
    description: Your notes from watching, on the slides and the delivery, plus what the presentation was for and how it landed with the audience.
    type: text
    required: true
  - name: relationship
    description: Your relationship with the presenter (manager, peer, mentor, teacher) and what they asked for, if anything.
    type: text
    required: true
  - name: channel
    description: How you will give the feedback.
    type: enum
    enum: [in-person, written, unsure]
    default: unsure
output_contract:
  format: markdown
  sections: [The few things that matter, Feedback, How to deliver it]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people give feedback after watching a colleague present. Typical feedback is either vague praise ("great job!") or a long list of every small thing, and neither changes the next presentation. Useful presentation feedback is specific and observable ("you said 'basically' at the start of most answers", "slide 4's chart had no title, so people asked what the bars were"), tied to the effect on the audience and the goal, limited to two or three priorities, and includes what to keep doing, stated as concretely as the criticism. It distinguishes the deck (storyline, clarity, evidence) from the delivery (pace, voice, eye contact, handling questions) because the fixes differ. It respects what the presenter asked for, and nervous habits are mentioned only if they hurt the message. Feedback given soon, in private, with a question first ("how did you think it went?") lands better.

Observations:
{{observations}}

Relationship and request: {{relationship}}
Channel: {{channel}}
</context>

<task>
1. Sort the observations into deck and delivery, and into strengths and improvements.
2. Pick the two or three changes that would most improve the next presentation against its goal, and say why each matters for the audience.
3. Write the feedback: what worked (specific), the priority changes (observable behaviour, effect, a concrete suggestion), and an offer of help or a next step. Fit the length and tone to the relationship and channel.
4. Note what to leave out this time and why.
5. Give advice on delivering it: timing, an opening question, and how to respond if the presenter gets defensive.
</task>

<constraints>
- Only use what is in the observations; do not invent moments.
- Describe behaviour and its effect, not personality ("you rushed the last section", not "you're disorganised").
- No comments on appearance, accent or personal characteristics unless they affect understanding and the person asked; then handle with care.
- Keep the written version under about 200 words.
</constraints>

<output_format>
## The few things that matter
Two or three priorities with why.

## Feedback
The message or talking points, ready to use.

## How to deliver it
Bullets, including what was left out.
</output_format>
