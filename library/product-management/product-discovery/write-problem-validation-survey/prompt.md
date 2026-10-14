---
schema: 1
id: write-problem-validation-survey
kind: prompt
title: Write a problem validation survey
description: Writes a survey that sizes how widespread and painful a problem is among target users, with behavioural screening, frequency and workaround questions and no hypothetical buying questions.
category: product-discovery
version: 1.0.0
status: incubating
stage: [discover]
role: [product-manager, founder, ux-researcher, marketer]
requires: [none]
inputs: [text]
output: [questions, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [problem-validation, survey-design, problem-sizing, workarounds, sampling-bias]
pairs_with:
  prompts: [write-customer-interview-guide, rank-customer-problems, write-research-screener, estimate-problem-cost]
args:
  - name: problem_hypothesis
    description: The problem you believe exists, for whom, and what you learned in interviews so far.
    type: text
    required: true
  - name: target_users
    description: Who should answer (role, situation, behaviour) and who should not.
    type: text
    required: true
  - name: distribution
    description: How you will reach respondents (email list, in-product, panel, community, social) and roughly how many.
    type: text
    required: true
  - name: length_minutes
    description: Target completion time in minutes.
    type: number
    default: 5
output_contract:
  format: markdown
  sections: [What this survey can and cannot tell you, Screener, Survey, Analysis plan, Distribution and sample]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a researcher who designs surveys to size problems that interviews have surfaced. A problem validation survey answers "how many people in the target group have this problem, how often, how badly, and what do they do about it today". It cannot tell you whether people will buy a solution, and questions like "Would you use a product that...?" or "How much would you pay?" produce inflated, misleading numbers. Reliable survey questions ask about recent, concrete behaviour within a stated time frame ("In the last 30 days, how many times did you..."), current tools and spend, and the consequence of the last occurrence. Surveys are also distorted by who answers: a list of existing fans, a community of enthusiasts or a social post all over-represent people who care. The survey should come after some interviews, use the customers' words, stay short, and end by recruiting people for follow-up interviews.

Target length: {{length_minutes}} minutes
</context>

<task>
Problem hypothesis and what interviews showed:

<problem_hypothesis>
{{problem_hypothesis}}
</problem_hypothesis>

Target users: {{target_users}}

Distribution: {{distribution}}

1. State what the survey can answer (prevalence, frequency, severity, current solutions, spend, segment differences) and what it cannot (purchase intent, price, whether a specific solution will work), and the decision it informs.
2. Write a screener of two to four behavioural questions that qualify respondents without revealing the target answer (for example ask which of several tasks they did in the last month, with the target task among distractors), and disqualify non-target respondents politely.
3. Write the survey in order: frequency of the situation in a recent time frame; the last occurrence (what happened, consequence, time or money lost) using closed options plus "other"; current approach (tools, people, workarounds) with multi-select; spend on current approach in a range; satisfaction with the current approach; one open text "describe the last time this was frustrating"; segment questions (role, organisation size, etc.) at the end; and an opt-in for a follow-up interview.
4. For each question give the type (single choice, multiple choice, number range, open), answer options with mutually exclusive ranges and a "none" or "not applicable" option, and which part of the hypothesis it measures. Check the total fits {{length_minutes}} minutes (roughly 3 to 4 closed questions per minute, 1 minute per open question).
5. Write the analysis plan: prevalence among qualified respondents, frequency distribution, share with active workarounds or spend (the strongest signal), cross-tabs by segment, how to code open text, and the threshold that would count as "problem confirmed" set before sending.
6. Advise on distribution and sample: who the channel over- or under-represents, a minimum number of qualified responses for the segment cuts planned (as a rule of thumb, at least 100 per segment for rough percentages), and how to reduce bias (randomised option order, no incentive tied to answers, neutral invitation wording).
</task>

<constraints>
- No hypothetical, future or purchase-intent questions; no questions that describe or pitch a solution. If the user asks for them, explain why and offer the behavioural replacement.
- No leading wording, double-barrelled questions or loaded terms; use the customers' words from the interviews where given.
- Ask for only the personal data the analysis needs; include a short consent and privacy placeholder and avoid sensitive categories unless essential.
- Do not invent interview findings or benchmark response rates.
- If no interviews have been done, say a survey is premature for discovering what the problem is, recommend a handful of interviews first, and still give a draft labelled as such if asked.
</constraints>

<output_format>
## What this survey can and cannot tell you
Short paragraph plus the decision it informs.

## Screener
Numbered questions with options and qualify or disqualify rules.

## Survey
Numbered questions with type, options and the hypothesis part each measures.

## Analysis plan
Bullets including the pre-set "problem confirmed" threshold.

## Distribution and sample
Bullets on channel bias, sample size and bias controls.
</output_format>
