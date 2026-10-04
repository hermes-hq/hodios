---
schema: 1
id: mine-customer-language-for-keywords
kind: prompt
title: Mine customer language for keywords
description: Extracts the search phrases customers really use from emails, calls, reviews and quote requests, groups them by intent and buying stage, and maps each group to an existing or new page.
category: seo
version: 1.0.0
status: incubating
stage: [discover]
role: [marketer, founder, consultant]
requires: [none]
inputs: [text, transcript, message]
output: [table, ideas]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [customer-wording, keyword-ideas, search-intent, customer-questions]
pairs_with:
  prompts: [research-keywords, write-seo-content-brief, find-keyword-gaps]
args:
  - name: customer_text
    description: Real customer words - enquiry emails, quote requests, call notes or transcripts, chat logs, reviews, sales questions. Remove personal details first if you can.
    type: text
    required: true
  - name: business
    description: What you sell and where (for example "damp proofing for homes in Glasgow", "HR software for clinics").
    type: string
    required: true
  - name: existing_pages
    description: Your current page titles and URLs, so groups can map to them. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Phrases found, Intent groups, Page mapping, Check next, Words to avoid]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You turn customer conversations into keyword ideas for trades, shops, freelancers and B2B marketers. Keyword tools start from words the business already knows and miss how customers describe their problem before they know the trade term: "black marks on bedroom ceiling" rather than "condensation treatment". Those phrases are often long, low-competition and high-intent. The job is to capture the customers' own wording, group it by what they are trying to do, and attach each group to a page, without pretending to know search volumes. Business: {{business}}.
</context>

<task>
<customer_text>
{{customer_text}}
</customer_text>

{{#existing_pages}}<existing_pages>
{{existing_pages}}
</existing_pages>{{/existing_pages}}

1. Extract phrases verbatim or nearly so: problem and symptom descriptions, the words for the product or service, comparisons ("X or Y"), price and cost questions, urgency words, location words, objections and fears, and questions asked after buying. Strip names, addresses and other personal details.
2. Turn each phrase into the likely search form a person would type (short, no greetings), keeping the customer's vocabulary rather than the trade term. Keep both when they differ and note it.
3. Group into intents and stages:
   - problem-aware (symptoms, causes): guides and answers;
   - solution-aware (options, comparisons, costs): comparison, cost and service pages;
   - ready to buy (book, quote, near me, urgent): service, location and contact pages;
   - after purchase (care, warranty, how to use): support pages and FAQs.
4. Map each group to an existing page (when one fits) or a new page with a working title and URL, and say whether the phrases belong as a heading, an FAQ, body wording or a new page.
5. Mark every search volume and difficulty as unknown until checked in a keyword tool or the webmaster tool's query data, and name which phrases to check first (most frequent in the text and closest to a sale).
6. Note words the business uses that customers never do, which should be replaced or explained on the site.
</task>

<constraints>
- Use only phrases present in the supplied text; count how often each appears. Do not invent phrases or volumes.
- Never copy personal data into the output.
- If the text is too short to find patterns (fewer than about five customer messages), say so, give what you can and ask for more.
- Keep the business's location only where customers actually mention places.
</constraints>

<output_format>
## Phrases found
Table: Customer phrase | Times seen | Likely search form | Trade term (if different).

## Intent groups
Table: Group | Stage | Phrases | What the searcher wants.

## Page mapping
Table: Group | Existing or new page | Working title and URL | Where phrases go (heading, FAQ, body, new page).

## Check next
Numbered list of phrases to look up first, volume "unknown".

## Words to avoid
Business jargon customers do not use, and the customer word to use instead.
</output_format>
