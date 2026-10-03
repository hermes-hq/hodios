---
schema: 1
id: design-help-center-structure
kind: prompt
title: Design a help-centre structure
description: Designs a help-centre structure from support ticket topics and existing articles - categories, an article list, naming, search terms, and the gaps to write first ranked by ticket volume.
category: customer-support
version: 1.0.0
status: incubating
stage: [design, plan]
role: [support-agent, technical-writer, manager, product-manager]
inputs: [ticket, text, dataset]
output: [outline, table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [help-center, knowledge-base, information-architecture, self-service, content-gaps, ticket-deflection]
pairs_with:
  prompts: [write-help-center-article, analyze-support-tickets, build-support-macros]
  personas: [customer-success-manager]
args:
  - name: ticket_topics
    description: What customers contact you about - a ticket export with tags or subjects, a list of top contact reasons with counts, or pasted sample tickets. Include the customers' own words where you can.
    type: text
    required: true
  - name: existing_articles
    description: Your current help articles - titles and categories, with views or search data if you have them. Leave empty if you are starting from scratch.
    type: text
output_contract:
  format: markdown
  sections: [Demand summary, Category structure, Article list, Naming rules, Search terms and synonyms, Gaps to write first, Maintenance, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a knowledge-base manager who has structured help centres for software, ecommerce and service businesses. You design from demand, not from the org chart: categories follow the tasks customers come to do ("Orders and delivery", "Billing", "Set up your account"), titles use customers' words rather than internal feature names, and every common ticket reason has an article that answers it. You keep the structure shallow (customers should reach an article in two clicks or one search), avoid one-article categories and catch-all "General" sections, and measure success by fewer repeat tickets and successful searches.
</context>

<task>
Design a help-centre structure from this demand.

<ticket_topics>
{{ticket_topics}}
</ticket_topics>
{{#existing_articles}}
<existing_articles>
{{existing_articles}}
</existing_articles>
{{/existing_articles}}

1. Demand summary: group ticket topics into customer intents (what the customer is trying to do or fix), with volume or share if counts were given, and note the customers' own wording for each. Separate intents that self-service can answer from ones that need an agent (account-specific, refunds needing approval, bugs, complaints).
2. Category structure: 5-9 top-level categories named for customer tasks, each with a one-line scope and optional sections. Order categories by demand. Avoid a "General" or "Miscellaneous" category; place each intent where a customer would look first.
3. Article list: under each category, the articles needed - one intent per article - with a proposed title, the ticket intents it covers, and its status: keep, rewrite, merge, split, retire or new. Map every existing article; flag duplicates and outdated or internal-jargon titles.
4. Naming rules: a short style for titles (task-based "How to..." or question-form "Why was I charged twice?", consistent verbs, customer vocabulary, no internal feature codes), with before-and-after examples from the list.
5. Search terms and synonyms: for the top intents, the words customers use that do not appear in titles (for example "cancel", "close account", "delete me", "stop subscription"), to add as keywords or synonyms.
6. Gaps to write first: new or rewritten articles ranked by expected ticket reduction (volume of the intent and how fully an article can answer it), with a one-line brief for each.
7. Maintenance: owners per category, a review cadence, triggers for updates (product change, policy change, a spike in a ticket tag), and the measures to track - searches with no result, article views followed by a ticket, top contact reasons over time.
8. Questions that would change the structure.
</task>

<constraints>
- Base the structure on the tickets and articles given. Never invent ticket volumes or search data; if counts are missing, rank by apparent frequency in the sample and say so.
- Use the customers' words for titles and categories, not internal team or feature names.
- Keep the hierarchy at most two levels below the home page (category, then optional section).
- Do not plan self-service for cases that need identity checks, refunds outside policy or human judgement; route those to contact options and say so in the article list.
- If the input mixes several products or audiences (for example buyers and sellers), propose whether to split the help centre by audience and why.
</constraints>

<output_format>
## Demand summary
Table: Intent | Volume or share | Customer wording | Self-service or agent.
## Category structure
Table: Category | Scope | Sections | Demand rank.
## Article list
Per category, a table: Title | Covers intents | Status | Existing article (if any).
## Naming rules
## Search terms and synonyms
Table: Intent | Customer terms to add.
## Gaps to write first
Numbered, with the brief and the reason for its rank.
## Maintenance
## Questions
</output_format>
