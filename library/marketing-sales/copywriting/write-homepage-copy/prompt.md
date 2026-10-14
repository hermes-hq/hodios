---
schema: 1
id: write-homepage-copy
kind: prompt
title: Write homepage copy
description: Writes homepage copy for a product or company that serves several audiences, with a clear hero, who it is for, how it works, proof, paths to the right pages and calls to action.
category: copywriting
version: 1.0.0
status: incubating
stage: [build]
role: [marketer, copywriter, founder, product-manager]
requires: [none]
inputs: [text, notes]
output: [copy, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [homepage, website-copy, audience-routing, hero-section, conversion]
pairs_with:
  prompts: [write-value-proposition, write-landing-page-copy, write-about-page, write-headline-variations, critique-marketing-copy]
  personas: [copywriter]
  workflows: [website-copy-track]
args:
  - name: company
    description: What the company or product does, the main offers, prices or plans if relevant, what makes it different, and the pages that already exist or are planned.
    type: text
    required: true
  - name: audiences
    description: The groups who land on the homepage and what each needs (for example "small agencies want pricing, enterprise IT wants security, existing customers want to log in"). Mark which group matters most.
    type: text
    required: true
  - name: primary_action
    description: The main action for the most important audience, such as start a trial, book a demo, request a quote or shop the range.
    type: string
    required: true
  - name: proof
    description: Real proof you can show, such as customer logos you have permission to use, quotes with names, numbers, ratings or awards. Optional.
    type: text
  - name: current_homepage
    description: The current homepage text, if rewriting. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Visitor map, Homepage copy, Navigation and paths, Headline alternatives, Proof to collect]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a senior website copywriter. A homepage is not a landing page. A landing page serves one visitor with one goal; a homepage serves a mix: prospects arriving from a brand search or a referral, existing customers looking for login or support, job seekers, partners and press. Most homepage visitors already know the name and want three answers fast: what is this, is it for someone like me, and where do I go next. The common failures are a clever headline that does not say what the company does, a page that tries to fully persuade every audience at once, and a menu written in internal jargon.

The homepage's job is to orient and route: state the offer plainly, give enough proof to earn the next click, and send each audience to the page built for it, while making the main action obvious for the most important one.
</context>

<task>
<company>
{{company}}
</company>

<audiences>
{{audiences}}
</audiences>

Primary action: {{primary_action}}

{{#proof}}<proof>
{{proof}}
</proof>{{/proof}}

{{#current_homepage}}<current_homepage>
{{current_homepage}}
</current_homepage>{{/current_homepage}}

1. If you cannot tell what the company sells or who the main audience is, ask up to three short questions and stop. For smaller gaps, write the page and put assumptions in [square brackets].
2. Build a visitor map: each audience, what they need from the homepage in one line, and where they should go next. Rank them by importance.
3. Write the hero: a headline that says what the company does and for whom in plain words (a reader must be able to repeat what you do after reading it), a subhead with the main outcome and difference, a primary call to action for the top audience and a lower-commitment secondary action.
4. Write the sections below the hero in this order unless the inputs suggest otherwise: a proof strip, who it is for (one short block per main audience, each linking to its page), what you get or how it works (three steps or three pillars), deeper proof (quote or result), objection handling in two or three lines, and a closing call to action.
5. If rewriting, say in one line per section what changed from the current homepage and why.
6. Propose navigation labels in the visitor's words and the paths from the homepage to each audience's page.
7. Write three alternative hero headlines from different angles.
</task>

<constraints>
- Use only the proof supplied, and only logos the inputs say you may use. Put placeholders such as [Logo row: 5 customer logos with permission] or [Quote: agency owner on time saved] where proof is missing.
- The headline must say what the company does; wordplay is allowed only if the subhead immediately makes it plain.
- One primary call to action across the page, repeated; no more than one secondary action per section.
- Keep each audience block short and send the detail to its own page instead of cramming it onto the homepage.
- No unprovable superlatives, fake urgency or invented numbers. Plain language, grade 7-9, "you" more than "we".
</constraints>

<output_format>
## Visitor map
A table: Audience | What they need here | Next page | Priority.

## Homepage copy
Each section under its own label (Hero, Proof strip, Who it is for, How it works, Proof, Objections, Closing CTA), as final copy ready to paste. If rewriting, a "Changed" line under each section.

## Navigation and paths
Proposed menu labels and the path for each audience, with any page that needs to exist but does not.

## Headline alternatives
A table: Headline | Angle | When to use it.

## Proof to collect
Bullets: each placeholder and claim to verify. "None" if nothing is missing.
</output_format>
