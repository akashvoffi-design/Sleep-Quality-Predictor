"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Cpu, Database, Award, Activity, Heart, Moon, Zap, Sparkles, Brain, Target } from "lucide-react";

const featureItems = [
  { icon: Moon, label: "Sleep Duration", unit: "hrs" },
  { icon: Activity, label: "Physical Activity", unit: "min/day" },
  { icon: Brain, label: "Stress Level", unit: "/10" },
  { icon: Heart, label: "Blood Pressure", unit: "mmHg" },
  { icon: Target, label: "BMI Category", unit: "" },
  { icon: Sparkles, label: "Sleep Disorders", unit: "" },
];

const qualityLevels = [
  {
    level: "GOOD",
    color: "var(--color-good)",
    desc: "Optimal sleep duration, low stress & normal BP",
    threshold: "Score ≥ 8",
    icon: Sparkles,
  },
  {
    level: "AVERAGE",
    color: "var(--color-average)",
    desc: "Moderate sleep duration or mild stress levels",
    threshold: "Score 5–7",
    icon: Target,
  },
  {
    level: "POOR",
    color: "var(--color-poor)",
    desc: "Severe sleep restriction or sleep disorder signals",
    threshold: "Score < 5",
    icon: Brain,
  },
];

const statCards = [
  { icon: Cpu, value: "4", label: "ML Algorithms", sub: "RF, DT, SVM & Logistic Reg" },
  { icon: Database, value: "374", label: "Dataset Records", sub: "Kaggle Sleep Health & Lifestyle" },
  { icon: Award, value: "98.7%", label: "RF Accuracy", sub: "Top Performing Model" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, rotateX: 10, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] },
  },
};

const heroVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const floatVariants = {
  animate: {
    y: [-15, 15, -15],
    rotate: [-3, 3, -3],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export default function HomeView({ onStartPredict }) {
  const heroRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
      setMousePos({ x, y });
    };

    heroRef.current?.addEventListener("mousemove", handleMouseMove);
    return () => heroRef.current?.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const floatingShapes = [
    { size: 80, left: "10%", top: "15%", delay: 0, rotateSpeed: 20 },
    { size: 120, right: "10%", top: "20%", delay: 1, rotateSpeed: -30 },
    { size: 60, left: "15%", bottom: "15%", delay: 2, rotateSpeed: 25 },
    { size: 100, right: "20%", bottom: "25%", delay: 3, rotateSpeed: -15 },
    { size: 40, left: "30%", top: "40%", delay: 0.5, rotateSpeed: 40 },
    { size: 70, right: "30%", top: "50%", delay: 1.5, rotateSpeed: -20 },
  ];

  return (
    <div style={{ padding: "2rem 0", perspective: "1200px" }}>
      {/* Hero Section with 3D Background */}
      <motion.div
        ref={heroRef}
        className="card mesh-bg card-3d"
        style={{
          padding: "4rem 2.5rem",
          marginBottom: "2.5rem",
          position: "relative",
          overflow: "hidden",
          border: "1px solid var(--border-glow)",
          boxShadow: "var(--shadow-lg), var(--shadow-glow-lg)",
        }}
        variants={heroVariants}
        initial="hidden"
        animate="visible"
        whileHover={{
          boxShadow: "var(--shadow-lg), 0 0 80px rgba(255, 45, 74, 0.4)",
        }}
        transition={{ duration: 0.4 }}
      >
        {/* Floating 3D Geometric Shapes */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          {floatingShapes.map((shape, i) => (
            <motion.div
              key={i}
              style={{
                position: "absolute",
                width: shape.size,
                height: shape.size,
                left: shape.left,
                right: shape.right,
                top: shape.top,
                bottom: shape.bottom,
                borderRadius: i % 2 === 0 ? "50%" : "20%",
                background: `linear-gradient(135deg, rgba(255, 45, 74, ${0.08 + i * 0.02}) 0%, rgba(179, 25, 40, ${0.04 + i * 0.01}) 100%)`,
                border: `1px solid rgba(255, 45, 74, ${0.15 + i * 0.03})`,
                boxShadow: "0 0 30px rgba(255, 45, 74, 0.1)",
                transformStyle: "preserve-3d",
              }}
              animate={{
                y: [-15, 15, -15],
                rotate: [-3, 3, -3],
                rotateY: [0, 180, 360],
                rotateX: [0, 90, 0],
              }}
              transition={{
                duration: 8 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: shape.delay,
              }}
            />
          ))}
        </div>

        {/* Mouse Parallax Glow */}
        <motion.div
          style={{
            position: "absolute",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255, 45, 74, 0.15) 0%, transparent 70%)",
            pointerEvents: "none",
            transform: "translate(-50%, -50%)",
            left: `calc(50% + ${mousePos.x}px)`,
            top: `calc(50% + ${mousePos.y}px)`,
            transition: { duration: 0.5, ease: "easeOut" },
          }}
          animate={{
            x: mousePos.x,
            y: mousePos.y,
          }}
        />

        <div style={{ maxWidth: "800px", position: "relative", zIndex: 1 }}>
          <motion.div
            className="badge badge-red"
            style={{ marginBottom: "1.25rem", display: "inline-flex" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <Sparkles size={14} style={{ marginRight: "0.4rem", animate: { rotate: [0, 360] }, transition: { duration: 3, repeat: Infinity } }} />
            AI-Powered Machine Learning Model
          </motion.div>

          <motion.h1
            style={{
              fontSize: "clamp(2.5rem, 6vw, 3.5rem)",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              color: "#ffffff",
              marginBottom: "1.25rem",
              fontFamily: "var(--font-display)",
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Sleep Quality <span style={{ color: "var(--accent-red)" }}>Predictor</span>
          </motion.h1>

          <motion.p
            style={{
              fontSize: "1.15rem",
              color: "var(--text-silver)",
              lineHeight: 1.7,
              marginBottom: "2rem",
              fontWeight: 400,
              maxWidth: "600px",
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Analyze your lifestyle and sleep patterns to predict your sleep quality using machine learning algorithms trained on human health data.
          </motion.p>

          <motion.div
            style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <motion.button
              className="btn-primary"
              onClick={onStartPredict}
              style={{ fontSize: "1.05rem", padding: "1rem 2.5rem" }}
              whileHover={{ scale: 1.03, y: -3 }}
              whileTap={{ scale: 0.97 }}
            >
              Predict Sleep Quality <ArrowRight size={18} />
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Key Statistics Grid - 3D Cards */}
      <motion.div
        className="grid-3"
        style={{ marginBottom: "3rem" }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {statCards.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="card card-3d"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.25rem",
              minHeight: "140px",
              position: "relative",
              overflow: "visible",
            }}
            variants={cardVariants}
            transition={{ delay: i * 0.1 }}
            whileHover={{
              y: -8,
              scale: 1.02,
              boxShadow: "0 20px 50px rgba(0,0,0,0.6), var(--shadow-glow-lg)",
              transition: { duration: 0.3 },
            }}
          >
            <motion.div
              style={{
                background: "linear-gradient(135deg, rgba(255, 45, 74, 0.15) 0%, rgba(179, 25, 40, 0.1) 100%)",
                border: "1px solid var(--border-glow)",
                color: "var(--accent-red)",
                width: "64px",
                height: "64px",
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
              animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
            >
              <stat.icon size={32} />
            </motion.div>
            <motion.div variants={cardVariants} transition={{ delay: 0.1 }}>
              <motion.div
                style={{
                  fontSize: "2.5rem",
                  fontWeight: 800,
                  color: "#ffffff",
                  lineHeight: 1,
                  fontFamily: "var(--font-display)",
                }}
              >
                {stat.value}
              </motion.div>
              <motion.div
                style={{
                  fontSize: "0.95rem",
                  color: "var(--text-silver)",
                  marginTop: "0.2rem",
                  fontWeight: 600,
                }}
              >
                {stat.label}
              </motion.div>
              <motion.div
                style={{
                  fontSize: "0.78rem",
                  color: "var(--text-muted)",
                }}
              >
                {stat.sub}
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* AI Visual & Explanation Section */}
      <motion.div
        className="grid-2"
        style={{ marginBottom: "3rem" }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="card card-3d" variants={cardVariants}>
          <motion.div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "var(--accent-red)",
              marginBottom: "1rem",
            }}
          >
            <Zap size={20} animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }} />
            <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#ffffff", fontFamily: "var(--font-display)" }}>
              How The AI Model Works
            </h3>
          </motion.div>
          <motion.p
            style={{ color: "var(--text-silver)", fontSize: "0.95rem", lineHeight: "1.6", marginBottom: "1rem" }}
          >
            Our system uses supervised machine learning models trained on 12 multidimensional lifestyle and cardiovascular factors:
          </motion.p>
          <motion.ul
            style={{
              listStyle: "none",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0.75rem",
              color: "#ffffff",
              fontSize: "0.88rem",
            }}
          >
            {featureItems.map((item, i) => (
              <motion.li
                key={item.label}
                style={{
                  background: "var(--bg-input)",
                  padding: "0.7rem 1rem",
                  borderRadius: "10px",
                  border: "1px solid var(--border-subtle)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  transition: "all 0.2s ease",
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                whileHover={{
                  borderColor: "var(--accent-red)",
                  x: 5,
                  boxShadow: "var(--shadow-glow)",
                }}
              >
                <item.icon size={16} color="var(--accent-red)" />
                {item.label}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div className="card card-3d" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }} variants={cardVariants} transition={{ delay: 0.1 }}>
          <motion.div>
            <motion.div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                color: "var(--accent-red)",
                marginBottom: "1rem",
              }}
            >
              <Moon size={20} />
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#ffffff", fontFamily: "var(--font-display)" }}>
                3 Target Sleep Quality Levels
              </h3>
            </motion.div>
            <motion.div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {qualityLevels.map((q, i) => (
                <motion.div
                  key={q.level}
                  style={{
                    background: "var(--bg-input)",
                    padding: "0.85rem 1rem",
                    borderRadius: "10px",
                    borderLeft: `4px solid ${q.color}`,
                    borderTop: "1px solid var(--border-subtle)",
                    borderRight: "1px solid var(--border-subtle)",
                    borderBottom: "1px solid var(--border-subtle)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    transition: "all 0.2s ease",
                  }}
                  initial={{ opacity: 0, x: -30, rotateX: 10 }}
                  animate={{ opacity: 1, x: 0, rotateX: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  whileHover={{
                    borderColor: q.color,
                    x: 8,
                    boxShadow: `0 8px 30px ${q.color}33`,
                    scale: 1.01,
                  }}
                >
                  <motion.div>
                    <strong style={{ color: q.color, fontSize: "1rem" }}>{q.level}</strong>
                    <motion.div
                      style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.2rem" }}
                    >
                      {q.desc}
                    </motion.div>
                  </motion.div>
                  <motion.span
                    className={`badge ${q.level === "GOOD" ? "badge-good" : q.level === "AVERAGE" ? "badge-average" : "badge-poor"}`}
                    style={{ fontSize: "0.75rem", padding: "0.3rem 0.8rem" }}
                  >
                    {q.threshold}
                  </motion.span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}