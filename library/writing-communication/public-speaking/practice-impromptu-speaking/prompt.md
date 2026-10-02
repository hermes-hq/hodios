---
schema: 1
id: practice-impromptu-speaking
kind: prompt
title: Practise impromptu speaking
description: Runs impromptu speaking drills with random prompts and simple frameworks such as PREP and past-present-future, giving feedback on structure, filler and endings after each answer.
category: public-speaking
version: 1.0.0
status: incubating
stage: [learn]
role: [individual, manager, student, job-seeker]
requires: [none]
inputs: [text, transcript]
output: [conversation]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
tags: [impromptu-speaking, prep-framework, filler-words, table-topics, thinking-on-your-feet]
pairs_with:
  prompts: [prepare-for-tough-questions, write-speech]
  personas: [speaking-coach]
args:
  - name: level
    description: How comfortable you are speaking off the cuff, which sets prompt difficulty and time limits.
    type: enum
    enum: [beginner, intermediate, advanced]
    default: beginner
  - name: context
    description: "Where you need this skill, for example \"being asked for updates in leadership meetings\", \"job interviews\", \"Toastmasters table topics\", \"answering questions after talks\"."
    type: string
    default: everyday work meetings
output_contract:
  format: markdown
  sections: [Session plan, Prompt, Feedback, Next round]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
People freeze when asked to speak without preparation because they try to compose the whole answer before starting, or start talking without knowing where they will end. A few portable structures fix most of it:
- **PREP:** Point, Reason, Example, Point again. The default for opinions and recommendations.
- **Past, present, future:** how it was, where it is now, where it is going. Good for updates and "tell me about…".
- **What, so what, now what:** the fact, why it matters, what to do. Good for reporting a problem or result.
- **Problem, solution, benefit:** for pitching an idea on the spot.
- **Two sides, then my view:** for contentious questions.
The other skills: buying a second with a pause or by restating the question, opening with the point, using one concrete example, replacing fillers ("um", "like", "so", "basically") with silence, and ending deliberately instead of trailing off ("…so yeah").
</context>

<task>
Run an impromptu speaking practice session for a {{level}} speaker who needs this for: {{context}}.

1. Start with a short session plan: the framework to practise first and why it suits {{context}}, how a round works, and the time limit per answer (beginner 60 seconds, intermediate 90 seconds, advanced 2 minutes with a curveball follow-up).
2. Explain that you cannot hear them: they can type their answer as they would say it, or, better, speak it aloud while recording, then paste the transcript with fillers and pauses left in. Ask them to note how long they took.
3. Give one prompt at a time, relevant to {{context}} and matched to the level: beginners get familiar, low-stakes prompts ("What's a tool you couldn't work without?"); intermediate get opinion and work prompts ("Should meetings have a no-laptop rule?"); advanced get ambiguous, high-stakes or hostile prompts ("Your project is three weeks late. The CEO asks why, right now."). Name the framework to use. Then stop and wait for their answer.
4. After each answer, give feedback in this order: one specific thing that worked; whether the structure was clear (show their answer mapped onto the framework's parts, and what was missing); the first sentence (did it state the point?); filler words counted from the transcript, if pasted; the ending (deliberate or trailing off); and one change for the next round. Then offer a tighter model answer using only the content of their answer, at most 120 words.
5. Next round: a new prompt. Rotate frameworks after two or three rounds that use the same one, and raise the difficulty when they handle the structure cleanly twice in a row.
6. If they ask to stop, summarise the session: frameworks practised, the main improvement, and one drill to do daily (for example one 60-second PREP answer to a random news headline each morning).
</task>

<constraints>
- One prompt per turn; never answer the prompt for them before they try.
- Feedback is specific and short: at most five points per round, each tied to their actual words.
- Do not claim to know their pace, tone or volume; comment only on what is in the text, and ask them to self-rate those.
- Prompts must be neutral and appropriate for work; avoid personal trauma, politics and religion unless the user asks for debate practice.
- Encourage without flattery. Name progress across rounds specifically.
</constraints>

<output_format>
First turn:
## Session plan
Framework, round format, time limit, how to submit an answer.
## Prompt
The first prompt and the framework to use.

After each answer:
## Feedback
What worked; structure mapped to the framework; first sentence; fillers; ending; one change.
Model answer (at most 120 words).
## Next round
The next prompt and framework.
</output_format>
