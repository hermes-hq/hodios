---
schema: 1
id: pitch-brand-sponsorship
kind: prompt
title: Pitch a brand sponsorship
description: Writes a sponsorship pitch that ties a creator's audience to a brand's goals, proposes a specific integration and sets clear next steps. Use when reaching out to brands for paid deals.
category: content-strategy
version: 1.0.0
status: incubating
stage: [build]
role: [content-creator, writer]
inputs: [text, notes]
output: [message, ideas]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [brand-deals, sponsorship-pitch, integration-concept, brand-outreach]
pairs_with:
  prompts: [write-media-kit, plan-creator-monetization, write-podcast-ad-read]
args:
  - name: brand
    description: The brand or product to pitch.
    type: string
    required: true
  - name: creator_profile
    description: Your channels, audience, key numbers with date ranges, content style, past partnerships, and your genuine connection to the brand (have you used it, mentioned it, or do viewers ask about it?).
    type: text
    required: true
  - name: integration_ideas
    description: Ideas you already have for the partnership, and anything you know about the brand's current goals, launches or campaigns.
    type: text
output_contract:
  format: markdown
  sections: [Fit notes, Subject lines, Pitch email, Short DM, Integration concept, Follow-ups]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help creators win brand deals. Partnership managers receive many pitches and ignore most: generic templates, follower counts with no context, "I'd love to collaborate" with no idea attached. The pitches that get replies are short and specific: they show why this audience matters to this brand right now, prove the creator's connection to the product is genuine, propose one concrete integration with deliverables and timing, and make the next step easy. A brand's interest is a business goal (a launch, a new market, a new audience segment, a seasonal push, more trials or sign-ups), so the pitch speaks in those terms, not in terms of what the creator needs.
</context>

<task>
Brand: {{brand}}

<creator_profile>
{{creator_profile}}
</creator_profile>

<integration_ideas>
{{integration_ideas}}
</integration_ideas>

1. **Fit notes.** Summarise the overlap between the creator's audience and the brand's likely customers, the creator's genuine connection to the brand, and the brand goal the pitch should speak to. You cannot browse: use only what the user supplied about the brand, label anything else as an assumption to check, and list what to research (recent launches, existing creator partnerships, the right contact person or agency).
2. **Subject lines.** Three options that are specific to the brand and the idea, not generic ("Collab?").
3. **Pitch email.** Under about 200 words: a first line about the brand (a real, supplied reason for writing now), the audience fit with one or two key numbers and their date range, the genuine connection, one concrete integration idea in two or three sentences, light proof (a past result or a relevant piece of content), a clear next step (a short call, or sending the media kit and rates), and a sign-off. Mention that the content will be clearly disclosed as sponsored.
4. **Short DM.** A three or four sentence version for a social message or a contact form.
5. **Integration concept.** A short one-page outline the creator can attach: the concept, format and placement, deliverables, timeline, how the brand's message appears naturally, the call to action and tracking (a code or link), what the brand receives afterwards (a results summary), and optional add-ons (usage rights, exclusivity).
6. **Follow-ups.** Two short follow-ups: one after about five to seven working days that adds something new (a fresh idea, a recent result), and a final polite one a week later that closes the loop.
</task>

<constraints>
- Never invent audience numbers, past partnerships, results, or the creator's use of the product. If the creator has not used the product, do not imply they have; base the fit on the audience instead and suggest trying it before pitching.
- Never invent facts about the brand (campaigns, contacts, goals). Use `[CONFIRM: …]` or `[CONTACT NAME]` placeholders.
- Do not quote prices in the first email unless the user asks; offer to send rates.
- If the brand is a poor fit for the audience or conflicts with the creator's content (for example a product the creator has criticised), say so plainly before writing.
</constraints>

<output_format>
Use the section headings from the output contract, in order. Emails and the DM go in quote blocks, ready to paste. Keep Fit notes to bullet points.
</output_format>
