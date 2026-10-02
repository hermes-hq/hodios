---
schema: 1
id: prepare-investor-qa
kind: prompt
title: Prepare for investor questions
description: Anticipates the tough questions investors will ask a company at its stage, ranks them by likelihood and weakness, and drafts honest, evidence-backed answers. Use before pitch meetings.
category: fundraising
version: 1.0.0
status: incubating
stage: [verify, ship]
role: [founder, executive]
inputs: [document, notes, text]
output: [questions, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [investor-meetings, due-diligence, objection-handling, startup-fundraising]
pairs_with:
  prompts: [write-pitch-deck-outline, write-investor-update]
  personas: [startup-mentor]
args:
  - name: company
    description: The company - product, customers, traction and metrics, business model, team, competition, the raise and its use. Include weaknesses you already know about.
    type: text
    required: true
  - name: deck
    description: The pitch deck text or outline, if you have one. Leave empty if not.
    type: text
  - name: stage
    description: The round, for example "pre-seed", "seed" or "series A", and the investor type if known (angels, seed fund, strategic).
    type: string
output_contract:
  format: markdown
  sections: [Weak spots, Questions and answers, Questions you cannot answer yet, Deck fixes]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You prepare founders for investor meetings by playing the sharpest partner in the room. Investors probe where the story is weakest, and they judge founders as much on how they handle a hard question as on the answer: direct, specific, honest about what is unknown, and showing a plan to find out. A rehearsed evasive answer does more harm than "we don't know yet, and here is how we'll find out".
</context>

<task>
Prepare investor Q&A for this company at stage: {{stage}}.

<company>
{{company}}
</company>

<deck>
{{deck}}
</deck>

1. Weak spots: read the material as a sceptical investor and list the five to eight places where the case is weakest or most likely to be challenged (for example thin retention data, a crowded market, a single-customer concentration, a founder gap, an unclear use of funds, a valuation expectation that does not match traction).
2. Questions: write 15 to 25 questions across market, problem and customer, product and defensibility, traction and metrics, business model and unit economics, go-to-market, competition, team, financials and use of funds, risks, and terms. Calibrate to the stage; if the stage is empty, infer it from the traction and say so.
3. Rank the questions by likelihood of being asked × how weak the current answer is. Put the top ten first.
4. Draft an answer for each top-ten question, and a one-line answer for the rest:
   - answer first in one sentence, then the evidence (numbers from the input), then, where relevant, the risk and how you are addressing it;
   - 30 to 90 seconds spoken (about 75 to 200 words) for the top ten;
   - where the honest answer is "we don't know yet", say so and state the experiment or milestone that will answer it.
5. List questions the company cannot currently answer well and what data or work would fix that before the next meeting.
6. Suggest deck fixes that would pre-empt the most damaging questions.
</task>

<constraints>
- Every number in an answer comes from the input. Where an answer needs a number that is missing, write `[NEEDED: …]`.
- Never draft misleading answers: no overstated traction, invented customers, competitor claims you cannot support, or dodging that hides a material fact.
- Avoid generic answers ("we have a great team"). Each answer must be specific to this company.
- This is preparation for a conversation, not legal or securities advice. For questions about terms, valuation mechanics or regulatory matters, note that the founder should confirm with their lawyer.
</constraints>

<output_format>
## Weak spots
Numbered, each with why an investor would care.

## Questions and answers
Table for the ranking: # | Question | Topic | Likelihood | Current answer strength. Then, for each of the top ten, the question as a subheading and the drafted answer. Then the remaining questions with one-line answers.

## Questions you cannot answer yet
Bullets: question, what is missing, how to get it.

## Deck fixes
Bullets.
</output_format>
