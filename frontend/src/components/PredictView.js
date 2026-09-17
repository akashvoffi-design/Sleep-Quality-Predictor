"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Moon, Activity, Heart, RefreshCw, Zap, Sliders, ShieldCheck, CheckCircle2, AlertCircle } from "lucide-react";

const formVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.05,
    },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] },
  },
};

const presets = [
  { key: "tech", label: "⚡ Tech Worker (High Stress)", icon: Zap },
  { key: "athlete", label: "🏃 Healthy Athlete", icon: Activity },
  { key: "nurse", label: "🩺 Shift Nurse (Sleep Apnea)", icon: Heart },
  { key: "sedentary", label: "⚠️ Sedentary Overweight", icon: User },
];

const modelOptions = [
  { value: "Random Forest", label: "Random Forest (~98.7% Acc)", color: "var(--accent-red)" },
  { value: "Decision Tree", label: "Decision Tree (~94.7% Acc)", color: "var(--color-good)" },
  { value: "SVM", label: "SVM (~92.0% Acc)", color: "var(--color-average)" },
  { value: "Logistic Regression", label: "Logistic Regression (~89.3% Acc)", color: "var(--accent-rose)" },
];

export default function PredictView({ onSubmitPrediction, isSubmitting }) {
  const initialForm = {
    gender: "Male",
    age: 28,
    occupation: "Software Engineer",
    sleep_duration: 6.5,
    quality_of_sleep: 6,
    physical_activity_level: 40,
    stress_level: 7,
    bmi_category: "Normal",
    systolic_bp: 122,
    diastolic_bp: 82,
    heart_rate: 74,
    daily_steps: 6500,
    sleep_disorder: "None",
    model_name: "Random Forest",
  };

  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [showTips, setShowTips] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const applyPreset = (preset) => {
    if (preset === "tech") {
      setFormData({
        gender: "Male", age: 28, occupation: "Software Engineer",
        sleep_duration: 5.5, quality_of_sleep: 5, physical_activity_level: 25,
        stress_level: 8, bmi_category: "Normal", systolic_bp: 128, diastolic_bp: 84,
        heart_rate: 78, daily_steps: 4200, sleep_disorder: "Insomnia", model_name: "Random Forest"
      });
    } else if (preset === "athlete") {
      setFormData({
        gender: "Female", age: 25, occupation: "Engineer",
        sleep_duration: 8.5, quality_of_sleep: 9, physical_activity_level: 90,
        stress_level: 2, bmi_category: "Normal Weight", systolic_bp: 112, diastolic_bp: 74,
        heart_rate: 60, daily_steps: 12500, sleep_disorder: "None", model_name: "Random Forest"
      });
    } else if (preset === "nurse") {
      setFormData({
        gender: "Female", age: 38, occupation: "Nurse",
        sleep_duration: 5.0, quality_of_sleep: 4, physical_activity_level: 35,
        stress_level: 8, bmi_category: "Overweight", systolic_bp: 138, diastolic_bp: 90,
        heart_rate: 82, daily_steps: 8200, sleep_disorder: "Sleep Apnea", model_name: "Random Forest"
      });
    } else if (preset === "sedentary") {
      setFormData({
        gender: "Male", age: 48, occupation: "Manager",
        sleep_duration: 5.8, quality_of_sleep: 4, physical_activity_level: 15,
        stress_level: 7, bmi_category: "Obese", systolic_bp: 142, diastolic_bp: 92,
        heart_rate: 85, daily_steps: 3100, sleep_disorder: "Sleep Apnea", model_name: "Random Forest"
      });
    }
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (formData.age < 18 || formData.age > 100) newErrors.age = "Age must be 18-100";
    if (formData.sleep_duration < 2 || formData.sleep_duration > 14) newErrors.sleep_duration = "Sleep duration must be 2-14 hrs";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmitPrediction(formData);
  };

  const formSections = [
    {
      title: "Personal Information",
      icon: User,
      fields: (
        <>
          <div className="form-group">
            <label className="form-label">Gender <span className="req">*</span></label>
            <select name="gender" className="form-select" value={formData.gender} onChange={handleChange}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className={`form-group ${errors.age ? "shake" : ""}`}>
            <label className="form-label">
              Age: <strong style={{ color: "var(--accent-red)" }}>{formData.age} yrs</strong> <span className="req">*</span>
            </label>
            <input type="range" name="age" min="18" max="85" value={formData.age} onChange={handleChange} />
            {errors.age && <div style={{ color: "var(--accent-red)", fontSize: "0.8rem", marginTop: "0.3rem" }}><AlertCircle size={12} style={{ marginRight: 4 }} />{errors.age}</div>}
          </div>

          <div className="form-group">
            <label className="form-label">Occupation <span className="req">*</span></label>
            <select name="occupation" className="form-select" value={formData.occupation} onChange={handleChange}>
              <option value="Software Engineer">Software Engineer</option>
              <option value="Doctor">Doctor</option>
              <option value="Nurse">Nurse</option>
              <option value="Teacher">Teacher</option>
              <option value="Engineer">Engineer</option>
              <option value="Accountant">Accountant</option>
              <option value="Scientist">Scientist</option>
              <option value="Lawyer">Lawyer</option>
              <option value="Salesperson">Salesperson</option>
              <option value="Manager">Manager</option>
              <option value="Sales Representative">Sales Representative</option>
            </select>
          </div>
        </>
      ),
    },
    {
      title: "Sleep Information",
      icon: Moon,
      fields: (
        <>
          <div className={`form-group ${errors.sleep_duration ? "shake" : ""}`}>
            <label className="form-label">
              Sleep Duration: <strong style={{ color: "var(--accent-red)" }}>{formData.sleep_duration} hrs</strong> <span className="req">*</span>
            </label>
            <input type="range" name="sleep_duration" min="3.0" max="10.0" step="0.1" value={formData.sleep_duration} onChange={handleChange} />
            {errors.sleep_duration && <div style={{ color: "var(--accent-red)", fontSize: "0.8rem", marginTop: "0.3rem" }}><AlertCircle size={12} style={{ marginRight: 4 }} />{errors.sleep_duration}</div>}
          </div>

          <div className="form-group">
            <label className="form-label">
              Self-Rated Quality: <strong style={{ color: "var(--accent-red)" }}>{formData.quality_of_sleep} / 10</strong> <span className="req">*</span>
            </label>
            <input type="range" name="quality_of_sleep" min="1" max="10" value={formData.quality_of_sleep} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label className="form-label">
              Physical Activity: <strong style={{ color: "var(--accent-red)" }}>{formData.physical_activity_level} mins/day</strong>
            </label>
            <input type="range" name="physical_activity_level" min="0" max="120" step="5" value={formData.physical_activity_level} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label className="form-label">
              Stress Level: <strong style={{ color: "var(--accent-red)" }}>{formData.stress_level} / 10</strong>
            </label>
            <input type="range" name="stress_level" min="1" max="10" value={formData.stress_level} onChange={handleChange} />
          </div>
        </>
      ),
    },
    {
      title: "Health & Vitals",
      icon: Heart,
      fields: (
        <>
          <div className="form-group">
            <label className="form-label">BMI Category <span className="req">*</span></label>
            <select name="bmi_category" className="form-select" value={formData.bmi_category} onChange={handleChange}>
              <option value="Normal">Normal</option>
              <option value="Normal Weight">Normal Weight</option>
              <option value="Overweight">Overweight</option>
              <option value="Obese">Obese</option>
            </select>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            <div className="form-group">
              <label className="form-label">Systolic BP</label>
              <input type="number" name="systolic_bp" className="form-control" value={formData.systolic_bp} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Diastolic BP</label>
              <input type="number" name="diastolic_bp" className="form-control" value={formData.diastolic_bp} onChange={handleChange} />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            <div className="form-group">
              <label className="form-label">Heart Rate (bpm)</label>
              <input type="number" name="heart_rate" className="form-control" value={formData.heart_rate} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Daily Steps</label>
              <input type="number" name="daily_steps" className="form-control" value={formData.daily_steps} onChange={handleChange} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Sleep Disorder</label>
            <select name="sleep_disorder" className="form-select" value={formData.sleep_disorder} onChange={handleChange}>
              <option value="None">None</option>
              <option value="Insomnia">Insomnia</option>
              <option value="Sleep Apnea">Sleep Apnea</option>
            </select>
          </div>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: "1.5rem 0" }}>
      <motion.div
        style={{ marginBottom: "2rem" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div className="badge badge-red" style={{ marginBottom: "0.75rem", display: "inline-flex" }}>
          <Sliders size={14} style={{ marginRight: "0.4rem" }} /> Feature Extraction Form
        </motion.div>
        <motion.h2
          style={{
            fontSize: "2rem",
            fontWeight: 800,
            color: "#ffffff",
            marginBottom: "0.5rem",
            fontFamily: "var(--font-display)",
          }}
        >
          Sleep Quality Prediction Input
        </motion.h2>
        <motion.p style={{ color: "var(--text-silver)", fontSize: "0.95rem" }}>
          Enter your lifestyle and sleep data to generate a machine learning classification result based on dataset features.
        </motion.p>
      </motion.div>

      {/* Preset Fill Buttons */}
      <motion.div
        className="card card-3d"
        style={{ marginBottom: "2rem", background: "var(--bg-input)", perspective: "1000px" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        whileHover={{ boxShadow: "var(--shadow-glow)" }}
      >
        <motion.div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            color: "var(--accent-red)",
            fontSize: "0.88rem",
            fontWeight: 700,
            marginBottom: "0.75rem",
          }}
        >
          <Zap size={16} animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }} />
          Quick Scenario Presets (One-Click Auto Fill):
        </motion.div>
        <motion.div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          {presets.map((preset, i) => (
            <motion.button
              key={preset.key}
              type="button"
              className="btn-secondary"
              onClick={() => applyPreset(preset.key)}
              style={{ fontSize: "0.82rem", padding: "0.5rem 1rem" }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.05 }}
              whileHover={{
                scale: 1.05,
                borderColor: "var(--accent-red)",
                backgroundColor: "var(--bg-card-hover)",
                boxShadow: "var(--shadow-glow)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <preset.icon size={14} style={{ marginRight: "0.3rem" }} />
              {preset.label}
            </motion.button>
          ))}
        </motion.div>
      </motion.div>

      <form onSubmit={handleSubmit}>
        <motion.div
          className="grid-3"
          style={{ marginBottom: "2rem", perspective: "1200px" }}
          variants={formVariants}
          initial="hidden"
          animate="visible"
        >
          {formSections.map((section, i) => (
            <motion.div
              key={section.title}
              className="card card-3d"
              variants={sectionVariants}
              transition={{ delay: i * 0.1 }}
              whileHover={{
                y: -5,
                boxShadow: "0 15px 40px rgba(0,0,0,0.5), var(--shadow-glow)",
              }}
            >
              <motion.div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  color: "var(--accent-red)",
                  marginBottom: "1.25rem",
                }}
              >
                <section.icon size={18} />
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#ffffff", fontFamily: "var(--font-display)" }}>
                  {section.title}
                </h3>
              </motion.div>
              {section.fields}
            </motion.div>
          ))}
        </motion.div>

        {/* Model Selection Selector Bar */}
        <motion.div
          className="card card-3d"
          style={{
            marginBottom: "2rem",
            background: "var(--bg-input)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
            perspective: "1000px",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ boxShadow: "var(--shadow-glow)" }}
        >
          <motion.div
            style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
          >
            <Sliders color="var(--accent-red)" size={20} />
            <div>
              <div style={{ fontWeight: 700, color: "#ffffff", fontSize: "0.95rem", fontFamily: "var(--font-display)" }}>
                Select ML Classification Model:
              </div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                Defaults to Random Forest (~98.7% accuracy)
              </div>
            </div>
          </motion.div>

          <motion.div style={{ width: "100%", maxWidth: "320px" }}>
            <select name="model_name" className="form-select" value={formData.model_name} onChange={handleChange}>
              {modelOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </motion.div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          style={{ display: "flex", gap: "1rem", justifyContent: "flex-end", flexWrap: "wrap" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.button
            type="button"
            className="btn-secondary"
            onClick={() => setFormData(initialForm)}
            whileHover={{ scale: 1.05, borderColor: "var(--text-muted)" }}
            whileTap={{ scale: 0.95 }}
          >
            <RefreshCw size={16} /> Reset Form
          </motion.button>

          <motion.button
            type="submit"
            className="btn-primary"
            disabled={isSubmitting}
            style={{ minWidth: "220px", justifyContent: "center" }}
            whileHover={{ scale: 1.03, y: -3 }}
            whileTap={{ scale: 0.97 }}
          >
            <AnimatePresence mode="wait">
              {isSubmitting ? (
                <motion.span
                  key="loading"
                  style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    style={{
                      width: "16px",
                      height: "16px",
                      borderRadius: "50%",
                      border: "2px solid rgba(255,255,255,0.3)",
                      borderTopColor: "#fff",
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                  />
                  Executing Model...
                </motion.span>
              ) : (
                <motion.span
                  key="submit"
                  style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Zap size={18} /> Predict Sleep Quality
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>
      </form>
    </div>
  );
}