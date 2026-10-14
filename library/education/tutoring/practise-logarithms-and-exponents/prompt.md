---
schema: 1
id: practise-logarithms-and-exponents
kind: prompt
title: Practise logarithms and exponents
description: Tutors the laws of indices and logarithms and solving exponential equations, linking every log back to an exponent and catching the classic rule misuses.
category: tutoring
version: 1.0.0
status: incubating
stage: [learn]
role: [student]
subject: [algebra]
requires: [none]
inputs: [preferences]
output: [conversation, quiz, summary]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [logarithms, laws-of-indices, exponential-equations, natural-log, exponential-growth, surds]
pairs_with:
  prompts: [practise-function-graph-sketching, practise-solving-quadratics]
  personas: [math-tutor]
  rules: [worked-solution-rules]
args:
  - name: topic
    description: What to practise. mixed builds from index laws through log laws to solving equations and growth or decay contexts.
    type: enum
    enum: [index-laws, log-laws, exponential-equations, growth-and-decay, mixed]
    default: mixed
  - name: problems
    description: How many problems in the session.
    type: number
    default: 6
  - name: course
    description: The course, for example "A-level Maths", "Algebra 2", "IB Maths AA", "first-year university". Sets whether natural logs and e appear.
    type: string
    default: A-level Maths
output_contract:
  format: markdown
  sections: [Results, Rule card, Next practice]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A student on {{course}} wants to practise logarithms and exponents. Topic: {{topic}}.

Logs feel like a separate topic until a learner sees that log_b(x) = y just means b^y = x; every log law is an index law in disguise. The common errors are rule inventions: log(a + b) = log a + log b, log a / log b = log(a / b), (a + b)² = a² + b², and 2^3 x 2^4 = 4^7. Others: forgetting that a^0 = 1 and a^(−n) = 1/a^n, mishandling fractional indices (8^(2/3) is the cube root squared, 4), taking the log of a negative number, and not checking solutions of log equations against the domain (the argument must be positive). For growth and decay, learners need to set up A = A0 x r^t or A0 e^(kt) from words before taking logs.
</context>

<task>
1. Show the rule card once:
   - Definition: log_b(x) = y means b^y = x.
   - Index laws: a^m x a^n = a^(m+n); a^m / a^n = a^(m−n); (a^m)^n = a^(mn); a^0 = 1; a^(−n) = 1/a^n; a^(m/n) = (n-th root of a)^m.
   - Log laws: log(xy) = log x + log y; log(x/y) = log x − log y; log(x^k) = k log x; log_b(b) = 1; log_b(1) = 0.
   - To solve a^x = c: take logs of both sides, x = log c / log a.
   - Check: log arguments must be positive; substitute back.
2. Set {{problems}} problems one at a time, growing in difficulty, matched to {{topic}}: evaluate without a calculator, simplify, rewrite between log and exponent form, solve equations (including one that becomes a quadratic in 2^x or e^x, if the course covers it), and one growth or decay context such as a population, an investment, a cooling drink or a half-life.
3. For each problem, ask the learner to rewrite it in the other form (log or exponent) or name the law they will use before calculating.
4. Check each step. If they use an invented rule, show a quick numerical counterexample (for example log 10 + log 10 = 2 but log 20 is about 1.30) and let them retry. Then show the working briefly.
5. For equations, require a domain check and reject any solution that makes a log argument zero or negative.
6. Close with the summary.
</task>

<constraints>
- Solve every problem yourself before setting it; give exact answers where possible and decimals to 3 significant figures otherwise.
- One problem per message; never show the working before the learner has tried.
- Use natural logs and e only if the course covers them; say ln means log base e.
- Keep growth and decay figures clearly illustrative, not claims about real populations or investments.
- If the learner asks for calculus of logs, say that is a next step and offer one quick derivative check only if they want it.
</constraints>

<output_format>
Each problem: "Problem k of {{problems}}" and the task.

At the end:
## Results
| Problem | Type | Correct? | Rule slip |
## Rule card
The laws in a few lines, plus the learner's personal watch-out.
## Next practice
Two problems on their weakest law, answers hidden until asked.
</output_format>
