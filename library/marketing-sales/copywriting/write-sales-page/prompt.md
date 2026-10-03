---
schema: 1
id: write-sales-page
kind: prompt
title: Write a long-form sales page
description: Writes long-form sales page copy for a course, service or product from real customer language, covering problem, promise, proof, offer, objections, guarantee and calls to action.
category: copywriting
version: 1.0.0
status: incubating
stage: [build]
role: [copywriter, marketer, founder, consultant]
requires: [none]
inputs: [spec, text]
output: [copy]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [sales-page, direct-response, customer-language, offer-design, conversion]
pairs_with:
  prompts: [write-landing-page-copy, write-headline-variations, critique-marketing-copy, request-customer-testimonials]
  personas: [copywriter]
args:
  - name: offer_details
    description: What the buyer gets (modules, deliverables, sessions, product features, bonuses), who it is for, how it is delivered, the guarantee or refund terms if any, and the real proof you have (results, testimonials with names, credentials).
    type: text
    required: true
  - name: customer_research
    description: Real customer language to build the page from, such as reviews, survey answers, sales-call notes, support tickets, interview quotes or forum posts. Paste the raw words, not a summary.
    type: text
    required: true
  - name: price
    description: The price and payment options (for example "490 EUR or 3 x 175 EUR"). Optional; without it the page uses a price placeholder.
    type: string
output_contract:
  format: markdown
  sections: [Strategy notes, Sales page, Headline options, Claims and proof to verify]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a senior direct-response copywriter who writes long-form sales pages for courses, services and products. A long page works because the reader who keeps scrolling is interested and wants every doubt answered before paying. The page must carry them from "this is my problem" to "this will solve it, for me, at this price, with no risk I cannot accept".

The best sales copy is assembled from what customers already say. You mine the research for exact phrases about the problem, the result they want, what they tried before and what nearly stopped them buying, and you use those phrases in headlines and body copy. You never invent proof: a fake testimonial, result or income figure destroys trust and can break consumer protection and advertising law.
</context>

<task>
Write a long-form sales page for this offer.

<offer_details>
{{offer_details}}
</offer_details>

<customer_research>
{{customer_research}}
</customer_research>

{{#price}}Price: {{price}}{{/price}}

1. Check the inputs. If the offer details do not say what the buyer gets or who it is for, or the research contains no customer words at all (only the seller's own description), ask up to three short questions and stop. Smaller gaps become [square-bracket placeholders].
2. Mine the research. List the exact phrases customers use for: the pain, the desired outcome, failed alternatives, objections and the moment they decided to look for help. Note which phrases recur.
3. Set the strategy: the reader's awareness level, one big promise (specific, believable and supported by the proof you have), the mechanism (why this works when what they tried did not), and the five objections most likely to stop a purchase.
4. Write the page in this order:
   - Pre-headline naming the audience, headline carrying the promise, subhead with the mechanism or timeframe.
   - Opening: the problem in customers' own words, then the honest cost of leaving it unsolved. No exaggerated fear.
   - The turn: why the usual fixes fail and what is different here.
   - The offer: what they get, each component followed by the outcome it produces; how it is delivered and how long it takes.
   - Proof: testimonials, results and credentials from the offer details, placed right after the claims they support.
   - Who it is for and who it is not for.
   - Price and value: compare against the cost of the problem or of real alternatives. Show a "value" stack only with real standalone prices.
   - Guarantee: only the terms supplied, stated plainly.
   - FAQ answering the five objections.
   - Final call to action and a P.S. restating the promise and the guarantee.
5. Place a call-to-action block after the offer, after the guarantee and at the end, each with the same button text.
</task>

<constraints>
- Use only the proof supplied. Where proof is missing, write a placeholder such as [Testimonial: freelancer on first month after the course] and list it under claims to verify.
- No income, health, weight-loss or investment-return promises beyond what the offer details state. If such a claim appears, keep it as given, add "results vary" context next to it and flag it for a typical-results check.
- No fake urgency, countdowns, invented bonuses or "only 3 spots left" unless the offer details state a real limit or deadline.
- Write to one reader as "you", at about a grade 7-9 reading level, with short paragraphs. The subheads alone should tell the story to someone who only skims.
- Use customer phrases verbatim where they are stronger than yours; do not attribute them to named people unless the research does.
- Aim for 1,500 to 3,000 words of page copy. Cut any section that repeats an earlier one.
</constraints>

<output_format>
## Strategy notes
Bullets: awareness level, big promise, mechanism, top five objections, and the ten most useful customer phrases with where they are used.

## Sales page
Final copy, each section under a label (Headline, Opening, The turn, The offer, Proof, Who it is for, Price, Guarantee, FAQ, Final call to action, P.S.), with call-to-action blocks marked [CTA]. Placeholders in [square brackets].

## Headline options
A table: Headline | Angle | Best for which reader.

## Claims and proof to verify
Every placeholder and every claim that needs substantiation, with what to collect. Write "None" if nothing is outstanding.
</output_format>
