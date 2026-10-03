---
schema: 1
id: loosen-perfectionism
kind: prompt
title: Loosen perfectionism
description: Helps loosen perfectionism in one area of life with a cost-benefit look, good-enough standards, behavioural experiments to test predictions and kinder self-talk.
category: mental-health
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, student]
subject: [psychology]
requires: [none]
inputs: [text]
output: [plan, table]
risk: read-only
advice_risk: [mental-health]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [perfectionism, behavioural-experiments, good-enough, procrastination, self-criticism]
pairs_with:
  prompts: [reframe-negative-thoughts, practice-self-compassion, build-self-confidence]
  personas: [supportive-listener]
args:
  - name: area
    description: The part of life where perfectionism costs you most, for example "work reports", "my PhD thesis", "keeping the house", "parenting", "my art", "replying to emails".
    type: text
    required: true
  - name: examples
    description: Recent examples of what you did and what it cost, for example "rewrote a two-line email for 40 minutes", "missed the deadline because it wasn't good enough", "checked the oven five times". Optional.
    type: text
output_contract:
  format: markdown
  sections: [What perfectionism is doing here, Costs and payoffs, Good-enough standards, Behavioural experiments, Self-talk, This week, When to get more help]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people loosen perfectionism, using methods from CBT for clinical perfectionism: perfectionism is not high standards, but self-worth that depends on meeting rigid standards, with harsh self-criticism when they are missed. It is kept going by behaviours (over-checking, redoing, procrastinating, avoiding, over-preparing) that prevent learning that "good enough" is usually fine. The way out is to name the standards, weigh their real costs, set explicit good-enough standards, and test predictions with small behavioural experiments, while practising a kinder inner voice.

Area: {{area}}
{{#examples}}
<examples>
{{examples}}
</examples>
{{/examples}}
</context>

<task>
1. What perfectionism is doing here: from their examples, name the rigid rules (for example "every email must be flawless", "if it isn't excellent it's a failure"), the behaviours that keep them going (checking, redoing, procrastinating, avoiding), and the self-criticism that follows. If they gave no examples, ask for one recent example and offer typical patterns for the area, marked as examples.
2. Costs and payoffs: an honest table of what perfectionism costs them (time, sleep, deadlines, relationships, enjoyment) and what it seems to give (praise, avoiding criticism, feeling in control). Acknowledge the payoffs so the change feels safe.
3. Good-enough standards: for three or four tasks in this area, write a specific standard, such as a time limit, a number of drafts or checks, or a definition of done, that is clearly lower than now but still acceptable.
4. Behavioural experiments: design three experiments, from easier to harder. For each: what they will do differently (send after one read-through, leave one typo, stop at the time limit, ask for feedback earlier), the prediction and how strongly they believe it (0 to 100 percent), how they will check what actually happened, and what they learned.
5. Self-talk: rewrite two or three of their self-critical lines as what a fair, supportive coach would say. Keep them believable, not falsely positive.
6. This week: two concrete actions and a short review question.
7. When to get more help: if perfectionism comes with low mood, an eating problem, compulsive checking that takes more than an hour a day or feels driven by intrusive fears, or stops them working or studying, suggest a doctor or a CBT therapist.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Do not tell them to "just lower your standards"; make each standard specific and tested.
- Experiments must carry real but small stakes; never suggest anything that could seriously harm their job, studies, health or safety (no skipping safety checks, medicines or legal deadlines).
- If checking sounds driven by fears of harm or contamination rather than quality, say this can be a different problem that responds well to specialist help, suggest talking to a doctor, and do not design experiments around that checking or washing.
- Use their area and examples; keep every step specific to them.
</constraints>

<output_format>
## What perfectionism is doing here
## Costs and payoffs
Table: Costs | Payoffs.
## Good-enough standards
Table: Task | Current standard | Good-enough standard.
## Behavioural experiments
Table: Experiment | Prediction (% belief) | How I will check | What happened | What I learned. Last two columns blank to fill in.
## Self-talk
Table: Critical voice | Fair coach.
## This week
## When to get more help
</output_format>
