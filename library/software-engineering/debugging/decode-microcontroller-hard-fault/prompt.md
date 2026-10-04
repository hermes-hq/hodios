---
schema: 1
id: decode-microcontroller-hard-fault
kind: prompt
title: Decode a microcontroller hard fault
description: Decodes an ARM Cortex-M HardFault or similar exception from fault status registers and the stacked frame, locates the faulting instruction via the map file and names the likely cause.
category: debugging
version: 1.0.0
status: incubating
stage: [verify, maintain]
role: [embedded-engineer]
stack: [c, cpp]
requires: [none]
inputs: [stack-trace, logs, file]
output: [report, code]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [hardfault, cortex-m, fault-registers, stack-overflow, firmware, map-file]
pairs_with:
  personas: [embedded-engineer, debugger]
  prompts: [debug-native-crash, implement-interrupt-safe-buffer]
args:
  - name: fault_registers
    description: Everything captured at the fault - CFSR, HFSR, MMFAR, BFAR, the stacked R0-R3, R12, LR, PC, xPSR, the EXC_RETURN value in LR on exception entry, MSP or PSP - plus the core (M0+, M3, M4, M7, M33), toolchain and RTOS. Paste raw hex.
    type: text
    required: true
  - name: map_or_code
    description: The relevant part of the .map file or `objdump -d` around the PC and LR, and the code of the function involved. Leave empty if you only have the registers.
    type: text
    default: not provided
output_contract:
  format: markdown
  sections: [Register decode, Faulting location, Likely cause, Confirm it, Fix, Add a fault handler]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user's firmware hit a fault. On ARMv7-M and ARMv8-M, the Configurable Fault Status Register (CFSR at 0xE000ED28) packs three registers: MMFSR (bits 0-7: IACCVIOL, DACCVIOL, MUNSTKERR, MSTKERR, MLSPERR, MMARVALID), BFSR (bits 8-15: IBUSERR, PRECISERR, IMPRECISERR, UNSTKERR, STKERR, LSPERR, BFARVALID) and UFSR (bits 16-31: UNDEFINSTR, INVSTATE, INVPC, NOCP, STKOF on v8-M, UNALIGNED, DIVBYZERO). HFSR FORCED means a configurable fault escalated; VECTTBL means a bad vector fetch. MMFAR and BFAR are valid only when their VALID bits are set. Imprecise bus faults report a PC after the real culprit (often a buffered write), so disabling write buffering (DISDEFWBUF in ACTLR on M3/M4) makes them precise for debugging. EXC_RETURN tells which stack (MSP or PSP) holds the frame and whether an FPU frame was stacked. Cortex-M0/M0+ have no CFSR: only the stacked frame and context are available. INVSTATE usually means a branch to an address with bit 0 clear (a corrupted function pointer or vector), NOCP an FPU instruction with the FPU disabled, and stacking errors (MSTKERR, STKERR) a stack overflow.
</context>

<task>
<fault_registers>
{{fault_registers}}
</fault_registers>

<map_or_code>
{{map_or_code}}
</map_or_code>

1. If CFSR and HFSR or the stacked PC and LR are missing, say so, give a minimal fault handler that captures them (naked assembly that picks MSP or PSP from EXC_RETURN bit 2 and passes the frame to a C function), and stop after a short list of what the partial data already suggests.
2. Decode every set bit of CFSR and HFSR in a table, and say whether MMFAR or BFAR are valid.
3. Locate the fault: map the stacked PC (and LR for the caller) to function and line with the map file, `arm-none-eabi-addr2line -e app.elf -f -C <pc>` or `objdump -d`, noting that LR has bit 0 set for Thumb and may be an EXC_RETURN value if the fault happened in an interrupt.
4. Rank likely causes using all clues: null or wild pointer (fault address near 0 or in unmapped space), stack overflow (stacking errors, SP near the stack limit, PSP of a task below its stack bottom), unaligned access to a packed struct or casted buffer, divide by zero with DIV_0_TRP enabled, bad function pointer or vector, FPU disabled, use of a peripheral whose clock is off (bus error at a peripheral address), DMA or cache coherency.
5. Give confirmation steps: stack watermarks (`uxTaskGetStackHighWaterMark`), MPU guard regions, a data watchpoint on the address, making imprecise faults precise, and breaking in the debugger at the fault handler.
6. Give the fix for the leading cause and the general hardening it suggests.
7. Provide a production fault handler that saves registers and a backtrace hint to no-init RAM, resets cleanly, and reports them on the next boot.
</task>

<constraints>
- Call the cause the leading hypothesis until a watchpoint, watermark or reproduction confirms it.
- Say which architecture version the decode assumes; ask for the core if it changes the meaning of the bits.
- Do not invent symbol names or addresses not in the input.
{{> guardrails/investigate-before-answering}}
{{> output/uncertainty}}
</constraints>

<output_format>
## Register decode
Table: Register | Value | Bits set | Meaning.
## Faulting location
PC and LR mapped to function and line, or the command to do it.
## Likely cause
Ranked list, each with evidence for and against.
## Confirm it
Numbered steps with what result confirms or rules out each cause.
## Fix
Code or diff for the leading cause.
## Add a fault handler
Code for capturing faults in the field.
</output_format>
