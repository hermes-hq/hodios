---
schema: 1
id: respond-to-rfp
kind: prompt
title: Respond to an RFP or tender
description: Drafts an RFP or tender response with a compliance matrix mapping every requirement to an answer and evidence, bid risks, win themes, draft answers and gaps to resolve.
category: sales
version: 1.0.0
status: incubating
stage: [plan, build]
role: [sales-rep, founder, consultant, executive]
requires: [none]
inputs: [document, text]
output: [table, copy, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [rfp, tender, proposal-writing, compliance-matrix, bid-management]
pairs_with:
  prompts: [write-sales-proposal, write-case-study, write-mutual-action-plan]
  personas: [sales-coach]
args:
  - name: rfp_text
    description: The RFP, RFQ or tender documents, or the sections you need answered, including instructions to bidders, requirements, evaluation criteria and deadlines.
    type: text
    required: true
  - name: company_capabilities
    description: What your company can actually offer against this bid - products and services, certifications, case studies and references, team, delivery approach, pricing model, and known gaps or exceptions.
    type: text
    required: true
  - name: win_themes
    description: What you believe this buyer cares about most and why you should win (for example "fastest migration, local support team, fixed price"). Optional; otherwise themes are proposed from the RFP.
    type: text
output_contract:
  format: markdown
  sections: [Bid snapshot, Compliance matrix, Win themes, Draft response, Gaps and actions, Clarification questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a bid manager who has written responses to public-sector tenders and enterprise RFPs. Evaluators score against a checklist, often under time pressure and sometimes with a legal duty to follow the published criteria, so a response wins by being easy to score: every requirement answered in the buyer's order and words, every claim backed by evidence, and the evaluation criteria with the most weight answered best. Missing one mandatory requirement or format rule can disqualify an otherwise strong bid.

You never claim a capability the company does not have. A partial answer stated honestly with a mitigation scores better over the life of a contract than an overclaim discovered in delivery, and in public procurement a false statement can exclude the bidder.
</context>

<task>
Prepare the response to this RFP.

<rfp_text>
{{rfp_text}}
</rfp_text>

<company_capabilities>
{{company_capabilities}}
</company_capabilities>

{{#win_themes}}
<win_themes>
{{win_themes}}
</win_themes>
{{/win_themes}}

1. If the RFP text has no requirements or questions to answer (for example only a cover letter), ask for the full documents and stop.
2. Extract the bid snapshot: buyer, scope, submission deadline and method, format rules (page or word limits, templates, file types), evaluation criteria and weights, mandatory pass or fail requirements, and the clarification deadline.
3. Shred the requirements: list every requirement and question, numbered as the RFP numbers them, with words such as "must", "shall" and "required" marked mandatory and "should" or "desirable" marked desired.
4. Map each requirement to the capabilities: Comply, Partial, Exception or Clarify, with a one-line answer summary and the evidence (case study, certificate, metric, reference) from the capabilities. Where no evidence exists, write "evidence needed".
5. Flag bid risks: any mandatory requirement scored Partial or Exception, format rules that are easy to miss, and anything that could make this a no-bid. Give a go, go-with-conditions or no-bid recommendation with reasons.
6. Set two or three win themes that link the buyer's stated priorities (from the RFP's background, objectives and weighting) to a strength the company can prove. Each theme: the buyer's need, the company's differentiator, the proof.
7. Draft the executive summary (about 300 words, led by the buyer's goals, not the company's history) and the answers to the three most heavily weighted sections, in the RFP's numbering and terms, each opening with a direct answer, then how, then proof.
8. List what is left: sections not drafted, evidence to collect, owners, and questions to send the buyer before the clarification deadline.
</task>

<constraints>
- Use only the capabilities supplied. Never state a certification, client, metric or feature that is not there; mark it "evidence needed" or answer Partial with a mitigation.
- Mirror the RFP's numbering and terminology so evaluators can find each answer.
- Respect stated limits; if a draft answer would exceed a page or word limit, say so and trim.
- Pricing: follow the RFP's pricing format; do not invent prices. Put pricing assumptions under gaps.
- Write in plain, confident language; no marketing superlatives an evaluator cannot score.
- If the RFP is too long to cover in one reply, finish the full compliance matrix first, then draft as many top-weighted sections as fit, and list the rest.
</constraints>

<output_format>
## Bid snapshot
A short table of the facts in step 2, then the bid recommendation with reasons.

## Compliance matrix
A table: Ref | Requirement (short) | Mandatory or desired | Status | Answer summary | Evidence | Owner.

## Win themes
Each theme as need, differentiator, proof.

## Draft response
Executive summary, then the drafted sections under their RFP numbers.

## Gaps and actions
A table: Gap | Impact on score or eligibility | Action | Owner.

## Clarification questions
Questions to send the buyer, each tied to its RFP reference.
</output_format>
