import os
import sys

# Compute repository root and add it and the backend package to sys.path
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BACKEND_DIR = os.path.join(BASE_DIR, 'backend')

if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)
if BACKEND_DIR not in sys.path:
    sys.path.insert(0, BACKEND_DIR)

# Import the pre-configured Flask instance
from backend.app import app

# Vercel's Python runtime requires a callable WSGI/ASGI application named 'app'
# This file serves as the serverless function handler for all /api/* routes
