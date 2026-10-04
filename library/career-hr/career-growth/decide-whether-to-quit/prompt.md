---
schema: 1
id: decide-whether-to-quit
kind: prompt
title: Decide whether to quit your job
description: Helps someone decide whether to quit a job by asking what is wrong, what could change, how long their money lasts and what else is open, then ending with stay, fix or leave with a plan.
category: career-growth
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text]
output: [questions, plan]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: beginner
tags: [quitting, job-dissatisfaction, burnout, financial-runway, career-decision]
pairs_with:
  prompts: [handle-difficult-manager, write-resignation-letter, plan-job-search, propose-flexible-work, make-life-decision]
  personas: [career-coach]
args:
  - name: situation
    description: What is going on at work and why you are thinking of leaving - the job, how long you have been there, what has changed, and how it is affecting you.
    type: text
    required: true
  - name: savings_months
    description: Roughly how many months of essential costs your savings would cover if your pay stopped. Use 0 if none.
    type: number
    default: 3
  - name: alternatives
    description: Options you already have or are considering - an offer, interviews, study, freelancing, a career break, moving in with family. Leave empty if none yet.
    type: text
output_contract:
  format: markdown
  sections: [What I'm hearing, Questions, Verdict, Plan, Money check, What would change this]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
"Should I quit?" is usually three questions tangled together: is the problem in this job or would it follow me, can it be fixed here at a cost I accept, and can I afford the way out I am picturing. People who quit on a bad Tuesday often regret it; people who stay years past the point of harm do too. A good thinking partner untangles the questions, checks the money and the alternatives honestly, and lands on one of three answers: stay (the problem is smaller or more temporary than it feels), fix (try specific changes with a deadline), or leave with a plan (and which kind of leaving).

<situation>
{{situation}}
</situation>
Months of essential costs covered by savings: {{savings_months}}
{{#alternatives}}
<alternatives>
{{alternatives}}
</alternatives>
{{/alternatives}}
</context>

<task>
1. What I'm hearing: reflect the situation back in two or three sentences, naming the main source of the problem as you understand it (manager, workload or burnout, pay, growth, the work itself, values or ethics, culture, a life change outside work) and how long it has lasted.
2. Questions: ask what you still need, one or two questions per message, no more than eight in total, and stop after each set to wait for answers. Choose from:
   - What exactly is wrong, and what is fine? Is it getting better, worse or the same?
   - What has already been tried (a direct conversation, a transfer, reduced hours, leave, adjustments, a pay ask)? What happened?
   - If this one thing changed, would you want to stay?
   - Money: fixed monthly costs, dependants, a partner's income, debts, and anything tied to the job (visa, health insurance, housing, a bonus or vesting date, notice period, repayable training or relocation costs).
   - Alternatives: how employable they are now, how long searches typically take in their field and location (as their estimate), and whether they can search while employed.
   - Health: is the job affecting sleep, health or relationships, and how badly?
   Skip questions already answered in the situation.
3. Verdict: when you have enough, give one of Stay, Fix, or Leave with a plan, and why, tied to their own answers. For Leave with a plan, say which kind: search while employed (the default when the money is tight), leave on a set date once a condition is met, or leave now (only when staying is causing real harm and there is a way to cover costs).
4. Plan: concrete next steps for the verdict - for Fix, the two or three changes to try, how to raise them and a review date; for Leave, the search, savings and notice steps with dates; for Stay, what to change in how they work or think about the job and when to check again.
5. What would change this: the specific signals that should make them revisit the verdict.
</task>

<constraints>
- Do not decide for them or push your own preference. Make the reasoning visible so they can disagree with it.
- Use their figures. Compare {{savings_months}} months against a realistic search length they give or you ask for; if the runway is shorter, say so plainly and do not recommend leaving without income unless staying is harming their health or safety.
- This is general guidance, not financial, legal or immigration advice. If a visa, benefits, severance, a bonus clawback or a contract term depends on the timing, tell them to check it with the right adviser or official source before resigning.
- Do not assume quitting is brave or staying is weak, or the reverse.
- If the situation includes harassment, discrimination or unsafe work, mention once that HR, a union or an employment adviser may give them options beyond quitting.
- If they mention thoughts of suicide or self-harm, or a state that sounds like a crisis, stop the exercise, respond with care, and point them to local emergency services or a crisis line; for burnout or lasting low mood, suggest talking to a doctor.
- Mark anything they have not told you as an assumption.
</constraints>

<output_format>
First message: "What I'm hearing" (two or three sentences), then the first one or two questions. No verdict yet.

Final message, once you have answers:
## Verdict
**Stay**, **Fix** or **Leave with a plan** (and which kind), in one line, then three to five bullets of reasoning from their answers.
## Plan
Numbered steps with rough dates.
## Money check
One short paragraph or table: runway, expected search time, costs or dates tied to the job to check.
## What would change this
Three bullets.
</output_format>
