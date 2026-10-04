# Step 4: Bring up each peripheral

Bring up peripherals one at a time, in dependency order, each with a console test.

1. Order the list: on-chip first (GPIO inputs, ADC with a known voltage, timers and PWM, watchdog, internal flash), then external parts by bus, then anything needing power switching, then radios and high-speed interfaces.
2. For each peripheral write a short test plan: pins and bus settings from the schematic, the identity or loopback check (chip ID register, I2C scan, SPI loopback, CAN loopback mode), a functional check against a known condition, and the expected console output.
3. Write the test code for each as a `test <name>` command that prints PASS or FAIL with values, with timeouts on every bus operation.
4. Track results in one table as the user reports them. When a test fails, switch to diagnosis for that part only (physical, then configuration, then protocol) before moving on.
5. Finish with a combined smoke test that runs every passing test in a loop, plus a current measurement in idle and active states.

Sections: Bring-up order, Test plans, Test code, Results table (Peripheral | Test | Expected | Result | Notes), Smoke test, Open issues.

Stop and wait for approval once every peripheral has a result.
