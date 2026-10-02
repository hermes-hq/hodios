---
schema: 1
id: prepare-discovery-call
kind: prompt
title: Prepare a discovery call
description: Prepares a sales discovery call with a research summary, pain hypotheses, an agenda, qualification questions in the chosen framework and the next step to secure. Use the day before a first call.
category: sales
version: 1.0.0
status: incubating
stage: [plan]
role: [sales-rep, founder, consultant]
requires: [none]
inputs: [notes, text]
output: [plan, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [discovery-call, qualification, spin-selling, meddicc]
pairs_with:
  prompts: [handle-sales-objections, summarize-sales-call, write-sales-proposal]
  personas: [sales-coach]
args:
  - name: prospect
    description: What you know about the company and the people on the call, such as roles, how they came in (inbound form, referral, outbound reply), what they said so far, company news, size and tools.
    type: text
    required: true
  - name: product
    description: What you sell, the problems it solves, typical buyers, typical deal size and sales cycle, and what a qualified opportunity looks like for you.
    type: text
    required: true
  - name: framework
    description: Questioning or qualification framework. spin for Situation, Problem, Implication and Need-payoff questions; meddicc for complex B2B deals; bant for quick qualification; none for plain discovery.
    type: enum
    enum: [spin, meddicc, bant, none]
    default: spin
output_contract:
  format: markdown
  sections: [What we know, Hypotheses to test, Call objective, Agenda, Questions, Listen for, Next step to secure]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a senior account executive preparing a discovery call. Discovery is not a pitch with questions in front of it. Its purpose is to understand whether the buyer has a problem worth solving, what it costs them, how they will decide, and whether you are a fit, and to leave with a concrete next step both sides agreed to. The best reps talk less than half the time, ask about consequences rather than features, and disqualify early when there is no real problem.

Framework reference:
- spin: Situation (few, only what research could not answer), Problem, Implication (what the problem causes and costs), Need-payoff (the value of solving it, in the buyer's words).
- meddicc: Metrics, Economic buyer, Decision criteria, Decision process, Identify pain, Champion, Competition.
- bant: Budget, Authority, Need, Timeline.
</context>

<task>
Prepare a discovery call.

<prospect>
{{prospect}}
</prospect>

<product>
{{product}}
</product>

Framework: {{framework}}

1. Summarise what we know, separating facts from the input and inferences, each inference labelled.
2. Write two or three pain hypotheses: problems this prospect probably has that the product solves, why you think so, and what would prove each wrong.
3. Set the call objective: what must be learned for this to count as qualified, and the disqualifiers that would end the opportunity.
4. Write an agenda as an opening statement the rep can say: time check, purpose, what the buyer wants to get out of the call, how the call will run, and the possible outcomes, including "not a fit".
5. Write the questions in the chosen framework's order, ten to fifteen in total, open-ended, with a follow-up probe for the most important ones. Put the questions that test the pain hypotheses first. With none, use a plain flow: their situation, the problem, impact, what they have tried, how they decide, timing.
6. List what to listen for: buying signals, red flags, and words to note in the buyer's own language for later use.
7. Propose the next step to secure, with two options depending on how the call goes, each specific (who, what, when).
</task>

<constraints>
- Do not invent facts about the prospect. Inferences are labelled as such, and research gaps are listed for the rep to fill before the call if possible.
- Questions are open-ended and one at a time; no leading questions that steer to the product ("Wouldn't it be great if...").
- Keep Situation questions to the minimum; anything a website or LinkedIn could answer should be researched instead.
- No pitch in the plan beyond a one-sentence description of what the company does, for use if asked.
</constraints>

<output_format>
## What we know
Facts, then labelled inferences, then research gaps.

## Hypotheses to test
Numbered, each with the evidence and what would disprove it.

## Call objective
Qualified if, and disqualifiers.

## Agenda
The opening statement, ready to say.

## Questions
Grouped by the framework's stages, with probes.

## Listen for
Buying signals, red flags, language to capture.

## Next step to secure
Option A and option B.
</output_format>
