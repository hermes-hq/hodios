---
schema: 1
id: difficult-conversation-track
kind: workflow
title: Difficult conversation track
description: Prepares, rehearses and follows up a difficult conversation in gated steps, from goals and facts to an opening script, a role-play with the other side and an after-conversation note.
category: interpersonal-communication
version: 1.0.0
status: incubating
stage: [plan, build, verify, review]
role: [individual, manager, parent, founder]
requires: [none]
inputs: [text]
output: [plan, script, conversation, summary]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [crucial-conversations, rehearsal, conflict-resolution, follow-up, de-escalation]
pairs_with:
  prompts: [prepare-difficult-conversation, rehearse-difficult-conversation, give-feedback-sbi, set-boundary, apologize-effectively]
  personas: [communication-coach]
args:
  - name: situation
    description: What the conversation is about, what has happened so far, what you have already tried, and what worries you about raising it.
    type: text
    required: true
  - name: other_person
    description: Who they are to you, how they tend to react under pressure, phrases they actually use, and anything that matters to them.
    type: text
    required: true
  - name: desired_outcome
    description: "What you want to be true after the conversation, for example \"we agree how the night shifts are split\" or \"he understands I'm not lending money again and we're still on good terms\"."
    type: text
    required: true
steps:
  - {id: goals-and-facts, file: steps/01-goals-and-facts.md, stage: plan, gate: approve}
  - {id: opening-script, file: steps/02-opening-script.md, stage: build, gate: approve}
  - {id: role-play, file: steps/03-role-play.md, stage: verify, gate: approve}
  - {id: after-note, file: steps/04-after-note.md, stage: review, gate: none}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
Takes one difficult conversation from preparation to follow-up, as a communication coach would: facts and goals, an opening script, a rehearsal, and after the real conversation a note and next steps.

<situation>
{{situation}}
</situation>
<other_person>
{{other_person}}
</other_person>
<desired_outcome>
{{desired_outcome}}
</desired_outcome>

Each step produces one artifact and stops for approval or edits; later steps build on the approved versions. Step 4 happens after the real conversation.

Throughout:
- Use only what I have told you; mark assumptions and never invent what the other person said or did.
- Keep my voice, with spoken lines short enough to say under stress.
- Be honest, kindly and once, when a goal is unrealistic or my own part in the problem is visible.

{{> guardrails/crisis-safety}}

If I ask to skip approvals, confirm once, then run steps 1 and 2 in one reply; the role-play still runs one turn at a time.
