---
schema: 1
id: harden-wordpress-site
kind: prompt
title: Harden a WordPress site
description: Hardens a live WordPress site with a plugin and theme audit, update policy, admin access, file editing, XML-RPC, least-privilege users, tested backups and a web application firewall.
category: security
version: 1.0.0
status: incubating
stage: [ship, operate]
role: [devops-engineer, fullstack-engineer, security-engineer]
stack: [wordpress]
requires: [none]
inputs: [config, text]
output: [checklist, config, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [hardening, plugin-audit, wp-config, backups, web-application-firewall]
pairs_with:
  prompts: [build-wordpress-plugin, harden-web-app-config, harden-linux-server]
  personas: [wordpress-developer]
args:
  - name: site
    description: What the site is (blog, shop, membership), its hosting (managed WordPress, shared hosting, VPS), and who logs in.
    type: text
    required: true
  - name: plugins
    description: The list of active and inactive plugins and the theme, with versions if you have them (from Plugins > Installed or `wp plugin list`).
    type: text
  - name: incident
    description: Anything that already happened, such as spam pages, unknown admin users or a host warning. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Plugin and theme audit, Hardening steps, wp-config settings, Backups and recovery, Monitoring, What not to do]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
WordPress core is rarely how sites get hacked; outdated and abandoned plugins and themes are, followed by reused admin passwords and nulled (pirated) premium plugins that ship with backdoors. Inactive plugins still have reachable files, so they must be deleted, not just deactivated. Security plugins help but are not a substitute for fewer plugins, automatic updates and a working restore. On managed hosts many server-level controls are already done and some plugins conflict with the host's own caching or firewall, so advice must fit the hosting type. If there are signs of compromise (unknown admins, spam pages, redirects for search visitors only), hardening first is the wrong order: the site needs cleanup from a known-good backup or a professional cleanup, and every password and key rotated, or the attacker's backdoor stays.
</context>

<task>
Produce a hardening plan for: {{site}}
{{#plugins}}Plugins and theme: {{plugins}}{{/plugins}}
{{#incident}}Already observed: {{incident}}{{/incident}}

1. If anything in the input suggests an active compromise, say so first and give the cleanup order (take a copy for evidence, restore or clean, rotate all passwords and salts, then harden) before anything else.
2. Audit plugins and theme: mark each to keep, replace or delete, flagging ones that are inactive, unmaintained (no update in over a year, closed on the plugin directory), duplicated in function, or from untrusted sources. Do not invent version vulnerabilities; tell the user to check each against a vulnerability database they trust.
3. Updates: turn on automatic minor core updates and plugin auto-updates for low-risk plugins, with a staging check for big ones (WooCommerce, page builders).
4. Accounts and login: remove unused admins, give editors and authors the lowest role that works, enforce two-factor authentication for admins, limit login attempts, and do not use "admin" as a username.
5. Give the `wp-config.php` settings with values: `DISALLOW_FILE_EDIT`, `FORCE_SSL_ADMIN`, unique salts, `WP_DEBUG` off in production, and file permissions (no 777).
6. Attack surface: disable XML-RPC unless Jetpack or the mobile app needs it, block PHP execution in `wp-content/uploads`, hide directory listings, and restrict `wp-admin` by IP only if the team has fixed IPs.
7. Add a web application firewall suited to the hosting (host-provided, a plugin firewall, or a CDN in front), and HTTPS everywhere.
8. Backups: off-site, daily for a shop, with a retention window longer than the time a compromise might go unnoticed, and a scheduled test restore.
9. Monitoring: file change alerts, uptime and admin-login notifications.
</task>

<constraints>
- Fit every step to the hosting type given; mark steps the host already handles or forbids.
- Do not name specific vulnerabilities or versions you cannot verify.
- Never recommend nulled plugins or disabling updates to "keep things stable".
- Tell the user to take a full backup before making changes.
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Plugin and theme audit
Table: name, verdict (keep, replace, delete), reason.
## Hardening steps
Numbered steps in order, each with where to do it (dashboard, host panel, file).
## wp-config settings
A code block with the exact lines to add.
## Backups and recovery
Schedule, location, retention and how to test a restore.
## Monitoring
What to watch and how alerts reach someone.
## What not to do
Short list of common mistakes for this setup.
</output_format>
