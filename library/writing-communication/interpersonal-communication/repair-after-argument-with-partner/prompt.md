---
schema: 1
id: repair-after-argument-with-partner
kind: prompt
title: Repair after an argument with your partner
description: Helps a couple reconnect after a fight with a calm debrief of each person's view, a repair conversation script, each person's part and what to do differently next time.
category: interpersonal-communication
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text]
output: [script, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [couples, argument, repair, reconnection, debrief]
pairs_with:
  prompts: [apologize-effectively, call-time-out-in-heated-argument, raise-recurring-issue-with-partner]
  personas: [communication-coach]
args:
  - name: what_happened
    description: What the argument was about, what was said or done on both sides, how it ended and how things are between you now.
    type: text
    required: true
  - name: partner_view
    description: Optional. What your partner said they felt or wanted, in their words if you remember them.
    type: text
  - name: what_i_want
    description: Optional. What you hope comes out of talking about it, for example "feel close again", "stop having this fight", "understand why she was so hurt".
    type: string
output_contract:
  format: markdown
  sections: [Before you talk, How to open, The debrief, Your part, Repair, Next time, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Couples researchers (notably the Gottmans' work on "processing a regrettable incident") find that what predicts a lasting relationship is not avoiding fights but repairing after them. A good debrief happens only once both people are calm, which after a heated fight can take at least 20 minutes and often a day. It does not re-argue who was right about the facts: each person describes their own experience and feelings, the other listens and summarises until the speaker feels understood, both name what triggered them (often an older hurt), and each owns a specific part of what went wrong. Both perspectives can be valid at once. Repair ends with one small, concrete change, not a promise to never fight again. The usual failure modes are restarting the argument, one person doing all the apologising, "I'm sorry you feel that way", and treating the partner's feelings as an attack.
</context>

<task>
Help me repair things with my partner after this argument.

<what_happened>
{{what_happened}}
</what_happened>
{{#partner_view}}
<partner_view>
{{partner_view}}
</partner_view>
{{/partner_view}}
{{#what_i_want}}What I hope for: {{what_i_want}}{{/what_i_want}}

1. Safety first. If the input mentions violence, threats, being afraid of my partner, being prevented from leaving, controlling money or contact, or forced sex, do not script a debrief. Follow the safety guidance below and stop.
2. If I have not said what the argument was about or how it ended, ask up to two short questions and stop.
3. Say when to talk: not while either of us is still upset, not late at night or in front of others, and how to propose the talk ("Can we sit down tonight about Sunday? I want to understand how it was for you").
4. Write a calm opening I can say that signals I want to understand, not to win.
5. Lay out the debrief in turns: each describes what they felt and needed (not what the other did wrong); the listener summarises back before replying; each names what may have triggered them. Give example sentences for my turn drawn from my input, and suggested questions to understand my partner's turn. Do not write my partner's feelings for them; use only what I reported, marked as theirs.
6. Help me find my own specific part from what I described (tone, timing, a word, withdrawing, not listening), phrased as an "I" statement without a "but". If my account suggests I mostly did nothing wrong, still look for one honest thing I can own, and say plainly if the bigger issue looks like theirs.
7. Write the repair: an acknowledgement of their experience, my part, and one small change each of us could try, plus a gesture of reconnection that fits us.
8. Suggest one or two things to do differently next time this topic comes up.
</task>

<constraints>
- Do not take sides or judge who was right about the facts. Validate both experiences.
- Do not diagnose my partner or use labels such as "narcissist" or "gaslighting" unless I report clear evidence, and even then do not script a debrief that relies on them.
- Keep spoken lines short and natural. No therapy jargon unless I use it.
- If the same fight keeps coming back, or there is contempt, constant criticism or one partner shutting down for days, say once that a couples counsellor can help, without making it the whole answer.
{{> guardrails/crisis-safety}}
</constraints>

<output_format>
## Before you talk
Timing, setting and how to propose the conversation.
## How to open
The opening words.
## The debrief
Turn by turn, with example lines for me and questions for my partner.
## Your part
What I can own, in one or two sentences to say.
## Repair
The repair words and a reconnection gesture.
## Next time
One or two concrete changes.
## Notes
Anything to watch for, including when to get outside help.
</output_format>
