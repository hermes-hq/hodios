---
schema: 1
id: manage-jealousy
kind: prompt
title: Manage jealousy
description: Helps someone understand jealousy in a relationship or friendship, separate facts from fears, handle the urge to check or accuse, and choose what to say, with clear warning signs of control.
category: mental-health
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [individual]
requires: [none]
inputs: [text]
output: [explanation, plan, script]
risk: read-only
advice_risk: [mental-health]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [jealousy, insecurity, trust, romantic-relationships, friendships, emotional-skills]
pairs_with:
  prompts: [manage-anger, manage-social-media-comparison, reframe-negative-thoughts, assess-early-dating-warning-signs]
  personas: [relationship-coach, supportive-listener]
args:
  - name: situation
    description: What is happening and what you feel, for example "my girlfriend has a new colleague she texts a lot and I keep checking her phone", "my best friend has a new friend and I feel left out".
    type: text
    required: true
  - name: relationship
    description: Who the jealousy is about.
    type: enum
    enum: [partner, friend, family-member, colleague]
    default: partner
output_contract:
  format: markdown
  sections: [What you are feeling, Facts and fears, What the jealousy is asking for, Handling the urge, What to say, Warning signs]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone handle jealousy: the fear of losing a relationship, or one's place in it, to someone else. Jealousy is a normal human emotion, often fed by past betrayal, insecurity or a real change in the relationship, and it is different from envy (wanting what someone else has). It becomes a problem through what people do with it: checking phones and social media, questioning, testing, accusing or withdrawing. These behaviours bring brief relief but erode trust, often push the other person away, and make the jealousy stronger, because no amount of checking produces certainty. Useful handling separates observable facts from interpretations and fears, notices the need underneath (reassurance, time together, clearer agreements, feeling chosen), rides out the urge to check, and then speaks about one's own feelings and requests rather than accusing. Jealousy can also be a sign of something real: a broken agreement or a partner pulling away. And jealousy used to control someone (monitoring, restricting who they see, accusations used to isolate) is a recognised warning sign of an abusive relationship, whichever side it comes from.

Situation: {{situation}}
Relationship: {{relationship}}
</context>

<task>
1. What you are feeling: name the feelings in their description (fear, hurt, anger, shame, loneliness), normalise jealousy as an emotion in two sentences, and distinguish it from envy if relevant.
2. Facts and fears: a table separating what they have observed directly, what they are interpreting, and what they fear might happen. Gently mark interpretations that may be mind-reading or catastrophising, and facts that genuinely deserve a conversation.
3. What the jealousy is asking for: the likely underlying needs (reassurance, attention, inclusion, clear agreements, honesty), and whether past experiences may be adding weight, phrased as possibilities, not diagnosis.
4. Handling the urge: concrete steps when they want to check, question or accuse: delay for 20 minutes, notice the urge rising and falling, do something absorbing, write the fear down for the conversation later, and track how often they act on it.
5. What to say: a short script for a calm conversation using their feelings and a specific request ("When you… I notice I feel… Could we…"), adapted to {{relationship}}, plus what not to say (accusations, ultimatums, demands for passwords), and how to respond if the other person is defensive.
6. Warning signs: two lists. Signs their jealousy is becoming controlling (checking devices, tracking location, restricting friendships, anger when the other person goes out) and that it is time to get help. Signs the other person's behaviour is controlling or abusive toward them (monitoring, isolation, threats), with a pointer to domestic abuse support services.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Do not decide whether a partner or friend is cheating or lying; you only have one side.
- Do not help monitor, track, access someone's messages or accounts, or test their loyalty. Say why if asked.
- If they describe threats, violence or fear of the other person, put safety first.
- Recommend a therapist or couples counsellor if jealousy is long-standing, intense or damaging the relationship.
- Non-judgemental; jealousy does not make someone a bad partner or friend.
</constraints>

<output_format>
## What you are feeling
## Facts and fears
Table: What I observed | What I am interpreting | What I fear.
## What the jealousy is asking for
## Handling the urge
## What to say
Script, then what to avoid.
## Warning signs
</output_format>
