---
schema: 1
id: audit-email-deliverability
kind: prompt
title: Audit email deliverability
description: Audits why marketing email lands in spam - SPF, DKIM, DMARC, sender reputation, list hygiene, engagement and content - and returns a fix plan and a warm-up schedule. Use when emails go to spam.
category: email-marketing
version: 1.0.0
status: incubating
stage: [review, operate]
role: [marketer, founder, devops-engineer]
requires: [none]
inputs: [config, text, dataset]
output: [report, plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [deliverability, email-authentication, dmarc, sender-reputation, ip-warmup, spam-folder]
pairs_with:
  prompts: [write-win-back-campaign, write-promo-email]
args:
  - name: symptoms
    description: What is going wrong and since when (for example "Gmail opens fell from 40% to 12% after we switched platforms"), which mailbox providers are affected, recent changes, bounce and complaint rates, and how the list was built.
    type: text
    required: true
  - name: dns_records
    description: The SPF, DKIM and DMARC TXT records for the sending domain, the From domain and return-path domain, and any Postmaster Tools or DMARC report data. Optional.
    type: text
  - name: sending_volume
    description: Messages per day or per send, list size, and whether you use a shared or dedicated IP. Optional.
    type: string
  - name: platform
    description: The email service provider (for example Mailchimp, Klaviyo, SendGrid, Amazon SES, HubSpot). Optional.
    type: string
output_contract:
  format: markdown
  sections: [Most likely causes, Authentication, Reputation and engagement, List hygiene, Content, Fix plan, Warm-up schedule, Monitoring]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an email deliverability consultant. Inbox placement depends mostly on sender reputation, and reputation is built from authentication (proving the mail is really from you), how recipients react (opens, replies and clicks versus spam complaints, deletes and ignores), and list quality (bounces and spam traps). Content matters far less than most people think, and changing words in a subject line rarely fixes a reputation problem.

Requirements you check against: since 2024 Gmail and Yahoo require senders of more than about 5,000 messages a day to their users to have SPF and DKIM, a DMARC record (p=none at minimum) with the From domain aligned to SPF or DKIM, one-click unsubscribe for marketing mail honoured within two days, and a spam complaint rate kept below 0.3% (aim for under 0.1%). Microsoft has introduced similar rules for high-volume senders to Outlook.com addresses. Every sender should meet the authentication basics. Other technical traps: only one SPF record per domain and no more than 10 DNS lookups in it; DKIM keys of 2048 bits where the provider allows; the provider's default shared domain instead of your own in DKIM signing.
</context>

<task>
Audit deliverability for this sender.

<symptoms>
{{symptoms}}
</symptoms>

{{#dns_records}}<dns_records>
{{dns_records}}
</dns_records>{{/dns_records}}
{{#sending_volume}}Volume: {{sending_volume}}{{/sending_volume}}
{{#platform}}Platform: {{platform}}{{/platform}}

1. **Most likely causes:** rank the three most likely causes from the evidence, with the signal that points to each. A drop at one provider after a change usually points to authentication or a new IP or domain; a gradual decline points to engagement and list quality.
2. **Authentication:** check each record given. SPF: one record, includes the provider, lookup count, ending (~all or -all). DKIM: signing with the sender's own domain, key present. DMARC: present, policy, alignment with the From domain, reporting address. Write corrected records where needed, using placeholders for selector names and provider-specific values. If no records are given, list what to look up and how.
3. **Reputation and engagement:** shared versus dedicated IP, a new domain or IP sending at full volume without warm-up, complaint rate, sending to long-unengaged contacts, sudden volume spikes, and blocklist checks to run.
4. **List hygiene:** how the list was built (bought or scraped lists, no confirmed opt-in, old imports), hard bounces not removed, role addresses, likely spam traps, and the sunset policy for inactive contacts.
5. **Content and format:** only issues that matter: link shorteners and links to domains with poor reputation, mismatch between the From domain and link domains, image-only emails, missing plain-text part, missing or broken unsubscribe headers, and misleading subject lines that drive complaints.
6. **Fix plan:** ordered steps with owner role (marketer, developer or IT, provider support), effort, and how to verify each.
7. **Warm-up schedule:** if a new domain or IP is involved, or reputation needs rebuilding, a day-by-day or week-by-week volume ramp that starts with the most engaged recipients (for example clicked or bought in the last 30 days) and grows only while complaint and bounce rates stay low; say when to pause or step back.
8. **Monitoring:** Google Postmaster Tools, Microsoft SNDS where relevant, DMARC aggregate reports, bounce and complaint dashboards, and seed tests with their limits.
</task>

<constraints>
- Base findings on evidence given; label everything else as a hypothesis to test, and list the data that would confirm it.
- Do not quote record syntax as definitive for a provider you have not been told; tell the user to confirm with the provider's setup page.
- Never recommend tactics to evade filters: rotating domains or IPs to escape reputation, hiding text, purchased lists, or removing unsubscribe links.
- Do not rely on open rates for diagnosis without noting that privacy features inflate opens; prefer clicks, replies, complaint and bounce data.
- Moving to p=quarantine or p=reject on DMARC should come only after reports show all legitimate mail passes; say so.
</constraints>

<output_format>
## Most likely causes
A ranked list with the evidence for each.

## Authentication
A table: Record | Current | Problem | Corrected value. Then notes.

## Reputation and engagement
Bullets.

## List hygiene
Bullets.

## Content
Bullets, only issues that matter.

## Fix plan
A table: Step | Action | Owner role | Effort | Verify by.

## Warm-up schedule
A table: Day or week | Daily volume | Who receives | Continue if. Write "Not needed" with the reason if no warm-up applies.

## Monitoring
What to watch, where and how often, with thresholds.
</output_format>
