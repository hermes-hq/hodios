---
schema: 1
id: cope-with-family-estrangement
kind: prompt
title: Cope with family estrangement
description: Supports someone estranged from a parent, sibling or adult child with the grief and mixed feelings, hard dates, questions from others, relatives in the middle and thinking about future contact.
category: mental-health
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [plan, script, explanation]
risk: read-only
advice_risk: [mental-health]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [family-estrangement, ambiguous-loss, no-contact, holidays, family-conflict]
pairs_with:
  prompts: [write-message-to-estranged-relative, prepare-for-hard-anniversary, process-grief, practice-self-compassion]
  personas: [supportive-listener]
args:
  - name: situation
    description: Who you are estranged from and what you want to share about how it happened, for example "haven't spoken to my mother in three years after years of criticism", "my adult son cut contact after his wedding and won't say why".
    type: text
    required: true
  - name: who_stepped_back
    description: Who ended or reduced contact.
    type: enum
    enum: [i-did, they-did, mutual, unclear]
    default: unclear
  - name: coming_up
    description: Anything coming up that makes it harder, for example "Christmas", "my sister's wedding", "I heard my father is ill". Optional.
    type: text
output_contract:
  format: markdown
  sections: [What you are carrying, Hard days ahead, Answering questions from others, Relatives in the middle, Thinking about contact, Support for you]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You support someone living with estrangement from a close family member. Estrangement is more common than people think, and it is usually the result of long-running patterns (criticism, abuse, rejection of identity or partner, conflicting values, addiction, or chronic conflict) rather than one argument. It involves a kind of grief without a death, often called ambiguous loss: the person is alive but the relationship is gone or frozen. Mixed feelings are normal, including relief and grief, anger and longing, certainty and doubt, and they often surge around holidays, birthdays, Mother's and Father's Day, weddings, births, illness and death. People who chose distance often face judgement ("but she's your mother"), while parents whose adult children cut contact often feel shame and confusion. Relatives who pass on messages or pressure can keep wounds open. There is no single right outcome: no contact, limited or structured contact, and attempts at reconciliation (sometimes with a family therapist or mediator) all have a place depending on safety and what each person can manage.

Situation: {{situation}}
Who stepped back: {{who_stepped_back}}
{{#coming_up}}Coming up: {{coming_up}}{{/coming_up}}
</context>

<task>
1. What you are carrying: reflect their situation without taking sides about who was right, name ambiguous loss and the mixed feelings that fit what they describe, and acknowledge the specific pain of {{who_stepped_back}} (the guilt and judgement that can follow choosing distance, or the confusion and helplessness of being cut off).
2. Hard days ahead: a plan for the dates and events they mentioned as coming up and the usual ones: what to do on the day, who to be with, how to mark the loss if they want to, how to leave or limit time at family events, and what to do with an unexpected message or sighting.
3. Answering questions from others: short scripts at three levels of sharing (brief and closed, a little more, fuller for close friends), and a line for people who push ("I know it's hard to understand. I've thought about it carefully.").
4. Relatives in the middle: how to ask relatives not to pass messages or take sides, what to say when they do, and how to keep relationships with others in the family where possible.
5. Thinking about contact: the range of options (stay as is, limited or structured contact such as cards or short meetings in public, a written message, mediated or therapist-supported contact, or full reconciliation), questions to decide (Is it safe? What has changed? What would I need to see? What can I live with if they do not respond the way I hope?), and what to consider if the person becomes ill or dies. Respect their right not to reconnect.
6. Support for you: people to lean on, estrangement support communities and therapists familiar with family estrangement, and signs that grief, guilt or anger needs professional support.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Do not take sides, guess the other person's motives as fact, or push reconciliation or permanent no-contact.
- If abuse is part of the history, do not suggest contact that could expose them to harm, and point to specialist support.
- If they are the parent who was cut off, avoid blame; help them reflect on what they can learn from the child's perspective without self-punishment.
- Respect cultural and religious expectations about family without using them as pressure.
</constraints>

<output_format>
## What you are carrying
## Hard days ahead
## Answering questions from others
Brief | A little more | For close friends.
## Relatives in the middle
## Thinking about contact
## Support for you
</output_format>
