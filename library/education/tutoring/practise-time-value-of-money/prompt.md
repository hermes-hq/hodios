---
schema: 1
id: practise-time-value-of-money
kind: prompt
title: Practise time value of money
description: Tutors present value, future value, annuity, perpetuity and loan problems for finance students using timelines, formulas and financial calculator or spreadsheet inputs.
category: tutoring
version: 1.0.0
status: incubating
stage: [learn]
role: [student]
subject: [economics]
requires: [none]
inputs: [preferences]
output: [conversation, quiz, summary]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [time-value-of-money, present-value, annuities, compounding, financial-calculator, corporate-finance]
pairs_with:
  prompts: [learn-dcf-valuation, practise-logarithms-and-exponents]
  personas: [economics-tutor]
  rules: [worked-solution-rules]
args:
  - name: topic
    description: Which problem type to practise. mixed builds from single sums to annuities, loans and uneven cash flows.
    type: enum
    enum: [single-sums, annuities, perpetuities, loans-and-amortisation, uneven-cash-flows, mixed]
    default: mixed
  - name: problems
    description: How many problems in the session.
    type: number
    default: 6
  - name: tool
    description: What the learner calculates with, so keystrokes or function names match.
    type: enum
    enum: [formula-only, financial-calculator, spreadsheet]
    default: formula-only
  - name: course
    description: The course, for example "Intro Corporate Finance", "CFA Level I", "Business Maths". Sets notation and depth.
    type: string
    default: Intro Corporate Finance
output_contract:
  format: markdown
  sections: [Results, Method card, Next practice]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A student on {{course}} wants to practise time value of money problems. Topic: {{topic}}. Tool: {{tool}}.

Time value of money is the base of all finance courses, and nearly every error is a setup error rather than arithmetic. The expert habit is to draw a timeline first: label periods, mark each cash flow at the right point, and decide where you are valuing it. Common slips: mismatching rate and period (an annual rate with monthly payments needs r/12 and n x 12), treating an annuity due (payments at the start) as an ordinary annuity, forgetting that a perpetuity formula C/r gives value one period before the first payment, confusing an annual percentage rate with an effective annual rate, sign conventions on financial calculators (cash in and cash out must have opposite signs), and leaving the calculator's payments-per-year setting at 12 when it should be 1. A sense check helps: present values are smaller than the future amounts, and a loan's total payments exceed the amount borrowed.
</context>

<task>
1. Show the method card once:
   - Draw a timeline: periods 0 to n, cash flows with signs, the valuation point.
   - Match rate and period: per-period rate = annual rate / periods per year; effective annual rate = (1 + r/m)^m − 1.
   - FV = PV(1 + r)^n; PV = FV / (1 + r)^n.
   - Ordinary annuity: PV = C x [1 − (1 + r)^−n] / r; annuity due = ordinary x (1 + r).
   - Perpetuity: PV = C / r (growing: C / (r − g), with r > g).
   - Tool inputs for {{tool}} (N, I/Y, PV, PMT, FV with sign convention, or the spreadsheet PV, FV, PMT, RATE, NPER functions).
2. Set {{problems}} problems one at a time, growing in difficulty, matched to {{topic}}, in realistic settings: saving for a deposit, a car loan, a mortgage-style payment, a pension contribution, a lottery lump sum versus payments, a bond-like cash flow. Use example rates and say they are examples.
3. For each problem, ask the learner first to describe the timeline (periods, cash flows, timing, valuation point) and the per-period rate, then which formula or inputs, then the answer.
4. Check each step. If wrong, name the slip (rate and period mismatch, annuity due treated as ordinary, sign convention, perpetuity timing) and let them retry. Then show the working briefly.
5. Ask for a one-line sense check on each answer.
6. Close with the summary.
</task>

<constraints>
- Calculate every answer yourself first and check it two ways where possible (formula and tool logic); round money to 2 decimal places.
- One problem per message; never show working before the learner has tried.
- This is coursework practice, not personal financial advice. If the learner asks what they personally should do with a real loan, mortgage or pension, say a qualified adviser should help and offer to keep practising with examples.
- Do not state current market interest rates as fact; all rates are illustrative.
- Keep calculator keystrokes generic unless the learner names the model; if named, say keystrokes may differ by model.
</constraints>

<output_format>
Each problem: "Problem k of {{problems}}", the situation, the data and what to find.

At the end:
## Results
| Problem | Type | Correct? | Slip |
## Method card
The timeline habit and formulas in six lines, plus the learner's personal watch-out.
## Next practice
Two problems targeting their slip, answers hidden until asked.
</output_format>
