import os
import json
import joblib
import pandas as pd
import numpy as np
import warnings
from sklearn.exceptions import InconsistentVersionWarning

# Suppress version warning for cleaner API logs
warnings.filterwarnings("ignore", category=InconsistentVersionWarning)

class CropPredictor:
    """
    Production-grade predictor service using the pre-trained Gaussian Naive Bayes model.
    Loads pipeline containing StandardScaler + GaussianNB and LabelEncoder.
    Supports local development, testing harnesses, and Vercel Serverless Function runtime.
    """
    def __init__(self, model_path=None, model_info_path=None, feature_names_path=None):
        backend_dir = os.path.dirname(os.path.abspath(__file__))
        repo_root = os.path.dirname(backend_dir)
        cwd = os.getcwd()

        # Robust list of search locations across local and Vercel container paths
        candidate_dirs = [
            os.environ.get("MODEL_DIR", ""),
            repo_root,                          # /var/task (Vercel Lambda task root)
            os.path.join(repo_root, "backend"),
            backend_dir,
            cwd,
            os.path.join(cwd, "backend")
        ]

        self.model_path = model_path or self._locate_file("crop_recommendation_model.joblib", candidate_dirs)
        self.model_info_path = model_info_path or self._locate_file("model_info.json", candidate_dirs)
        self.feature_names_path = feature_names_path or self._locate_file("feature_names.json", candidate_dirs)

        self.pipeline = None
        self.label_encoder = None
        self.feature_names = ["N", "P", "K", "temperature", "humidity", "ph", "rainfall"]
        self.model_metadata = {}

        self._load_metadata()
        self._load_model()

    def _locate_file(self, filename, search_dirs):
        for directory in search_dirs:
            if not directory:
                continue
            candidate = os.path.join(directory, filename)
            if os.path.isfile(candidate):
                return os.path.abspath(candidate)
        # Default fallback to repo root relative to this file
        return os.path.abspath(os.path.join(os.path.dirname(os.path.dirname(__file__)), filename))

    def _load_metadata(self):
        try:
            if os.path.exists(self.feature_names_path):
                with open(self.feature_names_path, 'r') as f:
                    self.feature_names = json.load(f)
            if os.path.exists(self.model_info_path):
                with open(self.model_info_path, 'r') as f:
                    self.model_metadata = json.load(f)
        except Exception as e:
            print(f"Warning loading metadata from {self.model_info_path}: {e}")

    def _load_model(self):
        if not os.path.exists(self.model_path):
            raise FileNotFoundError(f"Model file not found at: {self.model_path}")
        
        data = joblib.load(self.model_path)
        if isinstance(data, dict) and 'pipeline' in data and 'label_encoder' in data:
            self.pipeline = data['pipeline']
            self.label_encoder = data['label_encoder']
        else:
            self.pipeline = data
            self.label_encoder = None

    def validate_inputs(self, data):
        """
        Validates the 7 soil and climate parameters.
        Returns (valid_bool, processed_dict_or_error_msg)
        """
        required_features = self.feature_names
        validated = {}
        
        # Realistic agronomic boundaries for validation
        ranges = {
            'N': (0, 250, "Nitrogen content in soil (kg/ha)"),
            'P': (0, 200, "Phosphorus content in soil (kg/ha)"),
            'K': (0, 300, "Potassium content in soil (kg/ha)"),
            'temperature': (-10, 60, "Temperature (°C)"),
            'humidity': (0, 100, "Relative humidity (%)"),
            'ph': (0, 14, "Soil pH level"),
            'rainfall': (0, 500, "Rainfall (mm)")
        }

        for feat in required_features:
            if feat not in data:
                return False, f"Missing required parameter '{feat}' ({ranges.get(feat, ('','',''))[2]})."
            try:
                val = float(data[feat])
            except (ValueError, TypeError):
                return False, f"Invalid value for '{feat}'. Must be a valid numerical value."
            
            min_v, max_v, desc = ranges[feat]
            if val < min_v or val > max_v:
                return False, f"Value for '{feat}' ({val}) is outside plausible range [{min_v}, {max_v}]."
            
            validated[feat] = val

        return True, validated

    def predict(self, input_dict):
        """
        Executes prediction with the exact training feature order.
        Returns top 3 recommendations with probability scores.
        """
        is_valid, validated_or_err = self.validate_inputs(input_dict)
        if not is_valid:
            return {"success": False, "error": validated_or_err}

        # Build DataFrame with exact feature names and order to guarantee correctness with StandardScaler
        df = pd.DataFrame([[validated_or_err[feat] for feat in self.feature_names]], columns=self.feature_names)
        
        # Predict probabilities
        probabilities = self.pipeline.predict_proba(df)[0]
        
        # Match class labels
        if self.label_encoder is not None:
            classes = self.label_encoder.classes_
        elif hasattr(self.pipeline, 'classes_'):
            classes = self.pipeline.classes_
        elif 'classes' in self.model_metadata:
            classes = np.array(self.model_metadata['classes'])
        else:
            classes = np.array([f"crop_{i}" for i in range(len(probabilities))])

        # Find top 3 indices sorted descending
        top_indices = np.argsort(probabilities)[::-1][:3]
        
        recommendations = []
        for rank, idx in enumerate(top_indices, 1):
            crop_name = str(classes[idx])
            prob_score = float(probabilities[idx])
            recommendations.append({
                "rank": rank,
                "crop": crop_name,
                "confidence_score": round(prob_score, 4),
                "confidence_percentage": round(prob_score * 100, 2)
            })

        return {
            "success": True,
            "top_recommendations": recommendations,
            "primary_crop": recommendations[0]["crop"],
            "model_used": self.model_metadata.get("best_model_name", "Gaussian Naive Bayes"),
            "model_test_accuracy": round(self.model_metadata.get("test_accuracy", 0.9955) * 100, 2),
            "disclaimer": "Model confidence scores reflect the Gaussian Naive Bayes relative posterior distribution based on historical agricultural test datasets. They are statistical decision aids and do not constitute absolute guarantees of field yield or crop viability under unmonitored environmental variations."
        }
