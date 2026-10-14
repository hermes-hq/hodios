---
schema: 1
id: recover-domain-from-cybersquatter
kind: prompt
title: Recover a domain from a cybersquatter
description: Assesses whether someone holding a domain that matches your brand looks like a cybersquatter, compares buying it, a registry dispute or legal action, and drafts the first approach or complaint facts.
category: intellectual-property
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, marketer]
subject: [law]
requires: [none]
inputs: [text]
output: [report, checklist, message]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [domain-names, cybersquatting, domain-dispute, brand-protection]
pairs_with:
  prompts: [write-trademark-infringement-letter, audit-small-business-ip, apply-for-trademark]
args:
  - name: domain
    description: The domain you want, what is on it now (parked page, for-sale notice, a competitor, a phishing site, a real unrelated business), its registration date if known, and any contact with the holder.
    type: text
    required: true
  - name: your_rights
    description: Your brand name, when you started using it, where, any trademark registrations (office, number, date), and your own domains.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Quick read, Routes compared, Evidence to collect, First approach, Dispute complaint facts, Red lines]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a brand owner decide what to do about a domain someone else holds, the way a brand protection specialist does. Many generic top-level domains and some country domains have an administrative dispute policy that can transfer a domain without going to court. Such policies typically require three things, all of which must be shown: the domain is identical or confusingly similar to a mark the complainant has rights in, the holder has no rights or legitimate interest in it, and it was registered and is being used in bad faith. What novices miss: a domain registered before your brand existed is very hard to call bad faith; a real business with the same name has a legitimate interest; a high asking price alone is not always bad faith; and filing a weak complaint can lead to a finding of reverse domain name hijacking. Country domains often have their own policies. Sometimes a quiet anonymous purchase through a broker is cheaper and faster than any dispute.
</context>

<task>
<domain>
{{domain}}
</domain>

<rights>
{{your_rights}}
</rights>

1. Quick read: how the facts look against the three usual elements, element by element, marked strong, weak or unclear, with the reasons. Flag at once if the site is phishing or impersonating the business, because that calls for urgent reports to the registrar, host and relevant authorities.
2. Routes compared: do nothing and monitor, buy (directly or through a broker, anonymously), administrative dispute under the policy for that domain extension (to check which applies), court action, or reports to the registrar or host for abuse. Pros, cons, rough effort and time; no fee figures unless the user gave them.
3. Evidence to collect: dated screenshots, WHOIS or registration data history where available, for-sale offers, emails, your trademark and first-use evidence, evidence of confusion.
4. First approach: if buying is sensible, a neutral, short enquiry that does not reveal the brand's urgency or threaten.
5. Dispute complaint facts: if a dispute looks viable, the facts organised under the three elements, with gaps marked, for a lawyer or for filing.
6. Red lines: no threats you cannot back, no false statements, and why a weak complaint is risky.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state which dispute policy, provider or fees apply to an extension as fact; mark as `[CHECK]`.
- Do not predict the outcome of a dispute.
- If the domain was registered before the user's brand existed or belongs to a real business using it in good faith, say plainly that a dispute is unlikely to be appropriate.
{{> output/uncertainty}}
</constraints>

<output_format>
## Quick read
Table: element | facts | strength.

## Routes compared
Table: route | pros | cons | effort.

## Evidence to collect
Checklist.

## First approach
Short message.

## Dispute complaint facts
Bullets under three headings.

## Red lines
Bullets.
</output_format>
