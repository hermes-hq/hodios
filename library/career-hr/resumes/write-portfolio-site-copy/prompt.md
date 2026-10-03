---
schema: 1
id: write-portfolio-site-copy
kind: prompt
title: Write portfolio website copy
description: Writes portfolio website copy - a positioning headline, about section, project blurbs and a contact call to action - for designers, writers, developers and other creative professionals.
category: resumes
version: 1.0.0
status: incubating
stage: [build]
role: [designer, writer, software-engineer, artist]
requires: [none]
inputs: [notes, resume]
output: [copy, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [portfolio, personal-website, personal-brand, about-page, call-to-action]
pairs_with:
  prompts: [write-portfolio-case-study, write-freelance-profile, optimize-linkedin-profile]
args:
  - name: profession
    description: What you do and your specialism, for example "product designer for fintech apps" or "technical writer for developer tools".
    type: string
    required: true
  - name: projects
    description: Three to six projects you want to show - the client or context, your role, what you made and the result - plus any testimonials.
    type: text
    required: true
  - name: audience
    description: Optional. Who the site is for - hiring managers at a type of company, agency recruiters, or direct clients - and what you want them to do (hire you, book a call, commission work).
    type: string
output_contract:
  format: markdown
  sections: [Positioning, Home, Projects, About, Contact, Gaps and questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a creative director who has hired designers, writers and developers from their portfolio sites, and who writes site copy for creative professionals. Visitors give a portfolio a few seconds before deciding whether to look at the work. They need to learn three things fast: what this person does, for whom, and whether their work has made a difference. Most portfolio copy fails by being vague ("I'm a creative who loves solving problems"), by describing tools instead of outcomes, or by burying the work under a long biography. Good copy is specific, short, written for the visitor, and makes the next step obvious.

Profession: {{profession}}
{{#audience}}Audience and goal: {{audience}}{{/audience}}

<projects>
{{projects}}
</projects>
</context>

<task>
1. Positioning. One sentence: what the person does, for whom, and the outcome. If the audience was not given, infer the most likely one from the projects and say so.
2. Home: a headline (under about 10 words) and a one- or two-sentence subheading that make the positioning concrete, plus the primary call to action button label.
3. Projects: for each project, a title, a one-line hook (the problem or result), and a 40 to 70 word blurb: context, the person's role, what they did and the result. Order the projects with the strongest and most relevant first and explain the order in one line.
4. About (120 to 200 words, first person): how they work and what they are good at, one or two credibility markers (clients, years, awards, publications, only if given), and a human detail only if the person provided one. End with what they are looking for now.
5. Contact: a short invitation that says what kind of work or roles they want, what to include in a first message, and the expected response time as [placeholder].
</task>

<constraints>
- Use only facts given. Never invent clients, metrics, awards or testimonials; use [placeholder] and list each in Gaps and questions.
- Be honest about team work: say "I led", "I designed" or "with a team of four" as the projects describe, never claim sole credit for team results.
- If a project is under NDA or confidential, describe it generically and flag it.
- Outcomes over tools: name tools only where the audience screens for them (for example developers' stacks).
- Plain, confident language; cut "passionate", "creative problem-solver", "pixel-perfect", "ninja" unless the person insists.
</constraints>

<output_format>
## Positioning
## Home
Headline, subheading, button label.
## Projects
One block per project: title, hook, blurb. Then one line on the order.
## About
## Contact
## Gaps and questions
Numbered.
</output_format>
