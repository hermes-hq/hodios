---
schema: 1
id: choose-web-rendering-strategy
kind: prompt
title: Choose a web rendering strategy
description: Chooses SSR, static generation, incremental regeneration, client rendering or streaming per route of a web app from SEO, data freshness, personalisation and hosting cost.
category: architecture
version: 1.0.0
status: incubating
stage: [design]
role: [frontend-engineer, fullstack-engineer, tech-lead, architect]
requires: [none]
inputs: [text, spec, repo]
output: [table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [server-side-rendering, static-site-generation, crawlability, core-web-vitals, caching, web-app]
pairs_with:
  personas: [frontend-engineer, software-architect]
  prompts: [compare-design-options, set-performance-budgets]
args:
  - name: routes
    description: The app's main routes or page types, with who sees them (public, logged in), whether content is personalised, and how often data changes.
    type: text
    required: true
  - name: framework
    description: Framework or meta-framework and hosting, for example Next.js on a serverless host, Nuxt, Astro, SvelteKit or a single-page app behind a CDN.
    type: string
  - name: goals
    description: What matters most, such as search ranking, time to first content, low hosting cost, or simplicity.
    type: text
output_contract:
  format: markdown
  sections: [Recommendation, Per-route decisions, Caching, Performance risks, Cost and operations, What to verify]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Rendering is a per-route decision, not an app-wide one. Static generation is cheapest and fastest when content is the same for everyone and changes rarely; incremental or on-demand regeneration extends it to content that changes often but not per request. Server rendering suits pages that are personalised or must be fresh on every request and need fast first paint or SEO, at the price of server cost and a slow upstream making the whole page slow. Client rendering is fine behind login where SEO does not matter and the shell can be cached, but it leaves users staring at spinners on slow devices. Streaming lets the page shell arrive while slow parts load. Personalised data on an otherwise static page is better fetched on the client or at the edge than forcing the whole page to server rendering. The biggest real-world mistakes are caching personalised HTML at the CDN (one user's data served to another), rendering on the server but shipping so much JavaScript that hydration dominates, and data waterfalls where each component awaits the previous one. Field metrics from real users, not lab scores alone, decide whether a change helped.
</context>

<task>
<routes>
{{routes}}
</routes>
{{#framework}}
Framework and hosting: {{framework}}
{{/framework}}
{{#goals}}
Goals: {{goals}}
{{/goals}}

1. If a repository is available, list the existing routes and how each renders today before recommending changes.
2. For each route, record audience, whether the HTML differs per user, freshness need, SEO importance and upstream latency.
3. Assign a strategy per route with the reason. Prefer static or regenerated pages with client-side personalised fragments over full server rendering where that works.
4. Define cache rules per route: CDN cache time, revalidation trigger (time or on-demand after a content change), cache keys, and which responses must be private and never shared-cached.
5. Name performance risks for the chosen strategies (hydration size, waterfalls, slow upstreams, cold starts) and how to measure them with real-user data.
6. Note build time and hosting cost effects, such as thousands of statically built pages or per-request server compute.
</task>

<constraints>
- Never allow shared caching of HTML or API responses that contain user-specific data.
- Use the rendering features of the named framework as they actually exist; if unsure of an option name or default, say what to check in its documentation.
- Do not promise ranking improvements; rendering helps crawlability, it does not guarantee rank.
{{> output/uncertainty}}
</constraints>

<output_format>
## Recommendation
The default strategy and the exceptions in at most five lines.
## Per-route decisions
Table: route, audience, freshness, personalised, strategy, cache rule, reason.
## Caching
CDN and server cache rules, revalidation triggers, and what must never be cached.
## Performance risks
Hydration cost, waterfalls, slow upstream calls, and how to measure with field data.
## Cost and operations
What the choice means for hosting and build times.
## What to verify
Bullets of framework or host behaviours to confirm.
</output_format>
