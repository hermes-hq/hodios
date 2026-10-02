---
schema: 1
id: write-ai-use-policy
kind: prompt
title: Write a workplace AI use policy
description: Drafts a workplace AI use policy covering approved tools, data rules, disclosure, human review of outputs, prohibited uses, training and ownership, with points flagged for legal and HR review.
category: policies
version: 1.0.0
status: incubating
stage: [build]
role: [founder, executive, operations-manager, manager]
subject: [law]
requires: [none]
inputs: [text]
output: [docs, table, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [ai-governance, acceptable-use, data-classification, hr-policy]
pairs_with:
  prompts: [write-workplace-policy, assess-ai-act-obligations, write-employee-handbook]
  personas: [compliance-officer]
args:
  - name: organisation
    description: What the organisation does, size, sector, where it operates, what AI tools people already use (approved or not), the kinds of data staff handle (client confidential, personal, health, source code) and any client or regulatory commitments about AI.
    type: text
    required: true
  - name: risk_areas
    description: The specific worries or uses to address, for example "client confidentiality", "AI in hiring", "code assistants", "published content", "meeting transcription". Optional.
    type: text
output_contract:
  format: markdown
  sections: [Decisions to make, Policy, Tool register, Rollout plan, Review with legal and HR]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write AI use policies that staff actually follow. Policies that ban everything get ignored and push use onto personal accounts where the organisation has no control; policies that say "use responsibly" give no guidance. What works is a short policy built on three things: which tools are approved and for what (with an easy path to request new ones), which data may go into which tools (tied to the organisation's existing data categories), and who is accountable for outputs (a named human reviews anything that leaves the building or affects a person). Laws and contracts add requirements: data protection law for personal data in prompts, client confidentiality and contract terms about AI, copyright and IP in generated material, employment law where AI touches hiring or monitoring, sector rules, and in the EU the AI Act's AI literacy duty and stricter rules for some uses.
</context>

<task>
Organisation:

<organisation>
{{organisation}}
</organisation>
{{#risk_areas}}

Risk areas to address:

<risk_areas>
{{risk_areas}}
</risk_areas>
{{/risk_areas}}

1. List the decisions leadership must make before the policy is final (for example which tools to approve, whether personal accounts are ever allowed, disclosure to clients, use of AI in decisions about people, monitoring of use), each with options and a one-line trade-off.
2. Draft the policy in plain language:
   - Purpose and scope: who it covers (staff, contractors), which tools count (chat assistants, code assistants, AI features inside existing software, meeting transcription, image generation).
   - Principles: a short list, phrased as behaviour.
   - Approved tools: tiers (approved for general use, approved for limited data or uses, not approved) and how to request a new tool.
   - Data rules: a table mapping the organisation's data categories to what is allowed in each tool tier, with concrete examples; never paste secrets, credentials or data you are not allowed to share.
   - Human review and accountability: who checks outputs before use, extra checks for facts, numbers, code, legal or medical content, and published material.
   - Disclosure: when to tell clients, readers or colleagues that AI was used.
   - IP and confidentiality: ownership of outputs, third-party rights, client contract terms.
   - Prohibited uses: specific to this organisation (for example automated decisions about hiring, pay or discipline without human review; impersonation and deepfakes; uploading client data to unapproved tools; covert recording).
   - Incidents: what to do if sensitive data was entered or an AI output caused harm, and who to tell.
   - Training and support, owner of the policy, review cadence, and consequences of breach in proportionate terms.
3. Build a tool register template (tool, tier, approved uses, data allowed, account type, data retention and training settings, owner, review date), pre-filled for tools named in the description with the settings to verify.
4. Give a rollout plan: announcement, training, quick-reference card, and how to bring existing unapproved use into the open without blame.
5. List the points to review with legal and HR, including employee consultation or works council requirements where they may apply, monitoring and privacy rules, and any AI Act duties if the organisation operates in the EU.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Tailor to the organisation's size and data. A ten-person agency needs two pages, not a corporate framework.
- Do not state as fact the data retention or training settings of any vendor; mark them "to verify in the vendor's current terms and admin settings".
- Do not invent laws or legal obligations; mark legal points for review.
- Keep consequences proportionate and avoid language that discourages people from reporting mistakes.
{{> output/uncertainty}}
</constraints>

<output_format>
## Decisions to make
Numbered: decision - options - trade-off.

## Policy
The full policy with numbered sections and the data rules table.

## Tool register
Table template, pre-filled where possible.

## Rollout plan
Numbered steps with owners and timing.

## Review with legal and HR
Numbered questions.
</output_format>
