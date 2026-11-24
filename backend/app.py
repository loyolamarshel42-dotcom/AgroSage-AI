import os
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
from model_service import CropPredictor
from crop_data import CROP_CATALOG

app = Flask(__name__)
# Enable CORS for all routes to smoothly support Vite development server and production builds
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Initialize Predictor singleton with pre-trained model
try:
    predictor = CropPredictor()
    model_ready = True
    model_init_error = None
except Exception as e:
    predictor = None
    model_ready = False
    model_init_error = str(e)
    print(f"Error initializing predictor: {e}")

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint providing model and service operational status."""
    return jsonify({
        "status": "healthy" if model_ready else "degraded",
        "model_loaded": model_ready,
        "model_name": predictor.model_metadata.get("best_model_name", "Gaussian Naive Bayes") if predictor else None,
        "test_accuracy": predictor.model_metadata.get("test_accuracy", 0.9955) if predictor else None,
        "supported_crops_count": len(CROP_CATALOG),
        "features": predictor.feature_names if predictor else ["N", "P", "K", "temperature", "humidity", "ph", "rainfall"],
        "error": model_init_error
    }), 200

@app.route('/api/crops', methods=['GET'])
def get_all_crops():
    """Returns the full catalog of crops with agronomic profiles and descriptions."""
    category = request.args.get('category')
    crops_list = list(CROP_CATALOG.values())
    if category:
        crops_list = [c for c in crops_list if c.get('category', '').lower() == category.lower()]
    return jsonify({
        "success": True,
        "count": len(crops_list),
        "crops": crops_list
    }), 200

@app.route('/api/crops/<crop_id>', methods=['GET'])
def get_crop_detail(crop_id):
    """Returns detailed information for an individual crop."""
    crop_key = crop_id.lower().replace(" ", "")
    crop_info = CROP_CATALOG.get(crop_key)
    if not crop_info:
        # Search by name match
        for key, val in CROP_CATALOG.items():
            if key == crop_key or val["name"].lower() == crop_id.lower():
                crop_info = val
                break

    if not crop_info:
        return jsonify({"success": False, "error": f"Crop '{crop_id}' not found in catalog."}), 404

    return jsonify({"success": True, "crop": crop_info}), 200

@app.route('/api/predict', methods=['POST'])
def predict_crop():
    """
    Receives JSON input with N, P, K, temperature, humidity, ph, rainfall.
    Validates features, executes model inference, and returns Top 3 predictions with metadata.
    """
    if not model_ready:
        return jsonify({
            "success": False,
            "error": f"Model failed to initialize: {model_init_error}"
        }), 500

    if not request.is_json:
        return jsonify({
            "success": False,
            "error": "Request body must be valid JSON with Content-Type: application/json."
        }), 400

    data = request.get_json()
    if not data:
        return jsonify({
            "success": False,
            "error": "Empty payload received."
        }), 400

    result = predictor.predict(data)
    if not result.get("success"):
        return jsonify(result), 400

    # Enrich recommendations with crop profile information
    for rec in result["top_recommendations"]:
        crop_key = rec["crop"].lower().replace(" ", "")
        rec_info = CROP_CATALOG.get(crop_key, {})
        rec["details"] = {
            "display_name": rec_info.get("name", rec["crop"].capitalize()),
            "category": rec_info.get("category", "General"),
            "growth_duration": rec_info.get("growth_duration", "Varies"),
            "description": rec_info.get("description", "A viable crop option matching your field condition."),
            "ideal_soil": rec_info.get("ideal_soil", "N/A"),
            "economic_value": rec_info.get("economic_value", "Valuable agricultural harvest.")
        }

    return jsonify(result), 200

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    print(f"Starting Crop Recommendation API server on port {port}...")
    app.run(host='0.0.0.0', port=port, debug=False)
