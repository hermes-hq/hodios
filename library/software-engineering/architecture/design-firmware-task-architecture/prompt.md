---
schema: 1
id: design-firmware-task-architecture
kind: prompt
title: Design a firmware task architecture
description: Designs firmware structure, choosing a superloop, cooperative scheduler or RTOS, with priorities, stack sizes, inter-task communication, layering and how deadlines are met and checked.
category: architecture
version: 1.0.0
status: incubating
stage: [design]
role: [embedded-engineer, architect]
stack: [c]
requires: [none]
inputs: [spec, text]
output: [plan, diagram, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [rtos, scheduling, real-time, firmware, interrupts]
pairs_with:
  personas: [embedded-engineer]
  prompts: [write-microcontroller-firmware, write-adr]
args:
  - name: product_requirements
    description: What the device does, its inputs and outputs, timing requirements (sample rates, control loop periods, response deadlines), communication links, power budget and sleep needs, safety or certification needs, and existing code.
    type: text
    required: true
  - name: mcu
    description: Microcontroller and memory (flash and RAM), clock speed, and any RTOS or SDK already chosen, for example STM32L4 with 128 KB RAM and FreeRTOS, or nRF52840 with Zephyr.
    type: string
    default: not chosen
output_contract:
  format: markdown
  sections: [Timing requirements, Execution model, Task table, Communication, Layering, Meeting deadlines, Risks and questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design the execution architecture of a firmware product. The core choice is between a superloop with interrupts, a cooperative run-to-completion scheduler (time-triggered or event-driven with active objects), and a preemptive RTOS. Firmware architectures fail in recognisable ways: an RTOS added by habit to a device that needed a simple state machine, too many tasks each with an oversized stack, priorities assigned by importance rather than deadline, priority inversion on a shared mutex, long work inside interrupt handlers, blocking calls in high-priority tasks, and deadlines that were never measured. Hardware abstraction leaking into application logic makes testing off target impossible.

MCU and platform: {{mcu}}
</context>

<task>
<product_requirements>
{{product_requirements}}
</product_requirements>

1. List every timing requirement as an activity with its trigger (periodic or event), period or minimum inter-arrival time, deadline, estimated execution time (mark as estimate) and consequence of a miss (hard, firm or soft). Compute rough CPU utilisation and flag anything above about 70% as needing measurement.
2. Choose the execution model and justify it against the requirements: superloop when there are few activities with loose deadlines; cooperative scheduler or active objects when activities are event-driven and short; preemptive RTOS when there are independent activities with tight deadlines, blocking communication stacks, or long computations that must not delay urgent work. Note low-power implications (tickless idle, sleep entry point).
3. For an RTOS or scheduler design, produce the task table: task, responsibility, trigger, priority with reasoning (rate monotonic: shorter period gets higher priority, adjusted for deadlines), initial stack size as a starting estimate to be measured with high-water marks, and what it blocks on. Keep interrupt handlers minimal: acknowledge, capture data, defer to a task or queue.
4. Specify communication: queues for data flow, event flags or notifications for signals, mutexes with priority inheritance for shared resources (or a single owner task instead), lock-free ring buffers between interrupts and tasks, and which data is shared and how it is protected. Call out any path with priority inversion risk.
5. Define layering: board support and HAL, drivers, middleware (communication stacks, file systems), services, application. State the rule that the application never touches registers, and how layers are faked for off-target tests.
6. Explain how deadlines are met and verified: worst-case execution time measurement (GPIO toggles with a logic analyser or cycle counters), stack high-water checks, a watchdog strategy that feeds only when all critical tasks report progress, and runtime counters for missed deadlines.
</task>

<constraints>
- Mark every execution-time, stack and memory number as an estimate to measure; never present it as fact.
- If timing requirements or the MCU's RAM are missing, ask for them and stop; they decide the model.
- Do not invent vendor API names; describe RTOS features generically (queue, notification, mutex with priority inheritance) and name the API only when sure.
- If the device is safety-critical (medical, automotive, industrial safety functions), say that the design must follow the relevant functional safety standard and process, and that this output is not a substitute for it.
- Fit the design inside the stated RAM with a margin of at least 20%.
</constraints>

<output_format>
## Timing requirements
Table: activity | trigger | period or inter-arrival | deadline | est. execution time | miss consequence. Then utilisation.

## Execution model
The choice and why, in under 150 words.

## Task table
Table: task or ISR | responsibility | trigger | priority | stack (est.) | blocks on.

## Communication
A Mermaid diagram of tasks, ISRs and channels, then bullets on shared data and protection.

## Layering
Layers with responsibilities and the test seam for each.

## Meeting deadlines
Checklist of measurements, watchdog design and runtime checks.

## Risks and questions
Bullets.
</output_format>
