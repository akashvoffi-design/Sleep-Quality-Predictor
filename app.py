import os
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
from ml_engine import SleepQualityMLEngine, FEATURES, CATEGORICAL_COLS

app = Flask(__name__)
CORS(app)

engine = SleepQualityMLEngine()
engine.load_artifacts()

HISTORY_FILE = os.path.join(os.path.dirname(__file__), "ml_artifacts", "history.json")

def load_history():
    if os.path.exists(HISTORY_FILE):
        try:
            with open(HISTORY_FILE, "r") as f:
                return json.load(f)
        except Exception:
            return []
    return []

def save_history(history_data):
    os.makedirs(os.path.dirname(HISTORY_FILE), exist_ok=True)
    with open(HISTORY_FILE, "w") as f:
        json.dump(history_data, f, indent=2)

@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "healthy", "service": "Sleep Quality Predictor API"})

@app.route("/api/stats", methods=["GET"])
def get_stats():
    return jsonify({
        "dataset_records": 374,
        "model_count": 4,
        "best_model": "Random Forest",
        "best_accuracy": "98.7%",
        "features_count": len(FEATURES),
        "occupations": [
            "Software Engineer", "Doctor", "Sales Representative", "Teacher", 
            "Nurse", "Engineer", "Accountant", "Scientist", "Lawyer", "Salesperson", "Manager"
        ],
        "bmi_categories": ["Normal", "Normal Weight", "Overweight", "Obese"],
        "sleep_disorders": ["None", "Insomnia", "Sleep Apnea"],
        "genders": ["Male", "Female"]
    })

@app.route("/api/models", methods=["GET"])
def get_models():
    return jsonify({
        "models": engine.model_metrics,
        "best_model_name": "Random Forest",
        "dataset_disclaimer": "Dataset contains 374 records with 5 Poor quality instances. Random Forest achieved 98.7% test set accuracy."
    })

@app.route("/api/predict", methods=["POST"])
def predict():
    try:
        data = request.json or {}
        model_name = data.get("model_name", "Random Forest")
        result = engine.predict(data, model_name=model_name)
        
        # Save to history automatically
        history = load_history()
        history_item = {
            "id": len(history) + 1,
            "date": data.get("timestamp") or "Just Now",
            "gender": data.get("gender", "Male"),
            "age": data.get("age", 30),
            "occupation": data.get("occupation", "Software Engineer"),
            "sleep_duration": data.get("sleep_duration", 7.0),
            "quality_rating": data.get("quality_of_sleep", 7),
            "predicted_quality": result["predicted_quality"],
            "confidence": result["confidence"],
            "model_used": result["model_used"],
            "stress_level": data.get("stress_level", 5),
            "bmi_category": data.get("bmi_category", "Normal")
        }
        history.insert(0, history_item) # Most recent first
        save_history(history[:50]) # Keep last 50
        
        result["history_id"] = history_item["id"]
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route("/api/history", methods=["GET"])
def get_history():
    history = load_history()
    return jsonify({"history": history})

@app.route("/api/history", methods=["DELETE"])
def clear_history():
    save_history([])
    return jsonify({"message": "History cleared successfully", "history": []})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
