---
schema: 1
id: plan-customer-testimonial-video
kind: prompt
title: Plan a customer testimonial video
description: Plans a filmed customer testimonial with a story angle, open interview questions, a shot list, release and disclosure points and an edit structure with short cutdowns.
category: video
version: 1.0.0
status: incubating
stage: [plan]
role: [marketer, founder, content-creator]
requires: [none]
inputs: [notes, text]
output: [plan, questions, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [testimonial, customer-story, interview-questions, shot-list, release-form, endorsement-disclosure]
pairs_with:
  prompts: [request-customer-testimonials, plan-video-shoot, create-paper-edit]
args:
  - name: customer_story
    description: Who the customer is (role, organisation or situation), what they used, the problem before, what changed and any results you know, plus whether they received anything (discount, free product, payment).
    type: text
    required: true
  - name: video_use
    description: Where the video will run (website, paid ads, social, sales deck) and the lengths you need.
    type: text
  - name: production
    description: The production level available.
    type: enum
    enum: [phone, small-crew, agency]
    default: small-crew
output_contract:
  format: markdown
  sections: [Story angle, Interview questions, Shot list, Release and disclosure, Edit structure]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan customer testimonial videos for small businesses, agencies and marketing teams. The testimonials that persuade are specific before-and-after stories told in the customer's own words: what was going wrong, why they chose this product or service, the moment it worked, and what is different now. Scripting a customer's lines makes them stiff and can mislead viewers, so the craft is in the interview: open questions, asking the customer to answer in full sentences that include the question ("Before we started using X, our team..."), and following up on specific moments. B-roll of the customer in their real setting carries the edit. Advertising rules in many countries require testimonials to reflect genuine experience, results to be typical or clearly qualified, and any incentive or connection to be disclosed; the details differ by country and platform.
</context>

<task>
<customer_story>
{{customer_story}}
</customer_story>

{{#video_use}}
Where it will run:
<video_use>
{{video_use}}
</video_use>
{{/video_use}}

Production level: {{production}}.

1. Story angle: one sentence on the before, the turning point and the after, from the input. Name the viewer this story will persuade and the one doubt it should answer.
2. Interview questions: 12 to 15 open questions in order (warm-up, before, choosing, turning point, after, advice to someone like them), with one or two follow-up probes each. Include the instruction to answer in full sentences, and avoid leading questions that put words in their mouth.
3. Shot list for the production level: interview framing and setting, b-roll of the customer's real work or place, product-in-use shots, details and cutaways. For phone production, give framing, light and sound tips that fit one person with a phone.
4. Release and disclosure: points the release form should cover (use of name, image, voice and organisation; where and for how long it can run; approval of the final cut if promised; withdrawal), the disclosure needed if the customer received anything, and which result claims need checking against records before they run.
5. Edit structure: a main cut of 60 to 120 seconds (hook line from the customer, before, turning point, after, recommendation) and two or three 15 to 30 second cutdowns for the uses given, with which question each section's answer will come from.
</task>

<constraints>
- Never write lines for the customer to say or invent quotes, results or numbers. Use `[CUSTOMER ANSWER: ...]` markers in the edit plan.
- Results quoted in the video must be the customer's genuine experience and checked; if a result is unusual, plan a qualifier rather than presenting it as typical.
- The release and disclosure points are a checklist to take to a legal adviser or the business's own terms, not legal advice; say that rules vary by country and platform and paid ads may need extra review.
- If the customer is a child, a patient, or speaking about health or money outcomes, flag the extra care and consent this needs.
</constraints>

<output_format>
## Story angle
The angle, the target viewer and the doubt it answers.

## Interview questions
Numbered questions grouped by stage, with probes indented beneath each.

## Shot list
Table: shot | type (interview, b-roll, detail) | location | notes.

## Release and disclosure
Checklist of release points, the disclosure line if needed, and result claims to verify.

## Edit structure
The main cut as a table (section | seconds | source question), then each cutdown with its use and length.
</output_format>
