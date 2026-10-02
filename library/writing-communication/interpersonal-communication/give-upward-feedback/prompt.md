---
schema: 1
id: give-upward-feedback
kind: prompt
title: Give feedback to your manager
description: Prepares feedback to a manager or senior colleague with what to say, framing around shared goals, when and where to raise it, and how to respond if they get defensive.
category: interpersonal-communication
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, software-engineer, product-manager, manager]
requires: [none]
inputs: [text]
output: [plan, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [upward-feedback, managing-up, sbi, power-dynamics]
pairs_with:
  prompts: [give-feedback-sbi, prepare-difficult-conversation, write-escalation-email]
  personas: [communication-coach]
args:
  - name: issue
    description: What the manager or senior colleague does, specific examples with dates if you have them, how it affects you, the team or the work, and what you would like instead.
    type: text
    required: true
  - name: relationship
    description: Who they are to you, how long you have worked together, how they usually take feedback, and whether they have asked for it.
    type: text
output_contract:
  format: markdown
  sections: [Is this the right move, The message, When and where, What to say, If they get defensive, After, Risks]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Feedback up the hierarchy is riskier than feedback down, because the other person controls your work, your reviews and sometimes your job. It goes best when it is framed around a goal the manager already cares about (the team hitting its deadline, a client relationship, their own reputation), is specific about one behaviour and its effect, comes with a suggestion rather than a complaint, is raised privately at a calm moment, and is offered as information rather than judgement ("Something that would help me do this better…"). Asking permission first ("Can I share an observation about the planning meetings?") gives the manager control and lowers defensiveness. Some issues are not feedback matters: harassment, discrimination, safety and ethics breaches belong with HR, a skip-level manager or a formal channel.
</context>

<task>
Help me give this feedback.

<issue>
{{issue}}
</issue>
{{#relationship}}
<relationship>
{{relationship}}
</relationship>
{{/relationship}}

1. Check whether this is a feedback conversation. If the issue involves harassment, discrimination, safety, retaliation or a legal or ethical breach, say that a formal channel (HR, a skip-level manager, an ethics line, a union) is the better route, explain why briefly, and give only what helps with that route. If the issue is too vague to name a behaviour, ask up to two questions and stop.
2. Narrow it to one behaviour and its effect. If there are several issues, pick the one with the most impact and the best chance of change, and say why the others can wait.
3. Find the shared goal: what the manager cares about that this behaviour is getting in the way of.
4. Write the core message in situation, behaviour, impact form, plus a specific suggestion or request, under about 80 words, without judgements of character or assumed motives.
5. Recommend when and where: private, not right after a tense moment, ideally in a regular one-to-one, or by asking for 15 minutes. Advise against raising it in writing first unless the relationship is mostly remote, and if so, give a short message asking to talk.
6. Write the conversation: a permission-asking opener, the core message, an open question inviting their view, and a closing that agrees a next step.
7. Prepare for defensiveness: the four most likely reactions for this relationship (justifying, minimising, counter-criticism, pulling rank, going quiet), with a calm reply to each that acknowledges, does not argue, and returns to the shared goal.
8. Say how to follow up and how to recognise change when it happens.
</task>

<constraints>
- Account for the power difference honestly: name the realistic risks and how to reduce them, without catastrophising or telling me not to speak up.
- Use only facts from the issue; do not add examples. Mark where a concrete example would help as `[example: …]`.
- No flattery sandwiches, sarcasm, ultimatums or threats to go over their head.
- Keep every line short enough to say naturally in a meeting.
</constraints>

<output_format>
## Is this the right move
One or two sentences: feedback conversation or formal channel, and why.
## The message
Shared goal, then the SBI message and the request.
## When and where
Timing, setting and medium.
## What to say
Opener, core message, question, close, as lines I can say.
## If they get defensive
Table: If they… | You can say…
## After
Follow-up and how to notice change.
## Risks
Realistic risks and how to reduce them.
</output_format>
