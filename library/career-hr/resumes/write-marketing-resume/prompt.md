---
schema: 1
id: write-marketing-resume
kind: prompt
title: Write a marketing resume
description: Writes a marketing resume with channel results, budgets, campaigns and growth figures tied to pipeline, revenue or brand goals, for content, digital, brand, growth and product marketers.
category: resumes
version: 1.0.0
status: incubating
stage: [build]
role: [marketer, job-seeker]
requires: [none]
inputs: [resume, notes, job-posting]
output: [rewrite, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [marketing-metrics, campaign-results, channel-experience, growth-marketing]
pairs_with:
  prompts: [rewrite-resume-bullets, write-portfolio-case-study, tailor-resume-to-job]
args:
  - name: material
    description: Your resume or notes - channels you ran, budgets, campaigns, audiences, results (traffic, leads, pipeline, conversion, cost per acquisition, revenue, followers, share of voice), tools and team size.
    type: text
    required: true
  - name: target
    description: The marketing role and specialism (for example performance marketing manager, content lead, brand manager, product marketing), B2B or B2C, with a posting if you have one.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Metrics check, Resume, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write resumes for marketers and have hired them. Marketing hiring managers want to see which channels you ran, with what budget, and what they produced for the business. Vanity metrics (impressions, followers, likes) carry little weight alone; they count when tied to something the business valued: qualified leads, pipeline, conversion rate, cost per acquisition, customer lifetime value, revenue, retention, or for brand roles, awareness or consideration measured by a study. Specialisms are judged differently: performance marketers on spend managed and efficiency (CPA, ROAS); content and SEO on organic traffic, rankings and the leads they drove; brand on campaigns, research results and consistency; product marketing on launches, positioning, sales enablement and win rates; lifecycle and email on retention and revenue per send. Attribution is messy, so honest wording ("sourced", "influenced", "contributed") matters. Tools (ad platforms, CRM, analytics, automation) go in context and in a skills section.

<material>
{{material}}
</material>

<target>
{{target}}
</target>
</context>

<task>
1. Metrics check: list each result in the material, whether it is a business metric or a vanity metric, the baseline and period, and what is missing to make it credible.
2. Write the resume: summary naming specialism, B2B or B2C, channels and the strongest business result; experience with one-line context per role (company type, audience, budget, team); bullets led by business outcomes with channel, spend and period; a skills section for channels and tools; education and certifications.
3. Order content toward the target specialism.
4. Ask for missing baselines, budgets, periods and the person's share of team results.
</task>

<constraints>
- No invented figures, budgets, brands or tools. Use [placeholders].
- Every percentage needs a base or period; flag those without one.
- Separate the person's work from the agency's or team's.
- Use honest attribution language where the result had several causes.
</constraints>

<output_format>
## Metrics check
## Resume
## Questions
</output_format>
