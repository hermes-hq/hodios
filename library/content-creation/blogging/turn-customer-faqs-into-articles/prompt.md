---
schema: 1
id: turn-customer-faqs-into-articles
kind: prompt
title: Turn customer FAQs into articles
description: Turns the questions a small business hears every day into helpful blog articles, grouping them, picking which deserve a full post and writing plain answers with placeholders for prices and times.
category: blogging
version: 1.0.0
status: incubating
stage: [plan, build]
role: [founder, marketer, writer]
requires: [none]
inputs: [text, notes, message]
output: [article, outline, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [customer-questions, shop-owners, helpful-content, answer-first, local-business]
pairs_with:
  prompts: [write-faq-from-documents, write-local-business-profile, write-how-to-article]
args:
  - name: questions
    description: The questions customers ask, in their own words if possible - from calls, emails, reviews, the counter - with how often you hear each, and your usual answer in rough notes.
    type: text
    required: true
  - name: business
    description: The business, what it does and where, for example "independent bike repair shop in Leeds" or "family dental clinic".
    type: string
    required: true
  - name: articles
    description: How many full articles to write.
    type: number
    default: 3
output_contract:
  format: markdown
  sections: [Question groups, Articles to write, Articles, Placeholders to fill]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help small businesses turn the questions they answer every day into articles that save phone time and earn trust. The questions people ask a plumber, florist or clinic are the same ones they type into a search box before choosing who to call. These articles fail when they turn into sales pages, dodge the question to force a call ("it depends, contact us"), quote prices that go stale, or never admit when the customer can sort it out alone. The honest "you probably don't need us for this, here's how" article is often the one that earns the next big job.

Business: {{business}}. Full articles: {{articles}}.
</context>

<task>
<questions>
{{questions}}
</questions>

1. Group the questions by what the customer is really trying to decide: cost, time, process (what happens at the appointment or job), "is this normal or urgent", do-it-yourself or call a professional, choosing between options, and aftercare.
2. Score each group for a full article: how often it is asked, how much is at stake for the customer, and whether the answer needs more than a paragraph. Questions with short answers go to a FAQ list instead; say so.
3. Pick the top {{articles}} and write each:
   - Title: the question in the customer's words, or a direct answer.
   - First paragraph: the honest short answer in two or three sentences, including "it depends" only with what it depends on.
   - Body: what it depends on, typical ranges or steps using placeholders, a "do it yourself" section where it is safe and honest, signs it needs a professional, and what to expect if they book.
   - What to do next: one short paragraph with the practical next step, which may be "you don't need us".
   - 400-800 words, plain words, short paragraphs and subheadings phrased as questions.
4. Keep the business owner's voice and examples from the notes.
</task>

<constraints>
- Never invent prices, times, guarantees, qualifications or statistics. Use [PRICE: what], [TIME: what] and [CHECK: what] placeholders and list them.
- Do-it-yourself advice must be safe and legal for a non-professional. Do not give DIY steps for gas, mains electrics, structural work or anything the notes flag as regulated; say to use a qualified professional.
- For clinics and health or care businesses, give general information only, add a line on when to see a professional or seek urgent care, and do not diagnose or recommend treatment for an individual.
- No pressure tactics or scare claims to drive bookings.
- If no questions are given, ask for at least five real customer questions and stop.
</constraints>

<output_format>
## Question groups
Table: group | questions in it | how often | full article or FAQ list.

## Articles to write
Numbered top picks with one line on why.

## Articles
Each article in full under its own subheading.

## Placeholders to fill
Table: article | placeholder | what the owner needs to supply.
</output_format>
