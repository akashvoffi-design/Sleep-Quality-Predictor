# 🌙 Sleep Quality Predictor — AI/ML Web Application

### Full Project Documentation

---

> **Project Title:** Sleep Quality Prediction System  
> **Domain:** Machine Learning · Health Analytics · Web Development  
> **Stack:** Python (Scikit-Learn, Flask) + Next.js (React)  
> **Date:** August 2026  
> **Author:** Akash  

---

## 📌 Table of Contents

1. [Project Overview](#-project-overview)
2. [Problem Statement](#-problem-statement)
3. [Dataset Description](#-dataset-description)
4. [System Architecture](#-system-architecture)
5. [Machine Learning Pipeline](#-machine-learning-pipeline)
6. [Model Comparison & Results](#-model-comparison--results)
7. [Feature Importance Analysis](#-feature-importance-analysis)
8. [Web Application — Frontend](#-web-application--frontend)
9. [REST API — Backend](#-rest-api--backend)
10. [Project File Structure](#-project-file-structure)
11. [How to Run the Project](#-how-to-run-the-project)
12. [Screenshots & UI Pages](#-screenshots--ui-pages)
13. [Key Technical Decisions](#-key-technical-decisions)
14. [Limitations & Disclaimer](#-limitations--disclaimer)
15. [Future Improvements](#-future-improvements)
16. [Technologies Used](#-technologies-used)
17. [References](#-references)

---

## 🔍 Project Overview

The **Sleep Quality Predictor** is a full-stack AI/ML web application that analyzes a user's lifestyle, health, and sleep pattern data to predict their **sleep quality** as one of three classes:

| Class | Criteria | Color Code |
|-------|----------|------------|
| **Good** | Quality of Sleep score ≥ 8 | 🟢 `#10B981` |
| **Average** | Quality of Sleep score 5 – 7 | 🟡 `#F59E0B` |
| **Poor** | Quality of Sleep score < 5 | 🔴 `#EF4444` |

The system trains **four supervised machine learning models**, compares their performance, and serves real-time predictions through a modern **black-and-yellow themed AI dashboard** built in Next.js.

---

## 🎯 Problem Statement

Sleep is one of the most critical factors affecting human health, productivity, and well-being. Yet many individuals are unable to objectively assess how their daily habits — stress, exercise, BMI, heart rate — influence their sleep quality.

**Objective:**  
Build a machine learning classification system that can:

1. Accept 12 lifestyle & health input features from a user
2. Predict whether their sleep quality is **Good**, **Average**, or **Poor**
3. Display the prediction with confidence scores, contributing factors, and actionable recommendations
4. Compare multiple ML algorithms and highlight the best performer
5. Present everything through a premium, responsive web dashboard

---

## 📊 Dataset Description

**Source:** [Kaggle — Sleep Health and Lifestyle Dataset](https://www.kaggle.com/datasets/uom190346a/sleep-health-and-lifestyle-dataset)

| Property | Value |
|----------|-------|
| **Total Records** | 374 |
| **Total Columns** | 13 (including Person ID) |
| **Usable Features** | 12 (after dropping Person ID) |
| **Target Variable** | `Quality of Sleep` → bucketed into Good / Average / Poor |
| **Missing Values** | `Sleep Disorder` column: 219 NaN values (filled as `"None"`) |
| **File Name** | `Sleep_health_and_lifestyle_dataset.csv` |

### 📋 Feature Descriptions

| # | Feature | Type | Range / Values | Description |
|---|---------|------|----------------|-------------|
| 1 | **Gender** | Categorical | Male, Female | Biological gender of the individual |
| 2 | **Age** | Numerical | 27 – 59 | Age in years |
| 3 | **Occupation** | Categorical | 11 unique jobs | Professional occupation |
| 4 | **Sleep Duration** | Numerical (float) | 5.8 – 8.5 hrs | Average nightly sleep in hours |
| 5 | **Quality of Sleep** | Numerical (int) | 1 – 10 | Self-rated quality score (used to create the target label) |
| 6 | **Physical Activity Level** | Numerical (int) | 30 – 90 min/day | Minutes of daily physical activity |
| 7 | **Stress Level** | Numerical (int) | 3 – 8 | Self-reported stress on a 1–10 scale |
| 8 | **BMI Category** | Categorical | Normal, Normal Weight, Overweight, Obese | Body Mass Index classification |
| 9 | **Blood Pressure** | String → split | e.g. "125/80" | Systolic/Diastolic (split into 2 features) |
| 10 | **Heart Rate** | Numerical (int) | 65 – 86 bpm | Resting heart rate in beats per minute |
| 11 | **Daily Steps** | Numerical (int) | 3,000 – 10,000 | Average daily step count |
| 12 | **Sleep Disorder** | Categorical | None, Insomnia, Sleep Apnea | Diagnosed sleep disorder status |

### 📈 Target Class Distribution

| Class | Count | Percentage |
|-------|-------|------------|
| **Average** | 189 | 50.5% |
| **Good** | 180 | 48.1% |
| **Poor** | 5 | **1.3%** ⚠️ |

> ⚠️ **Class Imbalance Notice:** The "Poor" class has only **5 records** out of 374. This is a significant imbalance and means the model has very limited data to learn "Poor" sleep patterns. Predictions for this class should be interpreted with caution.

### 🔧 Data Preprocessing Steps

1. **Column Name Cleaning** — Stripped whitespace, replaced spaces with underscores, converted to lowercase
2. **Sleep Disorder NaN Handling** — Filled 219 missing values with `"None"` (not truly missing data; means no disorder)
3. **Person ID Removal** — Dropped the `person_id` column (no predictive signal)
4. **Blood Pressure Splitting** — Split the string `"125/80"` into two numerical features: `systolic_bp` and `diastolic_bp`
5. **Target Label Creation** — Applied the `bucket_quality()` function on `quality_of_sleep`:
   - Score ≥ 8 → **Good**
   - Score 5–7 → **Average**
   - Score < 5 → **Poor**
6. **Categorical Encoding** — Used `LabelEncoder` on: `gender`, `occupation`, `bmi_category`, `sleep_disorder`
7. **Target Encoding** — Used `LabelEncoder` on the target: Average=0, Good=1, Poor=2
8. **Feature Scaling** — Applied `StandardScaler` (zero mean, unit variance) to all 12 features

---

## 🏗️ System Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                        USER (Web Browser)                        │
│                      http://localhost:3000                        │
└──────────────────────────┬───────────────────────────────────────┘
                           │ HTTP Requests (JSON)
                           ▼
┌──────────────────────────────────────────────────────────────────┐
│                    NEXT.JS FRONTEND (React)                      │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────┐ ┌─────────┐ │
│  │  Home    │ │ Predict  │ │  Result  │ │ Models │ │Dashboard│ │
│  │  View    │ │  View    │ │  View    │ │Compare │ │ & Hist  │ │
│  └──────────┘ └──────────┘ └──────────┘ └────────┘ └─────────┘ │
│                    mlClient.js (API Bridge)                       │
└──────────────────────────┬───────────────────────────────────────┘
                           │ REST API Calls (fetch)
                           ▼
┌──────────────────────────────────────────────────────────────────┐
│                   FLASK REST API (app.py)                         │
│     Port 5000 · CORS Enabled · JSON Responses                    │
│  ┌────────────┐ ┌────────────┐ ┌──────────┐ ┌───────────────┐  │
│  │ /api/health│ │/api/predict│ │/api/stats│ │ /api/models   │  │
│  └────────────┘ └─────┬──────┘ └──────────┘ └───────────────┘  │
└───────────────────────┬──────────────────────────────────────────┘
                        │ Calls engine.predict()
                        ▼
┌──────────────────────────────────────────────────────────────────┐
│                 ML ENGINE (ml_engine.py)                          │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  SleepQualityMLEngine Class                                │  │
│  │  • train_and_save()  → Trains 4 models, saves .pkl files  │  │
│  │  • load_artifacts()  → Loads pre-trained model artifacts   │  │
│  │  • predict()         → Encodes, scales, infers, returns    │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                   │
│  Serialized Artifacts (ml_artifacts/):                            │
│  ├── models.pkl             (4 trained classifiers)              │
│  ├── scaler.pkl             (StandardScaler instance)            │
│  ├── label_encoders.pkl     (LabelEncoders for 4 cat columns)   │
│  ├── target_encoder.pkl     (LabelEncoder for target labels)    │
│  └── metrics.json           (Accuracy, F1, Precision, Recall)   │
└──────────────────────────────────────────────────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────────────────────────┐
│               KAGGLE DATASET (.csv)                              │
│         Sleep_health_and_lifestyle_dataset.csv                   │
│                   374 records × 13 columns                       │
└──────────────────────────────────────────────────────────────────┘
```

---

## 🤖 Machine Learning Pipeline

### Step-by-Step Workflow

```
Raw CSV Data
    │
    ▼
[1] Load & Clean Columns
    │
    ▼
[2] Handle Missing Values (Sleep Disorder NaN → "None")
    │
    ▼
[3] Drop Person ID Column
    │
    ▼
[4] Create Target Label (bucket_quality: Good / Average / Poor)
    │
    ▼
[5] Split Blood Pressure → systolic_bp + diastolic_bp
    │
    ▼
[6] Select 12 Features
    │
    ▼
[7] Encode Categorical Features (LabelEncoder × 4)
    │
    ▼
[8] Encode Target Labels (LabelEncoder × 1)
    │
    ▼
[9] Train/Test Split (80% train, 20% test, stratified, random_state=42)
    │
    ▼
[10] Feature Scaling (StandardScaler — fit on train, transform both)
    │
    ▼
[11] Train 4 Models
    │
    ▼
[12] Evaluate (Accuracy, F1, Precision, Recall, Confusion Matrix)
    │
    ▼
[13] Save Artifacts (.pkl files + metrics.json)
    │
    ▼
[14] Prediction Function (encode → scale → predict → decode → tips)
```

### Models Trained

| # | Algorithm | Scikit-Learn Class | Key Hyperparameters |
|---|-----------|-------------------|---------------------|
| 1 | **Logistic Regression** | `LogisticRegression` | `max_iter=1000, random_state=42` |
| 2 | **Decision Tree** | `DecisionTreeClassifier` | `max_depth=6, random_state=42` |
| 3 | **Random Forest** | `RandomForestClassifier` | `n_estimators=200, random_state=42` |
| 4 | **SVM** | `SVC` | `kernel="rbf", probability=True, random_state=42` |

---

## 📈 Model Comparison & Results

### Accuracy & Performance Metrics

| Model | Accuracy | F1 Score (Weighted) | Precision (Weighted) | Recall (Weighted) | Rank |
|-------|----------|---------------------|----------------------|-------------------|------|
| **🏆 Random Forest** | **98.67%** | **98.67%** | **98.70%** | **98.67%** | **#1** |
| Decision Tree | 97.33% | 97.53% | 98.04% | 97.33% | #2 |
| SVM | 97.33% | 96.68% | 96.04% | 97.33% | #3 |
| Logistic Regression | 96.00% | 95.34% | 94.77% | 96.00% | #4 |

### Confusion Matrices (from actual trained model on test set)

**Random Forest (Best Model):**
```
                Predicted
              Average  Good  Poor
Actual  Average  [37]     1     0
        Good       0    [36]    0
        Poor       0      0   [1]
```
> Only **1 misclassification** in the entire test set (1 Average predicted as Good).

**Decision Tree:**
```
                Predicted
              Average  Good  Poor
Actual  Average  [36]     1     1
        Good       0    [36]    0
        Poor       0      0   [1]
```

**SVM:**
```
                Predicted
              Average  Good  Poor
Actual  Average  [37]     1     0
        Good       0    [36]    0
        Poor       1      0   [0]
```

**Logistic Regression:**
```
                Predicted
              Average  Good  Poor
Actual  Average  [36]     2     0
        Good       0    [36]    0
        Poor       1      0   [0]
```

---

## 🔬 Feature Importance Analysis

Feature importances from the **Random Forest** model (the best performer):

| Rank | Feature | Importance Score | Interpretation |
|------|---------|-----------------|----------------|
| 1 | **Stress Level** | 0.2719 (27.2%) | 🔴 Strongest single predictor of sleep quality |
| 2 | **Sleep Duration** | 0.2122 (21.2%) | ⭐ Second most critical — hours of actual sleep |
| 3 | **Heart Rate** | 0.1344 (13.4%) | Cardiovascular health indicator |
| 4 | **Age** | 0.1002 (10.0%) | Demographic factor |
| 5 | **Occupation** | 0.0516 (5.2%) | Job type affects stress and schedule |
| 6 | **Daily Steps** | 0.0506 (5.1%) | Proxy for overall physical activity |
| 7 | **BMI Category** | 0.0396 (4.0%) | Body composition signal |
| 8 | **Physical Activity Level** | 0.0361 (3.6%) | Minutes of exercise per day |
| 9 | **Diastolic BP** | 0.0352 (3.5%) | Blood pressure component |
| 10 | **Systolic BP** | 0.0319 (3.2%) | Blood pressure component |
| 11 | **Sleep Disorder** | 0.0283 (2.8%) | Diagnosed conditions |
| 12 | **Gender** | 0.0081 (0.8%) | Least predictive feature |

**Key Insight:** `stress_level` + `sleep_duration` together account for **~48%** of the model's decision-making.

---

## 🖥️ Web Application — Frontend

### Technology

| Component | Technology |
|-----------|-----------|
| Framework | **Next.js** (React, App Router, JavaScript) |
| Styling | **Vanilla CSS** (custom design system) |
| Icons | **Lucide React** (modern open-source icon library) |
| State Management | **React useState/useEffect hooks** |
| API Communication | **Fetch API** via custom `mlClient.js` bridge |

### Design System — Black & Yellow Theme

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-primary` | `#08080A` | Main page background |
| `--bg-surface` | `#111115` | Section backgrounds |
| `--bg-card` | `#16161C` | Card components |
| `--accent-yellow` | `#FFD600` | Primary accent, CTAs, highlights |
| `--accent-yellow-hover` | `#FFE500` | Hover states |
| `--text-white` | `#FFFFFF` | Primary headings |
| `--text-gray` | `#A1A1AA` | Secondary text |
| `--text-muted` | `#71717A` | Labels, captions |
| `--border-subtle` | `#27272A` | Card borders |
| `--color-good` | `#10B981` | Good prediction badge |
| `--color-average` | `#F59E0B` | Average prediction badge |
| `--color-poor` | `#EF4444` | Poor prediction badge |

### 5 Application Pages / Views

#### Page 1 — Home (Landing)
- Hero section with project title and tagline
- "Predict Sleep Quality" primary yellow CTA button
- Three statistics cards: **4 ML Models** · **374 Dataset Records** · **~98.7% RF Accuracy**
- "How The AI Model Works" explanation card listing all 12 features
- "3 Target Sleep Quality Levels" card showing Good / Average / Poor thresholds

#### Page 2 — Prediction Input Form
- Three input sections organized in a responsive grid:
  - **Personal Information:** Gender (dropdown), Age (slider), Occupation (dropdown)
  - **Sleep Information:** Sleep Duration (slider), Quality Rating (slider), Physical Activity (slider), Stress Level (slider)
  - **Health & Vitals:** BMI Category (dropdown), Systolic BP (number), Diastolic BP (number), Heart Rate (number), Daily Steps (number), Sleep Disorder (dropdown)
- **Quick Scenario Presets** — One-click auto-fill buttons:
  - ⚡ Tech Worker (High Stress)
  - 🏃 Healthy Athlete
  - 🩺 Shift Nurse (Sleep Apnea)
  - ⚠️ Sedentary Overweight
- Model Selection dropdown (Random Forest default)
- Yellow "Predict Sleep Quality" submit button + "Reset Form" secondary button

#### Page 3 — Prediction Result
- Large prediction badge: **GOOD**, **AVERAGE**, or **POOR** with color-coded icon
- Model confidence percentage bar (e.g. 98.7%)
- Class probability distribution bars (Good %, Average %, Poor %)
- Key Contributing Factors table (feature → value → Positive/Negative/Neutral impact)
- AI Recommendations panel with actionable tips
- Medical disclaimer notice

#### Page 4 — Model Comparison
- 4 model accuracy cards (Random Forest highlighted as "BEST MODEL" with yellow crown badge)
- Comparative accuracy bar chart with visual progress bars
- Detailed metrics comparison table (Accuracy, F1, Precision, Recall)
- Interactive Confusion Matrix visualizer with model selector buttons

#### Page 5 — User Dashboard
- Latest sleep overview widgets: Predicted Quality, Sleep Duration, Stress Level, BMI Category
- Prediction History table with columns: Date, Sleep Quality, Model Used, Confidence, Duration, Stress, Status
- Export to JSON button
- Clear History button

### Reusable UI Components

| Component File | Purpose |
|---------------|---------|
| `Navbar.js` | Top navigation bar with page tabs and API status indicator |
| `Footer.js` | Footer with project info, ML specs, and medical disclaimer |
| `HomeView.js` | Landing page hero section and feature overview |
| `PredictView.js` | Full prediction input form with validation and presets |
| `ResultView.js` | Prediction result display with probabilities and recommendations |
| `ComparisonView.js` | Model comparison charts, table, and confusion matrix viewer |
| `DashboardView.js` | User analytics dashboard with prediction history |

---

## 🔌 REST API — Backend

### Server Details

| Property | Value |
|----------|-------|
| Framework | **Flask** (Python) |
| CORS | Enabled via `flask_cors` |
| Host | `0.0.0.0` |
| Port | `5000` |
| Response Format | JSON |

### API Endpoints

#### `GET /api/health`
Returns server health status.
```json
{
  "status": "healthy",
  "service": "Sleep Quality Predictor API"
}
```

#### `GET /api/stats`
Returns dataset and system statistics.
```json
{
  "dataset_records": 374,
  "model_count": 4,
  "best_model": "Random Forest",
  "best_accuracy": "98.7%",
  "features_count": 12,
  "occupations": ["Software Engineer", "Doctor", "Sales Representative", "Teacher",
                   "Nurse", "Engineer", "Accountant", "Scientist", "Lawyer",
                   "Salesperson", "Manager"],
  "bmi_categories": ["Normal", "Normal Weight", "Overweight", "Obese"],
  "sleep_disorders": ["None", "Insomnia", "Sleep Apnea"],
  "genders": ["Male", "Female"]
}
```

#### `GET /api/models`
Returns trained model performance metrics and confusion matrices.

#### `POST /api/predict`
Accepts user input JSON, runs inference, returns prediction.

**Request Body Example:**
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

**Response Example:**
```json
{
  "predicted_quality": "Average",
  "confidence": 94.5,
  "probabilities": { "Good": 0.12, "Average": 0.83, "Poor": 0.05 },
  "model_used": "Random Forest",
  "tips": [
    "Increase moderate daytime physical activity to enhance deep sleep quality.",
    "Maintain a strict sleep-wake schedule, even on weekends.",
    "Keep bedroom ambient temperature cool and dark."
  ],
  "contributing_factors": [
    { "feature": "Sleep Duration", "val": "6.5 hrs", "impact": "Negative" },
    { "feature": "Stress Level", "val": "7 / 10", "impact": "Negative" }
  ],
  "disclaimer": "This prediction is based on machine-learning patterns..."
}
```

#### `GET /api/history`
Returns stored prediction history (last 50 entries).

#### `DELETE /api/history`
Clears all prediction history.

---

## 📁 Project File Structure

```
ML2/
│
├── Sleep_health_and_lifestyle_dataset.csv    # Kaggle dataset (374 records)
├── sleep_quality_predictor.py                # Original reference ML script
├── ml_engine.py                              # Production ML engine class
├── app.py                                    # Flask REST API server
│
├── ml_artifacts/                             # Serialized model files
│   ├── models.pkl                            # 4 trained classifiers (~433 KB)
│   ├── scaler.pkl                            # StandardScaler instance
│   ├── label_encoders.pkl                    # LabelEncoders for categorical columns
│   ├── target_encoder.pkl                    # LabelEncoder for target labels
│   ├── metrics.json                          # Model performance metrics
│   └── history.json                          # Prediction history log
│
├── archive (1)/                              # Original Kaggle download
│   └── Sleep_health_and_lifestyle_dataset.csv
│
└── frontend/                                 # Next.js Web Application
    ├── package.json                          # Node.js dependencies
    ├── next.config.mjs                       # Next.js configuration
    ├── public/                               # Static assets
    └── src/
        ├── app/
        │   ├── layout.js                     # Root HTML layout + metadata
        │   ├── page.js                       # Main SPA page (state + routing)
        │   └── globals.css                   # Design system (Black & Yellow theme)
        ├── components/
        │   ├── Navbar.js                     # Navigation header + API status
        │   ├── Footer.js                     # Footer with disclaimer
        │   ├── HomeView.js                   # Landing / Hero page
        │   ├── PredictView.js                # Prediction input form
        │   ├── ResultView.js                 # Prediction result display
        │   ├── ComparisonView.js             # Model comparison & charts
        │   └── DashboardView.js              # User dashboard & history
        └── lib/
            └── mlClient.js                   # API bridge + offline fallback
```

---

## 🚀 How to Run the Project

### Prerequisites

| Requirement | Version |
|------------|---------|
| Python | 3.10+ |
| Node.js | 18+ |
| npm | 9+ |

### Python Dependencies

```
pandas
numpy
scikit-learn
joblib
flask
flask-cors
```

Install with:
```bash
pip install pandas numpy scikit-learn joblib flask flask-cors
```

### Step 1 — Train the ML Models (first time only)

```bash
cd ML2
python ml_engine.py
```

This reads the CSV, trains 4 models, and saves artifacts into `ml_artifacts/`.

### Step 2 — Start the Python Backend API

```bash
python app.py
```

The server starts on **http://127.0.0.1:5000**.

### Step 3 — Install Frontend Dependencies (first time only)

```bash
cd frontend
npm install
```

### Step 4 — Start the Next.js Frontend

```bash
npm run dev
```

The web app starts on **http://localhost:3000**.

### Step 5 — Open the Application

Open your browser and navigate to:

```
http://localhost:3000
```

---

## 🖼️ Screenshots & UI Pages

### Page Layout Summary

| Page | Tab Label | Description |
|------|-----------|-------------|
| 1 | **Home** | Hero landing with statistics and ML overview |
| 2 | **Predict Sleep** | Interactive form with sliders, dropdowns, and presets |
| 3 | **Result View** | Prediction result with confidence meter and recommendations |
| 4 | **Model Specs** | 4-model comparison with bar charts and confusion matrices |
| 5 | **Dashboard** | Overview widgets and prediction history table |

### User Flow

```
User Opens App
      │
      ▼
  [HOME PAGE]
  Reads overview, clicks "Predict Sleep Quality"
      │
      ▼
  [PREDICT PAGE]
  Fills form OR clicks a preset → clicks "Predict Sleep Quality"
      │
      ▼
  [Loading State]  (0.8s processing animation)
      │
      ▼
  [RESULT PAGE]
  Sees prediction (GOOD/AVERAGE/POOR), confidence, factors, tips
      │
      ├──→ [PREDICT AGAIN] → back to form
      └──→ [VIEW MODELS]  → model comparison page
                               │
                               ▼
                         [MODEL COMPARISON]
                         Bar charts, table, confusion matrices
                               │
                               ▼
                          [DASHBOARD]
                          History table, export, clear
```

---

## 🧠 Key Technical Decisions

| Decision | Rationale |
|----------|-----------|
| **Random Forest as default model** | Achieved highest accuracy (98.67%) and best balanced F1 score |
| **Client-side ML fallback** | If Python server is offline, the frontend uses a JavaScript rule-based engine mirroring the model's decision boundaries so the app never fails |
| **Blood Pressure split** | Original dataset stores BP as a string `"125/80"`. Split into `systolic_bp` and `diastolic_bp` for numerical model input |
| **StandardScaler** | ML algorithms like SVM and Logistic Regression are sensitive to feature scales. StandardScaler normalizes all features to zero mean and unit variance |
| **LabelEncoder** | Used instead of OneHotEncoder to keep the feature space small (12 features instead of 30+), which works well with tree-based models |
| **Stratified train/test split** | With only 5 "Poor" records, stratification ensures at least 1 Poor sample appears in the test set |
| **80/20 split** | Standard split ratio. Results in ~299 train and ~75 test records |
| **Vanilla CSS** | Avoided CSS frameworks for full control over the premium black-and-yellow AI dashboard aesthetic |
| **SPA navigation** | Used React state-based tab switching instead of Next.js file-based routing for a smoother, faster single-page experience |

---

## ⚠️ Limitations & Disclaimer

### Dataset Limitations

1. **Small dataset** — Only 374 records. Production ML systems typically need thousands or millions of samples
2. **Severe class imbalance** — Only **5 "Poor"** records (1.3%). The model has very limited exposure to poor sleep patterns
3. **Self-reported data** — Quality of Sleep, Stress Level, and Physical Activity are self-reported, introducing subjectivity bias
4. **Limited demographic range** — Ages 27–59 only; no children, teens, or elderly individuals
5. **No temporal data** — No time series or longitudinal tracking; each record is a snapshot
6. **Geographic bias** — Dataset origin and population demographics are not specified

### Model Limitations

1. **High accuracy may be misleading** — The ~98.7% accuracy is partly due to the near-binary class distribution (Average vs Good dominate)
2. **Poor class unreliable** — With only 5 training samples for "Poor", the model cannot reliably identify genuinely poor sleep
3. **No cross-validation reported** — The final metrics are from a single 80/20 split, not k-fold cross-validation
4. **Feature leakage risk** — `quality_of_sleep` is used to create the target label AND could correlate directly with it

### Medical Disclaimer

> ⚠️ **This prediction is based on machine-learning patterns in the provided dataset (374 records, with only 5 "Poor" class instances) and is intended strictly for informational and academic demonstration purposes. It is NOT a medical diagnosis. Always consult a qualified healthcare professional for sleep-related health concerns.**

---

## 🔮 Future Improvements

| Improvement | Description |
|-------------|-------------|
| **Larger dataset** | Incorporate more diverse, clinical-grade sleep datasets (e.g., MESA, SHHS) |
| **Deep learning** | Experiment with neural networks for pattern detection |
| **Cross-validation** | Implement k-fold cross-validation for more robust evaluation |
| **SMOTE oversampling** | Address "Poor" class imbalance with Synthetic Minority Oversampling |
| **Feature engineering** | Create interaction features (e.g., stress × sleep duration) |
| **Time-series input** | Accept multiple nights of sleep data for trend analysis |
| **User accounts** | Add authentication for persistent personal dashboards |
| **Mobile app** | Build a React Native companion app |
| **Wearable integration** | Connect to Fitbit/Apple Watch for automated data input |
| **PDF export** | Generate downloadable sleep quality reports |

---

## 🛠️ Technologies Used

### Backend

| Technology | Purpose |
|-----------|---------|
| **Python 3.11** | Core programming language |
| **Pandas** | Data loading, cleaning, and manipulation |
| **NumPy** | Numerical computations |
| **Scikit-Learn** | Machine learning model training and evaluation |
| **Joblib** | Model serialization (.pkl files) |
| **Flask** | Lightweight REST API web server |
| **Flask-CORS** | Cross-Origin Resource Sharing for API access |

### Frontend

| Technology | Purpose |
|-----------|---------|
| **Next.js 16** | React framework with App Router |
| **React 19** | UI component library |
| **Vanilla CSS** | Custom black & yellow design system |
| **Lucide React** | Premium SVG icon library |
| **Fetch API** | HTTP client for REST API communication |

### Development Tools

| Tool | Purpose |
|------|---------|
| **npm** | Package management |
| **Node.js v24** | JavaScript runtime |
| **VS Code** | Code editor |

---

## 📚 References

1. **Dataset:** [Kaggle — Sleep Health and Lifestyle Dataset](https://www.kaggle.com/datasets/uom190346a/sleep-health-and-lifestyle-dataset)
2. **Scikit-Learn Documentation:** [https://scikit-learn.org/stable/](https://scikit-learn.org/stable/)
3. **Next.js Documentation:** [https://nextjs.org/docs](https://nextjs.org/docs)
4. **Flask Documentation:** [https://flask.palletsprojects.com/](https://flask.palletsprojects.com/)
5. **Random Forest Classifier:** Breiman, L. (2001). Random Forests. *Machine Learning*, 45(1), 5–32.

---

<div align="center">

**Built with 🌙 for AI/ML Academic Project Demonstration**

*Sleep Quality Predictor System — 2026*

</div>
#   S l e e p - Q u a l i t y - P r e d i c t o r  
 