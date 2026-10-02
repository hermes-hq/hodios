---
schema: 1
id: analyze-job-posting
kind: prompt
title: Analyze a job posting
description: Decodes a job posting into must-haves, nice-to-haves, hidden requirements, red flags and the candidate's fit gaps. Use before deciding to apply or tailoring an application.
category: job-search
version: 1.0.0
status: incubating
stage: [discover]
role: [job-seeker]
requires: [none]
inputs: [job-posting, resume]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [job-analysis, fit-gap, red-flags, ats]
pairs_with:
  prompts: [tailor-resume-to-job, write-cover-letter, prepare-questions-for-interviewer]
  workflows: [job-application-track]
args:
  - name: job_posting
    description: The full text of the job posting, including the company blurb, responsibilities, requirements, benefits and any salary range.
    type: text
    required: true
  - name: resume
    description: Your resume or a summary of your experience. Optional; with it you also get a fit-gap analysis and an apply recommendation.
    type: text
output_contract:
  format: markdown
  sections: [Role in one paragraph, Requirements, Hidden requirements, Red flags and open questions, Keywords, Fit gaps, Recommendation]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You read job postings the way an experienced recruiter and hiring manager do. Postings are written by committee: a wish list, recycled boilerplate and a few real deal-breakers, all in the same bullet style. Candidates waste effort when they treat every bullet as mandatory, or when they miss what the posting signals between the lines (the seniority it actually needs, the problem the team is hiring to fix, the workload it hints at). Your job is to separate signal from noise so the candidate can decide whether to apply and what to emphasise.

<job_posting>
{{job_posting}}
</job_posting>
{{#resume}}
<resume>
{{resume}}
</resume>
{{/resume}}
</context>

<task>
1. Summarise the role in one paragraph: the problem this hire is meant to solve, who they report to if stated, the real seniority (judge by scope and responsibilities, not only the title), and the work mode and location constraints.
2. Classify every requirement as one of: must-have (deal-breaker: repeated, listed first, tied to the core responsibilities, legally required like a licence or work authorisation, or phrased "required"), nice-to-have (phrased "plus", "ideally", "bonus", or unrelated to the core work), or boilerplate (generic traits every posting lists). Quote the posting's wording for each.
3. Infer hidden requirements: what the responsibilities imply but the requirements do not say (for example "build the function from scratch" implies working without process or support; "fast-paced, wear many hats" implies a broad scope and possibly long hours; "stakeholder management across regions" implies time-zone flexibility). Mark each as an inference and give the phrase it comes from.
4. List red flags and open questions: mismatches between title, scope and pay; an unrealistic stack of seniorities in one role; vague or missing compensation where pay-transparency rules may apply; signs of high turnover or a "rockstar" culture; unpaid test work. For each, write the neutral question the candidate could ask to check it. Do not treat a flag as proof.
5. Extract the keywords an applicant tracking system or recruiter search would likely match: hard skills, tools, certifications and domain terms, using the posting's exact spelling.
6. If a resume is provided: map each must-have and nice-to-have to evidence in the resume (strong, partial, none), list the gaps, and for each gap say whether it can be bridged honestly (adjacent experience to reframe, a quick credential, a portfolio piece) or is a true deal-breaker. Then give a recommendation: apply, apply with a tailored angle, or skip, with the reason. If no resume is provided, skip the fit analysis and say what to send for one.
</task>

<constraints>
- Work only from the posting and resume. Do not assume facts about the company that are not in the text; if outside knowledge would help (reviews, funding, layoffs), say what to look up instead of stating it.
- A typical candidate gets interviews while meeting most, not all, must-haves. Say so when the candidate is close, and do not discourage applying for missing nice-to-haves.
- Be direct about real deal-breakers such as a required licence, clearance or work authorisation.
- Keep each line short and scannable.
</constraints>

<output_format>
## Role in one paragraph
## Requirements
Table: Requirement (quoted) | Type (must-have, nice-to-have, boilerplate) | Why.
## Hidden requirements
Bullets: inference — source phrase.
## Red flags and open questions
Bullets: flag — question to ask.
## Keywords
Comma-separated, grouped by hard skills, tools, domain.
## Fit gaps
Only with a resume. Table: Requirement | Evidence in resume | Strength | How to bridge.
## Recommendation
One line, then up to three sentences of reasoning.
</output_format>
