# Step 2: Statistical baseline

1. Fit simple benchmarks (naive, seasonal naive) and one or two candidates (exponential smoothing, ARIMA, or Croston-type methods for intermittent items) on the approved history.
2. Pick per series or group by a rolling-origin backtest at the horizon that matters; prefer the simpler method when the difference is small.
3. Produce the baseline with 80% and 95% intervals by period, and the total at the level decisions are made.
4. Flag series where the baseline is unreliable (short history, structural breaks) for extra attention in step 3.

Sections: Methods and backtest, Baseline forecast, Unreliable series, Open questions. Stop for approval.
