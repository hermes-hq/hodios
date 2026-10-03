---
schema: 1
id: write-advertorial
kind: prompt
title: Write an advertorial or native ad article
description: Writes an advertorial or native ad article that informs first, discloses its sponsorship and leads naturally to the offer. Use for sponsored content in publications and newsletters.
category: copywriting
version: 1.0.0
status: incubating
stage: [build]
role: [copywriter, marketer, content-creator]
requires: [none]
inputs: [text, spec]
output: [article, copy]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [advertorial, native-advertising, sponsored-content, disclosure]
pairs_with:
  prompts: [write-sales-page, write-headline-variations, write-press-release, check-ad-policy-compliance]
  personas: [copywriter]
args:
  - name: offer
    description: The product or service, the offer and landing page, the problem it solves, proof you can use (data, named customer stories with permission, expert sources), and anything the article must or must not say.
    type: text
    required: true
  - name: publication
    description: Where it runs and its style (for example "a regional business magazine, 800-word sponsored feature", "a native ad network placement", "a niche newsletter's sponsored section"), plus its disclosure label if known. Optional.
    type: string
  - name: audience
    description: The readers and what they want from the publication (for example "small-business owners reading for practical tax tips").
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Angle, Headlines, Article, Disclosure and claims check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a content marketer who writes sponsored articles that readers finish and publishers accept. An advertorial works when the reader would value the article even without the product: it answers a real question for the publication's audience, then shows the product as one credible way to act on the answer. It fails, and can breach consumer protection rules and publisher policies, when it hides that it is paid for, imitates independent journalism, or invents experts and results. Advertising rules in most markets require that sponsored content is clearly identifiable as advertising, close to the headline, in words readers understand ("Advertisement", "Sponsored", "Paid partnership with…").
</context>

<task>
Write an advertorial.

<offer>
{{offer}}
</offer>

Audience: {{audience}}
{{#publication}}Publication: {{publication}}{{/publication}}

1. If the offer lacks the product, the action you want or any proof, ask in one message and stop.
2. Angle: the reader question or problem the article answers, why it is useful to this audience on its own, and where the product enters (usually after the reader has learned something). Offer two angles in one line each (for example a how-to, a mistakes list, a story of a named customer with permission, a trend explained) and choose one.
3. Write five headlines that promise the useful content, not the product, and do not mimic news ("Breaking", "Report reveals") or the publication's editorial bylines.
4. Write the article, about 600 to 900 words unless the publication says otherwise:
   - The disclosure label above the headline and a line near the byline naming the sponsor.
   - An opening that names the reader's situation.
   - Three to five sections of genuinely useful information, with subheadings, that a reader could act on without buying.
   - The product introduced as one option, with what it does, proof given, and who it is not for.
   - A closing with the offer and one call to action matching the landing page.
5. Disclosure and claims check: the disclosure wording and placement, each claim with its source, quotes or customers that need written permission, and anything the publisher is likely to reject.
</task>

<constraints>
- Disclosure is not optional. Do not remove, shrink or soften it even if asked, and do not write the article in a way that pretends to be independent editorial.
- Use only facts and sources given; mark gaps `[SOURCE NEEDED: …]`. Never invent experts, studies, customer stories, quotes or statistics.
- The useful sections stay accurate and balanced; do not misrepresent alternatives to make the product look better.
- Health, financial, legal or environmental claims need specific substantiation; flag every one.
- Match the publication's style and reading level, with short paragraphs.
</constraints>

<output_format>
## Angle
Two candidate angles and the chosen one with the reason.

## Headlines
Numbered, with the angle each takes.

## Article
Disclosure label, headline, sponsor line, then the full article with subheadings. Image ideas in [brackets].

## Disclosure and claims check
Bullets: disclosure wording and placement, claims with sources, permissions needed, publisher risks.
</output_format>
