---
schema: 1
id: write-investor-intro-request
kind: prompt
title: Write an investor intro request
description: Writes a warm intro request to an investor through a mutual contact - a short ask to the connector plus a forwardable blurb that says why this investor and why now.
category: fundraising
version: 1.0.1
status: incubating
stage: [build]
role: [founder]
inputs: [text]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [warm-intro, double-opt-in, investor-outreach, forwardable-email, startup-fundraising]
pairs_with:
  prompts: [build-investor-pipeline, write-pitch-deck-outline, write-investor-update]
  personas: [venture-capitalist]
  workflows: [fundraising-round-track]
args:
  - name: startup
    description: What you do in one or two sentences, the stage, the strongest traction numbers with dates, team highlights, and the round (amount, stage, who has committed).
    type: text
    required: true
  - name: investor
    description: The investor and firm, and why they fit - their thesis, relevant portfolio companies, a talk or post of theirs that relates, the cheque size and stage they invest at.
    type: text
    required: true
  - name: connector
    description: Who is making the intro, how well you know them, and how well they know the investor.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Note to the connector, Forwardable blurb, Before you send]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "The investor and connector arguments take long text, since they ask for thesis, portfolio and relationship details."}
---
<context>
You help founders get warm introductions to investors. Investors take intros far more seriously than cold emails, but only when the connector's credibility is not spent carelessly. The best practice is the double opt-in: the founder sends the connector a short note plus a separate, self-contained blurb the connector can forward unchanged; the connector asks the investor whether they want the intro; only then are both put in touch. A good blurb is short enough to read on a phone, says what the company does in plain words, shows the one or two strongest proof points, explains specifically why this investor, and makes the ask clear. It never pressures the connector.
</context>

<task>
Write an intro request.

<startup>
{{startup}}
</startup>

Investor: {{investor}}
Connector: {{connector}}

1. Note to the connector: under 100 words. A friendly opener suited to how well they know each other, the specific ask (an intro to this investor), why this investor in one line, an explicit easy out ("no worries if it's not a fit or not a good time"), and a mention that a forwardable blurb is below. Suggest asking the investor first (double opt-in).
2. Forwardable blurb: under 150 words, written so the connector can forward it unchanged:
   - Subject line: company name, a few words on what it does, and the round (for example "Intro: Acme - invoice auditing for restaurants, raising pre-seed").
   - One sentence on what the company does and for whom.
   - Two or three proof points with numbers and dates (traction, growth, notable customers, team).
   - Why this investor: a specific link to their thesis, portfolio or public views, not flattery.
   - The round: amount, stage, committed investors if any.
   - The ask: a 20-30 minute call; the deck available on request or linked if the founder prefers.
3. Before you send: a three-item checklist - confirm the facts and numbers, confirm the investor invests at this stage and cheque size, and check whether the investor has a competing portfolio company.
</task>

<constraints>
- Use only the facts given. Never invent traction, investors, portfolio companies or the investor's views; leave placeholders such as [NEEDED: portfolio company that fits] if the "why this investor" is missing.
- No hype words (revolutionary, disruptive, unicorn) and no claims about the investor that cannot be verified.
- If the connector barely knows the investor or the founder, say so and suggest how to adjust (for example ask whether they are comfortable making the intro, or find a closer connector).
- Plain text, no formatting the connector would have to clean up before forwarding.
</constraints>

<output_format>
## Note to the connector
## Forwardable blurb
Subject line, then the body.
## Before you send
</output_format>
