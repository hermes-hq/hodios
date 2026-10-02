---
schema: 1
id: write-product-review-post
kind: prompt
title: Write a product review post
description: Writes an honest product review post with use context, testing notes, pros and cons, who it suits and who it does not, alternatives and a disclosure. Use for blog and affiliate reviews.
category: blogging
version: 1.0.0
status: incubating
stage: [build]
role: [writer, content-creator]
inputs: [notes, text]
output: [article]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [product-review, affiliate-disclosure, pros-and-cons, hands-on-testing]
pairs_with:
  prompts: [write-blog-post-draft, refresh-old-blog-post]
args:
  - name: product
    description: The product's name and model or version.
    type: string
    required: true
  - name: experience_notes
    description: Your own notes from using it, including how long, for what, measurements, photos taken, what impressed or annoyed you, what you compared it with, price paid and how you got it (bought, loaned, gifted).
    type: text
    required: true
  - name: affiliate
    description: Whether the post will contain affiliate links or other paid relationships.
    type: boolean
    default: false
output_contract:
  format: markdown
  sections: [Review, Fill before publishing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a product reviewer and editor. Readers of reviews want to know one thing: should I, specifically, buy this? The reviews that help them, and that search engines increasingly reward, show first-hand evidence of use: how it was tested, for how long, in what conditions, with measurements, photos and comparisons; they say plainly what is bad as well as good, and who should buy something else. Reviews that read like rewritten spec sheets, praise everything, or hide commercial relationships lose readers' trust and, in many countries, break advertising rules on disclosure.
</context>

<task>
Product: {{product}}
Affiliate links or paid relationship: {{affiliate}}

<experience_notes>
{{experience_notes}}
</experience_notes>

1. Check the notes. If they are too thin to support a hands-on review (no real use, no specific observations), say so and list the specific tests and observations the writer should gather; then write only what the notes support, clearly framed.
2. Write the review:
   - **Title:** specific and honest, naming the product and the use case or verdict angle.
   - **Disclosure:** at the top, before any links. If affiliate is true, say plainly that the post contains affiliate links and the writer may earn a commission. If the notes say the product was gifted or loaned, say so. If neither, state that the writer bought it.
   - **Verdict up front:** two or three sentences: who it is for, the main strength, the main drawback.
   - **How I tested it:** duration, conditions, what was compared, measurements, from the notes only.
   - **What it does well** and **Where it falls short:** specific observations, each tied to a use case.
   - **Pros and cons:** a short list.
   - **Who should buy it, and who should not:** concrete profiles.
   - **Alternatives:** only alternatives the notes mention or that the writer tested; otherwise describe the type of alternative to consider and add `[ALTERNATIVE: …]` for the writer to fill.
   - **Price and value:** what the writer paid and when, framed as at the time of writing.
   - **Bottom line.**
3. Add photo and table suggestions where they would show evidence (for example a measurement table or a side-by-side comparison).
</task>

<constraints>
- Never invent test results, measurements, specifications, prices, durations, comparisons or experiences. Anything not in the notes becomes `[SPEC: …]`, `[TEST: …]`, `[PRICE as of DATE]` or `[ALTERNATIVE: …]`.
- Never write a review for a product the notes show the writer has not used as if it were hands-on. If asked to, decline that part and offer an honest alternative (a preview or a comparison based on published specifications, labelled as such).
- Keep the verdict consistent with the cons; do not soften real problems because of an affiliate relationship.
- Avoid marketing language ("game-changer", "must-have"); use specific, observable claims.
</constraints>

<output_format>
## Review
The full post in Markdown, ready for the writer to edit, with the disclosure first.

## Fill before publishing
Every placeholder, the claims to verify against the manufacturer's current information, and photo or table suggestions.
</output_format>
