# 🌾 AgroSage AI — Intelligent Precision Agriculture & Crop Recommendation Platform

[![Model](https://img.shields.io/badge/Algorithm-Gaussian_Naive_Bayes-green.svg)](https://scikit-learn.org/)
[![Pipeline](https://img.shields.io/badge/Preprocessing-StandardScaler-blue.svg)](https://scikit-learn.org/)
[![Accuracy](https://img.shields.io/badge/Test_Accuracy-99.55%25-emerald.svg)](evaluation_results.csv)
[![Frontend](https://img.shields.io/badge/Frontend-React_18_+_Vite_+_TailwindCSS-teal.svg)](frontend/)
[![Backend](https://img.shields.io/badge/Backend-Flask_REST_API-lightgrey.svg)](backend/)
[![License](https://img.shields.io/badge/License-MIT-amber.svg)](LICENSE)

An enterprise-ready, AI-driven precision agriculture SaaS platform designed to eliminate intuition-based planting and optimize agricultural yield. The system analyzes seven critical soil chemistry and environmental features using a pre-trained **Gaussian Naive Bayes** machine learning pipeline to recommend the Top 3 optimal crops, complete with probabilistic confidence rankings, agronomic cultivation protocols, and benchmark radar comparisons.

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Key Features](#-key-features)
- [Technology Stack](#-technology-stack)
- [Machine Learning Model & Architecture](#-machine-learning-model--architecture)
- [Dataset Information](#-dataset-information)
- [Repository Structure](#-repository-structure)
- [Local Installation & Setup](#-local-installation--setup)
- [Starting the Application](#-starting-the-application)
- [REST API Documentation](#-rest-api-documentation)
- [Deployment & Production Configuration](#-deployment--production-configuration)
- [Security Audit & Best Practices](#-security-audit--best-practices)

---

## 🎯 Project Overview

Soil nutrient depletion and climate variability present severe risks to agricultural profitability and food security. **AgroSage AI** bridges empirical soil testing assays and production agriculture by:

1. **Standardizing Soil & Climate Telemetry**: Ingesting laboratory assays for soil Nitrogen (N), Phosphorus (P), Potassium (K), soil pH, alongside meteorological parameters (ambient temperature, relative humidity, and precipitation).
2. **Deterministic Preprocessing & Multivariate Inference**: Passing inputs in the exact training sequence into a `StandardScaler` + `GaussianNB` pipeline.
3. **Probabilistic Multi-Class Ranking**: Generating Top 3 recommended crops with posterior probability distributions rather than single opaque outputs, enabling farmers to hedge seasonal risks.
4. **Actionable Agronomy**: Supplying growth durations, irrigation guidelines, soil type requirements, and economic utility profiles for 22 registered crops.

---

## ✨ Key Features

- **Responsive Agricultural SaaS UI**: Clean emerald-and-white theme built with Tailwind CSS, responsive across mobile, tablet, and widescreen desktop displays.
- **Dynamic Crop Recommender**: Interactive form with real-time agronomic range checks, error tooltips, one-click scenario presets, and smooth scrolling to diagnostic reports.
- **Top 3 Probabilistic Recommendations**: Ranks primary and alternative crops with `predict_proba` scores and scientific disclaimers clarifying statistical distributions.
- **Comparative Radar Diagnostics**: Real-time Recharts radar graph mapping farmer soil inputs directly against optimal agronomic benchmarks for the recommended crop.
- **Interactive Farmer Analytics Dashboard**: Empirically visualizes comparative test accuracies, macro F1-scores, precision, and cross-validation across 6 ML algorithms from benchmark evaluations.
- **22-Cultivar Agronomic Encyclopedia**: Searchable and filterable knowledge base detailing botanical names, maturity periods, climate suitability, and soil specifications.
- **Session Audit Trail & CSV Export**: Automatically logs all assessments with one-click reload-into-form functionality and CSV download for farm recordkeeping.
- **Real-Time API Health Monitor**: Dynamic pulse pill in the navigation bar checking model initialization and backend availability.

---

## 🛠 Technology Stack

### Frontend
- **Framework**: [React.js](https://react.dev/) (v18.3)
- **Bundler & Dev Server**: [Vite](https://vitejs.dev/) (v5.4)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (v3.4), PostCSS, Autoprefixer
- **Visuals & Charts**: [Recharts](https://recharts.org/) (Bar charts, Radar charts, Pie charts)
- **Iconography**: [Lucide React](https://lucide.dev/)
- **Typography**: Google Fonts (*Plus Jakarta Sans*)

### Backend
- **Framework**: [Python](https://www.python.org/) 3.10+ / 3.13
- **Web API**: [Flask](https://flask.palletsprojects.com/) (v3.0+)
- **Cross-Origin Resource Sharing**: [Flask-CORS](https://flask-cors.readthedocs.io/)
- **Model Deserialization**: [Joblib](https://joblib.readthedocs.io/)
- **Data Engineering**: [Pandas](https://pandas.pydata.org/), [NumPy](https://numpy.org/)
- **Inference Pipeline**: [Scikit-Learn](https://scikit-learn.org/)

---

## 🧠 Machine Learning Model & Architecture

The machine learning pipeline was trained and evaluated using Google Colab.

### 1. Artifacts Retained
- **`crop_recommendation_model.joblib`**: Pickled dictionary containing:
  - `pipeline`: Scikit-learn `Pipeline([('scaler', StandardScaler()), ('classifier', GaussianNB())])`
  - `label_encoder`: Fitted `LabelEncoder` mapping 22 crop classes.
- **`model_info.json`**: Model metadata, best model identifier, test accuracy metric, and registered classes.
- **`evaluation_results.csv`**: Complete comparative metric table evaluating 6 candidate algorithms.
- **`feature_names.json`**: Strict training feature sequence schema.

### 2. Input Feature Order
To maintain complete consistency with the fitted `StandardScaler`, input features are passed in the exact order:
$$\mathbf{X} = [\text{N}, \text{P}, \text{K}, \text{temperature}, \text{humidity}, \text{ph}, \text{rainfall}]$$

| Feature | Unit | Agronomic Range | Description |
| :--- | :--- | :--- | :--- |
| **Nitrogen (N)** | kg/ha | 0 – 250 | Essential for leaf development and chlorophyll synthesis |
| **Phosphorus (P)** | kg/ha | 0 – 200 | Stimulates root formation and early flowering |
| **Potassium (K)** | kg/ha | 0 – 300 | Regulates stomatal conductance and disease resistance |
| **Temperature** | °C | -10 – 60 | Ambient mean temperature during growing period |
| **Humidity** | % | 0 – 100 | Relative atmospheric moisture |
| **Soil pH** | pH units | 0.0 – 14.0 | Measure of soil acidity or alkalinity |
| **Rainfall** | mm | 0 – 500 | Seasonal cumulative precipitation |

### 3. Model Benchmark Comparison
*Extracted directly from `evaluation_results.csv`:*

| Model | Train Accuracy | Test Accuracy | 5-Fold CV Accuracy | Macro F1-Score | Macro Precision |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Gaussian Naive Bayes (Selected)** | **0.9949** | **0.9955** | **0.9949** | **0.9954** | **0.9959** |
| Random Forest | 0.9972 | 0.9955 | 0.9943 | 0.9955 | 0.9957 |
| Support Vector Machine (SVM) | 0.9903 | 0.9886 | 0.9858 | 0.9886 | 0.9897 |
| Logistic Regression | 0.9847 | 0.9795 | 0.9773 | 0.9795 | 0.9809 |
| Decision Tree | 0.9989 | 0.9795 | 0.9858 | 0.9794 | 0.9806 |
| K-Nearest Neighbors | 0.9847 | 0.9795 | 0.9653 | 0.9793 | 0.9804 |

---

## 📊 Dataset Information

- **Dataset File**: `Crop_recommendation.csv`
- **Total Records**: 2,200 labeled observations
- **Target Feature**: `label` (22 distinct crop categories, 100 observations each)
- **Supported Crops**: `apple`, `banana`, `blackgram`, `chickpea`, `coconut`, `coffee`, `cotton`, `grapes`, `jute`, `kidneybeans`, `lentil`, `maize`, `mango`, `mothbeans`, `mungbean`, `muskmelon`, `orange`, `papaya`, `pigeonpeas`, `pomegranate`, `rice`, `watermelon`.
- **Quality**: Zero null or missing values; balanced multi-class distribution across all categories.

---

## 📂 Repository Structure

```text
Crop-Recommendation-System/
│
├── .gitignore                          # Comprehensive exclusion rules for Git
├── Crop_recommendation.csv             # Original dataset (2,200 rows x 8 cols)
├── crop_recommendation_model.joblib    # Pre-trained ML pipeline (StandardScaler + GaussianNB)
├── evaluation_results.csv              # Benchmark matrix across 6 algorithms
├── feature_names.json                  # Canonical feature order schema
├── model_info.json                     # Model metadata, accuracy, and class labels
├── README.md                           # Master project documentation
├── start_backend.bat                   # 1-click backend launcher for Windows
├── start_frontend.bat                  # 1-click frontend launcher for Windows
│
├── backend/
│   ├── app.py                          # Flask application & REST endpoint definitions
│   ├── crop_data.py                    # Complete agronomic profiles for 22 crops
│   ├── model_service.py                # CropPredictor service with range validation & inference
│   ├── requirements.txt                # Python backend dependencies
│   └── test_api.py                     # Automated backend unit & integration tests
│
└── frontend/
    ├── .env.example                    # Sample environment configuration
    ├── index.html                      # HTML entrypoint & Google Fonts preconnect
    ├── package.json                    # Frontend package dependencies & scripts
    ├── postcss.config.js               # PostCSS configuration for Tailwind
    ├── tailwind.config.js              # Theme custom colors (forest/emerald palette)
    ├── vite.config.js                  # Vite configuration & React plugin
    └── src/
        ├── App.jsx                     # Root component & tab router
        ├── index.css                   # Tailwind directives & base styles
        ├── main.jsx                    # React DOM render entry
        ├── api.js                      # REST API client with env fallback
        ├── constants.js                # Agronomic benchmarks, icons, presets, & specs
        └── components/
            ├── Navbar.jsx              # Navigation header with live health indicator
            ├── LandingPage.jsx         # Hero section, feature cards, & quick scenarios
            ├── RecommendationForm.jsx  # Input form, validation, results, & radar graphs
            ├── Dashboard.jsx           # Model benchmark chart & portfolio distribution
            ├── CropEncyclopedia.jsx    # 22-cultivar searchable knowledge base
            └── PredictionHistory.jsx   # Assessment log audit trail & CSV export
```

---

## ⚙️ Local Installation & Setup

### Prerequisites
- **Python**: Version 3.10, 3.11, 3.12, or 3.13 installed
- **Node.js**: Version 18.x or 20.x+ and `npm` installed
- **Git**: Installed and configured

### 1. Clone the Repository
```bash
git clone https://github.com/<your-username>/Crop-Recommendation-System.git
cd Crop-Recommendation-System
```

### 2. Backend Setup
1. Create and activate a Python virtual environment:
   ```bash
   # Linux/macOS
   python3 -m venv venv
   source venv/bin/activate

   # Windows (PowerShell)
   python -m venv venv
   .\venv\Scripts\Activate.ps1
   ```
2. Install dependencies:
   ```bash
   pip install -r backend/requirements.txt
   ```
3. Run test suite to verify pipeline loading:
   ```bash
   python backend/test_api.py
   ```

### 3. Frontend Setup
1. Navigate to the `frontend/` directory:
   ```bash
   cd frontend
   ```
2. Install Node dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   ```bash
   cp .env.example .env
   ```
   *(By default, `.env` points to `http://127.0.0.1:5000/api`)*

---

## 🚀 Starting the Application

### Option A: Windows 1-Click Launchers
From the project root directory:
- Run `start_backend.bat`
- In a second terminal, run `start_frontend.bat`

### Option B: Manual CLI Commands
**Terminal 1 (Backend API):**
```bash
python backend/app.py
```
*Backend runs on: `http://127.0.0.1:5000`*

**Terminal 2 (Frontend Client):**
```bash
cd frontend
npm run dev
```
*Frontend runs on: `http://localhost:5173`*

---

## 📡 REST API Documentation

### 1. Health & Status Check
- **Endpoint**: `GET /api/health`
- **Description**: Returns server status, model readiness, class counts, and expected features.
- **Sample Response**:
  ```json
  {
    "status": "healthy",
    "model_loaded": true,
    "model_name": "Gaussian Naive Bayes",
    "test_accuracy": 0.9955,
    "supported_crops_count": 22,
    "features": ["N", "P", "K", "temperature", "humidity", "ph", "rainfall"],
    "error": null
  }
  ```

### 2. Crop Catalog
- **Endpoint**: `GET /api/crops`
- **Query Parameters**: `?category=Pulses` (optional)
- **Description**: Returns all 22 crop profiles, growth cycles, and management rules.

### 3. Generate Crop Recommendation
- **Endpoint**: `POST /api/predict`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "N": 90,
    "P": 42,
    "K": 43,
    "temperature": 20.8,
    "humidity": 82.0,
    "ph": 6.5,
    "rainfall": 202.9
  }
  ```
- **Success Response (`200 OK`)**:
  ```json
  {
    "success": true,
    "primary_crop": "rice",
    "model_used": "Gaussian Naive Bayes",
    "model_test_accuracy": 99.55,
    "top_recommendations": [
      {
        "rank": 1,
        "crop": "rice",
        "confidence_score": 0.9957,
        "confidence_percentage": 99.57,
        "details": {
          "display_name": "Rice (Paddy)",
          "category": "Cereal",
          "growth_duration": "100-140 days",
          "description": "The world's foremost staple cereal crop...",
          "ideal_soil": "Clayey, heavy loams...",
          "economic_value": "Primary caloric staple..."
        }
      },
      {
        "rank": 2,
        "crop": "jute",
        "confidence_score": 0.0043,
        "confidence_percentage": 0.43,
        "details": { ... }
      },
      {
        "rank": 3,
        "crop": "coffee",
        "confidence_score": 0.0000,
        "confidence_percentage": 0.00,
        "details": { ... }
      }
    ],
    "disclaimer": "Model confidence scores reflect the Gaussian Naive Bayes relative posterior distribution based on historical agricultural test datasets. They are statistical decision aids and do not constitute absolute guarantees of field yield or crop viability under unmonitored environmental variations."
  }
  ```
- **Error Response (`400 Bad Request`)**:
  ```json
  {
    "success": false,
    "error": "Value for 'ph' (18.0) is outside plausible range [0, 14]."
  }
  ```

---

## 🌐 Deployment & Production Configuration

When promoting AgroSage AI from local development to production hosting (e.g., Render, Railway, AWS, Vercel, Netlify):

### 1. Update Frontend API Endpoint
- Local development points to `http://127.0.0.1:5000/api`.
- For production, set the environment variable in your frontend hosting dashboard (or `.env.production`):
  ```env
  VITE_API_BASE_URL=https://your-backend-api.onrender.com/api
  ```
- Rebuild the production assets:
  ```bash
  cd frontend
  npm run build
  ```

### 2. Configure Backend Production Server
- `backend/app.py` binds to `0.0.0.0` and reads the `PORT` environment variable automatically (`port = int(os.environ.get("PORT", 5000))`).
- For production deployments, serve Flask using a WSGI server like **Gunicorn**:
  ```bash
  pip install gunicorn
  gunicorn --bind 0.0.0.0:$PORT backend.app:app
  ```

### 3. Restrict CORS Origins
- In `backend/app.py`, restrict `CORS(app, resources={r"/api/*": {"origins": "*"}})`.
- Replace `"*"` with your registered frontend domain (e.g., `https://agrosage.yourdomain.com`).

---

## 🔒 Security Audit & Best Practices

- **Zero Hardcoded Secrets**: Scanned and verified. No database passwords, JWT tokens, AWS keys, or API credentials exist in the codebase.
- **Model Integrity Safeguards**: Strict exclusion rules in `.gitignore` ensure runtime logs, temporary node binaries, and Python bytecode are ignored while preserving `crop_recommendation_model.joblib`.
- **Input Sanitization**: Numerical casting and range constraints prevent arbitrary payload injection into the ML pipeline.

---

## 📄 License
This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
