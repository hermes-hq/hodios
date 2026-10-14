---
schema: 1
id: write-investor-cold-email
kind: prompt
title: Write a cold email to an investor
description: Writes a short cold email to a specific investor with no warm path - why this investor, a one-line company, the traction proof and a small ask - plus two follow-ups.
category: fundraising
version: 1.0.0
status: incubating
stage: [build]
role: [founder]
inputs: [notes, text]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [cold-outreach, investor-outreach, angel-investors, venture-capital, first-contact]
pairs_with:
  prompts: [write-investor-intro-request, build-investor-pipeline, write-investor-one-pager]
args:
  - name: investor
    description: Who you are writing to and why them - their fund or angel focus, stage and cheque size, relevant past investments, anything they have written or said that connects to your company. Use public information only.
    type: text
    required: true
  - name: company
    description: What the company does, for whom, the strongest traction numbers, the team's relevant background and the round (amount, stage, lead status).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Fit check, Subject lines, Email, Follow-up 1, Follow-up 2]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write cold emails from founders to investors. Warm introductions convert better, but a cold email that is specific can still get a reply. Investors skim on a phone in seconds: they look for why it was sent to them in particular, what the company does in one line, one hard number, and a low-effort ask. The common failures are long emails with the full deck story, generic flattery ("I love your portfolio"), buzzwords instead of facts, sending to an investor whose stage or sector does not match, and asking for a meeting before giving a reason to want one.
</context>

<task>
Write a cold email and two follow-ups.

<investor>
{{investor}}
</investor>

<company>
{{company}}
</company>

1. Fit check first: does this investor's stage, sector, geography and cheque size plausibly match this round, based only on the input? If there is a clear mismatch, say so and suggest what kind of investor would fit instead, then still write the email if the user may proceed.
2. Three subject lines under eight words, each carrying a concrete fact (traction, the specific connection, or the round).
3. The email, under 120 words: one sentence on why this investor specifically (a real, given reason), one line on what the company does, two or three proof points with numbers, the round in one line, and one small ask (a 20-minute call or permission to send the deck).
4. Follow-up 1 (about a week later): one new piece of information, not "just bumping this".
5. Follow-up 2 (about two weeks after that): short, gives an easy way to say no.
</task>

<constraints>
- Use only facts in the input. Never invent investments, quotes, traction or mutual connections. If the "why this investor" reason is weak or missing, write `[specific reason - e.g. a portfolio company or article]` instead of fake personalisation.
- No hype words ("disruptive", "revolutionary", "game-changing"), no exclamation marks, no attachments mentioned as already attached.
- Plain text that works in any email client; no bullet-heavy formatting beyond up to three proof points.
- Do not imply a lead or other investors have committed unless the input says so.
</constraints>

<output_format>
## Fit check
Two or three sentences.
## Subject lines
Numbered.
## Email
## Follow-up 1
## Follow-up 2
</output_format>
