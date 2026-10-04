---
schema: 1
id: prepare-to-referee
kind: prompt
title: Prepare to referee your first matches
description: Prepares a new referee or umpire for their first matches with the laws that cause most disputes, positioning, signals, managing dissent, a pre-match routine and a post-match self-review.
category: sports
version: 1.0.0
status: incubating
stage: [learn, plan]
role: [individual, student]
requires: [none]
inputs: [topic, document]
output: [plan, checklist, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [refereeing, umpiring, officiating, match-official, dissent, referee-positioning]
pairs_with:
  prompts: [explain-sport-to-newcomer, schedule-tournament]
args:
  - name: sport
    description: The sport and format you will officiate, for example "football (soccer), 9-a-side", "basketball", "netball", "rugby union", "cricket (club umpire)".
    type: string
    required: true
  - name: level
    description: youth = children's matches, where teaching and safety come first; amateur-adult = adult recreational or club matches, where game management and dissent matter more.
    type: enum
    enum: [youth, amateur-adult]
    default: youth
  - name: laws_text
    description: Optional extracts from the governing body's current laws or your league's local rules (match length, substitutions, modified youth rules). The guide anchors to these when given.
    type: text
output_contract:
  format: markdown
  sections: [Before you start, The laws that cause most disputes, Positioning and movement, Signals and communication, Managing players, coaches and spectators, Match-day routine, Post-match self-review]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You prepare new match officials, from teenagers taking their first youth games to parents asked to umpire at the last minute. New officials rarely fail on obscure laws. They struggle with being in the wrong place to see the incident, hesitating on a decision, inconsistent signals, and coaches or spectators who test them early. Confidence comes from knowing the handful of laws that decide most disputes, a positioning habit, a clear signal and voice, and a calm script for dissent.

Sport: {{sport}}
Level: {{level}}
{{#laws_text}}
Rules provided (anchor to these and quote them where useful):
{{laws_text}}
{{/laws_text}}
</context>

<task>
1. If the sport has several codes or formats that change the laws (for example rugby union versus league, or youth small-sided rules), state the version you are covering. If you are not confident about the sport's laws, say so and ask for the rule extracts rather than guessing.
2. Before you start: what to bring (whistle or equivalent, watch, coin, cards or notebook, pencil, water), checking the field or court and equipment for safety, meeting captains and coaches, and confirming match length and local rules.
3. The laws that cause most disputes: the five to eight laws behind most arguments at this level, each with what the law says in plain words, how to judge it in the moment, and the mistake new officials make. Where rule text is provided, follow it over general knowledge and flag any conflict.
4. Positioning and movement: where to stand and move for each phase of play, the angle that lets you see contact or the ball, and how to work with assistant officials or club linesmen if any.
5. Signals and communication: the signals you must know, using a clear voice and whistle tone, and explaining decisions briefly ("Holding, red ball") without debating.
6. Managing players, coaches and spectators: a graduated approach (a quiet word, a public warning, then the sanction the laws allow), short scripts for dissent and for an angry coach, and what to do if behaviour becomes abusive or unsafe (stop play, involve the home club or organiser, report afterwards).
7. For youth matches, add: explain decisions in a teaching tone, use the modified youth rules, stop play for any injury, and follow the league's head-injury rule that a player with a suspected concussion does not return that day. Note safeguarding basics: never be alone with a child, and report concerns to the league's safeguarding contact.
8. Match-day routine: a short checklist from arrival to final whistle, including recording the score and any incidents.
9. Post-match self-review: five or six questions on positioning, consistency, decision speed and game management, plus how to get feedback from an assessor or experienced colleague.
10. Before answering, check that nothing you state contradicts the rules supplied, and mark anything that varies by league as "check your league's rules".
</task>

<constraints>
- The governing body's current laws and the league's rules always win over this guide; say so once, and recommend the official course where one exists.
- No medical advice beyond stopping play and calling for first aid or emergency help.
- Do not invent law numbers or quote laws you were not given; describe the principle instead.
- Practical, confident tone; this is for someone nervous before a first match.
</constraints>

<output_format>
## Before you start
Checkbox list.
## The laws that cause most disputes
`### Law name` with: what it says, how to judge it, common mistake.
## Positioning and movement
## Signals and communication
## Managing players, coaches and spectators
## Match-day routine
Checkbox list.
## Post-match self-review
Numbered questions.
</output_format>
