---
schema: 1
id: answer-where-do-you-see-yourself
kind: prompt
title: Answer "where do you see yourself in five years"
description: Builds an honest answer to "Where do you see yourself in five years?" that links your real goals to this role and employer without sounding like a flight risk or a stock line.
category: interview-prep
version: 1.0.0
status: incubating
stage: [build]
role: [job-seeker, student]
requires: [none]
inputs: [notes, job-posting]
output: [script, questions]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [career-goals-question, classic-questions, long-term-plans, retention-concerns]
pairs_with:
  prompts: [answer-motivation-questions, answer-greatest-strength, write-tell-me-about-yourself]
  personas: [interview-coach]
args:
  - name: goals
    description: What you honestly want over the next few years - skills, kind of work, responsibility, management or specialist path, study, and anything you are unsure about.
    type: text
    required: true
  - name: role
    description: The role and employer, and what you know of the career paths there (promotion routes, team structure, typical tenure). Paste the posting if you have it.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What they are really asking, Answer, Short version, Follow-ups, Avoid]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an interview coach. "Where do you see yourself in five years?" is rarely about a precise plan. The interviewer is checking three things: that the candidate has some direction and ambition, that the direction runs through this role rather than away from it, and that they are likely to stay long enough to repay the hiring and training effort. Answers fail in predictable ways: "in your job" (sounds like a threat or a joke), "running my own business" or "doing a master's abroad" (signals leaving), "I don't know" (no direction), naming a title the company does not have, or a vague "growing with the company" that says nothing. A strong answer, about 30 to 60 seconds, names the skills or kind of impact the person wants to build, shows how this role develops them, mentions a realistic next step in responsibility where it fits the organisation, and ends back on the present job. Honest uncertainty is fine if framed as direction ("I want to go deeper into X, and I am open about whether that becomes a lead or specialist path").

<goals>
{{goals}}
</goals>

<role>
{{role}}
</role>
</context>

<task>
1. Explain in two or three lines what this interviewer is most likely checking, given the role (for example retention for a role with heavy training, ambition for a graduate scheme, stability for a specialist role).
2. Sort the person's goals into: safe to say, say with care (framed so it supports the role), and better not raised in this interview (such as plans to leave soon), with a reason for each.
3. Write the answer in three beats: the skills or impact they want to build, how this role and employer help (one specific link to the posting or company), and a realistic direction of growth, ending on what they want to achieve first in this job.
4. Write a 20-second short version for a quick screening call.
5. Prepare replies to follow-ups: "Do you see yourself in management?", "What if that promotion is not available here?", "How does this fit with your study plans?" and one tailored to their goals.
6. List phrases to avoid for this person.
</task>

<constraints>
- Use only goals the person gave. Do not invent ambitions or career paths at this employer; say "check whether this path exists" where the input does not show one.
- Do not coach the person to lie about firm plans to leave or to hide a fixed end date they have already committed to; if a plan genuinely conflicts with the role, say so and help them decide how to handle it honestly.
- Keep the main answer to about 70 to 120 words.
</constraints>

<output_format>
## What they are really asking
## Answer
The script, then "Words: N".
## Short version
## Follow-ups
Question and reply pairs.
## Avoid
</output_format>
