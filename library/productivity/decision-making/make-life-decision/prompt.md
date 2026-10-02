---
schema: 1
id: make-life-decision
kind: prompt
title: Make a big life decision
description: Guides a big personal decision such as moving, a career change, a relationship or education through values, real options, regret, reversibility and a cheap test to run first.
category: decision-making
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, student, job-seeker, parent]
requires: [none]
inputs: [text, preferences]
output: [report, questions, plan]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [values, regret-minimization, reversibility, crossroads, life-choices]
pairs_with:
  prompts: [run-decision-journal, run-pre-mortem, compare-options-matrix]
  personas: [thinking-partner]
args:
  - name: decision
    description: The decision you are facing and the options you see, in your own words.
    type: text
    required: true
  - name: context
    description: Optional - what matters to you, who else is affected, money and time constraints, deadlines, and what you are afraid of.
    type: text
output_contract:
  format: markdown
  sections: [The real question, What matters most, Options, Through four lenses, What to test first, Where you seem to be leaning]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Big life decisions are hard less because of missing information than because they involve values in tension, uncertainty that cannot be removed, other people, and fear of regret. A good process clarifies what the person actually values, widens the options beyond the first two, looks at the choice through several lenses, and finds a cheap way to learn more before committing. The decision always belongs to the person.

<decision>
{{decision}}
</decision>
{{#context}}
<context_given>
{{context}}
</context_given>
{{/context}}
</context>

<task>
1. If you do not know what is driving the decision, who else is affected, or the timeline, ask up to four questions in one message and stop. Ask, do not assume, about money, family situation and relationships.
2. The real question: restate the decision in one sentence, including what the person is really trying to get or avoid. If it looks like a different question underneath ("move cities" may really be "how do I feel less isolated"), name it as a possibility to confirm.
3. What matters most: draft their top three to five values or needs from what they wrote, in their words, and ask them to rank or correct them.
4. Options: list the options they named plus one to three they did not (a hybrid, a delay with a date, a smaller version, a way to get the same benefit differently). Keep "stay as is" as a real option.
5. Through four lenses, briefly for each serious option:
   - Values: how well it serves each value.
   - Regret: looking back at 80, which choice would they regret not trying? And in ten months? Ten years?
   - Reversibility: what it costs to undo, and how long the door stays open. Reversible choices deserve faster decisions.
   - Downside: the realistic worst case, whether they could live with it, and how to cushion it.
6. What to test first: one to three cheap experiments that reduce the biggest uncertainty before committing (a week working from the new city, a conversation with someone in the target job, a short course, a trial budget on the lower income).
7. Where you seem to be leaning: reflect back which way their own words point and why, as an observation they can disagree with, not a recommendation.
</task>

<constraints>
- Do not decide for them or tell them what they should value. Reflect, structure and challenge gently.
- Do not invent facts about their life, finances or other people's feelings.
- Where the choice depends on specialist facts (visa rules, tax, mortgage terms, health, custody, employment law), say which professional or official source to check, and do not give that advice yourself.
- If the decision involves feeling unsafe in a relationship, abuse, or thoughts of self-harm, stop the exercise, respond with care, and point them to local emergency services or a crisis or domestic-abuse helpline.
- Plain, warm language. No frameworks named for their own sake.
</constraints>

<output_format>
If asking questions: the questions only, numbered.
Otherwise, use the sections in order:
## The real question
## What matters most
A numbered list, marked "to confirm".
## Options
Bulleted, one line each.
## Through four lenses
A table: Option | Values fit | Regret | Reversibility | Worst case and cushion.
## What to test first
Numbered experiments, each with what it would tell them and roughly what it costs.
## Where you seem to be leaning
Two or three sentences, ending with a question back to them.
</output_format>
