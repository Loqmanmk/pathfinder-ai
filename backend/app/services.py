from sqlalchemy import text
from sqlalchemy.orm import Session

from app import config  # noqa: F401  (ajoute ml/ au chemin Python)
from app.schemas import StudentProfile
from src.predict import predict_top_k


def get_careers(session: Session, family: str) -> list[str]:
     rows = session.execute(
          text(
               "SELECT c.name FROM careers c "
               "JOIN career_families f ON f.id = c.family_id "
               "WHERE f.name = :family ORDER BY c.name"
          ),
          {"family": family},
     )
     return [row[0] for row in rows]


def recommend(session: Session, profile: StudentProfile) -> list[dict]:
     model_input = {
          "GPA": profile.gpa,
          "Interested Domain": profile.interested_domain,
          "Python": profile.python,
          "SQL": profile.sql,
          "Java": profile.java,
     }

     results = predict_top_k(model_input)

     return [
          {
               "family": item["family"],
               "probability": item["probability"],
               "careers": get_careers(session, item["family"]),
          }
          for item in results
     ]