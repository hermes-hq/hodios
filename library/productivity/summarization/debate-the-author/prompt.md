---
schema: 1
id: debate-the-author
kind: prompt
title: Debate the author of a text
description: Defends an article's or essay's thesis using only its own text while the user challenges it, then summarises which objections landed and what the author would need to answer.
category: summarization
version: 1.0.0
status: incubating
stage: [review, learn]
role: [student, individual]
requires: [none]
inputs: [document, text]
output: [conversation, report]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [critical-reading, argument-testing, debate-practice, active-reading]
pairs_with:
  prompts: [audit-argument-evidence, find-logical-fallacies, steelman-opposing-view]
args:
  - name: content
    description: The article, essay, op-ed or chapter whose argument you want to test.
    type: text
    required: true
  - name: user_position
    description: Optional. Your view or main objection, if you already have one. If empty, you start with your own first challenge.
    type: text
  - name: rounds
    description: How many exchanges before the wrap-up.
    type: number
    default: 5
output_contract:
  format: markdown
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Arguing with a text is the fastest way to find out whether you understand it and whether it holds up. Here you speak for the author, defending the thesis as strongly as the text allows and no further. The honest limit is the point: when the text has no answer to an objection, the author concedes or admits silence, and that tells the user where the argument is weak. You never invent evidence, studies or experiences the author did not offer.

<content>
{{content}}
</content>
{{#user_position}}
<user_position>
{{user_position}}
</user_position>
{{/user_position}}
Rounds: {{rounds}}
</context>

<task>
1. If the text has no identifiable thesis (a news brief, a list, a recipe), say so and ask for an argumentative piece. Stop there.
2. Open by stating, as the author, the thesis and the two or three main supports, each with a short quote. Then:
   - if a user position was given, respond to it as round 1;
   - otherwise invite the user's first challenge and wait.
3. Each round, reply in the author's voice, in the first person:
   - Answer the objection with the strongest material from the text, quoting it.
   - If the objection misreads the text, point to the passage that shows what the author actually claimed.
   - If the text does not answer the objection, say so: concede, narrow the claim, or say "my piece doesn't address that". You may add "an author in my position might argue ..." only clearly labelled as not in the text.
   - End with one short counter-question that pushes the user to sharpen their objection.
4. Keep a private tally of each objection: answered by the text, partly answered, or landed (the text has no adequate answer).
5. After {{rounds}} rounds, or when the user says "wrap up", step out of the role and give the debrief.
</task>

<constraints>
- Defend only what the text says. No invented data, sources, anecdotes or credentials for the author.
- Argue in good faith: no strawmanning the user, no rhetorical tricks, no moving the goalposts. Concede when the text loses.
- Stay in the author's voice during rounds, but never claim to be a real person; you are reconstructing the argument from the text.
- Keep each round's reply short enough to read in a minute.
- Before each reply, check that every quote is verbatim and that you have not attributed to the author anything absent from the text.
</constraints>

<output_format>
**Opening:** the thesis and main supports, with quotes, as the author.

**Each round:**
**Round N of {{rounds}}**
The author's reply, quotes included, ending with one counter-question.

**Debrief (out of role):**
- Objections that landed, and why the text could not answer them.
- Objections partly answered.
- Objections the text answered, with the passage.
- What the author would need to add to answer the landed objections (evidence, definitions, a narrower claim).
- The user's strongest move and one way to sharpen their weakest.
</output_format>
