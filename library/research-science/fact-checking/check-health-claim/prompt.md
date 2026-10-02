---
schema: 1
id: check-health-claim
kind: prompt
title: Check a health or nutrition claim
description: Checks a health or nutrition claim against the hierarchy of evidence and explains in plain words what the research does and does not show, without personal medical advice. For health news readers.
category: fact-checking
version: 1.0.0
status: incubating
stage: [verify]
role: [individual, writer, parent]
subject: [medicine]
requires: [web]
inputs: [text, url]
output: [report, explanation]
risk: network
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [health-news, evidence-hierarchy, nutrition-claims, relative-risk, misinformation]
pairs_with:
  prompts: [fact-check-claims, check-statistics-in-article, respond-to-misinformation]
  personas: [science-communicator]
args:
  - name: claim
    description: The claim in the words you saw it, for example "Turmeric works as well as ibuprofen for joint pain" or "Seed oils cause inflammation".
    type: text
    required: true
  - name: source
    description: Where you saw it - the article, post, video or advert, with a link or the text, and any study it cites.
    type: text
output_contract:
  format: markdown
  sections: [Short answer, What the claim says, What the evidence shows, Why the claim may be misleading, What this means for you, Sources]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Health claims often rest on a real study that shows much less than the headline. The strength of evidence depends on the kind of study: systematic reviews and meta-analyses of randomised trials sit at the top, then individual randomised trials, then observational studies (which show associations that may be due to confounding), then case reports, laboratory and animal studies, and expert opinion. Common distortions are presenting an association as cause, an animal or cell result as a human one, a relative risk without the absolute risk, a surrogate marker (such as a blood test) as a health outcome, a tiny or short study as definitive, and evidence funded or promoted by someone selling the product. Readers need a clear answer about what is known, without being told what to do with their own health.
</context>

<task>
Check this health claim.
<claim>
{{claim}}
</claim>
{{#source}}
<source>
{{source}}
</source>
{{/source}}

1. **What the claim says:** restate it precisely: who it applies to, what effect on which outcome, how large, and whether it implies cause.
2. **What the evidence shows:** search for the best available evidence, starting at the top of the hierarchy: systematic reviews (for example Cochrane), clinical guidelines from national health bodies, then large randomised trials, then observational studies. If the source cites a study, find and read it. For each piece of evidence, give the study type, population, size, outcome and result, using absolute numbers where available ("from 4 in 100 to 3 in 100").
3. **Why the claim may be misleading:** name each distortion you find (association presented as cause, animal or lab study, relative risk only, surrogate outcome, small or short study, cherry-picked study, conflict of interest, outdated evidence) and explain it in one or two plain sentences.
4. **Verdict:** supported, partly supported, not supported by good evidence, contradicted by good evidence, or too early to say. Say how certain the evidence is and why.
5. **What this means for you:** general context only: who should be cautious, possible harms or interactions the evidence mentions, and when the question is worth raising with a doctor or pharmacist.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Cite only sources you opened in this session, with links and dates. Never cite a study, guideline or statistic from memory, and never construct a URL. If you have no web access, say so at the top, explain what kind of evidence would settle the claim and where to look (systematic review databases, national health services, medicines regulators), and do not give a verdict.
- Prefer the most recent high-quality evidence, and say when guidance differs between countries or has changed.
- Do not tell the person to start, stop or change any medicine, supplement, diet or treatment. If the claim encourages stopping a prescribed treatment or delaying care, say clearly that they should talk to their doctor before changing anything.
- Be fair: if a claim is partly true, say which part, and do not dismiss it just because it is unfashionable or promoted commercially.
- Write for a non-specialist; explain any term like "confidence interval" or "placebo-controlled" in a few words.
</constraints>

<output_format>
## Short answer
The verdict in bold and two sentences.
## What the claim says
## What the evidence shows
Table: source (linked) | study type | who and how many | result.
## Why the claim may be misleading
Bullets.
## What this means for you
Short paragraph, with when to ask a doctor or pharmacist.
## Sources
Numbered list with links and dates.
</output_format>
