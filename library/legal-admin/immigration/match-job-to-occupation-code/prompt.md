---
schema: 1
id: match-job-to-occupation-code
kind: prompt
title: Match a job to a visa occupation code
description: Compares real duties with the occupation descriptions pasted from a visa occupation list, ranks the closest codes on main duties and skill level, and flags mismatches before nominating one.
category: immigration
version: 1.0.0
status: incubating
stage: [plan, review]
role: [individual, job-seeker, recruiter]
subject: [law]
requires: [none]
inputs: [text, resume, job-posting]
output: [table, explanation, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [occupation-code, skilled-occupation-list, job-classification, nominated-occupation, sponsorship-eligibility]
pairs_with:
  prompts: [write-employment-experience-letter, estimate-immigration-points-score, ask-employer-for-visa-sponsorship]
args:
  - name: duties
    description: Your actual job title and the duties you do, with roughly how much of your time each takes, plus qualification and years of experience. A job description or CV extract is fine.
    type: text
    required: true
  - name: occupation_descriptions
    description: The official descriptions of the two to five occupation codes you are considering, pasted from the country's occupation list or classification, with the code numbers.
    type: text
    required: true
  - name: programme
    description: The country and visa programme, and whether the occupation must be on an eligible list or meet a salary rule. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Duty comparison, Ranking, Mismatches and risks, Next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Work and skilled visas usually require a nominated occupation from a national classification, and choosing the wrong one is a common, avoidable refusal reason. Decision-makers compare the main duties actually performed, not the job title, with the occupation's description and skill level; a "Data Analyst" title can sit in different codes depending on whether the work is analysis, database administration or reporting. The occupation must usually also be on the programme's eligible list, may carry its own salary threshold, and must be the same one used in a skills assessment, the employer's sponsorship and the experience letter. Picking a code because it is on the list, when the duties do not match, invites a misrepresentation finding.

{{#programme}}Programme: {{programme}}{{/programme}}

Your duties:
<duties>
{{duties}}
</duties>

Occupation descriptions:
<occupation_descriptions>
{{occupation_descriptions}}
</occupation_descriptions>
</context>

<task>
1. Duty comparison: list the person's main duties by share of time, and for each candidate code, which of its listed tasks are matched, partly matched or not matched, and whether the skill level and qualification fit.
2. Ranking: order the codes by fit on main duties (not job title), with a short reason for each.
3. Mismatches and risks: duties that point to a different code, tasks in the description the person does not do, skill-level gaps, and consistency issues with the CV, employer documents or an earlier application.
4. Next steps: what to check on the official list (eligibility for the programme, salary rules, assessing body), what to ask the employer or a regulated adviser, and documents that would show the duties.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Compare only against the descriptions supplied; do not quote codes or lists from memory, and say if a likely code was not supplied.
- Never advise choosing a code whose duties the person does not perform, or rewriting duties to fit one.
- Do not decide eligibility; present the fit for the person and their adviser to decide.
{{> output/uncertainty}}
</constraints>

<output_format>
## Duty comparison
Table: Your duty | Share of time | Code A | Code B | Code C (matched, partly, no).
## Ranking
Numbered.
## Mismatches and risks
Bullets.
## Next steps
Checklist.
</output_format>
