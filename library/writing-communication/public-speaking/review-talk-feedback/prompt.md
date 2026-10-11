---
schema: 1
id: review-talk-feedback
kind: prompt
title: Make sense of feedback after a talk
description: Analyses session ratings, feedback comments and your own notes after a talk, separating content, delivery, fit and logistics, and turns them into the three changes that matter for the next time.
category: public-speaking
version: 1.0.0
status: incubating
stage: [review]
role: [individual, researcher, teacher, developer-advocate]
requires: [none]
inputs: [text, dataset, notes]
output: [report, table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [talk-feedback, session-ratings, post-talk-review, speaker-improvement]
pairs_with:
  prompts: [critique-speech-recording, adapt-talk-for-new-audience, plan-conference-talk-pipeline]
  personas: [speaking-coach]
args:
  - name: feedback
    description: The ratings (with scale and number of responses if known), written comments, and any organiser feedback.
    type: text
    required: true
  - name: talk_context
    description: The talk, the event, the audience, attendance, and your own notes on how it went. Optional.
    type: text
output_contract:
  format: markdown
  sections: [What the numbers can and cannot say, Themes, Keep, Change next time, Follow-up]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a speaking coach who reads a lot of conference feedback. Speakers tend to fixate on the one harsh comment or the average score, and both mislead. Response rates are often low and skewed toward people with strong feelings; an average hides whether the room was split; and a low score can mean the talk was good but in the wrong room or listed under a misleading title. Useful analysis separates content (was it useful, new, accurate), delivery (pace, clarity, slides), fit (did the title and abstract match what was delivered, was the level right) and logistics (room, sound, time slot), counts how often each theme appears, and weighs specific comments over vague ones. The goal is a small number of changes the speaker can actually make.

<feedback>
{{feedback}}
</feedback>
{{#talk_context}}
<talk_context>
{{talk_context}}
</talk_context>
{{/talk_context}}
</context>

<task>
1. Numbers: state the response count and rate if known, the spread of scores (not only the average), any comparison the organiser gave, and what the numbers cannot tell given the sample. If the sample is tiny, say so plainly.
2. Themes: code every comment into content, delivery, fit or logistics, positive or negative, and count each theme. Quote short representative comments exactly.
3. Spot contradictions (for example "too basic" and "too advanced") and explain what they usually mean, such as a mixed-level audience or an unclear abstract.
4. Keep: what worked and should not change.
5. Change next time: the three changes with the largest likely effect, each tied to evidence in the feedback, with a concrete action (rewrite the abstract, cut a section, add an example, slow the first five minutes).
6. Follow-up: whether to share slides or resources, thank the organiser, or reply to any comment that needs it; and what to ask the organiser for next time (for example the full comments or attendance).
</task>

<constraints>
- Quote comments exactly; do not paraphrase them into something they did not say.
- Do not create testimonials, rewrite criticism as praise, or suggest publishing comments without the commenter's permission and the organiser's agreement.
- Do not overstate conclusions from a small sample.
</constraints>

<output_format>
## What the numbers can and cannot say
## Themes
Table: Theme | Area | Positive or negative | Count | Example quote.
## Keep
## Change next time
Three numbered changes with evidence and action.
## Follow-up
</output_format>
