---
schema: 1
id: write-performance-review
kind: prompt
title: Write a performance review
description: Writes a fair performance review from a manager's notes, with specific examples, a rating rationale tied to the scale, growth goals and a check for common rater biases. Use in review cycles.
category: people-management
version: 1.0.0
status: incubating
stage: [review]
role: [manager, engineering-manager, operations-manager]
requires: [none]
inputs: [notes]
output: [rewrite, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [review-cycle, sbi-feedback, rater-bias, growth-goals]
pairs_with:
  prompts: [plan-one-on-one, write-self-review]
args:
  - name: notes
    description: Your notes on the person for the whole period - goals and results, examples of strong and weak work, peer feedback, their self-review if you have it. Use initials or a role instead of a full name if you prefer.
    type: text
    required: true
  - name: rating_scale
    description: Your company's rating scale with its definitions (for example "1 Below expectations ... 5 Far exceeds"). Optional; without it the review gives a summary judgement instead of a number.
    type: text
  - name: tone
    description: How the review should read (for example "warm and direct", "formal"). Optional.
    type: string
output_contract:
  format: markdown
  sections: [Review, Rating rationale, Bias check, Before you deliver]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an experienced people manager and HR partner. A fair review is specific, covers the whole period, is consistent with the feedback the person has already heard during the year, and separates the work from the person. Common failures: vague praise or criticism with no example ("great team player", "needs to be more strategic"), recency bias (only the last month), halo or horns effects (one big event colours everything), personality judgements instead of behaviour ("abrasive", "not a culture fit"), and wording that tends to be applied unevenly across groups (for example calling the same behaviour "assertive" in one person and "aggressive" in another).

<notes>
{{notes}}
</notes>
{{#rating_scale}}
<rating_scale>
{{rating_scale}}
</rating_scale>
{{/rating_scale}}
{{#tone}}Tone: {{tone}}{{/tone}}
</context>

<task>
1. Organise the notes by period and theme: results against goals, how the work was done (collaboration, communication, ownership), and growth. Note which parts of the period have no evidence.
2. Write the review:
   - Summary (3-4 sentences): the overall picture of the period.
   - Strengths: 2-4, each with a specific example written as situation, behaviour and impact.
   - Areas to develop: 1-3, each with a specific example, the impact, and what "good" would look like. Frame them as behaviour, not personality.
   - Goals for next period: 2-4, specific and measurable where possible, at least one of them developmental, with the support the manager will provide.
3. If a rating scale is given, recommend a rating and explain it against the scale's definitions with evidence. If no scale is given, give a summary judgement (for example below, meets or exceeds expectations) and say it should be mapped to the company's scale.
4. Run a bias check: look for recency, halo or horns, personality language, vague statements and coded words, and show any line you changed and why. Also flag where the notes rely on a single source.
5. List anything that should not go in a written review or needs HR first: health, family or personal circumstances, protected characteristics, anything that may relate to a disability or accommodation, and any potential disciplinary or legal matter.
</task>

<constraints>
- Use only the notes. Do not invent examples, quotes, numbers or peer feedback. Where an example would help but is missing, write [example needed] and say what kind.
- Nothing in the review should surprise the person; if a serious issue appears in the notes with no sign it was raised before, flag that to the manager.
- If the review may lead to a performance improvement plan or dismissal, say the manager should involve HR before delivering it, and keep the language factual.
- No comparison with named colleagues.
</constraints>

<output_format>
## Review
Summary, Strengths, Areas to develop, Goals for next period.
## Rating rationale
## Bias check
Table: Original wording or issue | Change | Reason.
## Before you deliver
Bullets: missing evidence, items for HR, and two or three tips for the conversation itself.
</output_format>
