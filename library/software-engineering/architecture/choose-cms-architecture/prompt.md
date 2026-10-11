---
schema: 1
id: choose-cms-architecture
kind: prompt
title: Choose a CMS architecture
description: Chooses between a traditional, headless, hybrid or git-based CMS for a site or app, judging content model fit, preview, editor workflow, localisation and hosting.
category: architecture
version: 1.0.0
status: incubating
stage: [design, plan]
role: [fullstack-engineer, frontend-engineer, architect, tech-lead]
requires: [none]
inputs: [text, spec]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [headless-cms, content-modeling, editorial-workflow, content-preview, jamstack, trade-offs]
pairs_with:
  personas: [software-architect, frontend-engineer]
  prompts: [compare-design-options, design-content-versioning]
args:
  - name: project
    description: What the content is for (marketing site, docs, blog, app content, multi-brand), how many pages and content types, and the frontend or channels that consume it.
    type: text
    required: true
  - name: editors
    description: Who edits content, how technical they are, and the workflow they need (drafts, approvals, scheduling, localisation, roles).
    type: text
  - name: constraints
    description: Budget, hosting, existing stack, self-hosted or SaaS, compliance and the team's skills.
    type: text
output_contract:
  format: markdown
  sections: [Recommendation, Options compared, Content model sketch, Editor workflow and preview, Delivery and caching, Selection checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
CMS decisions fail when they are made by developers for developers. A traditional CMS (theme-rendered pages) gives editors the best what-you-see editing and preview, plugins for common needs, and the least development effort, at the cost of coupling content to one website and its security patching. A headless CMS stores structured content and serves it by API to any frontend or channel (web, apps, kiosks); it gives developers freedom, but editors lose in-context preview unless it is built deliberately, and page layout control needs a modelled approach (blocks or sections). Git-based CMSs store content as files in a repository, fit developer documentation and small marketing sites, and struggle with many non-technical editors, approvals and frequent changes. The content model matters more than the product: structured types with reusable fields enable reuse, localisation and multiple channels, while page-shaped blobs of rich text lock content into one layout. Localisation, roles and approvals, scheduled publishing, preview of drafts, and how publishing triggers rebuilds or cache invalidation are where projects slip. SaaS pricing often scales with users, locales or API calls, so expected growth needs checking before committing.
</context>

<task>
<project>
{{project}}
</project>
{{#editors}}
Editors: {{editors}}
{{/editors}}
{{#constraints}}
Constraints: {{constraints}}
{{/constraints}}

1. Identify the deciding factors: channels (one website or several), editor skill and number, workflow needs, localisation, content volume and change frequency, developer capacity, hosting and compliance constraints.
2. Compare traditional, headless (SaaS and self-hosted) and git-based approaches against those factors, and include a hybrid where it fits.
3. Recommend one style, explaining what editors gain and lose.
4. Sketch the content model: main types, key fields, references, reusable blocks, and how locales are stored.
5. Describe editor workflow and preview: drafts, preview of unpublished content in the real frontend, approvals, scheduling and roles.
6. Describe delivery: API or build-time fetching, caching, and webhooks or triggers that rebuild or invalidate on publish.
7. Give a checklist for evaluating specific products, without asserting product features or prices you are not sure of.
</task>

<constraints>
- Weigh the editors' experience as heavily as the developers'.
- Do not assert specific product features, limits or prices as facts; list them as things to verify.
- Do not recommend headless for a single simple website edited by non-technical staff without naming the preview and effort cost.
{{> output/uncertainty}}
</constraints>

<output_format>
## Recommendation
The CMS style and the main reason, in at most five lines.
## Options compared
Table: traditional, headless SaaS, headless self-hosted, git-based, against content model, editor experience, preview, localisation, developer effort, running cost, lock-in.
## Content model sketch
Main content types and their fields, structured rather than page blobs.
## Editor workflow and preview
How editing, preview, approvals and publishing will work.
## Delivery and caching
How content reaches the site or app and how changes invalidate caches.
## Selection checklist
What to verify when shortlisting specific products.
</output_format>
