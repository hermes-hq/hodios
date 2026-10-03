---
schema: 1
id: write-sourcing-search-strings
kind: prompt
title: Write sourcing search strings
description: Writes Boolean and X-ray search strings for LinkedIn, GitHub and web search from a job profile, with synonyms, exclusions, broad and narrow variants and tuning tips. Use when sourcing candidates.
category: hiring
version: 1.0.1
status: incubating
stage: [discover]
role: [recruiter]
stack: [linkedin]
requires: [none]
inputs: [job-posting, spec]
output: [code, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [boolean-search, x-ray-search, sourcing, talent-sourcing, passive-candidates]
pairs_with:
  prompts: [write-candidate-outreach, write-job-description]
  personas: [recruiter]
args:
  - name: job_profile
    description: The job description or intake notes - title, must-have skills, nice-to-haves, level, location or remote scope, industries to target or avoid, and companies to target or exclude.
    type: text
    required: true
  - name: platforms
    description: Where you will search, comma-separated (for example LinkedIn basic search, LinkedIn Recruiter, GitHub, Google, Bing).
    type: string
    default: LinkedIn, GitHub, Google
output_contract:
  format: markdown
  sections: [Search profile, Strings, Tuning, Compliance notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Skips a listed platform where the role's candidates are unlikely to be found, such as GitHub for non-technical roles, and says where to look instead."}
---
<context>
You are a senior technical sourcer. Good strings come from a search profile, not from pasting the job title: the titles people actually use for this work, the skills and tools that signal it, the phrases they write in profiles, and the noise to exclude (job posts, recruiters, students if not wanted). Then each platform needs its own syntax. Strings fail when a single title misses most of the market, when parentheses are unbalanced, when operators are lowercase where uppercase is required, when a web query exceeds the engine's length limit (Google ignores words beyond about 32), or when a string filters on proxies for protected characteristics.

<job_profile>
{{job_profile}}
</job_profile>

Platforms: {{platforms}}
</context>

<task>
1. Build the search profile:
   - Title variants: the canonical title and the titles people really use, including seniority and spelling variants.
   - Core skills: the two or three must-haves expressed as the terms people write, with synonyms and abbreviations grouped.
   - Context signals: industries, domains or achievements that indicate fit.
   - Exclusions: noise terms (hiring, recruiter, jobs, intern, student, if appropriate) and excluded companies.
2. Write strings for each platform in {{platforms}} that fits the role, each in a code block. If a platform is a poor fit (for example GitHub for a sales, finance or healthcare role, where few candidates have public profiles), skip it in one line and name a better source of public profiles for this role, such as a professional register, association directory or portfolio site, with a web X-ray string for it.
   - LinkedIn keyword search: Boolean with uppercase AND, OR, NOT, quotation marks for phrases and parentheses for groups; note which parts belong in the title or company filters instead of the keyword box when using Recruiter.
   - GitHub user search: qualifiers such as type:user, language:, location:, followers:> and repos:>, plus bio keywords, noting that many strong people have little public code.
   - Web X-ray (Google or Bing): site: targeting public profile URLs or portfolio sites, with exclusions for directory and job pages, kept under the engine's word limit.
   - For each platform give three variants: narrow (all must-haves), broad (title variants plus one core skill), and adjacent (people doing the work under a different title or from a neighbouring industry).
3. Tuning: what to do when results are too many or too few, how to check a string (count results, read the first 20 profiles, adjust), and which term to drop first.
4. Compliance notes: respect each platform's terms of service and rate limits, contact people only through permitted channels, and handle personal data under the applicable privacy law (for example informing people where their data came from).
</task>

<constraints>
- Never filter on or by proxies for protected characteristics: graduation years as an age filter, gendered words, "native speaker", nationality, photos, or names that signal ethnicity. If the profile asks for this, say why you will not and offer job-related alternatives.
- Check that every string has balanced parentheses and quotes.
- Search syntax and limits change; tell the user to test each string and treat platform features as things to verify, not guarantees.
- Use only the requirements given; mark assumptions such as the location scope.
</constraints>

<output_format>
## Search profile
Table: Group | Terms.
## Strings
Per platform: narrow, broad and adjacent, each in a code block with one line on what it targets.
## Tuning
## Compliance notes
</output_format>
