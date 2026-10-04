---
schema: 1
id: place-newsletter-paywall-break
kind: prompt
title: Place a newsletter paywall break
description: Decides where to split a paid newsletter post so the free preview stands alone, the break falls after a real payoff, and the upgrade line names what is behind it. Says when to keep a post free.
category: newsletters
version: 1.0.0
status: incubating
stage: [build, review]
role: [writer, content-creator]
requires: [none]
inputs: [document, text]
output: [report, rewrite]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [paywall, paid-subscriptions, free-preview, upgrade-copy, conversion]
pairs_with:
  prompts: [write-newsletter-issue, audit-newsletter-performance]
  personas: [newsletter-editor]
args:
  - name: draft_post
    description: The full draft of the post you plan to partly paywall, pasted as text. Mark any part you already think should be paid.
    type: text
    required: true
  - name: paid_offer
    description: What paid subscribers get in general (for example "weekly deep dives, full archive, monthly Q&A") and the price if you want it mentioned. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Verdict, Where to break, Free preview fixes, Upgrade line, Why this spot]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a paid newsletter writer decide where the paywall goes in one post. The free part of a paywalled post does two jobs: it is shared and read by people who will never pay, so it must stand on its own and leave them better off, and it is the writer's best sales page, so it must show the quality of what is behind the break. Writers usually get this wrong in three ways: the break comes after a throat-clearing intro so free readers get nothing and feel baited; the break comes so late that nothing worth paying for is left; or the upgrade line is a generic "subscribe to read more" that names nothing. Some posts should not be split at all: news readers need, public-interest or safety information, and pieces whose value is the whole argument.

{{#paid_offer}}Paid offer: {{paid_offer}}{{/paid_offer}}
</context>

<task>
<draft_post>
{{draft_post}}
</draft_post>

1. Map the post in one line per section: what each section gives the reader (context, a finding, a method, an example, an opinion, a resource).
2. Decide the verdict first: split, keep fully free (and why: public interest, safety, growth piece, the value is indivisible), or fully paid with a free teaser written separately.
3. If split, find the break by these rules:
   - The free part ends after at least one real payoff (an insight, a useful fact or a first step a reader can use), never mid-sentence or inside a list item. In a list post (ten tools, seven mistakes), break between items: the free items are complete and representative, not the weakest ones.
   - What is behind the break is the deepest, most specific or most reusable value: the full method, the data, the templates, the named examples, the writer's actual recommendation.
   - Aim for the free part to be roughly 25-50% of the post; say why if your choice falls outside that.
   - The last free paragraph creates an honest open loop: it names what comes next without pretending the free part was incomplete.
4. List the smallest edits that make the free preview stand alone: a cut, a moved paragraph, a sentence that closes a thought.
5. Write two upgrade lines that name exactly what is behind the break for this post, plus one that ties it to the paid offer if given. No guilt, no countdowns, no "you're missing out".
</task>

<constraints>
- Work only with the draft given. Do not invent findings, numbers, offers, prices or testimonials; if the paid offer or price is missing, write the upgrade line without them or use [price].
- Quote the exact sentence before which the break goes, so the writer can find it.
- Keep the writer's voice in any rewritten line; mark suggested wording as a suggestion.
- If the draft is too short or has no section worth paying for, say so plainly and suggest making it free or adding paid depth, naming what kind.
- Do not advise hiding sponsor disclosures, corrections or safety information behind the paywall.
</constraints>

<output_format>
## Verdict
Split, keep free or fully paid, in one sentence with the main reason.

## Where to break
The quoted sentence the break goes before, the approximate free share of the post in percent, and a one-line map of free versus paid sections.

## Free preview fixes
Up to five bullets, each an exact edit.

## Upgrade line
Three options, each under 40 words.

## Why this spot
Two to four bullets: what free readers get, what paid readers get, and the risk you weighed.
</output_format>
