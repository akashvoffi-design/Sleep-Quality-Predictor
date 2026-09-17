"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Cpu, BarChart2, CheckCircle2, Grid, HelpCircle, X, TrendingUp } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95, rotateX: 12 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] },
  },
};

const barVariants = {
  hidden: { width: 0 },
  visible: (width) => ({
    width: `${width}%`,
    transition: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] },
  }),
};

const flipVariants = {
  front: { rotateY: 0, opacity: 1 },
  back: { rotateY: 180, opacity: 1 },
};

export default function ComparisonView({ modelsData }) {
  const [selectedMatrixModel, setSelectedMatrixModel] = useState("Random Forest");
  const [flippedCards, setFlippedCards] = useState({});
  const [showMatrix, setShowMatrix] = useState(false);

  const defaultModels = {
    "Logistic Regression": {
      name: "Logistic Regression",
      purpose: "Classification baseline model",
      color: "#3B82F6",
      accuracy_percent: 89.33,
      f1_score: 0.8876,
      precision: 0.8912,
      recall: 0.8933,
      confusion_matrix: [[18, 2, 0], [4, 42, 1], [0, 1, 7]],
      classes: ["Good", "Average", "Poor"],
    },
    "Decision Tree": {
      name: "Decision Tree",
      purpose: "Rule-based non-linear classification",
      color: "#10B981",
      accuracy_percent: 94.67,
      f1_score: 0.9452,
      precision: 0.9480,
      recall: 0.9467,
      confusion_matrix: [[19, 1, 0], [2, 43, 0], [0, 1, 9]],
      classes: ["Good", "Average", "Poor"],
    },
    "Random Forest": {
      name: "Random Forest",
      purpose: "Ensemble classification (Best Performer)",
      color: "#FF2D4A",
      accuracy_percent: 98.67,
      f1_score: 0.9864,
      precision: 0.9875,
      recall: 0.9867,
      confusion_matrix: [[20, 0, 0], [1, 44, 0], [0, 0, 10]],
      classes: ["Good", "Average", "Poor"],
    },
    "SVM": {
      name: "SVM",
      purpose: "Support Vector Classification with RBF Kernel",
      color: "#8B5CF6",
      accuracy_percent: 92.00,
      f1_score: 0.9165,
      precision: 0.9230,
      recall: 0.9200,
      confusion_matrix: [[19, 1, 0], [3, 42, 0], [0, 2, 8]],
      classes: ["Good", "Average", "Poor"],
    },
  };

  const models = modelsData?.models || defaultModels;
  const matrixData = models[selectedMatrixModel] || models["Random Forest"];
  const modelKeys = Object.keys(models);

  const toggleFlip = (key) => {
    setFlippedCards((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div style={{ padding: "1.5rem 0", perspective: "1200px" }} variants={containerVariants} initial="hidden" animate="visible">
      <motion.div style={{ marginBottom: "2rem" }} variants={cardVariants}>
        <motion.div className="badge badge-red" style={{ marginBottom: "0.75rem", display: "inline-flex" }}>
          <Cpu size={14} style={{ marginRight: "0.4rem" }} /> Algorithm Benchmark
        </motion.div>
        <motion.h2 style={{ fontSize: "2rem", fontWeight: 800, color: "#ffffff", marginBottom: "0.5rem", fontFamily: "var(--font-display)" }}>
          Machine Learning Model Comparison
        </motion.h2>
        <motion.p style={{ color: "var(--text-silver)", fontSize: "0.95rem" }}>
          Evaluating 4 classification algorithms trained on the Sleep Quality dataset. Random Forest achieved top performance.
        </motion.p>
      </motion.div>

      {/* 4 Model Cards Grid - 3D Flip */}
      <motion.div className="grid-4" style={{ marginBottom: "2.5rem" }} variants={containerVariants}>
        {modelKeys.map((modelKey, i) => {
          const m = models[modelKey];
          const isBest = modelKey === "Random Forest";
          const isFlipped = flippedCards[modelKey];

          return (
            <motion.div
              key={modelKey}
              style={{
                perspective: "1000px",
                minHeight: "200px",
                position: "relative",
              }}
              variants={cardVariants}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <motion.div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  transformStyle: "preserve-3d",
                  cursor: "pointer",
                }}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                onClick={() => toggleFlip(modelKey)}
              >
                {/* Front */}
                <motion.div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backfaceVisibility: "hidden",
                    background: isBest
                      ? "linear-gradient(145deg, var(--bg-card) 0%, #2a0c0c 100%)"
                      : "linear-gradient(145deg, var(--bg-card) 0%, var(--bg-surface) 100%)",
                    border: isBest ? "2px solid var(--accent-red)" : "1px solid var(--border-subtle)",
                    borderRadius: "16px",
                    padding: "1.5rem",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: isBest ? "var(--shadow-md), var(--shadow-glow)" : "var(--shadow-sm)",
                  }}
                >
                  {isBest && (
                    <motion.div
                      style={{
                        position: "absolute",
                        top: "12px",
                        right: "12px",
                        background: "linear-gradient(135deg, var(--accent-red) 0%, var(--accent-crimson) 100%)",
                        color: "#ffffff",
                        padding: "0.2rem 0.6rem",
                        borderRadius: "20px",
                        fontSize: "0.7rem",
                        fontWeight: 800,
                        display: "flex",
                        alignItems: "center",
                        gap: "0.25rem",
                      }}
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Award size={12} /> BEST
                    </motion.div>
                  )}

                  <motion.div style={{ color: isBest ? "var(--accent-red)" : m.color, fontWeight: 800, fontSize: "1.1rem", marginBottom: "0.4rem", fontFamily: "var(--font-display)" }}>
                    {m.name}
                  </motion.div>
                  <div style={{ color: "var(--text-muted)", fontSize: "0.8rem", height: "36px", marginBottom: "1.25rem" }}>
                    {m.purpose}
                  </div>

                  <motion.div style={{ background: "var(--bg-input)", padding: "1rem", borderRadius: "10px", border: "1px solid var(--border-subtle)", marginTop: "auto" }}>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Accuracy Score</div>
                    <motion.div
                      style={{ fontSize: "2rem", fontWeight: 900, color: isBest ? "var(--accent-red)" : "#ffffff", fontFamily: "var(--font-display)" }}
                    >
                      {m.accuracy_percent || (m.accuracy * 100).toFixed(2)}%
                    </motion.div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>
                      F1 Score: {(m.f1_score * 100).toFixed(1)}%
                    </div>
                  </motion.div>
                </motion.div>

                {/* Back */}
                <motion.div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                    background: "linear-gradient(145deg, var(--bg-surface) 0%, var(--bg-primary) 100%)",
                    border: `1px solid ${m.color}`,
                    borderRadius: "16px",
                    padding: "1.25rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: "0.75rem",
                    boxShadow: "var(--shadow-md)",
                  }}
                >
                  <motion.div style={{ color: m.color, fontWeight: 800, fontSize: "1rem", marginBottom: "0.5rem", fontFamily: "var(--font-display)" }}>
                    {m.name} Metrics
                  </motion.div>
                  {[
                    { label: "Accuracy", value: `${(m.accuracy_percent || m.accuracy * 100).toFixed(2)}%` },
                    { label: "F1 Score", value: `${(m.f1_score * 100).toFixed(1)}%` },
                    { label: "Precision", value: `${(m.precision * 100).toFixed(1)}%` },
                    { label: "Recall", value: `${(m.recall * 100).toFixed(1)}%` },
                  ].map((metric, idx) => (
                    <motion.div key={metric.label} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem" }}>
                      <span style={{ color: "var(--text-muted)" }}>{metric.label}</span>
                      <span style={{ color: "#ffffff", fontWeight: 700 }}>{metric.value}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Model Performance Accuracy Bar Chart Visualization */}
      <motion.div className="card card-3d" style={{ marginBottom: "2.5rem" }} variants={cardVariants} transition={{ delay: 0.2 }}>
        <motion.div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--accent-red)", marginBottom: "1.5rem" }}>
          <BarChart2 size={20} />
          <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#ffffff", fontFamily: "var(--font-display)" }}>Comparative Accuracy Breakdown</h3>
        </motion.div>

        <motion.div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {modelKeys.map((modelKey, i) => {
            const m = models[modelKey];
            const accVal = m.accuracy_percent || m.accuracy * 100;
            const isBest = modelKey === "Random Forest";

            return (
              <motion.div key={modelKey}>
                <motion.div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", fontWeight: 600, color: "#ffffff", marginBottom: "0.4rem" }}>
                  <span>{m.name} {isBest && <motion.span style={{ color: "var(--accent-red)" }} animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>👑 (Winner)</motion.span>}</span>
                  <span style={{ color: isBest ? "var(--accent-red)" : "var(--text-muted)" }}>{accVal.toFixed(2)}%</span>
                </motion.div>
                <motion.div style={{ width: "100%", height: "16px", background: "var(--bg-input)", borderRadius: "8px", overflow: "hidden", border: "1px solid var(--border-subtle)" }}>
                  <motion.div
                    style={{
                      width: `${accVal}%`,
                      height: "100%",
                      background: isBest
                        ? "linear-gradient(90deg, var(--accent-red-dim), var(--accent-red))"
                        : `linear-gradient(90deg, ${m.color}88, ${m.color})`,
                      borderRadius: "8px",
                      boxShadow: isBest ? "0 0 15px var(--accent-red-glow)" : "none",
                      transformOrigin: "left center",
                    }}
                    variants={barVariants}
                    custom={accVal}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.3 + i * 0.1 }}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>

      {/* Detailed Comparison Table */}
      <motion.div className="card card-3d" style={{ marginBottom: "2.5rem", overflowX: "auto" }} variants={cardVariants} transition={{ delay: 0.3 }}>
        <motion.h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#ffffff", marginBottom: "1rem", fontFamily: "var(--font-display)" }}>
          Detailed Metrics Comparison Matrix
        </motion.h3>
        <motion.table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.9rem" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid var(--border-subtle)" }}>
              <th style={{ padding: "0.85rem 1rem", color: "var(--accent-red)" }}>Model</th>
              <th style={{ padding: "0.85rem 1rem", color: "var(--accent-red)" }}>Purpose</th>
              <th style={{ padding: "0.85rem 1rem", color: "var(--accent-red)" }}>Accuracy</th>
              <th style={{ padding: "0.85rem 1rem", color: "var(--accent-red)" }}>F1</th>
              <th style={{ padding: "0.85rem 1rem", color: "var(--accent-red)" }}>Precision</th>
              <th style={{ padding: "0.85rem 1rem", color: "var(--accent-red)" }}>Recall</th>
            </tr>
          </thead>
          <tbody>
            {modelKeys.map((modelKey, i) => {
              const m = models[modelKey];
              const isBest = modelKey === "Random Forest";
              return (
                <motion.tr
                  key={modelKey}
                  style={{
                    borderBottom: "1px solid rgba(255,45,74,0.06)",
                    background: isBest ? "rgba(255, 45, 74, 0.05)" : "transparent",
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                >
                  <td style={{ padding: "1rem", fontWeight: 700, color: isBest ? "var(--accent-red)" : "#ffffff" }}>
                    {m.name} {isBest && "👑"}
                  </td>
                  <td style={{ padding: "1rem", color: "var(--text-muted)", fontSize: "0.85rem" }}>{m.purpose}</td>
                  <td style={{ padding: "1rem", fontWeight: 700, color: isBest ? "var(--accent-red)" : "#ffffff" }}>
                    {(m.accuracy_percent || m.accuracy * 100).toFixed(2)}%
                  </td>
                  <td style={{ padding: "1rem", color: "var(--text-muted)" }}>{(m.f1_score * 100).toFixed(1)}%</td>
                  <td style={{ padding: "1rem", color: "var(--text-muted)" }}>{(m.precision * 100).toFixed(1)}%</td>
                  <td style={{ padding: "1rem", color: "var(--text-muted)" }}>{(m.recall * 100).toFixed(1)}%</td>
                </motion.tr>
              );
            })}
          </tbody>
        </motion.table>
      </motion.div>

      {/* Confusion Matrix Interactive Visualizer */}
      <motion.div className="card card-3d" style={{ padding: "2rem" }} variants={cardVariants} transition={{ delay: 0.4 }}>
        <motion.div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
          <motion.div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--accent-red)" }}>
            <Grid size={20} />
            <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#ffffff", fontFamily: "var(--font-display)" }}>Confusion Matrix Visualizer</h3>
          </motion.div>
          <motion.div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {modelKeys.map((modelKey) => (
              <motion.button
                key={modelKey}
                onClick={() => setSelectedMatrixModel(modelKey)}
                style={{
                  background: selectedMatrixModel === modelKey ? "linear-gradient(135deg, var(--accent-red) 0%, var(--accent-crimson) 100%)" : "var(--bg-input)",
                  color: selectedMatrixModel === modelKey ? "#ffffff" : "var(--text-muted)",
                  border: selectedMatrixModel === modelKey ? "none" : "1px solid var(--border-subtle)",
                  padding: "0.4rem 0.85rem",
                  borderRadius: "8px",
                  fontWeight: 600,
                  fontSize: "0.8rem",
                  cursor: "pointer",
                }}
                whileHover={{ scale: 1.05, borderColor: "var(--accent-red)" }}
                whileTap={{ scale: 0.95 }}
                animate={selectedMatrixModel === modelKey ? { boxShadow: "0 0 12px var(--accent-red-glow)" } : {}}
              >
                {modelKey}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          style={{
            maxWidth: "500px",
            margin: "0 auto",
            padding: "1.5rem",
            background: "var(--bg-input)",
            borderRadius: "12px",
            border: "1px solid var(--border-subtle)",
          }}
          initial={{ opacity: 0, scale: 0.9, rotateX: 15 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          whileHover={{ rotateY: 2, rotateX: -2 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedMatrixModel}
              initial={{ opacity: 0, rotateY: -10 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, rotateY: 10 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div style={{ textTransform: "uppercase", fontSize: "0.75rem", color: "var(--text-muted)", textAlign: "center", marginBottom: "0.85rem" }}>
                Predicted Class
              </motion.div>
              <motion.div style={{ display: "grid", gridTemplateColumns: "60px repeat(3, 1fr)", gap: "6px", textAlign: "center" }}>
                <motion.div style={{}} />
                {matrixData.classes.map((cls) => (
                  <motion.div key={cls} style={{ fontWeight: 700, fontSize: "0.8rem", color: "var(--accent-red)" }}>{cls}</motion.div>
                ))}

                {matrixData.confusion_matrix.map((row, rIdx) => (
                  <React.Fragment key={rIdx}>
                    <motion.div style={{ fontWeight: 700, fontSize: "0.8rem", color: "var(--accent-red)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {matrixData.classes[rIdx]}
                    </motion.div>
                    {row.map((val, cIdx) => {
                      const isDiagonal = rIdx === cIdx;
                      return (
                        <motion.div
                          key={cIdx}
                          style={{
                            background: isDiagonal ? "rgba(255, 45, 74, 0.25)" : "var(--bg-card)",
                            border: isDiagonal ? "1px solid var(--accent-red)" : "1px solid var(--border-subtle)",
                            color: isDiagonal ? "var(--accent-red)" : "var(--text-silver)",
                            padding: "1.2rem 0.5rem",
                            borderRadius: "8px",
                            fontWeight: 800,
                            fontSize: "1.2rem",
                            boxShadow: isDiagonal ? "0 0 15px var(--accent-red-glow)" : "none",
                            position: "relative",
                            overflow: "hidden",
                          }}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.6 + rIdx * 0.1 + cIdx * 0.05, type: "spring", stiffness: 300 }}
                          whileHover={{ scale: 1.05, boxShadow: "0 0 20px var(--accent-red-glow)" }}
                        >
                          {val}
                        </motion.div>
                      );
                    })}
                  </React.Fragment>
                ))}
              </motion.div>
              <motion.div style={{ textTransform: "uppercase", fontSize: "0.72rem", color: "var(--text-muted)", textAlign: "center", marginTop: "0.85rem" }}>
                Actual Class (Rows) vs Predicted Class (Columns)
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
}