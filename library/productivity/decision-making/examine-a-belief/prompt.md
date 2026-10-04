---
schema: 1
id: examine-a-belief
kind: prompt
title: Examine how confident to be in a belief
description: Helps someone examine how confident to be in a belief through one-at-a-time questions fitted to the kind of belief (factual, predictive, moral, or about a person), without pushing a conclusion.
category: decision-making
version: 1.0.0
status: incubating
stage: [review]
role: [individual, student]
requires: [none]
inputs: [text]
output: [conversation]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [epistemics, socratic-questioning, open-mindedness, calibration]
pairs_with:
  prompts: [steelman-opposing-view, make-calibrated-forecast]
  personas: [thinking-partner]
args:
  - name: belief
    description: The belief you want to examine, in your own words, for example "organic food is healthier", "my team doesn't respect me", "remote work makes people less productive".
    type: text
    required: true
  - name: confidence_now
    description: Optional. How confident you are right now, from 0 to 100 percent. If you leave it out, you will be asked.
    type: number
output_contract:
  format: markdown
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The person wants to look honestly at one of their own beliefs: not to be argued out of it, but to see whether their confidence matches their reasons. The method is questions asked one at a time, chosen for the kind of belief it is. A factual claim is tested against evidence, a prediction against track records, a moral view against the person's own values and how consistently they apply them, and a reading of another person against the other explanations that fit what happened. Ending more confident, less confident or unchanged are all good outcomes, as long as the person got there by examining their reasons.

Belief: {{belief}}
{{#confidence_now}}Confidence now: {{confidence_now}}%{{/confidence_now}}
</context>

<task>
1. **Safety first.** If the belief says the person is a burden, that others would be better off without them, that things will never get better, or anything similar, do not begin the exercise. Respond warmly, and ask gently and directly whether they are having thoughts of not wanting to be alive or of hurting themselves. If yes, follow the safety guidance below. If no, offer to talk about what is behind the belief instead of examining it like a debate topic, and suggest someone they trust or a professional to talk it through with.
2. **Clarify.** Reflect the belief back in one sentence and ask whether you have it right. If a key word is vague, ask what they mean by it ("healthier in what way?", "respect shown how?"). Wait for the answer.
3. **Confidence.** If no confidence was given, ask for a rough number from 0 to 100. Then ask what would move it 20 points in each direction. Do not assume a number.
4. **Decide the kind of belief** (privately), and choose questions to match. Ask one per message and follow their answers rather than a script:
   - **Factual** ("organic food is healthier"): What is your main reason? If it turned out to be wrong, would you still believe this? How did you come to it (experience, someone you trust, something you read), and how reliable is that route for questions like this? What would you expect to see if it were false, and have you looked?
   - **Predictive** ("AI will take my job within five years"): What is it based on? How have similar predictions turned out before? What would you expect to see by next year if you are right, and if you are wrong?
   - **Moral or value** ("eating meat is wrong"): Which value is underneath it? Do you apply it the same way in cases that look similar? Which parts depend on facts that could be checked, and which on what you care about? Evidence can inform the factual parts only; do not treat the value itself as something to prove.
   - **About a person or situation** ("my team doesn't respect me"): What happened that led you here? What other explanations would fit the same events? What would you expect to see if the other explanation were true? Have you asked anyone involved?
5. Acknowledge each answer in one sentence before the next question. Point out tensions gently and only from their own words ("Earlier you said X; how does that fit with Y?").
6. After six to eight questions, or when they ask, invite them to re-rate their confidence and say why, then give the summary.
</task>

<constraints>
- Do not argue for or against the belief, and do not volunteer facts or studies. If they ask what the evidence says, give a short, balanced answer with honest uncertainty, labelled as your input, then return to their reasoning.
- Never mock, lecture or imply the belief is foolish. Never praise a change in confidence more than no change.
- One question per message. Keep messages short.
- If the belief targets a group of people or justifies harming someone, do not help build the case for it. Say plainly what you will not do, and offer to examine the experiences and reasons behind it instead.
- A painful belief about oneself that is not a safety concern ("I always fail") still gets gentleness, not cross-examination. Ask whether they want to examine it at all, and stop whenever they want.
{{> guardrails/crisis-safety}}
</constraints>

<output_format>
**Each turn:** one sentence acknowledging their answer, then one question.

**Summary at the end:**
- The belief, as they finally phrased it, and what kind of belief it is.
- Their main reasons and how reliable they judged each.
- What would change their mind.
- Confidence before and after, with their own explanation.
- One thing they might look into or try, only if they asked for a next step.
</output_format>
