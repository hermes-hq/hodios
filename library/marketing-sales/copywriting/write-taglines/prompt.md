---
schema: 1
id: write-taglines
kind: prompt
title: Write taglines and slogans
description: Generates tagline and slogan options across angles (benefit, attitude, category, promise) with notes on memorability, trademark and claim risk, and where each fits. Use for brands and campaigns.
category: copywriting
version: 1.0.0
status: incubating
stage: [build]
role: [marketer, copywriter, founder, designer]
requires: [none]
inputs: [text, spec]
output: [copy, ideas, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
tags: [taglines, slogans, brand-voice, campaign-lines]
pairs_with:
  prompts: [write-headline-variations, write-positioning-statement, write-messaging-framework]
  personas: [copywriter]
args:
  - name: brand
    description: The brand or product, what it does, for whom, what makes it different, and the existing name and any current tagline. Include competitors' taglines if you know them.
    type: text
    required: true
  - name: positioning
    description: Your positioning statement or the one idea you want to own. Optional.
    type: text
  - name: tone
    description: The voice you want (for example "warm and witty", "confident and minimal", "premium", "playful"). Optional.
    type: string
    default: true to the brand description
output_contract:
  format: markdown
  sections: [The idea to own, Options, Shortlist, Before you use it]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a brand copywriter who has written taglines for consumer and B2B brands. A tagline (a lasting line that sits with the logo) and a slogan (a campaign line that may change) both work only if they are short, ownable and true to one idea. The most common failures are lines that could belong to any competitor ("Quality you can trust"), clever lines that hide what the brand does, and promises the brand cannot keep. You generate widely, then judge hard.
</context>

<task>
Write tagline and slogan options for this brand.

<brand>
{{brand}}
</brand>

{{#positioning}}<positioning>
{{positioning}}
</positioning>{{/positioning}}
Tone: {{tone}}

1. Name the one idea the brand should own, in one sentence, drawn from the positioning or inferred from the brand description (say which). Note competitor lines to avoid echoing.
2. Write 16 to 20 options across these angles, at least three each:
   - **Benefit:** what the customer gets.
   - **Attitude:** the brand's point of view or personality.
   - **Category:** says plainly what the brand is or redefines the category, useful when the name is not self-explanatory.
   - **Promise:** a commitment the brand can keep.
   Add a few wildcard lines (wordplay, rhythm, a twist on a familiar phrase) if they fit the tone.
3. Score each line from 1 to 5 on: clarity (would a stranger understand it), distinctiveness (could a competitor say it), memorability (rhythm, length, sound) and truth (can the brand keep the promise).
4. Shortlist the best three to five, each with the placement it suits (logo lockup, website hero, ad campaign, packaging, social bio), and recommend one.
</task>

<constraints>
- Keep taglines to about two to seven words. Slogans can be longer if a campaign needs it.
- Avoid generic words that every brand uses ("solutions", "innovative", "excellence", "your partner in") unless twisted into something specific.
- Do not make claims the brand description cannot support (superlatives such as "the best", health, environmental or financial claims, "guaranteed"); mark any such line with its risk.
- Do not reuse or closely imitate well-known existing slogans. Flag any line that resembles a phrase you recognise from another brand.
- Write in the requested tone and the brand's language and market.
</constraints>

<output_format>
## The idea to own
One sentence, plus competitor lines to avoid.

## Options
A table: # | Line | Angle | Clarity | Distinctive | Memorable | True | Note. Use the Note column for risks such as a claim to substantiate or a resemblance to another brand's line.

## Shortlist
Three to five lines, each with its best placement and one sentence on why. Then the recommendation.

## Before you use it
Steps to clear the line: a trademark search in the markets where you sell (for example the USPTO, EUIPO or UK IPO databases), a web and app-store search for the exact phrase, checking the domain and social handles if it will become a campaign name, and testing it with a few customers for recall. Note that this is not a legal clearance.
</output_format>
