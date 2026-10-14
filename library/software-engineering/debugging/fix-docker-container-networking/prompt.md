---
schema: 1
id: fix-docker-container-networking
kind: prompt
title: Fix Docker container networking
description: Fixes containers that cannot reach each other, the host or the internet, or cannot be reached from the browser, covering localhost confusion, Compose networks, published ports, bind addresses and DNS.
category: debugging
version: 1.0.0
status: incubating
stage: [build, operate]
role: [software-engineer, backend-engineer, devops-engineer]
stack: [docker]
requires: [none]
inputs: [config, logs, text]
output: [explanation, config]
risk: read-only
invocation: user
effort: quick
interaction: interactive
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [container-networking, port-mapping, dns, localhost, bind-address]
pairs_with:
  prompts: [fix-docker-build-failure, fix-database-connection-failure]
args:
  - name: symptom
    description: Who cannot reach whom, and the exact error, for example "api container gets ECONNREFUSED to redis:6379", "browser cannot open localhost:3000", "container cannot reach the internet or a VPN host", "container cannot call a service running on my laptop".
    type: text
    required: true
  - name: setup
    description: The compose file or docker run commands, the host OS (Linux, macOS, Windows with WSL2), whether Docker Desktop, Podman or rootless Docker is used, and what address and port each service listens on.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Who is talking to whom, Cause, Fix, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an engineer who fixes Docker networking by naming the source and destination of each connection and the network namespace each one lives in. The usual traps:
- `localhost` inside a container is that container. Container to container on the same Compose project uses the service name (`db:5432`) and the container port, not the published host port.
- A server bound to `127.0.0.1` inside the container is unreachable from outside it even when the port is published; it must listen on `0.0.0.0`. Several dev servers (Vite, Flask, Rails) default to localhost.
- `ports: "3000:3000"` publishes to the host; `expose` does not. The left number is the host port.
- Container to host: `host.docker.internal` works on Docker Desktop; on Linux it needs `extra_hosts: ["host.docker.internal:host-gateway"]`, and the host service must listen on an address the bridge can reach, not only `127.0.0.1`.
- Services in different Compose projects or `docker run` containers on the default bridge do not share DNS; they need a shared user-defined network.
- `depends_on` orders start-up but does not wait for readiness unless combined with a healthcheck condition; the first connection attempt can fail.
- No internet or wrong DNS inside containers: corporate VPNs and proxies, `/etc/resolv.conf` pointing at a local resolver such as `127.0.0.53`, MTU issues on VPNs causing hangs on large responses, or `HTTP_PROXY` not passed into the container.
- Host firewalls (ufw, firewalld) interact with Docker's own rules, and published ports can bypass ufw on Linux.
</context>

<task>
Fix this container networking problem.

Symptom:
{{symptom}}

Setup:
{{setup}}

1. If you can read the repository, open the compose files, Dockerfiles and the app config that sets hosts and ports before answering.
2. State the connection: source (container, host, browser), destination, the address and port used, and which network namespace each side is in.
3. Name the cause from the traps above that fits, checked against the config. If not certain, give checks run from the source side (`docker compose exec <svc> getent hosts <name>`, a connection test to the port, `docker compose ps` for published ports, `ss -ltnp` or the app log for the listen address, `docker network inspect`), ask for output, then stop.
4. Give the fix as a compose or config diff: the service name instead of localhost, listening on `0.0.0.0`, a published port, `host-gateway` mapping, a shared network, a healthcheck with `depends_on: condition: service_healthy`, DNS or proxy settings for the daemon or container.
5. Give a check from the same source that failed.
</task>

<constraints>
- Do not suggest `network_mode: host` as the fix unless the user needs it and is on Linux; say what isolation it removes and that it behaves differently on Docker Desktop.
- Do not publish database or cache ports to all interfaces on a server just to make container-to-container traffic work; that traffic does not need published ports.
- Do not suggest disabling the host firewall.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Who is talking to whom
Source, destination, address, port, namespaces.
## Cause
The cause, or the checks to run.
## Fix
Compose or config diff.
## Check
Command to run from the failing source.
</output_format>
