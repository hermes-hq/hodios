---
schema: 1
id: optimize-portfolio-for-search
kind: prompt
title: Optimise a portfolio for search
description: Reviews a freelancer's or creative's portfolio site so clients searching for the service find it, with a page per service and place, project write-ups in client words, images and a profile plan.
category: seo
version: 1.0.0
status: incubating
stage: [review, plan]
role: [designer, artist, writer, consultant]
requires: [none]
inputs: [text, url]
output: [report, plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [portfolio-site, freelancers, project-write-ups, creative-business]
pairs_with:
  prompts: [write-portfolio-site-copy, write-portfolio-case-study, optimize-image-search-visibility]
args:
  - name: portfolio_notes
    description: What the portfolio site has now - platform, pages and their titles, how projects are presented (images only or with text), the about and contact pages, and any directory or platform profiles you have.
    type: text
    required: true
  - name: services_and_location
    description: The services you want to be hired for and where your clients are (for example "wedding photography in Lyon and Annecy", "Webflow developer for UK startups, remote").
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Diagnosis, Page plan, Project write-ups, Titles and images, Profiles and links, First five actions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help freelance designers, photographers, illustrators, developers, writers and makers turn a portfolio into something clients find through search. Portfolios often fail for the same reasons: the homepage says a name and "creative studio" but never the service or the place, projects are image galleries with no text, every page is titled "Portfolio" or "Work", and the whole site competes for one vague phrase. Clients search with a service and often a place or niche ("brand designer for restaurants", "family photographer Bristol"), so each important service-and-place pair needs a page that answers it.
</context>

<task>
<portfolio_notes>
{{portfolio_notes}}
</portfolio_notes>

Services and location: {{services_and_location}}

1. Diagnosis: what a client would type to find this person, and whether any page currently matches it.
2. Page plan: one page per main service (and per place only where the person really works there and has projects to show), the homepage stating service, niche and place in the first line, an about page with real credentials, and a contact page with how to book and typical prices or starting rates if they are willing to share them.
3. Project write-ups: turn galleries into short case pages using the client's words: who the client was, the brief, the problem, what was made, the result or quote, the service and place. Suggest 150-400 words per project, with a template.
4. Titles and images: title tags and H1s per planned page, descriptive image file names and alt text patterns, compressed images, text not baked into images.
5. Profiles and links: the platforms and directories where clients in this field look (name only ones you are confident exist for this field and country), consistent name and links, and real link sources (clients' credit pages, collaborators, features, talks, local business groups).
6. First five actions, ordered by effect.
</task>

<constraints>
- Do not invent clients, results, testimonials, awards or prices; use [X] placeholders.
- Do not recommend pages for places the person does not serve or keyword-stuffed copy.
- If the services or target clients are unclear, ask one focused question and stop.
- Keep it realistic for one person's time: flag anything that needs a developer.
</constraints>

<output_format>
## Diagnosis
The searches clients use and how the site matches them now.

## Page plan
Table: Page | URL | Search it answers | Must include.

## Project write-ups
A fill-in template, then which existing projects to write up first.

## Titles and images
Title tag and H1 per page, file name and alt text examples.

## Profiles and links
Bullets: profiles to create or tidy and link sources to ask.

## First five actions
Numbered, with time estimates.
</output_format>
