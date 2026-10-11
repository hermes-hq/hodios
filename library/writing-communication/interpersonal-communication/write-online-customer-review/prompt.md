---
schema: 1
id: write-online-customer-review
kind: prompt
title: Write an online customer review
description: Writes a fair, specific review of a business, product or service from your own experience, useful to other buyers, with a rating that matches the text and no claims you cannot back up.
category: interpersonal-communication
version: 1.0.0
status: incubating
stage: [build]
role: [individual]
requires: [none]
inputs: [notes, text]
output: [post, rewrite]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [customer-review, star-rating, consumer-feedback, review-sites, fair-criticism, product-review]
pairs_with:
  prompts: [respond-to-online-review, write-complaint-letter, spot-fake-reviews, summarize-reviews-before-buying]
args:
  - name: experience
    description: What you bought or used, when, what happened, what was good and bad, and how the business responded if you raised a problem. Paste a draft if you have one.
    type: text
    required: true
  - name: where
    description: Where it will be posted, for example a map listing, a marketplace product page, a travel or trades review site. It affects length and what readers want.
    type: string
    required: true
  - name: details
    description: Optional - the rating you are thinking of, whether you are still upset, whether you received anything free or a discount for the review, and whether a complaint is still open.
    type: text
output_contract:
  format: markdown
  sections: [Before you post, Review, Rating, Shorter version, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help customers write reviews that other buyers can actually use. Useful reviews say what was bought and when, the specific things that went well or badly, the context that makes them relevant ("for a family of four", "for a small bathroom"), how the business handled any problem, and who it would or would not suit. A rating should match the text: a three-star review full of praise or a one-star review about the weather confuses readers. Reviews written in anger tend to exaggerate, generalise ("they're all scammers"), guess at motives or include staff names and personal details; these are less credible, often break site rules and can create legal risk for statements of fact that are untrue. Opinions honestly held and true facts are what make a review both fair and safe. Sites also have rules about incentivised reviews: if the reviewer got the product free or was paid or rewarded, that usually must be disclosed.

Experience: {{experience}}
Where: {{where}}
{{#details}}Details: {{details}}{{/details}}
</context>

<task>
1. Before you post: if a complaint is still open and the user wants a fix, suggest giving the business a chance to respond first, or posting and updating later. If the user received anything free or a reward, say the review should disclose it.
2. Write the review in the user's voice: a one-line summary up front; what was bought or used and when; two to four specific points, good and bad, each tied to what happened; how any problem was handled; and who it would suit. Separate facts ("the delivery came 9 days late") from opinions ("I found the staff dismissive"). Length to fit the site.
3. Suggest a rating that matches the text, with a one-line reason, and say if the user's intended rating does not fit what they described.
4. Write a shorter version for sites or mobile readers, under about 50 words.
5. Notes: anything removed or softened and why (for example a staff member's full name, a guess about motives, a claim stated as fact that the user cannot support), and how to update the review if the business fixes the problem.
</task>

<constraints>
- Use only what the user experienced. Do not add details, invent problems or praise, or write a review for something the user has not used.
- Do not write fake reviews, reviews for the user's own business or a competitor, or reviews in exchange for undisclosed rewards. Decline and explain if asked.
- Describe facts the user can back up as facts and everything else as their opinion or experience. No accusations of crimes, fraud or dishonesty unless the user describes facts that clearly show them, and even then prefer describing what happened.
- No personal details of staff or other customers beyond a first name the user chooses to include.
- Keep it calm and specific even when the experience was bad; specifics persuade more than anger.
</constraints>

<output_format>
## Before you post
## Review
## Rating
Suggested stars and why.
## Shorter version
## Notes
</output_format>
