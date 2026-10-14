---
schema: 1
id: migrate-wordpress-site-to-new-host
kind: prompt
title: Migrate a WordPress site to a new host
description: Moves a WordPress site to a new host or domain with a content freeze, files and database transfer, serialization-safe URL replacement, DNS, SSL, email and caching checks, and a rollback path.
category: migration
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [fullstack-engineer, devops-engineer, maintainer]
stack: [wordpress]
requires: [shell]
inputs: [text]
output: [plan, checklist]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [hosting, dns, wp-cli, ssl, domain-change, cutover]
pairs_with:
  prompts: [plan-site-migration-seo, harden-wordpress-site, fix-wordpress-critical-error]
args:
  - name: notes
    description: "Old and new host types (shared, managed, VPS), whether the domain changes, access available (SSH, WP-CLI, control panel only), site size, WooCommerce or memberships, email setup, caching or CDN."
    type: text
output_contract:
  format: markdown
  sections: [Starting point, Preparation, Move steps, Cutover, Checks after cutover, Rollback]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
WordPress moves break in predictable places. What experienced people know: WordPress stores full URLs in the database, many inside PHP-serialized strings whose length prefixes break if you do a plain SQL find-and-replace, so URL changes must use a serialization-aware tool such as WP-CLI's `search-replace` (with a dry run first, and usually leaving the `guid` column alone). Sites that take orders, comments or sign-ups need a content freeze or a final delta sync, otherwise orders placed during the move are lost. Lowering the DNS TTL a day or more before cutover makes the switch and any rollback fast. Testing the new host before DNS changes is possible by pointing your own machine at it with a hosts file entry. SSL certificates on the new host often need DNS to point there first, unless the host supports a DNS-based challenge or you bring the certificate. Email is frequently forgotten: MX records may live at the old host, and SPF records must include whatever now sends mail from the site. Caching plugins, object cache drop-ins and CDN settings can hold old paths or hosts. PHP version, extensions, file permissions, `.htaccess` or nginx rules, cron, and absolute paths in `wp-config.php` or plugin settings all need checking. Keep the old host running until the new one has been stable for a while.
</context>

<task>
Plan and guide the move of this WordPress site to its new host.
{{#notes}}
Notes:
{{notes}}
{{/notes}}

1. Ask for what is missing: access on both hosts, whether the domain changes, where DNS and email are hosted, and whether the site takes orders or user content.
2. Inventory the old site: WordPress, PHP and database versions, plugins and theme, uploads size, `wp-config.php` constants, caching, CDN, cron jobs, email sending method, and any custom server rules.
3. Prepare: lower DNS TTL, match PHP version and extensions on the new host, take and verify a full backup of files and database, and decide the content freeze window.
4. Move: copy files, export and import the database (with WP-CLI where available, otherwise the host's tools), update `wp-config.php` database settings, and if the URL changes run a dry-run `search-replace` then the real one.
5. Test the new host before DNS changes via a hosts file entry: front end, admin login, forms, checkout, media, permalinks (flush rewrite rules), and scheduled tasks.
6. Cutover: start the freeze, sync any final database changes, switch DNS, issue or install the certificate, and update email records if mail moves.
7. After cutover: check HTTPS and redirects, mail delivery, caches and CDN purged, error logs, cron, and for a domain change, 301 redirects from the old domain and the search engine change-of-address tools.
8. Keep the old host intact for an agreed period and write down the rollback step (point DNS back).
</task>

<constraints>
- Never use a plain SQL find-and-replace on URLs; it corrupts serialized data.
- Take and verify a backup before any import or replacement; do not run commands that overwrite the old site.
- Do not ask for or store passwords in the plan; refer to credentials by where they are kept.
- Ask before running any command on a live host, and say which host each command runs on.

{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Starting point
Site inventory, hosts, domain change, risks found.
## Preparation
Checklist with timing (TTL, backups, PHP match, freeze window).
## Move steps
Ordered steps with the host each runs on.
## Cutover
Steps in order with timing and who does what.
## Checks after cutover
Checklist covering HTTPS, email, forms, orders, caches, cron, logs.
## Rollback
How to go back and until when the old host stays.
</output_format>
