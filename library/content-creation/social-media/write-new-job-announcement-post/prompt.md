---
schema: 1
id: write-new-job-announcement-post
kind: prompt
title: Write a new job or promotion announcement post
description: Writes a LinkedIn or similar post announcing a new job, promotion or work anniversary, with specific thanks, what you will work on and no humblebrag, within what your employers allow.
category: social-media
version: 1.0.0
status: incubating
stage: [build]
role: [individual, job-seeker, manager]
stack: [linkedin]
inputs: [text, notes]
output: [post]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [career-milestone, new-role, gratitude, personal-brand]
pairs_with:
  prompts: [write-linkedin-post, announce-role-change-to-contacts, write-thoughtful-linkedin-comments]
args:
  - name: news
    description: "What happened: new job, promotion or anniversary, the role and organisation, start date, what you will work on, and anything you are proud of from the previous role."
    type: text
    required: true
  - name: thanks
    description: "Optional: people or teams to thank and what each did for you (only names you are happy to publish and they would be comfortable with)."
    type: text
  - name: tone
    description: plain is short and understated; warm adds a personal note; reflective adds a lesson learned.
    type: enum
    enum: [plain, warm, reflective]
    default: warm
output_contract:
  format: markdown
  sections: [Post, Short version, Check before posting]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Career announcement posts are some of the most-read posts on LinkedIn, and most of them read the same: "I'm thrilled and humbled to announce...", a list of every colleague tagged, and nothing a reader remembers. The ones that land are short, say what the new role is in plain words, thank specific people for specific things, and give a hint of what the person will work on, so the right people get in touch. Leaving well matters too: no digs at the old employer, no confidential details about either company, and no announcement before the new employer is happy for it to be public. Tagging people who have not agreed can be awkward, and some people prefer not to be named.

<news>
{{news}}
</news>
{{#thanks}}
<thanks>
{{thanks}}
</thanks>
{{/thanks}}
Tone: {{tone}}
</context>

<task>
1. Identify the milestone (new job, promotion or anniversary) and the one thing a reader should take away. If the role or organisation is missing, ask for it and stop.
2. Write the post:
   - opening line that states the news plainly, without "thrilled and humbled";
   - one or two lines on what the role involves or what the person will work on;
   - for a move, one line on what they take from the previous role, said kindly;
   - thanks to specific people or teams with the specific thing they did, only from the thanks given;
   - optionally, an invitation that fits (for example "if you work on X, I'd like to hear from you").
3. Fit the tone: plain, warm or reflective, still under 150 words.
4. Write a short version of two or three sentences for people who prefer minimal posts or for other networks.
5. List checks before posting.
</task>

<constraints>
- Use only details the user gave; do not invent achievements, numbers, names or reasons for leaving.
- No negative comment about any employer, no confidential information, no salary.
- No engagement bait, no more than three hashtags, and no tagging suggestions for people not named in the thanks.
</constraints>

<output_format>
## Post
The post, ready to paste.
## Short version
Two or three sentences.
## Check before posting
Bullets: new employer is happy for it to be public, profile updated, people named are comfortable being named, any [ADD] gaps.
</output_format>
