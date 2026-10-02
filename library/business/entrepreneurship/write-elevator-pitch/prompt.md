---
schema: 1
id: write-elevator-pitch
kind: prompt
title: Write an elevator pitch
description: Writes 10-second, 30-second and 2-minute pitches for different listeners, each with a hook, problem, solution, proof and ask. Use before networking, investor meetings or any time you pitch a project.
category: entrepreneurship
version: 1.0.0
status: incubating
stage: [build]
role: [founder, individual, sales-rep, student]
inputs: [text, notes]
output: [script, rewrite]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [elevator-pitch, one-liner, storytelling, networking, spoken-delivery]
pairs_with:
  prompts: [write-pitch-deck-outline, prepare-investor-qa, build-investor-pipeline]
  personas: [startup-mentor]
args:
  - name: business
    description: What you are pitching - the problem, who has it, what you do about it, why you, traction or proof with numbers, and what you want from listeners.
    type: text
    required: true
  - name: audiences
    description: Who you will pitch to and what each wants (for example "angel investors, potential customers at a trade fair, a possible co-founder"). Leave empty for a general listener, an investor and a customer.
    type: text
output_contract:
  format: markdown
  sections: [Core message, 10-second pitch, 30-second pitches, 2-minute pitch, Delivery notes, Gaps]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write pitches meant to be spoken, not read. A good pitch makes the listener understand the problem in one breath, believe the solution because of one concrete proof point, and know exactly what is being asked of them. Different listeners care about different things: an investor wants the size of the opportunity and traction, a customer wants their problem solved, a recruit wants the mission and the team. The facts stay the same; the order and emphasis change.
</context>

<task>
Write pitches for this:

<business>
{{business}}
</business>
{{#audiences}}
<audiences>
{{audiences}}
</audiences>
{{/audiences}}

1. Core message: one sentence that a listener could repeat to someone else afterwards. Test it: no jargon, a specific customer, a specific outcome.
2. 10-second pitch: the core message as a natural answer to "What do you do?", in at most 30 spoken words.
3. 30-second pitch for each audience (about 75 words), in this order: a hook (a striking fact from the input, a question, or a short customer moment), the problem in the listener's terms, the solution and what makes it different, one proof point (traction, a result, a credential), and a specific ask suited to that listener (a meeting, an introduction, a trial, feedback).
4. 2-minute pitch for the most important audience (about 280 words): the same arc with a short customer story, why now, the business model in a sentence, the team's edge, and the ask.
5. Delivery notes: where to pause, the one number to emphasise, how to handle the most likely follow-up question for each audience, and a shorter fallback if interrupted.
6. Gaps: proof points or facts that would make the pitch stronger and are missing.
</task>

<constraints>
- Written for speech: short sentences, contractions, words people say aloud. No buzzwords such as "revolutionary", "disruptive", "AI-powered platform" unless explained in plain words.
- Use only facts from the input. Never invent traction, customers, market sizes or awards; mark missing proof as [NEEDED: …] and list it under Gaps.
- Stay within the word counts; state each pitch's word count.
- If audiences are empty, write for a general listener, an investor and a potential customer.
</constraints>

<output_format>
## Core message
## 10-second pitch
## 30-second pitches
One subsection per audience, with the word count.
## 2-minute pitch
With the word count.
## Delivery notes
## Gaps
</output_format>

<examples>
<example>
Weak 10-second pitch: "We're an AI-driven platform revolutionising the logistics space."
Strong 10-second pitch: "We help small bakeries stop throwing away a fifth of their bread by predicting tomorrow's orders from today's sales."
</example>
</examples>
