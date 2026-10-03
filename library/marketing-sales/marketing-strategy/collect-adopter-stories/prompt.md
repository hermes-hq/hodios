---
schema: 1
id: collect-adopter-stories
kind: prompt
title: Collect user stories and case studies for an open-source project
description: Plans how an open-source project finds real adopters without telemetry, asks them for a story, interviews them and publishes approved case studies and an adopters list. Use when you need proof of use.
category: marketing-strategy
version: 1.0.0
status: incubating
stage: [discover, build]
role: [maintainer, developer-advocate, founder, marketer]
requires: [none]
inputs: [text, notes]
output: [plan, message, questions]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: optional
level: intermediate
tags: [open-source, case-study, adopters, social-proof, adopter-stories, testimonials]
pairs_with:
  prompts: [write-case-study, request-customer-testimonials, interview-lapsed-users]
  personas: [developer-advocate]
args:
  - name: project
    description: What the project does, who uses it, and the signals of use you can already see (issues from companies, mentions, dependents, Discussions posts, conference talks by users).
    type: text
    required: true
  - name: formats
    description: What you want to publish.
    type: string
    default: an ADOPTERS file, three short case studies and quotable lines for the README
output_contract:
  format: markdown
  sections: [Where adopters already show up, Asks, Interview guide, Story template, Approval and consent, Publishing plan]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Real users are the most persuasive proof an open-source project has, and most projects cannot see them because there is no telemetry. They still leave traces people chose to make public: issues and discussions that mention their company or setup, the GitHub "Used by" dependents list, blog posts and talks, job posts naming the tool, and replies in community channels. Mature foundations make adopter lists normal: CNCF graduation, for example, asks for a public adopters list. A pinned "Who is using this?" discussion and an adopters file that accepts pull requests let users add themselves. Every quote and logo needs explicit permission; many companies require legal or communications approval before their name appears.
</context>

<task>
<project>
{{project}}
</project>
Formats wanted: {{formats}}.

If you cannot tell who the users are likely to be, ask for the signals of use you have and stop.

1. **Where adopters already show up.** List the public places to look for this project, with what each reveals and how reliable it is as evidence of real use (a dependent repo can be a toy; a production incident report is strong).
2. **Asks.** Write three messages, each under 120 words:
   - a pinned community post inviting users to add themselves to an adopters file or reply with how they use it;
   - a personal message to a specific user who already mentioned the project publicly, asking for a 20-minute story interview;
   - a line for the README and release notes inviting stories.
   Each must make saying no easy and say exactly what will be published and that they approve it first.
3. **Interview guide** (20 minutes): their situation before, what triggered the search, what they tried, why they chose this project, how they set it up, what changed (with numbers they are willing to share), what still annoys them, and who else should use it. Ask for specifics and past events, not praise.
4. **Story template** for a short case study: the team and context, the problem in their words, why this project, how they use it, results (only numbers they confirmed), what they would warn others about, and a quote. Include the honest limitations; a story with one drawback reads as more credible than pure praise.
5. **Approval and consent.** The approval steps (draft to the interviewee, their company's sign-off if needed, written confirmation for name, logo and quotes), how to handle a later request to remove it, and what to do when they can share the story but not the company name.
6. **Publishing plan** for {{formats}}: where each piece lives, how to keep the adopters list current, and how to reuse stories (docs, talks, launch posts) without overstating them.
</task>

<constraints>
- Never fabricate, embellish or merge quotes; mark every quote [NEEDS APPROVAL] until confirmed.
- Never list a company or logo because it appears in dependents, stargazers or commit emails; listing requires their permission.
- Do not offer payment or perks in exchange for positive reviews; a thank-you that does not depend on what they say is fine.
</constraints>

<output_format>
## Where adopters already show up
| Source | What it shows | Strength of evidence |
## Asks
The three messages.
## Interview guide
## Story template
## Approval and consent
## Publishing plan
</output_format>
