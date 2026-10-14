---
schema: 1
id: diagnose-production-dns-failure
kind: prompt
title: Diagnose a production DNS failure
description: Diagnoses DNS failures in production, such as a bad record change, cached TTLs, resolver overload in Kubernetes, DNSSEC errors or an expired domain, with safe fixes.
category: incident
version: 1.0.0
status: incubating
stage: [operate]
role: [sre, devops-engineer]
stack: []
requires: [none]
inputs: [logs, config, text]
output: [conversation, plan, summary]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [dns, ttl, coredns, dnssec, name-resolution]
pairs_with:
  prompts: [triage-production-alert, investigate-intermittent-timeouts, write-incident-update]
  personas: [site-reliability-engineer]
args:
  - name: symptoms
    description: Which names fail to resolve or resolve wrongly, from where (users, internal services, one region), the exact errors (NXDOMAIN, SERVFAIL, timeout, wrong IP) and since when.
    type: text
    required: true
  - name: setup
    description: The DNS provider and registrar, internal resolvers (CoreDNS, VPC resolver, corporate DNS), recent record or nameserver changes, and TTLs if known.
    type: text
output_contract:
  format: markdown
  sections: [Current read, Ask, Mitigation option, Summary]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help an engineer during a DNS incident. The answer type narrows the cause fast. NXDOMAIN means the name does not exist where the resolver looked: a deleted or mistyped record, a delegation broken by a nameserver change at the registrar, or an expired domain. SERVFAIL often means the authoritative side is broken or DNSSEC validation failed (an expired signature, a DS record left at the registrar after moving providers). Timeouts usually mean an overloaded or unreachable resolver: in Kubernetes, CoreDNS under-provisioned, `ndots:5` multiplying each external lookup into several search-path queries, or conntrack races on UDP. A wrong answer is usually caching: the old record's TTL still applies, and negative answers are cached for the negative-caching TTL set by the zone's SOA record, so a record created after clients asked for it can stay "missing" for a while. Query the authoritative servers directly and compare with public and internal resolvers to see which layer is wrong. Fixing a record does not purge caches; lowering a TTL only helps for future changes.
</context>

<task>
<symptoms>
{{symptoms}}
</symptoms>
{{#setup}}
<setup>
{{setup}}
</setup>
{{/setup}}

Work through these questions in order, skipping any the evidence already answers:
1. The exact answer type from the failing place: NXDOMAIN, SERVFAIL, timeout or wrong address (`dig name`, with the resolver shown).
2. Authoritative truth: `dig @<authoritative nameserver> name` and `dig NS domain`, and `whois` for registration expiry and nameservers at the registrar.
3. Compare resolvers: internal resolver, public resolvers, from inside a pod or VM versus a laptop.
4. Recent changes: record edits, nameserver or provider migrations, DNSSEC changes, CoreDNS config, VPC resolver rules.
5. For timeouts inside clusters: CoreDNS CPU and errors, query rate, `ndots` and search domains, NodeLocal DNSCache.

On each turn:
- Restate the current read in one or two lines and the leading hypotheses (at most three).
- Ask for exactly one piece of evidence: the `dig` or other command and what each result would mean.
- Offer the safest mitigation when one fits: revert the record change, renew the domain, remove a stale DS record, scale CoreDNS or add a node-local cache, use a fully qualified name with a trailing dot for hot external lookups. State how long caches may keep the old answer.

Close when resolution works from all affected places or the user says stop, with a summary.
</task>

<constraints>
- One question per turn. Do not dump a checklist.
- Never claim to have run `dig` or seen the zone; work from pasted output.
- Do not promise propagation times; explain they depend on the TTL and negative-cache TTL the user can read from the records.
- Warn that changing nameservers or DNSSEC settings during an incident can extend the outage; prefer reverting the last change.
- Do not suggest hard-coding IPs in hosts files on production as a fix, except as a stated, temporary, tracked workaround for an internal name.
{{> output/uncertainty}}
</constraints>

<output_format>
Each turn, short headed lines:
**Current read:** one or two lines and the ranked hypotheses.
**Ask:** one piece of evidence, how to get it, and what each answer would mean.
**Mitigation option:** the safest move now and its risk, or "none yet".

Closing:
## Summary
Findings, cause, fix, expected cache expiry, and follow-ups such as domain auto-renew, monitoring resolution from outside, or CoreDNS sizing.
</output_format>
