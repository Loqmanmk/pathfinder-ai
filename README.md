# PathFinder

Intelligent career recommendation system for computer science students,
based on Machine Learning.

## Overview
The student enters a profile (GPA, interest domain, Python/SQL/Java levels).
The model predicts the 3 most likely career families with probabilities, and
the matching careers are read from MySQL.

```
React  →  FastAPI  →  Scikit-learn pipeline  →  MySQL (careers)
```

## Tech stack
- Python 3.12, Pandas, NumPy, Scikit-learn
- FastAPI, SQLAlchemy, Pydantic
- React 18 (Vite)
- MySQL 8
- Docker, Docker Compose
- Pytest, GitHub Actions

## Project structure
```
ml/         data loading, preprocessing, training, prediction
backend/    FastAPI API, services, repository
frontend/   React app
database/   SQL schema
```

## Run with Docker
1. Copy `.env.example` to `.env` and set strong passwords.
2. Make sure `ml/models/career_model.joblib` exists
   (`cd ml && python -m src.train`).
3. Start everything:
```bash
   docker compose up --build
```
4. Seed the database (first time only):
```bash
   docker compose exec backend python scripts/seed.py
```
5. Open http://localhost:5173 (API docs: http://localhost:8000/docs).

## Tests
```bash
cd ml && python -m pytest
cd backend && python -m pytest
```
The CI (GitHub Actions) retrains the model and runs all tests on each push.

## Design principles
- Single responsibility: one module per task (loader, preprocessing, model,
  evaluation, persistence, prediction).
- Open/Closed: `build_pipeline(classifier)` accepts any scikit-learn classifier.
- Dependency injection: database session provided to routes with `Depends`.
- Input validation with Pydantic; secrets in `.env`, never in the code.

## Model and data: limits
- V1 uses a public Kaggle dataset (Computer Science Students): **180 rows,
  synthetic**. 33 careers were grouped into 6 families.
- Cross-validation accuracy is about 91%, but `Interested Domain` almost
  determines the family (data leakage). The score validates the pipeline,
  not real-world accuracy.
- The family "Specialized & Emerging" has few examples and is the weakest.
- Gender, name and age are deliberately not used.

## Roadmap
- Replace the dataset with real, multi-discipline student data
- Train the model inside the CI/Docker build
- Frontend tests and a nicer UI