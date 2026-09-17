"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, History, Download, Trash2, Moon, Activity, Heart, Zap, User, Clock, Eye, RotateCcw, BarChart2, TrendingUp, ShieldAlert } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
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

const rowVariants = {
  hidden: { opacity: 0, x: -30, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] },
  },
};

const floatVariants = {
  animate: {
    y: [-8, 8, -8],
    rotate: [-2, 2, -2],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const defaultHistory = [
  {
    id: 1,
    date: "2026-08-14 18:30",
    gender: "Male",
    age: 28,
    occupation: "Software Engineer",
    sleep_duration: 6.5,
    predicted_quality: "Average",
    confidence: 94.5,
    model_used: "Random Forest",
    stress_level: 7,
    bmi_category: "Normal",
  },
  {
    id: 2,
    date: "2026-08-14 14:15",
    gender: "Female",
    age: 25,
    occupation: "Engineer",
    sleep_duration: 8.5,
    predicted_quality: "Good",
    confidence: 98.7,
    model_used: "Random Forest",
    stress_level: 2,
    bmi_category: "Normal Weight",
  },
  {
    id: 3,
    date: "2026-08-13 21:00",
    gender: "Female",
    age: 38,
    occupation: "Nurse",
    sleep_duration: 5.0,
    predicted_quality: "Poor",
    confidence: 91.2,
    model_used: "Decision Tree",
    stress_level: 8,
    bmi_category: "Overweight",
  },
];

export default function DashboardView({ history, lastPrediction, onClearHistory, onPredictAgain }) {
  const historyList = (history && history.length > 0) ? history : defaultHistory;
  const latest = lastPrediction || historyList[0] || {};

  const exportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(historyList, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `sleep_predictions_history_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const statCards = [
    {
      icon: Moon,
      label: "Predicted Quality",
      value: latest.predicted_quality || "Good",
      color: "var(--accent-red)",
      sub: `Model: ${latest.model_used || "Random Forest"}`,
      animate: true,
    },
    {
      icon: Moon,
      label: "Sleep Duration",
      value: `${latest.sleep_duration || 7.0} hrs`,
      color: "var(--color-good)",
      sub: "Target: 7-9 hrs/night",
      animate: true,
    },
    {
      icon: Activity,
      label: "Stress Level",
      value: `${latest.stress_level || 5} / 10`,
      color: (latest.stress_level || 5) >= 7 ? "var(--color-poor)" : "var(--color-good)",
      sub: (latest.stress_level || 5) >= 7 ? "Elevated Stress" : "Normal Stress",
      animate: true,
    },
    {
      icon: Heart,
      label: "BMI Category",
      value: latest.bmi_category || "Normal",
      color: "var(--accent-rose)",
      sub: "Cardiovascular Status",
      animate: true,
    },
  ];

  return (
    <div style={{ padding: "1.5rem 0", perspective: "1200px" }} variants={containerVariants} initial="hidden" animate="visible">
      <motion.div style={{ marginBottom: "2rem" }} variants={cardVariants}>
        <motion.div className="badge badge-red" style={{ marginBottom: "0.75rem", display: "inline-flex" }}>
          <LayoutDashboard size={14} style={{ marginRight: "0.4rem" }} /> User Analytics Dashboard
        </motion.div>
        <motion.h2 style={{ fontSize: "2rem", fontWeight: 800, color: "#ffffff", marginBottom: "0.5rem", fontFamily: "var(--font-display)" }}>
          Sleep Quality Dashboard & History
        </motion.h2>
        <motion.p style={{ color: "var(--text-silver)", fontSize: "0.95rem" }}>
          Overview of your current health indicators, recent model inferences, and saved prediction logs.
        </motion.p>
      </motion.div>

      {/* Sleep Overview Widgets - 3D Floating Cards */}
      <motion.h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#ffffff", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-display)" }}>
        <LayoutDashboard size={20} color="var(--accent-red)" /> Latest Sleep Overview
      </motion.h3>

      <motion.div className="grid-4" style={{ marginBottom: "2.5rem" }} variants={containerVariants}>
        {statCards.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="card card-3d"
            style={{
              borderLeft: `4px solid ${stat.color}`,
              position: "relative",
              overflow: "visible",
            }}
            variants={cardVariants}
            transition={{ delay: i * 0.1 }}
            animate={stat.animate ? floatVariants.animate : {}}
            whileHover={{
              y: -10,
              scale: 1.03,
              boxShadow: `0 20px 50px rgba(0,0,0,0.6), 0 0 30px ${stat.color}44`,
            }}
          >
            <motion.div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <motion.div
                style={{
                  background: `linear-gradient(135deg, ${stat.color}22 0%, ${stat.color}11 100%)`,
                  border: `1px solid ${stat.color}44`,
                  color: stat.color,
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
                animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.03, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
              >
                <stat.icon size={22} />
              </motion.div>
            </motion.div>
            <motion.div style={{ marginTop: "0.75rem" }}>
              <motion.div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600 }}>
                {stat.label}
              </motion.div>
              <motion.div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#ffffff", margin: "0.2rem 0", fontFamily: "var(--font-display)" }}>
                {stat.value}
              </motion.div>
              <motion.div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                {stat.sub}
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Prediction History Table Section */}
      <motion.div className="card card-3d" style={{ marginBottom: "2rem" }} variants={cardVariants} transition={{ delay: 0.4 }}>
        <motion.div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
          <motion.div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--accent-red)" }}>
            <History size={20} />
            <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#ffffff", fontFamily: "var(--font-display)" }}>Prediction History</h3>
          </motion.div>

          <motion.div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <motion.button
              className="btn-secondary"
              onClick={exportJSON}
              style={{ fontSize: "0.82rem", padding: "0.45rem 0.85rem" }}
              whileHover={{ scale: 1.02, borderColor: "var(--accent-red)" }}
              whileTap={{ scale: 0.97 }}
            >
              <Download size={14} style={{ marginRight: "0.3rem" }} /> Export JSON
            </motion.button>
            <motion.button
              className="btn-secondary"
              onClick={onClearHistory}
              style={{ fontSize: "0.82rem", padding: "0.45rem 0.85rem", color: "var(--color-poor)", borderColor: "var(--color-poor)" }}
              whileHover={{ scale: 1.02, borderColor: "var(--color-poor)", backgroundColor: "rgba(255,45,74,0.1)" }}
              whileTap={{ scale: 0.97 }}
            >
              <Trash2 size={14} style={{ marginRight: "0.3rem" }} /> Clear History
            </motion.button>
          </motion.div>
        </motion.div>

        {historyList.length === 0 ? (
          <motion.div style={{ padding: "3rem", textAlign: "center" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Moon size={48} color="var(--text-muted)" style={{ marginBottom: "1rem", opacity: 0.5 }} />
            <h4 style={{ color: "var(--text-silver)", marginBottom: "0.5rem", fontFamily: "var(--font-display)" }}>No History Yet</h4>
            <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>Make a prediction to see your sleep quality history here.</p>
            <motion.button className="btn-primary" onClick={onPredictAgain} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <RotateCcw size={16} style={{ marginRight: "0.4rem" }} /> Make First Prediction
            </motion.button>
          </motion.div>
        ) : (
          <motion.div style={{ overflowX: "auto" }}>
            <motion.table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.9rem" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid var(--border-subtle)" }}>
                  <th style={{ padding: "0.85rem 1rem", color: "var(--accent-red)" }}>Timestamp</th>
                  <th style={{ padding: "0.85rem 1rem", color: "var(--accent-red)" }}>Sleep Quality</th>
                  <th style={{ padding: "0.85rem 1rem", color: "var(--accent-red)" }}>Model</th>
                  <th style={{ padding: "0.85rem 1rem", color: "var(--accent-red)" }}>Confidence</th>
                  <th style={{ padding: "0.85rem 1rem", color: "var(--accent-red)" }}>Duration</th>
                  <th style={{ padding: "0.85rem 1rem", color: "var(--accent-red)" }}>Stress</th>
                  <th style={{ padding: "0.85rem 1rem", color: "var(--accent-red)" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {historyList.map((item, idx) => {
                  const q = (item.predicted_quality || "Average").toUpperCase();
                  let badgeClass = "badge-average";
                  let badgeColor = "var(--color-average)";
                  if (q === "GOOD") { badgeClass = "badge-good"; badgeColor = "var(--color-good)"; }
                  if (q === "POOR") { badgeClass = "badge-poor"; badgeColor = "var(--color-poor)"; }

                  return (
                    <motion.tr
                      key={idx}
                      style={{ borderBottom: "1px solid rgba(255,45,74,0.06)" }}
                      variants={rowVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 0.5 + idx * 0.05 }}
                      whileHover={{ backgroundColor: "rgba(255,45,74,0.03)", scale: 1.005 }}
                    >
                      <td style={{ padding: "1rem", color: "#ffffff", fontWeight: 600 }}>{item.date || "Today"}</td>
                      <td style={{ padding: "1rem" }}>
                        <motion.span className={`badge ${badgeClass}`} animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}>{q}</motion.span>
                      </td>
                      <td style={{ padding: "1rem", color: "var(--text-muted)" }}>{item.model_used || "Random Forest"}</td>
                      <td style={{ padding: "1rem", color: "var(--accent-red)", fontWeight: 700 }}>{item.confidence || 98.7}%</td>
                      <td style={{ padding: "1rem", color: "#ffffff" }}>{item.sleep_duration || 7.0} hrs</td>
                      <td style={{ padding: "1rem", color: "var(--text-muted)" }}>{item.stress_level || 5} / 10</td>
                      <td style={{ padding: "1rem" }}>
                        <motion.span className="badge badge-red" animate={{ boxShadow: "0 0 10px var(--accent-red-glow)" }} transition={{ duration: 2, repeat: Infinity }}>Verified</motion.span>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </motion.table>
          </motion.div>
        )}
      </motion.div>

      {/* Quick Actions */}
      <motion.div className="card card-3d" style={{ padding: "1.5rem" }} variants={cardVariants} transition={{ delay: 0.5 }}>
        <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "#ffffff", marginBottom: "1rem", fontFamily: "var(--font-display)" }}>Quick Actions</h4>
        <motion.div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <motion.button
            className="btn-primary"
            onClick={onPredictAgain}
            style={{ minWidth: "180px" }}
            whileHover={{ scale: 1.03, y: -3 }}
            whileTap={{ scale: 0.97 }}
          >
            <RotateCcw size={16} style={{ marginRight: "0.4rem" }} /> New Prediction
          </motion.button>
          <motion.button
            className="btn-secondary"
            onClick={() => {}}
            style={{ minWidth: "180px" }}
            whileHover={{ scale: 1.02, borderColor: "var(--accent-red)" }}
            whileTap={{ scale: 0.97 }}
          >
            <BarChart2 size={16} style={{ marginRight: "0.4rem" }} /> View Analytics
          </motion.button>
          <motion.button
            className="btn-secondary"
            onClick={() => {}}
            style={{ minWidth: "180px" }}
            whileHover={{ scale: 1.02, borderColor: "var(--color-good)" }}
            whileTap={{ scale: 0.97 }}
          >
            <TrendingUp size={16} style={{ marginRight: "0.4rem" }} /> Export Report
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}