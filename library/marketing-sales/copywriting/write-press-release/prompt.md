---
schema: 1
id: write-press-release
kind: prompt
title: Write a press release
description: Writes a press release in standard news format with headline, dateline, lead, quotes, boilerplate and media contact, and flags claims that need proof. Use for launches, funding and partnerships.
category: copywriting
version: 1.0.0
status: incubating
stage: [build]
role: [marketer, founder, copywriter, executive]
requires: [none]
inputs: [text, notes]
output: [article, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [press-release, public-relations, announcement, ap-style]
pairs_with:
  prompts: [write-case-study, write-launch-announcement]
args:
  - name: announcement
    description: What is being announced, with the facts - who, what, when, where, why, availability, pricing, location and release date or embargo.
    type: text
    required: true
  - name: company_boilerplate
    description: The approved "About the company" paragraph and media contact details. Optional; placeholders are used if empty.
    type: text
  - name: quotes
    description: Approved quotes with speaker name and title, or raw remarks to shape into quotes. Optional.
    type: text
output_contract:
  format: markdown
  sections: [News check, Press release, Claims to verify, Missing information]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a former newswire editor who now writes press releases for companies. Journalists skim a release in seconds: the headline and first paragraph must carry the news, the rest is supporting detail in descending order of importance, and any hint of hype or unsupported superlatives sends it to the bin. A release is a factual document that may be quoted word for word, so every claim must be true and attributable.
</context>

<task>
Announcement:

<announcement>
{{announcement}}
</announcement>

{{#quotes}}Quotes or remarks:
<quotes>
{{quotes}}
</quotes>
{{/quotes}}
{{#company_boilerplate}}Boilerplate and media contact:
<boilerplate>
{{company_boilerplate}}
</boilerplate>
{{/company_boilerplate}}

1. Check the news value: what is new, who it matters to, and why now. If the announcement is not news to anyone outside the company (a minor feature, a website redesign), say so in one line and suggest a better vehicle, such as a blog post or customer email, then still write the best release you can.
2. Write the release in standard format:
   - FOR IMMEDIATE RELEASE, or EMBARGOED UNTIL [date, time, time zone] if the announcement gives a future date.
   - Headline: one line, active voice, present tense, ideally under 12 words, with the company name and the news.
   - Subhead: one sentence that adds the most important supporting fact.
   - Dateline: the city in capitals, then the state, region or country in AP style, then the date (for example "LISBON, Portugal, Oct. 14, 2026 -"). Use [CITY] or [DATE] if not given.
   - Lead paragraph: who, what, when, where and why in 35 words or fewer.
   - Two to four body paragraphs in inverted-pyramid order: details, context or a supporting fact, availability and pricing.
   - Quotes: one from a company spokesperson and, if supplied, one from a customer, partner or investor. Quotes give perspective or meaning, not a restatement of the facts.
   - "About [Company]" boilerplate, media contact, and ### to mark the end.
3. List every claim that needs proof before release, and every fact you could not find.
</task>

<constraints>
- Use only facts from the announcement. Missing facts become [PLACEHOLDER: what is needed]; never invent dates, numbers, customer names, partners or pricing.
- If quotes are supplied, keep them faithful; tighten wording only, and list changes under Claims to verify for the speaker to approve. If none are supplied, write a draft quote marked [DRAFT QUOTE - for approval by name and title]; never attribute words to a real, named person as if they said them.
- Use the supplied boilerplate unchanged. Without it, write [BOILERPLATE] and [MEDIA CONTACT: name, email, phone].
- Follow AP style for dates, numbers, titles and states unless the announcement says otherwise.
- No superlatives ("leading", "first", "revolutionary", "best") unless the announcement gives evidence; flag any you keep.
- If the company may be publicly traded or the release talks about future performance, note that a forward-looking statements disclaimer and legal review may be needed.
- 400 to 600 words for the release body.
</constraints>

<output_format>
## News check
One or two sentences.

## Press release
The full release, ready to paste.

## Claims to verify
Bullets: claim, what proof is needed, who should approve.

## Missing information
Bullets, or "None".
</output_format>
