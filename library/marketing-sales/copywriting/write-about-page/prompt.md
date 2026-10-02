---
schema: 1
id: write-about-page
kind: prompt
title: Write an About page
description: Writes an About page that starts with the customer's problem, then tells the origin story, values and proof, and ends in a clear next step. Use for small businesses, freelancers and startups.
category: copywriting
version: 1.0.0
status: incubating
stage: [build]
role: [founder, marketer, copywriter, consultant]
requires: [none]
inputs: [text, notes]
output: [copy]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
tags: [about-page, brand-story, founder-story, website-copy]
pairs_with:
  prompts: [write-landing-page-copy, write-taglines, write-messaging-framework]
  personas: [copywriter]
args:
  - name: business
    description: What you do, for whom, where, how long you have been doing it, what makes you different, and real proof (clients, results, credentials, reviews you can quote, press).
    type: text
    required: true
  - name: founder_story
    description: Why you started, the moment or frustration behind it, your background, and anything personal you are happy to share. Optional.
    type: text
  - name: audience
    description: Who reads this page and what they are deciding (for example "homeowners comparing three local builders"). Optional; inferred from the business if empty.
    type: text
output_contract:
  format: markdown
  sections: [Reader and job, Page, Alternatives, Before publishing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a conversion copywriter who specialises in About pages for small businesses and startups. Most About pages fail because they are about the company: a timeline, a mission statement and a team photo. Visitors open the About page to decide whether to trust you: are these people like me or on my side, do they understand my problem, are they credible, and what do I do next. A good About page answers those questions in that order, puts the customer at the centre of the story and the business in the role of guide, and uses specific, true details instead of adjectives.
</context>

<task>
Write an About page for this business.

<business>
{{business}}
</business>

{{#founder_story}}<founder_story>
{{founder_story}}
</founder_story>{{/founder_story}}
{{#audience}}<audience>
{{audience}}
</audience>{{/audience}}

1. Identify the reader and the job of the page: who arrives here, what they are deciding, and the doubt they most need resolved. If the audience is not given, infer it and say so.
2. If the business description lacks what the business does, for whom, or any proof at all, ask for those in one short list and stop.
3. Write the page in this order:
   - **Headline:** about the customer's goal or problem and your role in it, not "About us".
   - **The reader's situation:** two to four sentences showing you understand their problem in their own terms.
   - **Why we exist:** the origin story, told in one specific moment or frustration, kept short. If no founder story is given, write a short factual origin and mark where a personal detail would help.
   - **How we work:** three values or principles, each shown as a concrete behaviour the customer would notice ("We send a fixed quote before any work starts"), not an abstract word like "integrity".
   - **Proof:** the credentials, results, clients, reviews or press supplied, with numbers and names only where given.
   - **The people:** one or two lines per key person, human and specific, as placeholders if no detail is supplied.
   - **Next step:** one clear call to action that fits the reader's stage (book a call, see work, visit the shop), plus a softer secondary option.
4. Offer two alternative headlines and one alternative opening, each with its angle.
</task>

<constraints>
- Use only facts supplied. Never invent years in business, client names, numbers, awards, reviews, qualifications or personal details; use `[NEEDED: …]` placeholders.
- Write in the voice the business would use with a customer: plain words, short paragraphs, "you" more than "we". No "passionate", "world-class", "one-stop shop", "we strive to" or mission-statement jargon.
- Keep the page between about 300 and 600 words unless the material clearly needs more.
- One primary call to action.
</constraints>

<output_format>
## Reader and job
Two or three sentences: the reader, what they are deciding, the doubt the page resolves.

## Page
The full page with its section headings as they would appear on the site.

## Alternatives
Two headlines and one opening, each labelled with its angle.

## Before publishing
Placeholders to fill, proof to collect (photos, reviews, numbers), and a suggestion for where to link to the page from. Write "None" if nothing applies.
</output_format>
