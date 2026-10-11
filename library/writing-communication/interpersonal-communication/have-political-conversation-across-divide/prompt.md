---
schema: 1
id: have-political-conversation-across-divide
kind: prompt
title: Have a political conversation across a divide
description: Prepares you for a respectful conversation about politics or values with a relative, friend or colleague who disagrees, aiming to understand each other rather than win.
category: interpersonal-communication
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [script, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [disagreement, politics, values, curiosity, family-dynamics]
pairs_with:
  prompts: [navigate-family-gathering-tension, practice-active-listening, plan-persuasive-argument]
  personas: [communication-coach]
args:
  - name: topic
    description: The issue, for example immigration, a recent election, climate policy, vaccines, gender, a war.
    type: string
    required: true
  - name: situation
    description: Who the person is, what each of you believes as far as you know, how past conversations went, and what you hope for (understanding, keeping the relationship, changing a specific view).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Your goal, Their view at its best, Opening the conversation, Questions to ask, When it heats up, When to stop]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Political arguments rarely change minds in the moment, and fact-trading tends to harden positions, because political views are tied to identity, values and the people we trust. What research on persuasion and dialogue (deep canvassing, motivational interviewing, moral reframing) suggests works better: a clear and modest goal, asking genuine questions about how the other person came to their view and what experiences shape it, listening until they feel heard, sharing your own story rather than statistics, finding the shared value underneath (safety, fairness, freedom, family), and agreeing where you honestly can. People are more open after they feel understood. Some conversations are not worth having: when someone is drunk, in front of an audience, or when the "debate" is about whether you or someone you love deserves rights or safety.
</context>

<task>
Prepare me for a conversation about {{topic}}.

<situation>
{{situation}}
</situation>

1. If it is unclear who the person is or what I hope for, ask up to two short questions and stop.
2. Help me set a realistic goal (understand them, be understood, keep the relationship, find one point of agreement, shift one specific view) and say honestly if my goal is unlikely in one talk.
3. Write their view at its strongest and most sympathetic, in terms they would recognise, including the values and fears behind it. Do the same for my view in one or two lines, and name the values we share.
4. Write an opener that asks permission and signals curiosity, not attack, and suggest a good time and place.
5. Give six to eight open questions that invite their reasoning and experiences, and how to reflect back what I hear.
6. Give lines for when it heats up: slowing down, naming common ground, admitting uncertainty, sharing a personal story, and agreeing to disagree.
7. Say when to stop or decline the conversation, and a warm way to end it that protects the relationship.
</task>

<constraints>
- Stay even-handed: do not tell me which side is right, and steelman their view whatever it is.
- Do not invent statistics or quotes. If facts matter, say what kind of source both of us might trust, and note that facts alone rarely persuade.
- If the conversation would put my safety, identity or wellbeing at risk, say it is fine not to have it and suggest a boundary instead.
- Keep lines short and in plain speech, not debate language.
</constraints>

<output_format>
## Your goal
One or two sentences.
## Their view at its best
A short paragraph, plus shared values.
## Opening the conversation
The words, with timing and setting.
## Questions to ask
Numbered list.
## When it heats up
Table: If this happens… | You can say…
## When to stop
Signs, and a warm way to close.
</output_format>
