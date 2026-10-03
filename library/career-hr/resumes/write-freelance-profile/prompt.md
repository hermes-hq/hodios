---
schema: 1
id: write-freelance-profile
kind: prompt
title: Write a freelance marketplace profile
description: Writes a freelance marketplace profile or gig description with a niche headline, client outcomes, proof, service packages and the search terms clients use. Use when setting up or fixing a profile.
category: resumes
version: 1.0.0
status: incubating
stage: [build]
role: [consultant, job-seeker]
requires: [none]
inputs: [notes, resume]
output: [copy, table, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [freelancing, marketplace-profile, gig-description, service-packages, niche]
pairs_with:
  prompts: [write-freelance-proposal, start-freelance-business, write-portfolio-site-copy]
args:
  - name: services
    description: What you offer, who you want to work for (industry, company size, type of client) and the kind of projects you want more of.
    type: text
    required: true
  - name: experience
    description: Your background, past projects with results, testimonials or reviews you can quote, tools and certifications, and your rates if set.
    type: text
    required: true
  - name: platform
    description: Optional. The marketplace and the format it uses (a profile with a title and overview, or gigs with packages), with any character limits you know.
    type: string
output_contract:
  format: markdown
  sections: [Positioning, Headline options, Overview, Packages, Search terms, Gaps and questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a freelancer who earns well on marketplaces and coaches others to do the same. Clients search a marketplace with problem words ("Shopify speed", "B2B SaaS blog writer"), skim a list of headlines and decide in seconds which profiles to open. Generalist profiles ("Web developer | Designer | Writer") rank and convert badly. Profiles that win name a niche and an outcome in the headline, open the overview with the client's problem rather than the freelancer's life story, show proof early, and make buying easy with clear packages or a clear first step.

<services>
{{services}}
</services>

<experience>
{{experience}}
</experience>
{{#platform}}
Platform: {{platform}}
{{/platform}}
</context>

<task>
1. Positioning. Choose the niche (who, what problem, what outcome) that the experience best supports and that has demand, in one sentence. If the services are broad, recommend the narrowest credible niche and say what the candidate gives up.
2. Write three headline options in the form "[Outcome or service] for [client type] | [proof or specialism]", within about 70 characters each (or the platform's limit).
3. Overview (150 to 300 words, the first two lines working on their own in the preview):
   - Open with the client's problem and the outcome the freelancer delivers.
   - Proof: two or three results or projects, and one short testimonial if given.
   - How working together goes: process in three or four steps, communication and turnaround.
   - Who it is not for, in one line, if that helps qualify clients.
   - A call to action: what to send in the first message.
4. Packages: three tiers (basic, standard, premium) or, for profile-based platforms, a clear starter offer. Each with deliverables, revisions, delivery time and price as [X] unless rates were given.
5. Search terms: ten to fifteen phrases clients in this niche would type, split into the ones to use in the headline, the overview and the skills or tags fields.
</task>

<constraints>
- Use only facts given. Never invent clients, reviews, results or certifications; use [placeholder] and list them in Gaps and questions.
- Client-centred language: more "you" than "I" in the overview.
- Use search terms naturally; never repeat keywords in a list for ranking.
- Do not promise outcomes the freelancer cannot control (rankings, sales numbers) or guarantee results.
- Follow the platform's limits and rules if given; if not, keep headlines under about 70 characters and the overview within the range above.
</constraints>

<output_format>
## Positioning
One sentence, plus what the niche gives up if it narrows the services.
## Headline options
Three options with character counts.
## Overview
Ready to paste, then "Words: N".
## Packages
Table: Package | Deliverables | Revisions | Delivery time | Price.
## Search terms
Grouped by where to use them.
## Gaps and questions
Numbered.
</output_format>
