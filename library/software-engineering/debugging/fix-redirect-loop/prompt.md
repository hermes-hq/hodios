---
schema: 1
id: fix-redirect-loop
kind: prompt
title: Fix an infinite redirect loop
description: Fixes "too many redirects" loops caused by HTTPS behind proxies, auth middleware, trailing-slash rules, CDN settings or locale and canonical-host redirects.
category: debugging
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, fullstack-engineer, devops-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [logs, config, repo]
output: [explanation, diff]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [redirects, reverse-proxy, https, middleware]
pairs_with:
  prompts: [fix-cookie-not-being-set, debug-network-request]
args:
  - name: symptom
    description: "The URL that loops, where it happens (all users, logged-out users, production only, after a CDN or TLS change), and the error the browser shows."
    type: text
    required: true
  - name: evidence
    description: "The redirect chain from `curl -sIL --max-redirs 10 <url>` or the browser Network tab (status codes and Location headers), plus the relevant app middleware, web server, proxy or CDN config."
    type: text
output_contract:
  format: markdown
  sections: [The redirect chain, Which two rules disagree, Fix, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an engineer who fixes redirect loops by listing every hop and who issued it. A loop is always at least two rules that disagree about the canonical URL or the user's state. Typical pairs:
- HTTPS behind a proxy: TLS terminates at a load balancer or CDN, the app sees HTTP and redirects to HTTPS, the proxy forwards HTTP again. Fix by trusting `X-Forwarded-Proto` in the app or server, or by setting the CDN to connect to the origin over HTTPS (Cloudflare "Flexible" SSL with an origin that forces HTTPS is the classic case).
- Two layers both enforcing a canonical host or slash: the CDN adds `www`, the app strips it; the server adds a trailing slash, the framework removes it.
- Auth: the login page itself requires authentication; middleware redirects to `/login` for a path matcher that includes `/login` or its static assets; a session cookie that is never stored (see SameSite and Secure) so every request looks logged out; a callback URL that redirects back to a protected page before the session is saved.
- Locale or geolocation redirects based on a cookie that is not set.
- Cached 301 responses in the browser keep looping after the server is fixed; test with curl or a private window.
</context>

<task>
Fix this redirect loop.

Symptom:
{{symptom}}
{{#evidence}}

Evidence:
{{evidence}}
{{/evidence}}

1. If you have no redirect chain, give the curl command to get one and ask for its output while reading the code and config. Do not guess the loop without it if the config does not make it obvious.
2. Read every layer that can redirect: CDN rules, load balancer, web server (nginx, Apache), framework middleware and route config, auth library settings.
3. Write out the chain and attribute each hop to a layer, using headers such as `Server`, `Via`, `cf-ray` or app-specific headers.
4. Identify the rules that disagree and decide which one should own the redirect (usually one layer for HTTPS and host, the app for auth).
5. Change that one rule: trust forwarded headers, align the origin protocol, exclude the login and asset paths from auth middleware, make the slash and host policy consistent, or fix the cookie that is not stored.
6. Verify with curl (one redirect at most to the canonical URL) and in a private window.
</task>

<constraints>
- Do not remove HTTPS enforcement or authentication to break the loop.
- Use 302 or 307 while testing redirect changes; a mistaken 301 gets cached by browsers.
- Say when a change must be made in a CDN or hosting dashboard that you cannot see.
{{> guardrails/investigate-before-answering}}
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## The redirect chain
Each hop: URL, status, Location, and which component issued it.
## Which two rules disagree
The two (or more) rules that send the request back and forth, and why each believes it is right.
## Fix
The change to the one rule that should change.
## Verification
The curl check showing a single redirect or none, and the browser check with cleared cache.
</output_format>
