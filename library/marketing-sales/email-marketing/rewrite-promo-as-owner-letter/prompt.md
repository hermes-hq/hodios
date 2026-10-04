---
schema: 1
id: rewrite-promo-as-owner-letter
kind: prompt
title: Rewrite a promo as an owner letter
description: Rewrites a designed promotional email as a short plain-text note from the owner, keeping the offer facts and one link, so a small business can test a human letter against its usual template.
category: email-marketing
version: 1.0.0
status: incubating
stage: [build, verify]
role: [founder, individual, copywriter]
requires: [none]
inputs: [text]
output: [rewrite, plan]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [plain-text-email, founder-voice, personal-note, template-vs-letter, split-testing]
pairs_with:
  prompts: [write-promo-email, plan-subject-line-ab-test]
args:
  - name: promo_email
    description: The designed promotional email as text - subject, preheader, headline, body, offer terms, buttons and links.
    type: text
    required: true
  - name: owner_name
    description: The name the letter is signed with, for example "Maria" or "Tom and Aisha".
    type: string
    required: true
  - name: story_detail
    description: A true detail the owner could mention - why this product exists, something that happened in the shop this week, a customer question. Optional; the letter works without one.
    type: text
output_contract:
  format: markdown
  sections: [Subject lines, Letter, Facts kept, Test setup]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You turn a designed, image-heavy promotional email into a short plain-text letter from the owner, {{owner_name}}. For small businesses, a note that reads like it came from a real person often gets more replies and clicks than a banner email, but not always, which is why it should be tested rather than assumed. A good owner letter is short, specific, written the way the owner talks, keeps every offer fact exactly, and has one link. It fails when it invents a heart-warming story, buries the offer, or hides the same banner email inside "Hi friend!".
</context>

<task>
<promo_email>
{{promo_email}}
</promo_email>

{{#story_detail}}<story_detail>
{{story_detail}}
</story_detail>{{/story_detail}}

1. Extract the offer facts: product or event, price or discount, code, eligibility, end date and time, the main link.
2. Write three subject lines that sound like a person writing to a customer (lowercase allowed, no emoji, no "Re:" or "Fwd:"), and a from-name suggestion such as "{{owner_name}} at [Shop name]".
3. Write the letter in plain text, 80-180 words: a first line that gets to the point, the one reason this matters to the reader, the offer facts in one or two sentences, one link written as a plain URL or a single short text link, a sign-off with the owner's name and an invitation to reply. Use the story detail only as given; if none, write without a story.
4. List the facts kept so the owner can confirm nothing changed.
5. Set up the test: a random 50/50 split of the same audience at the same time, primary metric unique clicks or orders per recipient, replies as a secondary signal (a letter invites replies, a banner rarely does). Size check per side: n ≈ 16 × p × (1 − p) ÷ d², where p is the usual click rate and d the absolute difference worth detecting. Show it with the user's click rate, or a labelled 2% assumption: about 2,000 per side only detects a jump from 2% to roughly 3.3%; spotting 2% versus 2.4% needs about 20,000 per side. If the list is smaller, call the result directional, repeat the same comparison over three or four sends and judge the pooled totals.
</task>

<constraints>
- Keep every price, code, date and condition exactly as in the original. If two facts conflict, flag it instead of choosing.
- Never invent anecdotes, customer quotes, feelings or events. The letter may be warm without a story.
- Keep the unsubscribe link and the business's postal address in the footer; plain text does not remove those.
- If the original has no clear offer, ask what the reader should do and stop. If only the link, end date or another detail is missing, write the letter with [NEEDED: link] or [NEEDED: end date] and list the gap under Facts kept.
</constraints>

<output_format>
## Subject lines
Three numbered options and the from-name.

## Letter
The plain-text email, ready to paste.

## Facts kept
Table: Fact | Original | In the letter.

## Test setup
Bullets: split, timing, metric, the size check with numbers, how to read the result.
</output_format>
