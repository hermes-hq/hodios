---
schema: 1
id: build-executive-presence
kind: prompt
title: Build executive presence
description: Builds a practical plan to come across as credible with senior leaders - short, decision-ready updates, composure under tough questions and visible judgement - from feedback you have had.
category: career-growth
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, manager, software-engineer, product-manager]
requires: [none]
inputs: [text, notes]
output: [plan, checklist, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [leadership-presence, senior-stakeholders, credibility, communication-skills]
pairs_with:
  prompts: [prepare-promotion-case, increase-work-visibility, prepare-skip-level-meeting]
  personas: [career-coach]
args:
  - name: feedback
    description: The feedback you have had (for example "needs more presence", "too much detail", "not strategic enough"), from whom, and in what situations.
    type: text
    required: true
  - name: situations
    description: The senior settings you face (leadership meetings, board updates, steering groups, all-hands), how often, and an example of a recent update or meeting that went badly or well.
    type: text
output_contract:
  format: markdown
  sections: [What the feedback means, The behaviours to build, Rewrite a real update, Handling tough questions, Practice plan, Check progress]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people who have been told they need "executive presence". The phrase is vague and can hide bias, so the first job is to translate it into observable behaviours. In practice senior leaders tend to judge credibility on a few things: getting to the point (answer first, then the reasoning), framing work in terms of the business outcome and the decision needed, showing judgement (a recommendation and its trade-offs, not a list of options), staying calm and concise under challenge, saying "I don't know, I'll come back by Friday" without flustering, and disagreeing respectfully in the room. Most of this is learnable through preparation and practice, not personality change. It is not about looks, accent, volume or copying someone else's style.

<feedback>
{{feedback}}
</feedback>
{{#situations}}
<situations>
{{situations}}
</situations>
{{/situations}}
</context>

<task>
1. What the feedback means: translate each piece of feedback into two or three likely observable behaviours, and list questions to ask the person who gave it to confirm which ones they meant ("Can you give me an example of a moment where I could have shown more presence?"). If the feedback refers to appearance, accent or other personal traits, note that this is not a fair standard and suggest how to ask for specifics.
2. The behaviours to build: three to five behaviours that address the feedback, each with what it looks like in a meeting and a simple rule of thumb (for example "answer, reason, ask" for updates).
3. Rewrite a real update: if they gave a recent update or example, rewrite it in a senior-ready form: headline and decision needed first, two or three supporting points, risks and the recommendation, in under a minute of speaking. If none was given, provide a template and ask for one.
4. Handling tough questions: a short method (pause, clarify, answer briefly, state what you do not know and when you will follow up) and sample answers to "why should we believe this number?", "what would you do?", and a question they cannot answer.
5. Practice plan: four to six weeks of specific practice: preparing headlines before meetings, rehearsing out loud, recording and reviewing, asking a trusted senior for feedback after one meeting each week.
6. Check progress: signals that perception is shifting and when to ask for feedback again.
</task>

<constraints>
- Translate vague feedback into behaviours; do not reinforce standards based on gender, race, accent, age, body or clothing.
- Do not invent what the feedback-giver meant; label interpretations and give questions to confirm.
- Keep advice concrete and practicable in real meetings.
</constraints>

<output_format>
## What the feedback means
Table: Feedback | Likely behaviours | Question to confirm.
## The behaviours to build
## Rewrite a real update
## Handling tough questions
## Practice plan
Table: Week | Focus | Practice.
## Check progress
</output_format>
