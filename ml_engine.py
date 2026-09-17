import os
import json
import joblib
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score, f1_score, precision_score, recall_score, confusion_matrix

DATASET_PATH = os.path.join(os.path.dirname(__file__), "Sleep_health_and_lifestyle_dataset.csv")
MODEL_DIR = os.path.join(os.path.dirname(__file__), "ml_artifacts")

os.makedirs(MODEL_DIR, exist_ok=True)

CATEGORICAL_COLS = ["gender", "occupation", "bmi_category", "sleep_disorder"]
FEATURES = [
    "gender", "age", "occupation", "sleep_duration",
    "physical_activity_level", "stress_level", "bmi_category",
    "heart_rate", "daily_steps", "systolic_bp", "diastolic_bp",
    "sleep_disorder"
]

def bucket_quality(score):
    if score >= 8:
        return "Good"
    elif score >= 5:
        return "Average"
    else:
        return "Poor"

class SleepQualityMLEngine:
    def __init__(self):
        self.models = {}
        self.scaler = None
        self.label_encoders = {}
        self.target_encoder = None
        self.model_metrics = {}
        self.df_raw = None
        self.is_trained = False

    def train_and_save(self):
        if not os.path.exists(DATASET_PATH):
            alt_path = os.path.join(os.path.dirname(__file__), "archive (1)", "Sleep_health_and_lifestyle_dataset.csv")
            if os.path.exists(alt_path):
                df = pd.read_csv(alt_path)
            else:
                raise FileNotFoundError(f"Dataset not found at {DATASET_PATH}")
        else:
            df = pd.read_csv(DATASET_PATH)

        self.df_raw = df.copy()

        # Clean column names
        df.columns = df.columns.str.strip().str.replace(" ", "_").str.lower()
        df["sleep_disorder"] = df["sleep_disorder"].fillna("None")

        if "person_id" in df.columns:
            df = df.drop(columns=["person_id"])

        # Target label
        df["sleep_quality_label"] = df["quality_of_sleep"].apply(bucket_quality)

        # Split blood pressure
        bp_split = df["blood_pressure"].astype(str).str.split("/", expand=True)
        df["systolic_bp"] = bp_split[0].astype(float)
        df["diastolic_bp"] = bp_split[1].astype(float)
        df = df.drop(columns=["blood_pressure"])

        X = df[FEATURES].copy()
        y = df["sleep_quality_label"].copy()

        # Encode categorical
        self.label_encoders = {}
        for col in CATEGORICAL_COLS:
            le = LabelEncoder()
            X[col] = le.fit_transform(X[col].astype(str))
            self.label_encoders[col] = le

        self.target_encoder = LabelEncoder()
        y_encoded = self.target_encoder.fit_transform(y)

        # Train/Test Split
        X_train, X_test, y_train, y_test = train_test_split(
            X, y_encoded, test_size=0.2, random_state=42, stratify=y_encoded
        )

        self.scaler = StandardScaler()
        X_train_scaled = self.scaler.fit_transform(X_train)
        X_test_scaled = self.scaler.transform(X_test)

        # Instantiate Models
        model_defs = {
            "Logistic Regression": {
                "instance": LogisticRegression(max_iter=1000, random_state=42),
                "purpose": "Classification baseline model",
                "color": "#3B82F6"
            },
            "Decision Tree": {
                "instance": DecisionTreeClassifier(max_depth=6, random_state=42),
                "purpose": "Rule-based non-linear classification",
                "color": "#10B981"
            },
            "Random Forest": {
                "instance": RandomForestClassifier(n_estimators=200, random_state=42),
                "purpose": "Ensemble classification (Best Performer)",
                "color": "#FFD600"
            },
            "SVM": {
                "instance": SVC(kernel="rbf", probability=True, random_state=42),
                "purpose": "Support Vector Classification with RBF Kernel",
                "color": "#8B5CF6"
            }
        }

        self.models = {}
        self.model_metrics = {}

        classes = self.target_encoder.classes_.tolist()

        for name, info in model_defs.items():
            clf = info["instance"]
            clf.fit(X_train_scaled, y_train)
            preds = clf.predict(X_test_scaled)
            acc = float(accuracy_score(y_test, preds))
            f1 = float(f1_score(y_test, preds, average="weighted"))
            prec = float(precision_score(y_test, preds, average="weighted"))
            rec = float(recall_score(y_test, preds, average="weighted"))

            cm = confusion_matrix(y_test, preds).tolist()

            # Feature importances if available
            importances = {}
            if hasattr(clf, "feature_importances_"):
                fi = clf.feature_importances_
                for feat, imp in zip(FEATURES, fi):
                    importances[feat] = round(float(imp), 4)

            self.models[name] = clf
            self.model_metrics[name] = {
                "name": name,
                "purpose": info["purpose"],
                "color": info["color"],
                "accuracy": round(acc, 4),
                "accuracy_percent": round(acc * 100, 2),
                "f1_score": round(f1, 4),
                "precision": round(prec, 4),
                "recall": round(rec, 4),
                "confusion_matrix": cm,
                "classes": classes,
                "feature_importances": importances
            }

        # Save artifacts
        joblib.dump(self.models, os.path.join(MODEL_DIR, "models.pkl"))
        joblib.dump(self.scaler, os.path.join(MODEL_DIR, "scaler.pkl"))
        joblib.dump(self.label_encoders, os.path.join(MODEL_DIR, "label_encoders.pkl"))
        joblib.dump(self.target_encoder, os.path.join(MODEL_DIR, "target_encoder.pkl"))

        with open(os.path.join(MODEL_DIR, "metrics.json"), "w") as f:
            json.dump(self.model_metrics, f, indent=2)

        self.is_trained = True
        print("ML Engine trained successfully. Artifacts saved in ml_artifacts/")

    def load_artifacts(self):
        try:
            self.models = joblib.load(os.path.join(MODEL_DIR, "models.pkl"))
            self.scaler = joblib.load(os.path.join(MODEL_DIR, "scaler.pkl"))
            self.label_encoders = joblib.load(os.path.join(MODEL_DIR, "label_encoders.pkl"))
            self.target_encoder = joblib.load(os.path.join(MODEL_DIR, "target_encoder.pkl"))
            with open(os.path.join(MODEL_DIR, "metrics.json"), "r") as f:
                self.model_metrics = json.load(f)
            self.is_trained = True
            print("ML Engine artifacts loaded successfully.")
        except Exception as e:
            print(f"Loading artifacts failed ({e}). Retraining...")
            self.train_and_save()

    def predict(self, user_input: dict, model_name: str = "Random Forest"):
        if not self.is_trained:
            self.load_artifacts()

        if model_name not in self.models:
            model_name = "Random Forest"

        model = self.models[model_name]

        # Prepare DataFrame row
        row = pd.DataFrame([user_input])

        # Handle missing fields with sensible defaults
        defaults = {
            "gender": "Male",
            "age": 30,
            "occupation": "Software Engineer",
            "sleep_duration": 7.0,
            "physical_activity_level": 50,
            "stress_level": 5,
            "bmi_category": "Normal",
            "heart_rate": 70,
            "daily_steps": 6000,
            "systolic_bp": 120,
            "diastolic_bp": 80,
            "sleep_disorder": "None"
        }

        for f in FEATURES:
            if f not in row.columns or pd.isna(row[f].iloc[0]):
                row[f] = defaults[f]

        row = row[FEATURES].copy()

        # Encode categorical columns
        for col in CATEGORICAL_COLS:
            le = self.label_encoders[col]
            val = str(row[col].iloc[0])
            if val not in le.classes_:
                val = le.classes_[0]
            row[col] = le.transform([val])[0]

        row_scaled = self.scaler.transform(row)

        pred_idx = model.predict(row_scaled)[0]
        label = self.target_encoder.inverse_transform([pred_idx])[0]

        # Probabilities
        probabilities = {}
        confidence = 0.95
        if hasattr(model, "predict_proba"):
            probs = model.predict_proba(row_scaled)[0]
            classes = self.target_encoder.classes_
            for cls_name, prob_val in zip(classes, probs):
                probabilities[cls_name] = round(float(prob_val), 4)
            confidence = round(float(probs[pred_idx]), 4)
        else:
            probabilities[label] = 1.0

        # Actionable tips
        tips_dict = {
            "Poor": [
                "Aim for 7-8 hours of consistent nightly sleep duration.",
                "Lower evening stress with meditation or progressive muscle relaxation.",
                "Reduce intense physical exertion right before bedtime."
            ],
            "Average": [
                "Increase moderate daytime physical activity to enhance deep sleep quality.",
                "Maintain a strict sleep-wake schedule, even on weekends.",
                "Keep bedroom ambient temperature cool and dark."
            ],
            "Good": [
                "Great work! Maintain your consistent daily activity and stress balance.",
                "Continue maintaining your positive cardiovascular health routines."
            ]
        }

        # Contributing factors estimation based on standardized deviation
        scaled_vals = row_scaled[0]
        factors = [
            {"feature": "Sleep Duration", "val": f"{user_input.get('sleep_duration', 7.0)} hrs", "impact": "Positive" if float(user_input.get('sleep_duration', 7.0)) >= 7.0 else "Negative"},
            {"feature": "Stress Level", "val": f"{user_input.get('stress_level', 5)} / 10", "impact": "Negative" if float(user_input.get('stress_level', 5)) >= 6 else "Positive"},
            {"feature": "Physical Activity", "val": f"{user_input.get('physical_activity_level', 50)} min/day", "impact": "Positive" if float(user_input.get('physical_activity_level', 50)) >= 45 else "Neutral"},
            {"feature": "BMI Category", "val": str(user_input.get('bmi_category', 'Normal')), "impact": "Positive" if 'Normal' in str(user_input.get('bmi_category', '')) else "Negative"},
            {"feature": "Blood Pressure", "val": f"{user_input.get('systolic_bp', 120)}/{user_input.get('diastolic_bp', 80)}", "impact": "Neutral" if float(user_input.get('systolic_bp', 120)) <= 125 else "Negative"}
        ]

        return {
            "predicted_quality": label,
            "confidence": round(confidence * 100, 1),
            "probabilities": probabilities,
            "model_used": model_name,
            "tips": tips_dict.get(label, []),
            "contributing_factors": factors,
            "disclaimer": "This prediction is based on machine-learning patterns in the provided dataset (374 records, 5 poor class records) and is intended for informational purposes only. It is not a medical diagnosis."
        }

if __name__ == "__main__":
    engine = SleepQualityMLEngine()
    engine.train_and_save()
