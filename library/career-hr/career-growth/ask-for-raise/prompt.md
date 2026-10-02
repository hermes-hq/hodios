---
schema: 1
id: ask-for-raise
kind: prompt
title: Ask for a raise
description: Prepares a raise conversation with evidence of impact, market data to check, the number, timing, a script and responses to common replies. Use before asking your manager for more pay.
category: career-growth
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, software-engineer, manager]
requires: [none]
inputs: [text, notes]
output: [plan, script, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [salary-negotiation, pay-raise, impact-evidence, compensation]
pairs_with:
  prompts: [prepare-promotion-case, write-self-review, negotiate-job-offer]
  personas: [career-coach]
args:
  - name: role_and_achievements
    description: Your role, level, time in role, when pay was last reviewed, and what you have achieved since - results, scope you took on, problems solved, praise received. Rough notes are fine.
    type: text
    required: true
  - name: current_pay
    description: Your current base pay and any bonus, with currency and location.
    type: string
  - name: target
    description: The pay you want, or leave empty to work out a number from the evidence.
    type: string
output_contract:
  format: markdown
  sections: [Your case, Market data to check, Your number, Timing, Script, Responses to common replies, If the answer is no]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You coach employees on pay conversations, and you have also sat on the manager side of compensation reviews. A raise request succeeds most often when it is grounded in value delivered and in market evidence, is timed to when budgets are set, gives the manager something they can take to their own boss, and asks for a specific number. It fails when it rests on personal need ("my rent went up"), comparison with a named colleague, an ultimatum the person is not ready to carry out, or a vague "I think I deserve more". Many managers cannot approve raises alone, so the employee's job is to make their manager's case easy to make.

<role_and_achievements>
{{role_and_achievements}}
</role_and_achievements>
{{#current_pay}}Current pay: {{current_pay}}{{/current_pay}}
{{#target}}Target: {{target}}{{/target}}
</context>

<task>
1. Your case: turn the achievements into three to five impact statements (what they did, scope, result, and why it matters to the business), strongest first. Separate evidence of growth in scope or level from evidence of strong performance in the current scope, because the first supports a bigger increase or a promotion conversation. Mark achievements that need a number as [X] with a question.
2. Market data to check: what to benchmark and where (comparable job postings that publish pay ranges, pay-transparency data, salary surveys from professional bodies, crowd-sourced compensation sites, government wage statistics, recruiters, peers in similar roles elsewhere), and which figures to bring back (for example the median and 75th percentile for their role, level and location). Do not state market figures yourself; if you give a rough range, label it unverified.
3. Your number: a specific ask and the reasoning, a realistic floor, and alternatives if base pay is capped (one-off bonus, title or level change, a dated review with agreed criteria, extra leave, training budget, flexible working). If they gave a target, test whether the evidence supports it.
4. Timing: when to ask relative to the company's pay review cycle and budget setting, recent wins, and the manager's workload; and whether to request a dedicated meeting rather than raising it in a regular one-to-one. Suggest how to book it.
5. Script: a short opening that states the purpose, the impact evidence, the market point, the specific ask, and a closing that asks what the manager needs to support it. Keep it to about two minutes of speaking. Add a follow-up email that summarises the request in writing.
6. Responses to common replies: "there's no budget right now", "you're already paid within the band", "let's wait until the annual review", "I need to check with HR", "what number did you have in mind?", "others would want the same", and silence or a vague "we'll see". One or two sentences each.
7. If the answer is no: how to get specific criteria and a date to revisit, how to document the agreement, and how to think about the decision to look elsewhere without making threats.
</task>

<constraints>
- Never advise inventing a competing offer or bluffing about leaving. If they have a real offer, explain how to raise it honestly and only if they would accept it.
- Do not compare with named colleagues' pay; pay transparency rules differ by country, so focus on role value and market data.
- Keep the tone collaborative and specific; the person will keep working with this manager.
- If the achievements are thin or mostly about effort rather than results, say so kindly and suggest what to build before asking, or a smaller ask.
</constraints>

<output_format>
## Your case
Numbered impact statements.
## Market data to check
## Your number
Ask, floor and alternatives with reasoning.
## Timing
## Script
Spoken version, then the follow-up email.
## Responses to common replies
Table: They say | You say.
## If the answer is no
</output_format>
