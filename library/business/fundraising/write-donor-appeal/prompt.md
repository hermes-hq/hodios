---
schema: 1
id: write-donor-appeal
kind: prompt
title: Write a donor appeal
description: Writes a donor appeal letter or email built on one person's story, the specific impact of a gift and a clear ask with amounts, plus subject lines and a follow-up. For nonprofits and charities.
category: fundraising
version: 1.0.0
status: incubating
stage: [build]
role: [writer, manager, marketer]
subject: [nonprofit]
inputs: [text, notes]
output: [copy, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
tags: [donor-appeal, fundraising-letter, year-end-appeal, storytelling, gift-ask]
pairs_with:
  prompts: [write-grant-application, write-crowdfunding-campaign]
  personas: [grant-writer]
args:
  - name: cause
    description: The organisation and the specific need this appeal funds - what the money will do, costs per unit of help (for example 30 pays for one night of shelter), deadline or match funding, and the audience (past donors, lapsed, new).
    type: text
    required: true
  - name: story
    description: One real person's or family's story, told with their consent - the situation, what your organisation did, and what changed. Note any details that must stay private.
    type: text
    required: true
  - name: ask
    description: The ask - suggested amounts, monthly or one-off, the format (printed letter, email, both) and how to give. Leave empty to have amounts proposed from the costs given.
    type: text
output_contract:
  format: markdown
  sections: [Appeal, Subject lines or envelope teaser, Reply device, Follow-up, Checks]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write fundraising appeals in the direct-response tradition. Appeals that raise money are about one identifiable person rather than statistics, make the donor the hero ("your gift" rather than "our programme"), connect a specific amount to a specific result, give a reason to act now, and ask clearly more than once. They read warmly and simply, and they respect the dignity and privacy of the person whose story is told.
</context>

<task>
Write the appeal.

<cause>
{{cause}}
</cause>

<story>
{{story}}
</story>
{{#ask}}
<ask>
{{ask}}
</ask>
{{/ask}}

1. Plan the appeal in four lines before writing: the one person, the problem in a single scene, what a gift does, and the reason to give now.
2. Write the appeal (about 400-600 words for a letter, 200-300 for an email):
   - Open with the person in a specific moment, not with the organisation.
   - Show the problem through their experience, with one or two concrete details from the story.
   - Bring the reader in: what their gift makes possible, linking each suggested amount to a tangible result using the costs given.
   - Give the urgency honestly (a deadline, a match, a season, a waiting list), only if it is in the input.
   - Ask clearly, at least twice, with the amounts and how to give.
   - Close with the outcome for the person and thanks, signed by a named person. Add a P.S. that restates the ask or the match.
3. Subject lines or envelope teaser: three options for email, or a teaser for a printed letter.
4. Reply device: a short response section with the gift amounts, monthly option and payment methods.
5. Follow-up: a short reminder email for non-responders and a thank-you message for donors that reports what their gift will do.
6. Checks: consent and privacy (names changed if needed, no identifying details without permission, dignity of the person), every figure traced to the input, and any claims to verify.
</task>

<constraints>
- Use only facts from the input. Never invent stories, quotes, statistics, matches or deadlines; mark missing facts as [NEEDED: …].
- Respect the person in the story: no pity language, no graphic detail for effect, and private details stay out. If consent is not mentioned, flag it in Checks.
- Write at a reading level most adults find easy: short sentences and paragraphs, everyday words, "you" more than "we".
- If no ask is given, propose three amounts based on the stated costs plus a monthly option, and say they are suggestions.
- Gift-aid, tax-deductibility and fundraising regulations vary by country; mention them only as items to check.
</constraints>

<output_format>
## Appeal
The plan in four lines, then the full letter or email.
## Subject lines or envelope teaser
## Reply device
## Follow-up
Reminder and thank-you.
## Checks
Checklist.
</output_format>
