---
schema: 1
id: write-honest-comparison-page
kind: prompt
title: Write an honest comparison or alternatives page for your own project
description: Writes a "X vs Y" or "alternatives to Y" page for a project you maintain that is fair enough to rank and be trusted, with verified dated facts, when to choose the other tool and a corrections policy.
category: seo
version: 1.0.0
status: incubating
stage: [build]
role: [maintainer, developer-advocate, marketer, founder]
requires: [none]
inputs: [text, url, document]
output: [article, table]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [open-source, comparison-page, alternatives-page, fair-comparison, competitor-content]
pairs_with:
  prompts: [write-comparison-post, analyze-competitors, audit-docs-seo]
  personas: [open-source-growth-strategist]
args:
  - name: our_project
    description: Your project - what it does, license, pricing, platforms, strengths and known weaknesses.
    type: text
    required: true
  - name: competitor
    description: The tool to compare with, plus facts about it from its own docs, pricing page and changelog, with links and the date you checked.
    type: text
    required: true
  - name: page_type
    description: The kind of page.
    type: enum
    enum: [versus, alternatives-to, migration-from]
    default: versus
output_contract:
  format: markdown
  sections: [Search intent, Facts table, Page, Corrections and upkeep]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
People who search "X vs Y" or "Y alternative" are close to a decision, so comparison pages convert well, and readers know the author has a stake. Google's guidance for reviews and comparisons asks for evidence, measurements where they exist, what sets each option apart, which option suits which situation, and drawbacks found through your own use; its helpful-content guidance treats pages written mainly to rank as low quality. The most trusted examples from open-source projects say plainly when the other tool is the better choice (SQLite's page on when a client-server database works better, or search engines that name where a competitor is stronger). An unfair page backfires: the competitor's users correct it in public, and the project looks dishonest everywhere it is shared.
</context>

<task>
<our_project>
{{our_project}}
</our_project>
<competitor>
{{competitor}}
</competitor>
Page type: {{page_type}}.

If the competitor facts have no sources or dates, say the page cannot be fair yet, list what to collect (their docs, pricing, license, changelog, a hands-on test), and stop.

1. **Search intent.** Who searches this, what decision they are making, and the three or four criteria that actually decide it for them.
2. **Facts table.** Each criterion with both tools' facts, the source link and the date checked. Mark claims from your side that are not yet backed by a test or doc as [NEEDS PROOF]. Mark competitor facts older than six months as [RECHECK].
3. **Write the page** for {{page_type}}:
   - a title and meta description that match the search wording without attacking the other tool;
   - a disclosure in the first lines that you maintain one of the tools;
   - a short summary: who should pick which, in two or three sentences;
   - the criteria, each with a fair paragraph and the facts;
   - "When to choose the other tool" with real reasons;
   - for alternatives-to pages, more than one alternative, including ones that are not yours;
   - for migration-from pages, the concrete steps, what does not carry over, and how long it takes;
   - a "last checked" date and a link to report corrections.
4. **Corrections and upkeep.** How to accept corrections (an issue template or email), how often to recheck facts, and which competitor changelog or pricing pages to watch.
</task>

<constraints>
- No disparaging language, no cherry-picked benchmarks, no outdated competitor facts presented as current, no using the competitor's trademark in a way that suggests affiliation.
- Every claim about either tool needs a source or is marked as needing proof.
- Do not invent features, prices, benchmarks or quotes for either side.
</constraints>

<output_format>
## Search intent
## Facts table
| Criterion | Our project | Competitor | Source and date |
## Page
The full page in Markdown.
## Corrections and upkeep
</output_format>
