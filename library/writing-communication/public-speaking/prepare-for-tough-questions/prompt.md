---
schema: 1
id: prepare-for-tough-questions
kind: prompt
title: Prepare for tough questions
description: Anticipates the hardest questions a talk, pitch or meeting will draw from a given audience, drafts short honest answers to rehearse, and names the weak spots to fix beforehand.
category: public-speaking
version: 1.0.0
status: experimental
stage: [verify]
role: [manager, founder, executive, researcher]
requires: [none]
inputs: [text, notes, document]
output: [questions, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [q-and-a, objection-handling, rehearsal, stakeholders]
pairs_with:
  prompts: [outline-presentation, write-project-proposal, write-internal-announcement]
  personas: [speaking-coach]
args:
  - name: talk_or_topic
    description: Your talk, pitch, proposal or the points you will make, with the key facts and numbers. The more you include, the sharper the questions.
    type: text
    required: true
  - name: audience
    description: Who will ask the questions and what they care about or worry about, for example "CFO and two sceptical engineering leads" or "town hall, staff anxious about layoffs".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [The three most dangerous questions, Questions and answers, Weak spots to fix, Rehearsal drill]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Q&A is where credibility is won or lost. Speakers who prepare only for friendly questions are caught by the obvious hard one: the number that does not add up, the alternative they did not consider, the personal stake, the question about what they are not saying. Good answers are short and lead with the answer, admit what is unknown, and do not repeat a loaded question's framing. Spin is usually spotted, and it costs more trust than an honest "I don't know yet".
</context>

<task>
Prepare me for the hardest questions {{audience}} will ask about:
<talk>
{{talk_or_topic}}
</talk>

1. If the input is only a title with no claims or content, ask for the main points and numbers and stop.
2. Put yourself in the audience's position: what do they stand to gain or lose, what do they already believe, and what would make them sceptical?
3. Generate 10 to 12 questions across these types, using the audience's own likely wording: evidence challenge (where does that number come from?), cost and resources, risk and what-ifs, alternatives (why not X?), impact on them personally, credibility or motive, loaded or hostile, out of scope, and the question I am hoping nobody asks.
4. For each question write:
   - why they would ask it (one line);
   - a short answer to say aloud, at most three sentences, answer first, then the reason or proof point from my input;
   - for loaded questions, how to restate the underlying concern neutrally without repeating the loaded framing;
   - where my input does not support an answer, an honest holding answer ("I don't have that number with me; I'll send it by Friday") plus `[fact needed: …]`.
5. Identify the weak spots: gaps or contradictions in my material that these questions expose and that I should fix before the talk, not just answer.
</task>

<constraints>
- Answers must be truthful to my input. Never invent facts, data or commitments, and never suggest misleading, evasive or spin answers. If the honest answer is unfavourable, draft the honest answer and how to frame it fairly.
- Keep answers short enough to say in 20 to 30 seconds.
- Do not include easy or friendly questions unless they hide a trap.
</constraints>

<output_format>
## The three most dangerous questions
The three that would do most damage if fumbled, and why.
## Questions and answers
Grouped by type. For each: **Q:** …, *Why they ask:* …, **A:** …, plus any reframe or `[fact needed]`.
## Weak spots to fix
Bullets: what to change in the talk or gather before it.
## Rehearsal drill
A short plan: which questions to practise aloud, in what order, and how to practise the hostile ones.
</output_format>
