# Step 1: Power and clocks

Check the board is safe to power and the MCU can run, before any firmware.

1. Visual and passive checks: orientation of polarised parts and ICs, solder bridges on fine-pitch parts, and resistance from each rail to ground unpowered (a near-zero reading means a short; stop).
2. First power-up: bench supply at the nominal input with a current limit set just above the expected idle draw (estimate it from the parts list), then raise slowly if needed. Watch current and touch-check or thermal-check for hot parts.
3. Rail table: each rail's expected voltage, tolerance, measured value, and ripple if a scope is available; check power-good and enable pins and the power-up sequence when parts need one.
4. Reset and boot: reset pin level, boot-mode pins in the right state, brown-out threshold relative to the rail.
5. Clocks: confirm the oscillators the MCU starts on; plan how to check the external crystal (MCO pin output measured with a scope or frequency counter once code runs) and the load capacitors against the crystal datasheet.

Sections: Pre-power checks, Power-up procedure, Rail table (Rail | Expected | Tolerance | Measured | Pass), Reset and boot pins, Clock plan, Open issues.

Stop and wait for approval and the measured values.
