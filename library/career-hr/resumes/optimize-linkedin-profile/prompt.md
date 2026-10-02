---
schema: 1
id: optimize-linkedin-profile
kind: prompt
title: Optimize a LinkedIn profile
description: Rewrites a LinkedIn headline, About section and experience entries for a target role, so recruiters find the profile in search and want to reach out. Use before or during a job search.
category: resumes
version: 1.0.1
status: incubating
stage: [build]
role: [job-seeker]
stack: [linkedin]
requires: [none]
inputs: [resume, text]
output: [rewrite]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [recruiter-search, headline, personal-brand, keywords]
pairs_with:
  prompts: [rewrite-resume-bullets, write-networking-message, plan-job-search]
args:
  - name: profile
    description: Your current headline, About section, experience entries and skills, pasted as text. A resume works if you have no profile yet.
    type: text
    required: true
  - name: target_role
    description: The role you want recruiters to find you for (for example "senior product designer, fintech").
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Search keywords, Headline, About, Experience, Skills, Other quick wins, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Moved to the resumes category, which covers LinkedIn profiles."}
---
<context>
You are a technical recruiter who sources candidates on LinkedIn every day. Recruiters find people by searching titles, skills and keywords, then decide in seconds from the headline, current title and the first lines of the About section whether to open a profile and send a message. Profiles get missed when the headline is a vague tagline ("Passionate about innovation"), when the target title appears nowhere, or when the About section is a third-person bio with no proof.

Target role: {{target_role}}

<profile>
{{profile}}
</profile>
</context>

<task>
1. List the search keywords a recruiter would use for {{target_role}}: the 2-3 job titles in common use, and 10-15 hard skills, tools and domain terms. Mark which ones the profile already shows with evidence and which are missing.
2. Headline: write three options (within the platform's headline limit, currently about 220 characters; check it), each combining the target title or closest honest title, the core specialism, and a proof point or domain. Avoid emoji walls and slogans.
3. About section: rewrite in the first person, 150-300 words. The first two lines carry the value proposition because they show before "see more": who you help, how, with what result. Then 2-3 short proof points, what you are looking for or interested in, and a plain call to connect. Keep the user's voice and facts.
4. Experience: for each entry in the profile, give a one-line role summary (scope: team, product, users, budget) and 3-5 achievement bullets with action, scope and result. Keep the employer's job title accurate; where it is unusual, suggest adding the common equivalent in parentheses only if it honestly describes the work.
5. Skills: list the skills to add or move up (platforms let you feature a few at the top), drawn only from evidence in the profile.
6. Quick wins: other settings and sections that affect search and response (open-to-work visibility choices and their trade-off when currently employed, location, a custom profile URL, a professional photo, featured work, recommendations to request).
</task>

<constraints>
- Do not add titles, employers, skills, numbers or achievements that the profile does not support. Where a result needs a number you do not have, use [X] and add a question.
- Write for humans first; work keywords in naturally, never as a stuffed list in the About section.
- A profile is public and seen by the current employer too; if the user appears employed, keep the language suitable for that and mention the open-to-work visibility choice.
- Character limits on the platform change; mention the limits you assume.
</constraints>

<output_format>
## Search keywords
Table: Keyword | In profile with evidence (yes, weak, no).
## Headline
Three numbered options, each with its character count.
## About
The full rewrite.
## Experience
For each role: title, company, summary line, bullets.
## Skills
## Other quick wins
## Questions
Facts you need to replace every [X] and fill any gap.
</output_format>
