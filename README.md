# PathFinder

Intelligent career recommendation system based on Machine Learning.

## Overview
PathFinder takes a student profile (GPA, interests, skills) and recommends
career families in computer science, then the matching careers.

## Tech stack
- Python 3.12, Pandas, NumPy, Scikit-learn
- FastAPI (REST API)
- React 18 (frontend)
- MySQL 8
- Docker

## Project structure
- `ml/`: data exploration, preprocessing, model training
- `backend/`: FastAPI API
- `frontend/`: React app

## Status
Work in progress.
- [x] Data exploration and cleaning
- [x] Model training
- [ ] REST API
- [ ] Frontend
- [ ] Docker

## Data
V1 uses a public Kaggle dataset (Computer Science Students, 180 rows,
synthetic). Results validate the pipeline, not real-world accuracy.
Future versions will use real data.

Limits: 180 rows, synthetic data, and `Interested Domain` almost determines
the career family. The score validates the pipeline, not real-world accuracy.