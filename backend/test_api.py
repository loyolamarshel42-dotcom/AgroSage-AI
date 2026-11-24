import unittest
import json
from app import app

class TestCropRecommendationAPI(unittest.TestCase):
    def setUp(self):
        self.client = app.test_client()

    def test_health_check(self):
        response = self.client.get('/api/health')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertEqual(data.get('status'), 'healthy')
        self.assertTrue(data.get('model_loaded'))
        self.assertEqual(data.get('supported_crops_count'), 22)

    def test_crops_catalog(self):
        response = self.client.get('/api/crops')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertTrue(data.get('success'))
        self.assertEqual(data.get('count'), 22)

    def test_predict_valid_rice(self):
        # Rice profile sample (typical rice soil & monsoon conditions)
        payload = {
            "N": 90,
            "P": 42,
            "K": 43,
            "temperature": 20.8,
            "humidity": 82.0,
            "ph": 6.5,
            "rainfall": 202.9
        }
        response = self.client.post('/api/predict', json=payload)
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertTrue(data.get('success'))
        self.assertEqual(len(data.get('top_recommendations')), 3)
        self.assertEqual(data.get('primary_crop'), 'rice')
        self.assertIn('disclaimer', data)

    def test_predict_validation_errors(self):
        # Missing parameter
        response = self.client.post('/api/predict', json={"N": 90, "P": 40})
        self.assertEqual(response.status_code, 400)
        data = json.loads(response.data)
        self.assertFalse(data.get('success'))

        # Out of bounds pH (e.g. 25)
        invalid_payload = {
            "N": 90, "P": 42, "K": 43,
            "temperature": 25, "humidity": 80,
            "ph": 25.0, "rainfall": 150
        }
        response = self.client.post('/api/predict', json=invalid_payload)
        self.assertEqual(response.status_code, 400)

if __name__ == '__main__':
    unittest.main()
