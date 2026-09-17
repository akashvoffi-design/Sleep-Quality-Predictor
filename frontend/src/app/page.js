"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HomeView from "../components/HomeView";
import PredictView from "../components/PredictView";
import ResultView from "../components/ResultView";
import ComparisonView from "../components/ComparisonView";
import DashboardView from "../components/DashboardView";
import { fetchHealth, fetchStats, fetchModels, predictSleepQuality } from "../lib/mlClient";

const pageVariants = {
  enter: {
    opacity: 0,
    y: 40,
    scale: 0.97,
    filter: "blur(6px)",
  },
  center: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.98,
    filter: "blur(4px)",
    transition: { duration: 0.3, ease: [0.55, 0.06, 0.68, 0.19] },
  },
};

const childVariants = {
  enter: { opacity: 0, y: 30, rotateX: 8 },
  center: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] },
  },
};

const TAB_ORDER = ["home", "predict", "result", "comparison", "dashboard"];

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [apiStatus, setApiStatus] = useState("checking");
  const [statsData, setStatsData] = useState(null);
  const [modelsData, setModelsData] = useState(null);
  const [history, setHistory] = useState([]);
  const [lastPrediction, setLastPrediction] = useState(null);
  const [isPredicting, setIsPredicting] = useState(false);

  useEffect(() => {
    async function initializeSystem() {
      const health = await fetchHealth();
      setApiStatus(health.status);

      const [stats, mData] = await Promise.all([
        fetchStats(),
        fetchModels(),
      ]);

      setStatsData(stats);
      setModelsData(mData);
    }
    initializeSystem();
  }, []);

  const handlePredictSubmit = useCallback(async (formData) => {
    setIsPredicting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    try {
      const result = await predictSleepQuality({
        ...formData,
        timestamp: new Date().toLocaleString(),
      });

      setLastPrediction({ ...formData, ...result });

      setHistory((prev) => {
        const newHistory = [
          {
            id: Date.now(),
            date: new Date().toLocaleString(),
            ...formData,
            predicted_quality: result.predicted_quality,
            confidence: result.confidence,
            model_used: result.model_used,
          },
          ...prev,
        ];
        return newHistory.slice(0, 50);
      });

      setActiveTab("result");
    } catch (error) {
      console.error("Prediction failed:", error);
    } finally {
      setIsPredicting(false);
    }
  }, []);

  const handleClearHistory = useCallback(() => {
    if (window.confirm("Are you sure you want to clear all prediction history?")) {
      setHistory([]);
    }
  }, []);

  const navigateTab = useCallback((tab) => {
    setActiveTab(tab);
  }, []);

  const tabDirection = useMemo(() => {
    const currentIdx = TAB_ORDER.indexOf(activeTab);
    return currentIdx >= 0 ? currentIdx : 0;
  }, [activeTab]);

  return (
    <>
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              "--particle-size": `${2 + Math.random() * 4}px`,
              "--particle-opacity": `${0.15 + Math.random() * 0.25}`,
              "--particle-duration": `${10 + Math.random() * 15}s`,
              "--particle-delay": `${Math.random() * 10}s`,
              "--particle-drift": `${-20 + Math.random() * 40}px`,
            }}
          />
        ))}
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar activeTab={activeTab} setActiveTab={navigateTab} apiStatus={apiStatus} />

        <main className="container" style={{ minHeight: "calc(100vh - 72px - 200px)" }}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeTab}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              style={{ perspective: "1200px" }}
            >
              {activeTab === "home" && (
                <motion.div variants={childVariants}>
                  <HomeView onStartPredict={() => navigateTab("predict")} />
                </motion.div>
              )}

              {activeTab === "predict" && (
                <motion.div variants={childVariants}>
                  <PredictView
                    onSubmitPrediction={handlePredictSubmit}
                    isSubmitting={isPredicting}
                  />
                </motion.div>
              )}

              {activeTab === "result" && (
                <motion.div variants={childVariants}>
                  <ResultView
                    resultData={lastPrediction}
                    inputSummary={lastPrediction}
                    onPredictAgain={() => navigateTab("predict")}
                    onViewModels={() => navigateTab("comparison")}
                  />
                </motion.div>
              )}

              {activeTab === "comparison" && (
                <motion.div variants={childVariants}>
                  <ComparisonView modelsData={modelsData} />
                </motion.div>
              )}

              {activeTab === "dashboard" && (
                <motion.div variants={childVariants}>
                  <DashboardView
                    history={history}
                    lastPrediction={lastPrediction}
                    onClearHistory={handleClearHistory}
                    onPredictAgain={() => navigateTab("predict")}
                  />
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        <Footer />
      </div>
    </>
  );
}