"use client";

import React from "react";
import { motion } from "framer-motion";
import { Moon, Cpu, LayoutDashboard, BarChart3, Home, PlayCircle } from "lucide-react";

const navItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "predict", label: "Predict", icon: PlayCircle },
  { id: "result", label: "Result", icon: Moon, badge: "Live" },
  { id: "comparison", label: "Models", icon: Cpu },
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
];

const indicatorVariants = {
  initial: { width: 0, opacity: 0 },
  animate: (index) => ({
    width: `${100 / navItems.length}%`,
    opacity: 1,
    x: `${index * (100 / navItems.length)}%`,
    transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] },
  }),
};

export default function Navbar({ activeTab, setActiveTab, apiStatus }) {
  const activeIndex = navItems.findIndex((item) => item.id === activeTab);

  return (
    <header style={{
      background: "rgba(13, 5, 5, 0.85)",
      backdropFilter: "blur(20px)",
      borderBottom: "1px solid var(--border-subtle)",
      position: "sticky",
      top: 0,
      zIndex: 100,
    }}>
      <div className="container" style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "72px",
      }}>
        {/* Brand Logo */}
        <motion.button
          onClick={() => setActiveTab("home")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            cursor: "pointer",
            background: "none",
            border: "none",
            padding: 0,
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div
            style={{
              background: "linear-gradient(135deg, var(--accent-red) 0%, var(--accent-crimson) 100%)",
              color: "#000000",
              width: "42px",
              height: "42px",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 20px var(--accent-red-glow)",
              position: "relative",
              overflow: "hidden",
            }}
            animate={{ rotate: 0 }}
            transition={{ duration: 20, ease: "linear", repeat: Infinity }}
          >
            <Moon size={24} style={{ strokeWidth: 2.5 }} />
            <motion.div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.2) 50%, transparent 60%)",
                transform: "translateX(-100%)",
              }}
              animate={{ transform: ["translateX(-100%)", "translateX(100%)"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
          <div>
            <div style={{
              fontWeight: 800,
              fontSize: "1.2rem",
              letterSpacing: "0.02em",
              color: "#ffffff",
              fontFamily: "var(--font-display)",
            }}>
              SLEEP<span style={{ color: "var(--accent-red)" }}>.AI</span>
            </div>
            <div style={{
              fontSize: "0.7rem",
              color: "var(--text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              fontWeight: 600,
            }}>
              3D Quality Predictor
            </div>
          </div>
        </motion.button>

        {/* Navigation Links */}
        <motion.nav style={{
          display: "flex",
          gap: "0.35rem",
          position: "relative",
          background: "var(--bg-input)",
          padding: "4px",
          borderRadius: "12px",
          border: "1px solid var(--border-subtle)",
        }}>
          {/* Animated indicator */}
          <motion.div
            variants={indicatorVariants}
            initial="initial"
            animate={indicatorVariants.animate(activeIndex)}
            style={{
              position: "absolute",
              top: "4px",
              bottom: "4px",
              height: "auto",
              borderRadius: "8px",
              background: "linear-gradient(135deg, var(--accent-red) 0%, var(--accent-crimson) 100%)",
              boxShadow: "0 2px 12px var(--accent-red-glow)",
              zIndex: 1,
            }}
          />

          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <motion.button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  background: "transparent",
                  color: isActive ? "#ffffff" : "var(--text-muted)",
                  border: "none",
                  padding: "0.5rem 1rem",
                  borderRadius: "8px",
                  fontWeight: isActive ? 700 : 500,
                  fontSize: "0.88rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.45rem",
                  transition: "color 0.2s ease",
                  position: "relative",
                  zIndex: 2,
                }}
                whileHover={{ color: isActive ? "#ffffff" : "var(--accent-rose)" }}
                whileTap={{ scale: 0.96 }}
              >
                <Icon size={15} color={isActive ? "#ffffff" : "var(--text-muted)"} />
                {item.label}
                {item.badge && (
                  <motion.span
                    style={{
                      background: "var(--accent-red)",
                      color: "#000000",
                      fontSize: "0.6rem",
                      fontWeight: 800,
                      padding: "1px 6px",
                      borderRadius: "4px",
                      marginLeft: "4px",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
                  >
                    {item.badge}
                  </motion.span>
                )}
              </motion.button>
            );
          })}
        </motion.nav>

        {/* System Status Pill */}
        <motion.div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "linear-gradient(135deg, var(--bg-card) 0%, var(--bg-surface) 100%)",
            border: "1px solid var(--border-subtle)",
            padding: "0.4rem 1rem",
            borderRadius: "50px",
            fontSize: "0.78rem",
            boxShadow: "var(--shadow-sm)",
          }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <motion.span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: apiStatus === "healthy" ? "var(--color-good)" : "var(--accent-red)",
              boxShadow: `0 0 8px ${apiStatus === "healthy" ? "var(--color-good)" : "var(--accent-red)"}`,
            }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <span style={{ color: "var(--text-silver)", fontWeight: 600 }}>
            {apiStatus === "healthy" ? "Python Backend Active" : "Client ML Engine"}
          </span>
        </motion.div>
      </div>
    </header>
  );
}