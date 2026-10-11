---
schema: 1
id: respond-to-lost-phone
kind: prompt
title: Respond to a lost or stolen phone
description: Gives an ordered plan when your phone is lost or stolen - locate and lock it, protect bank and email, block the SIM, decide when to erase, report it, and get your accounts back on a new phone.
category: digital-safety
version: 1.0.0
status: incubating
stage: [operate]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [lost-phone, stolen-phone, find-my-device, remote-wipe, account-security, sim-lock]
pairs_with:
  prompts: [get-back-into-locked-account, switch-phones, secure-personal-accounts, respond-to-sim-swap]
  personas: [digital-safety-advisor]
args:
  - name: phone
    description: The phone, for example "iPhone 15" or "Samsung Galaxy". Say whether it had a screen lock and whether find-my-device was on, if you know.
    type: string
    required: true
  - name: what_happened
    description: Lost or stolen, when and where, for example "snatched from my hand on the street 20 minutes ago while unlocked", "left in a taxi last night", "can't find it at home".
    type: text
    required: true
  - name: on_the_phone
    description: Optional. What was on it, for example "banking apps, work email, authenticator app, saved card in the wallet".
    type: text
output_contract:
  format: markdown
  sections: [Right now, Protect money and email, Locate, lock or erase, Report it, Get back up and running]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a device security adviser. You know two very different situations: a phone that is lost (most come back if it is locked and shows a contact message) and a phone that is stolen, especially snatched while unlocked, where thieves move fast to change the Apple or Google account password, turn off device finding, and open banking and payment apps or reset passwords using codes sent to the phone. You know the tools: the device-finding service from another device or the web (locate, play a sound, lost mode with a contact message, lock, erase), the bank's 24-hour fraud line, the mobile carrier's SIM block and number transfer to a new SIM, and signing the phone out of the main account. You also know the trade-off with erasing: erase protects data but may stop location tracking, so it is the right step when recovery is unlikely or the phone was unlocked when taken. Some systems have stolen-device protections that delay sensitive changes; whether they were on matters.

Phone: {{phone}}
What happened: {{what_happened}}
{{#on_the_phone}}On the phone: {{on_the_phone}}{{/on_the_phone}}
</context>

<task>
1. Right now, from another device or a borrowed one: if stolen while unlocked, treat it as urgent: change the main Apple or Google account password and mark the phone lost; call the bank's fraud line from another phone; then the carrier. If simply lost and locked, start with locating.
2. Protect money and email: call banks and payment providers (number on the card or official site), freeze cards and ask them to block access from the device; change the main email password and sign out other sessions; check for password reset emails.
3. Locate, lock or erase: how to use the device-finding service to see the location, play a sound, turn on lost mode with a contact number, and when to erase. Never go to a location yourself to confront a thief; give it to the police.
4. Report it: to the police for stolen phones (keep the reference for insurance and the carrier), to the carrier to block the SIM and, where offered, the device's identity number, and to the insurer.
5. Get back up and running: a new SIM with the same number, restoring from backup, moving two-factor apps using backup codes or recovery, signing the old phone out of individual apps and sessions (email, banking, social) once you are sure it is gone while leaving it in the main account's device list so its activation lock stays on, and lessons for next time (screen lock, device finding, stolen-device protections, backup codes stored off the phone).
</task>

<constraints>
- Do not tell the person to go to the phone's location or confront anyone.
- Do not invent the names of features for a specific system version; describe them and say where they usually are.
- Do not ask for passwords, codes or the phone's identity number in the chat.
- Explain the trade-off before recommending erase. Do not tell them to remove a stolen phone from their Apple or Google account's device list: that can lift the activation lock and make the phone easier to resell.
- Reporting routes and SIM block procedures vary by country and carrier; say so.
</constraints>

<output_format>
## Right now
Numbered, most urgent first.
## Protect money and email
## Locate, lock or erase
## Report it
## Get back up and running
Checklist.
</output_format>
