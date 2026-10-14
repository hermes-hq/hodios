---
schema: 1
id: write-speculative-application
kind: prompt
title: Write a speculative application to an employer with no advertised job
description: Writes an unsolicited job application to an employer that has no advertised vacancy, aimed at a named person, tied to a need you can evidence, with a specific offer and an easy next step.
category: job-search
version: 1.0.0
status: incubating
stage: [build]
role: [job-seeker, student, individual]
requires: [none]
inputs: [resume, text]
output: [message, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [speculative-application, unsolicited-application, hidden-job-market, employer-research, cold-application]
pairs_with:
  prompts: [research-company, write-networking-message, write-hiring-manager-note]
args:
  - name: background
    description: Your CV or a summary of your experience, skills and achievements with numbers where you have them.
    type: text
    required: true
  - name: employer
    description: The organisation, what you know about it (news, growth, projects, problems, team), the kind of role you want, and the person you could write to if known.
    type: text
    required: true
  - name: country
    description: The country and industry, since norms for speculative applications differ. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Who to write to, The need you meet, Email, Short version, Follow-up, Gaps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a careers adviser. Many jobs are filled without being advertised, especially in small and growing organisations, so a well-aimed speculative application can work. Most speculative applications fail because they are generic ("I am writing to enquire about any vacancies"), go to a general inbox, and ask the employer to work out where the applicant fits. The ones that get replies are sent to a named person who could hire or refer (a team lead or founder rather than a careers inbox, unless the employer asks for that route), show the applicant has noticed something specific about the organisation (a new site, a product launch, a contract won, a growing team), connect it to one or two pieces of evidence from the applicant's record, propose a concrete role or contribution, and ask for something small, such as a 15-minute conversation. Norms differ: in some countries and sectors speculative applications are common and expected in a formal letter format, while elsewhere a short email or message works better.

<background>
{{background}}
</background>

<employer>
{{employer}}
</employer>
{{#country}}
<country>
{{country}}
</country>
{{/country}}
</context>

<task>
1. Who to write to: the best recipient type for this organisation and role, how to find the name ethically (the organisation's website, professional profiles, press releases), and whether the employer publishes a preferred route for speculative applications, which should then be used.
2. The need you meet: from the information given, the likely need or opportunity at the employer, labelled as an inference, and the one or two strongest matching pieces of evidence from the background.
3. Email (about 150 to 200 words): a specific subject line; an opening that shows a real reason for writing to this organisation now; the evidence of fit in two or three sentences with numbers where available; a concrete offer (the role or type of work); a small ask; and a note that the CV is attached. Adapt the format and formality to the country and sector if given.
4. Short version: a message of under 300 characters for a professional networking site.
5. Follow-up: when to follow up once (about a week or two later), a one-line follow-up, and when to stop.
6. Gaps: facts to verify or add, marked [NEEDED: ...].
</task>

<constraints>
- Use only facts from the background; never invent achievements, numbers or connections.
- Do not state facts about the employer that were not given; frame inferences as observations or questions.
- No flattery and no "any vacancy" phrasing.
- Do not suggest guessing private email addresses or contacting people through personal channels.
</constraints>

<output_format>
## Who to write to
## The need you meet
## Email
Subject line and body, with word count.
## Short version
## Follow-up
## Gaps
</output_format>
