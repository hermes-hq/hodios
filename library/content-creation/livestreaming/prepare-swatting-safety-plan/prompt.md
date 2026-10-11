---
schema: 1
id: prepare-swatting-safety-plan
kind: prompt
title: Prepare a swatting safety plan
description: Prepares a streamer and their household for swatting risk after a doxxing or threat - reducing what is findable, contacting local police, a household briefing, and what to do during and after.
category: livestreaming
version: 1.0.0
status: incubating
stage: [plan]
role: [content-creator, gamer, individual]
inputs: [notes]
output: [plan, checklist, message]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [swatting, doxxing, streamer-safety, household-briefing, threat-response]
pairs_with:
  prompts: [audit-stream-for-privacy-leaks, prepare-hate-raid-response, write-chat-mod-handbook]
  personas: [stream-producer]
args:
  - name: situation
    description: "What has happened or what you fear: address leaked, threats in chat, a known harasser, a previous incident. Your country and region, and who lives with you."
    type: text
    required: true
  - name: exposure
    description: "Optional. What is publicly findable about you that you know of (real name, city, house exterior in old streams, business registration, domain records)."
    type: text
output_contract:
  format: markdown
  sections: [Right now, Your exposure, Reduce what is findable, Contact local police, Household briefing, If it happens, After an incident]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Swatting is a false emergency report made to send armed police to someone's home. It has injured and killed people, so the plan focuses on making a police response safe, not on winning an argument with police at the door. What helps depends heavily on country and region: in some places local police offer a way to note an address as at risk of false reports, in others they do not, so the streamer must ask their own local police through a non-emergency line. Most addresses leak through data broker and people-search sites, old streams or posts showing the house or street, business or domain registrations, package labels, and friends tagging locations. The household is the most important part: everyone at home, including children and visitors, needs to know that if armed police arrive they should comply calmly, keep hands visible, not run, and not argue, and explain later. Evidence of threats and harassment helps police and platforms. If there is an immediate threat, local emergency services come first.
</context>

<task>
<situation>
{{situation}}
</situation>

{{#exposure}}
<exposure>
{{exposure}}
</exposure>
{{/exposure}}

1. **Right now:** if anything suggests immediate danger, contact local emergency services first. Then the two or three most urgent steps for their situation.
2. **Your exposure:** what is likely findable about them, from what they shared, ranked by risk.
3. **Reduce what is findable:** removal requests to people-search and data broker sites where the law allows, private domain and business registration options to check, old VODs and posts showing the home, package and mail habits, and accounts that link names.
4. **Contact local police:** what to ask the local police non-emergency line (whether they have a way to flag false-report risk for an address, who to call if threatened), and a short script with what to bring (evidence, a description of the streaming setup).
5. **Household briefing:** a short, calm briefing for everyone at home on what to do if armed police arrive, including children in age-appropriate words.
6. **If it happens:** a step list for the moment itself (stop streaming if safe, comply, hands visible, say there is no emergency only when asked, do not argue) and who contacts whom after.
7. **After an incident:** evidence to keep, reporting to platforms, police follow-up, and support for the household.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Put local emergency services first whenever there is immediate danger.
- Do not state what police in their area will do or offer; tell them to ask locally.
- Do not suggest confronting or investigating the harasser, or any retaliation.
- Do not suggest resisting, filming confrontationally or arguing with armed police at the door.
</constraints>

<output_format>
## Right now
## Your exposure
Table: item | how found | risk.

## Reduce what is findable
Checkbox list.

## Contact local police
Script.

## Household briefing
## If it happens
Numbered steps.

## After an incident
</output_format>
