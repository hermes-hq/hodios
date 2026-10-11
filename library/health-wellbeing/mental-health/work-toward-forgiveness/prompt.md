---
schema: 1
id: work-toward-forgiveness
kind: prompt
title: Work toward forgiveness
description: Helps someone decide whether and how to forgive a person who hurt them, separating forgiveness from excusing, trusting or reconciling, with steps for letting go of resentment at their own pace.
category: mental-health
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [individual]
requires: [none]
inputs: [text]
output: [explanation, plan]
risk: read-only
advice_risk: [mental-health]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [forgiveness, resentment, betrayal, letting-go, emotional-healing]
pairs_with:
  prompts: [decide-whether-to-give-second-chance, write-message-to-estranged-relative, practice-self-compassion, manage-anger]
  personas: [supportive-listener]
args:
  - name: hurt
    description: What happened and how it affects you now, for example "my brother cheated me out of my share of our dad's house", "my best friend slept with my ex", "my father left when I was eight".
    type: text
    required: true
  - name: contact
    description: Your current contact with the person.
    type: enum
    enum: [still-in-contact, no-contact, they-have-died, unsure]
    default: unsure
output_contract:
  format: markdown
  sections: [What forgiveness is and is not, Where you are now, Your options, If you choose to work toward it, If you are still in contact, When to get more help]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone think about forgiving a person who hurt them. Forgiveness, as researchers and therapists describe it, is a gradual internal change: letting go of resentment and the wish for revenge, for the forgiver's own sake. It is not excusing or minimising the harm, forgetting, giving up on justice or accountability, trusting the person again, or reconciling; those are separate decisions. People often feel pressured to forgive by family, faith or friends before they are ready, and premature forgiveness tends to bury anger rather than resolve it. Anger at real harm is legitimate and usually needs acknowledging first. Structured approaches (such as Enright's process model and Worthington's REACH model) move through recalling the hurt honestly, deciding whether to work toward forgiveness, trying to understand the other person's context without excusing them, and committing to and holding on to the change when old feelings return. Not forgiving is also a valid choice; the goal is less suffering, not a particular outcome.

Hurt: {{hurt}}
Contact: {{contact}}
</context>

<task>
1. What forgiveness is and is not: explain the distinction above in plain words, especially that forgiving does not mean trusting, reconciling or saying it was acceptable.
2. Where you are now: reflect what they described, name the feelings present (anger, grief, betrayal, shame), and offer a few questions to locate themselves: Is the hurt still happening? Do I want to forgive, or do I feel I should? What is holding on to this costing me? What would be different if it weighed less?
3. Your options: lay out the choices fairly: working toward forgiveness; not forgiving but reducing how much space it takes; accepting what happened without forgiving; and, separately, the contact decision (none, limited, or rebuilding trust with conditions). Make clear each is legitimate.
4. If you choose to work toward it: steps over weeks, not one sitting: name the hurt fully and its impact (an unsent letter can help); allow the anger; consider the other person's context, history or limitations without excusing the act; decide to let go of revenge and rumination; a phrase to use when resentment returns; and noticing small shifts. Adapt if {{contact}} is they-have-died (for example a letter or ritual).
5. If you are still in contact: how forgiveness and boundaries go together, what to say if the person demands forgiveness, and that trust is rebuilt through their changed behaviour over time, not through forgiveness alone. Skip or shorten if not in contact.
6. When to get more help: if the hurt involves abuse or trauma, if resentment dominates daily life, or if family or faith pressure is causing distress, suggest a therapist (and a faith leader they trust, if it matters to them).
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Never pressure them to forgive, reconcile or contact the person, and never imply that not forgiving is a moral failing.
- If the harm is ongoing (abuse, threats, financial exploitation), put safety and protection first; forgiveness is not the task while harm continues.
- Do not excuse, minimise or speculate about the other person's motives as fact.
- Respect religious or cultural views on forgiveness without imposing any.
</constraints>

<output_format>
## What forgiveness is and is not
## Where you are now
## Your options
## If you choose to work toward it
## If you are still in contact
## When to get more help
</output_format>
