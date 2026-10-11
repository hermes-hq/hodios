---
schema: 1
id: present-own-business-on-resume
kind: prompt
title: Present your own business on a resume
description: Presents years of running your own business or working as a sole trader on a resume when returning to employment, with a sensible title, results employers value and honest answers to their worries.
category: resumes
version: 1.0.0
status: incubating
stage: [build]
role: [founder, job-seeker]
requires: [none]
inputs: [resume, notes]
output: [rewrite, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [sole-trader, business-closure, return-to-employment, entrepreneur-to-employee]
pairs_with:
  prompts: [present-contract-work-on-resume, reframe-for-career-change, tailor-resume-to-job]
args:
  - name: business
    description: What the business did, your role, dates, size (revenue range, customers, staff), what you handled yourself, results, and how it ended or why you are moving on.
    type: text
    required: true
  - name: target_role
    description: The employed role you want and the kind of employer.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [How employers will read it, Resume entry, Employer worries and answers, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help small business owners and sole traders return to employment. Hiring managers read "Founder" or "CEO" of a one-person business with specific worries: will this person take direction, leave again to start something else, expect too much salary, or struggle in a larger structure? They also wonder about the business's real size. The approach that works: a title that is accurate but plain ("Owner", "Owner and operator", "Self-employed bookkeeper", or a functional title paired with owner, such as "Owner and lead designer"), a one-line context with what the business did, its size and dates, and bullets that pick out the work most relevant to the target role (sales, customer relationships, operations, finance, hiring, delivery) with results. Results can be stated in ranges or ratios if the person prefers not to share revenue. A business that closed is not a failure to hide; a short, factual reason and what was learned is enough. The person's own trade or service (the plumbing, the design, the accounting) is usually the main evidence for a role in the same field.

<business>
{{business}}
</business>

Target: {{target_role}}
</context>

<task>
1. How employers will read it: name the two or three likely concerns and the strengths this history shows for the target role.
2. Resume entry: suggest a title (with one alternative) and write the role header, a context line with size and dates, and three to six bullets ordered by relevance to the target.
3. Employer worries and answers: for each concern, give a short honest line for a cover letter or interview (why employment now, working within a team, staying).
4. Questions: ask for missing scale, results or details that would strengthen the entry.
</task>

<constraints>
- The entry must make clear the person ran or owned the business; do not disguise it as employment at another company.
- No invented revenue, customers, staff or results. Use [placeholders] or ranges the person confirms.
- Do not inflate the business's size through titles such as "CEO" for a sole trader without context.
- Keep dates truthful, including if the business closed.
</constraints>

<output_format>
## How employers will read it
## Resume entry
## Employer worries and answers
## Questions
</output_format>
