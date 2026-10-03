---
schema: 1
id: protect-relative-from-scams
kind: prompt
title: Protect a relative from scams
description: Plans how to protect an older or vulnerable relative from scams, with the scripts they are likely to meet, safeguards that keep their independence, and a respectful conversation to have.
category: digital-safety
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [plan, checklist, script]
risk: read-only
advice_risk: [financial, legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [elder-fraud, scam-prevention, ageing-parents, caregiving, online-safety, phone-scams]
pairs_with:
  prompts: [check-suspicious-message, secure-personal-accounts, manage-parent-finances, spot-investment-scam]
  personas: [eldercare-advisor]
args:
  - name: relative_situation
    description: Who the relative is (age, living situation, how they use phone, email, social media and banking), any scams or near misses so far, any memory or health concerns, how they feel about help, and your country.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Risk picture, Scams to rehearse, Safeguards, The conversation, If a scam happens, Professional help]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help families protect older or vulnerable relatives from fraud without taking away their independence or dignity. Scammers target older people with scripts that exploit trust, loneliness, politeness and fear: grandchild or "Hi Mum" emergencies, bank or police impersonation asking them to move money to a "safe account", fake tech support with remote access, romance scams, lottery and prize fees, doorstep traders, investment and pension offers, and fake government or tax calls. Shame stops many victims telling anyone, so the relationship matters as much as the technology. The relative is an adult with the right to make their own choices while they have the capacity to decide.

Situation: {{relative_situation}}
</context>

<task>
1. If you cannot tell how the relative uses phone, internet and banking, ask in one message and stop. If the description suggests the relative is being scammed right now (money being sent, someone on the phone, a new "friend" asking for money), open the reply with the "If a scam happens" steps adapted to this case, then the conversation, then only the safeguards that stop the next payment; leave the general prevention plan for later.
2. Risk picture: which scams this relative is most exposed to given how they live and what has happened already, ranked.
3. Scams to rehearse: for the top four, the typical opening line, the pressure tactic, and a simple rule and phrase the relative can use ("I'll call you back on the number I have", "My family checks all money requests"). Suggest a family code word for genuine emergencies.
4. Safeguards, from least to most intrusive, with what each protects against and the relative's consent at each step:
   - Phone: call-blocking features from their carrier or phone, silence unknown callers, register with the national do-not-call service where one exists.
   - Devices and email: updates, spam filtering, a password manager or written passwords kept safely at home, and no remote-access apps without a family check.
   - Money: ask their bank about alerts on large or unusual payments, a trusted contact or third-party mandate, daily transfer limits, and a separate low-balance account for everyday or online spending.
   - Mail and doorstep: a "no cold callers" sign, checking traders' identity, and a rule not to pay or sign on the doorstep.
   - Planning ahead: a lasting or durable power of attorney, explained in general terms as something to set up with a lawyer or the official body while the relative can decide.
5. The conversation: a short, respectful plan and opening words that frame it as "scammers are professionals who target everyone", ask about their experiences, agree a plan together, and avoid lecturing or taking control. Include what to say if they have already lost money (no blame, it happens to clever people).
6. If a scam happens: the steps in order (stop further payments, call the bank on its official number, change passwords, remove remote-access software, report to the police and the national fraud service), plus a warning about recovery scams that promise to get money back for a fee.
7. Professional help: when to involve the bank's vulnerable-customer team, a lawyer for power of attorney or capacity questions, a doctor if new confusion is behind the risk, and adult safeguarding services if someone close to the relative may be exploiting them.
</task>

<constraints>
- Respect autonomy: never suggest secretly monitoring the relative's accounts or messages, taking over their money without legal authority, or deciding for them while they can decide. If the user asks for that, say briefly why you will not help with it and offer the consent-based safeguards instead.
- Banking features, do-not-call registers and power of attorney rules differ by country and bank; name the country you assume and mark each as something to check locally.
- Do not judge mental capacity; describe what to notice and who assesses it.
- Plain, warm language that the family could show the relative.
{{> guardrails/professional-limits}}
</constraints>

<output_format>
## Risk picture
## Scams to rehearse
Table: Scam | How it starts | Pressure used | Your rule and phrase.
## Safeguards
Grouped by area, least intrusive first, each with "ask them first" where relevant.
## The conversation
Steps and opening words.
## If a scam happens
Numbered by urgency.
## Professional help
</output_format>
