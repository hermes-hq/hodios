---
schema: 1
id: respond-to-criticism
kind: prompt
title: Respond to criticism
description: Separates useful feedback from tone in criticism received at work or home, drafts a calm reply, and plans what to change, what to discuss and what to let go.
category: interpersonal-communication
version: 1.0.0
status: incubating
stage: [review, plan]
role: [individual, manager, writer, student]
requires: [none]
inputs: [text, message]
output: [report, message, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [receiving-feedback, criticism, emotional-regulation, defensiveness]
pairs_with:
  prompts: [respond-to-angry-email, give-feedback-sbi, apologize-effectively, set-boundary]
  personas: [communication-coach]
args:
  - name: criticism
    description: The criticism as close to word for word as you can, whether it was an email, a review comment, something said in a meeting or at home.
    type: text
    required: true
  - name: context
    description: Who said it, your relationship, what it was about, what you think is fair or unfair, how you feel, and whether a reply is expected.
    type: text
output_contract:
  format: markdown
  sections: [What was said, Signal and noise, Reply, What to do, Notes]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Criticism stings, and the sting makes two mistakes likely: dismissing the whole thing because the delivery was harsh, or accepting all of it, including the unfair parts, to make the discomfort stop. A more useful approach is to slow down and sort it: what specific behaviour or work is being criticised, what is the evidence, what part is tone, and what part is a matter of preference or of the critic's own situation. Then decide: what to change, what to ask about, what to push back on respectfully, and what to let go. Replying works best after the first emotional wave, briefly, with thanks for the useful part, a question where something is unclear, and a clear statement of what will change.
</context>

<task>
Help me respond to this criticism.

<criticism>
{{criticism}}
</criticism>
{{#context}}
<context_from_me>
{{context}}
</context_from_me>
{{/context}}

1. If the criticism is too fragmentary to understand what it is about, ask one or two questions and stop.
2. Restate the criticism neutrally, as specific claims about behaviour or work, stripped of tone and labels. ("You're careless" becomes "Three figures in the report were wrong.")
3. Sort each claim into: **signal** (specific, plausible, actionable), **unclear** (needs a question or an example), **disputed** (I have evidence it is wrong or unfair), **tone or noise** (insults, generalisations, the critic's stress), and **preference** (a matter of taste or style). Be honest: if a claim looks fair from what I have shared, say so kindly.
4. Draft a reply, if one is expected, for the right channel, under about 120 words: thank them for the specific useful point (only if sincere), state what I will change, ask about anything unclear, and respectfully correct anything factually wrong with evidence. If tone was unacceptable, address it once, calmly, without escalating. If no reply is needed, say so.
5. Plan what to do: the changes to make, with a first step; the question to ask and of whom; what to let go and why.
6. Suggest a way to cool down before replying if the context shows strong feelings, such as waiting until the next day for anything sent in writing.
</task>

<constraints>
- Be fair to both sides. Do not simply validate me against the critic, and do not side with the critic by default.
- No sarcasm, point scoring or passive aggression in the reply; no grovelling or over-apologising either.
- Do not diagnose the critic's motives or personality.
- If the criticism is part of ongoing bullying, harassment or discrimination at work, say once that it is reasonable to keep a record and talk to HR, a union or an advice service.
- If the context suggests the criticism has left me feeling hopeless, worthless or unsafe, acknowledge it with care and suggest talking to someone I trust or a professional; if there is any sign of self-harm, point to local emergency services or a crisis line.
</constraints>

<output_format>
## What was said
The claims, restated neutrally as a numbered list.
## Signal and noise
Table: Claim | Category | Why | Evidence that would settle it.
## Reply
The draft, or "No reply needed" with the reason.
## What to do
Change, ask, let go: bullets with first steps.
## Notes
Timing and cool-down advice, and anything to watch for.
</output_format>
