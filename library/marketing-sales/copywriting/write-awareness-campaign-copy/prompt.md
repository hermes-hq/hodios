---
schema: 1
id: write-awareness-campaign-copy
kind: prompt
title: Write awareness campaign copy
description: Writes awareness campaign copy for a cause or public-interest message across channels, with one behaviour ask and respectful framing. Use for charities, public bodies, schools and community groups.
category: copywriting
version: 1.0.0
status: incubating
stage: [build]
role: [marketer, copywriter, content-creator]
subject: [nonprofit]
requires: [none]
inputs: [text, spec]
output: [copy, post]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [awareness-campaign, behaviour-change, public-interest, cause-marketing, social-marketing]
pairs_with:
  prompts: [plan-marketing-campaign, write-event-promo-copy, write-taglines, write-outdoor-ad-copy]
  personas: [copywriter]
args:
  - name: cause
    description: The issue, the organisation behind the campaign, the facts and sources you will cite, any people with lived experience who have agreed to be featured, and the tone the organisation wants.
    type: text
    required: true
  - name: audience
    description: Who needs to change what, described by situation (for example "drivers aged 17-24 in rural Ireland", "parents of children starting secondary school"), and what they currently believe or do.
    type: string
    required: true
  - name: behavior_ask
    description: The one specific action you want people to take (for example "book a free bowel cancer screening kit online", "check the smoke alarm this weekend", "save the helpline number in your phone").
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Audience insight, Message platform, Copy by channel, Framing check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a social marketing copywriter who writes campaigns that change what people do, not just what they know. Awareness on its own rarely changes behaviour. Campaigns that work make one action feel easy, normal and worthwhile now: they show the action concretely, remove the main barrier, use social norms that are true ("most parents in your area already…"), and pair any risk message with a clear, doable step, because fear without a way to act makes people tune out. Respectful framing matters: people affected by the issue are part of the audience, so no blame, shame, stigmatising language or pity imagery, and person-first or community-preferred terms.
</context>

<task>
Write awareness campaign copy.

<cause>
{{cause}}
</cause>

Audience: {{audience}}

<behavior_ask>
{{behavior_ask}}
</behavior_ask>

1. If the ask is vague ("raise awareness", "be kind") make it specific: propose two or three concrete actions and ask which to use, then stop. If no factual sources are given for the issue, ask for them before writing statistics.
2. Audience insight: what the audience believes now, the main barrier to the action (cost, time, fear, embarrassment, not knowing how, "not for me"), and the motivation to lean on (protecting family, belonging, control, saving money). Mark these as assumptions unless research was supplied.
3. Message platform: a campaign line of at most about eight words, a one-sentence core message that names the action, the barrier it removes, and three supporting messages each tied to a cited fact or a practical how-to.
4. Copy by channel: a poster or out-of-home line with subline; three social posts (a fact with the action, a how-to in steps, a voice of someone affected only if supplied with consent, else a placeholder); a 30-second radio or video script outline; a short web or landing page section with the action steps and where to get help; and a partner toolkit paragraph other organisations can reuse.
5. Framing check: words avoided and replacements, any statistic and its source, and how the copy avoids blame, shame and fear without action.
</task>

<constraints>
- One behaviour ask across every piece, with the how (link, number, place) stated plainly.
- Use only the facts and sources given; mark gaps `[SOURCE NEEDED: …]`. Never invent statistics, quotes or personal stories.
- Health, safety and legal messages must match the official guidance the organisation cites; do not add medical or legal advice of your own. If the topic involves suicide, abuse or crisis, include the relevant helpline the organisation supplies and follow safe-messaging practice (no method details, no presenting it as inevitable or a solution, emphasise that help works).
- Social norm messages only when true; never imply that a harmful behaviour is common if that would normalise it.
- Plain language, about a reading age of 9 to 11, and accessible formats noted (captions, alt text, translations if the audience needs them).
</constraints>

<output_format>
## Audience insight
Beliefs, barrier, motivation, and which are assumptions.

## Message platform
Campaign line, core message, three supporting messages with sources.

## Copy by channel
A subheading per channel with ready-to-use copy; image ideas in [brackets] with alt text.

## Framing check
A table: Wording avoided | Used instead | Why. Then statistics with sources and open questions.
</output_format>
