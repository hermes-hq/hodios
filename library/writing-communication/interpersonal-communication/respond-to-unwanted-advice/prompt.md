---
schema: 1
id: respond-to-unwanted-advice
kind: prompt
title: Respond to unwanted advice or comments
description: Gives graceful ways to respond to unwanted advice or comments from relatives, friends or strangers about parenting, weight, career or relationships, from a light deflection to a firm boundary.
category: interpersonal-communication
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [script]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: small
reasoning: off
level: beginner
tags: [unsolicited-advice, family-comments, body-comments, parenting-advice, deflection, boundaries]
pairs_with:
  prompts: [set-boundary, navigate-family-gathering-tension, practice-assertive-responses]
  personas: [communication-coach]
args:
  - name: comment
    description: What they said, as close to their words as you remember, and how often it happens - for example "You should really get her off the dummy by now", "Have you put on weight?", "When are you two having kids?".
    type: text
    required: true
  - name: person
    description: Who says it and how close you are, for example "my mother-in-law, we see her weekly", "a colleague", "a stranger at the playground", "my oldest friend".
    type: string
    required: true
  - name: desired_outcome
    description: What you want. deflect means end the topic lightly and keep the peace; boundary means make clear the topic is off-limits; discuss means have an honest conversation about it.
    type: enum
    enum: [deflect, boundary, discuss]
    default: deflect
output_contract:
  format: markdown
  sections: [Read of the situation, Responses, Recommended, If they keep going, A private word]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Unwanted advice and comments usually come from one of three places: genuine care expressed clumsily, the speaker's own anxiety or values, or a habit of commenting that nobody has ever stopped. The response that works depends on the relationship (a stranger can be brushed off; a mother-in-law you see every week needs something sustainable), what the person wants (peace, an end to the topic, or a real conversation), and how often it happens. A good response ladder goes from light (thank and pivot, humour, a vague non-answer) to neutral (a calm "we've got it covered") to firm (naming the topic as off-limits, with a consequence if needed), and has a second and third line ready for when the first does not land.

<comment>
{{comment}}
</comment>
Who: {{person}}
Wanted outcome: {{desired_outcome}}
</context>

<task>
1. Read of the situation: in two sentences, what is likely behind the comment (care, anxiety, habit, values) and what that means for how to respond, without excusing hurtful remarks.
2. Responses: a ladder of five or six lines, each short enough to say aloud, from light deflection through neutral to a firm boundary, with a note on tone and when to use each. Include at least one that works with children present when the topic involves parenting.
3. Recommended: pick the one or two lines that best fit "{{desired_outcome}}" and this relationship, and say why.
4. If they keep going: a second and third line for when the first does not work (broken record, changing the subject decisively, leaving the conversation politely), and what to do if they get upset.
5. A private word: if the comment is repeated or the relationship matters, a short script for a calmer private conversation (what to say, the request, and appreciation for the care behind it if that is true). For "discuss", make this the main script.
6. Before answering, check every line is something the person could say without escalating more than they intend.
</task>

<constraints>
- Match the line to the relationship and outcome: no cutting comebacks for someone the person wants to keep close, and no long explanations for a stranger.
- For comments about weight, bodies or eating, do not engage with the diet or body content or suggest the person explain their body; keep responses to ending the topic. If the user mentions struggling with eating or body image, acknowledge it gently and suggest support.
- For comments about fertility, pregnancy, loss or health, offer responses that protect privacy and never require the person to disclose.
- Do not tell the person the commenter is right or that they should take the advice, unless they ask what you think.
- If comments are part of a wider pattern of control, insults or intimidation, say so gently and suggest support beyond scripts.
</constraints>

<output_format>
## Read of the situation
## Responses
Table: Level (light, neutral, firm) | Say | Tone and when.
## Recommended
## If they keep going
## A private word
Script, or one line saying it is not needed for this case.
</output_format>
