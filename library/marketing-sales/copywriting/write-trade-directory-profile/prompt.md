---
schema: 1
id: write-trade-directory-profile
kind: prompt
title: Write a trade directory profile
description: Writes a profile for trade directories and quote platforms where customers compare providers side by side, plus first replies to job requests and replies to common review types.
category: copywriting
version: 1.0.0
status: incubating
stage: [build]
role: [founder, marketer]
subject: [construction]
requires: [none]
inputs: [text]
output: [copy, message, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [quote-platforms, trade-directory, lead-replies, review-replies, home-services]
pairs_with:
  prompts: [write-local-business-profile, reply-to-inbound-lead, write-project-showcase-captions, request-customer-testimonials]
args:
  - name: business_details
    description: Trade or service, areas covered, services and the jobs you want more of (and less of), years trading, qualifications, memberships and insurance you hold, how you quote and work, typical response time, and a few real reviews if you have them.
    type: text
    required: true
  - name: directory
    description: The directory or quote platform and any limits you know (character counts, number of photos, categories). Optional; a general format is used otherwise.
    type: string
output_contract:
  format: markdown
  sections: [Headline and summary, Services and areas, Credentials to verify, How we work, Photos to upload, Job request replies, Review replies]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write profiles for tradespeople, cleaners, tutors and other home-service providers on trade directories and quote platforms, where a customer posts a job or searches a category and compares several providers on one screen. On these sites the customer is choosing between near-identical cards, so the winners are specific (the jobs they want, the areas they cover), credible (checks and insurance the platform can verify, recent photos, reviews) and fast (the first sensible reply often wins the job). Profiles fail when they list every service, claim credentials the platform cannot show, or leave job requests unanswered for a day. This is different from a map listing: the profile has to win a side-by-side comparison and the reply is part of the pitch.

{{#directory}}Directory: {{directory}}{{/directory}}
</context>

<task>
<business_details>
{{business_details}}
</business_details>

1. If the trade, the area covered, or the services are missing, ask for them and stop.
2. Headline and summary: a headline that names the trade, the speciality and the area; a summary of 60 to 120 words that leads with the jobs wanted, then proof, then how to get a quote. If directory limits are given, respect them and show character counts.
3. Services and areas: the main services as the customer would search for them, the jobs you do not take (saves wasted leads), and areas by town or district with travel limits.
4. Credentials to verify: list each qualification, registration, membership and insurance mentioned, and what document the platform or customer may ask to see. Anything not supplied is not claimed.
5. How we work: quoting (free or paid, on site or from photos), deposits and payment, timescales, clean-up, and guarantees only if supplied.
6. Photos to upload: a shot list of eight to twelve photos (finished jobs, before and after, van and uniform, team at work), with privacy reminders (no house numbers or faces without permission).
7. Job request replies: three short first-reply templates (clear job, vague job needing photos, job outside your area or skills) that answer within the platform's rules, ask the one or two questions that make a quote possible, and give a next step.
8. Review replies: templates for a glowing review, a mixed review, and an unfair or wrong review, each calm, specific and under 80 words.
</task>

<constraints>
- Use only supplied facts. No invented years, ratings, review counts, qualifications, insurance amounts or guarantees; mark gaps as [X].
- Do not claim membership, registration or accreditation the user has not stated; regulated trades (gas, electrics, and others depending on the country) must only claim what they actually hold.
- Never write fake reviews, reviews for friends to post, or offers that reward only positive reviews.
- Review replies never reveal customer personal details or argue; offer to take it offline.
- Follow the platform's rules on sharing phone numbers or moving customers off the platform; if unknown, say to check them.
</constraints>

<output_format>
## Headline and summary
Headline and summary, with character counts if limits apply.

## Services and areas
Bullets: services, not offered, areas.

## Credentials to verify
Table: Credential | As stated | Document to have ready.

## How we work
Short paragraphs or bullets.

## Photos to upload
Numbered shot list.

## Job request replies
Three templates.

## Review replies
Three templates.
</output_format>
