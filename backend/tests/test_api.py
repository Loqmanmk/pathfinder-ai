from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_health():
     response = client.get("/health")
     assert response.status_code == 200
     assert response.json() == {"status": "ok"}


def test_recommend_rejects_invalid_level():
     payload = {
          "gpa": 3.5,
          "interested_domain": "Cybersecurity",
          "python": "Expert",
          "sql": "Weak",
          "java": "Weak",
     }
     response = client.post("/recommend", json=payload)
     assert response.status_code == 422


def test_recommend_rejects_invalid_gpa():
     payload = {
          "gpa": 7,
          "interested_domain": "Cybersecurity",
          "python": "Weak",
          "sql": "Weak",
          "java": "Weak",
     }
     response = client.post("/recommend", json=payload)
     assert response.status_code == 422