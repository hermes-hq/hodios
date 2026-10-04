---
schema: 1
id: write-safeguarding-concern-record
kind: prompt
title: Write a safeguarding concern record
description: Records a safeguarding concern about a child or an adult at risk from a worker's notes, with exact words, times, observations, actions and the referral made, and no speculation.
category: clinical-practice
version: 1.0.0
status: incubating
stage: [operate]
role: [individual, teacher]
subject: [healthcare]
requires: [none]
inputs: [notes, text]
output: [report, checklist]
risk: read-only
advice_risk: [medical, legal]
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [safeguarding, child-protection, adults-at-risk, disclosure, concern-form, designated-safeguarding-lead]
pairs_with:
  prompts: [write-social-work-case-note, write-reading-volunteer-guide, write-care-visit-notes]
  personas: [social-work-supervisor]
args:
  - name: observations
    description: What you saw, heard or were told, as soon after as you can - when and where it happened, the exact words used (by the person and by you), any marks or injuries you saw, how the person seemed, and what you have done so far. Initials only.
    type: text
    required: true
  - name: setting
    description: Where you work and in what role, for example "primary school, class teacher", "home care visit, care worker", "youth club volunteer", "GP surgery receptionist". Sets who the record goes to and the language used.
    type: string
    required: true
  - name: referral_route
    description: Your organisation's safeguarding procedure - who the safeguarding lead is (role, not name), how to report (form, system, phone), timescales and the local referral contact. Leave empty if you do not have it to hand.
    type: text
output_contract:
  format: markdown
  sections: [Do this now, Concern record, Gaps and cautions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help staff and volunteers write down a safeguarding concern about a child or an adult at risk. The record is passed to the designated safeguarding lead and may go on to children's or adult social care, the police or a court, so its value depends on being accurate, timely and free of interpretation: the person's exact words, what was actually seen, when, and what was done. The worker's job is to notice, record and report; investigating belongs to the statutory agencies. Most procedures ask for the record the same day, signed and dated.

Setting and role: {{setting}}
<observations>
{{observations}}
</observations>
{{#referral_route}}
<referral_route>
{{referral_route}}
</referral_route>
{{/referral_route}}
</context>

<task>
1. Decide what must happen now. If the notes suggest anyone is in immediate danger, is injured and needs treatment, or is about to go home to someone who has harmed them, the first line tells the worker to call the emergency services or follow their emergency procedure now, then inform their safeguarding lead. Otherwise the first line tells them to pass the concern to their safeguarding lead today (using the referral route if given) and not to wait for the record to be perfect.
2. Write the concern record:
   - **About:** the person's initials, age or age group, and the setting, without other identifiers.
   - **When and where:** date and time of the incident, disclosure or observation, and the time this record is written.
   - **What was said:** the person's words verbatim in quotation marks, in the order said, including the questions the worker asked, also verbatim. If the notes paraphrase, keep the paraphrase and mark it "(paraphrased; exact words not recorded)".
   - **What was seen:** marks, injuries, behaviour, demeanour and surroundings, described by location on the body, size, shape and colour as noted, without saying how they were caused. If the procedure uses a body map, note that one should be completed from what was seen.
   - **Context:** only facts the worker knows directly that help a reader understand, for example a previous concern they recorded.
   - **Actions taken:** what the worker did and said in response, who they told, when and how, and any advice they were given.
   - **Referral:** where the concern went or will go under the referral route, or "[Referral route: your safeguarding lead will advise]".
   - **Signature line:** placeholders for name, role, signature, date and time.
3. List gaps and cautions: missing times or details the reader will need, and anything the worker said or did that procedures usually advise against (for example promising to keep a secret), stated factually so they can tell their lead.
4. Before answering, compare the record with the notes line by line and remove any word that interprets, explains or predicts.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never speculate about who caused harm, why, or what "really" happened, and never label it as a type of abuse unless the person used that word themselves. Record opinions only if the worker's notes give one and label it "Worker's view" with the reason.
- Never advise the worker to investigate: no further questioning of the child or adult beyond what is needed to make them safe, no leading questions, no examining or photographing injuries unless their procedure says so, and no contact with the person alleged to have caused harm.
- Keep the person's own language, including slang, the names they used for body parts, and repetitions. Do not tidy their words.
- Do not tell the worker whether a legal threshold is met or what the authorities will do. Procedures and law differ by country and organisation; defer to the referral route and the safeguarding lead.
- Keep the record factual and short. If the notes are not enough to write a record (no date, no account of what was said or seen), list the questions to answer and stop.
- If the worker sounds distressed, add one line at the end reminding them that hearing a disclosure is hard and they can ask their lead or supervisor for support.
</constraints>

<output_format>
## Do this now
One or two lines from step 1.
## Concern record
The headings in step 2, as short factual lines.
## Gaps and cautions
Bullets.
</output_format>

<examples>
Rough note: "A (7) told me her step-dad hits her with a belt when she's naughty, I asked where and she showed me her leg, red marks, I said I'd keep it between us."
Record lines:
- What was said: A said "my step-dad hits me with a belt when I'm naughty". I asked "where?" (exact words to confirm). A pointed to her leg.
- What was seen: Red marks on A's leg (side, size, number and shape not recorded).
- Gaps and cautions: You told A you would keep it between you. Tell your safeguarding lead this; procedures usually say not to promise secrecy, and A can be told kindly who needs to know.
</examples>
