"use client";

import React, { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertTriangle, XCircle, ArrowLeft, ShieldAlert, Cpu, BarChart2, Lightbulb, ChevronRight, RotateCcw } from "lucide-react";

const ringVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (confidence) => ({
    pathLength: confidence / 100,
    opacity: 1,
    transition: {
      duration: 1.5,
      ease: [0.34, 1.56, 0.64, 1],
      delay: 0.3,
    },
  }),
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97, rotateX: 10 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] },
  },
};

const pulseVariants = {
  animate: {
    scale: [1, 1.02, 1],
    boxShadow: [
      "0 0 20px var(--accent-red-glow)",
      "0 0 40px var(--accent-red-glow)",
      "0 0 20px var(--accent-red-glow)",
    ],
    transition: { duration: 2, repeat: Infinity },
  },
};

export default function ResultView({ resultData, inputSummary, onPredictAgain, onViewModels }) {
  const mainCardRef = useRef(null);
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });

  if (!resultData) {
    return (
      <motion.div
        className="card card-3d"
        style={{ padding: "4rem 2rem", textAlign: "center", margin: "3rem 0", perspective: "1000px" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.h3 style={{ color: "#ffffff", marginBottom: "1rem", fontFamily: "var(--font-display)" }}>
          No Active Prediction Result
        </motion.h3>
        <motion.p style={{ color: "var(--text-silver)", marginBottom: "2rem" }}>
          Please submit a prediction request in the Prediction Input tab first.
        </motion.p>
        <motion.button className="btn-primary" onClick={onPredictAgain} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <ArrowLeft size={16} style={{ marginRight: "0.5rem" }} /> Go to Predict Form
        </motion.button>
      </motion.div>
    );
  }

  const { predicted_quality, confidence, probabilities, model_used, tips, contributing_factors, disclaimer } = resultData;

  const qualityUpper = (predicted_quality || "AVERAGE").toUpperCase();

  let badgeClass = "badge-average";
  let statusColor = "var(--color-average)";
  let StatusIcon = AlertTriangle;
  let glowColor = "var(--color-average)";

  if (qualityUpper === "GOOD") {
    badgeClass = "badge-good";
    statusColor = "var(--color-good)";
    StatusIcon = CheckCircle2;
    glowColor = "var(--color-good)";
  } else if (qualityUpper === "POOR") {
    badgeClass = "badge-poor";
    statusColor = "var(--color-poor)";
    StatusIcon = XCircle;
    glowColor = "var(--color-poor)";
  }

  const ringRadius = 54;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const ringStrokeDashoffset = ringCircumference * (1 - (confidence || 95) / 100);

  return (
    <div style={{ padding: "1.5rem 0", perspective: "1200px" }}>
      {/* Top Banner */}
      <motion.div
        style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <motion.button
          className="btn-secondary"
          onClick={onPredictAgain}
          style={{ fontSize: "0.85rem", padding: "0.5rem 1rem" }}
          whileHover={{ scale: 1.02, borderColor: "var(--accent-red)" }}
          whileTap={{ scale: 0.97 }}
        >
          <ArrowLeft size={16} style={{ marginRight: "0.4rem" }} /> Predict Again
        </motion.button>
        <motion.div
          style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Model: <strong style={{ color: "var(--accent-red)" }}>{model_used || "Random Forest"}</strong>
        </motion.div>
      </motion.div>

      <motion.div className="grid-2" style={{ marginBottom: "2rem" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, staggerChildren: 0.1 }}>
        {/* Main Prediction Result Card */}
        <motion.div
          ref={mainCardRef}
          className="card card-3d card-red-border"
          style={{
            background: "linear-gradient(145deg, var(--bg-card) 0%, #1f0808 100%)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            minHeight: "420px",
            position: "relative",
            overflow: "hidden",
            border: "1px solid var(--border-glow)",
            boxShadow: "var(--shadow-lg), var(--shadow-glow)",
          }}
          variants={cardVariants}
          onMouseMove={(e) => {
            const rect = mainCardRef.current?.getBoundingClientRect();
            if (rect) {
              const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
              const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
              setMousePos({ x, y });
            }
          }}
          onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
        >
          {/* Background glow following mouse */}
          <motion.div
            style={{
              position: "absolute",
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              background: `radial-gradient(circle, ${glowColor}33 0%, transparent 70%)`,
              pointerEvents: "none",
              transform: "translate(-50%, -50%)",
              left: `calc(50% + ${mousePos.x * 3}px)`,
              top: `calc(50% + ${mousePos.y * 3}px)`,
              transition: { duration: 0.5, ease: "easeOut" },
              zIndex: 0,
            }}
            animate={{
              x: mousePos.x * 3,
              y: mousePos.y * 3,
            }}
          />

          <div style={{ position: "relative", zIndex: 1 }}>
            <motion.div
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}
              variants={itemVariants}
            >
              <motion.span className="badge badge-red">
                <Cpu size={12} style={{ marginRight: "0.3rem" }} /> ML Classification Output
              </motion.span>
              <motion.div
                style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}
                variants={itemVariants}
                transition={{ delay: 0.1 }}
              >
                Confidence: <strong style={{ color: "var(--accent-red)" }}>{confidence}%</strong>
              </motion.div>
            </motion.div>

            <motion.div
              style={{ fontSize: "0.9rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700 }}
              variants={itemVariants}
              transition={{ delay: 0.15 }}
            >
              Predicted Sleep Quality
            </motion.div>

            <motion.div
              style={{
                fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                fontWeight: 900,
                color: statusColor,
                letterSpacing: "-0.03em",
                margin: "0.5rem 0 1rem 0",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                fontFamily: "var(--font-display)",
                textShadow: `0 0 30px ${glowColor}`,
              }}
              variants={itemVariants}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            >
              {qualityUpper}
              <motion.div
                style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                <StatusIcon size={48} color={statusColor} />
              </motion.div>
            </motion.div>

            <motion.p
              style={{ color: "var(--text-silver)", fontSize: "0.95rem", lineHeight: "1.6" }}
              variants={itemVariants}
              transition={{ delay: 0.3 }}
            >
              {qualityUpper === "GOOD" && "Your lifestyle metrics indicate optimal rest parameters, healthy sleep duration, low stress, and strong cardiovascular indicators."}
              {qualityUpper === "AVERAGE" && "Your sleep profile indicates moderate quality. Minor lifestyle tweaks to physical activity or stress reduction could elevate your rest."}
              {qualityUpper === "POOR" && "Your metrics indicate compromised sleep quality. Sleep duration restriction, high stress, or cardiovascular flags are present."}
            </motion.p>

            {/* Model Confidence Bar */}
            <motion.div
              style={{ marginTop: "2rem", background: "var(--bg-input)", padding: "1rem", borderRadius: "12px", border: "1px solid var(--border-subtle)" }}
              variants={itemVariants}
              transition={{ delay: 0.4 }}
            >
              <motion.div
                style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", color: "var(--text-muted)", marginBottom: "0.5rem" }}
              >
                <span>Model Prediction Certainty</span>
                <span style={{ color: "var(--accent-red)", fontWeight: 700 }}>{confidence}%</span>
              </motion.div>
              <motion.div style={{ width: "100%", height: "10px", background: "var(--bg-primary)", borderRadius: "5px", overflow: "hidden", border: "1px solid var(--border-subtle)" }}>
                <motion.div
                  style={{
                    width: `${confidence}%`,
                    height: "100%",
                    background: `linear-gradient(90deg, var(--accent-red-dim), var(--accent-red))`,
                    borderRadius: "5px",
                    boxShadow: `0 0 15px ${glowColor}`,
                    transformOrigin: "left center",
                  }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Probability Breakdown Card */}
        <motion.div className="card card-3d" variants={cardVariants} transition={{ delay: 0.1 }}>
          <motion.div
            style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--accent-red)", marginBottom: "1.25rem" }}
          >
            <BarChart2 size={20} />
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#ffffff", fontFamily: "var(--font-display)" }}>Class Probability Distribution</h3>
          </motion.div>

          {/* 3D Probability Ring */}
          <motion.div
            style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}
          >
            <svg viewBox="0 0 160 160" width="160" height="160" style={{ transform: "rotate(-90deg)", filter: "drop-shadow(0 0 10px var(--accent-red-glow))" }}>
              <circle cx="80" cy="80" r={ringRadius} fill="none" stroke="var(--border-subtle)" strokeWidth="10" />
              <motion.circle
                cx="80"
                cy="80"
                r={ringRadius}
                fill="none"
                stroke={statusColor}
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={ringCircumference}
                strokeDashoffset={ringCircumference}
                variants={ringVariants}
                initial="hidden"
                animate={(v) => ringVariants.visible(confidence || 95)}
                style={{ filter: `drop-shadow(0 0 8px ${glowColor})` }}
              />
            </svg>
          </motion.div>

          <motion.div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {/* Good */}
            <motion.div
              variants={itemVariants}
              whileHover={{ x: 8, scale: 1.01 }}
              style={{ cursor: "pointer" }}
            >
              <motion.div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.88rem", fontWeight: 600, color: "#ffffff", marginBottom: "0.4rem" }}>
                <span style={{ color: "var(--color-good)" }}>Good Sleep Quality</span>
                <span>{Math.round((probabilities?.Good || 0) * 100)}%</span>
              </motion.div>
              <motion.div style={{ width: "100%", height: "12px", background: "var(--bg-input)", borderRadius: "6px", overflow: "hidden", border: "1px solid var(--border-subtle)" }}>
                <motion.div
                  style={{ width: `${(probabilities?.Good || 0) * 100}%`, height: "100%", background: "linear-gradient(90deg, var(--color-good), #4ade80)", borderRadius: "6px", boxShadow: "0 0 10px rgba(34, 197, 94, 0.5)" }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                />
              </motion.div>
            </motion.div>

            {/* Average */}
            <motion.div
              variants={itemVariants}
              transition={{ delay: 0.1 }}
              whileHover={{ x: 8, scale: 1.01 }}
              style={{ cursor: "pointer" }}
            >
              <motion.div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.88rem", fontWeight: 600, color: "#ffffff", marginBottom: "0.4rem" }}>
                <span style={{ color: "var(--color-average)" }}>Average Sleep Quality</span>
                <span>{Math.round((probabilities?.Average || 0) * 100)}%</span>
              </motion.div>
              <motion.div style={{ width: "100%", height: "12px", background: "var(--bg-input)", borderRadius: "6px", overflow: "hidden", border: "1px solid var(--border-subtle)" }}>
                <motion.div
                  style={{ width: `${(probabilities?.Average || 0) * 100}%`, height: "100%", background: "linear-gradient(90deg, var(--color-average), #fbbf24)", borderRadius: "6px", boxShadow: "0 0 10px rgba(245, 158, 11, 0.5)" }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                />
              </motion.div>
            </motion.div>

            {/* Poor */}
            <motion.div
              variants={itemVariants}
              transition={{ delay: 0.2 }}
              whileHover={{ x: 8, scale: 1.01 }}
              style={{ cursor: "pointer" }}
            >
              <motion.div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.88rem", fontWeight: 600, color: "#ffffff", marginBottom: "0.4rem" }}>
                <span style={{ color: "var(--color-poor)" }}>Poor Sleep Quality</span>
                <span>{Math.round((probabilities?.Poor || 0) * 100)}%</span>
              </motion.div>
              <motion.div style={{ width: "100%", height: "12px", background: "var(--bg-input)", borderRadius: "6px", overflow: "hidden", border: "1px solid var(--border-subtle)" }}>
                <motion.div
                  style={{ width: `${(probabilities?.Poor || 0) * 100}%`, height: "100%", background: "linear-gradient(90deg, var(--color-poor), #fb7185)", borderRadius: "6px", boxShadow: "0 0 10px rgba(255, 45, 74, 0.5)" }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Key Factors & Tips Grid */}
      <motion.div className="grid-2" style={{ marginBottom: "2rem" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, staggerChildren: 0.1 }}>
        {/* Key Contributing Factors */}
        <motion.div className="card card-3d" variants={cardVariants}>
          <motion.h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#ffffff", marginBottom: "1rem", fontFamily: "var(--font-display)" }}>
            Key Contributing Factors
          </motion.h3>
          <motion.div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {(contributing_factors || []).map((item, idx) => (
              <motion.div
                key={idx}
                style={{
                  background: "var(--bg-input)",
                  padding: "0.75rem 1rem",
                  borderRadius: "10px",
                  border: "1px solid var(--border-subtle)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  transition: "all 0.2s ease",
                }}
                variants={itemVariants}
                transition={{ delay: idx * 0.05 }}
                whileHover={{
                  borderColor: item.impact === "Positive" ? "var(--color-good)" : item.impact === "Negative" ? "var(--color-poor)" : "var(--accent-red)",
                  x: 5,
                  boxShadow: "var(--shadow-glow)",
                }}
              >
                <div>
                  <div style={{ color: "#ffffff", fontWeight: 600, fontSize: "0.9rem" }}>{item.feature}</div>
                  <div style={{ color: "var(--text-muted)", fontSize: "0.78rem" }}>Value: {item.val}</div>
                </div>
                <motion.span
                  className={`badge ${item.impact === "Positive" ? "badge-good" : item.impact === "Negative" ? "badge-poor" : "badge-red"}`}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
                >
                  {item.impact}
                </motion.span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Actionable Recommendations / Tips */}
        <motion.div className="card card-3d" variants={cardVariants} transition={{ delay: 0.1 }}>
          <motion.div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--accent-red)", marginBottom: "1rem" }}>
            <Lightbulb size={20} animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }} />
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#ffffff", fontFamily: "var(--font-display)" }}>AI Recommendations</h3>
          </motion.div>
          <motion.div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            {(tips || []).map((tip, idx) => (
              <motion.div
                key={idx}
                style={{
                  background: "var(--bg-input)",
                  padding: "0.85rem 1rem",
                  borderRadius: "10px",
                  borderLeft: "3px solid var(--accent-red)",
                  borderTop: "1px solid var(--border-subtle)",
                  borderRight: "1px solid var(--border-subtle)",
                  borderBottom: "1px solid var(--border-subtle)",
                  fontSize: "0.88rem",
                  color: "var(--text-silver)",
                  lineHeight: "1.5",
                  position: "relative",
                  overflow: "hidden",
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                whileHover={{ x: 5, boxShadow: "var(--shadow-glow)" }}
              >
                <motion.div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: "3px",
                    background: "linear-gradient(180deg, var(--accent-red), var(--accent-rose))",
                  }}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                />
                {tip}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Mandatory Medical Disclaimer Card */}
      <motion.div
        className="card card-3d"
        style={{
          background: "var(--bg-input)",
          borderColor: "var(--border-glow)",
          marginBottom: "2rem",
          boxShadow: "var(--shadow-glow)",
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <motion.div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
          <motion.div
            style={{ flexShrink: 0, marginTop: "2px" }}
            animate={{ rotate: [0, 3, -3, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <ShieldAlert color="var(--accent-red)" size={24} />
          </motion.div>
          <motion.div>
            <motion.h4 style={{ color: "var(--accent-rose)", fontSize: "0.95rem", fontWeight: 700, marginBottom: "0.4rem", fontFamily: "var(--font-display)" }}>
              Informational Notice & Dataset Context
            </motion.h4>
            <motion.p style={{ color: "var(--text-silver)", fontSize: "0.85rem", lineHeight: "1.6" }}>
              {disclaimer || "This prediction is based on machine-learning patterns in the provided dataset (374 records, 5 poor sleep instances) and is intended for informational purposes only. It is not a medical diagnosis."}
            </motion.p>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom CTA Buttons */}
      <motion.div
        style={{ display: "flex", gap: "1rem", justifyContent: "flex-end", flexWrap: "wrap" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <motion.button
          className="btn-secondary"
          onClick={onViewModels}
          whileHover={{ scale: 1.02, borderColor: "var(--accent-red)" }}
          whileTap={{ scale: 0.97 }}
        >
          <Cpu size={16} style={{ marginRight: "0.4rem" }} /> View Model Comparison
        </motion.button>
        <motion.button
          className="btn-primary"
          onClick={onPredictAgain}
          whileHover={{ scale: 1.03, y: -3 }}
          whileTap={{ scale: 0.97 }}
        >
          <RotateCcw size={16} style={{ marginRight: "0.4rem" }} /> Predict Again
        </motion.button>
      </motion.div>
    </div>
  );
}