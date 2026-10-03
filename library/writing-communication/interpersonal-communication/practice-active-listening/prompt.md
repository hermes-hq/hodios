---
schema: 1
id: practice-active-listening
kind: prompt
title: Practise active listening
description: Role-plays someone sharing a problem so the user can practise reflective listening, then scores paraphrasing, questions, interruptions and advice-giving with examples.
category: interpersonal-communication
version: 1.0.1
status: incubating
stage: [learn]
role: [manager, individual, parent, support-agent]
requires: [none]
inputs: [text]
output: [conversation, report]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
tags: [active-listening, reflective-listening, listening-drill, empathy, open-questions]
pairs_with:
  prompts: [rehearse-difficult-conversation, give-feedback-sbi, practice-assertive-responses]
  personas: [communication-coach]
args:
  - name: scenario
    description: "Optional, who the speaker is and what they want to talk about, for example \"a team member overwhelmed by a new project\" or \"a friend whose parent is ill\". Leave it out for a realistic everyday scenario."
    type: text
  - name: difficulty
    description: easy speaks openly and clearly; medium is vague at first and needs good questions; hard deflects, changes topic and tempts you to give advice.
    type: enum
    enum: [easy, medium, hard]
    default: medium
  - name: rounds
    description: How many of your replies before the debrief, between 3 and 12.
    type: number
    default: 6
output_contract:
  format: markdown
  sections: [Scores, What you did well, One thing to practise next, Try again]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Keeps the number of rounds between 3 and 12 and says so when it adjusts it."}
---
<context>
Active listening is a skill you can practise: paraphrasing what you heard, reflecting the feeling behind it, asking open questions that let the speaker go further, summarising, and holding back advice until the speaker has been understood or asks for it. The common habits that block it are jumping to solutions, steering the conversation to your own story, closed or leading questions, minimising ("at least…") and changing the subject when it gets uncomfortable. A realistic speaker who does not lay everything out at once is the best practice partner, because it rewards good questions.
</context>

<task>
Run an active-listening practice. I listen; you play the person sharing a problem.
{{#scenario}}
<scenario>
{{scenario}}
</scenario>
{{/scenario}}
Difficulty: {{difficulty}}. Debrief after {{rounds}} of my replies; if that number is below 3 or above 12, use 3 or 12 and say so in the setup.

Setup (your first message):
1. If no scenario was given, choose a realistic everyday one (work stress, a friend's dilemma, a family worry) that suits the difficulty. Never choose suicide, self-harm, abuse or a medical emergency.
2. In two or three lines out of character, say who you are playing, the setting, and how I can pause ("pause" for a hint, "stop" for an early debrief). Then give the speaker's opening line in character, and stop.

Each round:
3. Reply in character only, one turn at a time, in two to five sentences. Keep the speaker consistent: a real problem with a layer underneath that comes out only when I listen well.
4. React realistically to how I listen:
   - good paraphrasing, reflection and open questions: open up more, reveal the underlying concern;
   - advice too early, my own stories, minimising, or closed questions: become shorter, politely resist, or go along without opening up;
   - on hard: deflect, change topic, ask "what would you do?" to tempt advice, and get mildly frustrated if misunderstood.
5. Track what I do, silently, for the debrief.
6. If I type "pause", step out of character for one line with a hint, then continue.

Debrief (after {{rounds}} replies or when I type "stop"):
7. Step out of character. Score me from 1 to 5 on: paraphrasing and reflecting feelings, open questions, staying with the speaker (not switching to my own story or a new topic), holding back advice, and summarising. Quote my actual words as evidence and give a stronger version for each.
8. Reveal what the speaker's underlying concern was and whether I reached it.
</task>

<constraints>
- Stay in character during rounds; no coaching unless I ask with "pause".
- Do not make the speaker a caricature or the scenario melodramatic.
- Scores must be backed by quotes from my replies. Be honest; a 5 is earned.
- If my own messages suggest that I, not the character, am struggling or in danger, stop the role-play and respond to me directly, following the safety guidance below.
{{> guardrails/crisis-safety}}
</constraints>

<output_format>
During the role-play: only the speaker's lines, after the short setup.

At the debrief:
## Scores
A table: Skill | Score (1-5) | What you said | A stronger version.
## What you did well
Two or three bullets with quotes.
## One thing to practise next
One habit, with a sentence stem to use next time.
## Try again
The underlying concern, whether you reached it, and a suggested variation for the next practice.
</output_format>
