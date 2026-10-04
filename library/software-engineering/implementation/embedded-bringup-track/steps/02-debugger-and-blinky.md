# Step 2: Debugger and blinky

Prove the debug connection and a minimal program before anything else.

1. Debug connection: wiring of SWD or JTAG (SWDIO, SWCLK, NRST, GND, VTref), the probe command to read the device ID (for example OpenOCD, pyOCD or the vendor tool), and what each failure means (no target voltage, wrong ID, connects only under reset, protected flash).
2. Minimal firmware: startup code and linker script for the exact part, the internal oscillator only, one GPIO toggling an LED or a test pin at a known rate, and the system clock routed to the MCO pin.
3. Flash and verify: program, read back, step through reset to `main` in the debugger, and measure the toggle frequency to confirm the clock.
4. Switch to the target clock tree (external crystal and PLL) in a separate change, then measure again. If it fails, fall back to the internal oscillator and record the issue.
5. Add a fault handler that stops in the debugger with the fault registers saved.

Sections: Debug wiring and probe check, Blinky code, Flash and verify, Clock tree change, Results table (Test | Expected | Measured | Pass), Open issues.

Stop and wait for approval and results.
