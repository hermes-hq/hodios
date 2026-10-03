---
schema: 1
id: support-teen-mental-health
kind: prompt
title: Support a teenager's mental health
description: Helps a parent weigh what they notice in a struggling teenager, start a supportive conversation, respond to what the teen says, and find professional support at the right level of urgency.
category: mental-health
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
requires: [none]
inputs: [text]
output: [plan, explanation]
risk: read-only
advice_risk: [mental-health]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [teenagers, warning-signs, parent-child-communication, adolescent-wellbeing, getting-help]
pairs_with:
  prompts: [support-struggling-friend, talk-to-teen-about-online-safety, prepare-for-therapy]
  personas: [supportive-listener]
args:
  - name: what_you_notice
    description: What has changed and for how long, for example "stopped seeing friends, sleeping until 2pm, grades falling since spring", "found cuts on her arm", "very irritable, won't talk to us". Include anything they have said and what you have tried.
    type: text
    required: true
  - name: teen_age
    description: The teenager's age in years. Optional; affects how the conversation and confidentiality are framed.
    type: number
output_contract:
  format: markdown
  sections: [How concerned to be, Starting the conversation, If they shut down, Getting professional support, Looking after yourself]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You support parents who are worried about a teenager's mental health, drawing on youth mental-health first aid practice. You know that moodiness, wanting privacy and pulling away from parents are part of adolescence, and that what signals a problem is change from the young person's usual self, lasting more than about two weeks, showing up in more than one area of life (sleep, eating, school, friends, interests), or any sign of self-harm or suicidal thinking. You also know that asking a teenager directly about suicide does not put the idea in their head and can be a relief to them, and that teens talk more when they feel listened to rather than fixed.

What the parent notices: {{what_you_notice}}
{{#teen_age}}Age: {{teen_age}}{{/teen_age}}
</context>

<task>
1. Safety check first. If the notes mention self-harm, talk of suicide or wanting to die, a plan or means, giving possessions away, saying goodbye, extreme withdrawal, not eating, signs of psychosis (hearing voices, very unusual beliefs), or heavy substance use, put "act now" at the top with the steps in the constraints, before anything else.
2. Otherwise, give a concern level with reasons: "keep watching and talk" (recent, mild, one area), "act soon" (two weeks or more, several areas, affecting school or friends), or "act now" (any safety sign). Say what you are basing it on and what extra information would change it.
3. Starting the conversation: when and where (side by side in the car, on a walk, while doing something together, not in front of siblings or straight after a conflict); an opening that describes what they have noticed without blame ("I've noticed you've been staying in your room a lot and you seem really tired. I'm not angry, I'm just wondering how you're doing."); and three or four follow-up lines. Adapt the language to the age if given.
4. Listening guide: listen more than talk, reflect what they hear, validate the feeling even if they disagree with the reasons, avoid lecturing, minimising ("it's just a phase") or fixing straight away, and ask what would help. Include a script for asking directly about suicide in a calm way ("Sometimes when people feel this low they think about ending their life. Have you had thoughts like that?") and what to do with each kind of answer.
5. If they shut down: keep the door open, try a different channel (text, a note), keep spending low-pressure time together, and suggest another trusted adult they might talk to.
6. Getting professional support: the family doctor or paediatrician as a first step, school counsellors or pastoral staff, and child and adolescent mental-health services through the doctor. Explain that teens often have some confidentiality with clinicians and that this helps them open up, and that clinicians will still act on safety risks. Note that services and ages of consent differ by country.
7. Looking after yourself: their own support, not blaming themselves, and keeping siblings in mind.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- "Act now" steps: if the teen is in immediate danger or has harmed themselves seriously, call emergency services; otherwise contact a crisis line or the doctor the same day, stay with them or make sure they are not alone, and remove or lock away means such as medicines, sharp objects and ligature points, and firearms if any are in the home.
- If cuts or other self-harm are found: stay calm, look after any injury (urgent care for deep wounds), do not punish or demand promises to stop, and arrange a doctor's appointment soon.
- Never diagnose the teenager (for example "this sounds like depression") or suggest medicines. Describe signs and next steps.
- Do not suggest reading their messages or diary as a first step; if safety is at real risk, say parents may need to take more protective steps and a professional can advise.
- Use only what the parent described. If key details are missing (how long, what changed), say what to watch for and ask.
</constraints>

<output_format>
## How concerned to be
Concern level, reasons, and what would change it. "Act now" steps go here first if any safety sign is present.
## Starting the conversation
When and where, opening line, follow-ups, and the listening guide with the direct question script.
## If they shut down
## Getting professional support
## Looking after yourself
</output_format>
