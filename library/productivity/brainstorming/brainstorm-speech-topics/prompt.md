---
schema: 1
id: brainstorm-speech-topics
kind: prompt
title: Brainstorm speech topics
description: Generates speech or presentation topics for a class, club or work slot, fitted to the speech type, audience, time limit and your experience, and sharpens the best into a one-sentence message.
category: brainstorming
version: 1.0.0
status: incubating
stage: [discover]
role: [student, individual, teacher]
requires: [none]
inputs: [text, preferences]
output: [ideas, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [speech-topics, presentation-topics, persuasive-speech, informative-speech, toastmasters]
pairs_with:
  prompts: [write-speech, develop-idea-talk, craft-personal-story, practice-impromptu-speaking]
args:
  - name: assignment
    description: The speech type and setting, for example "persuasive speech, 5 minutes, college communications class" or "icebreaker speech at my speaking club" or "10-minute lunch-and-learn at work".
    type: text
    required: true
  - name: about_you
    description: Your experiences, jobs, hobbies, opinions and things friends ask you about. The best topics often come from here.
    type: text
    required: true
  - name: rules
    description: Optional - topics banned or required by the brief, and anything you do not want to talk about.
    type: text
output_contract:
  format: markdown
  sections: [Topics, Best three, Recommendation]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Speakers pick weak topics in predictable ways: something huge ("climate change") for a five-minute slot, something they have no personal link to so the talk is a recited article, a persuasive topic where the audience already agrees, or a topic their audience cannot relate to. Strong topics sit where the speaker's own experience meets something the audience cares about, and can be said in one sentence. The type changes what works: informative talks need a surprising or useful angle on something familiar; persuasive talks need a real disagreement and a specific ask; personal or inspirational talks need one story and a lesson, not a life story; work talks need something colleagues can use. Five minutes allows one main idea with two or three supports. Topics that require revealing private information or that could inflame a classroom need judgement about setting.

Assignment: {{assignment}}
About the speaker: {{about_you}}
{{#rules}}
Rules and limits: {{rules}}
{{/rules}}
</context>

<task>
1. If the speech type, time or audience is missing, ask up to two questions and stop.
2. Generate 12 to 15 topics fitted to the type, mostly drawn from the speaker's own experience, with a few broader ones.
3. For each, give the one-sentence message, why this audience would care, how well it fits the time (too big, right, thin), and for persuasive topics, the specific ask and whether the audience is likely to disagree.
4. Pick the best three and for each give: a working title, the one-sentence message, two or three main points, an opening idea (a story, question or fact to look up), and the main risk.
5. Recommend one and say why.
</task>

<constraints>
- Do not write the full speech; stop at topics, messages and outlines.
- Do not state statistics or facts as true; suggest what to look up and where kinds of sources might be found.
- Respect the brief's rules and topics the speaker wants to avoid.
- Flag topics that may be sensitive for this audience, and suggest how to handle them respectfully or choose another.
</constraints>

<output_format>
## Topics
Table: Topic | Message | Why they care | Fit for time | Ask (persuasive only).
## Best three
## Recommendation
</output_format>
