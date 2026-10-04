---
schema: 1
id: write-school-achievement-posts
kind: prompt
title: Write school achievement posts
description: Writes posts celebrating pupil, staff and school achievements that follow photo consent and safeguarding rules, celebrate more than top performers, and read easily for families with limited English.
category: social-media
version: 1.0.0
status: incubating
stage: [build]
role: [teacher, manager, content-creator]
subject: [education-sector]
requires: [none]
inputs: [notes, text]
output: [post, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [school-communication, safeguarding, photo-consent, celebrating-students, plain-language]
pairs_with:
  prompts: [plan-nonprofit-social-media, write-short-social-posts]
args:
  - name: achievements
    description: What to celebrate this time (results, competitions, projects, attendance, kindness awards, staff milestones, community work), who was involved, and any photos you are thinking of using described in words.
    type: text
    required: true
  - name: consent_rules
    description: Your school's rules for pupils online (for example "first names only, no names with photos, pupils on the no-photo list never shown, no uniform badge close-ups"). Leave empty to apply the strict default of no pupil names and no identifiable photos without confirmed consent.
    type: string
    default: strict default
output_contract:
  format: markdown
  sections: [Posts, Photo and name check, Inclusion check, Simple English versions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A school, teacher or youth club wants to share good news with families and the community. Celebration posts carry real safeguarding risk: a full name next to a photo in uniform, a team photo with the venue and date, or a pupil on the no-photo list can let someone locate a child. They also carry an inclusion risk: if the account only ever celebrates top grades and sports trophies, most families never see their child's kind of success. And many families read in a second language or use translation tools, which fail on idioms and long sentences.

Consent rules: {{consent_rules}}
</context>

<task>
<achievements>
{{achievements}}
</achievements>

1. Apply the consent rules before writing. With the strict default: no pupil names, no identifiable faces without confirmed consent, group or back-of-head or hands-at-work shots, and no combination of full name, photo and school location. Staff may be named if they agree.
2. Write one post per achievement, or group small ones in a weekly round-up. Each post says what was achieved, the effort or process behind it (practice, teamwork, persistence), and thanks the people who helped (staff, parents, volunteers).
3. Celebrate a range: effort, progress, kindness, attendance, creativity, community service, not only winners. Avoid ranking pupils or naming who came last; never imply that pupils not mentioned have not achieved.
4. Avoid publishing individual grades, attendance figures, special educational needs, medical or family details for named or identifiable pupils.
5. For each post, describe the photo to use within the rules and give alt text.
6. Write simple English versions (short sentences, common words, no idioms, dates written out) that translate well, and suggest checking machine translations with a speaker before posting in other languages.
</task>

<constraints>
- Never invent results, names, numbers, quotes or events; mark missing details [X].
- If the notes break the consent rules (a full name with a photo, a child on the no-photo list, a location and time of a future trip), flag it in the check and write the safe version instead.
- Warm, proud, plain; under 90 words per post; at most two emoji; hashtags optional in camel case.
- If the achievement is unclear, ask before writing.
</constraints>

<output_format>
## Posts
One per achievement or a round-up, each ready to paste, with photo idea and alt text.

## Photo and name check
Table: post | names used | photo | consent rule applied | anything to confirm.

## Inclusion check
Two or three lines on the range of achievements covered and what to celebrate next time.

## Simple English versions
One per post.
</output_format>
