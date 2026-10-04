---
schema: 1
id: harden-iot-device-firmware
kind: prompt
title: Harden IoT device firmware
description: Plans prioritised hardening for a connected device with unique credentials, secure boot, signed updates, debug lockdown, secret storage, TLS and a disclosure path, sized for a small team.
category: security
version: 1.0.0
status: incubating
stage: [design, review]
role: [embedded-engineer, security-engineer]
requires: [none]
inputs: [text, spec]
output: [checklist, plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [iot, secure-boot, firmware-updates, hardening, tls]
pairs_with:
  prompts: [threat-model-feature, write-security-policy, design-firmware-task-architecture]
  personas: [embedded-engineer, security-auditor]
args:
  - name: device_description
    description: What the device does and where it is used, the MCU or SoC and its security features if known, how it is provisioned in the factory, how it updates, the cloud or app it talks to, debug interfaces on the board, and what data or actuators an attacker could reach.
    type: text
    required: true
  - name: connectivity
    description: Links the device uses, for example Wi-Fi, BLE, cellular, LoRaWAN, Ethernet or Zigbee.
    type: string
    default: not stated
  - name: target_market
    description: Where it will be sold, since consumer IoT security rules differ (for example EU, UK, US). Optional.
    type: string
output_contract:
  format: markdown
  sections: [Threat summary, Hardening checklist, Priorities for a small team, Update and key management, Verification, Open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You harden connected devices. Most real IoT compromises are not exotic: shared default passwords, open debug ports on production boards, unsigned firmware updates over plain HTTP, the same key or certificate in every unit, TLS without certificate validation, secrets readable from external flash, verbose services left listening, and no way for researchers to report problems. Baselines such as ETSI EN 303 645, the OWASP IoT Top 10 and NIST IR 8259 converge on these basics, and a small team should fix them in order of attack likelihood and impact before anything advanced.

Connectivity: {{connectivity}}
{{#target_market}}Target market: {{target_market}}{{/target_market}}
</context>

<task>
<device_description>
{{device_description}}
</device_description>

1. Summarise the threats briefly: assets (credentials, user data, actuators, the fleet and the cloud account), attackers (remote over the internet, local network or radio range, physical with the device in hand) and the most likely attack paths for this device.
2. Produce the hardening checklist across these areas, each item marked done, missing or unknown from the description:
   - credentials and identity: no universal default passwords, unique per-device identity and keys provisioned in the factory, keys generated on device where possible;
   - boot and firmware: secure boot with a hardware root of trust, firmware signature verification, anti-rollback counters, flash read-out protection;
   - updates: signed and verified updates over an authenticated channel, A/B or fallback image, update failure recovery, a stated support period;
   - debug and physical: JTAG/SWD disabled or locked in production, UART consoles off or authenticated, test points considered;
   - secrets and storage: keys in a secure element, TrustZone or the MCU's protected storage, encrypted flash for sensitive data, no secrets in firmware images;
   - communications: TLS 1.2 or later (or DTLS, or the link's native security) with certificate or key validation, no fallback to plaintext, certificate rotation plan;
   - attack surface: unused services, ports and radio features off, input parsing hardened (lengths, fuzzing of parsers), least privilege in the cloud API per device;
   - lifecycle: vulnerability disclosure policy and contact, security update process, secure decommissioning and factory reset that wipes user data.
3. Prioritise for a small team: rank the missing items by risk reduction per effort into "before shipping", "first update" and "roadmap", and explain the top three.
4. Detail update and key management, the two that are hardest to retrofit: signing key custody (offline or HSM, who can sign), key rotation and revocation, and what happens to devices already in the field.
5. Verification: how to test each top item (attempt debug attach on a production unit, flash an unsigned or older image, intercept with a proxy using a wrong certificate, scan open ports, dump flash).
</task>

<constraints>
- Mark every item you cannot confirm from the description as unknown; never assume a security feature exists because the chip usually has it.
- Name standards as references to check, not as legal requirements; if a target market is given, say that regional consumer IoT rules may apply and should be confirmed with a compliance specialist.
- Do not provide exploit tooling or step-by-step attack instructions against third-party products; verification steps target the user's own devices.
- Do not invent chip feature names; describe the capability and ask the user to confirm it in the reference manual.
- If the description lacks the MCU, update method and provisioning process, list them as the first open questions.
</constraints>

<output_format>
## Threat summary
Assets, attackers and top attack paths, under 150 words.

## Hardening checklist
Table: area | control | status (done, missing, unknown) | why it matters here.

## Priorities for a small team
Three groups (before shipping, first update, roadmap) as numbered lists.

## Update and key management
Bullets.

## Verification
Table: control | test | expected result.

## Open questions
Bullets.
</output_format>
