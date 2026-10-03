---
schema: 1
id: write-competitive-battlecard
kind: prompt
title: Write a competitive battlecard
description: Writes a one-competitor sales battlecard with where we win and lose, landmines, objection responses, proof points and discovery questions, every claim sourced or flagged.
category: product-launch
version: 1.0.0
status: incubating
stage: [ship]
role: [product-manager, marketer, sales-rep, founder]
requires: [none]
inputs: [text, document, notes]
output: [docs, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [battlecard, competitive-intelligence, sales-enablement, objection-handling, product-marketing]
pairs_with:
  prompts: [write-sales-enablement-brief, run-product-teardown, analyze-competitor-reviews]
  personas: [product-marketing-manager]
args:
  - name: competitor_info
    description: What you know about the competitor, with sources and dates where possible - website claims, pricing, reviews, win/loss notes, analyst notes, what reps hear in deals.
    type: text
    required: true
  - name: our_product
    description: Our product, the segment we sell to, our pricing, real strengths and known gaps, and any proof points we may use (customer names with permission, metrics, awards).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Quick take, How they pitch, Where we win, Where we lose, Landmines to set, Objections and responses, Proof points, Discovery questions, Pricing and packaging, Do not say, Sources and freshness]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a product marketing manager who writes battlecards that reps actually open mid-call. Bad battlecards are feature checklists, claim to win everywhere, repeat rumours as facts and go stale in a month. Good ones are honest about where the competitor is stronger, because a rep caught out by a false claim loses the deal and the company's credibility. They tell reps what to ask, not only what to say, and every claim can be traced to a source.
</context>

<task>
<competitor_info>
{{competitor_info}}
</competitor_info>

<our_product>
{{our_product}}
</our_product>

If either input is too thin to say anything specific (for example only the competitor's name), ask for the missing material and list what would help most (their pricing page, recent win/loss notes, reviews), then stop.

1. **Quick take.** Three lines: who they are, who they sell to, and the one-sentence way to position against them.
2. **How they pitch.** Their positioning and the claims reps will hear, in the competitor's own words where the input quotes them.
3. **Where we win.** The situations, buyer types and requirements where we are genuinely stronger, each tied to a fact from our_product.
4. **Where we lose.** Where they are stronger or a better fit, and what to do: qualify out early, reframe, or bring in a partner. Be candid.
5. **Landmines to set.** Questions a rep can ask early that make the buyer test the competitor on our strengths. Phrase them as legitimate evaluation questions, not traps.
6. **Objections and responses.** The objections reps will hear that come from this competitor's pitch ("They're cheaper", "They have X and you don't"). For each: acknowledge, reframe or answer, and the proof to use. Keep each response under 50 words and speakable.
7. **Proof points.** Customer evidence, metrics and third-party validation from our_product only, each with its usage condition (public, under NDA, ask marketing).
8. **Discovery questions.** Five to eight questions that reveal whether this is a deal we win or lose.
9. **Pricing and packaging.** How their pricing compares, from the input only, with the date it was observed, and how to handle price comparisons.
10. **Do not say.** Claims reps must avoid: anything unverified, disparaging, or about the competitor's financial health or legal issues unless public and relevant.
11. **Sources and freshness.** Each source with its date, a "last updated" line, and the facts to re-check soonest.
</task>

<constraints>
- Use only facts from the inputs. Mark anything from general knowledge as "unverified" and anything older than 12 months as "re-check". Never invent features, prices, customers or metrics for either company.
- Comparative claims must be accurate and provable; describe the competitor fairly and without insult. Comparative advertising rules apply to public material, and this card is internal only: label it "Internal - do not share with customers".
- Write for a rep reading it during a live call: short lines, no paragraphs over three sentences.
{{> output/uncertainty}}
</constraints>

<output_format>
Title: "Battlecard: [our product] vs [competitor] - Internal - do not share with customers"

## Quick take
## How they pitch
## Where we win
| Situation | Why we win | Proof |
## Where we lose
| Situation | Why they win | What to do |
## Landmines to set
## Objections and responses
| They say | You say | Proof |
## Proof points
## Discovery questions
## Pricing and packaging
## Do not say
## Sources and freshness
</output_format>
