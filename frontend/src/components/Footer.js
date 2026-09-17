"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldAlert, Database, Cpu, Moon, Sparkles } from "lucide-react";

const footerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] },
  },
};

const statItems = [
  { icon: Cpu, label: "Random Forest Accuracy", value: "98.7%", color: "var(--accent-red)" },
  { icon: Database, label: "Dataset Records", value: "374", color: "var(--accent-rose)" },
  { icon: Moon, label: "Algorithms Tested", value: "4 Models", color: "var(--color-good)" },
  { icon: Sparkles, label: "Classification", value: "3 Classes", color: "var(--color-average)" },
];

const featureItems = [
  "Sleep Duration & Quality Rating",
  "Stress Level & Physical Activity",
  "BMI Category & Blood Pressure",
  "Sleep Disorder Categorization",
];

export default function Footer() {
  return (
    <footer
      style={{
        background: "linear-gradient(180deg, var(--bg-primary) 0%, #080202 100%)",
        borderTop: "1px solid var(--border-subtle)",
        padding: "3rem 0 1.5rem 0",
        marginTop: "4rem",
        position: "relative",
        overflow: "hidden",
      }}
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Top glow line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "10%",
          right: "10%",
          height: "1px",
          background: "linear-gradient(90deg, transparent, var(--accent-red), transparent)",
          opacity: 0.5,
        }}
      />

      <div className="container">
        <motion.div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr",
            gap: "2.5rem",
            marginBottom: "2rem",
          }}
          variants={itemVariants}
        >
          <motion.div variants={itemVariants}>
            <motion.div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "0.75rem",
              }}
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                style={{
                  background: "linear-gradient(135deg, var(--accent-red) 0%, var(--accent-crimson) 100%)",
                  color: "#000000",
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 15px var(--accent-red-glow)",
                }}
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 15, ease: "linear", repeat: Infinity }}
              >
                <Moon size={20} style={{ strokeWidth: 2.5 }} />
              </motion.div>
              <span style={{
                fontWeight: 800,
                fontSize: "1.1rem",
                color: "#ffffff",
                fontFamily: "var(--font-display)",
              }}>
                Sleep Quality Predictor
              </span>
            </motion.div>
            <motion.p
              style={{
                color: "var(--text-muted)",
                fontSize: "0.88rem",
                maxWidth: "450px",
                lineHeight: "1.6",
              }}
              variants={itemVariants}
            >
              Machine Learning Sleep Analysis system powered by Scikit-Learn models (Random Forest, Decision Tree, Logistic Regression, SVM) trained on 374 human health and lifestyle records.
            </motion.p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <motion.h4
              style={{
                color: "#ffffff",
                fontSize: "0.9rem",
                fontWeight: 700,
                marginBottom: "0.75rem",
                fontFamily: "var(--font-display)",
              }}
              variants={itemVariants}
            >
              ML Specifications
            </motion.h4>
            <motion.ul
              style={{
                listStyle: "none",
                color: "var(--text-muted)",
                fontSize: "0.85rem",
                lineHeight: "1.9",
              }}
              variants={itemVariants}
            >
              {statItems.map((item, i) => (
                <motion.li
                  key={item.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                  }}
                  variants={itemVariants}
                  transition={{ delay: i * 0.05 }}
                >
                  <item.icon
                    size={16}
                    color={item.color}
                    style={{ flexShrink: 0 }}
                  />
                  <span>{item.label}</span>
                  <span style={{ color: item.color, fontWeight: 700, marginLeft: "auto" }}>
                    {item.value}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <motion.h4
              style={{
                color: "#ffffff",
                fontSize: "0.9rem",
                fontWeight: 700,
                marginBottom: "0.75rem",
                fontFamily: "var(--font-display)",
              }}
              variants={itemVariants}
            >
              Features & Inputs
            </motion.h4>
            <motion.ul
              style={{
                listStyle: "none",
                color: "var(--text-muted)",
                fontSize: "0.85rem",
                lineHeight: "1.9",
              }}
              variants={itemVariants}
            >
              {featureItems.map((item, i) => (
                <motion.li
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                  }}
                  variants={itemVariants}
                  transition={{ delay: i * 0.05 }}
                >
                  <motion.span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "var(--accent-red)",
                      boxShadow: "0 0 6px var(--accent-red-glow)",
                    }}
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  />
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </motion.div>

        {/* Disclaimer Bar */}
        <motion.div
          style={{
            background: "linear-gradient(135deg, var(--bg-card) 0%, var(--bg-surface) 100%)",
            border: "1px solid var(--border-glow)",
            padding: "1rem 1.25rem",
            borderRadius: "12px",
            display: "flex",
            alignItems: "flex-start",
            gap: "0.75rem",
            marginBottom: "1.5rem",
            boxShadow: "var(--shadow-glow)",
          }}
          variants={itemVariants}
        >
          <motion.div
            style={{
              flexShrink: 0,
              marginTop: "2px",
            }}
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <ShieldAlert color="var(--accent-red)" size={20} />
          </motion.div>
          <motion.p
            style={{
              fontSize: "0.8rem",
              color: "var(--text-silver)",
              margin: 0,
              lineHeight: "1.5",
            }}
          >
            <strong style={{ color: "var(--accent-rose)" }}>Medical Disclaimer:</strong>{" "}
            This prediction is based on machine-learning patterns in the Kaggle dataset (374 records with 5 Poor quality records) and is intended strictly for informational and academic demonstration purposes. It is not a medical diagnosis.
          </motion.p>
        </motion.div>

        <motion.div
          style={{
            borderTop: "1px solid rgba(61, 18, 18, 0.5)",
            paddingTop: "1.25rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "0.78rem",
            color: "var(--text-muted)",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
          variants={itemVariants}
        >
          <motion.div variants={itemVariants}>© 2026 Sleep Quality Predictor System • AI/ML Academic Project</motion.div>
          <motion.div variants={itemVariants}>Built with Next.js & Python Scikit-Learn</motion.div>
        </motion.div>
      </div>
    </footer>
  );
}