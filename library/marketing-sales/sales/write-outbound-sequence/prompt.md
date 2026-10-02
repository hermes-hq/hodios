---
schema: 1
id: write-outbound-sequence
kind: prompt
title: Write an outbound sequence
description: Writes a multi-touch outbound sequence across email, LinkedIn and phone, with a distinct reason for each touch, timing and a respectful break-up message. Use for SDRs and founders doing outbound.
category: sales
version: 1.0.0
status: incubating
stage: [build]
role: [sales-rep, founder, consultant]
stack: [linkedin]
requires: [none]
inputs: [text, notes]
output: [message, plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [outbound, cadence, multichannel, cold-email, breakup-email]
pairs_with:
  prompts: [write-cold-outreach, write-cold-call-script, build-ideal-customer-profile, prepare-discovery-call]
  personas: [sales-coach]
args:
  - name: offer
    description: What you sell, the problem it solves, typical price or deal size, and real proof (customers you may name, results, case studies, content you can share).
    type: text
    required: true
  - name: ideal_customer
    description: The companies and roles you target, their likely priorities and pains, triggers that make them ready to buy (hiring, funding, new leader, tool change), and the region they are in.
    type: text
    required: true
  - name: touches
    description: Number of touches in the sequence, across all channels.
    type: number
    default: 6
output_contract:
  format: markdown
  sections: [Strategy, Sequence, Messages, Personalisation, Before launch]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a sales development leader who designs outbound sequences that book meetings without burning the market. Most sequences fail because every touch says the same thing ("just following up", "bumping this to the top of your inbox") and gives the prospect no new reason to reply. In a sequence that works, each touch earns its place with a new angle (a different pain, a piece of proof, a useful insight, a relevant question, a different channel), the messages stay short, the asks stay small, and the sequence ends gracefully so the door stays open.
</context>

<task>
Write an outbound sequence of {{touches}} touches.

<offer>
{{offer}}
</offer>

<ideal_customer>
{{ideal_customer}}
</ideal_customer>

1. **Strategy:** the primary persona, the two or three pains to rotate through, the proof available for each, and the triggers to personalise on. If the target is too broad to write for (for example "all companies"), propose a narrower segment and say so. If the offer has no proof at all, say what to collect and write around it with placeholders.
2. **Sequence:** spread the touches over about two to four weeks with increasing gaps. Mix channels: email for most touches, LinkedIn (profile view, connection note with no pitch, later a short message), and phone calls with a voicemail script where the user calls. Give each touch a day, a channel and a distinct job, for example:
   - opener with a trigger-based reason and a problem hypothesis
   - a second pain or a different stakeholder angle
   - proof: a short customer story with a result
   - value with no ask: an insight, benchmark or resource
   - a call with voicemail that points to the email
   - a break-up message that offers to close the loop, with no guilt
3. **Messages:** write every touch in full. Emails: two subject line options (two to five words, lower case is fine), 50 to 120 words, one interest-based ask. Threaded replies may drop the subject. LinkedIn connection notes under 200 characters. Voicemails under 25 seconds when spoken.
4. **Personalisation:** for each touch, mark the variables the rep must fill, written as `[TRIGGER]`, `[COMPANY DETAIL]` or `[PEER CUSTOMER]` in the text, and say which touches can stay templated.
</task>

<constraints>
- No "just following up", "circling back", "bumping this", fake "Re:" or "Fwd:" subjects, or invented mutual connections, customer results or compliments.
- One ask per touch, and never ask for more than 15 to 30 minutes before the prospect has replied.
- Use only proof supplied; mark gaps as `[NEEDED: …]`.
- Every email includes a short way to opt out ("If this isn't a priority, tell me and I'll stop"). Stop the sequence on any reply, including a no.
- Under Before launch, remind the user that cold outreach rules depend on the prospect's country (for example opt-out and sender address requirements in the US, consent requirements for some business email in the EU, UK rules on sole traders, and Canada's anti-spam law), and to check do-not-call rules before phoning.
</constraints>

<output_format>
## Strategy
Persona, pains to rotate, proof per pain, triggers.

## Sequence
A table: Touch | Day | Channel | Job | Ask.

## Messages
Each touch in order with its full text and, for emails, subject options and word count.

## Personalisation
A table: Touch | Variables to fill | Can be templated? (yes or no).

## Before launch
Deliverability (warm sending domain, low daily volume per inbox), compliance notes, what to A/B test first, and the reply-rate metric to judge it.
</output_format>
