---
schema: 1
id: choose-book-categories-and-keywords
kind: prompt
title: Choose a book's categories and keywords
description: Chooses subject categories and retailer search keywords for a nonfiction book from what readers actually type and browse, with a primary category, fallbacks and the checks to run in the live stores.
category: nonfiction
version: 1.0.0
status: incubating
stage: [ship]
role: [writer]
requires: [none]
inputs: [notes, text]
output: [table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: intermediate
depth: specific
tags: [book-metadata, bisac, retailer-keywords, discoverability, self-publishing]
pairs_with:
  prompts: [generate-nonfiction-book-titles, plan-self-publishing, plan-nonfiction-book-launch]
args:
  - name: book
    description: Title, subtitle, the book's promise and reader, the main topics, and 2 to 4 books readers might also buy.
    type: text
    required: true
  - name: markets
    description: Where the book will be sold, for example US, UK, global English, or another language market. Category schemes differ by market.
    type: string
    default: global English
output_contract:
  format: markdown
  sections: [Reader search language, Subject categories, Keyword phrases, Checks in the live stores]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help authors set a nonfiction book's discovery metadata. Books are filed under industry subject codes (BISAC in North America, Thema internationally, BIC in some older UK systems) and retailers also index free keyword phrases. The common mistakes are choosing a category by what the book is about rather than where its readers browse, picking an over-broad category where the book cannot be seen, repeating words already in the title, and using competitor brand names or misleading terms, which retailers may prohibit. Category lists are updated periodically and retailers map them differently, so final codes must be chosen from the current official list.

<book>
{{book}}
</book>
Markets: {{markets}}
</context>

<task>
1. Reader search language: write the phrases a target reader would type when they have the problem the book solves (not the author's jargon), and the shelves they would browse.
2. Subject categories: propose a primary and two or three secondary subject areas, described in words with the likely BISAC or Thema heading path, for example "Business & Economics > Management". For each, say who browses there and how crowded it is likely to be. Mark codes as "to confirm in the current list".
3. Keyword phrases: seven or so phrases of two to five words, combining problem, reader and format, avoiding words already in the title and subtitle, and avoiding author names, other book titles and trademarks.
4. Checks in the live stores: what to search and look at before finalising (where the comparable books are shelved, what auto-complete suggests, retailer keyword rules).
</task>

<constraints>
- Do not state exact subject codes as correct; you cannot see the current list. Give heading paths and tell the author to confirm codes.
- Do not claim search volumes or rankings.
- No misleading categories chosen only because they are less crowded; the book must belong there.
- Note retailer keyword rules may forbid some terms; tell the author to read the current rules.
</constraints>

<output_format>
## Reader search language
Bullets.

## Subject categories
Table: Role (primary / secondary) | Heading path | Code to confirm | Who browses | Likely crowding.

## Keyword phrases
Numbered list with the reader intent behind each.

## Checks in the live stores
Checklist.
</output_format>
