---
schema: 1
id: set-up-phone-and-data-abroad
kind: prompt
title: Set up phone and data abroad
description: Chooses the best way to stay connected abroad by comparing roaming, a local SIM, an eSIM and Wi-Fi, with phone compatibility checks, setup steps, two-factor login safety and bill-shock prevention.
category: travel-logistics
version: 1.0.0
status: incubating
stage: [plan]
role: [traveler]
requires: [none]
inputs: [preferences, text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [esim, roaming, local-sim, mobile-data, two-factor-authentication]
pairs_with:
  prompts: [plan-first-trip-abroad, build-packing-list, master-city-transit]
args:
  - name: destination
    description: Country or countries you will visit.
    type: string
    required: true
  - name: days
    description: Number of days abroad.
    type: number
    required: true
  - name: phone
    description: Your phone model, whether it was bought from a carrier or on contract, and your home carrier and plan if known.
    type: string
    required: true
  - name: data_needs
    description: light is messaging and maps; moderate adds social media and some video calls; heavy adds streaming, hotspot for a laptop or remote work.
    type: enum
    enum: [light, moderate, heavy]
    default: moderate
output_contract:
  format: markdown
  sections: [Check your phone first, Options compared, Recommendation, Setup steps, Keep your logins working, Avoid bill shock, If it does not work]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The cheapest connection is useless if the phone is carrier-locked, lacks eSIM support or does not support the destination's network bands, and the most convenient one can produce a large bill if data roaming stays on for the home line. Travellers also forget that the home number still receives the one-time codes for banking and email, so switching SIMs carelessly can lock them out of their accounts. You compare the realistic options for this trip and give exact setup steps, without quoting carrier prices that change constantly.

Destination: {{destination}}
Days: {{days}}
Phone: {{phone}}
Data needs: {{data_needs}}
</context>

<task>
1. Check your phone first: carrier lock (how to check and ask for an unlock before leaving), eSIM support for this model (some regional variants lack it; tell them where to confirm in settings), dual-SIM capability, and network band compatibility for {{destination}} as something to confirm if the model is older or from another region.
2. Options compared for {{days}} days and {{data_needs}} use: home roaming (day pass, bundle, or included zones such as regional roam-like-home areas where they apply, to check with the carrier), local physical SIM (identity registration with a passport is required in many countries; airport versus city shops), travel eSIM (usually data only, no local number; install before departure; when the validity clock starts), pocket Wi-Fi for groups, and Wi-Fi only. For each: what it suits, setup effort, typical trade-offs, and what to check. No specific prices or carrier names.
3. Recommendation for this trip, with a rough data estimate per day for {{data_needs}} use, stated as an estimate.
4. Setup steps for the recommended option, in order, including what to do at home on Wi-Fi before leaving.
5. Keep your logins working: keep the home line active for calls and texts with data roaming off, or move two-factor codes to an authenticator app before leaving; check the banking app works abroad; save backup codes.
6. Avoid bill shock: data roaming off on the home line, low-data mode, background refresh and cloud photo backup off on mobile data, offline maps and translation downloaded, usage alerts.
7. If it does not work: APN settings, restarting with airplane mode, checking the data line is selected, and where to get help.
8. Before writing, check that no price or carrier-specific claim is stated as fact.
</task>

<constraints>
- No prices, carrier names or product recommendations; describe option types and what to check.
- Mark anything model-specific you are not sure of as "check in your phone's settings or the manufacturer's site".
- Mention that some countries restrict certain apps or services; suggest checking ahead without advising on how to bypass local law.
</constraints>

<output_format>
## Check your phone first
Checklist.

## Options compared
Table: Option | Best for | Setup effort | Watch out for | Check.

## Recommendation
Two or three lines with a data estimate.

## Setup steps
Numbered, split into "At home" and "On arrival".

## Keep your logins working
Bullets.

## Avoid bill shock
Checklist.

## If it does not work
Bullets.
</output_format>
