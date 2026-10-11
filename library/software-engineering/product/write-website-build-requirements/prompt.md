---
schema: 1
id: write-website-build-requirements
kind: prompt
title: Write requirements for a website build
description: Writes requirements for a website project to brief agencies or freelancers, with goals, sitemap, content and CMS needs, integrations, hosting, accessibility, SEO, ownership and acceptance.
category: product
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, marketer, project-manager, product-manager]
stack: []
requires: [none]
inputs: [notes, url, text]
output: [docs, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [website, vendor-brief, cms, requirements]
pairs_with:
  prompts: [spec-app-idea-for-developers, define-non-functional-requirements, write-acceptance-criteria]
args:
  - name: project
    description: The organisation, why the site is being built or rebuilt, who visits it, and what visitors should do.
    type: text
    required: true
  - name: details
    description: Current site address and problems, pages and content you have, tools to connect (booking, shop, CRM, newsletter), budget range, deadline and who will update the site.
    type: text
output_contract:
  format: markdown
  sections: [Goals and audience, Sitemap, Content and CMS, Functionality and integrations, Technical and hosting, "Accessibility, SEO and privacy", Ownership and handover, Acceptance and timeline, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Website projects go wrong in predictable places: the brief says "modern, clean, mobile friendly" and every agency quotes a different project; content is assumed to be the agency's job while the client assumes the opposite, and launch slips by months waiting for text and photos; nobody planned redirects from old pages, so search traffic falls after launch; the site is built on a platform the staff cannot update; the domain, hosting and analytics accounts end up in the agency's name; accessibility is never mentioned, then a customer complains; forms send personal data somewhere nobody chose; and "done" was never defined. A good requirements document states goals and audiences, a sitemap with page purposes, who supplies content, who edits what afterwards and how often, integrations, hosting and maintenance expectations, accessibility and SEO requirements including redirects, privacy needs such as cookie consent, ownership of every account and asset, and acceptance criteria.
</context>

<task>
<project>
{{project}}
</project>
{{#details}}
<details>
{{details}}
</details>
{{/details}}

1. State goals and audience: the business goals the site serves with a measurable signal for each, the main audiences and the top tasks each comes to do.
2. Draft a sitemap: pages and sections with purpose and the key content or action on each, marking pages that need templates (blog posts, products, team members, locations).
3. Specify content and CMS: who writes and supplies text, images and video, whether migration of existing content is included, who updates which parts after launch and how often, editor roles, and preview and approval needs.
4. Specify functionality and integrations: forms and where submissions go, booking, shop or payments, newsletter, CRM, maps, search, multilingual content, and anything requiring accounts.
5. Specify technical and hosting needs: platform preference or constraints, hosting, backups, security updates, performance targets, browser and device support, and the maintenance or support arrangement after launch.
6. Specify accessibility, SEO and privacy: an accessibility target (for example WCAG 2.2 AA) to confirm, redirects from old URLs, page titles and metadata, analytics, cookie consent and privacy policy needs depending on countries, and form data handling.
7. Specify ownership and handover: domain, hosting, CMS, analytics and third-party accounts registered to the client, licences for fonts, images and themes, source code or theme ownership, documentation and training.
8. Specify acceptance and timeline: acceptance criteria and test checklist, review rounds, milestones, and what proposals must state (assumptions, exclusions, ongoing costs).
9. List open questions for the client to answer before sending the brief.
</task>

<constraints>
- Do not recommend a specific agency, product or price; describe needs and leave platform choice open unless the user has a constraint.
- Do not state legal requirements as facts; flag accessibility and privacy obligations as items to confirm for the countries involved.
- Make content responsibility explicit; never leave it implied.
- If the purpose of the site or the audience is unclear, ask before writing.
</constraints>

<output_format>
## Goals and audience
Table: goal, signal of success. Then audiences with top tasks.
## Sitemap
Table: page, purpose, key content or action, template (yes/no).
## Content and CMS
Bullets.
## Functionality and integrations
Table: function, details, connects to.
## Technical and hosting
Bullets.
## Accessibility, SEO and privacy
Bullets.
## Ownership and handover
Checklist.
## Acceptance and timeline
Checklist, then milestones.
## Open questions
Numbered list.
</output_format>
