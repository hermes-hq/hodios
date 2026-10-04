---
schema: 1
id: write-project-showcase-captions
kind: prompt
title: Write project showcase captions
description: Writes before-and-after and finished-job captions for a trade portfolio and social posts - problem, work done, materials, time and the customer's words - with permission and privacy checks.
category: copywriting
version: 1.0.0
status: incubating
stage: [build]
role: [founder, marketer, content-creator]
subject: [construction]
requires: [none]
inputs: [notes, text]
output: [copy, post, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [before-and-after, portfolio, job-photos, trades, home-services]
pairs_with:
  prompts: [request-customer-testimonials, write-case-study, write-local-business-profile]
args:
  - name: jobs
    description: One or more finished jobs - what the customer had (the problem), what you did, materials and products, how long it took, the area (town or district only), any customer feedback in their words, and whether they agreed to photos being shared. Rough notes are fine.
    type: text
    required: true
  - name: channel
    description: Where the captions go - website (portfolio entries), social (short posts) or both.
    type: enum
    enum: [website, social, both]
    default: both
output_contract:
  format: markdown
  sections: [Permission and privacy check, Website entries, Social captions, Photos for next time]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write job showcases for builders, decorators, landscapers, kitchen fitters, cleaners and other home-service businesses. Finished-job posts are the strongest proof a trade has, because buyers judge them on their own home: "they did a house like mine, with a problem like mine". Most captions waste that with "Another happy customer!" and a row of hashtags. A strong showcase follows problem, work, result: what was wrong or wanted, what was done and with what, how long it took, and what the customer said. It also protects the customer: no house numbers, street names or details that show when a home is empty or what is inside it.

Channel: {{channel}}
</context>

<task>
<jobs>
{{jobs}}
</jobs>

1. If a job lacks what was done or the starting problem, ask for it; if nothing usable is given, stop.
2. Permission and privacy check for each job: has the customer agreed to photos and their words being shared, and in what form (first name, initials, none)? Flag anything that needs removing from photos or text: house numbers, street names, car registration plates, faces (especially children), family photos, security systems, keys, valuables, and anything posted while the owner is away. Use area-level locations ("a 1930s semi in north Leeds").
3. Website entries (if website or both): a title that names the job and place type, the problem, the work (method, materials, brands if given), time taken, the result, and the customer quote. 80 to 150 words each.
4. Social captions (if social or both): a first line that stops the scroll by naming the before state or the change, three to five short lines of detail, a soft call to action ("Got a bathroom like the before? Message us for a quote."), and up to five relevant hashtags including the town if useful.
5. Suggest the photo set for future jobs: same angle before and after, wide and detail shots, a process shot, good light, and the privacy checks above.
</task>

<constraints>
- Use only details supplied. No invented quotes, ratings, prices, time frames or materials; mark gaps as [X].
- Customer words are quoted exactly; light trimming is fine, rewording is not. If there is no permission recorded, write the caption without the quote and mark "[permission needed]".
- No claims about standards, certifications or warranties unless supplied.
- No exact addresses, and do not post about a home in a way that reveals the owners are away or the property is empty.
</constraints>

<output_format>
## Permission and privacy check
Table: Job | Permission status | Remove or blur | Location wording.

## Website entries
One entry per job with title and body.

## Social captions
One caption per job, ready to paste.

## Photos for next time
Short checklist.
</output_format>
