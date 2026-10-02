---
schema: 1
id: talk-to-teen-about-online-safety
kind: prompt
title: Talk to a teen about online safety
description: Plans an honest, non-shaming conversation with a teenager about online privacy, sextortion, scams and pressure, with words to use and a promise that keeps them coming back for help.
category: parenting
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
requires: [none]
inputs: [text]
output: [script, plan, checklist]
risk: read-only
advice_risk: [mental-health]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
tags: [online-safety, sextortion, teenagers, scams, digital-privacy, open-door]
pairs_with:
  prompts: [set-screen-time-plan, explain-hard-topic-to-child]
  personas: [parenting-coach]
args:
  - name: teen_age
    description: The teenager's age in years, for example 14.
    type: number
    required: true
  - name: concerns
    description: What prompted this and what you know, for example "she just got Snapchat", "he plays online games with strangers", "a friend's son was blackmailed". Optional.
    type: text
output_contract:
  format: markdown
  sections: [Before you talk, Opening the conversation, The topics, The promise, If something has already happened, After the talk]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help parents talk with teenagers about the risks they face online in a way that teenagers will actually hear. Lectures, scare stories and threats to take the phone away teach teens to hide problems. What protects them is a parent who knows the real risks, talks about them calmly and more than once, and has made it safe to come to them when something goes wrong, even if the teen broke a rule to get there. The risks that matter most at this age are: sextortion (someone, often posing as a peer, gets an intimate image and then demands money or more images, and targets boys as well as girls); pressure to send nudes from people they know; scams (fake giveaways, account takeovers, too-good-to-be-true offers, crypto and "money mule" recruitment); oversharing location and personal details; grooming by adults; and harmful content and comparison that affects how they feel.

Teen's age: {{teen_age}}
{{#concerns}}What prompted this: {{concerns}}{{/concerns}}
</context>

<task>
1. Before you talk: help the parent prepare. Learn the apps the teen uses, check their own tone and any feelings, pick a low-pressure moment (driving, walking, cooking together, not face to face across a table), and plan several short chats rather than one big one.
2. Opening the conversation: give two or three ways to start that invite rather than accuse, such as asking about something in the news or what their friends have seen, and asking for their expertise.
3. The topics: for each of privacy and location sharing, sextortion and image pressure, scams, and people who are not who they say they are, give one paragraph of what to say in plain words that fit a {{teen_age}}-year-old, plus one question to ask them. Explain the warning signs: someone new who moves fast to flattery, secrecy or switching to a private app; requests for images; threats; urgent requests for money or codes.
4. The promise: write the key message in the parent's words, that if anything goes wrong online, including something embarrassing or against the rules, the teen can come to them and they will help first and not panic, blame or punish. Tell the parent to say it out loud and mean it.
5. If something has already happened: give the steps for sextortion or image-sharing, which are to stop replying, not pay or send anything more (paying rarely ends it), keep the evidence with screenshots rather than deleting the account straight away, block and report the account on the platform, report to the police, and use a service that helps remove intimate images of under-18s where one exists in their country (such as Take It Down or Report Remove). Add steps for a scam or hacked account: change passwords, turn on two-step verification, and tell the bank if money is involved.
6. After the talk: agree a few practical settings together (private accounts, location sharing off or only with family, two-step verification), plan to check in again, and name what to watch for in the teen's mood or behaviour.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- No shaming language about bodies, sex, or sending images. Blackmail is the criminal's fault, never the teen's.
- No scare tactics, no invented statistics, no promises the parent cannot keep ("this will never happen to you").
- Respect the teen's growing privacy: recommend agreed settings and open conversation over secret monitoring, and say why.
- Sextortion is a crime and can drive young people to despair quickly. If the concerns describe it happening now, put the "If something has already happened" steps first, tell the parent to stay with their teen, reassure them they are not in trouble and it will be dealt with, and contact the police today. Any sign the teen feels hopeless or has mentioned self-harm or suicide needs emergency services or a crisis line straight away.
- Fit the wording to the age: a 13-year-old and a 17-year-old need different words and different levels of independence.
- If the teen's age is missing, ask for it.
</constraints>

<output_format>
## Before you talk
A short checklist.
## Opening the conversation
Two or three openers in quotes.
## The topics
For each topic: a heading, what to say in quotes, warning signs, and a question to ask them.
## The promise
The words to say, in quotes.
## If something has already happened
Numbered steps, sextortion first.
## After the talk
</output_format>
