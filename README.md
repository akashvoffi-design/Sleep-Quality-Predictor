<div align="center">

# 🌙 Sleep Quality Predictor

### An AI-Powered Full-Stack Web Application for Sleep Health Analysis

[![Python](https://img.shields.io/badge/Python-3.10%2B-blue?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Flask](https://img.shields.io/badge/Flask-REST%20API-green?style=for-the-badge&logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![scikit-learn](https://img.shields.io/badge/scikit--learn-ML%20Engine-orange?style=for-the-badge&logo=scikit-learn&logoColor=white)](https://scikit-learn.org/)
[![Accuracy](https://img.shields.io/badge/Best%20Model-98.7%25%20Accuracy-brightgreen?style=for-the-badge)](/)

> **Author:** Akash &nbsp;|&nbsp; **Domain:** ML · Health Analytics · Web Dev &nbsp;|&nbsp; **Year:** 2026

</div>

---

## 📋 Table of Contents

| # | Section |
|---|---------|
| 1 | [🔍 What Is This Project?](#-what-is-this-project) |
| 2 | [🎯 The Problem We're Solving](#-the-problem-were-solving) |
| 3 | [📊 Dataset Overview](#-dataset-overview) |
| 4 | [🏗️ How The System Works](#️-how-the-system-works) |
| 5 | [🤖 Machine Learning Pipeline](#-machine-learning-pipeline) |
| 6 | [📈 Model Results & Accuracy](#-model-results--accuracy) |
| 7 | [🔬 Feature Importance](#-feature-importance) |
| 8 | [🖥️ Web Application Pages](#️-web-application-pages) |
| 9 | [🔌 REST API Reference](#-rest-api-reference) |
| 10 | [📁 Project Structure](#-project-structure) |
| 11 | [🚀 How To Run](#-how-to-run) |
| 12 | [🧠 Technical Decisions Explained](#-technical-decisions-explained) |
| 13 | [⚠️ Limitations & Disclaimer](#️-limitations--disclaimer) |
| 14 | [🔮 Future Roadmap](#-future-roadmap) |
| 15 | [🛠️ Tech Stack](#️-tech-stack) |

---

## 🔍 What Is This Project?

The **Sleep Quality Predictor** is a complete, production-style AI/ML web application that takes a person's **daily lifestyle and health inputs** and predicts whether their sleep quality is:

| 🟢 Good | 🟡 Average | 🔴 Poor |
|---------|-----------|---------|
| Sleep quality score **≥ 8** | Sleep quality score **5 – 7** | Sleep quality score **< 5** |
| Rested, refreshed, healthy sleep | Moderate sleep, room for improvement | Disrupted, insufficient, problematic sleep |

The system is powered by **4 trained ML models**, serves predictions via a **Flask REST API**, and displays everything through a **premium black-and-yellow Next.js dashboard**.

---

## 🎯 The Problem We're Solving

> *Most people don't know how their daily habits directly affect how well they sleep.*

Sleep affects **everything** — mental health, productivity, immune function, and lifespan. Yet it's rarely tracked objectively. This project solves that by:

- ✅ Accepting **12 health & lifestyle inputs** from a user
- ✅ Running them through **trained ML models** in real time
- ✅ Returning a **prediction with confidence score** (e.g., 94.5%)
- ✅ Showing **which factors hurt or help** your sleep
- ✅ Providing **personalized, actionable recommendations**

---

## 📊 Dataset Overview

**Source:** [Kaggle — Sleep Health and Lifestyle Dataset](https://www.kaggle.com/datasets/uom190346a/sleep-health-and-lifestyle-dataset)

| Property | Value |
|----------|-------|
| 📦 Total Records | **374 entries** |
| 📐 Features Used | **12 input features** |
| 🎯 Target Classes | Good · Average · Poor |
| ❓ Missing Values | 219 NaN in `Sleep Disorder` (filled as `"None"`) |

### 📋 Input Features Explained

| # | Feature | Type | Values | What It Measures |
|---|---------|------|--------|-----------------|
| 1 | **Gender** | Category | Male / Female | Biological sex |
| 2 | **Age** | Number | 27 – 59 yrs | Age in years |
| 3 | **Occupation** | Category | 11 job types | Type of profession |
| 4 | **Sleep Duration** | Decimal | 5.8 – 8.5 hrs | Avg hours slept per night |
| 5 | **Quality of Sleep** | Integer | 1 – 10 | Self-rated sleep quality score |
| 6 | **Physical Activity** | Integer | 30 – 90 min | Daily exercise in minutes |
| 7 | **Stress Level** | Integer | 3 – 8 | Self-reported stress (1–10 scale) |
| 8 | **BMI Category** | Category | Normal / Overweight / Obese | Body weight classification |
| 9 | **Blood Pressure** | String → 2 numbers | e.g. "125/80" | Systolic & diastolic BP |
| 10 | **Heart Rate** | Integer | 65 – 86 bpm | Resting heart rate |
| 11 | **Daily Steps** | Integer | 3,000 – 10,000 | Average step count per day |
| 12 | **Sleep Disorder** | Category | None / Insomnia / Sleep Apnea | Diagnosed sleep condition |

### 📈 Class Distribution

| Class | Count | Share |
|-------|-------|-------|
| 🟡 Average | 189 | 50.5% |
| 🟢 Good | 180 | 48.1% |
| 🔴 Poor | **5** | **1.3%** |

> [!WARNING]
> The **"Poor"** class has only **5 records** out of 374. This severe class imbalance means the model has very limited exposure to truly poor sleep patterns. Treat "Poor" predictions with extra caution.

### 🔧 Data Preprocessing (Step by Step)

```
1. Clean column names     → strip spaces, lowercase, underscores
2. Fill NaN values        → Sleep Disorder NaN → "None" (not missing, means no disorder)
3. Drop Person ID         → no predictive value
4. Create target label    → Quality of Sleep score → Good / Average / Poor bucket
5. Split Blood Pressure   → "125/80" string → systolic_bp + diastolic_bp (2 features)
6. Encode categories      → LabelEncoder on: gender, occupation, bmi_category, sleep_disorder
7. Encode target          → LabelEncoder: Average=0, Good=1, Poor=2
8. Scale features         → StandardScaler (zero mean, unit variance) on all 12 features
```

---

## 🏗️ How The System Works

```
┌─────────────────────────────────────────────────────────────────┐
│                  USER (Web Browser)                             │
│               http://localhost:3000                             │
└────────────────────────┬────────────────────────────────────────┘
                         │  User fills the form & clicks Predict
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│              NEXT.JS FRONTEND  (React App)                      │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐  │
│  │  Home   │ │ Predict │ │ Result  │ │ Models  │ │Dashboard│  │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘  │
│              ↕ JSON via Fetch API (mlClient.js)                 │
└────────────────────────┬────────────────────────────────────────┘
                         │  POST /api/predict
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│             FLASK REST API  (app.py, Port 5000)                 │
│   /api/health  /api/predict  /api/models  /api/stats            │
└────────────────────────┬────────────────────────────────────────┘
                         │  Calls engine.predict()
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│            ML ENGINE  (ml_engine.py)                            │
│  • encode inputs → scale → run model → decode → add tips        │
│                                                                 │
│  ml_artifacts/                                                  │
│  ├── models.pkl          ← 4 trained classifiers                │
│  ├── scaler.pkl          ← StandardScaler                       │
│  ├── label_encoders.pkl  ← Category encoders                    │
│  ├── target_encoder.pkl  ← Output decoder                       │
│  └── metrics.json        ← Accuracy, F1, Precision, Recall      │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
         Sleep_health_and_lifestyle_dataset.csv
                  (374 records × 13 columns)
```

---

## 🤖 Machine Learning Pipeline

### Models Trained

| # | Algorithm | Key Settings | Strength |
|---|-----------|-------------|---------|
| 🏆 1 | **Random Forest** | 200 trees, `random_state=42` | Best accuracy, handles imbalance well |
| 2 | **Decision Tree** | `max_depth=6` | Interpretable, fast |
| 3 | **SVM** | RBF kernel, probability mode | Great at class boundaries |
| 4 | **Logistic Regression** | `max_iter=1000` | Baseline linear model |

### Training Flow

```
Raw CSV
  └─► Load & Clean
        └─► Handle Missing Values
              └─► Create Labels (Good/Average/Poor)
                    └─► Encode Categoricals
                          └─► 80/20 Train-Test Split (Stratified)
                                └─► Fit StandardScaler on train
                                      └─► Train All 4 Models
                                            └─► Evaluate & Save .pkl files
                                                  └─► Predict at runtime
```

---

## 📈 Model Results & Accuracy

### Performance Comparison

| Rank | Model | Accuracy | F1 Score | Precision | Recall |
|------|-------|----------|----------|-----------|--------|
| 🥇 **#1** | **Random Forest** | **98.67%** | **98.67%** | **98.70%** | **98.67%** |
| 🥈 #2 | Decision Tree | 97.33% | 97.53% | 98.04% | 97.33% |
| 🥉 #3 | SVM | 97.33% | 96.68% | 96.04% | 97.33% |
| 4 | Logistic Regression | 96.00% | 95.34% | 94.77% | 96.00% |

### Confusion Matrix — Random Forest (Best)

```
                  Predicted →
                  Average   Good   Poor
Actual ↓ Average  [ 37 ]     1      0      → Only 1 mistake
         Good       0      [ 36 ]   0
         Poor       0        0    [ 1 ]
```

> ✅ **Only 1 misclassification** in the entire 75-record test set — an "Average" predicted as "Good".

---

## 🔬 Feature Importance

> *What does the model rely on most to make its prediction?*

| Rank | Feature | Importance | Impact |
|------|---------|-----------|--------|
| 🔴 **#1** | **Stress Level** | **27.2%** | Strongest single predictor |
| 🟠 **#2** | **Sleep Duration** | **21.2%** | Direct hours of sleep |
| 🟡 #3 | Heart Rate | 13.4% | Cardiovascular health signal |
| 🟡 #4 | Age | 10.0% | Demographic factor |
| 🟢 #5 | Occupation | 5.2% | Affects schedule & stress |
| 🟢 #6 | Daily Steps | 5.1% | Physical activity proxy |
| ⚪ #7 | BMI Category | 4.0% | Body composition |
| ⚪ #8 | Physical Activity | 3.6% | Exercise minutes |
| ⚪ #9 | Diastolic BP | 3.5% | Blood pressure |
| ⚪ #10 | Systolic BP | 3.2% | Blood pressure |
| ⚪ #11 | Sleep Disorder | 2.8% | Diagnosed condition |
| ⚪ #12 | Gender | 0.8% | Least predictive |

> [!TIP]
> **Stress Level + Sleep Duration together account for ~48% of the model's decision.** Reducing stress and getting consistent sleep are the two most impactful changes a person can make.

---

## 🖥️ Web Application Pages

The frontend is a **Single-Page Application** built with Next.js using React state for tab navigation — no page reloads, instant transitions.

### 📄 Page 1 — Home (Landing)
- Hero section with animated title and tagline
- Big yellow **"Predict Sleep Quality"** CTA button
- Stats cards: **4 Models** · **374 Records** · **98.7% Accuracy**
- Overview of all 12 input features
- Explanation of Good / Average / Poor classes

### 📄 Page 2 — Prediction Form
- **Personal Info:** Gender, Age (slider), Occupation
- **Sleep Info:** Sleep Duration, Quality Rating, Physical Activity, Stress Level
- **Health Vitals:** BMI, Blood Pressure, Heart Rate, Daily Steps, Sleep Disorder
- **One-click Presets:**
  - ⚡ Tech Worker (High Stress)
  - 🏃 Healthy Athlete
  - 🩺 Shift Nurse (Sleep Apnea)
  - ⚠️ Sedentary Overweight
- Model selector dropdown (Random Forest default)

### 📄 Page 3 — Prediction Result
- Large color-coded badge: **GOOD** / **AVERAGE** / **POOR**
- Confidence percentage meter (e.g. 94.5%)
- Probability bars for all 3 classes
- Key Contributing Factors table (positive / negative / neutral)
- Personalized AI Recommendations panel
- Medical disclaimer notice

### 📄 Page 4 — Model Comparison
- Accuracy cards for all 4 models
- Visual bar chart comparing performance
- Metrics table (Accuracy, F1, Precision, Recall)
- Interactive Confusion Matrix viewer per model

### 📄 Page 5 — Dashboard
- Live overview: Predicted Quality, Sleep Duration, Stress, BMI
- Full prediction history table (last 50 predictions)
- Export to JSON button
- Clear History button

---

## 🔌 REST API Reference

> **Base URL:** `http://localhost:5000`

### `GET /api/health`
```json
{ "status": "healthy", "service": "Sleep Quality Predictor API" }
```

### `GET /api/stats`
Returns dataset info, supported occupations, BMI categories, and more.

### `GET /api/models`
Returns trained model metrics and confusion matrices for all 4 models.

### `POST /api/predict`

**Request:**
```json
{
  "gender": "Male",
  "age": 28,
  "occupation": "Software Engineer",
  "sleep_duration": 6.5,
  "quality_of_sleep": 6,
  "physical_activity_level": 40,
  "stress_level": 7,
  "bmi_category": "Normal",
  "systolic_bp": 122,
  "diastolic_bp": 82,
  "heart_rate": 74,
  "daily_steps": 6500,
  "sleep_disorder": "None",
  "model_name": "Random Forest"
}
```

**Response:**
```json
{
  "predicted_quality": "Average",
  "confidence": 94.5,
  "probabilities": { "Good": 0.12, "Average": 0.83, "Poor": 0.05 },
  "model_used": "Random Forest",
  "tips": [
    "Increase moderate daytime physical activity to enhance deep sleep quality.",
    "Maintain a strict sleep-wake schedule, even on weekends."
  ],
  "contributing_factors": [
    { "feature": "Stress Level", "val": "7 / 10", "impact": "Negative" },
    { "feature": "Sleep Duration", "val": "6.5 hrs", "impact": "Negative" }
  ],
  "disclaimer": "This is not a medical diagnosis..."
}
```

### `GET /api/history`
Returns the last 50 predictions stored locally.

### `DELETE /api/history`
Clears all prediction history.

---

## 📁 Project Structure

```
ML2/
│
├── 📄 app.py                              ← Flask REST API server
├── 📄 ml_engine.py                        ← ML engine (train + predict)
├── 📄 sleep_quality_predictor.py          ← Original reference script
├── 📄 requirements.txt                    ← Python dependencies
├── 📄 Sleep_health_and_lifestyle_dataset.csv  ← Dataset (374 records)
│
├── 📂 ml_artifacts/                       ← Serialized model files
│   ├── models.pkl                         ← 4 trained classifiers
│   ├── scaler.pkl                         ← StandardScaler
│   ├── label_encoders.pkl                 ← Category encoders
│   ├── target_encoder.pkl                 ← Output label decoder
│   ├── metrics.json                       ← Accuracy, F1, etc.
│   └── history.json                       ← Prediction history log
│
└── 📂 frontend/                           ← Next.js Web Application
    ├── package.json
    ├── next.config.mjs
    └── src/
        ├── app/
        │   ├── layout.js                  ← Root HTML + metadata
        │   ├── page.js                    ← Main SPA (state + routing)
        │   └── globals.css                ← Black & Yellow design system
        ├── components/
        │   ├── Navbar.js                  ← Navigation + API status
        │   ├── Footer.js                  ← Footer + disclaimer
        │   ├── HomeView.js                ← Landing hero page
        │   ├── PredictView.js             ← Input form + presets
        │   ├── ResultView.js              ← Prediction result display
        │   ├── ComparisonView.js          ← Model comparison charts
        │   └── DashboardView.js           ← History + analytics
        └── lib/
            └── mlClient.js               ← API bridge + offline fallback
```

---

## 🚀 How To Run

### Prerequisites

| Tool | Required Version |
|------|-----------------|
| Python | 3.10 or higher |
| Node.js | 18 or higher |
| npm | 9 or higher |

### Step 1 — Install Python Dependencies

```bash
pip install -r requirements.txt
```

### Step 2 — Train ML Models *(first time only)*

```bash
python ml_engine.py
```

This reads the CSV, trains all 4 models, and saves the artifacts into `ml_artifacts/`. Takes ~5–10 seconds.

### Step 3 — Start the Backend API

```bash
python app.py
```

> ✅ API running at **http://localhost:5000**

### Step 4 — Install Frontend Dependencies *(first time only)*

```bash
cd frontend
npm install
```

### Step 5 — Start the Frontend

```bash
npm run dev
```

> ✅ App running at **http://localhost:3000**

### User Flow

```
Open http://localhost:3000
         │
         ▼
    [HOME]  ──► Click "Predict Sleep Quality"
         │
         ▼
    [PREDICT]  ──► Fill the form (or use a preset)  ──► Click "Predict"
         │
         ▼ (0.8s processing animation)
    [RESULT]  ──► See GOOD / AVERAGE / POOR + confidence + tips
         │
         ├──► [PREDICT AGAIN]
         └──► [VIEW MODELS]  ──► Bar charts, confusion matrices
                                        │
                                        ▼
                                  [DASHBOARD]  ──► History table, export
```

---

## 🧠 Technical Decisions Explained

| Decision | Why We Made It |
|----------|---------------|
| **Random Forest as default** | Highest accuracy (98.67%) with the best balanced F1 across all 3 classes |
| **Client-side JS fallback** | If the Python API is offline, the frontend runs a rule-based JS engine — the app never fully breaks |
| **Blood Pressure splitting** | The dataset stores BP as a string `"125/80"`. We split it into `systolic_bp` and `diastolic_bp` for numerical processing |
| **StandardScaler** | SVM and Logistic Regression are scale-sensitive. Without normalization, large-range features (steps: 10,000) dominate small ones (stress: 1–10) |
| **LabelEncoder over OneHotEncoder** | Keeps the feature count at 12 instead of 30+. Works well with tree-based models and avoids high dimensionality |
| **Stratified split** | With only 5 "Poor" samples, random splitting might leave 0 in the test set. Stratification ensures proportional representation |
| **Vanilla CSS** | Gives full control over the premium black-and-yellow aesthetic. No Tailwind class conflicts or framework overhead |
| **SPA navigation** | React state-based tab switching gives instant, fluid page transitions vs Next.js file-based routing |

---

## ⚠️ Limitations & Disclaimer

### Dataset Limitations

- 📉 **Small dataset** — Only 374 records. Real production systems use millions of samples
- ❗ **Severe class imbalance** — Only 5 "Poor" records (1.3%). Model barely knows what poor sleep looks like
- 🧾 **Self-reported data** — Stress, quality, and activity levels are subjective
- 📅 **No time-series data** — Each record is a single snapshot, not a trend over time
- 🌍 **Unknown demographics** — Population origin and diversity are unspecified

### Model Limitations

- 📊 **High accuracy can mislead** — 98.7% is partly because Average vs Good dominate (no hard cases)
- ❌ **"Poor" class is unreliable** — Only 5 training samples makes this prediction untrustworthy
- 🔁 **No cross-validation** — Metrics come from a single 80/20 split, not k-fold validation
- ⚠️ **Potential feature leakage** — `quality_of_sleep` is both used to create the label AND is an input feature

> [!CAUTION]
> **Medical Disclaimer:** This tool is for **academic and informational purposes only**. It is **NOT a medical diagnosis**. The prediction is based on patterns in a 374-record dataset with only 5 "Poor" class instances. Always consult a qualified healthcare professional for sleep health concerns.

---

## 🔮 Future Roadmap

| Priority | Improvement | Description |
|----------|-------------|-------------|
| 🔴 High | **SMOTE Oversampling** | Fix "Poor" class imbalance with synthetic samples |
| 🔴 High | **k-Fold Cross Validation** | More robust evaluation than single 80/20 split |
| 🟡 Medium | **Larger Dataset** | Integrate clinical sleep datasets (MESA, SHHS) |
| 🟡 Medium | **Feature Engineering** | Create interaction features like stress × sleep duration |
| 🟡 Medium | **Time-series Input** | Track multiple nights for trend analysis |
| 🟢 Low | **Deep Learning** | Neural networks for complex pattern detection |
| 🟢 Low | **User Accounts** | Auth system for persistent personal dashboards |
| 🟢 Low | **Wearable Integration** | Connect to Fitbit / Apple Watch for auto-input |
| 🟢 Low | **Mobile App** | React Native companion app |
| 🟢 Low | **PDF Export** | Downloadable sleep quality health reports |

---

## 🛠️ Tech Stack

### 🐍 Backend

| Technology | Role |
|-----------|------|
| **Python 3.11** | Core language |
| **Pandas** | Data loading, cleaning, manipulation |
| **NumPy** | Numerical operations |
| **Scikit-Learn** | ML model training and evaluation |
| **Joblib** | Model serialization (`.pkl` files) |
| **Flask** | Lightweight REST API server |
| **Flask-CORS** | Enables cross-origin requests from the frontend |

### ⚛️ Frontend

| Technology | Role |
|-----------|------|
| **Next.js 16** | React framework (App Router) |
| **React 19** | UI component system |
| **Vanilla CSS** | Custom black & yellow design system |
| **Lucide React** | SVG icon library |
| **Fetch API** | HTTP client for API calls |

---

## 📚 References

1. 📦 **Dataset:** [Kaggle — Sleep Health and Lifestyle Dataset](https://www.kaggle.com/datasets/uom190346a/sleep-health-and-lifestyle-dataset)
2. 📖 **Scikit-Learn Docs:** [scikit-learn.org](https://scikit-learn.org/stable/)
3. 📖 **Next.js Docs:** [nextjs.org/docs](https://nextjs.org/docs)
4. 📖 **Flask Docs:** [flask.palletsprojects.com](https://flask.palletsprojects.com/)
5. 📄 **Random Forest:** Breiman, L. (2001). *Random Forests. Machine Learning*, 45(1), 5–32.

---

<div align="center">

Built with 🌙 passion for **AI/ML & Health Technology**

*Sleep Quality Predictor — Akash · 2026*

⭐ If you found this useful, consider starring the repository!

</div>