---
schema: 1
id: plan-family-scam-safe-word
kind: prompt
title: Plan a family scam safe word
description: Sets up a whole-family plan against voice-clone and impostor scams, with a safe word, call-back habits, scripts for urgent money requests, a practice drill and who to call.
category: digital-safety
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [plan, script, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [voice-cloning, impostor-scams, safe-word, family-safety, scam-prevention, deepfakes]
pairs_with:
  prompts: [protect-relative-from-scams, check-suspicious-message, secure-personal-accounts]
  personas: [digital-safety-advisor]
args:
  - name: family
    description: Who is in the family plan and their ages, where they live, and how you usually keep in touch, for example "me and my husband (50s), daughter at university abroad, son 14, my parents (78 and 80) in another town; family group chat".
    type: text
    required: true
  - name: vulnerable_members
    description: Anyone who may need extra support, for example "dad has early memory problems", "my son is very trusting online". Optional.
    type: text
output_contract:
  format: markdown
  sections: [How these scams work, Your safe word, Family rules, Scripts, Who to call, Practice drill, Extra support]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help families prepare for impostor scams, which are getting more convincing. Criminals can clone a voice from a few seconds of video posted online, spoof the caller's number so it shows a family member's name, send "Hi Mum, I've lost my phone, this is my new number" messages, or stage a fake emergency (an accident, an arrest, a kidnapping) to rush someone into paying by bank transfer, gift cards or cryptocurrency. The defence is simple and works even against perfect fakes: pause, verify through a channel you already trust, and use a secret only the family knows.

Family: {{family}}
{{#vulnerable_members}}Extra support needed: {{vulnerable_members}}{{/vulnerable_members}}
</context>

<task>
1. If the family description says money has already been sent, or a suspicious request is happening now, open with an "Act now" section before anything else: call the bank or payment provider's fraud line straight away on the number on the card or the official website (transfers can sometimes be stopped or recalled if reported fast, and gift-card issuers can sometimes freeze unspent balances); report it to the police or the national fraud reporting service; keep the call log, the number, messages and receipts; and warn that "recovery" offers to get the money back for a fee are a second scam. Say plainly that these scams are built to fool careful people and it is not their fault. Then continue with the plan below.
2. If you cannot tell who is in the plan or how they keep in touch, ask up to three questions and stop.
3. How these scams work: three or four realistic examples tailored to this family (for example a call "from" the daughter abroad needing money for a hospital bill), with the warning signs: urgency, secrecy ("don't tell Mum"), unusual payment methods, a new number, and emotional pressure.
4. Your safe word: how to choose one (not guessable, not on social media, not a pet's or street name, easy to remember under stress), how to share it (in person or a call, never in a text or the family chat), and an alternative verification question for anyone who might forget. Say when to change it (after it is used in a real situation or if it may have leaked).
5. Family rules, short enough for a fridge: pause before acting; hang up and call back on the number you already have; check with a second family member; ask for the safe word; no family member will ever ask for gift cards, crypto or secrecy; money requests are always verified, even from voices you know.
6. Scripts: what to say on a suspicious call ("I'll call you right back on your usual number"), what to reply to a "new number" message, and what to do if the caller refuses or gets angry. Write versions for adults, for teenagers and for older relatives.
7. Who to call: the bank's fraud line (number on the back of the card), the police in an emergency, and the national fraud reporting service in their country (name it if you are confident, otherwise say how to find it). What to do if money has already been sent: call the bank immediately, and ignore anyone who offers to recover it for a fee.
8. Practice drill: a light role-play once or twice a year where a family member makes a pretend urgent request and others practise the call-back and safe word. Keep it fun and announced in advance for older relatives.
9. Extra support: for each vulnerable member, adjustments that keep their independence, such as a printed card by the phone with the rules and family numbers, a trusted contact registered with their bank if they agree, and call-blocking features on their phone.
10. Before answering, check that the safe word is never written into the plan itself and that nothing suggests secret monitoring of any adult.
</task>

<constraints>
- Do not suggest an actual safe word; give the rules for choosing one, so it never appears in a chat log.
- Respect older and vulnerable adults' autonomy: consent-based measures only, no secret monitoring or taking over accounts.
- Banking features and reporting services differ by country; mark them to check locally.
- Calm, practical tone; fear does not help people remember.
</constraints>

<output_format>
## Act now
Only when money has been sent or a request is live: a short numbered list. Otherwise leave this section out.
## How these scams work
## Your safe word
## Family rules
A short numbered list in a quote block, ready to print.
## Scripts
Grouped by adults, teenagers and older relatives.
## Who to call
## Practice drill
## Extra support
</output_format>
