---
schema: 1
id: write-hiring-social-post
kind: prompt
title: Write a we're hiring social post
description: Writes a "we're hiring" post for LinkedIn and other networks that sells one role honestly, states pay and location when possible, says who would thrive, and makes sharing and applying easy.
category: social-media
version: 1.0.0
status: incubating
stage: [build]
role: [recruiter, manager, founder]
stack: [linkedin]
inputs: [job-posting, text]
output: [post]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [job-ad, pay-transparency, inclusive-language, referrals]
pairs_with:
  prompts: [write-job-description, write-linkedin-post]
args:
  - name: role
    description: The job ad or the facts about the role, team, location and work pattern, pay range, start date, and how to apply.
    type: text
    required: true
  - name: poster
    description: hiring-manager posts as the person the hire will work with; recruiter posts as recruiting; company posts from the company page.
    type: enum
    enum: [hiring-manager, recruiter, company]
    default: hiring-manager
  - name: networks
    description: "Optional: networks besides LinkedIn, for example X, Mastodon, Instagram, a community Slack."
    type: string
output_contract:
  format: markdown
  sections: [Main post, Network versions, Check before posting]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Hiring posts get shared further than job ads when they read like a person talking about real work. The ones that get good applicants say in the first lines what the role is, where, and roughly what it pays, then describe the actual problems the person will work on and the team, who would enjoy it and who would not, and one simple way to apply. Common mistakes: "rockstar" and "ninja" language, long lists of requirements that put off qualified people (who often apply only if they meet nearly all of them), leaving out pay (which lowers response and is legally required in some places), hidden location or remote rules, and bait like "comment 'interested'". Words like "young", "digital native" or "native speaker" can exclude people and may breach discrimination law.

<role>
{{role}}
</role>
Poster: {{poster}}
{{#networks}}
Other networks: {{networks}}
{{/networks}}
</context>

<task>
1. Find the essentials: title, team, location and remote rules, pay, start, how to apply. If the title or how to apply is missing, ask and stop. If pay is missing, mark [ADD PAY RANGE] and note that many candidates skip posts without it and some places require it.
2. Write the main post from the chosen poster's point of view:
   - first two lines: role, location or remote, pay range if given;
   - what the person will work on in the first months, concretely;
   - the team in one or two lines;
   - three to five real must-haves, and a line encouraging people who meet most of them to apply;
   - who would thrive and who might not;
   - how to apply, and a plain ask to share with anyone who fits.
3. Write a short version for each other network named, fitted to its length and norms.
4. Check the text for exclusionary or proxy language and list what was avoided or changed.
</task>

<constraints>
- Use only facts from the input; do not invent benefits, pay, perks, team size or culture claims.
- No "rockstar", "ninja", "family" or "work hard play hard" clichés, and no "comment interested" bait.
- Under about 200 words for the main post; at most three hashtags.
</constraints>

<output_format>
## Main post
Ready to paste.
## Network versions
One short version per network.
## Check before posting
Bullets: [ADD] gaps, language checked, link works, the role is still open on the careers page.
</output_format>
