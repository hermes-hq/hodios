---
schema: 1
id: vet-brand-name
kind: prompt
title: Vet a shortlisted brand name
description: Vets shortlisted brand names for meaning in key languages, pronunciation, domain and handle checks, trademark search steps and confusion risks, and says when to involve a trademark lawyer.
category: branding
version: 1.0.0
status: incubating
stage: [verify, review]
role: [founder, marketer, product-manager]
advice_risk: [legal]
requires: [none]
inputs: [text]
output: [report, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [name-screening, trademark-search, linguistic-check, domain-availability, brand-risk]
pairs_with:
  prompts: [name-brand, design-brand-architecture, plan-rebrand]
  personas: [brand-strategist]
args:
  - name: names
    description: The shortlisted names, one per line, with any notes on meaning or intended pronunciation.
    type: text
    required: true
  - name: markets
    description: Countries and languages where the brand will be sold or seen now and in the next few years, for example "Germany, France, Spain; later US and Brazil".
    type: text
    required: true
  - name: category
    description: The product or service category the name will be used for, for example "plant-based baby food" or "B2B payroll software". This decides the relevant trademark classes.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Scope and limits, Name-by-name screen, Linguistic and cultural check, Pronunciation and spelling, Digital and business-name checks, Trademark search steps, Confusion and reputation risks, Shortlist ranking, Next steps with counsel]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Teams fall in love with a name and then discover it means something rude in a key market, is impossible to spell from hearing it, has no usable domain or handle, or sits next to an existing trademark in their class. Each of those is cheaper to find before a logo and launch than after. A language model can do useful first-pass screening (meanings and associations, pronunciation, spelling, descriptiveness, obvious conflicts with well-known brands) and can lay out exactly how to run the searches. It cannot see live trademark registers or domain availability, cannot know every unregistered local use, and cannot give a legal clearance opinion; that is a trademark lawyer's job, and it is worth paying for before heavy investment.
</context>

<task>
Vet these names for use in {{category}}.

<names>
{{names}}
</names>

<markets>
{{markets}}
</markets>

1. **Scope and limits:** say once, briefly, what this screen covers and that it is not trademark clearance or a legal opinion.
2. **Name-by-name screen:** for each name, a short profile: construction (descriptive, suggestive, arbitrary, coined), what it suggests for {{category}}, and an initial read on distinctiveness. Explain that descriptive names are harder to protect and generic terms cannot be protected at all.
3. **Linguistic and cultural check:** for each language in {{markets}}, possible meanings, slang, unfortunate sound-alikes, and cultural associations. Mark each finding with your confidence (high, medium, low), and recommend checking with native speakers for any language where you are not confident, especially for slang and regional variants.
4. **Pronunciation and spelling:** how speakers of each market are likely to say it, whether people can spell it after hearing it, ambiguity in voice search and word of mouth, and characters or accents that cause problems in URLs or keyboards.
5. **Digital and business-name checks:** the domain extensions and social handles to check for each market, app store listings if the product is an app, and the company or business-name register in each market; how to check them (registrar searches, the platforms and stores themselves, the official company register); and fallbacks (a prefix or suffix, a different extension). Do not state whether a domain, handle or company name is available; you cannot see live data.
6. **Trademark search steps:** the relevant goods and services classes for {{category}} under the Nice Classification (name the likely classes and say they should be confirmed), and the registers to search for each market (for example the national office, the regional register where one exists such as the EU trade mark register, and the international register for marks designated through the Madrid system), plus free search tools that cover several offices at once, such as WIPO's Global Brand Database and TMview. Explain how to search for identical and similar marks (sound-alikes, spelling variants, translations) in the relevant classes, and that common-law or unregistered use can also matter in some countries.
7. **Confusion and reputation risks:** obvious similarity to well-known brands in or near the category that you know of, existing companies or products with the same or similar names that you are aware of (marked as "to verify"), and negative associations (news events, controversies) to search for.
8. **Shortlist ranking:** rank the names on linguistic safety, memorability and spelling, distinctiveness, and likely search effort, with a one-line reason each, and say which to take to a lawyer first.
9. **Next steps with counsel:** what to bring to a trademark lawyer (the names, the markets, the category and classes, launch dates, preliminary search results), and the decisions that need their opinion (clearance, filing strategy, priority).
10. Before answering, re-read every linguistic claim: remove any that you cannot support and lower confidence where you are unsure.
11. If the markets or category are missing, ask for them and stop.
</task>

<constraints>
- Never state that a name is "clear", "available" or "safe to register"; describe risks and the checks that remain.
- Do not invent existing trademarks or companies; mention only those you are confident exist, and mark them for verification.
{{> guardrails/professional-limits}}
- Keep the legal content general and point to qualified counsel for decisions.
{{> output/uncertainty}}
</constraints>

<output_format>
Markdown with the contract's sections in order. The linguistic check as a table (Name, Language, Finding, Confidence, Action). The ranking as a table (Rank, Name, Linguistic, Memorability, Distinctiveness, Search effort, Reason). Search steps as a checklist per market.
</output_format>
