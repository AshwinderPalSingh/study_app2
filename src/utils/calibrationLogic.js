const DEFAULT_RULES = {
  minSegmentMs: 5000,
  minTotalMs: 90000,
  tieMargin: 0.05,
  dominantThreshold: 0.4
};

export function determineDominantModality(logs, rules = {}) {
  const { minSegmentMs, minTotalMs, tieMargin, dominantThreshold } = {
    ...DEFAULT_RULES,
    ...rules
  };

  const totals = { Text: 0, Visual: 0 };

  for (const entry of logs || []) {
    const { mode, duration } = entry || {};
    if (totals[mode] !== undefined && typeof duration === "number" && duration >= minSegmentMs) {
      totals[mode] += duration;
    }
  }

  const totalFiltered = totals.Text + totals.Visual;
  const summary = {
    totals,
    totalFiltered,
    minSegmentMs,
    minTotalMs,
    tieMargin,
    dominantThreshold
  };

  if (totalFiltered < minTotalMs) {
    return {
      ...summary,
      dominant: "Undetermined",
      mci: null,
      reason: "insufficient_time"
    };
  }

  const maxMode = totals.Visual >= totals.Text ? "Visual" : "Text";
  const minMode = maxMode === "Visual" ? "Text" : "Visual";
  const max = totals[maxMode];
  const min = totals[minMode];
  const mci = totalFiltered ? max / totalFiltered : null;
  const diffRatio = totalFiltered ? Math.abs(max - min) / totalFiltered : 0;

  let dominant = maxMode;
  let reason = "dominant";

  if (diffRatio <= tieMargin) {
    dominant = "Multimodal";
    reason = "tie";
  } else if (mci !== null && mci < dominantThreshold) {
    dominant = "Multimodal";
    reason = "below_threshold";
  }

  return {
    ...summary,
    dominant,
    mci,
    reason,
    maxMode,
    minMode,
    diffRatio
  };
}
