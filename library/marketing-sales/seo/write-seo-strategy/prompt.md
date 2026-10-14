---
schema: 1
id: write-seo-strategy
kind: prompt
title: Write a 12-month SEO strategy
description: Writes a 12-month SEO strategy document with goals tied to revenue, the current state, priorities across technical, content and links, resources, milestones and how success is measured.
category: seo
version: 1.0.0
status: incubating
stage: [plan]
role: [marketer, founder, consultant, executive]
requires: [none]
inputs: [text, dataset, document]
output: [plan, docs]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [strategy-document, annual-plan, organic-growth, roadmap-planning, stakeholder-alignment]
pairs_with:
  prompts: [forecast-seo-traffic, prioritize-seo-audit-findings, research-keywords]
  personas: [seo-strategist]
args:
  - name: business
    description: What the business sells, to whom, how it makes money, its main competitors, and its business goals for the year.
    type: text
    required: true
  - name: current_state
    description: Current organic performance (traffic, conversions, top pages, branded versus non-branded share), known technical issues, content inventory, link profile summary and past SEO work.
    type: text
    required: true
  - name: resources
    description: Budget, people (in-house writers, developers, agency), and platform constraints.
    type: text
    required: true
  - name: audience
    description: Who will read the strategy, for example "CEO and board" or "marketing team". Optional.
    type: string
output_contract:
  format: markdown
  sections: [Summary, Goals, Where we are, Priorities, Roadmap, Resources, Measurement, Risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a head of SEO writing the strategy a leadership team will fund. A strategy is a set of choices, not a list of every SEO activity: which audiences and searches to win, which to ignore, and what the business will do differently to win them. Strong strategies tie goals to revenue or leads (with traffic as a leading indicator), base priorities on the site's actual constraints (a site with indexing problems should not lead with a content push), sequence work so early wins fund later bets, and are honest about time: content and links typically take months to compound, and results are affected by search engine changes and competitors.

Weak strategies promise rankings, list generic tactics, ignore resources, measure vanity metrics, and lack a way to know by month three whether the plan is working. You also plan for the changing results page, including AI summaries and answer engines, without abandoning fundamentals.
</context>

<task>
Write the strategy.

<business>
{{business}}
</business>

<current_state>
{{current_state}}
</current_state>

<resources>
{{resources}}
</resources>

{{#audience}}Audience: {{audience}}{{/audience}}

1. **Summary:** half a page a busy executive can read alone: the opportunity, the three or four choices, what it costs and what to expect when.
2. **Goals:** one business goal (leads, sales, sign-ups) and two or three leading indicators with targets as ranges and dates. Say how targets were derived and what data is missing.
3. **Where we are:** strengths, constraints and gaps from the current state, separating evidence from assumptions.
4. **Priorities:** three to five strategic priorities across technical health, content, authority and conversion of organic visits, each with why it matters now, what it includes, and what is deliberately left out.
5. **Roadmap:** quarter by quarter, with milestones and dependencies (for example the developer work that must ship before a content push).
6. **Resources:** people, hours, budget and tools mapped to the roadmap; flag where the plan exceeds the stated resources and what to cut.
7. **Measurement:** the reporting cadence, the dashboard metrics, the month-three and month-six checkpoints, and the decision rules ("if X has not moved by month six, we will…").
8. **Risks:** algorithm updates, AI answers reducing clicks, platform limits, resource gaps, and how each is mitigated.
</task>

<constraints>
- Do not promise rankings, traffic or dates; give ranges and conditions.
- Use only the numbers supplied; mark any needed figures as `[DATA NEEDED]`.
- Exclude tactics that break search engines' spam policies (bought links, doorway pages, scaled low-value content).
- Make choices: name what the plan will not do this year.
- Write plainly for the stated audience; define necessary jargon once.
</constraints>

<output_format>
## Summary
Short paragraphs.

## Goals
A table: Goal | Metric | Baseline | Target range | By when.

## Where we are
Bullets: strengths, constraints, gaps.

## Priorities
One subsection per priority.

## Roadmap
A table by quarter.

## Resources
A table and notes.

## Measurement
Bullets and decision rules.

## Risks
A table: Risk | Likelihood | Mitigation.
</output_format>
