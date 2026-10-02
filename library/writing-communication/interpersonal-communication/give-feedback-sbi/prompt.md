---
schema: 1
id: give-feedback-sbi
kind: prompt
title: Give feedback with SBI
description: Turns a reaction into specific, kind feedback using situation, behaviour and impact, adds a clear request and an invitation to respond, and strips out judgements and assumed motives.
category: interpersonal-communication
version: 1.0.0
status: experimental
stage: [build]
role: [manager, individual, teacher, project-manager]
requires: [none]
inputs: [text]
output: [script, message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [sbi-model, constructive-criticism, recognition, one-on-one]
pairs_with:
  prompts: [prepare-difficult-conversation, rewrite-for-tone]
args:
  - name: situation
    description: What happened and how you feel about it, in your own words, even if it is blunt ("Jake keeps talking over people in meetings and it's driving me mad"). Positive feedback works too.
    type: text
    required: true
  - name: recipient
    description: Optional, who will receive it and your relationship, for example "a peer on another team", "my direct report", "my manager".
    type: string
  - name: channel
    description: How you will deliver it.
    type: enum
    enum: [in-person, written]
    default: in-person
output_contract:
  format: markdown
  sections: [Feedback, SBI breakdown, Judgements removed, Before you deliver]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The Situation-Behaviour-Impact model (from the Center for Creative Leadership) makes feedback specific and hard to argue with: when and where it happened, the observable behaviour (what a video camera would have recorded), and its impact on you, the team or the work. It fails when the "behaviour" is a judgement ("you were rude", "you're not a team player"), when the impact is a guess about motives ("you clearly don't care"), or when the feedback ends without a request or a chance for the other person to explain. The same model makes praise specific enough to be repeated.
</context>

<task>
Turn this into feedback, delivered {{channel}}{{#recipient}} to {{recipient}}{{/recipient}}:
<situation>
{{situation}}
</situation>

1. If there is no specific instance (only a general complaint like "he's always negative"), ask for one or two concrete examples with when and where, and stop.
2. Pull out the judgements, labels and assumed motives in my description. Note each one and replace it with the observable behaviour behind it. If I describe no observable behaviour behind a judgement, drop the judgement and say so.
3. Situation: when and where, specific and recent.
4. Behaviour: what they said or did, factually, with no adjectives about their character.
5. Impact: the effect on me, the team, a customer or the work, stated as my experience ("I", "we") or as a fact. No speculation about why they did it.
6. Request: the specific change I want to see (or, for positive feedback, what to keep doing). Make it something they can actually do.
7. Invitation: an open question that asks for their view, because I may be missing context.
8. Render for the channel. In person: a short opening line, then talking points, not a speech. Written: a short message, and if the feedback is critical and significant, recommend a conversation instead or in addition, because criticism lands harder in writing.
</task>

<constraints>
- Keep it to one issue. If my description contains several, pick the most important and list the others for another time.
- Do not soften the point until it disappears, and do not add a "compliment sandwich" unless the praise is real and specific.
- Respect the relationship: feedback to a manager or a peer is framed as a request or an observation, not an instruction.
- Do not invent details about the situation.
</constraints>

<output_format>
## Feedback
The words to say (in person) or the message (written).
## SBI breakdown
A table: Situation | Behaviour | Impact | Request | Invitation.
## Judgements removed
Bullets: original wording → what replaced it, or "dropped: no behaviour described". "None" if none.
## Before you deliver
Two to four tips on timing, privacy and mindset for this case, plus any other issues to save for later.
</output_format>

<examples>
Input: "Priya was rude in the client call, she basically ignored my slides."
Behaviour: "In Tuesday's call with Acme, when I reached slide 4, you moved the discussion to pricing before I'd covered the timeline."
Impact: "The client asked about the timeline again at the end, and we ran out of time to answer."
Judgement removed: "rude", "ignored my slides".
</examples>
